const ADD_BAR = 'ADD_BAR';

function addBar(text) {
  return {
    type: ADD_BAR,
    text: text
  };
}

module.exports = {
  ADD_BAR,
  actions:{addBar}
};
