Template.dashboard.onCreated(function() {
  var instance = this;
  instance.autorun(function() {
    instance.subscribe('items');
  });
});

Template.dashboard.onRendered(function() {
  Meteor.call('getClientToken', function(error, clientToken) {
    if (error) {
      console.log(error);
    } else {
      braintree.setup(clientToken, "dropin", {
        container: "payment-form", // Injecting into <div id="payment-form"></div>
        onPaymentMethodReceived: function (response) {
          // When we submit the payment form,
          // it'll create new customer first...
          var nonce = response.nonce;

          Meteor.call('btCreateCustomer', function(error, success) {
            if (error) {
              throw new Meteor.Error('customer-creation-failed');
            } else {
              // ... and when the customer is successfuly created,
              // call method for creating a transaction (finally!)
              Meteor.call('createTransaction', nonce, function(error, success) {
                if (error) {
                  throw new Meteor.Error('transaction-creation-failed');
                } else {
                  alert('Thank you for your payment! Reload page to access our premium items!');
                }
              });
            }
          });
        }
      });
    }
  });
});


Template.dashboard.helpers({
  items: function(){
    return Items.find();
  },
  showForm: function() {
    var userId = Meteor.userId();
    return Roles.userIsInRole(userId, 'paid') ? false : true; 
  }
});