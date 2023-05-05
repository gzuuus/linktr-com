import { RelayPool } from "nostr-relaypool";
import { nip19, utils } from "nostr-tools";
import React, {useEffect, useMemo, useState } from "react";
import EventListComponent from './EventListComponent';
import { NostrLogo } from "../graphics/index.js";

const Nostr = () => {
  const [events, setEvents] = useState([]);
  // const [userRelayList, setuserRelayList] = useState([]);
  const [uniqueEvents, setUniqueEvents] = useState(new Set());

  const relayList = useMemo(() => [
    "wss://nos.lol",
    "wss://relay.nostr.band",
    "wss://nostr.wine/",
    "wss://universe.nostrich.land/",
    "wss://purplepag.es/"
  ], []);

  const getHexPubKey = (inNpub) => {
    switch (true) {
      case !inNpub && process.env.REACT_APP_NOSTR_PUBKEY?.startsWith("npub1"):
        return nip19.decode(process.env.REACT_APP_NOSTR_PUBKEY).data;
      case inNpub:
        return process.env.REACT_APP_NOSTR_PUBKEY;
      default:
        return process.env.REACT_APP_NOSTR_PUBKEY;
    }
  };
  
  
  useEffect(() => {
    const onLoad = () => {
      const relayPool = new RelayPool(relayList);

      relayPool.subscribe(
        [
          {
            kinds: [3,10002],
            authors: [getHexPubKey()],
          },
        ],
        relayList,
        (event, isAfterEose, relayURL) => {
          let objRelays = [];
          const objRecommendedRelays = [];
          try {

            if (event.kind === 3) {
              objRelays = Object.keys(JSON.parse(event.content));
            }}catch (error) {
              console.error(error);
            }
            event.tags.forEach(tag => {
              if (tag[0] === "r") {
                objRecommendedRelays.push(tag[1]);
              }
            });
            const userRelayList = [...objRelays, ...objRecommendedRelays];
          relayPool.subscribe(
            [
              {
                kinds: [0],
                authors: [getHexPubKey()],
              },
              {
                kinds: [1],
                authors: [getHexPubKey()],
                // since: (Math.floor((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)) / 1000)),
              },
            ],
            userRelayList,
            (event, isAfterEose, relayURL) => {
              if (!uniqueEvents.has(event.id)) {
                setUniqueEvents(new Set(uniqueEvents.add(event.id)));
                  setEvents(events =>
                    utils.insertEventIntoDescendingList(events, event))
              }
              //console.log(event, isAfterEose, relayURL);
            },
            undefined,
            (events, relayURL) => {
              //console.log(events, relayURL);
            }
          );
        },
        undefined,
        (events, relayURL) => {
          //console.log(events, relayURL);
        }
      );
        
      relayPool.onerror((err, relayUrl) => {
        console.log("RelayPool notice", err, " from relay ", relayUrl);
      });
      relayPool.onnotice((relayUrl, notice) => {
        console.log("RelayPool notice", notice, " from relay ", relayUrl);
      });
      return () => {
        relayPool.close();
      };
    };
    
    window.onload = onLoad;

    return () => {
      window.onload = null;
    };
  }, []);
  return (
    
    <div className="nostrContainer">
      <div>
      <NostrLogo className="nostrLogo"/>
      <EventListComponent events={events} />
      </div>
    </div>
  );
};

export default Nostr;
