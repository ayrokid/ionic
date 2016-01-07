import {App, IonicApp, Platform} from 'ionic/ionic';
import {HelloIonicPage} from './hello-ionic/hello-ionic';

import {Page1} from './page1/page1';
import {Page2} from './page2/page2';
import {Page3} from './page3/page3';


@App({
  templateUrl: 'app/app.html'
})
export class MyApp {
  constructor(platform: Platform) {

     // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage }
    ];

    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Page1;
    this.tab2Root = Page2;
    this.tab3Root = Page3;

    platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });

    // make HelloIonicPage the root (or first) page
    this.rootPage = HelloIonicPage;

    openPage(page) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('menu').close();

    // Reset the nav controller to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  }
  }
}
