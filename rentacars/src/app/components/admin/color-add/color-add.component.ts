import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm : FormGroup;
  
  constructor(
    private formBuilder:FormBuilder, 
    private colorService: ColorService,
    private toastrService:ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
     this.colorAddForm = this.formBuilder.group({
       colorName:["",Validators.required]
     })
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
        this.toastrService.warning("Admin sayfasına Yonlendiriliyorsunuz");
        setTimeout(() => {
          this.router.navigate(['/admin']);
      }, 1000);
      },responseError=>{
        console.log(responseError)
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }       
        } 
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
    
  }


}
