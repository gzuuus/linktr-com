import React from 'react'
import {SimplePool} from 'nostr-tools'

async function getPublicKey() {
    let publicKey;
    if (typeof window.nostr !== 'undefined' && typeof window.nostr.getPublicKey === 'function') {
        try {
            publicKey = await window.nostr.getPublicKey();
            console.log(`Public key: ${publicKey}`);
            connectRelay (publicKey)
        } catch (error) {
            console.error(`Error getting public key: ${error.message}`);
        }
    } else {
        console.warn('getPublicKey() is not available');
    }
}

const connectRelay = async (publicKey) => {
    const pool = new SimplePool()
    let relays = ['wss://nos.lol', 'wss://relay.punkhub.me'];
    let sub = pool.sub(
        [...relays],
        [
          {
            kinds: [0,1],
            authors: [publicKey]
          }
        ]
      )
    // Seleccionar el contenedor de mensajes
    const messageContainer = document.getElementById('message-container');
    const messageKind0Container = document.getElementById('message-kind0-container');
    // Limpiar los mensajes anteriores
    messageContainer.innerHTML = '';
    messageKind0Container.innerHTML = '';
    sub.on('event', (event) => {
        if (event.kind === 0) {
          const { content, pubkey } = event;
          const contentObj = JSON.parse(content)
          const messages = `
          <div class="pfp-container">
            <img class="pfp-image" src="${contentObj.picture}" alt="pfp">
            </div>
            <p><strong>${contentObj.name}</strong></p>
            <p>${contentObj.about}</p>
            <p><a href="${contentObj.about}"target="_blank"rel="noreferrer">Website</a></p>
            <p><strong>pubkey:</strong> ${pubkey}</p>
            
            `;
          console.log(event)
          // Crear el nuevo elemento de mensaje
          const messageElement = document.createElement('div');
          messageElement.innerHTML = messages;
          messageElement.classList.add('message-kind0');
          // Agregar el nuevo elemento de mensaje al contenedor
          messageKind0Container.appendChild(messageElement);
        }
        if (event.kind === 1) {
            const { content, pubkey } = event;
            const messages = `<strong>content:</strong> ${content}<br><strong>pubkey:</strong> ${pubkey}`;
            // Crear el nuevo elemento de mensaje
            const messageElement = document.createElement('div');
            messageElement.innerHTML = messages;
            messageElement.classList.add('message-kind1');
            // Agregar el nuevo elemento de mensaje al contenedor
            messageContainer.appendChild(messageElement);
          }

      });
      
      
  };

export const Nostr = () => {
  return (
    <div className='nostr-container'>
        <h3>Nostr!</h3>
        <button id="getPublicKeyButton" onClick={getPublicKey}>Get Public Key</button>
        <div id="message-kind0-container"></div>
        <p id="publicKeyResult"></p>
        <div id="message-container"></div>
    </div>
  )
}
export default Nostr