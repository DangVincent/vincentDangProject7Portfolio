const myPortfolioApp = {};

// Link event function that controls the smooth scroll behaviour
myPortfolioApp.linkEvent = function() {
    // scroll behaviour obtained from https://www.taniarascia.com/smooth-scroll-to-id-with-jquery/
    const $navLink = $(".header__navItem a[href^='#']");  
    const $scrollLink = $(".header__content a[href^='#']");

    $navLink.add($scrollLink).on('click', function(e) {
        e.preventDefault();

        var position = $($(this).attr('href')).offset().top;

        $("body, html").animate({
            scrollTop: position
        }, 500, 'swing');
    });
}

myPortfolioApp.buttonEvent = function() {
    
}

myPortfolioApp.init = function() {
    myPortfolioApp.buttonEvent();
    myPortfolioApp.linkEvent();
}

$(function() {
    myPortfolioApp.init();
});