import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from './models/workshop.models';
import { AuthService } from './services/auth.service';
import { WorkshopDataService } from './services/workshop-data.service';

interface NavItem {
  title: string;
  url: string;
  icon: string;
  roles?: UserRole[];
  badge?: 'orders' | 'budgets' | 'inventory';
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  user: User | null = null;
  metrics = {
    activeOrders: 0,
    budgetsPending: 0,
    lowStock: 0,
  };

  navItems: NavItem[] = [
    { title: 'Panel', url: '/dashboard', icon: 'grid-outline' },
    { title: 'Clientes', url: '/clients', icon: 'people-outline' },
    { title: 'Presupuestos', url: '/budgets', icon: 'pricetag-outline', badge: 'budgets' },
    { title: 'Órdenes de Servicio', url: '/service-orders', icon: 'construct-outline', badge: 'orders' },
    { title: 'Inventario', url: '/inventory', icon: 'cube-outline', badge: 'inventory' },
    { title: 'Control de Personal', url: '/staff', icon: 'id-card-outline' },
    { title: 'Notas de Venta', url: '/sales-notes', icon: 'document-text-outline' },
    { title: 'Reportes', url: '/reports', icon: 'analytics-outline' },
    { title: 'Configuración', url: '/settings', icon: 'settings-outline', roles: ['Administrador'] },
  ];

  constructor(private auth: AuthService, private data: WorkshopDataService, private router: Router) {
    this.auth.currentUser$.subscribe((user) => {
      this.user = user;
      this.refreshMetrics();
    });
  }

  get items(): NavItem[] {
    const user = this.user;
    if (!user) return [];
    return this.navItems.filter((item) => !item.roles || item.roles.includes(user.role));
  }

  badgeValue(item: NavItem): number | null {
    switch (item.badge) {
      case 'orders':
        return this.metrics.activeOrders;
      case 'budgets':
        return this.metrics.budgetsPending;
      case 'inventory':
        return this.metrics.lowStock;
      default:
        return null;
    }
  }

  refreshMetrics(): void {
    const metrics = this.data.getDashboardMetrics();
    this.metrics = {
      activeOrders: metrics.activeOrders,
      budgetsPending: metrics.budgetsPending,
      lowStock: metrics.lowStock,
    };
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
