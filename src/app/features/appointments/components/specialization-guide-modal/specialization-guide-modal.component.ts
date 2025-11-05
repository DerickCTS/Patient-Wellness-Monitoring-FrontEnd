import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialization-guide-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialization-guide-modal.component.html',
  styleUrl: './specialization-guide-modal.component.css'
})
export class SpecializationGuideModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  // Hardcoded guide data
  specializations = [
    {
      name: 'Cardiology',
      icon: 'heart',
      description: 'Deals with disorders of the heart and blood vessels.',
      conditions: ['Heart disease and heart attacks', 'High blood pressure (hypertension)', 'Irregular heartbeat (arrhythmia)', 'Heart failure', 'Chest pain']
    },
    {
      name: 'Dermatology',
      icon: 'sun',
      description: 'Focuses on skin, hair, and nail conditions.',
      conditions: ['Acne and skin infections', 'Eczema and psoriasis', 'Skin allergies and rashes', 'Moles and skin cancer screening', 'Hair loss']
    },
    {
      name: 'General Medicine',
      icon: 'stethoscope',
      description: 'Provides comprehensive healthcare for common illnesses and chronic condition management.',
      conditions: ['Common cold and flu', 'Diabetes management', 'Thyroid disorders', 'Physical exams and wellness checks', 'Vaccinations']
    },
    {
      name: 'Neurology',
      icon: 'brain',
      description: 'Treats disorders of the nervous system and brain.',
      conditions: ['Headaches and migraines', 'Epilepsy and seizures', 'Stroke and recovery', 'Parkinson\'s disease', 'Dizziness and vertigo']
    },
    {
      name: 'Orthopedics',
      icon: 'bones',
      description: 'Deals with the musculoskeletal system (bones, joints, ligaments, tendons, and muscles).',
      conditions: ['Fractures and sprains', 'Arthritis and joint pain', 'Back and neck pain', 'Sports injuries', 'Tendonitis']
    },
    {
      name: 'Pediatrics',
      icon: 'child',
      description: 'Specializes in the health and medical care of infants, children, and adolescents.',
      conditions: ['Routine checkups (well-child visits)', 'Infectious diseases', 'Developmental delays', 'Asthma and allergies', 'Vaccinations']
    }
  ];

  // Helper function to map names to Lucide icons
  getIconName(name: string): string {
    switch (name) {
      case 'Cardiology': return 'heart';
      case 'Dermatology': return 'sun';
      case 'General Medicine': return 'stethoscope';
      case 'Neurology': return 'brain';
      case 'Orthopedics': return 'bones';
      case 'Pediatrics': return 'child';
      default: return 'help-circle';
    }
  }
}
