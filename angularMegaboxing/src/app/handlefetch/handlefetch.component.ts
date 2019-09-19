
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-handlefetch',
  templateUrl: './handlefetch.component.html',
  styleUrls: ['./handlefetch.component.scss']
})
export class HandlefetchComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public kaaroFunction() {
    console.log("Kasdkatjskdasd");
    // alert("Kartik");
    this.router.navigateByUrl('vend');
  }
}
