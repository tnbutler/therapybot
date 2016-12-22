/**
 * Created by User on 22.12.2016.
 */
/**
 * Created by dmitry on 22.12.16.
 */
import {Component} from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: 'main-page-component.html',
})

export class MainPageComponent {
    
    Loading() {
        document.getElementById("loader").style.display = "block";
        document.getElementById("main").style.display = "none";
    }

    Loaded() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").style.display = "block";
    }
    
}