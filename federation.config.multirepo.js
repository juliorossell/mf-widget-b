const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfe-widget-b',

  // Import shared services from shell when in standalone mode
  remotes: {
    shell: 'https://shell-multirepo.netlify.app/remoteEntry.json'
  },

  exposes: {
    './Widget': './src/app/widget-b.component.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    // Angular CDK modules for Fractalia components
    '@angular/cdk/bidi': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    '@angular/cdk/overlay': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    '@angular/cdk/portal': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    // Fractalia components shared across all microfrontends
    '@fractalia/components': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    '@fractalia-apps/components': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    }
  },
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Fractalia dependencies to skip (pero no CDK que lo estamos compartiendo)
    'cropperjs',
    'chart.js',  // widget-b no usa chart.js
    'primeng',
    '@fractalia/itcss',
    'leaflet'
  ]
});
