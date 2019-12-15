import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CharacterContext, { CharacterProvider } from '../contexts/CharacterContext';
import App from '../components/App/App';
import Header from '../components/Header/Header';
import Character from '../components/Character/Character';
import LandingPage from '../components/LandingPage/LandingPage';
import LoginForm from '../components/LoginForm/LoginForm';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import Shield from '../components/Shield/Shield';
import ShieldRow from '../components/ShieldRow/ShieldRow';
import Shields from '../components/Shields/Shields';
import ShieldsTable from '../components/ShieldsTable/ShieldsTable';
import UserShieldForm from '../components/UserShieldForm/UserShieldForm';
import UserWeaponForm from '../components/UserWeaponForm/UserWeaponForm';
import Weapon from '../components/Weapon/Weapon';
import WeaponFilters from '../components/WeaponFilters/WeaponFilters';
import WeaponRow from '../components/WeaponRow/WeaponRow';
import Weapons from '../components/Weapons/Weapons';
import WeaponsTable from '../components/WeaponsTable/WeaponsTable';
import InventoryPage from '../routes/InventoryPage/InventoryPage';
import LoginPage from '../routes/LoginPage/LoginPage';
import NotFoundPage from '../routes/NotFoundPage/NotFoundPage';
import RegistrationPage from '../routes/RegistrationPage/RegistrationPage';

const shield = {
  rarity: 'Legendary'
};

it('renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Header without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders LandingPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders LoginForm without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders RegistrationForm without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Shield without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <CharacterProvider>
        <Shield shield={shield} />
      </CharacterProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders ShieldRow without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ShieldRow shield={shield} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Shields without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <CharacterProvider value={{ characters: [{ id: 0, shields: [{ charId: 0, shield: 'test' }] }] }}>
        <Shields charId={0} />
      </CharacterProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Character without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <CharacterProvider>
        <Character char={['Vault']} />
      </CharacterProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders UserShieldForm without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <UserShieldForm />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders UserWeaponForm without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <UserWeaponForm />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Weapon without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Weapon wpn={{ rarity: 'legendary' }} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders WeaponFilters without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <WeaponFilters />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders WeaponRow without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <WeaponRow item={{ mfr_name: 'test', weapon_type: 'test', name: 'test' }} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Weapons without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <CharacterProvider value={{ characters: [{ id: 0, weapons: [{ charId: 0, weapon: 'test' }] }] }}>
        <Weapons charId={0} />
      </CharacterProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders WeaponsTable without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <WeaponsTable />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders InventoryPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <InventoryPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders LoginPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders NotFoundPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders RegistrationPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <RegistrationPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
