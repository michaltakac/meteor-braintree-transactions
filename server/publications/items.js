Meteor.publish("items", function() {
  if ( Roles.userIsInRole(this.userId, 'paid') ) {
    return Items.find();
  }
});
