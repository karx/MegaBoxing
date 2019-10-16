import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(
      () => {
        this.navigateNext();
      }, 5500
    );
  }
  navigateNext() {
    this.router.navigateByUrl('/');
  }

}
