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
    
    firebase.database().ref().push({
        name:trainName,
        heading:destination,
        howOften:frequency,
        when:arrival,
        howClose:minutesAway,
        dateAdded:firebase.database.ServerValue.TIMESTAMP,
    })
});

firebase.database().ref().on("child_added", function(snapshot){
    $(".traininfo").after("<tr><td>" + snapshot.val().name +"</td><td>" + snapshot.val().heading +"</td><td>" + snapshot.val().howOften + "</td><td>" + snapshot.val().when + "</td><td>" + snapshot.val().howClose + "</td></tr>"); 
    // $(".nextRowTrainInfo").append("<td>" + snapshot.val().name +"</td>");
    // $(".nextRowTrainInfo").append("<td>" + snapshot.val().heading +"</td>");
    // $(".nextRowTrainInfo").append("<td>" + snapshot.val().howOften +"</td>");
    // $(".nextRowTrainInfo").append("<td>" + snapshot.val().howClose +"</td>");
    // $(".nextRowTrainInfo").append("<td>" + snapshot.val().when +"</td>");
});

// firebase.database().ref().orderByChild("dateAdded").limitToLast(3).on("child_added",function(snapshot){
//     $("#displayTname").html(snapshot.val().name);
//     $("#displayDest").html(snapshot.val().heading);
//     $("#displayFreq").html(snapshot.val().howOften);
//     $("#displayNextAr").html(snapshot.val().when);
//     $("#displayMinutes").html(snapshot.val().howClose);
    
// })
