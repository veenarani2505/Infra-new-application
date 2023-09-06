import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlltransactionsfilterModalPage } from './alltransactionsfilter-modal.page';

describe('AlltransactionsfilterModalPage', () => {
  let component: AlltransactionsfilterModalPage;
  let fixture: ComponentFixture<AlltransactionsfilterModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltransactionsfilterModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlltransactionsfilterModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
