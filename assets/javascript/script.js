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

  let trainName =  "";
  let destination = "";
  let frequency = "";
  let arrival = "";
  let minutesAway = "";
 
  //event handler for the submit button, upon clicking this handler assigns the form values to variables
$("#submitButton").on("click", function(e){
    console.log("Submit Button has been clicked!");
    
    trainName = $("#addTrainName").val().trim(); 
    destination = $("#addDestination").val().trim();
    frequency = $("#addFrequency").val().trim();
    arrival = moment($("#addNextArrival").val().trim(),"hh:mm").format("X");
    minutesAway = $("#addMinutesAway").val().trim();
 
//This creates an object on the database, by creating a key, and then assigning a value Key:Value
    firebase.database().ref().push({
        name:trainName,
        heading:destination,
        howOften:frequency,
        when:arrival,
        howClose:minutesAway,
        dateAdded:firebase.database.ServerValue.TIMESTAMP,
    })
});
//this grabs the info from the database, creates another row and <td>, and adds the new row AFTER the .traininfo row
firebase.database().ref().on("child_added", function(snapshot){
    let trainHowOften = snapshot.val().howOften;
  
    //change arrival to snapshot.val later
    let timeDifference = moment().diff(moment.unix(arrival),"minutes");
   
   //time left over from current time
    let trainFrequency = timeDifference % trainHowOften ;
    
    let trainMinutesNext =  trainHowOften - trainFrequency;
    console.log (trainMinutesNext);
    
    let finalArrivalTime = moment().add(trainMinutesNext,"m").format("hh:mm");
    
   
    $(".traininfo").after("<tr><td>" + snapshot.val().name +"</td><td>" + snapshot.val().heading +"</td><td>" + snapshot.val().howOften + "</td><td>" + finalArrivalTime + "</td><td>" + trainMinutesNext + "</td></tr>"); 

    

}); 
