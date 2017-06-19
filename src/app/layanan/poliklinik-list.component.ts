import { Component, OnInit }		from '@angular/core';

import { Poliklinik } 					from './poliklinik';
import { PoliklinikService }		from './poliklinik.service';

@Component({
 	selector: 'poliklinik-list-page',
 	templateUrl: './poliklinik-list.component.html',
 	providers: [PoliklinikService]
})

export class PoliklinikListComponent implements OnInit {
	allPoliklinik: Poliklinik[];

	constructor(
		private poliklinikService: PoliklinikService
	) {}
	
	ngOnInit() {
		this.poliklinikService.getAllPoliklinik()
			.then(allPoliklinik => this.allPoliklinik = allPoliklinik);
	}
}