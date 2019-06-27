// REQUIRED VARIABLES
// =========================================================================

require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
// var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);


// USER INPUT
// =========================================================================

var command = process.argv[2];
var search = process.argv[3];

var bandSearch = process.argv[3].split("20%");

// console.log(bandSearch);


// QUERY
// =========================================================================

var omdbAPI = "b27205d"
var omdbQuery = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=" + omdbAPI;

var bitQuery = "https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=trilogy&date=upcoming"


// IF STATEMENT 
// =========================================================================

if (command === "movie-this") {
    axios.get(omdbQuery).then(function (response) {
        // console.log(response)

        // Title of the movie.
        console.log("Movie Title: " + response.data.Title);
        // Year the movie came out.
        console.log("Release Year: " + response.data.Year);
        // IMDB Rating of the movie.
        console.log("IMDB Rating of the movie: " + response.data.imdbRating);
        // Rotten Tomatoes Rating of the movie.

        // Country where the movie was produced.
        console.log("Country: " + response.data.Country);
        // Language of the movie.
        console.log("Language: " + response.data.Language);
        // Plot of the movie.
        console.log("Plot: " + response.data.Plot);
        // Actors in the movie.
        console.log("Actors: " + response.data.Actors);


    }).catch(function (error) {
        console.log(error);
    })
}
else if (command === "spotify-this-song") {
    spotify
        .search({ type: 'track', query: search, limit: 1 })
        .then(function (response) {
            // band name
            console.log(response.tracks.items[0].album.artists[0].name);
            // song name
            console.log(response.tracks.items[0].name);
            // album name
            console.log(response.tracks.items[0].album.name);
            // preview url
            console.log(response.tracks.items[0].preview_url);
            
        })
        .catch(function (err) {
            console.log(err);
        });
}
else if (command === "concert-this") {
    axios.get(bitQuery).then(function(response) {
        
        // venue name
        console.log(response.data[0].venue.name);
        // city
        console.log(response.data[0].venue.city);
        // concert date
        console.log(response.data[0].datetime);

    }).catch(function (error) {
        console.log(error);
    })
}
else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data){

        console.log(data);
        if (error) {
            return console.log(error);
          }

        var txt = data.toString().split(',');

        console.log(txt);

        
        spotify
            .search({ type: 'track', query: txt, limit: 1 })
                .then(function (response) {
                    // band name
                    console.log(response.tracks.items[0].album.artists[0].name);
                    // song name
                    console.log(response.tracks.items[0].name);
                    // album name
                    console.log(response.tracks.items[0].album.name);
                    // preview url
                    console.log(response.tracks.items[0].preview_url);
                
        })
        .catch(function (errors) {
            console.log(errors);
        });

    })
}


// PSEUDO CODE
// =========================================================================

// var start liri function
//  inquirer prompt 1
// list - which app do you want to use
// spotify, bands in town, omdb
// if conditional decides which api we search
// inquirer prompt 2
// grabs user input for api query
// else if spotify else if bands in town


// CODE TO USE INQUIRER
// =========================================================================

// var startLiri = function(){
//     inquirer.prompt([
//         {
//             name: "search",
//             type: "list",
//             choices: ["Movies", "Music", "Bands"],
//             message: "What are you looking for?"
//         }
//     ]).then(function(answers){
//         console.log(answers)
//         if (answers === "Movies"){
//             inquirer.prompt([
//                 {
//                     name: "query",
//                     type: "input",
//                     message: "What Movie do you want to search?"
//                 }
//             ]).then(function(res){

//                 var omdbAPI = "b27205d"
//                 var axios = require("axios");
//                 var movieName = res;
//                 console.log(movieName);
//             })
//         }
//     })
// }
