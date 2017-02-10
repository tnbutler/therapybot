import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Output, Input,ViewChild } from '@angular/core';
import { EventEmitter, ElementRef } from '@angular/core';

import {ChatVersionService}   from "../chat-version.service";
import {BaseList}                from '../../auth/base-list'

@Component({
  selector: 'chat-version-list',

  styleUrls: [ 'chat-version-list.style.scss' ],
  templateUrl: 'chat-version-list.template.html',

  encapsulation: ViewEncapsulation.None,
//  host: {
//    class: 'error-page app'
//  },
})
export class ChatVersionList extends BaseList {

  constructor(protected baseService: ChatVersionService) {
    super(baseService);
  }


  onReadItems(result) {
//    for (let elem of result.data) {
//      elem.free = this.blogCategoryService.authService.sqlToBoolean(elem.free);
//    }
//    this._rcategory = result._rcategory;
  }


  clickItem(item: any): void {
//    console.log('clickItem',item.id);
    //this.onOpenForm.emit(item);
  }




}
