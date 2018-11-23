import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class CommonSpinnerComponent implements OnInit {
  elapsed = false;

  constructor() { }
  @Input() text: string;

  ngOnInit() {
    setTimeout(() => { this.elapsed = true; }, 1200 );
  }

}
