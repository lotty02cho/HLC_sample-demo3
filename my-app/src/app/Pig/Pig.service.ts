import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Pig } from '../org.acme.mynetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class PigService {

	
		private NAMESPACE: string = 'Pig';
	



    constructor(private dataService: DataService<Pig>) {
    };

    public getAll(): Observable<Pig[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Pig> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Pig> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Pig> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Pig> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}