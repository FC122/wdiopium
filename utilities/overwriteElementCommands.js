/**
 * https://webdriver.io/docs/api/browser/overwriteCommand/
 * File for overwriting existing commands accessible on the element object
 * e.g. $(selector).click()
 * */
module.exports = {
    /** If element doesn't have text it checks if element has android text view child elements and concats their texts*/
    getText: async function (originalMethod) {
        let text = await originalMethod();
        if (!text) {
            const textViews = await (await this).$$('.android.widget.TextView');
            text = '';
            for (let view of textViews) {
                text += await (await view).getText();
            }
        }
        return text.replace(/[\u2018\u2019]/g, "'");
    }
}
