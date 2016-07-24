/* eslint prefer-template: 0 */
/* eslint object-shorthand: 0 */

require('babel-core/register')();
const jsdom = require('jsdom');

if (typeof document === 'undefined') {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = global.document.defaultView;
  global.navigator = global.window.navigator;
  global.window.URL = {
    createObjectURL: function createObjectURL(arg) {
      return 'data://' + arg.name;
    },
  };
}
