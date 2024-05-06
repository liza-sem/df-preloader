$(document).ready(function() {
    // Hide the loading overlay once everything is loaded
    $(window).on('load', function() {
        $('.overlay').css('opacity', 0);
        setTimeout(function() { $('.overlay').hide(); }, 500);
    });

    // When clicking a link, show the exit overlay
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
        }, 500); // Matches transition time and ensures the overlay is visible for at least half a second
    });
});

