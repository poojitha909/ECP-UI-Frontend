import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    if (value && value.length > 0) {
      let arrayString = "";
      value.forEach((element, index) => {
        if (element.name) {
          if (index === 0) {
            arrayString += element.name;
          } else {
            arrayString += `, ${element.name}`;
          }
        } else {
          if (index === 0) {
            arrayString += element;
          } else {
            arrayString += `, ${element}`;
          }
        }
      });
      return arrayString;
    } else {
      return "-";
    }

  }

}
