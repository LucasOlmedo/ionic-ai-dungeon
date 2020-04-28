import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigTabPage } from './config-tab.page';

describe('ConfigTabPage', () => {
  let component: ConfigTabPage;
  let fixture: ComponentFixture<ConfigTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
