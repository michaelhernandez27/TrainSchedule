var firebaseConfig = {
    apiKey: "AIzaSyAyaI4UKwstcFnEPflJE_osqtSrBrKI8B0",
    authDomain: "trainscheduler-88b93.firebaseapp.com",
    databaseURL: "https://trainscheduler-88b93.firebaseio.com",
    projectId: "trainscheduler-88b93",
    storageBucket: "trainscheduler-88b93.appspot.com",
    messagingSenderId: "893031240943",
    appId: "1:893031240943:web:4ba598839ac2a6484d371a"
  };
  
  firebase.initializeApp(firebaseConfig);


var database = firebase.database();

var name = "";
var dest = "";
var time = "";
var rate = 0;


$("#submit").on("click", function(event) {
  event.preventDefault();

  
  name = $("#input-name").val().trim();
  dest = $("#input-dest").val().trim();
  time = $("#input-time").val().trim();
  rate = $("#input-rate").val().trim();

  var newTrain = {
    name: name,
    dest: dest,
    time: time,
    rate: rate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  database.ref().push(newTrain);

  $("#input-name").val("");
  $("#input-dest").val("");
  $("#input-time").val("");
  $("#input-rate").val("");

});



database.ref().on("child_added", function(childSnapShot, prevChildKey) {

console.log(childSnapShot.val());

var trainName = childSnapShot.val().name;
var trainDest = childSnapShot.val().dest;
var trainTime = childSnapShot.val().time;
var trainRate = childSnapShot.val().rate;
trainRate = parseInt(trainRate);


console.log("Name: ", trainName);
console.log("Destination: ", trainDest);
console.log("Departure: ", trainTime);
console.log("Frequency: ", trainRate);


var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
console.log("Time Converted: " + firstTimeConverted);


var diffTime = moment.duration(moment().diff(moment(trainTime, "HH:mm")), "milliseconds").asMinutes();
console.log("Difference in Time" + diffTime);


var timeRemaining = trainRate - (Math.floor(diffTime) % trainRate);
console.log(timeRemaining);


var nextTrain = diffTime > 0 ? moment().add(timeRemaining, 'minutes' ) : moment(trainTime, "HH:mm") ;
console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  
var minTilTrain = Math.ceil(moment.duration(moment(nextTrain).diff(moment()), 'milliseconds').asMinutes());
console.log("MINUTES TILL TRAIN: " + minTilTrain);


nextTrain = moment(nextTrain).format("HH:mm");

$("#traintimes > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainRate + "</td><td>" + nextTrain + "</td><td>" + minTilTrain + "</td></tr>");

  

});



