<!-- PRELOADER -->
  $(document).ready(function() {
    var pageLoaded = false;
    // Flag to check if the timeout has finished
    var timeoutComplete = false;

    // Function to remove the preloader
    function removePreloader() {
        if (pageLoaded && timeoutComplete) {
            $('.overlay').css('opacity', '0');
            $('#loading-animation').css('display', 'none');
        }
    }
    // Set a timeout for 2 seconds
    setTimeout(function() {
        timeoutComplete = true;
        removePreloader();  // Try to remove the preloader
    }, 3000); // 2000 milliseconds = 2 seconds

    // Listen for the window's load event
    $(window).on('load', function() {
        pageLoaded = true;
        removePreloader();  // Try to remove the preloader
    });

$('a').on('click', function(event) {
    var hasFolderId = $(this).attr('data-folder-id');
    if (hasFolderId) {
        // Handle links with data-folder-id differently or do nothing
        return; // Do nothing or return after a different logic
    }

    event.preventDefault();
    var href = $(this).attr('href');
    $('.overlay').css('opacity', '1');

    setTimeout(function() {
        window.location.href = href;
    }, 300); // 300 milliseconds = 0.3 seconds
});

});
