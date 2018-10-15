const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.MarksNotify = functions.database.ref('/marks/{code}/{type}')
.onWrite(event => {
	const type=event.params.type;
	const code=event.params.code;
	var title="Marks aaya"
	var body=type+" marks uploaded for "+code.substring(4)
	console.log(body+" | "+code.substring(0,4))

	const payload = {
		notification: {
			title: title,
			body: body
		}
	};

	admin.messaging().sendToTopic("m_"+code, payload)
	.then(function (response) {
		console.log("Successfully sent message:", "m_"+code+" | "+response);
	})
	.catch(function (error) {
		console.log("Error sending message:", error);
	});
});

exports.AttendanceNotify = functions.database.ref('/attendance/{code}/{month}')
.onWrite(event => {
	const month=event.params.month;
	const code=event.params.code;
    var title="Attendance aaya";
    var body=month+" attendance for "+code.substring(4)+" uploaded"
    console.log(body+" | "+code.substring(0,4))


    const payload = {
         notification: {
         	title: title,
         	body: body
         }
    };

    admin.messaging().sendToTopic("a_"+code, payload)
    .then(function (response) {
    	console.log("Successfully sent message:", "a_"+code+" | "+response);
    })
    .catch(function (error) {
    	console.log("Error sending message:", error);
    });
 });
