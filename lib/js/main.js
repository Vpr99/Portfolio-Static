$('.ExpandImg').click(function() {
    $(this).toggleClass('isExpanded');
});

$(document).ready(function() {
    if ($(document).scrollTop() > 440) { $(".Header").addClass("is-scrolled"); }
    $(window).scroll(function () {
        if ($(document).scrollTop() > 440) { $(".Header").addClass("is-scrolled"); }
        else { $(".Header").removeClass("is-scrolled"); }
    })
});


(function () {
    $(window).scroll(function () {
        var oVal;
        oVal = $(window).scrollTop() / 240;
        return $('.Project-hero--RegistrationBlurry').css('opacity', oVal);
    });
}.call(this));
