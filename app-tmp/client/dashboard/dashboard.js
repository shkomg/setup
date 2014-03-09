Handlebars.registerHelper("checkRole", function (role) {
    if (Meteor.user()){
	if (Meteor.user().role) return role === Meteor.user().role;
	return false;
    };
});

Handlebars.registerHelper("gotohome", function () {
        return Router.go('/');
});
