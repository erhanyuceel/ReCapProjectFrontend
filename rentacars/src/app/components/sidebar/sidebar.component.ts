import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  colors:Color[]=[];
  brands:Brand[]=[];
  dataLoaded=false;
  currentValue : Color | Brand | null;
  filterBrandText = "";
  filterColorText = "";
  
  constructor(
    private brandService:BrandService,
    private colorService:ColorService
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true;
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
      this.dataLoaded=true;
    })
  }

  setCurrent(value:Brand | Color){
    this.currentValue = value;
  }
  clearCurrent(){
    this.currentValue = null;
  }
  getCurrentClass(value:Brand | Color){
    if(value == this.currentValue){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  
  getAllClass(){
    if(!this.currentValue){
     return "list-group-item active"
    }
    else{
     return "list-group-item"
    }
  }

}
