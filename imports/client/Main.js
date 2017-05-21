import React from 'react';
import Board from './components/Board';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>whiteboard challenge</h1>
        <Board />
      </div>
    );
  }
}
