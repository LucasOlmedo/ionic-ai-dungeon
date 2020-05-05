import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainGameEquipPage } from './main-game-equip.page';

describe('MainGameEquipPage', () => {
  let component: MainGameEquipPage;
  let fixture: ComponentFixture<MainGameEquipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGameEquipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainGameEquipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
