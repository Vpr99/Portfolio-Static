$('.PhotoBlock-expandItem').click(function() {
    $(this).toggleClass('isExpanded');
});

$(document).ready(function() {
    if ($(document).scrollTop() > 440) { $(".Header").addClass("is-scrolled"); }
    $(window).scroll(function () {
        if ($(document).scrollTop() > 440) { $(".Header").addClass("is-scrolled"); }
        else { $(".Header").removeClass("is-scrolled"); }
    })
});
