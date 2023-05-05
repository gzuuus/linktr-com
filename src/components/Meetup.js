import React, { useState, useEffect } from 'react';
import { Logo2140} from "../graphics/index.js";

function Meetup() {
  const [meetups, setMeetups] = useState([]);
  const [meetupElement, setMeetupElement] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://2140meetups.com/wp-json/wp/v2/meetup');
      const data = await response.json();
      const filteredData = data.filter(
        (item) => item.comunidad[0].id === Number(process.env.REACT_APP_COMUNITY_ID)
      );
      setMeetups(filteredData);
    }

    fetchData();
  }, []);

useEffect(() => {
  if (meetups.length > 0) {
    const meetupComponents = meetups.map((meetup) => {
      const { id, fecha, hora, link, title: { rendered: titleRendered }, featured_image_src_large: [meetupImage] } = meetup;
      const style = {
        backgroundImage: `url(${meetupImage})`,
        position: 'relative',
        overflow: 'hidden', 
      };
      const decodedTitle = decodeHtml(titleRendered);
      return (
        <div className='meetupElementDiv' style={style} key={id}>
          <div className='meetupElementContent'>
            <a href={link} target="_blank" rel="noreferrer" className='meetupElement' >
              <h4>{decodedTitle}</h4>
              <span>📅 {fecha} 🕖 {hora.slice(0, 5)}h </span>
            </a>
          </div>
        </div>
      );
    });
    setMeetupElement(meetupComponents);
  }
}, [meetups]);

  function decodeHtml(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText;
  }

  return (
    <>
    <Logo2140 className='logo2140'/>
      {meetupElement}
    </>
  );
}

export default Meetup;
