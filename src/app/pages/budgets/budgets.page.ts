import { Component, OnInit } from '@angular/core';
import { Budget, BudgetLine, BudgetStatus, Client, Vehicle } from '../../models/workshop.models';
import { WorkshopDataService } from '../../services/workshop-data.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
  standalone: false,
})
export class BudgetsPage implements OnInit {
  budgets: Budget[] = [];
  clients: Client[] = [];
  vehicles: Vehicle[] = [];
  filter: BudgetStatus | 'todos' = 'todos';
  newBudget: {
    clientId: string;
    vehicleId: string;
    status: BudgetStatus;
    lines: BudgetLine[];
    discount: number;
    createdAt: string;
    notes?: string;
  } = {
    clientId: '',
    vehicleId: '',
    status: 'pendiente',
    discount: 0,
    createdAt: new Date().toISOString(),
    lines: [
      {
        concept: 'Diagnóstico',
        laborHours: 1,
        laborRate: 450,
        parts: [],
      },
    ],
  };

  constructor(private data: WorkshopDataService) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.budgets = this.data.getBudgets();
    this.clients = this.data.getClients();
    this.newBudget.discount = this.data.getSettings().defaultDiscount;
    if (this.clients.length) {
      this.newBudget.clientId = this.clients[0].id;
      this.selectClient();
    }
  }

  selectClient(): void {
    this.vehicles = this.data.getVehicles(this.newBudget.clientId);
    this.newBudget.vehicleId = this.vehicles[0]?.id || '';
  }

  addLine(): void {
    this.newBudget.lines.push({ concept: 'Nuevo servicio', laborHours: 1, laborRate: 450, parts: [] });
  }

  addPart(line: BudgetLine): void {
    line.parts.push({ name: 'Parte', quantity: 1, price: 0 });
  }

  budgetTotal(budget: Budget): number {
    return this.data.calculateBudgetTotal(budget).total;
  }

  save(): void {
    const payload = { ...this.newBudget, createdAt: new Date().toISOString() };
    const created = this.data.addBudget(payload);
    this.budgets = this.data.getBudgets();
    this.filter = 'todos';
    this.newBudget = {
      clientId: '',
      vehicleId: '',
      status: 'pendiente',
      discount: this.data.getSettings().defaultDiscount,
      createdAt: new Date().toISOString(),
      lines: [
        {
          concept: 'Diagnóstico',
          laborHours: 1,
          laborRate: 450,
          parts: [],
        },
      ],
    };
    if (this.clients.length) {
      this.newBudget.clientId = this.clients[0].id;
      this.selectClient();
    }
  }

  updateStatus(budget: Budget, status: BudgetStatus): void {
    this.data.updateBudgetStatus(budget.id, status);
    this.budgets = this.data.getBudgets();
  }

  filteredBudgets(): Budget[] {
    if (this.filter === 'todos') return this.budgets;
    return this.budgets.filter((b) => b.status === this.filter);
  }
}
