$(document).ready(function() {
    var pageLoaded = false;
    var timeoutComplete = false;

    function removePreloader() {
        if (pageLoaded && timeoutComplete) {
            $('.overlay').css({'opacity': '0'});
            setTimeout(function() {
                $('.overlay').css({'visibility': 'hidden'});
            }, 300); // Wait for the opacity transition to finish before hiding
        }
    }

    setTimeout(function() {
        timeoutComplete = true;
        removePreloader();  // Try to remove the preloader
    }, 3000); // 3000 milliseconds = 3 seconds

    $(window).on('load', function() {
        pageLoaded = true;
        removePreloader();  // Try to remove the preloader
    });

    $('a').on('click', function(event) {
        var hasFolderId = $(this).attr('data-folder-id');
        var isControlLink = $(this).hasClass('header-menu-controls-control');

        if (hasFolderId || isControlLink) {
            // If the link has 'data-folder-id' or the specified class, do nothing
            return; // Do nothing or return after a different logic
        }

        event.preventDefault();
        var href = $(this).attr('href');

        $('.overlay').css({'visibility': 'visible', 'opacity': '0'}); // Ensure the element is visible and set opacity to 0
        setTimeout(function() {
            $('.overlay').css('opacity', '1'); // Then transition to full opacity
        }, 10); // Short delay to ensure the CSS property is applied

        setTimeout(function() {
            window.location.href = href;
        }, 300); // Delay the navigation
    });
});
