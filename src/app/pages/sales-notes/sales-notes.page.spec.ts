import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesNotesPage } from './sales-notes.page';

describe('SalesNotesPage', () => {
  let component: SalesNotesPage;
  let fixture: ComponentFixture<SalesNotesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
