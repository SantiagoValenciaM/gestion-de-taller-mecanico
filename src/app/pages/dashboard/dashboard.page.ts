import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Budget, InventoryProduct, ReportSummary, ServiceOrder } from '../../models/workshop.models';
import { WorkshopDataService } from '../../services/workshop-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  metrics = {
    budgetsApproved: 0,
    budgetsPending: 0,
    activeOrders: 0,
    lowStock: 0,
    salesMonth: 0,
  };
  budgets: Budget[] = [];
  orders: ServiceOrder[] = [];
  lowStock: InventoryProduct[] = [];
  summary?: ReportSummary;

  constructor(private data: WorkshopDataService, private router: Router) {}

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.metrics = this.data.getDashboardMetrics();
    this.budgets = this.data.getBudgets().slice(0, 3);
    this.orders = this.data.getServiceOrders().slice(0, 3);
    this.lowStock = this.data.getLowStock();
    this.summary = this.data.getReportSummary();
  }

  statusColor(status: string): string {
    if (status === 'aprobado' || status === 'completada') return 'success';
    if (status === 'pendiente' || status === 'en-proceso') return 'warning';
    return 'medium';
  }

  goTo(url: string): void {
    this.router.navigate([url]);
  }
}
