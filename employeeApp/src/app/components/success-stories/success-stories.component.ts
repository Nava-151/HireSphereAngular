import { Component } from '@angular/core';

@Component({
  selector: 'app-success-stories',
  imports: [],
  templateUrl: './success-stories.component.html',
  styleUrl: './success-stories.component.css'
})
export class SuccessStoriesComponent {
  successStories:{name:string,company:string,feedback:string}[] = [
    {
        name: 'David Cohen',
        company: 'TechVision Ltd.',
        feedback: 'Through this platform, we found an amazing developer who fit our team perfectly. The process was smooth and efficient!'
    },
    {
        name: 'Sarah Levy',
        company: 'Innovate AI',
        feedback: 'We hired a highly skilled AI engineer in record time. The filtering system helped us find the perfect candidate!'
    },
    {
        name: 'John Miller',
        company: 'NextGen Software',
        feedback: 'Great experience! The filtering tools made it easy to narrow down our search, and we found a fantastic full-stack developer.'
    }
];
}
