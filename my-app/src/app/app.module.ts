//각 Angular libarary의 이름은 @angular 라는 접두어로 시작한다.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { CommodityComponent } from './Commodity/Commodity.component';
import { MemberComponent } from './Member/Member.component';
import { PigComponent } from './Pig/Pig.component';
import { TransactionComponent } from './Transaction/Transaction.component';


//ngModule은 속성 모듈을 설명하는 메타데이터 객체를 취한다. 이와 관련하여 가장 중요한 properties는 다음과 같다.
// -- declarations - 이 모듈에 속하는 view class이자, Application Component Tree에 포함되는 Component 목록 정의. 이렇게 하면, 기존 Component에 directives[...] 라고 적었던 부분을 생략할 수 있다.
// -- exports - declarations의 부분집합
// -- imports - 모듈내의 component template에서 필요에 의해 선언된 class가 exported된 다른 모듈 (의존관계 모듈)
// -- providers - providers - service의 creator. 이 모듈은 sevice 중에서도 global collection 에 기여한다. 이것은 app의 모든부분에 접근한다.
// -- bootstraping - (Application Level에서) 최초 수행, 가동할 Component이다. root component라고 불리는 main application view 이다. 다른 모든 app views를 host한다. 오직 root module만 이 bootstrap property로 설정된다.


@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    
    CommodityComponent,
    MemberComponent,
    PigComponent,
    TransactionComponent,
		
  ],

//root module에서 BrowserModule의 자료(Material)에 접근하려면, @NgModule의 metadata영역 중, 'imports' 부분에 추가해주어야한다.
// ex) imports: [ BrowserModules ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
