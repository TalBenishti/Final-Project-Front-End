import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseGameToPlayComponent } from './choose-game-to-play.component';

describe('ChooseGameToPlayComponent', () => {
  let component: ChooseGameToPlayComponent;
  let fixture: ComponentFixture<ChooseGameToPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseGameToPlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseGameToPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
