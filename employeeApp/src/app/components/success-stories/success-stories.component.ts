import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-stories',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './success-stories.component.html',
  styleUrl: './success-stories.component.css'
})
export class SuccessStoriesComponent {
  successStories: {
    name: string,
    position: string,
    company: string,
    logo: string,
    feedback: string,
    hiringDetails: string,
    candidateRole: string,
    timeToHire: string,
    rating: number
  }[] = [
    {
      name: 'David Cohen',
      position: 'CTO',
      company: 'TechVision Ltd.',
      logo: 'assets/logos/techvision.png',
      feedback: 'Through this platform, we found an amazing developer who fit our team perfectly. The process was smooth and efficient! The AI matching algorithm saved us countless hours of screening candidates.',
      hiringDetails: 'Hired 3 senior developers and a project manager',
      candidateRole: 'Full Stack Developer',
      timeToHire: '2 weeks',
      rating: 5
    },
    {
      name: 'Sarah Levy',
      position: 'Head of AI Research',
      company: 'Innovate AI',
      logo: 'assets/logos/innovate-ai.png',
      feedback: 'We hired a highly skilled AI engineer in record time. The filtering system helped us find the perfect candidate! The quality of applicants was exceptional compared to other platforms we\'ve used.',
      hiringDetails: 'Found a specialized machine learning expert',
      candidateRole: 'AI Research Engineer',
      timeToHire: '10 days',
      rating: 5
    },
    {
      name: 'John Miller',
      position: 'HR Director',
      company: 'NextGen Software',
      logo: 'assets/logos/nextgen.png',
      feedback: 'Great experience! The filtering tools made it easy to narrow down our search, and we found a fantastic full-stack developer. The video interview feature streamlined our entire hiring process.',
      hiringDetails: 'Built an entire development team of 5 people',
      candidateRole: 'Full Stack Developer',
      timeToHire: '3 weeks',
      rating: 4
    },
    {
      name: 'Emily Rodriguez',
      position: 'CEO',
      company: 'DataFlow Systems',
      logo: 'assets/logos/dataflow.png',
      feedback: 'As a startup, finding the right talent quickly was crucial for us. This platform delivered beyond our expectations. We found a senior data engineer who transformed our infrastructure.',
      hiringDetails: 'Hired key technical leadership for their startup',
      candidateRole: 'Senior Data Engineer',
      timeToHire: '1 week',
      rating: 5
    },
    {
      name: 'Michael Chang',
      position: 'Product Manager',
      company: 'CloudSphere',
      logo: 'assets/logos/cloudsphere.png',
      feedback: 'The quality of candidates we found here was outstanding. Our new UX designer has completely transformed our product interface and user experience metrics have improved by 40%.',
      hiringDetails: 'Expanded their design team with specialized talent',
      candidateRole: 'Senior UX Designer',
      timeToHire: '2 weeks',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      position: 'Technical Lead',
      company: 'GlobalTech Solutions',
      logo: 'assets/logos/globaltech.png',
      feedback: 'We needed developers with very specific skills in blockchain technology. Within days, we were interviewing qualified candidates. The platform\'s filtering system is incredibly precise.',
      hiringDetails: 'Built a specialized blockchain development team',
      candidateRole: 'Blockchain Developer',
      timeToHire: '3 weeks',
      rating: 4
    }
  ];

  /**
   *
   */
  constructor(private router: Router) {
    
  }

  // These are placeholder URLs for company logos
  // In a real application, you would use actual logo URLs
  placeholderLogos = [
    'https://via.placeholder.com/150?text=TechVision',
    'https://via.placeholder.com/150?text=InnovateAI',
    'https://via.placeholder.com/150?text=NextGen',
    'https://via.placeholder.com/150?text=DataFlow',
    'https://via.placeholder.com/150?text=CloudSphere',
    'https://via.placeholder.com/150?text=GlobalTech'
  ];

  getLogoUrl=(index: number): string =>{
    return this.placeholderLogos[index % this.placeholderLogos.length];
  }


  getStarRating=(rating: number): number[] =>{
    return Array(rating).fill(0);
  }
}