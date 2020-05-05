import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPagePageModule)
  },
  {
    path: 'start-game',
    loadChildren: () => import('./start-game/start-game.module').then(m => m.StartGamePageModule)
  },
  {
    path: 'shop-page',
    loadChildren: () => import('./shop-page/shop-page.module').then(m => m.ShopPagePageModule)
  },
  {
    path: 'settings-page',
    loadChildren: () => import('./settings-page/settings-page.module').then(m => m.SettingsPagePageModule)
  },
  {
    path: 'create-character',
    loadChildren: () => import('./create-character/create-character.module').then(m => m.CreateCharacterPageModule)
  },
  {
    path: 'first-room',
    loadChildren: () => import('./first-room/first-room.module').then( m => m.FirstRoomPageModule)
  },
  {
    path: 'main-game',
    loadChildren: () => import('./main-game/main-game.module').then( m => m.MainGamePageModule)
  },
  {
    path: 'main-game-settings',
    loadChildren: () => import('./main-game-settings/main-game-settings.module').then( m => m.MainGameSettingsPageModule)
  },
  {
    path: 'main-game-loot',
    loadChildren: () => import('./main-game-loot/main-game-loot.module').then( m => m.MainGameLootPageModule)
  },
  {
    path: 'main-game-equip',
    loadChildren: () => import('./main-game-equip/main-game-equip.module').then( m => m.MainGameEquipPageModule)
  },
  {
    path: 'main-game-char',
    loadChildren: () => import('./main-game-char/main-game-char.module').then( m => m.MainGameCharPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
