import React from 'react';
import { findDOMNode } from 'react-dom';
import { fabric } from 'fabric';
import FabricObjects from '../../lib/fabric-objects';

Meteor.subscribe('fabricObjects');

export default class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvas = new fabric.Canvas(findDOMNode(this), {
      isDrawingMode: this.props.drawingAllowed,
      selection: false,
    });

    this._canvas = canvas;

    canvas.on('object:added', async ({ target: fabricObject }) => {
      if (fabricObject.id) {
        return;
      }
      try {
        const id = Random.id();
        fabricObject.id = id;

        const doc = Object.assign({
          _id: id,
        }, fabricObject.toObject());

        // const id = await FabricObjects.genInsert(fabricObject.toObject());
        // fabricObject.id = id;
        console.log(id);
      } catch (e) {
        alert(String(e));
      }
    });

    canvas.on('object:modified', async ({ target: fabricObject }) => {
      try {
        await FabricObjects.genUpdate(fabricObject.id, fabricObject.toObject());
        console.log(fabricObject.id);
      } catch (e) {
        alert(String(e));
      }
    });

    canvas.on('object:selected', async ({ target: fabricObject }) => {
      const id = fabricObject.id;
      document.addEventListener('remove', async () => {
        try {
          await FabricObjects.genRemove({ _id: id });
        } catch (e) {
          alert(String(e));
        }
      });
    });


    FabricObjects.find().observeChanges({
      added: (id, doc) => {
        const objectOnCanvas = canvas.getObjectById(id);
        if (objectOnCanvas) {
          return;
        }
        fabric.util.enlivenObjects([doc], ([fabricObject]) => {
          fabricObject.id = id;
          canvas.add(fabricObject);
        })
      },
      changed: (id, fields) => {
        const fabricObject = canvas.getObjectById(id);
        if (!fabricObject) {
          return;
        }
        fabricObject.set(fields).setCoords();
        canvas.deactivateAll().renderAll();
      },
      removed: (id) => {
        console.log(id);
        const fabricObject = canvas.getObjectById(id);
        if (!fabricObject) {
          return;
        }
        canvas.remove(fabricObject);
      },
    })
  }

  componentWillUpdate(nextProps) {
    this._canvas.isDrawingMode = nextProps.drawingAllowed;
  }

  render() {
    return (
      <canvas width='500' height='500'></canvas>
    );
  }

}

fabric.Canvas.prototype.getObjectById = function(id) {
  return this.getObjects().find(obj => obj.id === id);
}
