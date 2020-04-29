import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopPagePage } from './shop-page.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPagePageRoutingModule {}
