$(window).on("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        // The page was loaded from the cache
        window.location.reload();
    } else {
        // Normal page load
        var timeoutComplete = false;
        var overlayControlled = false;

        function fadeOutOverlay() {
            if (!overlayControlled) {
                $('.overlay').css('opacity', 0);
                setTimeout(function() {
                    $('.overlay').hide();
                    overlayControlled = true;  // Prevent multiple triggers
                }, 500);
            }
        }

        // Ensure exit overlay is hidden on initial load and back navigation
        $('.exit-overlay').hide();

        // Set a timeout to ensure the overlay fades out after a maximum wait time
        setTimeout(function() {
            timeoutComplete = true;
            fadeOutOverlay();
        }, 3000); // 3 seconds max before forcefully fading out

        // Check if the load event has fired by checking readyState
        var loadCheckerInterval = setInterval(function() {
            if (document.readyState === 'complete' && timeoutComplete) {
                fadeOutOverlay();
                clearInterval(loadCheckerInterval); // Stop the interval when done
            }
        }, 100);

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

            if (!overlayControlled) {
                fadeOutOverlay();
            }

            $('.exit-overlay').css('display', 'flex').css('opacity', 0).animate({ opacity: 1 }, 500, function() {
                setTimeout(function() {
                    window.location.href = href; // Redirect after the exit overlay fades in
                }, 500);
            });
        });
    }
});
