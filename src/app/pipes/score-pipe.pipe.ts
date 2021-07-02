import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scorePipe'
})
export class ScorePipePipe implements PipeTransform {

  constructor(private pipe: DecimalPipe) {}

  transform(value: number): string {
    const centiseconds = Math.floor((value / 10) % 100);
    const seconds = Math.floor((value / 1000) % 60)
    const minutes = Math.floor((value / 60000) % 60);
    const hours = Math.floor(value / 3600000)
    return `${hours}:${this.pipe.transform(minutes, '2.0')}:${this.pipe.transform(seconds, '2.0')}.${this.pipe.transform(centiseconds, '2.0')}`;
  }

}
