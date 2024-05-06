$(document).ready(function() {
    var pageLoaded = false;
    var timeoutComplete = false;

    function removePreloader() {
        if (pageLoaded && timeoutComplete) {
            $('.overlay').fadeOut(500);  // Fade out the overlay smoothly
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
            return; // Allow default behavior for these links
        }

        event.preventDefault();
        var href = $(this).attr('href');

        // Prevent further clicks
        $('a').css('pointer-events', 'none');

        $('.overlay').css('display', 'block').css('opacity', 0).fadeIn(500, function() {
            setTimeout(function() {
                window.location.href = href;  // Redirect after a slight delay
            }, 300); // 300 milliseconds = 0.3 seconds
        });
    });
});
