import os from 'os';
// @ts-ignore
import webpackConfig from './webpack.cypress';
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin')

export default {
  component: {
    // specPattern: "../packages/**/test/*.cy.{jsx,tsx}",
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig
    },
    // supportFile: "./support/component.ts",
    // slowTestThreshold: 5000,
    async setupNodeEvents(on: any, config: any) {
      const snapshotP = await getCompareSnapshotsPlugin(on, config)
      let browsers = config.browsers;
      if (os.platform() === 'linux' && !config.browsers.some( (_: any) => _.name === 'chrome')) {
        const linuxChrome: any = {
          name: 'chrome',
          family: 'chromium',
          channel: 'stable',
          displayName: 'Chrome',
          version: '107.0.5249.119',
          path: '/usr/bin/google-chrome',
          minSupportedVersion: 64,
          majorVersion: '107'
        };
        browsers = [linuxChrome, ...browsers]
      }
      return {
        browsers: browsers,
        ...snapshotP,
      }
    },
    indexHtmlFile: './support/component-index.html'
  },
  // animationDistanceThreshold: 5,
  // arch: 'x64',
  blockHosts: null,
  chromeWebSecurity: true,
  clientCertificates: [],
  // defaultCommandTimeout: 4000,
  downloadsFolder: './downloads',
  env: {
    failSilently: false,
    'preserveOriginalScreenshot': true
  },
  // execTimeout: 60000,
  experimentalFetchPolyfill: false,
  experimentalInteractiveRunEvents: false,
  experimentalModifyObstructiveThirdPartyCode: false,
  // experimentalSingleTabRunMode: false,
  experimentalSourceRewriting: false,
  experimentalStudio: false,
  fileServerFolder: '',
  fixturesFolder: './fixtures',
  includeShadowDom: false,
  // isInteractive: true,
  // keystrokeDelay: 0,
  modifyObstructiveCode: true,
  numTestsKeptInMemory: 50,
  pageLoadTimeout: 60000,
  // platform: 'win32',
  redirectionLimit: 20,
  reporter: 'spec',
  // requestTimeout: 5000,
  // resolvedNodePath: null,
  // resolvedNodeVersion: null,
  // responseTimeout: 30000,
  retries: {
    runMode: 0,
    openMode: 0,
  },
  screenshotOnRunFailure: false,
  screenshotsFolder: './cypress/screenshots',
  scrollBehavior: 'top',
  // taskTimeout: 60000,
  // testingType: 'component',
  trashAssetsBeforeRuns: false,
  userAgent: null,
  video: false,
  videoCompression: 32,
  videosFolder: './videos',
  videoUploadOnPasses: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  waitForAnimations: true,
  watchForFileChanges: true,
} as any