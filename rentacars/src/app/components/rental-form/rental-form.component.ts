
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { FindexService } from 'src/app/services/findex.service';


@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css'],
  providers:[DatePipe]
})
export class RentalFormComponent implements OnInit {

  customers:Customer[];
  customerId:number;
  rentals:Rental[];
  dataLoaded = false;
  totalPrice:number=0;

  rentDate:Date;
  returnDate:Date;
  @Input() car:CarDto;

  minDate :string|any; 
  maxDate: string|null;
  firstDateSelected:boolean =false;

  constructor(
    private router:Router,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService,
    private customerService:CustomerService,
    private findexService: FindexService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getRental();
  }
  getRental(){
    this.rentalService.getRentalsByCarId(this.car.id).subscribe(response=>{
      this.rentals=response.data;
      this.dataLoaded=true;
    })
  }
  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers = response.data;
    })
  }
  getRentMinDate(){
    this.minDate =this.datePipe.transform(new Date(),'yyyy-MM-dd');
    return this.minDate;
  }
  getReturnMinDate(){
    if(this.rentDate!=undefined){
      let tempDate = new Date(this.rentDate);
      let newDate = new Date();
      newDate.setDate(tempDate.getDate()+1);
      return newDate.toISOString().slice(0,10);
    }
    else{
      return this.rentDate;
    }
  }
  getReturnMaxDate(){
    this.maxDate =this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear()+1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }
  onChangeEvent(event:any){
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }
  getTotalPrice():number{
    if (this.rentDate ==undefined || this.returnDate<this.rentDate || this.returnDate ==undefined) {
    return this.totalPrice;
    }
    else{
      let difference = (new Date (this.returnDate.toString()).getTime()) - (new Date(this.rentDate.toString()).getTime());
      let  numberOfDays = Math.ceil(difference / (1000*3600*24));
      this.totalPrice = numberOfDays * this.car.dailyPrice;
      return this.totalPrice;
    }
  }
  createRental() {
    let MyRental: Rental = {
      carId : this.car.id,
      brandName : this.car.brandName,
      colorName : this.car.colorName,
      dailyPrice : this.car.dailyPrice,
      customerId : this.customerId,
      rentDate : this.rentDate,
      returnDate : this.returnDate,
      totalPrice :this.totalPrice
    };
    if (MyRental.rentDate == undefined||MyRental.rentDate>MyRental.returnDate) {
      console.log(MyRental)
      this.toastrService.error("Hatali bilgi girdiniz","Bilgilerinizi kontrol edin")
    } 
    else if(!(this.car.available)){/////////////////
      this.toastrService.error("secili tarihler arasi kiralanmis","Arac Musait Degil ")
    }
    else{
      // findex puanlarını al
      let customerPoint = this.findexService.getPointByCustomerId(MyRental.customerId)
      let carPoint = this.findexService.getPointByCarId(MyRental.carId)

      if(customerPoint >= carPoint){
        this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
        this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...','Ödeme İşlemleri');
      } else {
        this.toastrService.error('Findex puanınız yetersiz', 'Hata')
      }
    }
  }

}
