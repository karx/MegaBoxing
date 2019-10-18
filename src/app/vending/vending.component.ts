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


  }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => params.handle)
    )
      .subscribe(async (params) => {
        this.state["instagram_username"] = params.handle;
        let instagramPost = await this.checkForInstagramUser(params.handle);
        console.log('This is after let instagramPost = await this.checkForInstagramUser(params.handle);');
        await this.showInstagramPost(instagramPost);
        console.log('This is after await this.showInstagramPost(instagramPost);');
        await this.waitForxSec(2);
        console.log('This is after await this.waitForxSec(2);');
        await this.showVending();
        console.log('This is after await this.showVending();');
        await this.waitForxSec(8);
        console.log('This is after await this.waitForxSec(8);');
        await this.doneVending();
        console.log('This is after await this.doneVending();');
        await this.waitForxSec(8);
        console.log('This is after await this.waitForxSec(8);');
        await this.navigateNext();
        console.log('This is after await this.navigateNext();');
      });
  }

  async checkForInstagramUser(instagramUserName: string) {
    // TODO: Expose our IG - crawl API
    // Will send InstagramUserName.
    console.log('Before data');

    console.log('sending for ', instagramUserName);

    let reqURL = `${this.HOST_NAME}/checkForInstagramUser/${instagramUserName}`;
    let response = await this.http.get(reqURL).toPromise();
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
    let ms = sec * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async showVending() {
    // TODO: Expose our Vending - API
    // Will send Nothing.
    let response = await fetch(`${this.HOST_NAME}/doVending`);
    // let data = await response.json();

    this.state["vend_status"] = 'Vending';
    this.soundOnSuccess.play();

  }

  async doneVending() {
    this.state["vend_status"] = 'Complete';

    this.soundOnSuccess.play(); //bye bye sound

  }

  navigateNext() {
    this.router.navigateByUrl('/');
  }
}
