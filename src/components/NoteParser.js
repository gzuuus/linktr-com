import React, { useState, useEffect } from 'react';
import { nip19 } from "nostr-tools";
import { GoOut} from "../graphics/index.js";
import { v4 as uuidv4 } from 'uuid';



const NoteParser = ({ note }) => {
  const eventPointer = buildEventPointer(note.id, [note.relayURL], note.pubkey);
  const encodedEvent = nip19.neventEncode(eventPointer);
  const regex = /(@npub1\S+)|(nostr:npub1\S+)|(@nevent\S+)|(nostr:nevent\S+)|(@note\S+)|(nostr:note\S+)|(@naddr\S+)|(nostr:naddr\S+)|((https?:\/\/|www\.)[^\s<]+)|(?:^|(?<=\s))(?:[\w\d]+\.)+(?:[a-zA-Z]{2,})(?:\/[\w\d.-]*)*(?=[^\w\d]|$)|#\w+/g;

  const processContent = () => {
    const result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(note.content))) {
      const beforeLink = note.content.substring(lastIndex, match.index);
      if (beforeLink) {
        result.push(<span key={lastIndex+uuidv4()}>{beforeLink}</span>);
      }

      const link = match[0];
      if (link.startsWith("nostr:npub1")) {
        result.push(
          <a key={link+uuidv4()} href={process.env.REACT_APP_NOSTR_OUTER_PROFILES+(link).substring(6)} target='_blank' rel='noreferrer'>
            {'👤@'+(link).substring(6).slice(0, 16)}...
          </a>
        );
      } else if (link.startsWith("@npub1")) {
        result.push(
          <a key={link+uuidv4()} href={process.env.REACT_APP_NOSTR_OUTER_PROFILES+(link).substring(1)} target='_blank' rel='noreferrer'>
            {'👤@'+(link).substring(6).slice(0, 16)}...
          </a>
        );
      } else if (link.startsWith("nostr:nevent")) {
        result.push(
          <a key={link+uuidv4()} href={process.env.REACT_APP_NOSTR_OUTER_NOTES+(link).substring(6)} target='_blank' rel='noreferrer'>
            {'📰@'+(link).substring(6).slice(0, 16)}...
          </a>
        );
      } else if (link.startsWith("@nevent")) {
        result.push(
          <a key={link+uuidv4()} href={process.env.REACT_APP_NOSTR_OUTER_NOTES+(link).substring(1)} target='_blank' rel='noreferrer'>
            {'📰@'+(link).substring(6).slice(0, 16)}...
          </a>
        );
      } else if (link.startsWith("nostr:note")) {
        result.push(
          <a key={link+uuidv4()} href={process.env.REACT_APP_NOSTR_OUTER_NOTES+(link).substring(6)} target='_blank' rel='noreferrer'>
            {'📰@'+(link).substring(6).slice(0, 16)}...
          </a>
        );
      } else if (link.startsWith("@note")) {
        result.push(
          <a key={link+uuidv4()} href={process.env.REACT_APP_NOSTR_OUTER_NOTES+(link).substring(1)} target='_blank' rel='noreferrer'>
            {'📰@'+(link).substring(6).slice(0, 16)}...
          </a>
        );
      } else if (link.startsWith("nostr:naddr")) {
        result.push(
          <a key={link+uuidv4()} href={process.env.REACT_APP_NOSTR_OUTER_LONG+(link).substring(6)} target='_blank' rel='noreferrer'>
            {'📰@'+(link).substring(6).slice(0, 16)}...
          </a>
        );
      } else if (link.startsWith("@naddr")) {
        result.push(
          <a key={link+uuidv4()} href={process.env.REACT_APP_NOSTR_OUTER_LONG+(link).substring(1)} target='_blank' rel='noreferrer'>
            {'📰@'+(link).substring(6).slice(0, 16)}...
          </a>
        );
      } else if (link.startsWith("#")) {
        result.push(
          <a key={link+uuidv4()} href={process.env.REACT_APP_NOSTR_OUTER_HASHTAGS+(link).substring(1)} target='_blank' rel='noreferrer'>
            {link}
          </a>
        );
      }
      else {
        const extension = link.split('.').pop();
        const isImage = /\.(gif|jpe?g|png|webp|svg)$/i.test(link);
        const isVideo = /\.(mp4|webm|ogg)$/i.test(link);

        if (isImage) {
          result.push(<img key={link+uuidv4()} className='isImage' src={link} alt="" />);
        } else if (isVideo) {
          result.push(
            <video key={link+uuidv4()}className='isVideo' controls>
              <source src={link} type={`video/${extension}`} />
            </video>
          );
        } else {
          result.push(
            <a key={link+uuidv4()} href={link} target='_blank' rel='noreferrer'>
              {link}
            </a>
          );
          result.push(<LinkPreview key={`preview-${(link)+uuidv4()}`} url={link} />);
        }
      }

      lastIndex = regex.lastIndex;
    }

    const remainingContent = note.content.substring(lastIndex);
    if (remainingContent) {
      result.push(<span key={lastIndex+uuidv4()}>{remainingContent}</span>);
    }

    return result;
  };
  const addTags = () => {
    const tags = note.tags;
    let hasNotes = false;
  
    if (tags && tags.length > 0) {
    tags.forEach(tag => {
        switch(tag[0]) {
          case 'e':
            hasNotes = true;
            break;
          default:
            break;
        }
      });
      
      const tagTexts = [];
      if (hasNotes) {
        tagTexts.push(<code>💬 thread</code>);
      }
      const tagText = (
        <div className='noteTagContainer'>
          {tagTexts}
        </div>
      );
      return (
         tagText
      );
    }
  }
  function unixToReadable(unixTimestamp) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(unixTimestamp * 1000).toLocaleString('en-US', options);
  }
  function buildEventPointer(id, relays = [], author = '') {
    return {
      id: id,
      relays: relays,
      author: author
    };
  }
  
  const LinkPreview = ({ url }) => {
  const [preview, setPreview] = useState(null);
  
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await fetch(`https://api.snort.social/api/v1/preview?url=${url}`);
        const data = await response.json();
  
        if (data.description || data.title) {
          setPreview(
            <div key={url+uuidv4()} className='urlPreview'>
              <span>
                <a href={url} target='_blank' rel='noreferrer'>
                  <b>{data.title}</b>
                </a>
                <br />
                {data.description}
              </span>
            </div>
          );
        } else {
          setPreview(null);
        }
      } catch (error) {
        setPreview(null);
      }
    };
  
    fetchPreview();
  }, [url]);
  
  return preview;
  };
  
  return <div className='noteContentContainer'>
    {addTags()}
      {processContent()}
      <span className='noteDateSpan'>
      <code>{unixToReadable(note.created_at)}</code>
      </span>
      <hr />
      <div className='noteButtonBox'>
        <a href={process.env.REACT_APP_NOSTR_OUTER_NOTES + encodedEvent} target="_blank" rel="noreferrer"><GoOut className="svg-src"/></a>
      </div>
    </div>;
};

export default NoteParser;
