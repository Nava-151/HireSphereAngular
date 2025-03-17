import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SuccessStoriesComponent } from "../success-stories/success-stories.component";
@Component({
  selector: 'app-home-page',
imports: [CommonModule, MatCardModule, MatButtonModule, MatToolbarModule, MatTabsModule, SuccessStoriesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private router: Router){}
navigateToRegister() {
  this.router.navigate(['/register']);}

  images = [
    "1.png",
    "2.png",
    "3.png",
  ];
  currentIndex: number = 0;
  private intervalId: any;

  ngOnInit() {
    this.startImageRotation();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Clear interval when component is destroyed
  }

  startImageRotation() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length; // Loop back to first image
    }, 3000); // Change image every 3 seconds
  }
}
