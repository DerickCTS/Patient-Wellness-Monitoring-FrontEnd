import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent // Import your navbar
  ],
  templateUrl: './private-layout.html',
  styleUrls: ['./private-layout.scss']
})
export class PrivateLayoutComponent {}