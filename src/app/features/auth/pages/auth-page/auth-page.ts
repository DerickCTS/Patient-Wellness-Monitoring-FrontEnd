import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

// --- ADD THESE IMPORTS ---
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginFormComponent } from '../../components/login-form/login-form';
import { PatientRegisterFormComponent } from '../../components/patient-register-form/patient-register-form';
import { DoctorRegisterFormComponent } from '../../components/doctor-register-form/doctor-register-form';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.html',
  styleUrls: ['./auth-page.scss'],

  // --- ADD THIS 'imports' ARRAY ---
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    LoginFormComponent,
    PatientRegisterFormComponent,
    DoctorRegisterFormComponent,
  ],
})
export class AuthPageComponent {
  // --- State Management ---
  
  // This manages the 'Login' vs 'Sign Up' tab
  activeTab: 'login' | 'signup' = 'login';
  
  // This manages which role is selected *on the login tab*
  loginRole: 'Patient' | 'Doctor' | null = null;
  
  // This manages which role is selected *on the sign up tab*
  signupRole: 'Patient' | 'Doctor' | null = null;

  // --- Event Handlers ---

  onTabChange(event: MatTabChangeEvent): void {
    this.activeTab = event.tab.textLabel.toLowerCase() as 'login' | 'signup';
    // Reset selections when switching tabs
    this.loginRole = null;
    this.signupRole = null;
  }

  // Called when user clicks a card on the Login tab
  selectLoginRole(role: 'Patient' | 'Doctor'): void {
    this.loginRole = role;
  }

  // Called when user clicks a card on the Sign Up tab
  selectSignupRole(role: 'Patient' | 'Doctor'): void {
    this.signupRole = role;
  }

  // Resets the view to the role selection cards
  changeRole(): void {
    if (this.activeTab === 'login') {
      this.loginRole = null;
    } else {
      this.signupRole = null;
    }
  }
}