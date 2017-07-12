import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TransactionService } from './Transaction.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Transaction',
	templateUrl: './Transaction.component.html',
	styleUrls: ['./Transaction.component.css'],
  providers: [TransactionService]
})
export class TransactionComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  pig = new FormControl("", Validators.required);
  newOwner = new FormControl("", Validators.required);
  transactionId = new FormControl("", Validators.required);
  timestamp = new FormControl("", Validators.required);

  constructor(private serviceTransaction:TransactionService, fb: FormBuilder) {
    this.myForm = fb.group({
          pig:this.pig,
          newOwner:this.newOwner,
          transactionId:this.transactionId,
          timestamp:this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getTransaction()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "org.acme.mynetwork.TradePig",
          "pig":this.pig.value,
          "newOwner":this.newOwner.value,
          "transactionId":this.transactionId.value,
          "timestamp":this.timestamp.value
    };

    this.myForm.setValue({
          "pig":null,
          "newOwner":null,
          "transactionId":null,
          "timestamp":null
    });

    return this.serviceTransaction.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
          "pig":null,
          "newOwner":null,
          "transactionId":null,
          "timestamp":null
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }

/*

조회 데이터는 update와 delete를 넣지 않음.

*/

  resetForm(): void{
    this.myForm.setValue({
          "pig":null,
          "newOwner":null,
          "transactionId":null,
          "timestamp":null
      });
  }

}