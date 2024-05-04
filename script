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
        // Prevent the default behavior (navigation) from occurring immediately
        event.preventDefault();

        // Capture the link's href attribute
        var href = $(this).attr('href');

        // Show the overlay
        $('.overlay').css('opacity', '1');

        // Wait for a second
        setTimeout(function() {
            // After a second, proceed with the navigation
            window.location.href = href;
        }, 300); // 1000 milliseconds = 1 second
    });
});
