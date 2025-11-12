import { Component, Input, Output, EventEmitter, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientProfileDto, UpdateProfileInputDto } from '../../../../core/models/dashboard.models';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
})
export class EditProfileModalComponent implements OnInit {
  @Input({ required: true }) isOpen: boolean = false;
  @Input({ required: true }) profileData!: PatientProfileDto;

  @Output() closed = new EventEmitter<void>();
  @Output() profileSaved = new EventEmitter<UpdateProfileInputDto>();

  editableProfile: Partial<UpdateProfileInputDto> = {};
  genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  firstName = signal('');
  lastName = signal('');
  initials = computed(() => {
    const fn = this.firstName();
    const ln = this.lastName();
    return `${fn ? fn[0] : ''}${ln ? ln[0] : ''}`.toUpperCase().substring(0, 2) || '??';
  });

  ngOnInit(): void {
    this.initializeEditableProfile(this.profileData);
  }

  private initializeEditableProfile(data: PatientProfileDto): void {
    if (!data) return;
    const nameParts = data.fullName.split(' ');
    this.firstName.set(nameParts.length > 0 ? nameParts[0] : '');
    this.lastName.set(nameParts.length > 1 ? nameParts.slice(1).join(' ') : '');

    this.editableProfile = {
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: data.email,
      contactNumber: data.contactNumber,
      address: data.address,
      emergencyContactName: data.emergencyContactName,
      emergencyContactNumber: data.emergencyContactNumber,
      gender: data.gender,
    };
  }

  onSave(): void {
    if (this.editableProfile.email && this.editableProfile.contactNumber) {
      this.profileSaved.emit(this.editableProfile as UpdateProfileInputDto);
    } else {
      console.error('Validation failed: Email and Contact Number are required.');
    }
  }

  onCancel(): void {
    this.closed.emit();
    this.initializeEditableProfile(this.profileData);
  }

  onFirstNameChange(value: string): void {
    this.firstName.set(value);
    this.editableProfile.firstName = value;
  }
  onLastNameChange(value: string): void {
    this.lastName.set(value);
    this.editableProfile.lastName = value;
  }
}