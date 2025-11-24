import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email = 'admin@torque.com';
  password = 'admin123';
  remember = true;
  useBiometric = false;
  message = '';
  biometricReady = false;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const saved = this.auth.getSavedSession();
    if (saved) {
      this.email = saved.email;
      this.remember = true;
      this.biometricReady = this.auth.isBiometricEnabledFor(saved.email);
    }
  }

  login(): void {
    const user = this.auth.login(this.email, this.password, this.remember, this.useBiometric);
    if (user) {
      if (this.useBiometric) {
        this.auth.enableBiometric(user.email);
      }
      const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/dashboard';
      this.router.navigate([redirect]);
      this.message = '';
    } else {
      this.message = 'Credenciales incorrectas o biometría no autorizada.';
    }
  }

  quickFill(email: string, password: string): void {
    this.email = email;
    this.password = password;
  }
}
