// JavaScript script that is executed only when DOM is loaded by jquery

let checked = {};

$(document).ready(function () {
    $('input:checkbox').change(function () {
	if ($(this).is(':checked')) {
	    checked[$(this).data('id')] = $(this).data('name');
	}
	else {
	    delete checked[$(this).data('id')];
	}
	$('div.amenities h4').html(function () {
	    let amenities = [];

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
