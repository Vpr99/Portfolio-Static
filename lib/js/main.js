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


(function () {
    $(window).scroll(function () {
        var scrollVal = $(window).scrollTop();
        $('.Project-hero--RegistrationBlurry').css('opacity', (scrollVal/240));
        $('.Project-mainPreview--Registration').css({transform:"translateY(-" + scrollVal/5 + "px)"});
    });
}.call(this));
