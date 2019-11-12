import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Howl } from 'howler';


@Component({
  selector: 'app-vending',
  templateUrl: './vending.component.html',
  styleUrls: ['./vending.component.scss']
})
export class VendingComponent implements OnInit {
  state = {
  };
  vendStatus: string = 'Loading';
  handle: any;
  ig_data: any;
  updatedStantizedValue: any;
  soundOnSuccess: Howl;
  soundOnFailure: Howl;
  HOST_NAME = 'https://w-event.akriya.co.in';
  // HOST_NAME = 'http://localhost:4209';
  click_timer: any;
  clicks = 0;
  click_timeout = 350;
  whenMasterSaysNo = false;
  winPercentage = 0;
  config;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
    private http: HttpClient,
    private sanitized: DomSanitizer
  ) {
    this.ig_data = '';
    this.soundOnSuccess = new Howl({
      src: ['../../assets/sounds/InspirationalSuccess.wav'],
      html5: true
    });
    this.soundOnFailure = new Howl({
      src: ['../../assets/sounds/GameFailure.wav'],
      html5: true
    });

    db.doc('dlf-config/config').valueChanges()
      .subscribe((val: any) => {
        console.log('config');
        console.log(val);
        this.whenMasterSaysNo = val.whenManSaysNo;
        this.winPercentage = val.seedNumber;
        // this.state["show_wheel"] = val.show_wheel;
      });
  }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => params.handle)
    )
      .subscribe(async (params) => {
        this.state["instagram_username"] = params.handle;
        let instagramPost = await this.checkForInstagramUser(params.handle);
        console.log('This is after let instagramPost = await this.checkForInstagramUser(params.handle);');

        if (!instagramPost) {
          this.state["search_status"] = 'NotFound';
          this.soundOnFailure.play();
        } else if (instagramPost["error"]) {
          console.log(instagramPost["error"]);
          this.state["search_status"] = 'NotFound';
          if (instagramPost["error"] == "Repeat User") {
            console.log("old is true");
            this.state["old"] = true;
          }

          this.soundOnFailure.play();
        } else {
          await this.showInstagramPost(instagramPost);
          console.log('This is after await this.showInstagramPost(instagramPost);');
          var d = new Date();
          var n = d.getMilliseconds();
          var cent = n % 100;
          await this.waitForxSec(1.2);
          await this.showWheel();
          await this.waitForxSec(5);
          await this.hideWheel();

          if ((100 - cent > this.winPercentage || this.whenMasterSaysNo)) {
            await this.hideWheel();
            //bad luck
            await this.showBadLuck();
            console.log('This is after await this.showBadLuck();');

          } else {
            //good luck
            let tryVend = await this.showVending();
            console.log(tryVend);
            if (tryVend && tryVend.errorCode !== '0') {
              await this.hideWheel();
              await this.showBadLuck(true);
            } else {
              await this.hideWheel();
              console.log('This is after await this.showVending();');
              await this.waitForxSec(8);
              console.log('This is after await this.waitForxSec(8);');
              await this.doneVending();
              console.log('This is after await this.doneVending();');
            }

          }



        }


      });
  }

  async checkForInstagramUser(instagramUserName: string) {
    // TODO: Expose our IG - crawl API
    // Will send InstagramUserName.
    console.log('Before data');

    console.log('sending for ', instagramUserName);

    let reqURL = `${this.HOST_NAME}/checkForInstagramUser/${instagramUserName}`;
    const response = await this.http.get(reqURL).toPromise();

    console.log('response: ', response);
    return Promise.resolve(response);
    // return 'https://scontent-sin6-2.cdninstagram.com/vp/3517a42cd10e55e469fc29792568fb12/5E2AC507/t51.2885-15/e35/73385855_164852961264075_7057780052067614563_n.jpg?_nc_ht=scontent-sin6-2.cdninstagram.com&_nc_cat=103';
  }
  async showInstagramPost(instagramPost) {
    console.log(instagramPost);
    this.state["ig_post"] = instagramPost || 'null post';
    this.state["image_to_show"] = instagramPost.display_url;
    this.state["search_status"] = 'Found';
    this.soundOnSuccess.play();


    return null;
  }

  async waitForxSec(sec) {
    const ms = sec * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fetchTimeout(url, timeout = 3000) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(resolve, reject)
      setTimeout(reject, timeout);
    });
  }
  async showFail() {
    const reqURL = `${this.HOST_NAME}/showFail`;
    const response = await this.http.get(reqURL).toPromise();
    console.log(response);
  }

  async showVending() {
    // TODO: Expose our Vending - API
    // Will send Nothing.
    let response;
    this.state["vends_were_timedOut"] = false;
    try {
      response = await this.fetchTimeout(`${this.HOST_NAME}/doVending`, 3000);
    } catch (e) {
      console.log(e);
      response = {
        error: 'Request did not come in like 3 seconds',
        errorCode: '-1'
      };
      return response;
    }

    const vent_status = await response.json();
    if (vent_status.key === "overflow") {
      response = {
        error: 'Overflow is On',
        errorCode: '-2'
      };
      return response;
    }
    // let data = await response.json();

    this.state["vend_status"] = 'Vending';
    this.soundOnSuccess.play();
    response = {
        success: `Vend on Row ${vent_status.key}`,
        errorCode: '0'
      };
    return response;

  }

  async showBadLuck(ifImportant = false) {
    this.showFail();
    this.state["vend_status"] = 'BadLuck';
    if (ifImportant) {
      this.state["vends_were_timedOut"] = true;
    }
    this.soundOnFailure.play();

  }


  async showWheel() {
    this.state["show_wheel"] = true;
  }

  async hideWheel() {
    this.state["show_wheel"] = false;
  }

  async doneVending() {
    this.state["vend_status"] = 'Complete';

    this.soundOnSuccess.play(); // bye bye sound

  }

  navigateNext() {
    // this.router.navigateByUrl('/push');
  }

  specialClick() {

    clearTimeout(this.click_timer);
    this.clicks++;
    console.log(this.clicks);
    this.click_timer = setTimeout(() => {
      console.log('in Timeout');
      if (this.clicks >= 4) {
        this.quadClick();
      }
      if (this.clicks == 3) {
        this.tripleClick();
      }
      this.clicks = 0;

    }, this.click_timeout);
  }

  tripleClick() {
    this.whenMasterSaysNo = true;
  }
  quadClick() {
    this.router.navigateByUrl('/push');
  }
}
