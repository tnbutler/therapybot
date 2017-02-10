import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'datex'
})

export class DatexPipe implements PipeTransform {
    transform(value: string, format: string = ""): string {

        if (!value || value==="") return "";
//        return moment(value).format(format);

//        let value1 = value.split(' ')[0];  //date only
//        if (!value1 || value1==="") return "";

//        var fmt ='MMM DD, YYYY';
        var fmt ='DD MMM YYYY';
        return moment(value).format(fmt);
    }
}