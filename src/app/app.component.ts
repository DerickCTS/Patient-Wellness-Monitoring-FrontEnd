import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Patient Wellness Monitoring';

  // Define navigation items for the sidebar
  navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'fas fa-home' },
    { label: 'Appointments', path: '/appointments', icon: 'fas fa-calendar-alt' },
    { label: 'Monitoring', path: '/monitoring', icon: 'fas fa-heartbeat' },
    { label: 'Notifications', path: '/notifications', icon: 'fas fa-bell' },
  ];
}