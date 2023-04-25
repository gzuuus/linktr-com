import React from 'react';
import { Links } from './components/Links';
import { Donations } from './components/Donations';
import Nostr from './components/Nostr';

function App() {

  return (
    <div className='mainDiv'>
      <div className='mainContainer'>
        <img className='header-img' src="./img/logo-purple.svg" alt="pfp"></img>
        <h1>PunkHub</h1>
        <Links></Links>
        <Donations></Donations>
        {/* <Nostr></Nostr> */}
      </div>
    </div>
  );
}

export default App;