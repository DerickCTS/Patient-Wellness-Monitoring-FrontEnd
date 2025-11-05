import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-item',
  template: `
    <div class="info-item">
      <mat-icon>{{ icon }}</mat-icon>
      <div class="info-content">
        <label>{{ label }}</label>
        <div class="info-value">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .info-item { display: flex; align-items: flex-start; gap: 12px; }
      mat-icon { color: #555; }
      .info-content { display: flex; flex-direction: column; }
      label { font-size: 0.8rem; color: #777; margin-bottom: 2px; }
      .info-value { font-size: 1rem; color: #000; font-weight: 500; }
    `,
  ],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class InfoItemComponent {
  @Input() icon: string = 'circle';
  @Input() label: string = 'Label';
}