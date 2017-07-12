import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';
import { CommodityComponent } from './Commodity/Commodity.component';
import { MemberComponent } from './Member/Member.component';
import { PigComponent } from './Pig/Pig.component';
import { TransactionComponent } from './Transaction/Transaction.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    { path: '', component: HomeComponent},		
		{ path: 'Commodity', component: CommodityComponent},
    { path: 'Member', component: MemberComponent},
    { path: 'Pig', component: PigComponent},
    { path: 'Member', component: MemberComponent},
    { path: 'Transaction', component: TransactionComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }