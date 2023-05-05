import React from "react";
import NoteParser from "./NoteParser.js";
import NoteParserKind0 from "./NoteParserKind0.js";

function EventListComponent({ events }) {
  const uniqueEvents = {};

  // Filtramos los eventos duplicados
  events.forEach((event) => {
    if (event.kind === 0) {
      if (uniqueEvents[event.kind] === undefined) {
        uniqueEvents[event.kind] = event;
      } else if (event.created_at > uniqueEvents[event.kind].created_at) {
        uniqueEvents[event.kind] = event;
      }
    } else {
      uniqueEvents[event.id] = event;
    }
  });

  const uniqueEventsList = Object.values(uniqueEvents);
    const eventList = uniqueEventsList.map((event, index) => {
      return (
        <div className="noteContainer" key={index}>
          {event.kind === 0 ? (
            <>
              <NoteParserKind0 note={event} />
            </>
          ) : (
            <>
              <NoteParser note={event} />
            </>
          )}
        </div>
      );
    });
    
  return (
    <div>
      {eventList}
    </div>
  );
}

export default EventListComponent;
