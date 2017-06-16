import { Pipe, PipeTransform }	from '@angular/core';

@Pipe({
	name: 'filterNamaPasien'
})
export class FilterNamaPasienPipe implements PipeTransform {
  transform(items: Array<any>, param: string): Array<any> {
  	if (!items || !param) {
  		return items;
  	}
    return items.filter(item => item.nama_pasien.toLowerCase() === param.toLowerCase());
  }
}