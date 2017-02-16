var restify = require('restify');
var builder = require('botbuilder');
var server = restify.createServer();
//status tester
server.listen(process.env.port||process.env.PORT||3978,function(){
    console.log("%s listening to %s",server.name, server.url);
});
var connector = new builder.ChatConnector({
    appId: "351e1a98-1bd6-4865-8d64-61ab3902e4b9",
    appPassword: 'yPBwj4iMyj8fbRYRyqCjmAU'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
var disha = new builder.IntentDialog();
bot.dialog('/', disha);

disha.onDefault([
     function (session,args,next) {
        if (!session.userData.name) {
           session.send("hey, I am Disha!");
            session.beginDialog('/profile');

        } else {
            next();
        }
    },
    function (session) {
        session.send('how can i help you %s', session.userData.name);
    }
]);

disha.matches(/^i love you/i, function(session){
    session.send('aww... I Love You too...%s',session.userData.name);
});

disha.matches(/^change user/,[ function(session){
    session.beginDialog('/profile');
},
function(session){
    session.send('user name changed to....%s', session.userData.name);
}
]);

disha.matches(/^where is this event?/i, function (session) {
    session.send('VIT , Bhimavaram');
});

disha.matches(/^when is the event?/i,function(session){
    session.send("on 22nd and 23rd of this month");
});

disha.matches(/^who is the coordinator?/i,[
    function(session){
    builder.Prompts.text(session,"can you be more specific about the department");
},
function(session,results){
    switch(results.response){
        case "cse" :session.send("Mr.B.Sumanth");
                        break;
        
        case "ece" :session.send("Mr.x");
                        break;  
        
        case "eee" :session.send("Mr.y");
                        break;           
        
        case "mech" :session.send("Mr.p");
                        break;              
         default : session.send("foo bar");                                    
    }
}
]);

disha.matches(/^do you have a boyfriend?/i, function (session) {
    session.send('NO personal questions please...');
});

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'what is your name..?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.send('hiee %s', session.userData.name);
        session.endDialog();
    }
]);
