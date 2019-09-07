
var giphyArray = ["dog", "cat"];

function displayGifs() {

    var gif = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xhOeDtimrOu6oqIq9pKAlNILZZqFHYAL&q=" + gif + 
    "&limit=10&offset=0&rating=G&lang=en"

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

    for (var i = 0; i < giphyArray.length; i++) {

      var a = $("<button>");

      a.addClass("gif");

      a.attr("data-name", giphyArray[i]);

      a.text(giphyArray[i]);

      $("#buttons-view").append(a);
    }
  }

  $("#add-movie").on("click", function(event) {
    event.preventDefault();

    var gif = $("#movie-input").val().trim();

    giphyArray.push(gif);

    renderButtons();
  });

  $(document).on("click", ".gif", displayGifs);

  renderButtons();