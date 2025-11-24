import { Injectable } from '@angular/core';
import {
  Budget,
  BudgetLine,
  BudgetStatus,
  Client,
  InventoryMovement,
  InventoryProduct,
  OrderStatus,
  ReportSummary,
  SaleItem,
  SaleNote,
  ServiceActivity,
  ServiceOrder,
  Settings,
  StaffMember,
  UserRole,
  Vehicle,
} from '../models/workshop.models';

@Injectable({
  providedIn: 'root',
})
export class WorkshopDataService {
  private clients: Client[] = [
    {
      id: 'cli-1',
      name: 'Carlos Torres',
      contact: 'Carlos Torres',
      email: 'carlos.torres@correo.com',
      phone: '331-555-1122',
      vehicles: [
        {
          id: 'veh-1',
          plates: 'JXY-123-A',
          brand: 'Nissan',
          model: 'Versa',
          year: 2021,
          mileage: 48200,
          notes: 'Usar aceite sintético 5W30',
        },
      ],
      history: [
        {
          id: 'h-1',
          vehicleId: 'veh-1',
          description: 'Servicio 40,000 km',
          date: '2024-10-12',
          amount: 2850,
          mileage: 40000,
        },
        {
          id: 'h-2',
          vehicleId: 'veh-1',
          description: 'Cambio de pastillas delanteras',
          date: '2025-02-20',
          amount: 1650,
          mileage: 46000,
        },
      ],
    },
    {
      id: 'cli-2',
      name: 'Mariana López',
      contact: 'Mariana López',
      email: 'mariana.lopez@empresa.com',
      phone: '332-999-4501',
      vehicles: [
        {
          id: 'veh-2',
          plates: 'JPR-889-B',
          brand: 'Toyota',
          model: 'Corolla',
          year: 2019,
          mileage: 72000,
          notes: 'Revisar amortiguadores en cada visita',
        },
        {
          id: 'veh-3',
          plates: 'JTR-552-C',
          brand: 'Mazda',
          model: 'CX-30',
          year: 2023,
          mileage: 21000,
        },
      ],
      history: [
        {
          id: 'h-3',
          vehicleId: 'veh-2',
          description: 'Reemplazo de amortiguadores traseros',
          date: '2025-01-05',
          amount: 5100,
          mileage: 68000,
        },
      ],
    },
    {
      id: 'cli-3',
      name: 'Flotilla Rápida MX',
      contact: 'Javier Neri',
      email: 'logistica@rapidamx.com',
      phone: '331-770-8800',
      vehicles: [
        {
          id: 'veh-4',
          plates: 'JZX-777-D',
          brand: 'Ford',
          model: 'Transit',
          year: 2020,
          mileage: 132000,
          notes: 'Usar discos ventilados, vehículo de carga',
        },
      ],
      history: [
        {
          id: 'h-4',
          vehicleId: 'veh-4',
          description: 'Reemplazo de clutch',
          date: '2025-02-02',
          amount: 8900,
          mileage: 128000,
        },
      ],
    },
  ];

  private budgets: Budget[] = [
    {
      id: 'P-1001',
      clientId: 'cli-1',
      vehicleId: 'veh-1',
      status: 'aprobado',
      discount: 5,
      createdAt: '2025-03-01',
      notes: 'Cliente aprobó por WhatsApp',
      lines: [
        {
          concept: 'Servicio 50,000 km',
          laborHours: 2.5,
          laborRate: 480,
          parts: [
            { name: 'Filtro de aceite', quantity: 1, price: 350, productId: 'prd-2' },
            { name: 'Aceite sintético 5W30', quantity: 4, price: 180, productId: 'prd-1' },
          ],
        },
        {
          concept: 'Ajuste de frenos delanteros',
          laborHours: 1.5,
          laborRate: 480,
          parts: [{ name: 'Pastillas cerámicas', quantity: 1, price: 1250, productId: 'prd-3' }],
        },
      ],
    },
    {
      id: 'P-1002',
      clientId: 'cli-2',
      vehicleId: 'veh-2',
      status: 'pendiente',
      discount: 0,
      createdAt: '2025-03-03',
      lines: [
        {
          concept: 'Diagnóstico eléctrico',
          laborHours: 1,
          laborRate: 520,
          parts: [],
        },
        {
          concept: 'Cambio batería AGM',
          laborHours: 0.8,
          laborRate: 520,
          parts: [{ name: 'Batería AGM 70ah', quantity: 1, price: 3250 }],
        },
      ],
    },
    {
      id: 'P-1003',
      clientId: 'cli-3',
      vehicleId: 'veh-4',
      status: 'rechazado',
      discount: 3,
      createdAt: '2025-02-20',
      lines: [
        {
          concept: 'Cambio de clutch reforzado',
          laborHours: 4.5,
          laborRate: 520,
          parts: [{ name: 'Kit clutch HD', quantity: 1, price: 7200 }],
        },
      ],
    },
  ];

  private serviceOrders: ServiceOrder[] = [
    {
      id: 'OS-501',
      clientId: 'cli-1',
      vehicleId: 'veh-1',
      budgetId: 'P-1001',
      status: 'en-proceso',
      mechanicId: 'st-1',
      activities: [
        { description: 'Recepción y diagnóstico', mechanicId: 'st-4', durationHours: 0.5, timestamp: '2025-03-02T09:30:00' },
        { description: 'Cambio de aceite y filtros', mechanicId: 'st-1', durationHours: 1.2, timestamp: '2025-03-02T11:00:00' },
      ],
      comments: ['Se encontró fuga ligera en reten', 'Cliente pidió foto de piezas cambiadas'],
      eta: '2025-03-03T18:00:00',
      startedAt: '2025-03-02T09:00:00',
    },
    {
      id: 'OS-502',
      clientId: 'cli-2',
      vehicleId: 'veh-2',
      budgetId: 'P-1002',
      status: 'pendiente',
      mechanicId: 'st-2',
      activities: [],
      comments: ['Esperando autorización de batería'],
      eta: '2025-03-04T12:00:00',
      startedAt: '2025-03-03T10:00:00',
    },
    {
      id: 'OS-503',
      clientId: 'cli-3',
      vehicleId: 'veh-4',
      status: 'completada',
      mechanicId: 'st-3',
      activities: [
        { description: 'Prueba de ruta', mechanicId: 'st-3', durationHours: 0.6, timestamp: '2025-02-20T17:00:00' },
        { description: 'Ajuste de frenos', mechanicId: 'st-3', durationHours: 1.1, timestamp: '2025-02-20T15:00:00' },
      ],
      comments: ['Se entregó con fotos y video'],
      eta: '2025-02-21T13:00:00',
      startedAt: '2025-02-19T09:30:00',
      completedAt: '2025-02-20T18:30:00',
    },
  ];

  private inventory: InventoryProduct[] = [
    {
      id: 'prd-1',
      name: 'Aceite sintético 5W30',
      sku: 'OIL-5W30',
      stock: 18,
      minStock: 10,
      price: 180,
      lastMovement: '2025-03-02',
    },
    {
      id: 'prd-2',
      name: 'Filtro de aceite',
      sku: 'FLT-ACE',
      stock: 12,
      minStock: 8,
      price: 350,
      lastMovement: '2025-03-01',
    },
    {
      id: 'prd-3',
      name: 'Pastillas de freno cerámicas',
      sku: 'BRK-CR01',
      stock: 6,
      minStock: 6,
      price: 1250,
      lastMovement: '2025-02-28',
    },
    {
      id: 'prd-4',
      name: 'Batería AGM 70ah',
      sku: 'BAT-AGM70',
      stock: 2,
      minStock: 3,
      price: 3250,
      lastMovement: '2025-03-03',
    },
  ];

  private movements: InventoryMovement[] = [
    { productId: 'prd-1', type: 'salida', quantity: 4, note: 'Servicio OS-501', date: '2025-03-02' },
    { productId: 'prd-3', type: 'salida', quantity: 1, note: 'Servicio OS-501', date: '2025-03-02' },
    { productId: 'prd-4', type: 'salida', quantity: 1, note: 'Cotización P-1002', date: '2025-03-03' },
    { productId: 'prd-2', type: 'entrada', quantity: 10, note: 'Compra semanal', date: '2025-02-27' },
  ];

  private staff: StaffMember[] = [
    {
      id: 'st-1',
      name: 'Luis Pérez',
      role: 'Mecánico',
      specialty: 'Motor y tren motriz',
      schedule: 'L-V 9:00 a 18:00',
      productivity: { completed: 12, active: 2, hours: 38 },
      attendance: [
        { date: '2025-03-01', status: 'presente' },
        { date: '2025-03-02', status: 'presente' },
        { date: '2025-03-03', status: 'presente' },
      ],
      assignedServices: ['OS-501'],
    },
    {
      id: 'st-2',
      name: 'Sofía Díaz',
      role: 'Mecánico',
      specialty: 'Eléctrico y diagnóstico',
      schedule: 'L-S 8:00 a 17:00',
      productivity: { completed: 15, active: 1, hours: 40 },
      attendance: [
        { date: '2025-03-01', status: 'presente' },
        { date: '2025-03-02', status: 'tarde' },
        { date: '2025-03-03', status: 'presente' },
      ],
      assignedServices: ['OS-502'],
    },
    {
      id: 'st-3',
      name: 'Ana Beltrán',
      role: 'Administrador',
      specialty: 'Operación y compras',
      schedule: 'L-V 9:00 a 18:00',
      productivity: { completed: 8, active: 0, hours: 35 },
      attendance: [
        { date: '2025-03-01', status: 'presente' },
        { date: '2025-03-02', status: 'presente' },
        { date: '2025-03-03', status: 'presente' },
      ],
      assignedServices: [],
    },
    {
      id: 'st-4',
      name: 'Brenda Ramos',
      role: 'Cajero',
      specialty: 'Cobranza y recepción',
      schedule: 'L-S 9:00 a 17:00',
      productivity: { completed: 20, active: 0, hours: 32 },
      attendance: [
        { date: '2025-03-01', status: 'presente' },
        { date: '2025-03-02', status: 'presente' },
        { date: '2025-03-03', status: 'presente' },
      ],
      assignedServices: ['OS-501'],
    },
  ];

  private sales: SaleNote[] = [
    {
      id: 'V-9001',
      clientId: 'cli-1',
      date: '2025-03-02T18:30:00',
      discount: 5,
      taxRate: 16,
      paymentMethod: 'tarjeta',
      items: [
        { type: 'servicio', description: 'Servicio 50,000 km', quantity: 1, price: 2650 },
        { type: 'producto', description: 'Pastillas cerámicas', quantity: 1, price: 1250 },
      ],
    },
    {
      id: 'V-9002',
      clientId: 'cli-3',
      date: '2025-02-20T19:00:00',
      discount: 0,
      taxRate: 16,
      paymentMethod: 'transferencia',
      items: [
        { type: 'servicio', description: 'Ajuste de frenos', quantity: 1, price: 1800 },
        { type: 'servicio', description: 'Prueba de ruta', quantity: 1, price: 600 },
      ],
    },
  ];

  private settings: Settings = {
    taxRate: 16,
    defaultDiscount: 5,
    workshopName: 'Taller Torque+',
    paymentOptions: ['efectivo', 'tarjeta', 'transferencia'],
  };

  getSettings(): Settings {
    return { ...this.settings };
  }

  updateSettings(settings: Partial<Settings>): Settings {
    this.settings = { ...this.settings, ...settings };
    return this.getSettings();
  }

  private newId(prefix: string): string {
    return `${prefix}-${Math.floor(Math.random() * 9000 + 1000)}`;
  }

  private findVehicle(clientId: string, vehicleId: string): Vehicle | undefined {
    return this.clients
      .find((c) => c.id === clientId)
      ?.vehicles.find((v) => v.id === vehicleId);
  }

  getClients(): Client[] {
    return [...this.clients];
  }

  addClient(client: Partial<Client>, vehicle?: Partial<Vehicle>): Client {
    const newClient: Client = {
      id: this.newId('CLI'),
      name: client.name || 'Cliente sin nombre',
      contact: client.contact || client.name || 'Contacto',
      email: client.email || '',
      phone: client.phone || '',
      vehicles: [],
      history: [],
    };

    if (vehicle) {
      newClient.vehicles.push({
        id: this.newId('VEH'),
        brand: vehicle.brand || '',
        model: vehicle.model || '',
        plates: vehicle.plates || '',
        year: vehicle.year || new Date().getFullYear(),
        mileage: vehicle.mileage || 0,
        notes: vehicle.notes || '',
        vin: vehicle.vin,
      });
    }

    this.clients = [...this.clients, newClient];
    return newClient;
  }

  addVehicle(clientId: string, vehicle: Partial<Vehicle>): Vehicle | undefined {
    const client = this.clients.find((c) => c.id === clientId);
    if (!client) {
      return undefined;
    }
    const newVehicle: Vehicle = {
      id: this.newId('VEH'),
      brand: vehicle.brand || '',
      model: vehicle.model || '',
      plates: vehicle.plates || '',
      year: vehicle.year || new Date().getFullYear(),
      mileage: vehicle.mileage || 0,
      notes: vehicle.notes || '',
      vin: vehicle.vin,
    };
    client.vehicles = [...client.vehicles, newVehicle];
    return newVehicle;
  }

  getBudgets(): Budget[] {
    return [...this.budgets];
  }

  calculateBudgetTotal(budget: Budget): { subtotal: number; discountAmount: number; total: number } {
    const subtotal = budget.lines.reduce((sum, line) => {
      const partsTotal = line.parts.reduce((parts, part) => parts + part.quantity * part.price, 0);
      const laborTotal = line.laborHours * line.laborRate;
      return sum + partsTotal + laborTotal;
    }, 0);
    const discountAmount = (subtotal * (budget.discount || 0)) / 100;
    const total = subtotal - discountAmount;
    return { subtotal, discountAmount, total };
  }

  addBudget(budget: Omit<Budget, 'id'>): Budget {
    const newBudget: Budget = { ...budget, id: this.newId('P') };
    this.budgets = [newBudget, ...this.budgets];
    return newBudget;
  }

  updateBudgetStatus(id: string, status: BudgetStatus): void {
    this.budgets = this.budgets.map((b) => (b.id === id ? { ...b, status } : b));
  }

  getServiceOrders(): ServiceOrder[] {
    return [...this.serviceOrders];
  }

  addServiceOrder(order: Omit<ServiceOrder, 'id' | 'activities' | 'comments' | 'startedAt'>): ServiceOrder {
    const newOrder: ServiceOrder = {
      ...order,
      id: this.newId('OS'),
      activities: [],
      comments: [],
      startedAt: new Date().toISOString(),
    };
    this.serviceOrders = [newOrder, ...this.serviceOrders];
    return newOrder;
  }

  createOrderFromBudget(budgetId: string, mechanicId: string): ServiceOrder | undefined {
    const budget = this.budgets.find((b) => b.id === budgetId);
    if (!budget) {
      return undefined;
    }
    const order: ServiceOrder = {
      id: this.newId('OS'),
      budgetId: budget.id,
      clientId: budget.clientId,
      vehicleId: budget.vehicleId,
      status: 'pendiente',
      mechanicId,
      activities: [],
      comments: ['Orden generada desde presupuesto'],
      startedAt: new Date().toISOString(),
    };
    this.serviceOrders = [order, ...this.serviceOrders];
    return order;
  }

  updateOrderStatus(id: string, status: OrderStatus): void {
    this.serviceOrders = this.serviceOrders.map((o) =>
      o.id === id ? { ...o, status, completedAt: status === 'completada' ? new Date().toISOString() : o.completedAt } : o,
    );
  }

  logActivity(orderId: string, activity: ServiceActivity): void {
    this.serviceOrders = this.serviceOrders.map((order) =>
      order.id === orderId ? { ...order, activities: [...order.activities, activity] } : order,
    );
  }

  addComment(orderId: string, comment: string): void {
    this.serviceOrders = this.serviceOrders.map((order) =>
      order.id === orderId ? { ...order, comments: [...order.comments, comment] } : order,
    );
  }

  getInventory(): InventoryProduct[] {
    return [...this.inventory];
  }

  getMovements(): InventoryMovement[] {
    return [...this.movements];
  }

  addProduct(product: Partial<InventoryProduct>): InventoryProduct {
    const newProduct: InventoryProduct = {
      id: this.newId('PRD'),
      name: product.name || 'Producto',
      sku: product.sku || this.newId('SKU'),
      stock: product.stock ?? 0,
      minStock: product.minStock ?? 1,
      price: product.price ?? 0,
      lastMovement: new Date().toISOString(),
    };
    this.inventory = [newProduct, ...this.inventory];
    return newProduct;
  }

  recordMovement(movement: InventoryMovement): void {
    this.movements = [{ ...movement, date: movement.date || new Date().toISOString() }, ...this.movements];
    this.inventory = this.inventory.map((p) => {
      if (p.id !== movement.productId) {
        return p;
      }
      let stock = p.stock;
      if (movement.type === 'entrada') {
        stock += movement.quantity;
      } else if (movement.type === 'salida') {
        stock -= movement.quantity;
      }
      return { ...p, stock, lastMovement: movement.date };
    });
  }

  getLowStock(): InventoryProduct[] {
    return this.inventory.filter((p) => p.stock <= p.minStock);
  }

  getStaff(): StaffMember[] {
    return [...this.staff];
  }

  addStaff(member: Partial<StaffMember>): StaffMember {
    const newMember: StaffMember = {
      id: this.newId('STF'),
      name: member.name || 'Colaborador',
      role: (member.role as UserRole) || 'Mecánico',
      specialty: member.specialty || 'General',
      schedule: member.schedule || 'L-V',
      productivity: member.productivity || { completed: 0, active: 0, hours: 0 },
      attendance: member.attendance || [],
      assignedServices: member.assignedServices || [],
    };
    this.staff = [...this.staff, newMember];
    return newMember;
  }

  assignService(mechanicId: string, orderId: string): void {
    this.staff = this.staff.map((m) =>
      m.id === mechanicId ? { ...m, assignedServices: [...new Set([...m.assignedServices, orderId])] } : m,
    );
  }

  getSales(): SaleNote[] {
    return [...this.sales];
  }

  calculateSaleTotals(note: SaleNote): { subtotal: number; discountAmount: number; taxAmount: number; total: number } {
    const subtotal = note.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const discountAmount = (subtotal * (note.discount || 0)) / 100;
    const taxedBase = subtotal - discountAmount;
    const taxAmount = (taxedBase * (note.taxRate || this.settings.taxRate)) / 100;
    const total = taxedBase + taxAmount;
    return { subtotal, discountAmount, taxAmount, total };
  }

  addSaleNote(note: Omit<SaleNote, 'id'>): SaleNote {
    const newSale: SaleNote = { ...note, id: this.newId('V') };
    this.sales = [newSale, ...this.sales];
    return newSale;
  }

  getReportSummary(): ReportSummary {
    const salesTotals = this.sales.reduce(
      (acc, sale) => {
        const totals = this.calculateSaleTotals(sale);
        const saleDate = new Date(sale.date);
        const now = new Date();
        const diffDays = (now.getTime() - saleDate.getTime()) / (1000 * 3600 * 24);
        acc.month += totals.total;
        if (diffDays <= 7) {
          acc.week += totals.total;
        }
        if (diffDays <= 1) {
          acc.today += totals.total;
        }
        return acc;
      },
      { today: 0, week: 0, month: 0 },
    );

    const topProducts = [...this.inventory].sort((a, b) => a.stock - b.stock).slice(0, 3);
    const topServices = this.budgets
      .reduce<string[]>((acc, budget) => {
        budget.lines.forEach((line) => acc.push(line.concept));
        return acc;
      }, [])
      .slice(0, 5);

    const productivity = this.staff
      .filter((s) => s.role === 'Mecánico')
      .map((m) => ({ mechanic: m.name, completed: m.productivity.completed, hours: m.productivity.hours }));

    return {
      salesToday: Math.round(salesTotals.today),
      salesWeek: Math.round(salesTotals.week),
      salesMonth: Math.round(salesTotals.month),
      topProducts,
      topServices,
      productivity,
    };
  }

  getDashboardMetrics() {
    const budgetsApproved = this.budgets.filter((b) => b.status === 'aprobado').length;
    const budgetsPending = this.budgets.filter((b) => b.status === 'pendiente').length;
    const activeOrders = this.serviceOrders.filter((o) => o.status !== 'completada').length;
    const lowStock = this.getLowStock().length;
    const salesTotals = this.getReportSummary();
    return {
      budgetsApproved,
      budgetsPending,
      activeOrders,
      lowStock,
      salesMonth: salesTotals.salesMonth,
    };
  }

  getVehicles(clientId: string): Vehicle[] {
    return this.clients.find((c) => c.id === clientId)?.vehicles ?? [];
  }
}
