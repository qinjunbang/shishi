/**
 * Created by junbangqin on 2018/7/30.
 */
;(function () {
    // 创建一个对象
    var Carousel = function (poster) {
        var _that = this;
        this.poster = poster; // element
        this.posterItemMain = poster.find("ul.list");
        this.posterItems = poster.find("ul.list").find("li");
        this.posterSpanItems = poster.find(".navs span");

        this.setting = this.getSetting();

        this.setElementStyle();

        this.autoPaly();

        // 触摸开始
        $(this.poster).on("touchstart", function () {

            clearInterval(_that.setting.timer);

           $(_that.posterItemMain).css("transition", "none");


            var left = transformCss(_that.posterItemMain[0], "translateX");
            console.log("left", left);
            console.log("$(window).width", screen.width);
            _that.setting.now = Math.round(-left / screen.width);

            console.log("_that.setting.now", _that.setting.now);

            if (_that.setting.now == 0) {
                _that.setting.now = $(_that.posterItems).length;

            } else if (_that.setting.now == $(_that.posterItems).length - 1) {
                _that.setting.now = $(_that.posterItems).length - 1;
            }
            console.log("_that.setting.now", -_that.setting.now * screen.width);
            console.log("_that.posterItemMain", _that.posterItemMain);

            transformCss(_that.posterItemMain[0], "translateX", -_that.setting.now * screen.width);

            _that.startX = $(this)[0].clientX;
            _that.setting.elementX = transformCss(_that.posterItemMain[0], "translateX");


        });

        // $()
        $(this.poster).on("touchmove", function (event) {
            console.log("touchmove");
            var nowX = $(this)[0].clientX,
                disX = nowX - _that.setting.startX;

            transformCss(_that.posterItemMain[0], "translateX", _that.setting.elementX + disX);

        });

        // $()
        $(this.poster).on("touchend", function (event) {

            console.log("touchend");
            var left = transformCss(_that.posterItemMain[0], "translateX");

            _that.setting.now = Math.round(-left / screen.width);

            if (_that.setting.now < 0) {
                _that.setting.now = 0;
            } else if (_that.setting.now > $(_that.posterItems).length - 1) {
                _that.setting.now = $(_that.posterItems).length -1
            }

            $(_that.posterItems).css("transition", "all .5s");

            // $(_that.posterItems).css("translateX", -_that.setting.now * $(window).width );
            transformCss(_that.posterItemMain[0], "translateX", -_that.setting.now * screen.width );

            _that.autoPaly();
            _that.setSpanNodes();

        })
    };

    // 原型
    Carousel.prototype = {

        autoPaly: function () {
            var _that = this;
            clearInterval(this.setting.timer);
            this.setting.timer = setInterval(function () {
                if (_that.setting.now == $(_that.posterItems).length - 1) {
                    _that.setting.now = $(_that.posterItems).length - 1;
                }

                
                transformCss(_that.posterItemMain[0], "translateX", -_that.setting.now * screen.width);
                

                setTimeout(function () {
                    _that.setting.now++;
                    $(_that.posterItems).css('transition', "all .5s");
                    _that.setSpanNodes();

                } ,20);
            }, 2500);

        },
        setSpanNodes: function () {
            var index = this.setting.now % $(this.posterSpanItems).length;
            $(this.posterSpanItems).eq(index).addClass("active").siblings().removeClass("active");
        },
        setElementStyle: function () {
            var num = $(this.posterItems).length;
            console.log("num", num);
            var bigWidth =  num * 100;
            var smallWidth = 1/num * 100;
            //
            $(this.posterItemMain).css("width", bigWidth + "%");
            $(this.posterItems).css("width", smallWidth + "%");

        },
        // peizhi
        getSetting: function () {
            return {
                elementX: 0,
                startX: 0,
                timer: 0,
                now: 0

            }
        }
    };

    // 初始化
    Carousel.init = function (posters) {
        var _that = this;
        posters.each(function () {
            new _that($(this));
        });
    };

    window["Carousel"] = Carousel;
})(jQuery);