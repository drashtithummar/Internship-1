$(document).ready(function() {

    function highlight(word, query) {
        let check = new RegExp(query, "ig")
        return word.toString().replace(check, function(matchedText) {
            return "<u style='background-color: yellow'>" + matchedText + "</u>"
        })
    }

    $("#result-list").hide()
    $("#list").hide()

    $(".search-input").keyup(function() {
        let search = $(this).val()
        let results = ""
        if (search == "") {
            $("#result-list").hide()
            $(".search-input").removeClass("arrow").addClass("search")
        } else {
            $(".search-input").removeClass("search").addClass("arrow")
        }

        $.getJSON("https://www.omdbapi.com/?", { apikey: "fd161998", s: search }, function(data) {
            if (data.Search !== undefined) {
                $.each(data.Search, function(index, value) {
                    if (index < 2) {
                        $.getJSON("https://www.omdbapi.com/?", { apikey: "fd161998", i: value.imdbID }, function(movieData) {
                            if (movieData) {
                                results += '<div class="result row p-1">'
                                results += '<div class="col-sm-5"><img src=' + movieData.Poster + ' style="width: 170px; height: 250px;" /></div>'
                                results += '<div class="col-sm-7 text-left">'
                                results += '<div class="movie-title">'+ highlight(movieData.Title, $(".search-input").val()) +' ('+ movieData.Year +')</div>'
                                results += '<div class="rating-div"><span class="h4 rating">'+ movieData.imdbRating +'</span>/10</div>'
                                results += '<div class="my-3">'
                                results += '<div>Language: '+ movieData.Language + '</div>'
                                results += '<div>Stars: '+ movieData.Actors.split(",").slice(0, 3) + ' | <a href="#">Show All »</a></div>'
                                results += '</div>'
                                results += '<div class="my-3">'
                                results += '<div>'+ movieData.Plot.slice(0, 100) + '... <a href="#">Details »</a></div>'
                                results += '</div>'
                                results += '</div>'
                                results += "</div>"
                                $("#results").html(results)
                                
                                if (/Mobi|Android/i.test(navigator.userAgent)) {
                                    $("#results").children(".result").eq(1).hide();
                                } else {
                                    $(".result").first().after("<hr>")
                                }
                            }
                        })
                    }
                });
                $("#result-list").show()
            }
        });
    });
    
    $("#show-more").click(function(e) {
        e.preventDefault()
        var search = $(".search-input").val()
        let listResults = ""
        $("#search").hide()
        $("#list").show()
        $("#search-term").html("Results for: " + search)
        $.getJSON("https://www.omdbapi.com/?", { apikey: "fd161998", s: search }, function(listData) {
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                $("#list-count").html("(" + listData.totalResults + ")")
            } else {
                $("#list-count").html(listData.totalResults + " movie found")
            }
            if (listData.Search !== undefined) {
                $.each(listData.Search, function(index, value) {
                    $.getJSON("https://www.omdbapi.com/?", { apikey: "fd161998", i: value.imdbID }, function(listMovieData) {
                        if (listMovieData) {
                            listResults += '<div class="list-result col-6 p-3">'
                            listResults += '<div class="row">'
                            listResults += '<div class="col-md-6"><img src="' + listMovieData.Poster + '" style="width: 100%;" /></div>'
                            listResults += '<div class="col-md-6 text-left">'
                            listResults += '<div class="movie-title">'+ highlight(listMovieData.Title, $(".search-input").val()) +' ('+ listMovieData.Year +')</div>'
                            listResults += '<div class="rating-div"><span class="h4 rating">'+ listMovieData.imdbRating +'</span>/10</div>'
                            listResults += '<div class="my-3">'
                            listResults += '<div>Language: '+ listMovieData.Language + '</div>'
                            listResults += '<div>Stars: '+ listMovieData.Actors.split(",").slice(0, 3) + ' | <a href="#">Show All »</a></div>'
                            listResults += '</div>'
                            listResults += '<div class="my-3">'
                            listResults += '<div>'+ listMovieData.Plot.slice(0, 100) + '... <a href="#">Details »</a></div>'
                            listResults += '</div>'
                            listResults += '</div>' // col-6 end
                            listResults += "</div>" // row end
                            listResults += "</div>" // list-result col-6 end
                            $("#list-results").html(listResults)
                            $(".list-result:odd:not(:last-child)").after("<div class='col-12'><hr></div>")
                        }
                    })
                });
            }
        });
    });

    $("#searchAgain").click(function() {
        $("#search").show()
        $("#list").hide()
        $("#result-list").hide()
        $(".search-input").val("")
    });
});
 

