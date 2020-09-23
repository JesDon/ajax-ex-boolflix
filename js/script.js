$(document).ready(function() {

// AVVIO RICERCA CON BOTTONE
$(".search-btn").click(
  function() {
  var cercaMovie = $(".searchbar").val();
  // SVUOTO LISTA FILM E CAMPO INPUT
  $("#movies-list").html("");
  $(".searchbar").val("");
  getMovies(cercaMovie);
  }
);

// AVVIO RICERCA CON TASTO INVIO
$(".searchbar").keyup(
  function(event) {
  var cercaMovie = $(".searchbar").val();
    if(event.which == 13) {
      // SVUOTO LISTA FILM E CAMPO INPUT
      $("#movies-list").html("");
      $(".searchbar").val("");
      getMovies(cercaMovie);
    }
  }
);

// GRAFFE INIZIALI
});

// FUNZIONE CHE SI OCCUPA DI CONTATTARE API E STAMPA RISULTATO
function getMovies(searchString) {
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        "api_key": "eb2f4e43de2e0ba217e256f7b179c8cc",
        "query": searchString,
        "language": "it-IT"
      },
      "method": "GET",
      "success": function(data) {
        risultati(data.results);
      },
      "error": function(errore) {
        alert("Errore");
      }
    }
  );
}

// FUNZIONE ESTRAI FILM
function risultati(movies) {
  var source = $("#movies-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < movies.length; i++) {
    var titolo = movies[i].title;
    var titoloOriginale = movies[i].original_title;
    var lingua = movies[i].original_language;
    var voto = Math.round((movies[i].vote_average) / 2);
    var stelle = "";
    var bandiera = "";

      // CICLO PER AGGIUNGERE STELLE E RIEMPIRLE
      for (var j = 1; j <= 5; j++) {
        if (j <= voto) {
          stelle += "<i class='fas fa-star star star-full'></i>";
        } else {
          stelle += "<i class='fas fa-star star'></i>";
        }
      }

      // BANDIERE LINGUE
      if (lingua == "it") {
        bandiera = "<img class='flag' src='img/it.svg' alt='ITA'>";
      } else if (lingua == "en") {
        bandiera = "<img class='flag' src='img/en.svg' alt='ITA'>";
      } else if (lingua == "fr") {
        bandiera = "<img class='flag' src='img/fr.svg' alt='ITA'>";
      } else if (lingua == "es") {
        bandiera = "<img class='flag' src='img/es.svg' alt='ITA'>";
      } else {
        bandiera = lingua;
      }

    var context = {
      "title": titolo,
      "orig_title": titoloOriginale,
      "lang": lingua,
      "vote": voto,
      "stars": stelle,
      "flag": bandiera,
    }
    // PREPARAZIONE HTML
    var html = template(context);
    // INIETTIAMO HTML IN TAG <UL>
    $("#movies-list").append(html);
  }
}
