import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-carfilter',
  templateUrl: './carfilter.component.html',
  styleUrls: ['./carfilter.component.css']
})
export class CarfilterComponent implements OnInit {

  colors: Color[];
  brands: Brand[];
  selectedBrand: number=0;
  selectedColor:number=0;
  modifiedText: string;
  constructor(
    private colorService: ColorService,
    private brandService: BrandService
  ) { }

  ngOnInit(): void {

    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => { this.brands = response.data });
  }
  getColors() {
    this.colorService.getColors().subscribe(response => { this.colors = response.data });
  }
  onBrandSelected(value: number) {
    this.selectedBrand=value;
  }
  onColorSelected(value: number) {
    this.selectedColor=value;
  }
  filterCars(){
    if(this.selectedBrand>0&& this.selectedColor==0)
    {
      let link="/cars/brand/"+this.selectedBrand;
      window.location.href=link;
    }
    if(this.selectedColor>0&& this.selectedBrand==0)
    {
      let link="/cars/color/"+this.selectedColor;
      window.location.href=link;
    }
    if(this.selectedBrand>0&& this.selectedColor>0)
    {
      let link="cars/filteredCars/color/"+this.selectedColor+"/brand/"+this.selectedBrand;
     window.location.href=link;
    }



  }


}
