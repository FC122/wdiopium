/*Screen imports here*/

class AbstractPageFactory {}

class AndroidPageFactory extends AbstractPageFactory {}

class iosPageFactory extends AbstractPageFactory {}

module.exports = {
  AbstractPageFactory,
  AndroidPageFactory,
  iosPageFactory
}
