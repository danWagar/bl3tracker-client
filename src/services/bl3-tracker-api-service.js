import config from '../config';
import TokenService from '../services/token-service';

const Bl3TrackerApiService = {
  getWeapons(qryParam) {
    let qs = '?';
    (function() {
      //if (terror) qs = qs.concat('terror=true&');
      if (qryParam) qs = qs.concat(`${qryParam}`);
      else qs = qs.substring(0, qs.length - 1);
    })();
    return fetch(`${config.API_ENDPOINT}/items/weapons${qs}`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  getShields(qryParam) {
    let qs = '?';
    (function() {
      if (qryParam) qs = qs.concat(`${qryParam}`);
      else qs = qs.substring(0, qs.length - 1);
    })();
    return fetch(`${config.API_ENDPOINT}/items/shields${qs}`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  postWeapon(wpn_data) {
    return fetch(`${config.API_ENDPOINT}/inventory/weapons`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(wpn_data)
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  postShield(shield_data) {
    return fetch(`${config.API_ENDPOINT}/inventory/shields`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(shield_data)
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

  getCharacterWeapons(char_id) {
    return fetch(`${config.API_ENDPOINT}/inventory/weapons/${char_id}`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  getCharacterShields(char_id) {
    return fetch(`${config.API_ENDPOINT}/inventory/shields/${char_id}`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  getPrefixes(id) {
    return fetch(`${config.API_ENDPOINT}/items/weapons/prefixes/${id}`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  getAnointments(terror, cls) {
    let qs = '?';
    (function() {
      if (terror) qs = qs.concat('terror=true&');
      if (cls) qs = qs.concat(`class=${cls}&`);
      qs = qs.substring(0, qs.length - 1);
    })();
    return fetch(`${config.API_ENDPOINT}/anointments${qs}`, {
      headers: { authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  }
};

export default Bl3TrackerApiService;
