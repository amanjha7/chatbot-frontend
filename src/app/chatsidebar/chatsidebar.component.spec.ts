import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsidebarComponent } from './chatsidebar.component';

describe('ChatsidebarComponent', () => {
  let component: ChatsidebarComponent;
  let fixture: ComponentFixture<ChatsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
