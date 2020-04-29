import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingsPagePage } from './settings-page.page';

describe('SettingsPagePage', () => {
  let component: SettingsPagePage;
  let fixture: ComponentFixture<SettingsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
