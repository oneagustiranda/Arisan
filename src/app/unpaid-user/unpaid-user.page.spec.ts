import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnpaidUserPage } from './unpaid-user.page';

describe('UnpaidUserPage', () => {
  let component: UnpaidUserPage;
  let fixture: ComponentFixture<UnpaidUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnpaidUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
