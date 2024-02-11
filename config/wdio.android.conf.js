const { AndroidPageFactory } = require('../screens/Factories')
const sharedConfig = require('./wdio.shared.conf')
const devEnv = require('./devEnv')

exports.config = {
    ...sharedConfig,
    hostname: '127.0.0.1',
    path: '/wd/hub',
    capabilities: [{
        "path": '/wd/hub',
        // capabilities for local Appium web tests on an Android Emulator
        platformName: 'Android',
        "appium:platformVersion": "11.0",
        "appium:deviceName": "Pixel 6 Pro API 30",
        "appium:app": "",
        "appium:appPackage": "",
        "appium:automationName": "UiAutomator2",
        "appium:uiautomator2ServerLaunchTimeout": 300000,
        "appium:uiautomator2ServerInstallTimeout": 200000,
        "appium:disableWindowAnimation": false,
        "appium:skipDeviceInitialization": false,
        "appium:appActivity": ".activities.MainActivity",
        "appium:appWaitActivity": ".activities.MainActivity",
        "appium:appWaitPackage": "",
        "appium:appWaitDuration": 50000,
        "appium:newCommandTimeout": 50000
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
            factory: () => new AndroidPageFactory(),
            platform: 'android'
        }
    },
}
