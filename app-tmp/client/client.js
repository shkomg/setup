Meteor.startup (function () {

//set up localisation options for the app
    i18n.init({lng: Cookie.get("i18next") || "en",
               debug: false,
               preload: ['en'],
               fallbackLng: 'en',
               useLocalStorage: true,
               load: 'current' }, function(t){
		   console.log("got lng:" + Cookie.get("i18next") || "en");
               });

});


//Current year for the footer copyright
Template.footer.currentYear = function(){
    return new Date().getFullYear();
};

//helper to load theme js - lists them in the footer
Template.footer.rendered = function() {
   $('#jsToLoad').html('<script src="/js/main.jquery.themepunch.revolution.min.js"></script><script src="/js/main.waypoints.min.js"></script><script src="/js/main.jquery.countdown.min.js"></script><script src="/js/main.filter.js"></script><script src="/js/main.isotope.js"></script><script src="/js/main.jquery.prettyPhoto.js"></script><script src="/js/main.jquery.carouFredSel-6.2.1-packed.js"></script><script src="/js/main.respond.min.js"></script><script src="/js/main.html5shiv.js"></script><script src="/js/main.z.js"></script>');
};

//Below is the helper to make active the needed menu items
Template.header.helpers({
    activeRouteClass: function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();
        var active = _.any(args, function(name) {
	    if ((location.pathname==='/') && (name==='home')) {
		return true;
	    }
	    else if ((location.pathname==='/dashboard') && (name==='dashboard')) {
		return true;
	    }
	    else if ((name!='home') && (name!='dashboard')) {
		return ~location.pathname.indexOf(Router.path(name));
	    };
        });
        return active && 'active';
    }
});
