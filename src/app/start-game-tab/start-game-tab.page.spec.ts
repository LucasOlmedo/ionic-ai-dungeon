import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartGameTabPage } from './start-game-tab.page';

describe('StartGameTabPage', () => {
  let component: StartGameTabPage;
  let fixture: ComponentFixture<StartGameTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartGameTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartGameTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
