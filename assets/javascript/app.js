
$(document).ready(function () {

    //Initial array of buttons to be displayed
    var giphyArray = ["dog", "cat", "owl", "bear"];

    function displayGifs() {

        //Button reference
        var gif = $(this).attr("data-name");

        //Giphy API ajac reference
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xhOeDtimrOu6oqIq9pKAlNILZZqFHYAL&q=" + gif +
            "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET",

        }).then(function (response) {

            // Loop through response which is limited by limit = "10" in link
            for (var j = 0; j < response.data.length; j++) {

                var newDiv = $("<div>")

                //Rating display, maybe change to title
                var newRated = response.data[j].rating
                var ratedElement = $("<div>").text("Rated " + newRated)
                newDiv.append(ratedElement)

                //Gif display
                var newImg = response.data[j].images.fixed_height_still.url
                var imgElement = $("<img>").attr("src", newImg)
                //Data still reference
                imgElement.attr("data-still", response.data[j].images.fixed_height_still.url)
                //Data animate reference
                imgElement.attr("data-animate", response.data[j].images.fixed_height.url)
                //Initial state 
                imgElement.attr("data-state", "paused")
                //Class for buttons to trigger state change on click
                imgElement.addClass("gifState")
                newDiv.append(imgElement)

                $("#gifs-view").prepend(newDiv)

            }
        });

    }

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < giphyArray.length; i++) {

            var addButton = $("<button>");

            addButton.addClass("gif");

            addButton.attr("data-name", giphyArray[i]);

            addButton.text(giphyArray[i]);

            $("#buttons-view").append(addButton);
        }
    }

    function playPauseGif() {

        var currentGifState = $(this).attr("data-state")

        if (currentGifState == "paused") {
        //If gif is paused change src link to animated gif and change data state value to active
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "active")
        }
        else {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "paused")
        }
    }

    $("#add-gifs").on("click", function (event) {
        event.preventDefault();

        var gif = $("#gif-input").val().trim();

        giphyArray.push(gif);

        renderButtons();
    });

    $(document).on("click", ".gif", displayGifs);

    $(document).on("click", ".gifState", playPauseGif);

    renderButtons();

})