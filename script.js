$(document).ready(function() {
    var timeoutComplete = false;
    var overlayControlled = false;

    // Function to fade out the overlay
    function fadeOutOverlay() {
        if (!overlayControlled) {
            $('.overlay').css('opacity', 0);
            setTimeout(function() {
                $('.overlay').hide();
                overlayControlled = true;  // Prevent multiple triggers
            }, 500);
        }
    }

    // Initially hide the exit overlay on every page load
    $('.exit-overlay').hide().css('opacity', 0);

    // Set a timeout to ensure the overlay fades out after a maximum wait time
    setTimeout(function() {
        timeoutComplete = true;
        fadeOutOverlay();
    }, 3000); // 3 seconds max before forcefully fading out

    // Handle the 'pageshow' event to manage overlay visibility when coming from cache
    $(window).on('pageshow', function(event) {
        if (event.originalEvent.persisted) {
            // The page was loaded from the cache, ensure overlays are reset
            $('.exit-overlay').hide().css('opacity', 0);
            fadeOutOverlay();  // Also ensure main overlay is controlled properly
        }
    });

    // Handle click events for navigation links
    $('a').on('click', function(event) {
        var hasFolderId = $(this).attr('data-folder-id');
        var isControlLink = $(this).hasClass('header-menu-controls-control');
        var allowedHrefs = ['#', '#!', '#void', 'javascript:void(0)'];  // Array of allowed hrefs

        if (hasFolderId || isControlLink || allowedHrefs.includes($(this).attr('href'))) {
            return;
        }

        event.preventDefault();
        var href = $(this).attr('href');

        // Ensure no animation conflicts
        if (!overlayControlled) {
            fadeOutOverlay();
        }

        $('.exit-overlay').css('display', 'flex').css('opacity', 0).animate({ opacity: 1 }, 500, function() {
            setTimeout(function() {
                window.location.href = href; // Redirect after the exit overlay fades in
            }, 500);
        });
    });
});
