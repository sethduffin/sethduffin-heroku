$(function () {
  $('[include]').each(function () {
    var file = $(this).attr('include');
    $(this).load(file);
  });
});
