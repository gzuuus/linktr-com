import React from 'react'
import {SimplePool, nip19} from 'nostr-tools'
import DOMPurify from 'dompurify';
import { marked } from 'marked';



const connectRelay = async (publicKey) => {
  const pool = new SimplePool()
  const relays = ['wss://nos.lol', 'wss://relay.punkhub.me'];
  const sub = pool.sub(
      [...relays],
      [
        {
          kinds: [0, 1],
          authors: [publicKey]
        }
      ]
    )
  // Seleccionar el contenedor de mensajes
  const messageContainer = document.getElementById('message-container');
  const messageKind0Container = document.getElementById('message-kind0-container');
  // Limpiar los mensajes anteriores
  messageContainer.textContent = '';
  messageKind0Container.textContent = '';
  

  sub.on('event', (event) => {
    const { kind, content, pubkey, id, created_at } = event;
  
    if (kind === 0) {
      let latestMessage = null;
      const contentObj = JSON.parse(content);
      const messages = `
        <div class="pfp-container">
          <img class="pfp-image" src="${contentObj.picture}" alt="pfp">
        </div>
        <p><strong>${contentObj.name}</strong></p>
        <p>${contentObj.about}</p>
        <p><a href="${contentObj.about}" target="_blank" rel="noreferrer">Website</a></p>
        <p><strong>pubkey:</strong> ${pubkey}</p>
      `;
      const messageElement = document.createElement('div');
      messageElement.innerHTML = messages;
      messageElement.classList.add('message-kind0');
  
      // Only show the latest message
      if (!latestMessage || Date.parse(created_at) > Date.parse(latestMessage.created_at)) {
        messageKind0Container.textContent = '';
        messageKind0Container.appendChild(messageElement);
      }
    }
    if (kind === 1) {
      const noteId = nip19.noteEncode(id);
      const contentWithLinks = content.replace(/(https?:\/\/\S+)/gi, (match) => {
        const imgRegex = /\.(jpg|jpeg|png|webp|gif)$/i;
        if (imgRegex.test(match)) {
          return `<img class="nostr-img" src="${match}" alt="${match}">`;
        } else {
          return `[${match}](${match})`;
        }
      });
      const messages = `
        <div>${DOMPurify.sanitize(marked(contentWithLinks))}</div>
        <ul>
          <a href="https://snort.social/e/${noteId}" target="_blank" rel="noopener noreferrer"><li>View outside</li></a>
        </ul>
      `;
      const messageElement = document.createElement('div');
      messageElement.innerHTML = messages;
      messageElement.classList.add('message-kind1');
      messageContainer.appendChild(messageElement);
    }
  });  
};

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