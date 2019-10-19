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
          
          if (!instagramPost) {
            this.state["search_status"] = 'NotFound';
            this.soundOnFailure.play();
          } else if (instagramPost["error"]) {
            console.log(instagramPost["error"]);
            this.state["search_status"] = 'NotFound';
            if(instagramPost["error"]=="Old")
            {
              console.log("old is true");
              this.state["old"] = true;
            }
            
            this.soundOnFailure.play();
          } else {
            await this.showInstagramPost(instagramPost);
            console.log('This is after await this.showInstagramPost(instagramPost);');
            var d = new Date();
            var n = d.getSeconds();
            if (n%3==0 && !this.whenMasterSaysNo) {
              await this.showVending();
              console.log('This is after await this.showVending();');
              await this.waitForxSec(8);
              console.log('This is after await this.waitForxSec(8);');
              await this.doneVending();
              console.log('This is after await this.doneVending();');
            }else{
              await this.showBadLuck();
              console.log('This is after await this.showBadLuck();');

            }
            
            
            
          }
          await this.waitForxSec(20);
          console.log('This is after await this.waitForxSec(20);');
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
      
      async showVending() {
        // TODO: Expose our Vending - API
        // Will send Nothing.
        let response = await fetch(`${this.HOST_NAME}/doVending`);
        // let data = await response.json();
        
        this.state["vend_status"] = 'Vending';
        this.soundOnSuccess.play();
        
      }

      async showBadLuck() {
     
        this.state["vend_status"] = 'BadLuck';
        this.soundOnFailure.play();
        
      }
      
      async doneVending() {
        this.state["vend_status"] = 'Complete';
        
        this.soundOnSuccess.play(); // bye bye sound
        
      }
      
      navigateNext() {
        this.router.navigateByUrl('/push');
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
          
          this.clicks = 0;
          
        }, this.click_timeout);
      }
      tripleClick() {
        this.whenMasterSaysNo = true;
      }
        quadClick() {
        this.router.navigateByUrl('/push');
      }
