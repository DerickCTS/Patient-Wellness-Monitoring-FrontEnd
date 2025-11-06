// src/app/feature/appointment-patient/components/specialization-guide/specialization-guide.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

// --- STANDALONE IMPORTS ---
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faClose,
  faHeart,
  faDroplet,
  faStethoscope,
  faBrain,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-specialization-guide',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './specialization-guide.html',
  styleUrls: ['./specialization-guide.scss'],
})
export class SpecializationGuideComponent {
  @Output() closeModal = new EventEmitter<void>();

  // Icons
  faClose = faClose;
  faHeart = faHeart;
  faDroplet = faDroplet;
  faStethoscope = faStethoscope;
  faBrain = faBrain;

  // Hardcoded specialization data 
  specializations = [
    {
      icon: faHeart,
      name: 'Cardiology',
      description: 'Deals with disorders of the heart and blood vessels.',
      conditions: [
        'Heart disease and heart attacks',
        'High blood pressure (hypertension)',
        'Irregular heartbeat (arrhythmia)',
        'Heart failure',
        'Chest pain',
      ],
    },
    {
      icon: faDroplet,
      name: 'Dermatology',
      description: 'Focuses on skin, hair, and nail conditions.',
      conditions: [
        'Acne and skin infections',
        'Eczema and psoriasis',
        'Skin allergies and rashes',
        'Moles and skin cancer screening',
        'Hair loss',
      ],
    },
    {
      icon: faStethoscope,
      name: 'General Medicine',
      description: 'Provides comprehensive primary care for adults.',
      conditions: [
        'Routine checkups',
        'Common illnesses (flu, colds)',
        'Chronic disease management',
        'Preventive care',
        'Health education',
      ],
    },
    {
      icon: faBrain,
      name: 'Neurology',
      description: 'Specializes in disorders of the nervous system.',
      conditions: [
        'Headaches and migraines',
        'Stroke',
        'Epilepsy (seizures)',
        'Multiple sclerosis (MS)',
        'Parkinson\'s disease',
      ],
    },
  ];
}