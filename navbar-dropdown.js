// Polyfill para Array.prototype.find
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (a, d, b) {
    a instanceof String && (a = String(a));
    for (let c = a.length, e = 0; e < c; e++) {
        const f = a[e];
        if (d.call(b, f, e, a)) return { i: e, v: f };
    }
    return { i: -1, v: void 0 };
};

$jscomp.polyfill("Array.prototype.find", function (a) {
    return a ? a : function (a, b) {
        return $jscomp.findInternal(this, a, b).v;
    };
}, "es6", "es3");

jQuery(function ($) {
    const classes = {
        IN: "in",
        OPENED: "opened",
        BG_COLOR: "bg-color",
        DROPDOWN_OPEN: "navbar-dropdown-open",
        SHORT: "navbar-short"
    };

    const selectors = {
        BODY: "body",
        BASE: ".navbar-dropdown",
        TOGGLER: '.navbar-toggler[aria-expanded="true"]',
        TRANSPARENT: ".transparent",
        FIXED_TOP: ".navbar-fixed-top"
    };

    let resizeTimeout;

    const handleScrollResize = () => {
        const scrollTop = $(window).scrollTop();
        
        $(selectors.BASE).each(function () {
            const $this = $(this);
            if ($this.is(selectors.FIXED_TOP)) {
                if ($this.is(selectors.TRANSPARENT) && !$this.hasClass(classes.OPENED)) {
                    $this.toggleClass(classes.BG_COLOR, scrollTop <= 0);
                }
                $this.toggleClass(classes.SHORT, scrollTop > 0);
            }
        });
    };

    $(window).on("scroll.bs.navbar-dropdown.data-api resize.bs.navbar-dropdown.data-api", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleScrollResize, 10);
    }).trigger("scroll.bs.navbar-dropdown.data-api");

    $(document).on("click.bs.navbar-dropdown.data-api", selectors.BASE, function (event) {
        event.targetWrapper = this;
    }).on("show.bs.collapse hide.bs.collapse", function (event) {
        $(event.target).closest(selectors.BASE).each(function () {
            const $this = $(this);
            if (event.type === "show") {
                $(selectors.BODY).addClass(classes.DROPDOWN_OPEN);
                $this.addClass(classes.OPENED);
            } else {
                $(selectors.BODY).removeClass(classes.DROPDOWN_OPEN);
                $this.removeClass(classes.OPENED);
                $(window).trigger("scroll.bs.navbar-dropdown.data-api");
                $this.trigger("collapse.bs.navbar-dropdown");
            }
        });
    }).on("collapse.bs.nav-dropdown", function (event) {
        $(event.relatedTarget).closest(selectors.BASE).find(selectors.TOGGLER).trigger("click");
    });

    // Manejo de la animación del menú
    if (!localStorage.getItem("first-time-user")) {
        document.getElementById("burger").classList.add("navbar-animation");
    }

    window.clickedBurger = function () {
        if (!localStorage.getItem("first-time-user")) {
            localStorage.setItem("first-time-user", "true");
        }
        document.getElementById("burger").style.animation = "none";
    };
});
 