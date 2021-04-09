import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  color: Color;
  colorUpdateForm: FormGroup;
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getBrand(params['colorId']);
    });
  }
  getBrand(id: number) {
    this.colorService.getBrand(id).subscribe((response) => {
      this.color = response.data;
      this.createBrandUpdateForm();
    });
  }
  createBrandUpdateForm(): void {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [this.color.colorId],
      colorName: [this.color.colorName, Validators.required],
    });
  }
  update() {
    if (this.colorUpdateForm.valid) {
      const colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.updateBrand(colorModel).subscribe(
        (response) => {
          this.toastrService.success(`Marka güncellendi: ${colorModel.colorName}`, 'Başarılı');
          this.toastrService.warning("Admin sayfasına Yonlendiriliyorsunuz");
          setTimeout(() => {
            this.router.navigate(['/admin']);
        }, 1000);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Dogrulama hatasi'
              );
            }
          }
        }
      );
    }
  }

}
