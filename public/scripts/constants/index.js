var keymirror = require('keymirror');

module.exports = {
  BarsActionTypes: keymirror({
    BARS_CREATE: null,
    BARS_CREATE_SUCCESS: null,
    BARS_CREATE_FAIL: null
  }),

  AppActionTypes: keymirror({
    INITIALISE: null,
    INITIALISE_SUCCESS: null,
    INITIALISE_FAIL: null
  })
};
