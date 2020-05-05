import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainGameCharPage } from './main-game-char.page';

describe('MainGameCharPage', () => {
  let component: MainGameCharPage;
  let fixture: ComponentFixture<MainGameCharPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGameCharPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainGameCharPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
