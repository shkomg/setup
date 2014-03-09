Template.contact.events({
    'click .send': function(event,template){
	event.preventDefault();
	name = template.find("#name").value;
	if (name.length===0) {
            Session.set("messageSent", null);
	    Session.set("sentError","Please, tell us your name");
	} else {
	    from = template.find("#email").value;
	    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from))) {
		Session.set("messageSent", null);
		Session.set("sentError","Please, use correct e-mail");
	    } else {
		subject = "Contact form from FundIM.com";
		    message = template.find("#comment").value;
		    if (message.length===0) {
			Session.set("messageSent", null);
			Session.set("sentError","There must be a text in the message");
		    } else {
			Meteor.call('sendEmail', "serhiy.khvashchuk@gmail.com", name+'<'+from+'>', subject, message, function (error, result){
			    if (! error) {
				Session.set("messageSent", true);
				Session.set("sentError", null);

				//clean the form
				template.find("#comment").value="";
				template.find("#email").value="";
				template.find("#name").value="";
			    } else {
				Session.set("messageSent", null);
				Session.set("sentError",error.message);
			    };
 			});
		};
	    };
	};
    }
});

Template.contact.formError = function (){
    return Session.get("sentError");
};

Template.contact.formResult = function (){
    return Session.get("messageSent");
};
