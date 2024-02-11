class IScreen {
    /**Interactive Locators */
    /**Visuals Locators*/
    /**Label Locators*/
    /**Helper Methods */
    async isScreenDisplayed() { throw new Error("This method should be overridden in the subclass") }
    /**Content */
    content = {
    }
}

class AndroidScreen extends IScreen {
    /**Interactive Locators */
    /**Visuals Locators*/
    /**Label Locators*/
    /**Helper Methods */
    async isScreenDisplayed() { }
    /**Content */
}

class iosScreen extends IScreen {
    /**Interactive Locators */
    /**Visuals Locators*/
    /**Label Locators*/
    /**Helper Methods */
    async isScreenDisplayed() { }
    /**Content */
}

module.exports = {
    AndroidScreen,
    iosScreen,
    IScreen
}
