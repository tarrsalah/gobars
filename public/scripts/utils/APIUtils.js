require('whatwg-fetch');

function get(url) {
  return window.fetch(url)
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var err = new Error(response.statusText);
        err.response = response;
        throw err;
      }
    })
    .then(function(response) {
      return response.json();
    });
}

function post(url, payload) {
  return window.fetch(url, {
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var err = new Error(response.statusText);
        err.response = response;
        throw err;
      }
    })
    .then(function(response) {
      return response.json();
    });
}

function getBars() {
  return get('/bars');
}

function addBar(bar) {
  return post('/bars', {name: bar});
}

module.exports = {
  getBars,
  addBar
};
