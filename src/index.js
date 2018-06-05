// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Hour from './Day.js';
import Event from './Event.js';
import { type EventType } from './Event.js';
import style from './calendar.css';

const events: Array<EventType> = [
  { start: 540, end: 600 },
  { start: 610, end: 670 },
  { start: 30, end: 150 },
  { start: 560, end: 620 },
  { start: 300, end: 360 },
  { start: 320, end: 380 }
];

function sortEvents(events: Array<EventType>): void {
  events.sort((event1: EventType, event2: EventType) => {
    return event1.start - event2.start;
  });
}

sortEvents(events);

type Props = {
  events: Array<EventType>
};

class Calendar extends Component<Props> {
  addItersactionToPrevEventObjects(events, currEventIndex, inter) {
    for (let i = 0; i <= inter; i++) {
      events[currEventIndex].intersactions = inter;
      events[currEventIndex].rightOffset = i + 1;
      currEventIndex--;
    }
  }
  checkForIntersections() {
    let { events } = this.props;
    let intersections = 0;
    for (let i = 0; i < events.length; i++) {
      if (!events[i + 1] && intersections) {
        this.addItersactionToPrevEventObjects(events, i, intersections);
      } else if (events[i + 1] && events[i].end > events[i + 1].start) {
        intersections++;
      } else if (intersections) {
        this.addItersactionToPrevEventObjects(events, i, intersections);
        intersections = 0;
      }
    }
  }
  render() {
    debugger;
    let { events } = this.props;
    const strartsWith = 9;
    const endsWith = 21;
    const hours = [];
    for (let hour = strartsWith; hour < endsWith; hour++) {
      hours.push(<Hour start={hour} key={hour} />);
    }

    this.checkForIntersections();
    let eventsAsElements = [];
    for (let i = 0; i < events.length; i++) {
      eventsAsElements.push(<Event event={events[i]} key={i} />);
    }
    return (
      <div className="calendar">
        {hours}
        <div className="events-container">
          <div className="events">{eventsAsElements}</div>
        </div>
      </div>
    );
  }
}

function layOutDay(events) {
  sortEvents(events);
  const mountNode = document.getElementById('app');
  if (mountNode) {
    ReactDOM.render(<Calendar events={events} />, mountNode);
  }
}

window.layOutDay = layOutDay;
layOutDay(events);
