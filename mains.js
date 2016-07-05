var current_page = 1;
var records_per_page = 24;
var numPages = 6;
function searchFunc(offset) {

    ($(".row") && $('#img_gallery')).empty();
    ($(".row") && $('#trending_img_gallery')).empty();
    
    var api_key = "dc6zaTOxFJmzC";

    var word = $("#Text").val().replace(/ /g,'+');
    var limit = records_per_page;
    var url = "http://api.giphy.com/v1/gifs/search?api_key="+api_key+"&q="+word+"&limit="+limit.toString()
            +"&offset="+offset.toString();

  $.getJSON(url,{
    type: "GET",
    dataType: "json",
    cache: true
  })
    .done(function( data ) {
        if (data.data.length>0) {
          console.log(data.data.length);
          ($(".row") && $('#feature_Section')).empty();
          var div = $('<div>').addClass('col-lg-3 col-md-4 col-xs-6 thumb');
          $('<h4>').html("Results for "+$("#Text").val()+": ").appendTo(div);
          div.appendTo($('.row') && $('#feature_Section'));

          $.each( data.data, function( i, item ) {
            var div = $('<div>').addClass('col-lg-3 col-md-4 col-xs-6 thumb');
            var a = $('<a>').addClass('thumbnail').attr('href','#').css("width","240px");
            a.appendTo(div);
            var image_url = item.images.fixed_height_downsampled.url;
            if (image_url.trim()){
                $( '<img>' ).addClass('img-responsive img-rounded').attr('src',image_url)
                .css({"width":"240px","height":"150px"}).appendTo(div);
                div.appendTo($('.row') && $('#img_gallery'));
            }
          });
          // var prev = $('<a>').attr({id="btn_prev",href="javascript:prevPage()"}).html('Prev');
          // var next = $('<a>').attr({id="btn_next",href="javascript:nextPage()"}).html('Next');
        }
        else{
            var div = $('<div>').addClass('col-lg-3 col-md-4 col-xs-6 thumb');
            $('<h2>').html("No Results Found!").appendTo(div);
            div.appendTo($('.row') && $('#img_gallery'));
        }

    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
        
    
}

function trendingFunc(){
    ($(".row") && $('#img_gallery')).empty();
    ($(".row") && $('#trending_img_gallery')).empty();
    var api_key = "dc6zaTOxFJmzC";
    var limit = 24;
    var url = "http://api.giphy.com/v1/gifs/trending?api_key="+api_key+"&limit="+limit.toString();

    $.getJSON(url,{
    type: "GET",
    dataType: "json",
    cache: true
  })
    .done(function( data ) {

      ($(".row") && $('#feature_Section')).empty();
      var div = $('<div>').addClass('col-lg-3 col-md-4 col-xs-6 thumb');
      $('<h4>').html("Trending GIFs: ").appendTo(div);
      div.appendTo($('.row') && $('#feature_Section'));

      $.each( data.data, function( i, item ) {
        var div = $('<div>').addClass('col-lg-3 col-md-4 col-xs-6 thumb');
        var a = $('<a>').addClass('thumbnail').attr('href','#').css("width","240px");
        a.appendTo(div);
        var image_url = item.images.fixed_height_downsampled.url;
        if (image_url.trim()){
            $( '<img>' ).addClass('img-responsive img-rounded').attr('src',image_url)
            .css({"width":"240px","height":"150px"}).appendTo(div);
            div.appendTo($('.row') && $('#img_gallery'));
        }

      });
    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });

}

function randomFunc(){
    var api_key = "dc6zaTOxFJmzC";
    var limit = 24;
    var url = "http://api.giphy.com/v1/gifs/random?api_key="+api_key+"&limit="+limit.toString();

    $.getJSON(url,{
    type: "GET",
    dataType: "json",
    cache: true
  })
    .done(function( data ) {
        console.log(data.data.length);
      $.each( data.data, function( i, item ) {
        var div = $('<div>').addClass('col-lg-3 col-md-4 col-xs-6 thumb');
        var a = $('<a>').addClass('thumbnail').attr('href','#').css("width","240px");
        a.appendTo(div);
        var image_url = item.images.fixed_height_downsampled.url;
        $( '<img>' ).addClass('img-responsive img-rounded').attr('src',image_url)
            .css({"width":"240px","height":"150px"}).appendTo(div);
        div.appendTo($('.row') && $('#img_gallery'));
      });
    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });

}

$(document).ready(function(){
    trendingFunc();
    $("#Text").keyup(function(e){
        if (e.which == 13 || e.keyCode == 13) {     // 13 for enter key
            searchFunc(0);
        }
    });
    window.searchFunction = function(){
        searchFunc(0);
    }
    window.trendingFunction = function(){
        trendingFunc();
    }

});

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page <numPages) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page){
     // Validate page
    if (page < 1) page = 1;
    if (page > numPages) page = numPages;

    searchFunc(page*24);

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == 5) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

