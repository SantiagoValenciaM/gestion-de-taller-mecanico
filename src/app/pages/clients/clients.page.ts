import { Component, OnInit } from '@angular/core';
import { Client, ServiceRecord, Vehicle } from '../../models/workshop.models';
import { WorkshopDataService } from '../../services/workshop-data.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
  standalone: false,
})
export class ClientsPage implements OnInit {
  clients: Client[] = [];
  selected?: Client;
  newClient: Partial<Client> = { name: '', contact: '', email: '', phone: '' };
  newVehicle: Partial<Vehicle> = { brand: '', model: '', plates: '', year: new Date().getFullYear() };

  constructor(private data: WorkshopDataService) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.clients = this.data.getClients();
    this.selected = this.clients[0];
  }

  select(client: Client): void {
    this.selected = client;
  }

  addClient(): void {
    const created = this.data.addClient(this.newClient, this.newVehicle);
    this.clients = this.data.getClients();
    this.selected = created;
    this.newClient = { name: '', contact: '', email: '', phone: '' };
    this.newVehicle = { brand: '', model: '', plates: '', year: new Date().getFullYear() };
  }

  addVehicle(): void {
    if (!this.selected) return;
    this.data.addVehicle(this.selected.id, this.newVehicle);
    this.clients = this.data.getClients();
    this.selected = this.clients.find((c) => c.id === this.selected?.id);
    this.newVehicle = { brand: '', model: '', plates: '', year: new Date().getFullYear() };
  }

  history(): ServiceRecord[] {
    return this.selected?.history || [];
  }
}
