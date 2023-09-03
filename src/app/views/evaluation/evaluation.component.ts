import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  navigateToEvaluation(): void {
    this.router.navigate(['/evaluations'])
  }
}
