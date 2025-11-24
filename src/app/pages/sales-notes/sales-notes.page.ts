import { Component, OnInit } from '@angular/core';
import { Client, SaleNote } from '../../models/workshop.models';
import { WorkshopDataService } from '../../services/workshop-data.service';

@Component({
  selector: 'app-sales-notes',
  templateUrl: './sales-notes.page.html',
  styleUrls: ['./sales-notes.page.scss'],
  standalone: false,
})
export class SalesNotesPage implements OnInit {
  notes: SaleNote[] = [];
  clients: Client[] = [];
  note: SaleNote = {
    id: '',
    clientId: '',
    date: new Date().toISOString(),
    items: [{ type: 'servicio', description: 'Servicio general', quantity: 1, price: 1200 }],
    discount: 0,
    taxRate: 16,
    paymentMethod: 'efectivo',
  };

  constructor(private data: WorkshopDataService) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.notes = this.data.getSales();
    this.clients = this.data.getClients();
    this.note.taxRate = this.data.getSettings().taxRate;
  }

  addItem(type: 'servicio' | 'producto'): void {
    this.note.items.push({ type, description: '', quantity: 1, price: 0 });
  }

  totals(note: SaleNote) {
    return this.data.calculateSaleTotals(note);
  }

  save(): void {
    const payload: Omit<SaleNote, 'id'> = { ...this.note, date: new Date().toISOString() };
    this.data.addSaleNote(payload);
    this.notes = this.data.getSales();
    this.note = {
      id: '',
      clientId: '',
      date: new Date().toISOString(),
      items: [{ type: 'servicio', description: 'Servicio general', quantity: 1, price: 1200 }],
      discount: 0,
      taxRate: this.data.getSettings().taxRate,
      paymentMethod: 'efectivo',
    };
  }
}
