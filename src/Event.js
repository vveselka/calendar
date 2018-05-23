// @flow
import React, { Component } from 'react';
import { type Node } from 'react';
import style from './Event.css';

export type EventType = {
  start: number,
  end: number,
  intersactions?: number,
  rightOffset?: number
};

type Props = {
  event: EventType
};

export default function Event(props: Props): Node {
  const { start, end, intersactions, rightOffset } = props.event;
  const eventLength = end - start;
  const width = parseInt(683 / (intersactions ? intersactions + 1 : 1));
  const left = rightOffset ? width * rightOffset - width : 0;
  const eventStyle = {
    width: `${width}px`,
    height: `${eventLength}px`,
    top: `${start}px`,
    left: `${left}px`
  };

  return (
    <div className="event-wrapper" style={eventStyle}>
      <div className="event">Sample Item</div>
    </div>
  );
}
