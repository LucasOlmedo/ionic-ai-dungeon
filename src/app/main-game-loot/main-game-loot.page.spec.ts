import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainGameLootPage } from './main-game-loot.page';

describe('MainGameLootPage', () => {
  let component: MainGameLootPage;
  let fixture: ComponentFixture<MainGameLootPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGameLootPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainGameLootPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
