$(document).ready(function() {

$(".search-btn").click(
  function() {

  var cercaMovie = ""

  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        "api_key": "eb2f4e43de2e0ba217e256f7b179c8cc",
        "query": cercaMovie,
        "language": "it-IT"
      },
      "method": "GET",
      "success": function(data) {
        risultati(data.results);
      },
      "error": function(errore) {
        alert("Errore");
      }
  });
});

// GRAFFE INIZIALI
});

function risultati(movies) {

  var source = $("#movies-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < movies.length; i++) {
    var titolo = movies[i].title;
    var titoloOriginale = movies[i].original_title;
    var lingua = movies[i].original_language;
    var voto = movies[i].vote_average;

    var context = {
      "title": titolo,
      "orig_title": titoloOriginale,
      "lang": lingua,
      "vote": voto,
    };

    // PREPARAZIONE HTML
    var html = template(context);

    // INIETTIAMO HTML IN TAG <UL>
    $("#movies-list").append(html);
  }
}
