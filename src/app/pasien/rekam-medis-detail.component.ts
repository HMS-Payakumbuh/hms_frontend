import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import * as _ from "lodash";
import { Pasien }					from './pasien';		
import { PasienService }			from './pasien.service';
import { RekamMedisService }		from './rekam-medis.service';

@Component({
 	selector: 'rekam-medis-detail-page',
 	templateUrl: './rekam-medis-detail.component.html',
 	providers: [RekamMedisService,
 				PasienService]
})

export class RekamMedisDetailComponent implements OnInit {
	response: any;
	transaksi: any;
	pasien: Pasien;
	umur: number = 0;
	listOfTindakan: number[] = [];
	allMetode = [];

	constructor(
		private rekamMedisService: RekamMedisService,
		private pasienService: PasienService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.pasienService.getPasien(+params['idPasien']))
			.subscribe(data => {
				this.pasien = data;
				console.log(this.pasien);
			});
	}

	goBack(): void {
		this.location.back();
	}

	/*private initMetodeList(items: Asuransi[]): void {
		for (let item of _.uniqBy(items, 'nama_asuransi')) {
			this.allMetode.push(item.nama_asuransi);
		}
	}

	updateCheckedTindakan(value): void {
		let html = <HTMLInputElement>document.getElementById('tindakan' + value);
		if (html.checked == true) {
			this.listOfTindakan.push(value);
		}
		else if (html.checked == false) {
			let index = this.listOfTindakan.indexOf(value);
			this.listOfTindakan.splice(index, 1);
		}
		console.log(this.listOfTindakan);
	}

	calculateAge(tanggal: string): void {
		let birthDate: Date = new Date(tanggal);
		let today: Date = new Date();
		this.umur = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		    this.umur--;
		}
		console.log(this.umur);
	}

	close(): void {
		let payload: any = {
			status: 'closed'
		};
		let transaksi: any = {
			transaksi: payload
		};

		this.transaksiService.updateTransaksi(transaksi, this.transaksi.id)
		.subscribe(data => {
			console.log(data);
		});

		let total_harga: number = 0;
		let listOfTindakan: number[] = [];
		for (let i of this.transaksi.tindakan) {
			if (i.id_pembayaran === null) {
				total_harga += i.harga;
				listOfTindakan.push(i.id);
			}
		}

		this.createPembayaran(total_harga, this.transaksi.asuransi_pasien, listOfTindakan);
	}

	bayar(metode: string = 'tunai'): void {
		if (this.listOfTindakan.length > 0) {
			let total_harga: number = 0;
			for (let i of this.listOfTindakan) {
				for (let a of this.transaksi.tindakan) {
					if (a.id === i) {
						total_harga += a.harga;
					}
				}
			}
			this.createPembayaran(total_harga, metode.toLowerCase(), this.listOfTindakan);
		}
		console.log(metode.toLowerCase());
	}

	createPembayaran(harga: number, metode: string, listOfTindakan: number[] = null): void {
		let payload: any = {
			id_transaksi: this.transaksi.id,
			harga_bayar: harga,
			metode_bayar: metode,
			tindakan: listOfTindakan
		};
		let request: any = {
			pembayaran: payload
		};

		console.log(request);
		this.pembayaranService.createPembayaran(request)
		.subscribe(data => {
			console.log(data);
		});
	}*/
}