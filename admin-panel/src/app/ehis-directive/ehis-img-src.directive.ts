import { Directive, ElementRef, HostListener, Input,Output ,EventEmitter } from '@angular/core';

import 'rxjs/Rx';


//import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
/* usage:
<p [myHighlight]="color" [defaultColor]="'violet'">
*/

//import {AuthService} from "../auth/auth.service";
import { AuthService }   from '../auth/auth.service'; // module.ts';
//import {API_URL} from '../app.env';



@Directive({
    selector: '[ehis-img-src]'
})
export class EhisImgSrcDirective {

    private _defaultColor = 'red';
    private _defaultImgSrc = '';
    private _altImgSrc = '';

    img: any;

    @Output() onImageLoaded = new EventEmitter();

    constructor(private el: ElementRef,private authService:AuthService) {
        this.img = this.authService.prevImgUrl;
    }

    @Input() set defaultColor(colorName: string){
        this._defaultColor = colorName || this._defaultColor;
    }

    @Input() set defaultImgSrc(url: string){
        this._defaultImgSrc = url;
    }

    @Input('alt-img-src') set altImgSrc(url: string){
        this._altImgSrc = url;
    }


    @Input('ehis-img-src') set ehis_img_src(value:string) {
       // map value ...
        if (value) {

            var i = value.lastIndexOf('/');
            if (i < 0) {
                i = value.lastIndexOf('\\');
            }
            console.log(this.img);
            let url = this.authService.getApiUrl() + '/api/image/' + value.slice(i + 1);
            if(this.img != url) {
                this.authService.getBlob(url)
                    .subscribe(
                        (result)=> {
                            console.log(url);
                            this.authService.prevImgUrl = url;
                            var blob = result.blob();
                            this.authService.prevImgBlob = blob;
                            if (blob.size==0) {
                                this.el.nativeElement.src = this._altImgSrc;
                                this.onImageLoaded.emit('');
                            }
                            else {
                                var urlCreator = window.URL;//|| window.webkitURL;
                                var imageUrl = urlCreator.createObjectURL(blob);

                                this.el.nativeElement.src = imageUrl;
                                this.onImageLoaded.emit(imageUrl);
                            }//console.log('emit',this.onImageLoaded);
                        },
                        (error)=> {
                            this.el.nativeElement.src = this._altImgSrc;
                            this.onImageLoaded.emit('');
                        })
            }
            else {
                var urlCreator = window.URL;//|| window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(this.authService.prevImgBlob);

                this.el.nativeElement.src = imageUrl;
                this.onImageLoaded.emit(imageUrl);
            }
        }
        else {
            this.el.nativeElement.src = this._defaultImgSrc; // '';
        }
    }


/*

    @HostListener('mouseenter') onMouseEnter() {
    //    this.highlight(this.highlightColor || this._defaultColor);
    }

    @HostListener('mouseleave') onMouseLeave() {
    //    this.highlight(null);
    }
*/
    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }

}
