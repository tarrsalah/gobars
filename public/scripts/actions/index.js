const ADD_BAR = 'ADD_BAR';

function addBar(text) {
  console.log('addBar action => ', text);
  return {
    type: ADD_BAR,
    text: text,
  };
}

module.exports ={ADD_BAR, addBar};
