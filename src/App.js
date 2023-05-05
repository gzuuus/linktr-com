import React from 'react';
import { Links } from './components/Links';
import { Donations } from './components/Donations';
import Nostr from './components/Nostr';
import Meetup from './components/Meetup';
import { createGlobalStyle } from 'styled-components';
import themes from './Themes';

const GlobalStyles = createGlobalStyle`
  :root {
    --background-color: ${props => themes[props.theme].backgroundColor};
    --container-b-color: ${props => themes[props.theme].containerBColor};
    --elements-b-color: ${props => themes[props.theme].elementsBColor};
    --hover-b-color: ${props => themes[props.theme].hoverBColor};
    --translucid-b-color: ${props => themes[props.theme].transLucid};
    --text-color: ${props => themes[props.theme].textColor};
    --hover-color: ${props => themes[props.theme].hoverColor};
    --accent-color: ${props => themes[props.theme].accentColor};
    --a-color: ${props => themes[props.theme].aColor};
  }
`;

function App() {
  const theme = process.env.REACT_APP_THEME || 'default';
  return (
    <div className='mainDiv'>
      <GlobalStyles theme={theme} />
      <div className='mainContainer'>
        <img className='header-img' src={`./img/${process.env.REACT_APP_PFP}`} alt="pfp" />
        <h1>{process.env.REACT_APP_HEADING}</h1>
        <Links></Links>
        <Donations></Donations>
        
      </div>

      {process.env.REACT_APP_SHOW_MEETUPS === 'true' && (
        <div className='meetupContainer'>
          <Meetup />
        </div>
      )}
      {process.env.REACT_APP_NOSTR_SHOW === 'true' && (
        <div className='meetupContainer'>
          <Nostr/>
        </div>
      )}
    </div>
  );
}

export default App;