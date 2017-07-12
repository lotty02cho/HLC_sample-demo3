/** component는 service에 정의된 내용에 따라 값을 받아온다.
 *  OnInit은 Angular2 component 초기화시에 사용된다. 사용시 ngOnInit으로 사용하며, 초기값 설정시 가장 좋은 hook이다.
 *  
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommodityService } from './Commodity.service';
import 'rxjs/add/operator/toPromise';

/**@Component 데코레이터는 구성 요소와 뷰를 생성하고 표시하는 데 필요한 Angular의 정보가 있는 필수 구성 객체를 사용합니다.
 * selector: Angular가 부모 HTML에 <hero-list>태그를 찾는이 구성 요소의 인스턴스를 만들고 삽입하도록 알려주는 CSS 선택기입니다 .
 * 예를 들어 앱의 HTML이 포함 된 경우 Angular 는 해당 태그 사이 에서 보기 의 인스턴스를 삽입 합니다.<hero-list></hero-list>HeroListComponent
 * templateUrl: 위에 표시된 것처럼 이 구성 요소의 HTML 템플리트의 모듈 기준 주소입니다 .
 * providers: 구성 요소에 필요한 서비스에 대한 종속성 주입 공급자의 배열입니다 .
 * 이것은 Angular에게 구성 요소의 생성자에 a가 필요하다는 것을 알려주는 한 가지 방법 HeroService 이므로 표시 할 영웅 목록을 얻을 수 있습니다.
 */
@Component({
	selector: 'app-Commodity',
	templateUrl: './Commodity.component.html',
	styleUrls: ['./Commodity.component.css'],
  providers: [CommodityService]
})
export class CommodityComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      tradingSymbol = new FormControl("", Validators.required);
  
      description = new FormControl("", Validators.required);
  
      mainExchange = new FormControl("", Validators.required);
  
      quantity = new FormControl("", Validators.required);
  
      owner = new FormControl("", Validators.required);
  


  constructor(private serviceCommodity:CommodityService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          tradingSymbol:this.tradingSymbol,
        
    
        
          description:this.description,
        
    
        
          mainExchange:this.mainExchange,
        
    
        
          quantity:this.quantity,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCommodity.getAll()
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
      $class: "org.acme.mynetwork.Commodity",
      
        
          "tradingSymbol":this.tradingSymbol.value,
        
      
        
          "description":this.description.value,
        
      
        
          "mainExchange":this.mainExchange.value,
        
      
        
          "quantity":this.quantity.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "tradingSymbol":null,
        
      
        
          "description":null,
        
      
        
          "mainExchange":null,
        
      
        
          "quantity":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceCommodity.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "tradingSymbol":null,
        
      
        
          "description":null,
        
      
        
          "mainExchange":null,
        
      
        
          "quantity":null,
        
      
        
          "owner":null 
        
      
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
      $class: "org.acme.mynetwork.Commodity",

            "description":this.description.value,
          

          
            "mainExchange":this.mainExchange.value,
          

          
            "quantity":this.quantity.value,
          

          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceCommodity.updateAsset(form.get("tradingSymbol").value,this.asset)
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

    return this.serviceCommodity.deleteAsset(this.currentId)
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

    return this.serviceCommodity.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "tradingSymbol":null,
          
        
          
            "description":null,
          
        
          
            "mainExchange":null,
          
        
          
            "quantity":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.tradingSymbol){
          formObject.tradingSymbol = result.tradingSymbol;
        }else{
          formObject.tradingSymbol = null;
        }
      
        if(result.description){
          formObject.description = result.description;
        }else{
          formObject.description = null;
        }
      
        if(result.mainExchange){
          formObject.mainExchange = result.mainExchange;
        }else{
          formObject.mainExchange = null;
        }
      
        if(result.quantity){
          formObject.quantity = result.quantity;
        }else{
          formObject.quantity = null;
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
      
        
          "tradingSymbol":null,
        
      
        
          "description":null,
        
      
        
          "mainExchange":null,
        
      
        
          "quantity":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
