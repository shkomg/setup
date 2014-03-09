Projects = new Meteor.Collection('Projects');
Followers = new Meteor.Collection('Followers');

displayName = function (user) {
  if (user.profile && user.profile.name)
    return user.profile.name;
  return user.emails[0].address;
};

contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};

verifiedEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].verified;
  if (user.services) {
      //FaceBook
      if (user.services.facebook && user.services.facebook.email) {
          return true;
      };
      //Google+
      //Twitter
  };
  return false;
};

