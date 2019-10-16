
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Keyboard from 'simple-keyboard';
import { ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
    selector: 'app-handlefetch',
  templateUrl: './handlefetch.component.html',
  styleUrls: [
    './handlefetch.component.scss'
  ]
})
export class HandlefetchComponent implements OnInit {
  keyboard: Keyboard;
  value = '';
  handle = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange = (input: string) => {
    this.value = input;
    this.handle = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  public kaaroFunction(handle) {
    console.log("Kasdkatjskdasd");
    // alert("Kartik");
    this.router.navigate(['vend', this.value]);
  }
}
