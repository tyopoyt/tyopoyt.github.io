import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffleArray'
})
export class ShuffleArrayPipe implements PipeTransform {

  transform(array: Array<any>): Array<any> {
    let cur = array.length;
    let swap;

    while (cur > 0) {
  
      swap = Math.floor(Math.random() * cur);
      cur--;
  
      [array[cur], array[swap]] = [array[swap], array[cur]];
    }
  
    return array;
  }

}
