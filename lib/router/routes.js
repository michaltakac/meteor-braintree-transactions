FlowRouter.route(['/','/home'], {
	name: 'home',
    subscriptions: function(params) {

    },
    action: function(params) {
        console.log("Yeah! We are on the home page");
        BlazeLayout.render("appLayout", {area: "home"});
    }
});

FlowRouter.route('/dashboard', {
	name: 'dashboard',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: function(params) {
        console.log("Yeah! We are on the dashboard");
        BlazeLayout.render("appLayout", {area: "dashboard"});
    }
});
