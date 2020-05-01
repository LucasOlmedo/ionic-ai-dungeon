import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FirstRoomPage } from './first-room.page';

describe('FirstRoomPage', () => {
  let component: FirstRoomPage;
  let fixture: ComponentFixture<FirstRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstRoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FirstRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
