import { Component, OnInit } from '@angular/core';
import { Settings } from '../../models/workshop.models';
import { WorkshopDataService } from '../../services/workshop-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  settings: Settings = { taxRate: 16, defaultDiscount: 0, workshopName: '', paymentOptions: [] };
  newPayment = '';

  constructor(private data: WorkshopDataService) {}

  ngOnInit() {
    this.settings = this.data.getSettings();
  }

  save(): void {
    this.settings = this.data.updateSettings(this.settings);
  }

  addPayment(): void {
    if (!this.newPayment) return;
    this.settings.paymentOptions = [...this.settings.paymentOptions, this.newPayment];
    this.newPayment = '';
  }
}
