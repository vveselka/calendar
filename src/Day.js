// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Day.css';
const HOURS = 12;

type Props = {
  start: number
};

export default class Hour extends Component<Props> {
  render() {
    let { start } = this.props;
    if (start > HOURS) start = start % HOURS;
    const mid = `${start}:30`;
    //const m = `${start}:30`;
    const periodStart = (
      <span className="period">{start < HOURS ? 'am' : 'pm'}</span>
    );
    start = `${start}:00`;

    return (
      <div className="day">
        <div className="time">
          <div className="start">
            {start}
            {periodStart}
          </div>
          <div className="mid">{mid}</div>
        </div>
      </div>
    );
  }
}
