
import { Injectable }    from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

import {SpinnerService} from '../spinner/spinner.service';


export interface SaveComponent {
    hasChanges: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class SaveGuard implements CanDeactivate <SaveComponent> {

    public constructor(private spinnerService: SpinnerService) {
    }

    canDeactivate(target: SaveComponent): Observable<boolean> | Promise<boolean> |boolean {

        if (target.hasChanges()) {
            return this.spinnerService.quitDialog(); 
        }

        return true;
    }
}
