import { Component, OnInit } from '@angular/core';
import { InventoryMovement, InventoryProduct } from '../../models/workshop.models';
import { WorkshopDataService } from '../../services/workshop-data.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: false,
})
export class InventoryPage implements OnInit {
  products: InventoryProduct[] = [];
  lowStock: InventoryProduct[] = [];
  movements: InventoryMovement[] = [];
  newProduct: Partial<InventoryProduct> = { name: '', sku: '', stock: 0, minStock: 1, price: 0 };
  movement: InventoryMovement = {
    productId: '',
    type: 'salida',
    quantity: 1,
    note: '',
    date: new Date().toISOString().substring(0, 10),
  };

  constructor(private data: WorkshopDataService) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.products = this.data.getInventory();
    this.lowStock = this.data.getLowStock();
    this.movements = this.data.getMovements();
    this.movement.productId = this.movement.productId || this.products[0]?.id || '';
  }

  addProduct(): void {
    this.data.addProduct(this.newProduct);
    this.newProduct = { name: '', sku: '', stock: 0, minStock: 1, price: 0 };
    this.load();
  }

  recordMovement(): void {
    if (!this.movement.productId) return;
    this.data.recordMovement(this.movement);
    this.movement = {
      productId: this.products[0]?.id || '',
      type: 'salida',
      quantity: 1,
      note: '',
      date: new Date().toISOString().substring(0, 10),
    };
    this.load();
  }
}
