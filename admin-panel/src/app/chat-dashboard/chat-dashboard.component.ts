/**
 * Created by User on 22.12.2016.
 */
/**
 * Created by dmitry on 22.12.16.
 */
import {Component} from '@angular/core';

@Component({
    selector: 'chat-dashboard',

    styleUrls: [ 'chat-dashboard.style.scss' ],
    templateUrl: 'chat-dashboard.template.html',
})

export class ChatDashboardComponent {
    loading() {
        document.getElementById('loader').style.display = 'block';
        document.getElementById('main').style.display = 'none';
    }
    loaded() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('main').style.display = 'block';
    }
}
