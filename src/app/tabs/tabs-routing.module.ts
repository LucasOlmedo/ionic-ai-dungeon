import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-start-game',
        loadChildren: () => import('../start-game-tab/start-game-tab.module').then(m => m.StartGameTabPageModule)
      },
      {
        path: 'tab-shop',
        loadChildren: () => import('../shop-tab/shop-tab.module').then(m => m.ShopTabPageModule)
      },
      {
        path: 'tab-config',
        loadChildren: () => import('../config-tab/config-tab.module').then(m => m.ConfigTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab-start-game',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-start-game',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
