Handlebars.registerHelper('t', function(i18n_key) {
    var result = i18n.t(i18n_key);
//    console.log("---"+result);
    return new Handlebars.SafeString(result);
});

Handlebars.registerHelper('tt', function(i18n_key) {
    var result = '"'+i18n.t(i18n_key)+'"';
//    console.log("---"+result);
    return new Handlebars.SafeString(result);
});

Template.changeLang.events({
    'change' : function (event) {
        if (Cookie.get("i18next") != event.currentTarget.value) {
            Cookie.set("i18next",event.currentTarget.value);
            history.go(0);
        }
    }
});

Template.changeLang.languages = function() {
    return [{ "code":"ru", "name":"Русский", "selected": (Cookie.get('i18next')=="ru" ? "selected" : "")},
            { "code":"en", "name":"English", "selected": (Cookie.get('i18next')=="en" ? "selected" : "")}];
};


