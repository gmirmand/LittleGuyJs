function lt_start(lt_message, lt_bubble) {
    var lg_elm_body = "<svg class='lg-elm lg-elm-body'><path d='M63.13,38.26c-5.4,4.21-12.55,4.31-12.55,4.31s-7.16-.1-12.55-4.31-8.74,32.39-5.78,37.81c9,13.44,27.48,14.54,36.66,0C72.32,71.16,68.53,34,63.13,38.26Z'/></svg>";
    var lg_elm_foot = "<svg class='lg-elm lg-elm-foot lg-elm-foot-1'><path d=\"M49.08,83a7.2,7.2,0,0,0-3.78,2.46A5.87,5.87,0,0,0,47,94.59c-.84-.9.19-2.29,1.4-2.05,2.33.46.73,2.69.38,4.31A3,3,0,0,0,50.25,100c-.49-2,2-3.48,3.36-4.92,2.06-2.18,3.21-4.35,2.23-7-.8-2.43-3.3-4.45-6.53-5.1Z\"/></svg>";
    var lg_elm_arm1 = "<svg class='lg-elm lg-elm-arm lg-elm-arm-1'><path d=\"M32.38,40.41C35.15,26,15.58,51.34,13.79,55.57s-6.76,13-.43,15.65,8.24-1.59,8.24-1.59S32.09,41.92,32.38,40.41Z\"/></svg>";
    var lg_elm_arm2 = "<svg class='lg-elm lg-elm-arm lg-elm-arm-2'><path d=\"M66.57,40.35C63.79,25.9,83.36,51.28,85.16,55.5s6.76,13,.43,15.65-8.24-1.59-8.24-1.59S66.86,41.86,66.57,40.35Z\"/></svg>";
    var lg_elm_head = "<svg class='lg-elm lg-elm-head'><ellipse cx=\"50.67\" cy=\"20.93\" rx=\"19.53\" ry=\"18.93\"/><ellipse class=\"eyes\" cx=\"45.43\" cy=\"20.93\" rx=\"2.99\" ry=\"2.9\"/><ellipse class=\"eyes\" cx=\"55.11\" cy=\"20.93\" rx=\"2.99\" ry=\"2.9\"/></svg>";
    var lg_bubble = "<div class='lg-bubble'></div>";
    var lg_elm = [lg_elm_body, lg_elm_foot, lg_elm_arm1, lg_elm_arm2, lg_elm_head];

    /* Get static pos for prevent scroll lags */
    var TriggPos = [];
    var bottomVal = 0;
    var beforeScrollPos = 0;
    var beforePosition = 10;

    /* Message triggs */
    $.each(lt_message.trigg, function (i, val) {
            TriggPos[i] = $(val).offset().top - (2 * $(window).height()) / 3;
        }
    );
    $(window).on('scroll', function () {
        if (beforeScrollPos < $(document).scrollTop()) {
            /* Trigg message */
            $.each(lt_message.trigg, function (i, val) {
                if ($(document).scrollTop() >= TriggPos[i]) {
                    TriggPos[i] = 99999999999999999;
                    if ($('.lg-bubble').length == !1) {
                        $('.lg-container').append(lg_bubble);
                        /* Bubble settings */
                        /* color */
                        $('.lg-bubble, .lg-bubble:before').css('background-color', lt_bubble.color);
                    }
                    $('.lg-bubble').html(lt_message.text[i]);
                    lg_coucou();
                }
            });

            /* fall */
            bottomVal = bottomVal + 8;
            $('.lg-body').css('bottom', bottomVal + 'px');
            down(bottomVal);
        }
        beforeScrollPos = $(document).scrollTop();
    });

    function down() {
        var intervalID = setInterval(function () {
            if (bottomVal > -8) {
                $('.lg-body').css('bottom', '' + bottomVal + '');
                bottomVal--;
            } else {
                clearInterval(intervalID);
            }
        }, 50);
    }

    /* Function init */
    setTimeout(function () {
        $('.lg-body').attr('currentPos', 0);
        lg_blink();
        lg_move();
    }, 1500);

    function lg_coucou() {
        $('.lg-body .lg-elm-arm-2 path').addClass('coucou');
        setTimeout(function () {
            $('.lg-body .lg-elm-arm-2 path').removeClass('coucou');
        }, 1500);
    }

    function lg_blink() {
        randomTimeBlink = (Math.random() * 2500) + 500;
        randomFastBlink = (Math.random() * 100) + 100;
        setTimeout(function () {
            $('.lg-body .lg-elm-head .eyes').css('transition', randomFastBlink / 1000 + 's').addClass('blink');
            setTimeout(function () {
                $('.lg-body .lg-elm-head .eyes').removeClass('blink');
                lg_blink();
            }, randomFastBlink);
        }, randomTimeBlink);
    }

    function lg_move() {
        beforePosition = $('.lg-body').attr('currentPos');
        randomTimeMove = (Math.random() * 10000) + 8000;
        randomPosition = (Math.random() * 50) + 10;
        TimeMoveDelay = randomPosition - beforePosition;
        $('.lg-body').attr('currentPos', randomPosition);
        if (TimeMoveDelay <= 0) {
            symbol1 = -1;
            symbol2 = 1;
        } else {
            symbol1 = 1;
            symbol2 = -1;
        }

        TimeMoveDelay = Math.abs(TimeMoveDelay);
        setTimeout(function () {
            lg_move();
            $('.lg-body').css({
                transform: 'translate(' + randomPosition + 'vw) rotate(' + symbol1 * (TimeMoveDelay / 4) + 'deg)',
                transition: '' + TimeMoveDelay / 5 + 's'
            });
            $('.lg-body .lg-elm-foot').css({transform: 'rotate(' + symbol1 * 5 + 'deg) translate(' + symbol2 * 5 + 'px)'});
            setTimeout(function () {
                $('.lg-body .lg-elm-foot').css({transform: 'rotate(0deg) translate(0px)'});
                $('.lg-body').css({
                    transform: 'translate(' + randomPosition + 'vw) rotate(0deg)'
                })
            }, TimeMoveDelay * 190)
        }, randomTimeMove);
    }

    $('.lg-container').append('<div class="lg-body"></div>');
    $('.lg-body').append(lg_elm);
}