
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Keyboard from 'simple-keyboard';
import { ViewEncapsulation } from '@angular/core';
import { Howl } from 'howler';

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
  soundWhenWeStartLoading: Howl;
  constructor(
    private router: Router
  ) {
    var soundOnUserEntry = new Howl({
      src: ['../../assets/sounds/GameFail02.wav'],
      html5: true
    });
    this.soundWhenWeStartLoading = new Howl({
      src: ['../../assets/sounds/loop01.wav'],
      html5: true
    });


    soundOnUserEntry.play();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: {
        default: [
          "1 2 3 4 5 6 7 8 9 0",
          "q w e r t y u i o p",
          "a s d f g h j k l",
          "{shift} z x c v b n m {backspace}",

        ],
        shift: [
          "! @ # $ % ^ & * ( ) _ +",
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "{shift} Z X C V B N M {backspace}",
        ],
        numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
      },
      display: {
        "{numbers}": "123",
        "{ent}": "return",
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{backspace}": "⌫",
        "{capslock}": "caps lock ⇪",
        "{shift}": "⇧",
        "{controlleft}": "ctrl ⌃",
        "{controlright}": "ctrl ⌃",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{abc}": "ABC"
      }
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
    this.soundWhenWeStartLoading.play();
    this.router.navigate(['vend', this.value]);
  }
}
