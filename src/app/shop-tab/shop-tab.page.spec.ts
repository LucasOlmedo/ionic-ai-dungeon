import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopTabPage } from './shop-tab.page';

describe('ShopTabPage', () => {
  let component: ShopTabPage;
  let fixture: ComponentFixture<ShopTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
