import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DatePipe implements PipeTransform {

  transform(value: any, format: string = 'yyyy-MM-dd'): any {
    if (!value) return value;

    // Use JavaScript's Date object and Intl.DateTimeFormat for formatting
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {};

    switch (format) {
      case 'yyyy-MM-dd':
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
        break;
      case 'yyyy-MM-dd HH:mm:ss':
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
        break;
      default:
        return value;
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

}
