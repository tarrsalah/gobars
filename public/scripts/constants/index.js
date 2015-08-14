var keymirror = require('keymirror');

module.exports = {
  BarsActionTypes: keymirror({
    CREATE_REQUEST: null,
    CREATE_SUCCESS: null,
    CREATE_FAILURE: null
  }),

  AppActionTypes: keymirror({
    INITIALISE_REQUEST: null,
    INITIALISE_SUCCESS: null,
    INITIALISE_FAIL: null
  })
};
