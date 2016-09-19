$(document).ready(function() {
  var frequentStreamerUsernames = ["freecodecamp", "brunofin", "comster404", "storbeck", "mufasaprime", "nl_Kripp", "Nightblue3", "terakilobyte", "habathcx", "RobotCaleb", "izakooo", "thomasballinger", "noobs2ninjas", "beohoff"];

  var baseUrl = 'https://api.twitch.tv/kraken/streams?';

  // Grab the current twitch.tv live streams
  function currentStreams() {
    $.getJSON(baseUrl, function(json) {
      $.each(json.streams, function(key, streams) {
        $('#currentStreamers').append("<div class=' row row-fluid well streamWell text-center'><div class='fluid streamInfo'><div class='row row-fluid'><img class='img img-fluid logos' src='" + streams.channel.logo + "'/></br><h2>" + streams.channel.display_name + "</h2><a href='" + streams.channel.url + "' target='_blank'><h4>Watch it live</h4></a></div><div class='row row-fluid'><h4>Current content: " + streams.channel.game + "</h4></div><div class='row row-fluid'><h4>" + streams.channel.status + "</h4></div></div></div>");
        $('#streamInfo').css('background-image', "url(" + streams.channel.profile_banner + ") target='_blank'");
      });
    });
  };

  // function to show whether the frequent code streamers are currently on or offline(set list of streamers in the frequentStreamersUsernames array)
  function frequentCoders() {
    frequentStreamerUsernames.forEach(function(user) {
      $.getJSON('https://api.twitch.tv/kraken/streams/' + user, function(data) {
          // If not currently streaming, stream object returns null
          if (data.stream === null) {
            console.log(user + ' is offline');
            $('#codeChannels').append("<div class='row row-fluid well streamWell text-center'><div class='fluid streamInfo'><div class='row row-fluid'><h2>" + user + " </h2><h4>is currently offline</h4>" + "</div><div class='row row-fluid'><a href='https://www.twitch.tv/" + user + "' target='_blank'><h4>Visit their page</h4></a></div></div></div>");
          }
          // If channel is currently streaming, stream object isn't null
          else if (data.stream !== null) {
            console.log(data.stream.channel.status);
            $('#codeChannels').append("<div class='row row-fluid well streamWell text-center'><div class='fluid streamInfo'><div class='row row-fluid'><img class='img img-fluid logos' src='" + data.stream.channel.logo + "'/></br><h2>" + data.stream.channel.display_name + "</h2><a href='" + data.stream.channel.url + "' target='_blank'><h4>Watch it live</h4></a></div><div class='row row-fluid'><h4>" + data.stream.channel.game + "</h4></div><div class='row row-fluid'><h4>" + data.stream.channel.status + "</h4></div></div></div>");
          }
        })
        // for unfound accounts(deleted, removed, or non-existent)
        .fail(function(err) {
          console.log(user + " doesn't exist, or has been removed");
          $('#codeChannels').append("<div class='row row-fluid well streamWell text-center'><div class='fluid streamInfo'><div class='row row-fluid'><h2>" + user + " </h2><h4>doesn't exist or has been removed</h4>" + "</div><div class='row row-fluid'></div></div></div>");
        });
    })
  };
  // refresh the data. Removal of displayed data and new calls to the api
  function refresh() {
    $('#currentStreamers').children().remove();
    $('#codeChannels').children().remove();
    currentStreams();
    frequentCoders();
  }

  // button and call to show current live streams

  // On page load, grab the data for current streams and frequent coder streams
  currentStreams();
  frequentCoders();

  // hide the frequent coder data
  $('#codeChannels').hide();
  $('#currentStreamsButton').on('click', function() {
    $('#codeChannels').hide();
    $('#currentStreamers').show();
  });

  // hide shown content and show code channels statuses
  $('#codeChannelsButton').on('click', function() {
    $('#currentStreamers').hide();
    $('#codeChannels').show();
  });

  // 
  $('#refresh').on('click', function() {
    refresh();

  });
});