import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'dummy',
  templateUrl: 'dummy.component.html',
  styleUrls: ['dummy.component.css']
})
export class DummyComponent implements OnInit {

  constructor(private authService:AuthService) {};

  showInfo() {
    this.authService.showMessage("Hello! I'm a dummy component.");
  }

  ngOnInit() {
  }

}
