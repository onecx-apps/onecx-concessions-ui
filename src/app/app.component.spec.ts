import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  PortalCoreModule,
  AUTH_SERVICE,
  MockAuthModule,
} from '@onecx/portal-integration-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        PortalCoreModule.forRoot('test'),
        HttpClientTestingModule,
      ],
      providers: [{ provide: AUTH_SERVICE, useClass: MockAuthModule }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
