import { Movies } from './../../models/movies';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() sliderConfig: any;
  @Input() movies!: Movies;
  @Input() title!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
