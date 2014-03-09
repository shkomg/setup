Router.configure ({
    layoutTemplate : 'layout',
    loadingTemplate : 'loading',
    notFoundTemplate : 'notFound'
});

Router.map (function ()
{	    
    this.route('home',{
	template : 'home',
	path : '/'
    });

    this.route('contact',{
	before: function (){
	    Session.set('messageSent', null);
	    Session.set('sentError', null);
	}, 
	path : '/contact'
    });    

    this.route('how-it-works',{
	path : '/how-it-works'
    });    

    this.route('dashboard',{
	path : '/dashboard'
    });    

    this.route('borrow',{
	template : 'borrow',
	path : '/dashboard/borrow'
    });

    this.route('lend',{
	template : 'lend',
	path : '/dashboard/lend'
    });

    this.route('admin',{
	template : 'adminPanel',
	path : '/dashboard/admin'
    });


    this.route('notFound', { path: '*' });
});

var NonEmptyString = Match.Where(function (x) {
    check(x, String);                                                                                                             
    return x.length !== 0;                                                                                     
});

Meteor.methods({

    sendEmail: function (to, from, subject, text) {

	check([to, from, subject, text], [NonEmptyString]);
	
	this.unblock();

	if (Meteor.isServer)
	    return Email.send({
		to: to,
		from: from,
		subject: subject,
		text: text
	    });
    }

});
