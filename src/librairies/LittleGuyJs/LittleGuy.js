// Declare namespace
var main = main || {};

main.General = function () {
};

main.General.prototype = {
    init: function () {
        LittleGuyJs.init();
    }
};

$(document).ready(function () {
    var g = new main.General();
    g.init();
});

//Start
var LittleGuyJs;
LittleGuyJs = {
    lg_elm_body: "<svg class='lg-elm lg-elm-body'><path d='M63.13,38.26c-5.4,4.21-12.55,4.31-12.55,4.31s-7.16-.1-12.55-4.31-8.74,32.39-5.78,37.81c9,13.44,27.48,14.54,36.66,0C72.32,71.16,68.53,34,63.13,38.26Z'/></svg>",
    lg_elm_foot: "<svg class='lg-elm lg-elm-foot lg-elm-foot-1'><path d=\"M49.08,83a7.2,7.2,0,0,0-3.78,2.46A5.87,5.87,0,0,0,47,94.59c-.84-.9.19-2.29,1.4-2.05,2.33.46.73,2.69.38,4.31A3,3,0,0,0,50.25,100c-.49-2,2-3.48,3.36-4.92,2.06-2.18,3.21-4.35,2.23-7-.8-2.43-3.3-4.45-6.53-5.1Z\"/></svg>",
    lg_elm_arm1: "<svg class='lg-elm lg-elm-arm lg-elm-arm-1'><path d=\"M32.38,40.41C35.15,26,15.58,51.34,13.79,55.57s-6.76,13-.43,15.65,8.24-1.59,8.24-1.59S32.09,41.92,32.38,40.41Z\"/></svg>",
    lg_elm_arm2: "<svg class='lg-elm lg-elm-arm lg-elm-arm-2'><path d=\"M66.57,40.35C63.79,25.9,83.36,51.28,85.16,55.5s6.76,13,.43,15.65-8.24-1.59-8.24-1.59S66.86,41.86,66.57,40.35Z\"/></svg>",
    lg_elm_head: "<svg class='lg-elm lg-elm-head'><ellipse cx=\"50.67\" cy=\"20.93\" rx=\"19.53\" ry=\"18.93\"/><ellipse class=\"eyes\" cx=\"45.43\" cy=\"20.93\" rx=\"2.99\" ry=\"2.9\"/><ellipse class=\"eyes\" cx=\"55.11\" cy=\"20.93\" rx=\"2.99\" ry=\"2.9\"/></svg>",
    lg_bubble: "<div class='lg-bubble'></div>",
    lg_elm: [],
    /* Get static pos for prevent scroll lags */
    TriggPos: [],
    TriggHeight: [],
    bottomVal: 0,
    beforeScrollPos: 0,
    beforePosition: 10,
    decrease: 0,
    lt_message: {},
    lt_bubble: {},
    ScrollPos: 0,
    //Init
    init: function () {
        console.log('LittleGuyJs Init (https://github.com/gmirmand/littleguyjs)');
        // Function init
        LittleGuyJs.lg_elm = [LittleGuyJs.lg_elm_body, LittleGuyJs.lg_elm_foot, LittleGuyJs.lg_elm_arm1, LittleGuyJs.lg_elm_arm2, LittleGuyJs.lg_elm_head];
        setTimeout(function () {
            $('.lg-body').attr('currentPos', 0);
            LittleGuyJs.lg_blink();
            LittleGuyJs.lg_move();
        }, 1500);

        //Setup container HTML
        $('.lg-container').append('<div class="lg-body" id="lg-body"></div>');
        $('.lg-body').append(LittleGuyJs.lg_elm);

        /* Message triggs */
        $.each(LittleGuyJs.lt_message.trigg, function (i, val) {
            LittleGuyJs.TriggPos[i] = $(val).offset().top - (2 * $(window).height()) / 3;
        });
        //On scroll anim
        $(window).on('scroll', function () {
            /* Trigg message */
            LittleGuyJs.checkMessage();
            if (LittleGuyJs.beforeScrollPos < $(document).scrollTop()) {
                LittleGuyJs.bottomVal = LittleGuyJs.bottomVal + 6;
                $('.lg-container').css('bottom', LittleGuyJs.bottomVal + 'px');
                LittleGuyJs.down();
            }
            LittleGuyJs.beforeScrollPos = $(document).scrollTop();
        });
    },

    //Display message
    checkMessage: function () {
        $.each(LittleGuyJs.lt_message.trigg, function (i, val) {
            var ScrollTop = $(document).scrollTop();
            var minTop = LittleGuyJs.TriggPos[i];
            if (ScrollTop >= minTop) {
                if ($('.lg-bubble').length !== 1) {
                    /* Bubble settings */
                    $('.lg-body').append(LittleGuyJs.lg_bubble);
                    /* color */
                    $('.lg-bubble, .lg-bubble:before').css('background-color', LittleGuyJs.lt_bubble.color);
                    setTimeout(function () {
                        $('.lg-body .lg-bubble').remove();
                    }, 3000)
                }
                $('.lg-bubble').html(LittleGuyJs.lt_message.text[i]);
            }

            //Show (move arm)
            if (LittleGuyJs.ScrollPos < ScrollTop) {
                var DivPosX = {
                    left: $(val).offset().left,
                    right: $(val).offset().left + $(val).outerWidth()
                };
                LittleGuyJs.show(DivPosX);
                LittleGuyJs.ScrollPos = ScrollTop;
            }
        });
    },

    //Eyes blinking
    lg_blink: function () {
        var randomTimeBlink = (Math.random() * 2500) + 500;
        var randomFastBlink = (Math.random() * 100) + 100;
        setTimeout(function () {
            $('.lg-body .lg-elm-head .eyes').css('transition', randomFastBlink / 1000 + 's').addClass('blink');
            setTimeout(function () {
                $('.lg-body .lg-elm-head .eyes').removeClass('blink');
                LittleGuyJs.lg_blink();
            }, randomFastBlink);
        }, randomTimeBlink);
    },

    //Movement (top and left/right
    lg_move: function () {
        var arm;
        var symbol1;
        var symbol2;
        var randomTimeMove = (Math.random() * 10000) + 8000;
        LittleGuyJs.beforePosition = $('.lg-body').attr('currentPos');
        LittleGuyJs.randomPosition = (Math.random() * 50) + 10;
        var TimeMoveDelay = LittleGuyJs.randomPosition - LittleGuyJs.beforePosition;
        $('.lg-body').attr('currentPos', LittleGuyJs.randomPosition);
        // Il va à gauche
        if (TimeMoveDelay <= 0) {
            symbol1 = -1;
            symbol2 = 1;
            arm = 2;
        }
        // Il va à droite
        else {
            symbol1 = 1;
            symbol2 = -1;
            arm = 1;
        }
        TimeMoveDelay = Math.abs(TimeMoveDelay);
        setTimeout(function () {
            LittleGuyJs.lg_move();
        }, randomTimeMove);
        $('.lg-body').css({
            transform: 'translate(' + LittleGuyJs.randomPosition + 'vw)',
            transition: '' + TimeMoveDelay / 5 + 's'
        });
        $('.lg-body .lg-elm-foot').css({transform: 'rotate(' + symbol1 * 5 + 'deg) translate(' + symbol2 * 5 + 'px)'});
        $('.lg-body .lg-elm-arm-' + arm + '').css({transform: 'rotate(' + symbol1 * 5 + 'deg) translate(' + symbol2 * 5 + 'px)'});
        setTimeout(function () {
            $('.lg-body .lg-elm-foot, .lg-elm-arm').css({transform: 'rotate(0deg) translate(0px)'});
        }, TimeMoveDelay * 100)
    },

    //Add gravity
    down: function () {
        var intervalID = setInterval(function () {
            if (LittleGuyJs.bottomVal > -8) {
                if (LittleGuyJs.bottomVal > 50)
                    LittleGuyJs.decrease = 3;
                else if (LittleGuyJs.bottomVal > 20)
                    LittleGuyJs.decrease = 2;
                else
                    LittleGuyJs.decrease = 1;
                $('.lg-container').css('bottom', LittleGuyJs.bottomVal + 'px');
                LittleGuyJs.bottomVal = LittleGuyJs.bottomVal - LittleGuyJs.decrease;
            } else {
                clearInterval(intervalID);
            }
        }, 250);
    },

    //Show
    show: function (DivPoxX) {
        $body = $('#lg-body');
        var GuyPosX = {
            left: $body.offset().left,
            right: $body.offset().left + $body.outerWidth()
        };
        //LittleGuy est sur la div
        if (GuyPosX.left > DivPoxX.left && GuyPosX.right > DivPoxX.right) {
            $('.lg-body .lg-elm-arm-1 path, .lg-body .lg-elm-arm-2 path').addClass('show');
            setTimeout(function () {
                $('.lg-body .lg-elm-arm-1 path, .lg-body .lg-elm-arm-2 path').removeClass('show');
            }, 1500);
        }
        //LittleGuy est à gauche
        else if (GuyPosX.left < DivPoxX.left) {
            $('.lg-body .lg-elm-arm-2 path').addClass('show');
            setTimeout(function () {
                $('.lg-body .lg-elm-arm-2 path').removeClass('show');
            }, 1500);
        }
        //Little Guy est à droite
        else {
            $('.lg-body .lg-elm-arm-1 path').addClass('show');
            setTimeout(function () {
                $('.lg-body .lg-elm-arm-1 path').removeClass('show');
            }, 1500);
        }
    },

    //Bubble + hi with arm (not use)
    lg_coucou: function () {
        $('.lg-body .lg-elm-arm-2 path').addClass('coucou');
        setTimeout(function () {
            $('.lg-body .lg-elm-arm-2 path').removeClass('coucou');
        }, 1500);
    }
};