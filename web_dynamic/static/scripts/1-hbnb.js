import $ from 'jquery';
// js script and execute dom by jquery

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
});
