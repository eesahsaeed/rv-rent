
import React, {useState} from "react";
import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import customPlugin from "./custom/custom-view-file";

import './App.css';
import stripe from "./stripe.png";

function App(){
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([
    {title: 'event 1', date: '2023-02-01'},
    {title: 'event 2', date: '2023-02-02'}
  ])

  function handleClick(ev){
    console.log(ev)
    setEvents([...events, {title: ev.dateStr, date: ev.dateStr}])
  }

  function renderEventContent(eventInfo) {
    return (
      <div className="data">
        <i>{eventInfo.event.title}</i>
      </div>
    )
  }

  function cell(arg){

    let date = arg.date;
    let day = String(date.getDate()).length > 1 ? date.getDate() : `0${date.getDate()}`;
    let month = String(date.getMonth()).length > 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;

    let d = `${date.getFullYear()}-${month}-${day}`;

    const found = events.find(event => event.date === d);

    if (found){
      return (
        <div className="data" style={{padding: 20, backgroundColor: "white"}}>
          <i>{arg.dayNumberText}</i>
        </div>
      )      
    }

    return (
      <div className="data" style={{padding: 20, backgroundColor: "white"}}>
        <img src={stripe} className="empty-grid"/>
        <i>{arg.dayNumberText}</i>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="App">
        <FullCalendar
          plugins={[multiMonthPlugin, interactionPlugin]}
          initialView={'multiMonthYear'}
          multiMonthMaxColumns={1}
          hiddenDays={false}
          dayCellContent={cell}
          events={events}
          dateClick={handleClick}
        />
      </div>
      <div className="event-sidebar">

      </div>
    </div>
  );
}

export default App;
