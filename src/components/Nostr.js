import React, { useState, useEffect } from 'react';
import {SimplePool, nip19} from 'nostr-tools'
import DOMPurify from 'dompurify';
import { marked } from 'marked';
function Nostr() {
    const [pubKey, setJsonData] = useState("");
  
    useEffect(() => {
      async function fetchJsonData() {
        const response = await fetch(`${window.location.href}/.well-know/nostr.json`);
        const data = await response.json();
        const names = data.names;
        const firstKeyValue = names[Object.keys(names)[0]];
        setJsonData(firstKeyValue);
      }
      fetchJsonData();
    }, []);

    useEffect(() => {
        async function connectRelay() {
          if (!pubKey) {
            return;
          }
    
          const pool = new SimplePool();
          const relays = [ "wss://nos.lol",
            "wss://relay.nostr.band",
            "wss://nostr.wine/",
            "wss://universe.nostrich.land/",
            "wss://welcome.nostr.wine/"];
          const sub = pool.sub(
            [...relays],
            [
              {
                kinds: [0, 30023],
                authors: [pubKey],
                // since: Math.floor((Date.now() / 1000)-86400),

              },
            ]
          )
            const messageContainer = document.getElementById('message-container');
            const messageKind0Container = document.getElementById('message-kind0-container');
            messageContainer.textContent = '';
            messageKind0Container.textContent = '';

            sub.on('event', (event) => {
                const { kind, content, pubkey, id, created_at } = event;
            
                if (kind === 0) {
                let latestMessage = null;
                const contentObj = JSON.parse(content);
                const messages = `
                    <p><strong>pubkey:</strong> ${pubkey}</p>
                `;
                // <div class="pfp-container">
                // <img class="pfp-image" src="${contentObj.picture}" alt="pfp">
                // </div>
                // <p><strong>${contentObj.name}</strong></p>
                // <p>${contentObj.about}</p>
                // <p><a href="${contentObj.about}" target="_blank" rel="noreferrer">Website</a></p>
                const messageElement = document.createElement('div');
                messageElement.innerHTML = messages;
                messageElement.classList.add('message-kind0');
            
                // Only show the latest message
                if (!latestMessage || Date.parse(created_at) > Date.parse(latestMessage.created_at)) {
                    messageKind0Container.textContent = '';
                    messageKind0Container.appendChild(messageElement);
                }
                }
                if (kind === 30023) {
                  console.log(event.tags[1]);
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
        }
        connectRelay();
      }, [pubKey]);

    return (
      <div className='nostrContainer'>
        <div id="message-kind0-container"></div>
        <p id="publicKeyResult"></p>
        <div id="message-container"></div>
      </div>
    );
  }
  
  export default Nostr;