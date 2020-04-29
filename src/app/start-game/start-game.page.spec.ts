import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartGamePage } from './start-game.page';

describe('StartGamePage', () => {
  let component: StartGamePage;
  let fixture: ComponentFixture<StartGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartGamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
