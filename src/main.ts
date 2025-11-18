import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { register } from 'swiper/element/bundle';
import { registerAppIcons } from './app/core/constants/icons';

register();
registerAppIcons();
bootstrapApplication(AppComponent, {
  providers: [
    FirebaseX,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withViewTransitions(),
    ),
  ],
});
