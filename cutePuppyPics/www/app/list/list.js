import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {ItemDetailsPage} from '../item-details/item-details';

@Page({
	templateUrl: 'app/list/list.html'
})

export class ListPage {
	constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
		this.nav = nav;
	}

	itemTapped(event, item) {
		//console.log('You selected', item.title);
		this.nav.push(ItemDetailPage, {
			item: item
		});
	}
}