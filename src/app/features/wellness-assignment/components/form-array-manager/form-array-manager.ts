import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-array-manager',
  template: `
    <div class="array-container">
      <label class="array-label">{{ label }}</label>
      <div *ngFor="let control of formArray.controls; let i = index" class="array-row">
        <mat-form-field appearance="outline" class="array-field">
          <textarea matInput [formControl]="control"></textarea>
        </mat-form-field>
        <button mat-icon-button color="warn" type="button" (click)="removeItem.emit(i)" [disabled]="formArray.length <= 1">
          <mat-icon>delete_outline</mat-icon>
        </button>
      </div>
      <button mat-button type="button" (click)="addItem.emit()">
        <mat-icon>add</mat-icon>
        Add Another {{ label }}
      </button>
    </div>
  `,
  styles: [`
    .array-container { margin-bottom: 16px; }
    .array-label { font-weight: 500; margin-bottom: 8px; display: block; }
    .array-row { display: flex; align-items: center; gap: 8px; }
    .array-field { flex: 1; }
  `],
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule ],
})
export class FormArrayManagerComponent {
  @Input() label: string = 'Item';
  @Input() formArray!: FormArray;
  @Output() addItem = new EventEmitter<void>();
  @Output() removeItem = new EventEmitter<number>();
}