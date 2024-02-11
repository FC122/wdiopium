/**
 * https://webdriver.io/docs/api/element/custom$$/
 * File for adding custom locator strategies
 * Command is accessible in tests and screens on $ object
 * e.g. $(selector).custom$$(strategyName, strategyArguments)
 * */
module.exports = {
    exampleCommand: (selector, root) => {
        const scope = root ? root : document
        /**Custom Implementation*/
        return scope.querySelectorAll(selector)
    }
}
