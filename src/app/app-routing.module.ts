import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'start-game-tab',
    loadChildren: () => import('./start-game-tab/start-game-tab.module').then( m => m.StartGameTabPageModule)
  },
  {
    path: 'shop-tab',
    loadChildren: () => import('./shop-tab/shop-tab.module').then( m => m.ShopTabPageModule)
  },
  {
    path: 'config-tab',
    loadChildren: () => import('./config-tab/config-tab.module').then( m => m.ConfigTabPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
