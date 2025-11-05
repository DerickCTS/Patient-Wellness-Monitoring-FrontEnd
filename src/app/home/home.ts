
import { Component, signal, WritableSignal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

const mockRouter = {
  // Use 'inject(Router)' if running in a full Angular project.
  navigate: (path: string[]) => console.log(`[MOCK ROUTER] Navigating to: ${path.join('/')}`)
};


@Component({
  selector: 'app-wellness-dashboard', // Changed selector name
  templateUrl: './home.html',// Keeping previous, functional HTML file reference
  styleUrls:['./home.scss'], // Keeping previous, functional SCSS file reference
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent { 

  router = inject(Router);

  // PROPERTIES REQUIRED BY THE TEMPLATE
  routingMessage: WritableSignal<string | null> = signal(null);
  currentYear = new Date().getFullYear();

  constructor() {}

  // Navigation to the Patient Login page.
  goToUserLogin(): void {
    const msg = 'Routing initiated: Navigating to Patient Login... (Placeholder)';
    console.log(msg);
    this.routingMessage.set(msg);
    this.autoClearMessage();
    this.router.navigate(['auth']);
    // mockRouter.navigate(['/login/patient']);
  }

  // Simulates navigation to the Admin Login page.
  goToAdminLogin(): void {
    const msg = 'Routing initiated: Navigating to Admin Portal Login... (Placeholder)';
    console.log(msg);
    this.routingMessage.set(msg);
    this.autoClearMessage();
    mockRouter.navigate(['/login/admin']);
  }

  /** Clears the simulated routing message, required by the template's click handler. */
  clearMessage(): void {
    this.routingMessage.set(null);
  }

  /** Automatically clears the message after a short delay. */
  private autoClearMessage(): void {
    setTimeout(() => {
      this.clearMessage();
    }, 4000);
  }
}

