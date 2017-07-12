import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { TradePig } from '../org.acme.mynetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TransactionService {
	
		private NAMESPACE: string = 'TradePig';

    constructor(private dataService: DataService<TradePig>) {
    };

    public getTransaction(): Observable<TradePig[]> {
        return this.dataService.getTransaction();
    }

/*
    public getAll(): Observable<Process[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Process> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }
*/

    public addAsset(itemToAdd: any): Observable<TradePig> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

/*
    public updateAsset(id: any, itemToUpdate: any): Observable<Process> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Process> {
      return this.dataService.delete(this.NAMESPACE, id);
    }
*/
}