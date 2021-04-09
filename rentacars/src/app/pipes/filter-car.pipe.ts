import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value: CarDto[], filterCarText: string): CarDto[] {
    filterCarText = filterCarText?filterCarText.toLocaleLowerCase():""
    
    return filterCarText?value.filter((c:CarDto)=>c.brandName.toLocaleLowerCase().indexOf(filterCarText)!==-1):value;
  }

}
