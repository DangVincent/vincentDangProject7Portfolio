const myPortfolioApp = {};

myPortfolioApp.backgroundEffect = function() {
    VANTA.WAVES({
        el: '#home',
        color: 0xe1011,
        shininess: 40.00,
        waveHeight: 9.50,
        waveSpeed: 0.60,
        zoom: 0.9
    })
}

// Typed event function will control how the header description is typed out 
myPortfolioApp.typedEvent = function() {

    const typed = new Typed('#header__description', {
        strings: [
            'welcome to my site',
            'front end developer'
        ],
        typeSpeed: 100,
        showCursor: false,
        backSpeed: 20
    });
}

// Link event function controls the smooth scroll behaviour
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

// Contact form function controls the ajax call when the form is submitted
myPortfolioApp.contactFormEvent = function() {
    // Ajax redirect obtained from https://stackoverflow.com/questions/33984667/how-to-get-around-the-formspree-redirect
    const $form = $('#contact__form');
    const $name = $('#name');
    const $email = $('#emailAddress');
    const $message = $('#message');
    // email regular expression obtained from https://emailregex.com/
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    $form.on('submit', function(event) {
        event.preventDefault();
        const validEmail = ($email.val()).match(emailRegExp);
        $name.prop('disabled', false);
        if (validEmail) {
            const emailMessage = `Name: ${$name.val()}\nEmail Address: ${$email.val()}\nMessage: ${$message.val()}`;
            $.ajax({
                url: 'https://formspree.io/xpzqzavo', 
                method: 'POST',
                data: {
                message: emailMessage
                },
                dataType: 'json'
            }).then(function(){
                $name.val('');    
                $email.val('');
                $message.val('');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your message has been sent!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch((function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            }));
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid email!'
            });
        }
    })
}

myPortfolioApp.init = function() {
    myPortfolioApp.backgroundEffect();
    myPortfolioApp.typedEvent();
    myPortfolioApp.linkEvent();
    myPortfolioApp.contactFormEvent();
}

$(function() {
    myPortfolioApp.init();
});