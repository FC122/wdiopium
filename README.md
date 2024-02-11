# wdiopium

## Description
Boilerplate for testing mobile apps.
Based on this blog: https://www.barrage.net/blog/company/abstract-factory-in-cross-platform-testing

Technologies:
- Appium Server
- WebdriverIO Client (Javascript)
- mocha
- chai 
- WebDriverAgent
- Android Studio
- Xcode

## Visuals
To be able to have the same test code for different platforms an Abstract Factory is implemented. It serves as a neat way of organizing tests and making them executable for multiple platforms. Interfaces prescribe the methods for interacting with screens. Those methods include locators and helper methods. Concrete classes implement interfaces and with that ensure that the test code works for different platforms. To instantiate concrete classes we use factories which are extended from an abstract class. Abstract class along with create methods can contain helper methods not specific to a platform. Concrete factories along with overridden create methods can contain platform-specific helper methods.
![image](https://github.com/FC122/wdiopium/assets/72666124/d9c0dd25-08a5-48b9-a5c0-f1b6aa94b932)


## Installation
1. git clone wdio-appium

2. cd wdio-appum

3. npm i

3. Instal Appium (recommend for Android: v1.22.3, for iOS: v2.0.1)
    - You can have v2.0.1 as npm plugin and v1.22.3 as GUI version

4. Install Appium Inspector

Android:

- Instal Android Studio
- In Android Studio open Virtual Device Manager
- Run some Device (recommended: Pixel 6 Pro API 30, Android 11.0 Google APIs|x86)
- Run Appium, and make sure that port and hostname in Appium and in wdio.android.conf.js match
    - for hostname don't write localhost write 127.0.0.1
- Before running the code it is recommended to run the app with the Appium Inspector
- Before running the code, fill in the capabilities in wdio.android.conf.js with data about your app
    - appPackage and appActivity can be found in Android.manifest file
- Run command: npm run wdio:android

iOS:
- Instal Xcode for iOS Simulator
- Run Appium, and make sure that port and hostname in Appium and in wdio.ios.conf.js match
    - for hostname don't write localhost write 127.0.0.1
- Before running the code it is recommended to run the app with the Appium Inspector
- Before running the code, fill in the capabilities in wdio.android.conf.js with data about your app
    - for iOS you don't need appActivty. appPackage (BundelId) can be found in Info.plist file
- If you are using node Appium go to /Users/{your_user}/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent, if you are using GUI Appium go to Appium Server GUI.app > Right Click > Show Package Contents > Contents > Resources > app > node_modules > appium > node_modules > appium-webdriveragent
- Follow these instructions: https://github.com/facebookarchive/WebDriverAgent/wiki/Starting-WebDriverAgent
- If WDA install won't succeed it is because it is outdated
    - Go to: https://github.com/appium/WebDriverAgent/releases?page=1
    - Download Source.zip
    - Open appium-webdriveragent folder
    - Delete everything except build folder
    - Copy/paste contents from Source.zip
    - Follow these instructions: https://github.com/facebookarchive/WebDriverAgent/ again
- WDA should be successfully installed
- Before running the code it is recommended to run the app with the Inspector
- Run command: npm run wdio:ios

## Usage
Folders:
- e2e - the folder that contains all test code arranged by screen
- screens - the folder that contains all screens arranged by screen, contains abstract factory implementation along with TemplateScreen.js
    - TemplateScreen.js file that contains the template by which screens should be written and organized
- utilities - contains commands and helper functions
    - apiCommands.js - all commands that interact with the server should go here 
    - browserCommands.js - if you want for custom command to be accessible over the browser object put it here
    - elementCommands.js - if you want for custom command to be accessible over the element object put it here
    - locatorStrategies.js - custom locator strategies go here
    - overwriteBrowserCommands.js - if you want to overwrite the command accessible on the browser object put it here
    - overwriteElementCommands.js - if you want to overwrite the command accessible on the element object put it here
- config - the folder that contains configurations and environment data
    - devEnv.js - file with environment data like password and username
    - wdio.android.conf.js - file with android appium configurations
    - wdio.ios.conf.js - file with ios appium configuration
    - wdio.shared.conf.js - file with configurations shared between ios and android

When adding a new screen:
- Prescribe a new interface:

```
class ILoginScreen {
    async emailInput() { throw new Error("This method should be overridden in the subclass") }
    async submitEmailButton() { throw new Error("This method should be overridden in the subclass") }
    login() { throw new Error("This method should be overridden in the subclass") }
}
module.exports = ILoginScreen
```

- Create a class that implements that interface:

```
class AndroidLoginScreen extends ILoginScreen {
     emailInput = () => getById('email_input')
     submitEmailButton = () => getById('button')
     async login(email, password) {
          await this.emailInput().waitForDisplayed({ timeout: 5000 });
          await this.emailInput().setValue(email);
          await this.submitEmailButton().waitForEnabled({ timeout: 5000 });
          await this.submitEmailButton().click();
          const response = await getLastEmail(email, password)
          const emailParsed = await parseEmail(response)
          browser.url(getFirstHref(emailParsed.html))
     }
}
module.exports = AndroidLoginScreen
```

- Add create method for that screen in Abstract class:

```
class AbstractPageFactory {
  createLogin() {
    throw new Error("This method should be overridden in the subclass");
  }

  createChat() {
    throw new Error("This method should be overridden in the subclass");
  }
}
module.exports = AbstractPageFactory
```

- Override method for that screen in Concrete factory class:

```
class AndroidPageFactory extends AbstractPageFactory {
  createLogin() {
    return new AndroidLoginScreen();
  }
  createChat() {
    return new AndroidChatScreen();
  }
  //all custom functions related to android
}
module.exports = AndroidPageFactory
```

How to use screen objects in the test code:

Factory is accessible as a global variable so to create your screen object you need to:

```
const loginScreen = testData.factory().createLogin()
const chatScreen = testData.factory().createChat()
```

Then you can use the locators and helper methods in tests:

```
it('Send message', async () => {
        await chatScreen.chatFragment().waitForDisplayed({ timeout: 5000 });
        await chatScreen.sendMessage("Hello")
        await chatScreen.message("Hello").waitForDisplayed({ timeout: 5000 })
        const text = await chatScreen.message('Hello').getText()
        expect(text).toContain('Hello')
    });
```
## Authors and acknowledgment
Filip Cica
