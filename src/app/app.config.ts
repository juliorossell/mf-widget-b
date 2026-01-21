import { ApplicationConfig, provideBrowserGlobalErrorListeners, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';

import { CoreLayoutService } from './../../shared/core/core-layout/core-layout.service';
import { coreLayoutInitializerProvider } from './../../shared/core/core-layout/core-layout.initializer';
import { provideJwtInterceptor } from './../../shared/interceptors';

// Function to check if running in standalone mode
function isStandalone(): boolean {
  // Check if we're running as a standalone app (not loaded as a microfrontend)
  return !window.location.pathname.includes('/mf/') &&
         window.location.port === '4202'; // Widget-B port
}

// Get providers based on mode
function getConditionalProviders(): Provider[] {
  if (isStandalone()) {
    console.log('Widget B running in standalone mode - initializing CoreLayout service');
    return [
      CoreLayoutService,
      coreLayoutInitializerProvider
    ];
  }

  console.log('Widget B running as microfrontend - skipping CoreLayout initialization');
  return [];
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    // JWT Interceptor compartido para Widget B
    ...provideJwtInterceptor(),
    // Conditionally add CoreLayout service in standalone mode
    ...getConditionalProviders()
  ]
};
