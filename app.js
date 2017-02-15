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
bot.dialog('/',function(session){
    session.send("Hello World");
});