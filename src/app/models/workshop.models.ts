export type UserRole = 'Administrador' | 'Mecánico' | 'Cajero';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
}

export interface Vehicle {
  id: string;
  plates: string;
  brand: string;
  model: string;
  year: number;
  vin?: string;
  mileage?: number;
  notes?: string;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  description: string;
  date: string;
  amount: number;
  mileage?: number;
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  vehicles: Vehicle[];
  history: ServiceRecord[];
}

export interface BudgetPart {
  name: string;
  quantity: number;
  price: number;
  productId?: string;
}

export interface BudgetLine {
  concept: string;
  laborHours: number;
  laborRate: number;
  parts: BudgetPart[];
}

export type BudgetStatus = 'pendiente' | 'aprobado' | 'rechazado';

export interface Budget {
  id: string;
  clientId: string;
  vehicleId: string;
  status: BudgetStatus;
  lines: BudgetLine[];
  discount: number;
  createdAt: string;
  notes?: string;
}

export type OrderStatus = 'pendiente' | 'en-proceso' | 'completada';

export interface ServiceActivity {
  description: string;
  mechanicId: string;
  durationHours: number;
  timestamp: string;
}

export interface ServiceOrder {
  id: string;
  clientId: string;
  vehicleId: string;
  budgetId?: string;
  status: OrderStatus;
  mechanicId: string;
  activities: ServiceActivity[];
  comments: string[];
  eta?: string;
  startedAt: string;
  completedAt?: string;
}

export interface InventoryProduct {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  price: number;
  lastMovement: string;
}

export interface InventoryMovement {
  productId: string;
  type: 'entrada' | 'salida' | 'ajuste';
  quantity: number;
  note: string;
  date: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: UserRole | 'Recepción';
  specialty: string;
  schedule: string;
  productivity: { completed: number; active: number; hours: number };
  attendance: { date: string; status: 'presente' | 'tarde' | 'falta' }[];
  assignedServices: string[];
}

export interface SaleItem {
  type: 'servicio' | 'producto';
  description: string;
  quantity: number;
  price: number;
}

export interface SaleNote {
  id: string;
  clientId: string;
  date: string;
  items: SaleItem[];
  discount: number;
  taxRate: number;
  paymentMethod: 'efectivo' | 'tarjeta' | 'transferencia';
}

export interface ReportSummary {
  salesToday: number;
  salesWeek: number;
  salesMonth: number;
  topProducts: InventoryProduct[];
  topServices: string[];
  productivity: { mechanic: string; completed: number; hours: number }[];
}

export interface Settings {
  taxRate: number;
  defaultDiscount: number;
  workshopName: string;
  logo?: string;
  paymentOptions: string[];
}
