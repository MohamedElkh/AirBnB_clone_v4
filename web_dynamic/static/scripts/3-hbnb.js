import $ from 'jquery';
// Script that is executed only when DOM is loaded with jQuery

const checked = {};

$(document).ready(function () {
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      checked[$(this).data('id')] = $(this).data('name');
    } else {
      delete checked[$(this).data('id')];
    }

    $('div.amenities h4').html(function () {
      const amenities = [];
      Object.keys(checked).forEach(function (key) {
        amenities.push(checked[key]);
      });

      if (amenities.length === 0) {
        return ('&nbsp');
      }
      return (amenities.join(', '));
    });
  });

  const apiS = $('DIV#api_status');

  $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
      apiS.addClass('available');
    } else {
      apiS.removeClass('available');
    }
  });
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  data: '{}',
  success: function (data) {
    for (const currentPl of data) {
      $('.places').append('<article> <div class="title"> <h2>' + currentPl.name + '</h2><div class="price_by_night">' + '$' + currentPl.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPl.max_guest + ' Guests</div><div class="number_rooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPl.number_rooms + ' Bedrooms</div><div class="number_bathrooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPl.number_bathrooms + ' Bathroom </div></div> <div class="user"></div><div class="description">' + '$' + currentPl.description + '</div></article>');
    }
  }
});
