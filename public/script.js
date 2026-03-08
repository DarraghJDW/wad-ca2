function randomDestination() {

  var destinations = ["Paris", "Rome", "Tokyo", "Bangkok", "New York", "Vancouver"];

  var randomNumber = Math.floor(Math.random() * destinations.length);

  alert("You should visit: " + destinations[randomNumber]);

}