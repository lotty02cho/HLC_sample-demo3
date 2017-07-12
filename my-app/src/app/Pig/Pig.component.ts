import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PigService } from './Pig.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Pig',
	templateUrl: './Pig.component.html',
	styleUrls: ['./Pig.component.css'],
	providers: [PigService]
})
export class PigComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  
      pig_no = new FormControl("", Validators.required);
  
      birth_date = new FormControl("", Validators.required);
  
      gender = new FormControl("", Validators.required);
      
      kind = new FormControl("", Validators.required);
      
      size = new FormControl("", Validators.required);

      mem_no = new FormControl("", Validators.required);
      
      owner = new FormControl("", Validators.required);
  


  constructor(private servicePig:PigService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          pig_no:this.pig_no,
        
          birth_date:this.birth_date,

          gender:this.gender,

          kind:this.kind,

          size:this.size,

          mem_no:this.mem_no,

          owner:this.owner
        
    });
  };

  ngOnInit(): void {4
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicePig.getAll()
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
      $class: "org.acme.mynetwork.Pig",
              
          "pig_no":this.pig_no.value,
        
          "birth_date":this.birth_date.value,

          "gender":this.gender.value,

          "kind":this.kind.value,

          "size":this.size.value,

          "mem_no":this.mem_no.value,

          "owner":this.owner.value
      
    };

    this.myForm.setValue({
      
        
          "pig_no":null,
        
          "birth_date":null,

          "gender":null,

          "kind":null,

          "size":null,

          "mem_no":null,

          "owner":null,
        
        
      
    });

    return this.servicePig.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "pig_no":null,
        
          "birth_date":null,

          "gender":null,

          "kind":null,

          "size":null,

          "mem_no":null,

          "owner":null,
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.mynetwork.Pig",
        
          "birth_date":this.birth_date.value,

          "gender":this.gender.value,

          "kind":this.kind.value,

          "size":this.size.value,

          "mem_no":this.mem_no.value,

          "owner":this.owner.value
          
        
    
    };

    return this.servicePig.updateAsset(form.get("pig_no").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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


  deleteAsset(): Promise<any> {

    return this.servicePig.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.servicePig.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          "pig_no":null,
        
          "birth_date":null,

          "gender":null,

          "kind":null,

          "size":null,

          "mem_no":null,

          "owner":null
          
        
      };



      
        if(result.pig_no){
          formObject.pig_no = result.pig_no;
        }else{
          formObject.pig_no = null;
        }
      
        if(result.birth_date){
          formObject.birth_date = result.birth_date;
        }else{
          formObject.birth_date = null;
        }
      
        if(result.gender){
          formObject.gender = result.gender;
        }else{
          formObject.gender = null;
        }
            
        if(result.kind){
          formObject.kind = result.kind;
        }else{
          formObject.kind = null;
        }

        if(result.size){
          formObject.size = result.size;
        }else{
          formObject.size = null;
        }

        if(result.mem_no){
          formObject.mem_no = result.mem_no;
        }else{
          formObject.mem_no = null;
        }

        if(result.owner){
          formObject.owner = result.owner;
        }else{
          formObject.owner = null;
        }




      this.myForm.setValue(formObject);

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

  resetForm(): void{
    this.myForm.setValue({
      
        
          "pig_no":null,
        
          "birth_date":null,

          "gender":null,

          "kind":null,

          "size":null,

          "mem_no":null,

          "owner":null
      
      });
  }

}