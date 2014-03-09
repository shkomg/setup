Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.publish("Projects", function () {
  return Projects.find();
});

Meteor.publish(null, function () {
  return Meteor.users.find({},{fields:{services:1}});
});

Meteor.publish("Followers", function (projectId) {
    if (projectId) {
	//find the project for that id
	project=Projects.findOne({_id:projectId});
	//continue if current user is the owner of the project 
	if (project.owner === this.userId){
	    subscribersIds=[];
	    for (var i=0; i< project.subscribers.length; i++){
//	thisUser=Meteor.users.find({_id:subscribers[i].id}).fetch();
//	subscribers[i].email=thisUser.emails[0].address;
		project.subscribers[i].followingCount=Projects.find({subscribers:{$elemMatch:{id:project.subscribers[i].id}}}).count();
		subscribersIds.push(project.subscribers[i].id);
	    };

	    console.log(Meteor.users.find({_id:{$in:subscribersIds}},{fields:{_id:1, emails:1, services:1}}).fetch());
//	    console.log(subscribersIds);
	    return Meteor.users.find({_id:{$in:subscribersIds}},{fields:{_id:1,emails:1,'services.facebook.email':1}});
	} else {
	    console.log("you are not the project owner");
	    return false;
	};
    };
});

Meteor.methods({
    // Declaring a method
    getHtmlPage: function (url) {
        this.unblock();
        return Meteor.http.get(url);
    },
    bitlyUrl: function (url) {
        this.unblock();
        return Meteor.http.get("https://api-ssl.bitly.com/v3/shorten?access_token=cb190a9f1178e398d8176abefc40d7bbe92750ce&longUrl="+encodeURIComponent(url));
    }
});
 
Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});
