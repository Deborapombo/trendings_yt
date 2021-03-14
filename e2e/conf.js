const { SpecReporter } = require('jasmine-spec-reporter');
let jasmineHtmlReporter  = require('protractor-html-reporter-2');
let jasmineXmlReporter  = require('jasmine-reporters');

const data = new Date();
const formattedDate = data.getFullYear()
                      + "-" +
                      ("0"+(data.getMonth()+1)).slice(-2)
                      + "-" +
                      ("0" + data.getDate()).slice(-2)
                      + "_" +
                      ("0" + data.getHours()).slice(-2)
                      + "-" +
                      ("0" + data.getMinutes()).slice(-2);
const customSavePath = 'e2e/_reports/'+formattedDate+'/';

exports.config = {
  allScriptsTimeout: 60000,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  directConnect: true,
  baseUrl: 'https://youtube.com',
  specs: [
    'youtube_trending/src/trendings/trendings.e2e-spec.ts'],
  suites: {
    trending_page: ['youtube_trending/src/trendings/trendings.e2e-spec.ts']
  },
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ["lang=en_GB", "--disable-gpu", "--window-size=1920,1080", "--disable-browser-side-navigation"] 
    }
  },  
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },
  onPrepare(){
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });

    browser.driver.manage().window().maximize();
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: 'none' } }));

    // XML reporter
    jasmine.getEnv().addReporter(new jasmineXmlReporter.JUnitXmlReporter({
      consolidateAll: true,
      savePath: customSavePath + 'XMLReport',
      filePfix: 'xmloutput',
    }));
    // HTML reporter Configuration
    let fs = require('fs-extra');
    fs.emptyDir(customSavePath + 'HTMLReport/screenshots/');
    jasmine.getEnv().addReporter({
        specDone: function(result) {
            browser.getCapabilities().then(function (caps) {
                let browserName = caps.get('browserName');

                browser.takeScreenshot().then(function (png) {
                  let stream = fs.createWriteStream(customSavePath + 'HTMLReport/screenshots/' + browserName + '-' + result.fullName+ '.png');
                  stream.write(Buffer.from(png, 'base64'));
                  stream.end();
              });
            });
        }
    });
  },
  onComplete: function() {
    // HTML reporter Creation
    browser.getCapabilities().then(function (caps) {
        let browserName = caps.get('browserName');
        let browserVersion = caps.get('version');
        let platform = caps.get('platform');

        let testConfig = {
            reportTitle: 'Protractor HTML Test Execution Report',
            outputPath: customSavePath + 'HTMLReport',
            outputFilename: 'htmlReport',
            screenshotPath: './screenshots',
            screenshotsOnlyOnFailure: false,    
            testBrowser: browserName,
            testPlatform: browserVersion,
            browserVersion: platform
        };
        new jasmineHtmlReporter().from(customSavePath + 'XMLReport/junitresults.xml', testConfig);
    });
  }
};