$(document).ready(function() {
    var pageLoaded = false;
    var timeoutComplete = false;

    function removePreloader() {
        if (pageLoaded && timeoutComplete) {
            $('.overlay').css('opacity', '0');
            
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

        // Prevent default behavior if no 'data-folder-id' and not a control link
        event.preventDefault();
        var href = $(this).attr('href');
        $('.overlay').css('opacity', '1');

        setTimeout(function() {
            window.location.href = href;
        }, 300); // 300 milliseconds = 0.3 seconds
    });
});
