import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApiService } from './app/services/api.service';

bootstrapApplication(AppComponent, {providers: [
  provideHttpClient(), 
  ApiService,           
  ...appConfig.providers, provideAnimationsAsync()
]
})
  .catch((err) => console.error(err));
