const { iosPageFactory } = require('../screens/Factories')
const sharedConfig = require('./wdio.shared.conf')
const devEnv = require('./devEnv')

exports.config = {
    ...sharedConfig,
    hostname: '127.0.0.1',
    capabilities: [{
        "path": '/',
        // capabilities for local Appium web tests on an Android Emulator
        platformName: 'iOS',
        "appium:platformVersion": "17.0",
        "appium:deviceName": "iPhone 13",
        "appium:app": "",
        "appium:appPackage": "",
        "appium:automationName": "XCUITest",
        "appium:wdaStartupRetries": "4",
        "appium:iosInstallPause": "4000",
        "appium:wdaStartupRetryInterval": "20000",
        "appium:settings[snapshotMaxDepth]": "80"
    }],
    /**
    * Gets executed just before initialising the webdriver session and test framework. It allows you
    * to manipulate configurations depending on the capability or spec.
    * @param {object} config wdio configuration object
    * @param {Array.<Object>} capabilities list of capabilities details
    * @param {Array.<String>} specs List of spec file paths that are to be run
    * @param {string} cid worker id (e.g. 0-0)
    */
    beforeSession: function (config, capabilities, specs, cid) {
        global.testData = {
            ...devEnv,
            factory: () => new iosPageFactory(),
            platform: 'ios'
        }
    },
}
