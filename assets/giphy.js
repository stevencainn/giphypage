//initial array of movies
var topics = ["rick and morty", "dogs", "pulp fiction"];

//displayGiphyInfo function re-renders the HTML to display the appropriate content
function displayGiphyInfo() {
    //when function fires empty div then do the rest !
    $("#giphy-view").empty();

    var giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=8zW7DcupT9S8A1Enefz4SUW8e4jjZxRW&limit=10";


    //creates AJAX call for the specific giphy button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data.length)
        for (var i = 0; i < response.data.length; i++) {
            // console.log("response;", response.data[i])
            //variable that holds each item in the array as it iterates through
            var arrayItem = response.data[i];

            console.log('arrayItem', arrayItem);
            console.log(arrayItem);
            //variable that hold the url for each gif
            //still image holds just image file for gif
            var stillImage = arrayItem.images.original_still.url;
            //animate image holds url for the moving gif
            var animatedImage = arrayItem.images.original.url;
            console.log(animatedImage);
            //variable to diplay the gif back onto page
            var gif = $("<img src=" + stillImage + ">")
            // giving variable gif an attribute of animated image and giving it the value of aminated image variable
            gif.attr('animated-image', animatedImage);
            $("#giphy-view").append(gif);

            var gifRating = arrayItem.rating;
            $(".view-rating").append(gifRating);
            console.log(gifRating);

            gif.on('click', function () {
                console.log('i clicked this gif');
                // this pulls the attr of src
                var stopGif = $(this).attr("src");
                //this pulls the attr animated image
                var animate = $(this).attr("animated-image")

                //this updates the animated image attr 
                $(this).attr("animated-image", stopGif);
                // this updated the src attr
                $(this).attr("src", animate);


            })

        }
    });
}
// displayGiphyInfo();


function renderButtons() {
    $("#buttons-view").empty();

    //loops through the array of movies
    for (var s = 0; s < topics.length; s++) {

        //dynamically generating buttos for each topic in array 
        var a = $("<button>");
        //adds class of gif to our button
        a.addClass("gif");
        //adds a data attribute name
        a.attr("data-name", topics[s]);
        //provides initial button text
        a.text(topics[s]);
        //adds the button to the button view div
        $("#buttons-view").append(a);


    }
}

//function handles events where the add giphy button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();


    //this line of code will grab the input from the textbox
    var gifSearch = $("#giphy-input").val().trim();

    //gif from text bos is then added to array
    topics.push(gifSearch);

    //calling renderButtons which handles the processing in our movie array
    renderButtons();
})
//adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", displayGiphyInfo);


//calling the renderButtons functions to display inital buttons
renderButtons();




