import config from '../config';
import TokenService from '../services/token-service';

const Bl3TrackerApiService = {
  getItems() {
    return fetch(`${config.API_ENDPOINT}/weapons`, {
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
  },

  getPrefixes(id) {
    return fetch(`${config.API_ENDPOINT}/weapons/prefixes/${id}`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  getAnointments(t, u, b, g, o, s) {
    let qs = '?';
    (function() {
      if (t) qs = qs.concat('terror=true&');
      if (u) qs = qs.concat('universal=true&');
      if (b) qs = qs.concat('beastmaster=true&');
      if (g) qs = qs.concat('gunner=true&');
      if (o) qs = qs.concat('operative=true&');
      if (s) qs = qs.concat('siren=true&');
      qs = qs.substring(0, qs.length - 1);
    })();
    console.log(qs);
    return fetch(`${config.API_ENDPOINT}/anointments${qs}`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  }
};

export default Bl3TrackerApiService;
