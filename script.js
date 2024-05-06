$(document).ready(function() {
    var overlayFadedOut = false;

    function fadeOutOverlay() {
        if (!overlayFadedOut) {
            $('.overlay').css('opacity', 0);
            setTimeout(function() { 
                $('.overlay').hide(); 
                overlayFadedOut = true; // Ensure this runs only once
            }, 500);
        }
    }

    // Check if the load event has fired by checking readyState
    function checkLoadState() {
        if (document.readyState === 'complete') {
            fadeOutOverlay();
            clearInterval(loadCheckerInterval); // Clear interval once done
        }
    }
    var loadCheckerInterval = setInterval(checkLoadState, 100);

    $(window).on('load', fadeOutOverlay);

    // Handle click events for links with exit overlay
    $('a').on('click', function(event) {
        var hasFolderId = $(this).attr('data-folder-id');
        var isControlLink = $(this).hasClass('header-menu-controls-control');

        if (hasFolderId || isControlLink) {
            return; // Allow default behavior for these links
        }

        event.preventDefault();
        var href = $(this).attr('href');

        $('.exit-overlay').show().css('opacity', 1);
        setTimeout(function() {
            window.location.href = href; // Redirect after fade-in complete
        }, 500); // Ensure the overlay is visible for at least half a second
    });
});
