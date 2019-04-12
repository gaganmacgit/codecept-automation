exports.config = {
  tests: './*_test.js',
  output: './output',
  timeout: 10000,
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      show: true,
      waitForTimeout: 10000,
      windowSize: '1280*1696',
      waitForNavigation: ['networkidle2', 'domcontentloaded'],
      waitForAction: 1000,
      chrome: {        
        defaultViewport: {
          "width": 1280,
          "height": 960
        }
      },
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'codecept'
}