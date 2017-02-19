var restify = require('restify');
var builder = require('botbuilder');
//=================================================================
//Bot Setp
//=================================================================
//setup restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log("%s lisening to %s", server.name, server.url);
});
//create chat bot
var connector = new builder.ChatConnector({
    appId: '351e1a98-1bd6-4865-8d64-61ab3902e4b9',
    appPassword: 'yPBwj4iMyj8fbRYRyqCjmAU'
});
var bot = new builder.UniversalBot(connector);
server.post('api/messages', connector.listen());
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/2520ea80-4d88-4a6e-98e3-1905ebeb7731?subscription-key=aeca06be462d48eea65217dc45bf6595&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', intents);
//=============================================================Working on intents==========================================================//



//===================================================def_greet===================================================================================//
intents.matches('def_greet', [
    function (session) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        }
        else session.send("hii %s how can i help you", session.userData.name);
    },
    function (session, results) {
        session.send("hii %s how can i help you", session.userData.name);
    }
]);
bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi May I know your name ?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);
intents.matches(/^change user/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send("name changed to %s", session.userData.name);
    }
]);


//===================================================End_def_greet===================================================================================//



//=========================='say_who'=============================================================//
intents.matches('say_who', [
    function (session, args, next) {
        if (builder.EntityRecognizer.findEntity(args.entities, 'person::coordinator')) {
            if (builder.EntityRecognizer.findEntity(args.entities, 'department::cse')) session.send("k sumanth");
            else if (builder.EntityRecognizer.findEntity(args.entities, 'department::eee')) session.send("coor eee");
            else if (builder.EntityRecognizer.findEntity(args.entities, 'department::ece')) session.send("	coor ece");
            else if (builder.EntityRecognizer.findEntity(args.entities, 'department::civil')) session.send("coor civil");
            else if (builder.EntityRecognizer.findEntity(args.entities, 'department::mech')) session.send("coor mech");
            else if (builder.EntityRecognizer.findEntity(args.entities, 'department::it')) session.send("COOR it");
            else session.send("please specify ask with a department");
        }
        else if (builder.EntityRecognizer.findEntity(args.entities, 'person::hod')) {
            if (builder.EntityRecognizer.findEntity(args.entities, 'department::cse')) session.send("Dr.SUMIT GUPTA, Ph.D");
            else if (builder.EntityRecognizer.findEntity(args.entities, 'department::eee')) session.send("Dr.R.V.D.RAMA RAO");
            else if (builder.EntityRecognizer.findEntity(args.entities, 'department::ece')) session.send("Prof. K. SRINIVAS");
            else if (builder.EntityRecognizer.findEntity(args.entities, 'department::civil')) session.send("Dr.G.REDDY BABU");
            else if (builder.EntityRecognizer.findEntity(args.entities, 'department::mech')) session.send("Dr. MANGAM VENU");
            else if (builder.EntityRecognizer.findEntity(args.entities, 'department::it')) session.send("Dr.D.J.NAGENDRA KUMAR");
            else session.send("please specify ask with a department");
        }
        else if (builder.EntityRecognizer.findEntity(args.entities, 'person::principal')) {
            session.beginDialog('/principalpicture');
        }
        else if (builder.EntityRecognizer.findEntity(args.entities, 'person::viceprincipal')) session.send("Prof. K. SRINIVAS");
        else if (builder.EntityRecognizer.findEntity(args.entities, 'person::dean')) session.beginDialog('/deanabhinav')
        else session.send("please give a proper command");
    }]);
//=========================================say_where====================//
intents.matches('say_where', [
    function (session, args, next) {
        if (builder.EntityRecognizer.findEntity(args.entities, 'events::coc')) session.send("the event is a clash of clans game of cse dept held at room no #");
        else if (builder.EntityRecognizer.findEntity(args.entities, 'events::ct')) session.send("the event is a 1-1 codeing fight of cse dept held at room no #");
        else if (builder.EntityRecognizer.findEntity(args.entities, 'events::bot')) session.send("the event is a bot building event cse dept held at room no #");
        else if (builder.EntityRecognizer.findEntity(args.entities, 'events::valiant'))
            session.send("Valiant : Vishnu's Active Learning in Advanced New Trends is a National Level Student Technical Symposium held every year to help the students imporove their Technical Skills,The Venue for the Fest is at Vishnu Institute of Technology,Vishnupur,Bhimavaram.");
        else if (builder.EntityRecognizer.findEntity(args.entities, 'services::food')) session.send("food is availible at Mini Audi(LAKE VIEW)");
        else if (builder.EntityRecognizer.findEntity(args.entities, 'services::accomodation')) session.send('for girls it is at hostel beside temple squre, for boys it is at  VIT boys HOSTEL');
        else if (builder.EntityRecognizer.findEntity(args.entities, 'services::registration')) session.send('registrations At the front office');
        else if (builder.EntityRecognizer.findEntity(args.entities, 'department::cse')) session.send("top floor block A");
        else if (builder.EntityRecognizer.findEntity(args.entities, 'department::eee')) session.send("Ground floor block A");
        else if (builder.EntityRecognizer.findEntity(args.entities, 'department::ece')) session.send("	first floor block A");
        else if (builder.EntityRecognizer.findEntity(args.entities, 'department::civil')) session.send("Ground floor block B");
        else if (builder.EntityRecognizer.findEntity(args.entities, 'department::mech')) session.send("second floor block B");
        else if (builder.EntityRecognizer.findEntity(args.entities, 'department::it')) session.send("Ground floor block B");
        else session.send("plese give a proper command");
    }]);

//==============================================================end__of__say_where__====================================//



//=================================================pictures_profiles=================================================//
bot.dialog('/principalpicture', [
    function (session) {
        session.send("Dasika surya narayana");
        var msg = new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "http://www.vishnu.edu.in/upload/principal.jpg"
            }]);
        session.endDialog(msg);
    }
]);
bot.dialog('/deanabhinav', [
    function (session) {
        session.send("Abhinav Dayal Educator, Software Developer & Trainer ,Ph.D Northwestern University");
        var msg = new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/000/018/25c/3f5b4eb.jpg"
            }]);
        session.endDialog(msg);
    }
]);
//==========================================================================================================================//
intents.matches(/^what is your age/i, [function (session) {
    session.send("im just born");
}]);
intents.matches(/^who created you/i, [
    function (session) {
        session.send("Master Kishan developed");
    }
]);
intents.matches(/^i love you/i, [
    function (session) {
        session.send("i love you to %s", session.userData.name);
    }
]);
intents.matches(/^where is valiant/i, [
    function (session) {
        session.send("This event is at VIT, vishnupur");
    }
]);
intents.onDefault([
    function (session) {
        session.send("Request Out of Bound Please ask Sai kishan to train me well");
    }
]);
