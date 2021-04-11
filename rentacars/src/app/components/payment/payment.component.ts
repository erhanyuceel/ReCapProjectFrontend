import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { error } from '@angular/compiler/src/util';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cards:Card[];
  rental: Rental;
  car: Car;
  customer: Customer;
  getCustomerId: number;
  amountOfPayment: number = 0;

  fullName: string;
  cardNumber: string;
  cvc: number;
  expirationMonth: number;
  expirationYear: number;

  isPaymentReceived: boolean =false;
  isCarRent: boolean =false;

  isChecked =false;

  rentalAddForm:FormGroup


  constructor(
    private formBuilder:FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private authService:AuthService,
    private cardService:CardService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId;
        this.amountOfPayment = JSON.parse(params['rental']).totalPrice;
        this.createRentalAddForm();
        this.getCardsByUserId()
      }
    });
  }

  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      cVV:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })
  }
  

  async payResult() {
    if (this.rentalAddForm.valid) {
      await this.payWithCard();
        await this.toastrService.warning("Anasayfaya Yonlendiriliyorsunuz")
        await setTimeout(() => {
          this.router.navigate(['/cars']);
      }, 1000);
    }else{
      this.toastrService.error("Please Fill The Form Completely.","Error")
    }
    
    
  }
  payWithCard(){
    this.rentCar();
    this.CardSave();
  }

  rentCar() {
        this.paymentService.payWithCreditCard().subscribe((response) => {
        this.isPaymentReceived == response.success;
        this.toastrService.success(this.amountOfPayment + 'Tl  ' + this.rental.brandName, 'Odemeniz Alindi' );
        console.log(response);
        this.addRental();
      },(error)=>{
        this.isPaymentReceived == false;
        this.toastrService.error('hata');
        //console.log(error);
      });
    
  }
  CardSave(){
    if (this.isChecked == true) {
      let cardModel = Object.assign({userId:this.getCustomerId},this.rentalAddForm.value)
      this.cardService.saveCard(cardModel).subscribe(response => {
        this.toastrService.success(response.message,"Kart Ekleme Başarılı")
      });
    }
  }

  addRental() {
    this.rentalService.addRental(this.rental).subscribe((response) => {
     this.isCarRent === response.success;
     this.toastrService.success('Kiralama islemi Yapildi! ');
     console.log(response);
   },
     (error) => {
       this.isCarRent === error.success;
       this.toastrService.error('Kiralama isleminde hata ile karsilasildi lutfen iletisime gecin.');
       console.log(error);
     })
  }

  getCardsByUserId(){
    this.cardService.getCardsByUserId(this.getCustomerId).subscribe(response => {
      this.cards = response.data;
    })
  }

}
