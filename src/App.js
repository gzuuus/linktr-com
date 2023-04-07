import React from 'react';
import { Links } from './components/links';
import { Donations } from './components/donations';
import { Nostr } from './components/nostr';
import {SimplePool} from 'nostr-tools'

function App() {

  return (
    <div className='main-div'>
      <Links></Links>
      <Donations></Donations>
      <Nostr></Nostr>
    </div>
  );
}

export default App;