var viewportWidth = $(window).width();
var viewportHeight = $(window).height();
var isExpanded;

$('.willExpand').click(function() {
    $(this).toggleClass('isExpanded');
    $('body').toggleClass('modalOpen');

    if(isExpanded) {

        /* Resize and collapse the image */
        $(this).velocity({
            scale: 1,
            translateX: 0,
            translateY: 0,
            translateZ: 0
        },
        {
            duration: 300,
            easing: "easeOutQuint",
            complete: function() { $(this).css("z-index", "1"); }
        });

        /* @TODO: Dismiss when the overlay is clicked */
        /* @TODO: Dismiss when the user hits ESC */
        /* Hide the overlay */
        $('.Modal-overlay').velocity("fadeOut", { duration: 300 });

        /* Remove the expanded flag */
        isExpanded = false;

    }
    else {
        /* Calculate the offsets for the original image */
        var startPosition = $(this)[0].getBoundingClientRect();
        var smallLeftOffset = startPosition.left + (startPosition.width/2);
        var smallTopOffset = startPosition.top + (startPosition.height/2);

        /* Calculate the image scale factor */
        var widthScale = 0.9*(viewportWidth/startPosition.width);
        var heightScale = 0.9*(viewportHeight/startPosition.height);
        var scale = widthScale;
        if(heightScale < widthScale) { scale = heightScale; }

        /* Calculate the offsets for the scaled image */
        var largeWidth = startPosition.width * scale;
        var largeHeight = startPosition.height * scale;
        var largeLeft = (viewportWidth/2) - (largeWidth/2);
        var largeTop = (viewportHeight/2) - (largeHeight/2);
        var largeLeftOffset = largeLeft + (largeWidth/2);
        var largeTopOffset = largeTop + (largeHeight/2);

        var xTranslation = (largeLeftOffset - smallLeftOffset)/scale;
        var yTranslation = (largeTopOffset - smallTopOffset)/scale;

        /* Resize and expand the image */
        $(this).velocity(
            {
                scale: scale,
                translateX: xTranslation + "px",
                translateY: yTranslation + "px",
                translateZ: 0
            },
            {
                duration: 300,
                easing: "easeOutQuint",
                begin: function() { $(this).css("z-index", "999"); }
            }
        );

        /* @TODO: Reveal the Close button */
        // $('.Modal-closeButton').velocity("transition.slideDownIn", { duration: 300 });

        /* Reveal the overlay */
        $('.Modal-overlay').velocity("fadeIn", { duration: 300 });

        /* Flag the image as expanded */
        isExpanded = true;
    }
});

$(document).ready(function() {
    if ($(document).scrollTop() > 440) { $(".Header").addClass("is-scrolled"); }
    $(window).scroll(function () {
        if ($(document).scrollTop() > 440) { $(".Header").addClass("is-scrolled"); }
        else { $(".Header").removeClass("is-scrolled"); }
    })
});

/* Google Analytics */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-24842982-1', 'auto');
ga('send', 'pageview');
