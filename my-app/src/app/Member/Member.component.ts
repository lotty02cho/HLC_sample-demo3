import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MemberService } from './Member.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Member',
	templateUrl: './Member.component.html',
	styleUrls: ['./Member.component.css'],
	providers: [MemberService]
})
export class MemberComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  
      mem_no = new FormControl("", Validators.required);
  
      mem_flag = new FormControl("", Validators.required);
  
      mem_name = new FormControl("", Validators.required);
  


  constructor(private serviceMember:MemberService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          mem_no:this.mem_no,
        
    
        
          mem_flag:this.mem_flag,
        
    
        
          mem_name:this.mem_name,
        
        
    
    });
  };

  ngOnInit(): void {4
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceMember.getAll()
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
      $class: "org.acme.mynetwork.Member",
      
        
          "mem_no":this.mem_no.value,
        
      
        
          "mem_flag":this.mem_flag.value,
        
      
        
          "mem_name":this.mem_name.value,
        
      
    };

    this.myForm.setValue({
      
        
          "mem_no":null,
        
      
        
          "mem_flag":null,
        
      
        
          "mem_name":null,
        
        
      
    });

    return this.serviceMember.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "mem_no":null,
        
      
        
          "mem_flag":null,
        
      
        
          "mem_name":null,
        
      
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
      $class: "org.acme.mynetwork.Member",
      
        
        
          "mem_flag":this.mem_flag.value,
        
      
        
          "mem_name":this.mem_name.value,
          
        
    
    };

    return this.serviceMember.updateAsset(form.get("mem_no").value,this.asset)
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

    return this.serviceMember.deleteAsset(this.currentId)
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

    return this.serviceMember.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          "mem_no":null,
        
      
        
          "mem_flag":null,
        
      
        
          "mem_name":null,
          
        
      };



      
        if(result.mem_no){
          formObject.mem_no = result.mem_no;
        }else{
          formObject.mem_no = null;
        }
      
        if(result.mem_flag){
          formObject.mem_flag = result.mem_flag;
        }else{
          formObject.mem_flag = null;
        }
      
        if(result.mem_name){
          formObject.mem_name = result.mem_name;
        }else{
          formObject.mem_name = null;
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
      
        
          "mem_no":null,
        
      
        
          "mem_flag":null,
        
      
        
          "mem_name":null,
        
      
      });
  }

}