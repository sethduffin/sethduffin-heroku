// Methods
function setImageVars() {
  $('img').each(function () {
    const element = $(this);
    element.css('--image-width', `${this.scrollWidth}px`);
    element.css('--image-height', `${this.scrollHeight}px`);
  });
}

$(window).on('load', () => {
  setImageVars();
});

$(window).on('resize', () => {
  setImageVars();
});
