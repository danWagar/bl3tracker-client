import config from '../config';
import TokenService from '../services/token-service';

const Bl3TrackerApiService = {
  getItems() {
    return fetch(`${config.API_ENDPOINT}/items`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  getCharacters() {
    return fetch(`${config.API_ENDPOINT}/characters`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  addCharacter(newChar) {
    return fetch(`${config.API_ENDPOINT}/characters`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(newChar)
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  }
};

export default Bl3TrackerApiService;
