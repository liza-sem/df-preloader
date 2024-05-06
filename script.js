$(document).ready(function() {
    var timeoutComplete = false;

    function removePreloader() {
        if (timeoutComplete) {
            $('.overlay').css('opacity', 0);
            setTimeout(function() { $('.overlay').hide(); }, 500); // Ensure it hides after fade out
        }
    }

    // Wait for 3 seconds before hiding preloader
    setTimeout(function() {
        timeoutComplete = true;
        removePreloader();
    }, 3000);

    $(window).on('load', function() {
        $('.overlay').css('opacity', 0);
        setTimeout(function() { $('.overlay').hide(); }, 500);
    });

    $('a').on('click', function(event) {
        var hasFolderId = $(this).attr('data-folder-id');
        var isControlLink = $(this).hasClass('header-menu-controls-control');

        if (hasFolderId || isControlLink) {
            return; // Allow default behavior for these links
        }

        event.preventDefault();
        var href = $(this).attr('href');

        $('.overlay').show().css('opacity', 1); // Immediately show and fade in
        setTimeout(function() {
            window.location.href = href; // Redirect after fade-in complete
        }, 500); // Matches transition time
    });
});
