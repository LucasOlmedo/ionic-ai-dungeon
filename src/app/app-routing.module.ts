import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPagePageModule)
  },
  {
    path: 'start-game',
    loadChildren: () => import('./start-game/start-game.module').then( m => m.StartGamePageModule)
  },
  {
    path: 'shop-page',
    loadChildren: () => import('./shop-page/shop-page.module').then( m => m.ShopPagePageModule)
  },
  {
    path: 'settings-page',
    loadChildren: () => import('./settings-page/settings-page.module').then( m => m.SettingsPagePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
