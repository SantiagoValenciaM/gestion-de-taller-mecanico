import { Component, OnInit } from '@angular/core';
import { ServiceOrder, StaffMember } from '../../models/workshop.models';
import { WorkshopDataService } from '../../services/workshop-data.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
  standalone: false,
})
export class StaffPage implements OnInit {
  staff: StaffMember[] = [];
  selected?: StaffMember;
  newStaff: Partial<StaffMember> = { name: '', role: 'Mecánico', specialty: '', schedule: '' };
  assignment = { mechanicId: '', orderId: '' };
  orders: ServiceOrder[] = [];

  constructor(private data: WorkshopDataService) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.staff = this.data.getStaff();
    this.orders = this.data.getServiceOrders();
    this.selected = this.staff[0];
    this.assignment.mechanicId = this.staff.find((s) => s.role === 'Mecánico')?.id || '';
    this.assignment.orderId = this.orders[0]?.id || '';
  }

  select(staff: StaffMember): void {
    this.selected = staff;
  }

  addStaff(): void {
    this.data.addStaff(this.newStaff);
    this.newStaff = { name: '', role: 'Mecánico', specialty: '', schedule: '' };
    this.load();
  }

  assign(): void {
    if (!this.assignment.mechanicId || !this.assignment.orderId) return;
    this.data.assignService(this.assignment.mechanicId, this.assignment.orderId);
    this.load();
  }

  mechanicsOnly(): StaffMember[] {
    return this.staff.filter((s) => s.role === 'Mecánico');
  }
}
