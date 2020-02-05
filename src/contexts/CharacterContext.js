import React, { Component } from 'react';
import trackerService from '../services/bl3-tracker-api-service';

const CharacterContext = React.createContext({
  characters: [],
  currentCharAddWeaponExpanded: null,
  currentCharAddShieldExpanded: null,
  bankId: null,
  editNameCharId: null,
  error: null,
  setError: () => {},
  clearError: () => {},
  addWeaponClickEvent: () => {},
  updateChars: () => {}
});
export default CharacterContext;

export class CharacterProvider extends Component {
  state = {
    characters: [],
    bankId: null,
    currentCharAddWeaponExpanded: null,
    editNameCharId: null,
    error: null,
    ...this.props.value
  };

  clearContext = () => {
    this.setState({
      characters: [],
      currentCharAddWeaponExpanded: null,
      error: null
    });
  };

  initCharacters = characters => {
    let bankId;
    let chars = characters.map(char => {
      char.weapons = [];
      char.shields = [];
      char.addInventory = false;
      if (char.character === 'Bank') bankId = char.id;
      return char;
    });
    this.setState({ characters: chars, bankId: bankId });
  };

  initCharacterWeapons = (char_id, weapons) => {
    this.setState({ error: null });
    let characters = this.state.characters;
    characters = characters.map(char => {
      if (char.id === char_id) char.weapons = weapons;
      return char;
    });
    this.setState({ characters: characters });
  };

  initCharacterShields = (char_id, shields) => {
    let characters = this.state.characters;
    characters = characters.map(char => {
      if (char.id === char_id) char.shields = shields;
      return char;
    });
    this.setState({ characters: characters });
  };

  handleSubmitAddCharacter = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    let { character, name } = ev.target;
    if (!name.value) name.value = character.value;
    trackerService
      .addCharacter({
        character: character.value,
        character_name: name.value
      })
      .then(char => {
        char.weapons = [];
        char.shields = [];
        char.addWeapons = false;
        this.setState({ characters: [...this.state.characters, char] });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  setEditNameCharId = id => {
    if (id === this.state.editNameCharId) id = null;
    this.setState({ editNameCharId: id });
  };

  getEditNameCharId = () => {
    return this.state.editNameCharId;
  };

  handleSubmitEditCharacter = (char_id, ev) => {
    ev.preventDefault();
    this.setState({ error: null, editNameCharId: null });
    const { name } = ev.target;

    trackerService
      .patchCharacter(char_id, { character_name: name.value })
      .then(() => {
        let characters = this.state.characters.map(char => {
          if (char.id === char_id) char.character_name = name.value;
          return char;
        });
        this.setState({ characters: [...characters] });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  handleDeleteCharacter = e => {
    this.setState({ error: null });
    const char_id = Number(e.target.value);
    trackerService
      .deleteCharacter(char_id)
      .then(() => {
        let characters = this.state.characters.filter(char => {
          return char.id !== char_id;
        });

        this.setState({ characters: [...characters] });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  addWeaponClickEvent = id => {
    if (this.state.currentCharAddWeaponExpanded === id) id = null;
    this.setState({ currentCharAddWeaponExpanded: id });
  };

  addShieldClickEvent = id => {
    if (this.state.currentCharAddShieldExpanded === id) id = null;
    this.setState({ currentCharAddShieldExpanded: id });
  };

  handleSubmitWeapon = wpn => {
    for (const [key, value] of Object.entries(wpn)) if (value === '') wpn[key] = null;

    trackerService
      .postWeapon(wpn)
      .then(res => {
        let characters = this.state.characters;
        characters = characters.map(char => {
          if (char.id === res.char_id) {
            char.weapons = [...char.weapons, res];
          }
          return char;
        });
        this.setState({ characters: characters });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  handleEditWeapon = toUpdate => {
    for (const [key, value] of Object.entries(toUpdate)) if (value === '') toUpdate[key] = null;
    this.setState({ error: null });
    let characters = this.state.characters;
    trackerService
      .patchUserWeapon(toUpdate.id, toUpdate)
      .then(updatedWpn => {
        characters = characters.map(char => {
          char.weapons = char.weapons.map(wpn => {
            if (wpn.user_weapon_id === updatedWpn.user_weapon_id) wpn = updatedWpn;
            return wpn;
          });
          return char;
        });
      })
      .then(() => this.setState({ characters: characters }));
  };

  handleSubmitShield = shield => {
    for (const [key, value] of Object.entries(shield)) if (value === '') shield[key] = null;

    trackerService
      .postShield(shield)
      .then(res => {
        let characters = this.state.characters;
        characters = characters.map(char => {
          if (char.id === res.char_id) {
            char.shields = [...char.shields, res];
          }
          return char;
        });
        this.setState({ characters: characters });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  handleDeleteWeapon = e => {
    const id = Number(e.target.value);
    trackerService
      .deleteUserWeapon(id)
      .then(() => {
        let characters = this.state.characters;
        characters = characters.map(char => {
          char.weapons = char.weapons.filter(wpn => wpn.user_weapon_id !== id);
          return char;
        });
        this.setState({ characters: characters });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  handleDeleteShield = e => {
    const id = Number(e.target.value);
    trackerService
      .deleteUserShield(id)
      .then(() => {
        let characters = this.state.characters;
        characters = characters.map(char => {
          char.shields = char.shields.filter(shield => shield.user_shield_id !== id);
          return char;
        });
        this.setState({ characters: characters });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  handleMoveWeapon = e => {
    const { currentChar, moveToCharId, userWeaponId } = JSON.parse(e.target.value);
    const toUpdate = {
      char_id: moveToCharId
    };

    trackerService.patchUserWeapon(userWeaponId, toUpdate).then(() => {
      let characters = this.state.characters;
      let weaponToMove;
      let moveToCharAt;
      characters = characters.map((char, i) => {
        if (char.id === currentChar)
          char.weapons = char.weapons.filter(wpn => {
            if (wpn.user_weapon_id === userWeaponId) {
              weaponToMove = wpn;
            }
            return wpn.user_weapon_id !== userWeaponId;
          });
        else if (char.id === moveToCharId) moveToCharAt = i;
        return char;
      });
      characters[moveToCharAt].weapons = [...characters[moveToCharAt].weapons, weaponToMove];
      this.setState({ characters: characters });
    });
  };

  handleMoveShield = e => {
    const { currentChar, moveToCharId, userShieldId } = JSON.parse(e.target.value);
    const toUpdate = {
      char_id: moveToCharId
    };

    trackerService.patchUserShield(userShieldId, toUpdate).then(() => {
      let characters = this.state.characters;
      let shieldToMove;
      let moveToCharAt;
      characters = characters.map((char, i) => {
        if (char.id === currentChar)
          char.shields = char.shields.filter(shield => {
            if (shield.user_shield_id === userShieldId) {
              shieldToMove = shield;
            }
            return shield.user_shield_id !== userShieldId;
          });
        else if (char.id === moveToCharId) moveToCharAt = i;
        return char;
      });
      characters[moveToCharAt].shields = [...characters[moveToCharAt].shields, shieldToMove];
      this.setState({ characters: characters });
    });
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      characters: this.state.characters,
      bankId: this.state.bankId,
      currentCharAddWeaponExpanded: this.state.currentCharAddWeaponExpanded,
      currentCharAddShieldExpanded: this.state.currentCharAddShieldExpanded,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      clearContext: this.clearContext,
      handleSubmitAddCharacter: this.handleSubmitAddCharacter,
      setEditNameCharId: this.setEditNameCharId,
      getEditNameCharId: this.getEditNameCharId,
      handleSubmitEditCharacter: this.handleSubmitEditCharacter,
      handleDeleteCharacter: this.handleDeleteCharacter,
      handleSubmitWeapon: this.handleSubmitWeapon,
      handleEditWeapon: this.handleEditWeapon,
      handleSubmitShield: this.handleSubmitShield,
      updateChars: this.updateChars,
      addWeaponClickEvent: this.addWeaponClickEvent,
      addShieldClickEvent: this.addShieldClickEvent,
      handleDeleteWeapon: this.handleDeleteWeapon,
      handleDeleteShield: this.handleDeleteShield,
      handleMoveWeapon: this.handleMoveWeapon,
      handleMoveShield: this.handleMoveShield,
      initCharacters: this.initCharacters,
      initCharacterWeapons: this.initCharacterWeapons,
      initCharacterShields: this.initCharacterShields
    };
    return <CharacterContext.Provider value={value}>{this.props.children}</CharacterContext.Provider>;
  }
}
