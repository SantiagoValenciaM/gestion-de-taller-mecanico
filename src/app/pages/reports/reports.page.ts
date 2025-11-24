import { Component, OnInit } from '@angular/core';
import { Budget, BudgetLine, InventoryProduct, ReportSummary, ServiceOrder } from '../../models/workshop.models';
import { WorkshopDataService } from '../../services/workshop-data.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: false,
})
export class ReportsPage implements OnInit {
  summary?: ReportSummary;
  inventory: InventoryProduct[] = [];
  orders: ServiceOrder[] = [];
  budgets: Budget[] = [];
  exportMessage = '';

  constructor(private data: WorkshopDataService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.summary = this.data.getReportSummary();
    this.inventory = this.data.getInventory();
    this.orders = this.data.getServiceOrders();
    this.budgets = this.data.getBudgets();
  }

  serviceBreakdown(): { name: string; count: number }[] {
    const counts: Record<string, number> = {};
    this.budgets.forEach((b: Budget) =>
      b.lines.forEach((l: BudgetLine) => {
        counts[l.concept] = (counts[l.concept] || 0) + 1;
      }),
    );
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }

  export(type: 'pdf' | 'excel'): void {
    this.exportMessage = `Exportado en ${type.toUpperCase()} (simulado)`;
    setTimeout(() => (this.exportMessage = ''), 2500);
  }
}
