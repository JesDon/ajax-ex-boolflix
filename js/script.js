$(document).ready(function() {

// AVVIO RICERCA CON BOTTONE
$(".search-btn").click(
  function() {
  var cercaMovie = $(".searchbar").val();
  // SVUOTO LISTA FILM E CAMPO INPUT
  $("#movies-list").html("");
  $(".searchbar").val("");
  getMovies(cercaMovie);
  getSeries(cercaMovie);
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
      getSeries(cercaMovie);
    }
  }
);

$(".locandina").mouseenter(
  function() {
    $(".general-info").show();
  });


// GRAFFE INIZIALI
});

// ----------FUNZIONI----------

// FUNZIONE PER FILM
function getMovies(searchString) {
  $.ajax(
    {
      "url": "https://localhost/php-ajax-dischi/server.php",
      "data": {
        "api_key": "eb2f4e43de2e0ba217e256f7b179c8cc",
        "query": searchString,
        "language": "it-IT"
      },
      "method": "GET",
      "success": function(data) {
        risultati("film", data.results);
      },
      "error": function(errore) {
        alert("Errore");
      }
    }
  );
}

// FUNZIONE PER TV SERIES
function getSeries(searchString) {
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/tv",
      "data": {
        "api_key": "eb2f4e43de2e0ba217e256f7b179c8cc",
        "query": searchString,
        "language": "it-IT"
      },
      "method": "GET",
      "success": function(data) {
        risultati("series", data.results);
      },
      "error": function(errore) {
        alert("Errore");
      }
    }
  );
}

// FUNZIONE ESTRAI FILM E TV SERIES
function risultati(tipologia, results) {
  var source = $("#template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < results.length; i++) {

    // FUNZIONE PER SELEZIONARE FILM O TV SERIES
    if (tipologia == "film") {
      titolo = results[i].title;
      titoloOriginale = results[i].original_title;
      container = $("#movies-list");
    } else if (tipologia == "series") {
      titolo = results[i].name;
      titoloOriginale = results[i].original_name;
      container = $("#series-list");
    }

    // FUNZIONE PER INSERIRE POSTER
    if (results[i].poster_path == null) {
      var locandina = "img/no_poster.png";
    } else {
      var locandina = "https://image.tmdb.org/t/p/w342"+results[i].poster_path;
    }

    // VARIABILI UGUALI PER FILM E TV SERIES
    var lingua = results[i].original_language;
    var voto = Math.round((results[i].vote_average) / 2);
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
      "type": tipologia,
      "poster": locandina,
    }
    // PREPARAZIONE HTML
    var html = template(context);
    // INIETTIAMO HTML IN TAG <UL>
    $("#movies-list").append(html);
  }
}
