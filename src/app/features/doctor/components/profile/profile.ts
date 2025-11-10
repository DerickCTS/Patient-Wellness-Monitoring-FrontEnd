import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { DoctorProfile } from '../../models/doctor.models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  profileData: DoctorProfile | null = null;
  profileImage: string = '';
  loading: boolean = true;

  constructor(private doctorService: DoctorService) { } 

  ngOnInit(): void {
    this.fetchProfileData();
  }

  fetchProfileData(): void {
    this.loading = true;
    this.doctorService.getDoctorProfile().subscribe({
      next: (data) => {
        this.profileData = data;
        this.profileData.doctorId = sessionStorage.getItem('userId') || ''
        this.profileImage = sessionStorage.getItem('imageUrl') || '';
        console.log(this.profileImage);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching profile data:', err);
        this.loading = false;
      }
    });
  }

  // Helper to format date display
  formatDate(dateString: Date | string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}