import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value: Car[], filterCarText: string): Car[] {
    filterCarText = filterCarText?filterCarText.toLocaleLowerCase():""
    
    return filterCarText?value.filter((c:Car)=>c.brandName.toLocaleLowerCase().indexOf(filterCarText)!==-1):value;
  }

}
