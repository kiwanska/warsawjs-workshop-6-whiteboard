import React from 'react';
import Board from './components/Board';
import Buttons from './components/Buttons';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drawingAllowed: true,
    }
    this.allowDrawing = this.allowDrawing.bind(this);
    this.allowSelecting = this.allowSelecting.bind(this);
  }

  clearBoard() {
    Meteor.call('clearBoard');
  }

  allowDrawing() {
    this.setState({
      drawingAllowed: true,
    })
  }

  allowSelecting() {
    this.setState({
      drawingAllowed: false,
    })
  }

  render() {
    return (
      <div>
        <h1>whiteboard challenge</h1>
        <Board drawingAllowed={this.state.drawingAllowed} />
        <Buttons allowDrawing={this.allowDrawing} allowSelecting={this.allowSelecting} clearBoard={this.clearBoard} />
      </div>
    );
  }
}
