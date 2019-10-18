import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ig-post',
  templateUrl: './ig-post.component.html',
  styleUrls: ['./ig-post.component.scss']
})
export class IgPostComponent implements OnInit {
  @Input('image_to_show') image_to_show:string;
  @Input('username') username:string;
  @Input('ig_post') ig_post:any;

  constructor() { }

  ngOnInit() {
    console.log('XXXXXXXXXXXXXXXXXXXX');
    console.log(JSON.parse(this.ig_post));
  }

}
