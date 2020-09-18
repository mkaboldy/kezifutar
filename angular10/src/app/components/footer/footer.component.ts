import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public copytightYear: number;

  constructor() {
    this.copytightYear = new Date().getFullYear();
  }

  ngOnInit(): void {}
}
