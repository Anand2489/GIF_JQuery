function searchFunc() {
    ($(".row") && $('#img_gallery')).empty();
    ($(".row") && $('#trending_img_gallery')).empty();
    var api_key = "dc6zaTOxFJmzC";

    // var div = $('<div>').addClass('col-lg-3 col-md-4 col-xs-6 thumb');
    // var p = $('p').html($('#Text').val());
    // p.appendTo(div);
    // div.appendTo($('.row') && $('#img_gallery'));
    var word = $("#Text").val().replace(/ /g,'+');
    var limit = 48;
    var url = "http://api.giphy.com/v1/gifs/search?api_key="+api_key+"&q="+word+"&limit="+limit.toString();

  $.getJSON(url,{
    type: "GET",
    dataType: "json",
    cache: true
  })
    .done(function( data ) {
        console.log(data.pagination.total_count);
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

        // if ( i === 1 ) {
        //   return false;
        // }
      });
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
            searchFunc();
        }
    });
    window.searchFunction = function(){
        searchFunc();
    }
    window.trendingFunction = function(){
        trendingFunc();
    }

});

