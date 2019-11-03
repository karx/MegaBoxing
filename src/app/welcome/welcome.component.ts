import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxPrinterService } from 'ngx-printer';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router
    // private printerService: NgxPrinterService
  ) { }

  ngOnInit() {
        // this.router.navigate(['push']);
  }
  onPrint() {
    // this.printerService.printDiv('printId');
  }
}
