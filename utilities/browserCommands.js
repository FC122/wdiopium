const { JSDOM } = require('jsdom');
const { ImapFlow } = require("imapflow");
const simpleParser = require("mailparser").simpleParser
/**
 * https://webdriver.io/docs/api/browser/addCommand 
 * File for adding helper commands
 * Command is accessible in tests and screens on browser object
 * e.g. browser.getFirstHref(some_string)
 * */
module.exports = {
    /**Returns first link it fines in html string*/
    getFirstHref: (htmlString) => {
        const dom = new JSDOM(htmlString);
        const firstAnchor = dom.window.document.querySelector('a');
        return firstAnchor ? firstAnchor.href : null;
    },
    /**ios locator wrapper*/
    getByIosPredicateString: (str) => {
        return $(`-ios predicate string:${str}`);
    },
    /**ios locator wrapper */
    getByIosClassChain: (classChain) => {
        return $(`-ios class chain:${classChain}`);
    },
    /**Android locator wrapper */
    getById: (id) => $(`id=com.barrage.travelspot:id/${id}`),
    /**Given a list of elements it checks if all are visible if one is not it throws an error*/
    areElementsDisplayed: async (elements) => {
        for (const element of elements) {
            (await element).waitForDisplayed({ timeout: 5000 });
            if (!((await element).isDisplayed())) {
                return false;
            }
        }
        return true;
    },
    /**Returns a random number*/
    uuid: () => {
        return Math.floor(Math.random() * 1e6);
    },
    /**Recursevly does a task for parameters in settings until the condition is met or the timeout or limit is used up*/
    recurse: async (task, condition, settings = { limit: 1, timeout: 10000, delay: 1000 }) => {
        let endTime = performance.now() + settings.timeout + settings.delay
        while (settings.limit > 0 && performance.now() < endTime) {
            let taskResult = await task()
            let conditionResult = await condition(taskResult)
            settings.limit--
            if (conditionResult) {
                return taskResult
            } else {
                setTimeout(() => {
                    console.log('Limit: ' + settings.limit)
                }, settings.delay)
            }
        }
        throw new Error('Recurse failed')
    }
}
