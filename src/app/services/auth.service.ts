import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/workshop.models';

interface SavedSession {
  email: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private rememberKey = 'taller-remember';
  private biometricKey = 'taller-biometric';
  private users: User[] = [
    {
      id: 'st-3',
      name: 'Ana Beltrán',
      email: 'admin@torque.com',
      password: 'admin123',
      role: 'Administrador',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      bio: 'Gestión de operación y compras',
    },
    {
      id: 'st-1',
      name: 'Luis Pérez',
      email: 'mecanico@torque.com',
      password: 'mecanico',
      role: 'Mecánico',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      bio: 'Especialista en motor y tren motriz',
    },
    {
      id: 'st-4',
      name: 'Brenda Ramos',
      email: 'caja@torque.com',
      password: 'caja123',
      role: 'Cajero',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      bio: 'Cobranza y recepción',
    },
  ];

  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private router: Router) {
    const remembered = this.getSavedSession();
    if (remembered) {
      const match = this.users.find((u) => u.email === remembered.email);
      if (match) {
        this.currentUser.next(match);
      }
    }
  }

  login(email: string, password: string, remember = false, useBiometric = false): User | null {
    let user: User | undefined;
    if (useBiometric && this.isBiometricEnabledFor(email)) {
      user = this.users.find((u) => u.email === email);
    } else {
      user = this.users.find((u) => u.email === email && u.password === password);
    }

    if (user) {
      this.currentUser.next(user);
      if (remember) {
        this.rememberUser(user);
      } else {
        localStorage.removeItem(this.rememberKey);
      }
      return user;
    }
    return null;
  }

  logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem(this.rememberKey);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser.value;
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  rememberUser(user: User): void {
    const payload: SavedSession = { email: user.email, role: user.role };
    localStorage.setItem(this.rememberKey, JSON.stringify(payload));
  }

  enableBiometric(email: string): void {
    localStorage.setItem(this.biometricKey, email);
  }

  isBiometricEnabledFor(email: string): boolean {
    return localStorage.getItem(this.biometricKey) === email;
  }

  getSavedSession(): SavedSession | null {
    const stored = localStorage.getItem(this.rememberKey);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as SavedSession;
    } catch (err) {
      return null;
    }
  }
}
