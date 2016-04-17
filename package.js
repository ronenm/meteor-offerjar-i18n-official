Package.describe({
  name: 'ronenm:offerjar-i18n-official',
  version: '0.0.6',
  // Brief, one-line summary of the package.
  summary: 'i18n translation to OfferJar negotiation',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/ronenm/meteor-offerjar-i18n-official',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use("underscore");
  api.use([
    'blaze',
    'spacebars',
    'templating',
  ], 'client');
  api.use("tap:i18n@1.4.1");
  api.use("ronenm:offerjar-api@1.0.0");
  api.use("ronenm:offerjar-ui@0.0.2");
  
  // You must load your package's package-tap.i18n before you load any
  // template
  api.add_files("package-tap.i18n");
  api.addFiles('offerjar-i18n-official.js');
  api.add_files("i18n/en.i18n.json");
  
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ronenm:offerjar-i18n-official');
  api.addFiles('offerjar-i18n-official-tests.js');
});
