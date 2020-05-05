import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainGameSettingsPage } from './main-game-settings.page';

describe('MainGameSettingsPage', () => {
  let component: MainGameSettingsPage;
  let fixture: ComponentFixture<MainGameSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGameSettingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainGameSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
