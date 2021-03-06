import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { ObatTindakan }		from './obat-tindakan';
import { ENV }				from '../../environment';

@Injectable()
export class ObatTindakanService {
	private obatTindakanUrl = ENV.obatTindakanUrl;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatTindakan(): Observable<ObatTindakan[]> {
		return this.authHttp.get(this.obatTindakanUrl)
			.map((res: Response) => res.json());
	}

	getObatTindakan(id: number): Observable<ObatTindakan> {
		return this.getAllObatTindakan()
			.map(allObatTindakan => allObatTindakan.find(obat_tindakan => obat_tindakan.id == id));
	}

	getObatTindakanByTime(waktu_mulai: Date, waktu_selesai: Date, id_stok_obat: number): Observable<ObatTindakan[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_stok_obat', ''+id_stok_obat);
		params.set('waktu_mulai', waktu_mulai.toLocaleString());
		params.set('waktu_selesai', waktu_selesai.toLocaleString());

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.obatTindakanUrl+'/search_by_time', requestOptions)
		    .map((res: Response) => res.json());		
	}

	createObatTindakan(obatTindakan: ObatTindakan[]) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	  	let options = new RequestOptions({ headers: headers });
	  	let body = JSON.stringify(obatTindakan);
	  	return this.authHttp.post(this.obatTindakanUrl, body, options ).map((res: Response) => res.json());
	}
}
