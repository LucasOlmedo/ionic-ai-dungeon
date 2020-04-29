import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopPagePage } from './shop-page.page';

describe('ShopPagePage', () => {
  let component: ShopPagePage;
  let fixture: ComponentFixture<ShopPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
