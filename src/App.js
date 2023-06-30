import React, { useState } from 'react';
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
  const [themePicked, setTheme] = useState(process.env.REACT_APP_THEME_SELECTOR === 'true' ? process.env.REACT_APP_THEME : process.env.REACT_APP_THEME);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const themeButtons = Object.keys(themes).map((key) => {
    const theme = themes[key];
    return (
      <button key={key} className='themeButton' style={{ backgroundColor: theme.elementsBColor }} title={key} onClick={() => handleThemeChange(key)}></button>
    );
  });

  return (
    <div className='mainDiv'>
      {process.env.REACT_APP_THEME_SELECTOR === 'true' && (
        <div className='selectThemeButtonBox'>
          {themeButtons}
        </div>
      )}
      <GlobalStyles theme={themePicked} />
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
        <div className='nostrContainer'>
          <Nostr/>
        </div>
      )}
      {process.env.REACT_APP_NOSTR_SHOW_FOOTER === 'true' && (
        <div className='creditsContainer'>
          <span><a href='https://github.com/gzuuus/linktr' target='_blank' rel='noreferrer'>With 💜 by gzuuus </a></span>
        </div>
      )}
    </div>
  );
}

export default App;
