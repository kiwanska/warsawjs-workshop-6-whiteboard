import React from 'react';
import { fabric } from 'fabric';

export default class Buttons extends React.Component {

  constructor(props) {
    super(props);
  }

  onRemove () {
    const event = document.createEvent('Event');
    event.initEvent('remove', true, true);
    document.dispatchEvent(event);
  }

  render() {
    return (
      <div className='buttons-wrapper'>
        <button onClick={this.props.allowDrawing}>draw</button>
        <button onClick={this.props.allowSelecting}>select</button>
        <button onClick={this.onRemove}>remove</button>
        <button onClick={this.props.clearBoard}>clean</button>
      </div>
    );
  }
}
