
var giphyArray = ["dog", "cat"];

function displayGifs() {

    var gif = $(this).attr("data-name");
    //var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xhOeDtimrOu6oqIq9pKAlNILZZqFHYAL&q=" + gif + "&limit=10&offset=0&rating=G&lang=en"

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)

      var newDiv = $("<div>")

      var newRated = response.data[0].rating
      var ratedElement = $("<div>").text("Rated " + newRated)
      newDiv.append(ratedElement)

        var newImg = response.data[0].bitly_gif_url
        var imgElement = $("<img>").attr("src", newImg)
        newDiv.append(imgElement)

      $("#movies-view").prepend(newDiv)
    });

  }

function renderButtons() {

    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < giphyArray.length; i++) {

      var a = $("<button>");

      a.addClass("gif");

      a.attr("data-name", giphyArray[i]);

      a.text(giphyArray[i]);

      $("#buttons-view").append(a);
    }
  }
/*
  // This function handles events where the add movie button is clicked
  $("#add-movie").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var movie = $("#movie-input").val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });*/

  // Adding click event listeners to all elements with a class of "movie"
  //stop and start gifs
  $(document).on("click", ".gif", displayGifs);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();