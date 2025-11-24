import { Component, OnInit } from '@angular/core';
import { Budget, OrderStatus, ServiceOrder, StaffMember } from '../../models/workshop.models';
import { WorkshopDataService } from '../../services/workshop-data.service';

@Component({
  selector: 'app-service-orders',
  templateUrl: './service-orders.page.html',
  styleUrls: ['./service-orders.page.scss'],
  standalone: false,
})
export class ServiceOrdersPage implements OnInit {
  orders: ServiceOrder[] = [];
  budgets: Budget[] = [];
  mechanics: StaffMember[] = [];
  filter: OrderStatus | 'todas' = 'todas';
  newOrder = { budgetId: '', mechanicId: '' };
  activityDrafts: Record<string, { description: string; durationHours: number; mechanicId: string }> = {};
  commentDrafts: Record<string, string> = {};

  constructor(private data: WorkshopDataService) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.orders = this.data.getServiceOrders();
    this.budgets = this.data.getBudgets();
    this.mechanics = this.data.getStaff().filter((s: StaffMember) => s.role === 'Mecánico');
    this.newOrder.budgetId = this.budgets.find((b) => b.status === 'aprobado')?.id || '';
    this.newOrder.mechanicId = this.mechanics[0]?.id || '';
    this.orders.forEach((order) => {
      if (!this.activityDrafts[order.id]) {
        this.activityDrafts[order.id] = { description: '', durationHours: 1, mechanicId: order.mechanicId };
      }
      if (!this.commentDrafts[order.id]) {
        this.commentDrafts[order.id] = '';
      }
    });
  }

  filteredOrders(): ServiceOrder[] {
    if (this.filter === 'todas') return this.orders;
    return this.orders.filter((o) => o.status === this.filter);
  }

  approvedBudgets(): Budget[] {
    return this.budgets.filter((b) => b.status === 'aprobado');
  }

  createFromBudget(): void {
    if (!this.newOrder.budgetId || !this.newOrder.mechanicId) return;
    this.data.createOrderFromBudget(this.newOrder.budgetId, this.newOrder.mechanicId);
    this.load();
  }

  updateStatus(order: ServiceOrder, status: OrderStatus): void {
    this.data.updateOrderStatus(order.id, status);
    this.load();
  }

  logActivity(order: ServiceOrder): void {
    const draft = this.activityDrafts[order.id];
    if (!draft?.description) return;
    this.data.logActivity(order.id, {
      description: draft.description,
      mechanicId: draft.mechanicId || order.mechanicId,
      durationHours: draft.durationHours,
      timestamp: new Date().toISOString(),
    });
    this.activityDrafts[order.id] = { description: '', durationHours: 1, mechanicId: order.mechanicId };
    this.load();
  }

  addComment(order: ServiceOrder): void {
    const text = this.commentDrafts[order.id];
    if (!text) return;
    this.data.addComment(order.id, text);
    this.commentDrafts[order.id] = '';
    this.load();
  }
}
