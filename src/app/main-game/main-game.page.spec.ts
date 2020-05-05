import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainGamePage } from './main-game.page';

describe('MainGamePage', () => {
  let component: MainGamePage;
  let fixture: ComponentFixture<MainGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
