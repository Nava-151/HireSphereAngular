import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SuccessStoriesComponent } from "../success-stories/success-stories.component";
import { HeaderComponent } from '../header/header.component';
import { AboutComponent } from '../about/about.component';
@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatToolbarModule, MatTabsModule, SuccessStoriesComponent,AboutComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private router: Router) { }

  navigateToUpdate() {
    this.router.navigate(['/update']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  images = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
  ];
  currentIndex: number = 0;
  intervalId: any;

  ngOnInit() {
    this.startImageRotation();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startImageRotation() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); 
  }
}
