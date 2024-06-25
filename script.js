$(document).ready(function() {
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

    function resetOverlays() {
        $('.exit-overlay').hide().css('opacity', 0);
        if (!overlayControlled) {
            fadeOutOverlay();
        }
    }

    // Initially hide the exit overlay and control the main overlay
    resetOverlays();

    // Set a timeout to ensure the overlay fades out after a maximum wait time
    setTimeout(function() {
        timeoutComplete = true;
        fadeOutOverlay();
    }, 3000); // 3 seconds max before forcefully fading out

    // Check for the page becoming visible again, such as navigating back to it
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            resetOverlays();
        }
    });

    $(window).on('pageshow', function(event) {
        if (event.originalEvent.persisted) {
            // The page was loaded from the cache
            resetOverlays();
        }
    });

    // Handle click events for navigation links
    $('a').on('click', function(event) {
        var hasFolderId = $(this).attr('data-folder-id');
        var isControlLink = $(this).hasClass('header-menu-controls-control');
        var allowedHrefs = ['#', '#!', '#void', 'javascript:void(0)'];
        var targetBlank = $(this).attr('target') === '_blank';
        var href = $(this).attr('href');
        var isButtonRole = $(this).attr('role') === 'button';

        // Allow any href that starts with # or if role is button with no href
        if (hasFolderId || isControlLink || allowedHrefs.includes(href) || targetBlank || /^#/.test(href) || (!href && isButtonRole)) {
            return;
        }

        event.preventDefault();

        $('.exit-overlay').css('display', 'flex').css('opacity', 0).animate({ opacity: 1 }, 500, function() {
            setTimeout(function() {
                window.location.href = href;
            }, 500);
        });
    });
});
