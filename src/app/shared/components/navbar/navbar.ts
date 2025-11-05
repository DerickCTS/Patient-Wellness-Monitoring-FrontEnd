import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth';

// --- STANDALONE IMPORTS ---
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Import RouterLinkActive
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import the hamburger icon

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive, // Add this
    FontAwesomeModule
  ],
})
export class NavbarComponent implements OnInit {
  // State for the sidebar
  isSidebarOpen = false;

  // State for the user
  isLoggedIn = false;
  isDoctor = false;
  userName = 'Guest'; // Placeholder
  profileImageUrl = 'assets/images/default-profile.png'; // Placeholder

  // Font Awesome Icons
  faBars = faBars;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    if (role) {
      this.isLoggedIn = true;
      this.isDoctor = (role === 'Doctor');
      
      // TODO: You need to fetch the user's name and image URL
      // based on their ID from your authService
      
      // For now, we'll use placeholders
      this.userName = this.isDoctor ? 'Dr. Smith' : 'Jane Doe';
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isSidebarOpen = false; // Close sidebar on logout
  }
}