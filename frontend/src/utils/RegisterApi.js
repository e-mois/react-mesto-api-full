class RegisterApi {
  constructor(options) {
    this._options = options;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  register(data) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponseStatus)
  }

  authorize(data) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponseStatus)
  }

  getContent() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      // headers: {
      //   "Authorization" : `Bearer ${token}`,
      //   'Content-Type': 'application/json'
      // }
      headers: this._options.headers,
    })
    .then(this._checkResponseStatus)
  }

}

const registerApi = new RegisterApi({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default registerApi;