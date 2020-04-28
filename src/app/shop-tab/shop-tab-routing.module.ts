import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopTabPage } from './shop-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ShopTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopTabPageRoutingModule {}
