import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  childName = this.route.snapshot.params['name'];

  constructor(private route: ActivatedRoute) { }
}
