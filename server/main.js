import { Meteor } from 'meteor/meteor';
import FabricObjects from '../imports/lib/fabric-objects';

Meteor.publish({
  fabricObjects() {
    return FabricObjects.find({

    });
  },
})

Meteor.methods({
  clearBoard(boardId) {
    FabricObjects.remove({
      boardId,
    });
  },
})

Meteor.startup(() => {
  // code to run on server at startup
});
