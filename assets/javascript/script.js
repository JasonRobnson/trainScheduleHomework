'strict'

 //Initialize Firebase
 const config = {
    apiKey: "AIzaSyDMf2J88v0vsnt0ctwPWH5S5kgNgn2iczQ",
    authDomain: "trainscheduleproject-70841.firebaseapp.com",
    databaseURL: "https://trainscheduleproject-70841.firebaseio.com",
    projectId: "trainscheduleproject-70841",
    storageBucket: "",
    messagingSenderId: "971069667233"
  };

  firebase.initializeApp(config);

//   let database = firebase.database().ref();

  let trainName =  "";
  let destination = "";
  let frequency = "";
  let arrival = "";
  let minutesAway = "";

$("#submitButton").on("click", function(e){
    console.log("Submit Button has been clicked!");
    
    trainName = $("#addTrainName").val().trim(); 
    destination = $("#addDestination").val().trim();
    frequency = $("#addFrequency").val().trim();
    arrival = $("#addNextArrival").val().trim();
    minutesAway = $("#addMinutesAway").val().trim();
    
    firebase.database().ref().set({
        name:trainName,
        heading:destination,
        howOften:frequency,
        when:arrival,
        howClose:minutesAway,
    })
event.preventDefault();
});
