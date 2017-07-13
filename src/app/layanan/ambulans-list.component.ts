import { Component, OnInit }		from '@angular/core';

import { Ambulans } 					from './ambulans';
import { AmbulansService }		from './ambulans.service';

@Component({
 	selector: 'ambulans-list-page',
 	templateUrl: './ambulans-list.component.html',
 	providers: [AmbulansService]
})

export class AmbulansListComponent implements OnInit {
	allAmbulans: Ambulans[];
	ambulansModal: Ambulans = null;
  ambulansModalNama: string = null;

	public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama";
  public sortOrder = "asc";

	constructor(
		private ambulansService: AmbulansService
	) {}

	ngOnInit() {
		this.ambulansService.getAllAmbulans().subscribe(
      data => { this.allAmbulans = data }
    );
	}

  newAmbulans() {
    this.ambulansModal = new Ambulans();
    this.ambulansModal.status = "available";
  }

  createAmbulans() {
    this.ambulansService.createAmbulans(this.ambulansModal).subscribe(
      data => { window.location.reload() }
    );
  }

	editAmbulans(nama: string, ambulans: Ambulans) {
    this.ambulansModalNama = nama;
    this.ambulansModal = Object.assign({}, ambulans);
	}

  updateAmbulans() {
    this.ambulansService.updateAmbulans(this.ambulansModalNama, this.ambulansModal).subscribe(
      data => { window.location.reload() }
    );
  }

  destroyAmbulans(nama: string) {
    this.ambulansService.destroyAmbulans(nama).subscribe(
      data => { window.location.reload() }
    );
  }
}