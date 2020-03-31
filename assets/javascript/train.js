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



