/* ==========================================================
 * bootstrap-alert.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
function jobListingSortable() {
    $("#job-listing th").each(function () {
        var e = $(this), t = e.index(), n = !1;
        e.click(function () {
            $("#job-listing").find("td").filter(function () {
                return $(this).index() === t
            }).sortElements(function (e, t) {
                return $.text([e]) > $.text([t]) ? n ? -1 : 1 : n ? 1 : -1
            }, function () {
                return this.parentNode
            }), n = !n
        })
    })
}
function errorAlert(e) {
    var t = $.extend({header: "", body: "", callback: $.noop}, e), n = $("#error-modal");
    t.header && n.find(".modal-header h3").html(t.header), t.body && n.find(".modal-body .alert-error").html("settings.body"), n.modal(), t.callback()
}
function postFilter() {
    $filterRequest != null && $filterRequest.abort();
    var e = {}, t = $(".filter-box"), n = t.data("filter"), r = t.data("url"), i = t.find("form"), s = $(".filter-results");
    e[n] = i.serializeObject(), $filterRequest = $.ajax({
        url: r,
        type: "POST",
        data: e,
        cache: "false",
        context: s,
        beforeSend: function () {
            $('<div class="filter-waiting" />').appendTo(s)
        }
    }).success(function (e) {
        $(this).html(e), n == "calendarFilter" && (addPopups(), calendarMore()), n == "jobFilter" && jobListingSortable()
    }).error(function (e) {
        errorAlert()
    }).complete(function () {
        $(".filter-waiting").remove(), n == "calendarFilter" && $("#cal-date-select").data("updating", "false")
    })
}
function filterSetup() {
    $(".taxon-page").length && $("#related-science").addClass("center vb").css({
        position: "absolute",
        left: "-9000px",
        display: "block"
    }), $(".filter-box select").chosen({disable_search_threshold: "12", width: "100%"}).change(function () {
        postFilter()
    }), $(".filter-input").filterInput({}), $(".taxon-page").length && $("#related-science").removeClass("center vb").css({
        position: "",
        left: "",
        display: ""
    }), $(".filter-box .controls").find('input[type="text"]').parent().filter(':not(".chosen-search")').find("input").keyup(function () {
        delay(function () {
            postFilter()
        }, 500)
    })
}
function carouselSetup(e, t, n) {
    var r = n || "hover", i = $("html").hasClass("touch") ? "false" : r;
    if (e.length) {
        options = {interval: t || 4e3, pause: i};
        var s = e.find(".controls li").length, o = -1;
        e.carousel(options).on("slide", function (t) {
            var n = $(t.relatedTarget).index();
            n < 0 && (o <= 0 ? n = s - 1 : n = 0), e.find(".controls li").removeClass("pager-active").eq(n).addClass("pager-active"), o = n
        }), e.find($(".carousel .controls li")).click(function () {
            $this = $(this);
            if (!$this.hasClass("pager-active")) {
                e.carousel($this.index()), e.carousel({interval: !1});
                var t = e.find($(".carousel .controls .pause"));
                t.hasClass("paused") || (t.click(), e.carousel("pause"))
            }
        }), e.find($(".right-slider-control-bracket a")).click(function () {
            e.carousel("next")
        }), e.find($(".left-slider-control-bracket a")).click(function () {
            e.carousel("prev")
        }), e.swiperight(function () {
            $(this).carousel("prev")
        }), e.swipeleft(function () {
            $(this).carousel("next")
        }), e.find($(".carousel .controls .pause")).click(function () {
            $this = $(this), $this.hasClass("paused") ? e.carousel("cycle").mouseenter() : e.carousel("pause"), $this.toggleClass("paused")
        })
    }
}
function homeCarouselSetup() {
    $fc = $(".feature-carousel"), carouselSetup($fc, 0, "manual"), $fc.carousel("pause")
}
function appendSpinner() {
}
function UpdateQueryString(e, t, n) {
    n || (n = window.location.href);
    var r = new RegExp("([?|&])" + e + "=.*?(&|#|$)", "gi");
    if (n.match(r))return t ? n.replace(r, "$1" + e + "=" + t + "$2") : n.replace(r, "$2");
    if (t) {
        var i = n.indexOf("?") !== -1 ? "&" : "?", s = n.split("#");
        return n = s[0] + i + e + "=" + t, s[1] && (n += "#" + s[1]), n
    }
    return n
}
function getQueryString() {
    var e = {}, t = location.search.substring(1), n = /([^&=]+)=([^&]*)/g, r;
    while (r = n.exec(t))e[decodeURIComponent(r[1])] = decodeURIComponent(r[2]);
    return e
}
function addNewOrRemoveExistingItemFromSet(e, t) {
    var n = !0, r = e.slice();
    for (var i = r.length - 1; i >= 0; i--)r[i] == t && (n = !1, r.splice(i, 1));
    return n && r.push(t), r
}
function arrayToCommaSeparatedList(e) {
    var t = "";
    for (var n = 0; n < e.length; n++)t != "" && (t += ","), t += e[n];
    return t
}
function setupNanoScroll() {
    $(".nano").nanoScroller({iOSNativeScrolling: !0, preventPageScrolling: !0})
}
function checkEmpty(e) {
    $filterItemsGroup = e.closest(".group").find(".filter-items"), $filterItemsGroup.each(function () {
        $this = $(this);
        var e = $this.find("li:not(.search-hidden, .hidden)").length == 0, t = $this.find(".no-items-msg");
        e ? t.removeClass("hide") : t.addClass("hide")
    })
}
function setMenuOpenCookie(e) {
    var t = e.closest(".group");
    if (typeof t != "undefined") {
        var n = t.find(".mega-menu-show"), r = t.find(".taxonomy-type a"), i = t.data("group");
        menu.open = n.is(":checked");
        for (key in menu)key !== "open" && (menu[key].selected = !1);
        typeof menu[i] == "undefined" && (menu[i] = {}), menu[i].selected = !0, menu[i].tab = e.closest(".group").find(".taxonomy-type .selected").data("view"), $.cookie("menu", JSON.stringify(menu), {path: "/"})
    }
}
function updateCalendar(e, t) {
    var n = $("#cal-date-select"), r = n.data("updating");
    if (r == "true")return !1;
    n.data("updating", "true");
    var i = t + "-" + e, s = (new Date(t, e - 2, 1)).getMonth() + 1, o = (new Date(t, e - 2, 1)).getFullYear(), u = o + "-" + s, a = (new Date(t, e, 1)).getMonth() + 1, f = (new Date(t, e, 1)).getFullYear(), l = f + "-" + a;
    $(".filter-box #form-date").val(i), $(".prev-month").data("month", s).data("year", o), $(".next-month").data("month", a).data("year", f);
    var c = "", h = parseInt(t) + 5;
    for (var p = t - 5; p < h; p++)p == t ? c = c + '<option value="' + p + '" selected="selected">' + p + "</option>" : c = c + '<option value="' + p + '">' + p + "</option>";
    $("#year").html(c).trigger("chosen:updated"), $month = $("#month"), $monthOptions = $month.find("option"), $monthOptions.removeAttr("selected").filter('[value="' + parseInt(e, 10) + '"]').attr("selected", "selected"), $month.trigger("chosen:updated");
    var d = $monthOptions.filter(":selected").text(), v = d + " " + t;
    $(".date-string").text(v), $("#title-container h1").text(v);
    var m = $("html");
    m.hasClass("ie7") || m.hasClass("ie8") ? document.title = "Arthrex - " + v : $("title").text("Arthrex - " + v), postFilter()
}
function calendarMore() {
    $("#events ol > li > div").each(function () {
        var e = $(this);
        e.innerHeight() < e.get(0).scrollHeight && e.addClass("overflow").children(".more").show()
    })
}
function addPopups() {
    var e = "hover";
    $("html").hasClass("ie7") && (e = "manual"), $(".cal .event").each(function () {
        $(this).popover({
            delay: {show: 75, hide: 0},
            offset: 10,
            animation: !1,
            html: !0,
            trigger: e,
            template: '<div class="popover cal"><div class="arrow"></div><div class="popover-inner"><span class="close">&times;</span><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
            title: $(this).find("li:first-child").text(),
            content: $(this).html(),
            placement: popoverPlacement($(this))
        })
    }), $(document).on("touchstart", ".popover", function (e) {
        e.stopImmediatePropagation(), e.preventDefault(), $(".popover").hide()
    }), $(document).on("click", ".popover .close", function () {
        $(".popover").hide()
    }), $("html").hasClass("ie7") && ($(document).on("hover", ".overflow", function () {
        $(this).parent().css("position", "static")
    }), $(".calendar").on("mouseenter", ".event", function () {
        $(".popover").hide(), $(this).popover("show")
    }))
}
function popoverPlacement(e) {
    return e.closest("li").hasClass("popover-left") ? Modernizr.touch || $("html").hasClass("ie7") ? "left" : "inside left" : Modernizr.touch || $("html").hasClass("ie7") ? "right" : "inside right"
}
function helpTrialTooltip() {
    $(".help-trial-tooltip").tooltip({template: '<div id="help-trial-tooltip" class="tooltip tooltip-help"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'})
}
function selectFilterMenuItemsFromUrlHash() {
    var e = [], t = -1, n = $('.asset-type li a.show-all-a[data-query="types=all"]'), r = History.getState(), i = r.url.split("?"), s = i.length > 1 ? i[i.length - 1] : "", o = s.toLowerCase().replace("?", "").split("&");
    $.each(o, function (r, i) {
        var s = i.split("="), o = r;
        if ($.isArray(s) && s.length === 2) {
            filterKey = s[0];
            var u = s[1];
            e = decodeURIComponent(u).split(","), $.each(e, function (e, r) {
                if (typeof r != "undefined" && r != "") {
                    t = e;
                    switch (filterKey) {
                        case"types":
                            r.toLowerCase() != "all" && $('.asset-type .media-query li a.show-all-a[data-query="types=all"]').removeClass("selected"), n = $(".asset-type .media-query li a[data-type]").filter(function () {
                                return $(this).attr("data-type").toLowerCase() == r.toLowerCase()
                            }), n.addClass("selected");
                            break;
                        case"taxonomy":
                            r.toLowerCase() != "all" && $('.taxonomy .media-query li a.show-all-a[data-query="taxonomy=all"]').removeClass("selected"), n = $(".taxonomy .media-query li a[data-query]").filter(function () {
                                return $(this).attr("data-query").toLowerCase() == "taxonomy=" + r.toLowerCase()
                            }), n.addClass("selected");
                            break;
                        case"locales":
                            n = $(".language .media-query li a[data-language]").filter(function () {
                                return $(this).attr("data-language").toLowerCase() == r.toLowerCase()
                            }), n.addClass("selected");
                            break;
                        case"time":
                            $(".update .media-query li a[data-query]").removeClass("selected"), $('.update .media-query li a[data-query="time=' + r + '"]').addClass("selected");
                            break;
                        case"sort":
                            $(".sorting .media-query li a[data-query]").removeClass("selected"), $('.sorting .media-query li a[data-query="sort=' + r + '"]').addClass("selected");
                            break;
                        case"hidedetails":
                            $('.meta-info .media-query li a[data-query="hidedetails=true"]').toggleClass("selected", r.toLowerCase() === "true");
                            break;
                        case"hidethumbnails":
                            $('.meta-info .media-query li a[data-query="hidethumbnails=true"]').toggleClass("selected", r.toLowerCase() === "true");
                            break;
                        default:
                    }
                }
            })
        }
    })
}
function prepareMediaFilter() {
    var e = {
        queryArgs: {reset: !1, settings: ",", reloadFrom: {}},
        pageArgs: {multilingual: !1}
    }, t = $("#content").data("taxon");
    typeof t != "undefined" && (e.queryArgs.taxonomy = t), $("#asset-menustyle").data("style") === "sub" ? (e.queryArgs.parenttype = $("#asset-menustyle").data("parenttype"), e.queryArgs.reloadFrom.reloadType = $("#asset-menustyle").data("reloadtype")) : e.queryArgs.reloadFrom.reloadType = $("#asset-menustyle").data("reloadtype");
    var n = "a.selected", r = ".asset-type", i = "type";
    return $(".asset-type").find("a").first().hasClass("selected") && (n = "a"), $(r).find(n).each(function (t) {
        var n = ".asset-group." + $(this).data(i), r = "";
        $(n).length && (r = $(n).find(".asset-group-list .asset-item").last().data("assetrow"), e.queryArgs.reloadFrom[$(this).data(i)] = r)
    }), $(".media-query a.selected").each(function () {
        var t = $(this), n = t.attr("href"), r = t.data("query"), i, s;
        if (!r)return;
        i = r.split("=")[0], s = r.split("=")[1], t.closest("ul").hasClass("single-select") && (e.queryArgs[i] = s), t.closest("ul").hasClass("single-select") ? e.queryArgs[i] = s : e.queryArgs[i] ? e.queryArgs[i] = e.queryArgs[i] + "," + s : e.queryArgs[i] = s
    }), e
}
function filtersChanged(e) {
    $this = e;
    var t = $this.closest(".media-query");
    t.hasClass("single-select") && t.find("a.selected").removeClass("selected"), $this.toggleClass("selected"), mediapost = selectMediaQueryLink($this);
    if (mediapost.queryArgs) {
        var n = "?" + (typeof mediapost.queryArgs.types != "undefined" ? "&types=" + mediapost.queryArgs.types.toLowerCase() : "") + (typeof mediapost.queryArgs.locales != "undefined" ? "&locales=" + mediapost.queryArgs.locales.toLowerCase() : "") + (typeof mediapost.queryArgs.taxonomy != "undefined" ? "&taxonomy=" + mediapost.queryArgs.taxonomy.toLowerCase() : "") + (typeof mediapost.queryArgs.time != "undefined" && $.isNumeric(mediapost.queryArgs.time) ? "&time=" + mediapost.queryArgs.time.toLowerCase() : "") + (typeof mediapost.queryArgs.sort != "undefined" ? "&sort=" + mediapost.queryArgs.sort.toLowerCase() : "") + (typeof mediapost.queryArgs.hidedetails != "undefined" ? "&hidedetails=" + mediapost.queryArgs.hidedetails.toLowerCase() : "") + (typeof mediapost.queryArgs.hidethumbnails != "undefined" ? "&hidethumbnails=" + mediapost.queryArgs.hidethumbnails.toLowerCase() : "");
        n = n.replace("?&", "?"), n = History.emulated.pushState ? n : (window.location.pathname + n).replace("/?", "?"), History.pushState(null, null, n)
    }
}
function selectMediaQueryLink(e) {
    var t = $(e), n = !1, r = !0, i = t.closest(".media-query");
    if (t.hasClass("show-all-a")) {
        var s = t.closest(".show-all");
        t.hasClass("selected") || t.toggleClass("selected"), s.find("a").slice(1).each(function () {
            $(this).removeClass("selected")
        })
    } else if (t.closest("ul.media-query").hasClass("show-all-ul")) {
        var s = t.closest(".show-all"), o = t.closest(".show-all").find("a"), u = o.size() - 1, a = 0, f = 0;
        o.slice(1).each(function () {
            anchor = $(this), anchor.hasClass("selected") ? a++ : (r = !1, f++)
        }), f === u && (r = !0), r || a === u ? (s.find("a").each(function () {
            t.removeClass("selected")
        }), s.find("a").first().addClass("selected")) : s.find("a").first().removeClass("selected")
    }
    var l = prepareMediaFilter();
    return l.pageArgs.container = !0, l.pageArgs.cancelQuery = n, l.pageArgs.mediaMenu = !0, $assetAjax != null && $assetAjax.readyState != "4" ? $assetAjax.abort() : ($("#asset-container").append('<div class="loading"></div>'), i.closest("li").children("h5").append('<img src="/images/loader-sm.gif" width="13" height="13" alt="Loading" class="ajax-spinner" style="margin-left:5px" />')), $assetAjax = $.ajax({
        url: assetHelpers.getResourcePath(),
        data: l,
        cache: !1
    }).done(function (e) {
        $("#asset-container").html(e), $(".ajax-spinner").remove(), $(".loading").remove()
    }), l
}
function setTextPlease(e, t) {
    var n = $(t).css("display") == "block" ? $(e).data("hide-text") : $(e).data("show-text");
    $(e).children("span").text(n)
}
function prepareTagFilter() {
    var e = {assetArgs: {queryArgs: {reset: !1, settings: ",", reloadFrom: {}}, pageArgs: {multilingual: !1}}};
    return $(".tag-query a.selected").each(function () {
        var t = $(this), n = t.attr("href"), r = t.data("query"), i, s;
        if (!r)return;
        i = r.split("=")[0], s = r.split("=")[1], t.closest("ul").hasClass("single-select") && (e.assetArgs.queryArgs[i] = s), t.closest("ul").hasClass("single-select") ? e.assetArgs.queryArgs[i] = s : e.assetArgs.queryArgs[i] ? e.assetArgs.queryArgs[i] = e.assetArgs.queryArgs[i] + "," + s : e.assetArgs.queryArgs[i] = s
    }), e
}
function tooltipHelper(e, t, n, r) {
    n = n || "top", r = r || 2e3, e.tooltip({
        trigger: "manual",
        delay: {show: 250, hide: 250},
        placement: n
    }), e.tooltip().attr("data-original-title", t).tooltip("fixTitle").tooltip("show"), timeoutObj = setTimeout(function () {
        e.tooltip("hide")
    }, r)
}
function isCartEmpty() {
    var e = $(".shopping-cart-count-quote").html(), t = $(".shopping-cart-count-trial").html();
    return e === "0" && t === "0"
}
function setCartCheckoutButton() {
    var e = !0, t = $(".cart-quickcheckout"), n = $(".shopping-cart-count-quote").html(), r = $(".shopping-cart-count-trial").html();
    return isCartEmpty() && (e = !1), e ? t.removeClass("disabled").addClass("btn-primary") : t.removeClass("btn-primary").addClass("disabled"), e
}
function prepareTagFilter() {
    var e = {queryArgs: {}};
    return e
}
function updateArchiveDateValues(e, t) {
    var n = $(".archive-date-select"), r = n.data("updating");
    if (r == "true")return !1;
    n.data("updating", "true");
    var i = t + "-" + e, s = (new Date(t, e - 2, 1)).getMonth() + 1, o = (new Date(t, e - 2, 1)).getFullYear(), u = o + "-" + s, a = (new Date(t, e, 1)).getMonth() + 1, f = (new Date(t, e, 1)).getFullYear(), l = f + "-" + a;
    $("#archiveDate").val(i), $year = $("#year"), $yearOptions = $year.find("option"), $yearSelectedOption = $yearOptions.removeAttr("selected").filter('[value="' + parseInt(t, 10) + '"]'), $yearSelectedOption.length && ($yearSelectedOption.attr("selected", "selected"), $year.trigger("chosen:updated")), $month = $("#month"), $monthOptions = $month.find("option"), $monthOptions.removeAttr("selected").filter('[value="' + parseInt(e, 10) + '"]').attr("selected", "selected"), $month.trigger("chosen:updated"), $yearPreviousOption = $yearOptions.filter('[value="' + parseInt(o, 10) + '"]'), $hasPreviousYearOption = $yearPreviousOption.length > 0, $yearNextOption = $yearOptions.filter('[value="' + parseInt(f, 10) + '"]'), $hasNextYearOption = $yearNextOption.length > 0, $hasPreviousYearOption ? $(".prev-month").data("month", s).data("year", o).removeAttr("disabled") : $(".prev-month").attr("disabled", "disabled"), $hasNextYearOption ? $(".next-month").data("month", a).data("year", f).removeAttr("disabled") : $(".next-month").attr("disabled", "disabled");
    var c = $monthOptions.filter(":selected").text(), h = c + " " + t;
    $(".date-string").text(h), $(".archive-list-heading").text(h), $("#title-container h1").text(h);
    var p = $("html");
    p.hasClass("ie7") || p.hasClass("ie8") ? document.title = "Arthrex - " + h : $("title").text("Arthrex - " + h), postArchiveForm()
}
function postArchiveForm() {
    $filterRequest != null && $filterRequest.abort();
    var e = {}, t = $("#archiveForm");
    filterName = t.data("filter"), url = t.data("url"), $resultsContainer = $(".filter-results"), $filterRequest = $.ajax({
        url: url,
        type: "POST",
        data: t.serialize(),
        cache: "false",
        context: $resultsContainer,
        beforeSend: function () {
            $('<div class="filter-waiting" />').appendTo($resultsContainer), $(".archive-date-select").data("updating", "true")
        }
    }).success(function (e) {
        $(this).html(e), addPopupArchive()
    }).error(function (e) {
        errorAlert()
    }).complete(function () {
        $(".filter-waiting").remove(), $(".archive-date-select").data("updating", "false")
    })
}
function addPopupArchive() {
    var e = "hover";
    $("html").hasClass("ie7") && (e = "manual"), $(".title-popup").each(function () {
        $(this).popover({
            template: '<div class="popover archive"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
            delay: {show: 75, hide: 0},
            offset: 10,
            animation: !1,
            html: !0,
            trigger: e,
            title: $(this).find("li:first-child").text(),
            content: $(this).html(),
            placement: "bottom"
        })
    }), $(document).on("touchstart", ".popover", function (e) {
        e.stopImmediatePropagation(), e.preventDefault(), $(".popover").hide()
    }), $(document).on("click", ".popover .close", function () {
        $(".popover").hide()
    }), $("html").hasClass("ie7") && ($(document).on("hover", ".overflow", function () {
        $(this).parent().css("position", "static")
    }), $(".calendar").on("mouseenter", ".event", function () {
        $(".popover").hide(), $(this).popover("show")
    }))
}
function prepareTagFilter() {
    var e = {queryArgs: {}};
    return e
}
function prepareTagFilter() {
    var e = {queryArgs: {}};
    return e
}
!function (e) {
    "use strict";
    var t = '[data-dismiss="alert"]', n = function (n) {
        e(n).on("click", t, this.close)
    };
    n.prototype.close = function (t) {
        function s() {
            i.trigger("closed").remove()
        }

        var n = e(this), r = n.attr("data-target"), i;
        r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), i = e(r), t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = e.Event("close"));
        if (t.isDefaultPrevented())return;
        i.removeClass("in"), e.support.transition && i.hasClass("fade") ? i.on(e.support.transition.end, s) : s()
    }, e.fn.alert = function (t) {
        return this.each(function () {
            var r = e(this), i = r.data("alert");
            i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e(function () {
        e("body").on("click.alert.data-api", t, n.prototype.close)
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function (e) {
        var t = "disabled", n = this.$element, r = n.data(), i = n.is("input") ? "val" : "html";
        e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function () {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function () {
        var e = this.$element.parent('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    }, e.fn.button = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("button"), s = typeof n == "object" && n;
            i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {loadingText: "loading..."}, e.fn.button.Constructor = t, e(function () {
        e("body").on("click.button.data-api", "[data-toggle^=button]", function (t) {
            var n = e(t.target);
            n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = n, this.options.slide && this.slide(this.options.slide), this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.prototype = {
        cycle: function (t) {
            return t || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
        }, to: function (t) {
            var n = this.$element.find(".item.active"), r = n.parent().children(), i = r.index(n), s = this;
            if (t > r.length - 1 || t < 0)return;
            return this.sliding ? this.$element.one("slid", function () {
                s.to(t)
            }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", e(r[t]))
        }, pause: function (t) {
            return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
        }, next: function () {
            if (this.sliding)return;
            return this.slide("next")
        }, prev: function () {
            if (this.sliding)return;
            return this.slide("prev")
        }, slide: function (t, n) {
            var r = this.$element.find(".item.active"), i = n || r[t](), s = this.interval, o = t == "next" ? "left" : "right", u = t == "next" ? "first" : "last", a = this, f = e.Event("slide", {relatedTarget: i[0]});
            this.sliding = !0, s && this.pause(), i = i.length ? i : this.$element.find(".item")[u]();
            if (i.hasClass("active"))return;
            if (e.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())return;
                i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), this.$element.one(e.support.transition.end, function () {
                    i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding = !1, setTimeout(function () {
                        a.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())return;
                r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return s && this.cycle(), this
        }
    }, e.fn.carousel = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("carousel"), s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n), o = typeof n == "string" ? n : s.slide;
            i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.cycle()
        })
    }, e.fn.carousel.defaults = {interval: 5e3, pause: "hover"}, e.fn.carousel.Constructor = t, e(function () {
        e("body").on("click.carousel.data-api", "[data-slide]", function (t) {
            var n = e(this), r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")), s = !i.data("modal") && e.extend({}, i.data(), n.data());
            i.carousel(s), t.preventDefault()
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t, dimension: function () {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        }, show: function () {
            var t, n, r, i;
            if (this.transitioning)return;
            t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (r && r.length) {
                i = r.data("collapse");
                if (i && i.transitioning)return;
                r.collapse("hide"), i || r.data("collapse", null)
            }
            this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), this.$element[t](this.$element[0][n])
        }, hide: function () {
            var t;
            if (this.transitioning)return;
            t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
        }, reset: function (e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass" : "removeClass"]("collapse"), this
        }, transition: function (t, n, r) {
            var i = this, s = function () {
                n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
            };
            this.$element.trigger(n);
            if (n.isDefaultPrevented())return;
            this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
        }, toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    }, e.fn.collapse = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("collapse"), s = typeof n == "object" && n;
            i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.collapse.defaults = {toggle: !0}, e.fn.collapse.Constructor = t, e(function () {
        e("body").on("click.collapse.data-api", "[data-toggle=collapse]", function (t) {
            var n = e(this), r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""), s = e(i).data("collapse") ? "toggle" : n.data();
            e(i).collapse(s)
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    function r() {
        e(t).parent().removeClass("open")
    }

    var t = '[data-toggle="dropdown"]', n = function (t) {
        var n = e(t).on("click.dropdown.data-api", this.toggle);
        e("html").on("click.dropdown.data-api", function () {
            n.parent().removeClass("open")
        })
    };
    n.prototype = {
        constructor: n, toggle: function (t) {
            var n = e(this), i, s, o;
            if (n.is(".disabled, :disabled"))return;
            return s = n.attr("data-target"), s || (s = n.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), i = e(s), i.length || (i = n.parent()), o = i.hasClass("open"), r(), o || i.toggleClass("open"), !1
        }
    }, e.fn.dropdown = function (t) {
        return this.each(function () {
            var r = e(this), i = r.data("dropdown");
            i || r.data("dropdown", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.dropdown.Constructor = n, e(function () {
        e("html").on("click.dropdown.data-api", r), e("body").on("click.dropdown", ".dropdown form", function (e) {
            e.stopPropagation()
        }).on("click.dropdown.data-api", t, n.prototype.toggle)
    })
}(window.jQuery), !function (e) {
    "use strict";
    function n() {
        var t = this, n = setTimeout(function () {
            t.$element.off(e.support.transition.end), r.call(t)
        }, 500);
        this.$element.one(e.support.transition.end, function () {
            clearTimeout(n), r.call(t)
        })
    }

    function r(e) {
        this.$element.hide().trigger("hidden"), i.call(this)
    }

    function i(t) {
        var n = this, r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var i = e.support.transition && r;
            this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.options.backdrop != "static" && this.$backdrop.click(e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), i ? this.$backdrop.one(e.support.transition.end, t) : t()
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, e.proxy(s, this)) : s.call(this)) : t && t()
    }

    function s() {
        this.$backdrop.remove(), this.$backdrop = null
    }

    function o() {
        var t = this;
        this.isShown && this.options.keyboard ? e(document).on("keyup.dismiss.modal", function (e) {
            e.which == 27 && t.hide()
        }) : this.isShown || e(document).off("keyup.dismiss.modal")
    }

    var t = function (t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this))
    };
    t.prototype = {
        constructor: t, toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function () {
            var t = this, n = e.Event("show");
            this.$element.trigger(n);
            if (this.isShown || n.isDefaultPrevented())return;
            e("body").addClass("modal-open"), this.isShown = !0, o.call(this), i.call(this, function () {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in"), n ? t.$element.one(e.support.transition.end, function () {
                    t.$element.trigger("shown")
                }) : t.$element.trigger("shown")
            })
        }, hide: function (t) {
            t && t.preventDefault();
            var i = this;
            t = e.Event("hide"), this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented())return;
            this.isShown = !1, e("body").removeClass("modal-open"), o.call(this), this.$element.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? n.call(this) : r.call(this)
        }
    }, e.fn.modal = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("modal"), s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {backdrop: !0, keyboard: !0, show: !0}, e.fn.modal.Constructor = t, e(function () {
        e("body").on("click.modal.data-api", '[data-toggle="modal"]', function (t) {
            var n = e(this), r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")), s = i.data("modal") ? "toggle" : e.extend({}, i.data(), n.data());
            t.preventDefault(), i.modal(s)
        })
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t, init: function (t, n, r) {
            var i, s;
            this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, this.options.trigger == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : this.options.trigger != "manual" && (i = this.options.trigger == "hover" ? "mouseenter" : "focus", s = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this))), this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, getOptions: function (t) {
            return t = e.extend({}, e.fn[this.type].defaults, t, this.$element.data()), t.delay && typeof t.delay == "number" && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        }, enter: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            if (!n.options.delay || !n.options.delay.show)return n.show();
            clearTimeout(this.timeout), n.hoverState = "in", this.timeout = setTimeout(function () {
                n.hoverState == "in" && n.show()
            }, n.options.delay.show)
        }, leave: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            this.timeout && clearTimeout(this.timeout);
            if (!n.options.delay || !n.options.delay.hide)return n.hide();
            n.hoverState = "out", this.timeout = setTimeout(function () {
                n.hoverState == "out" && n.hide()
            }, n.options.delay.hide)
        }, show: function () {
            var e, t, n, r, i, s, o;
            if (this.hasContent() && this.enabled) {
                e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, t = /in/.test(s), e.remove().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).appendTo(t ? this.$element : document.body), n = this.getPosition(t), r = e[0].offsetWidth, i = e[0].offsetHeight;
                switch (t ? s.split(" ")[1] : s) {
                    case"bottom":
                        o = {top: n.top + n.height, left: n.left + n.width / 2 - r / 2};
                        break;
                    case"top":
                        o = {top: n.top - i, left: n.left + n.width / 2 - r / 2};
                        break;
                    case"left":
                        o = {top: n.top + n.height / 2 - i / 2, left: n.left - r};
                        break;
                    case"right":
                        o = {top: n.top + n.height / 2 - i / 2, left: n.left + n.width}
                }
                e.css(o).addClass(s).addClass("in")
            }
        }, setContent: function () {
            var e = this.tip(), t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
        }, hide: function () {
            function r() {
                var t = setTimeout(function () {
                    n.off(e.support.transition.end).remove()
                }, 500);
                n.one(e.support.transition.end, function () {
                    clearTimeout(t), n.remove()
                })
            }

            var t = this, n = this.tip();
            return n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? r() : n.remove(), this
        }, fixTitle: function () {
            var e = this.$element;
            (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").removeAttr("title")
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function (t) {
            return e.extend({}, t ? {top: 0, left: 0} : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        }, getTitle: function () {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
        }, tip: function () {
            return this.$tip = this.$tip || e(this.options.template)
        }, validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function () {
            this[this.tip().hasClass("in") ? "hide" : "show"]()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }, e.fn.tooltip = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("tooltip"), s = typeof n == "object" && n;
            i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !0
    }
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
        constructor: t, setContent: function () {
            var e = this.tip(), t = this.getTitle(), n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content > *")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
        }, hasContent: function () {
            return this.getTitle() || this.getContent()
        }, getContent: function () {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-content") || (typeof n.content == "function" ? n.content.call(t[0]) : n.content), e
        }, tip: function () {
            return this.$tip || (this.$tip = e(this.options.template)), this.$tip
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData
            (this.type)
        }
    }), e.fn.popover = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("popover"), s = typeof n == "object" && n;
            i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })
}(window.jQuery), !function (e) {
    "use strict";
    var t = function (t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t, show: function () {
            var t = this.element, n = t.closest("ul:not(.dropdown-menu)"), r = t.attr("data-target"), i, s, o;
            r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
            if (t.parent("li").hasClass("active"))return;
            i = n.find(".active a").last()[0], o = e.Event("show", {relatedTarget: i}), t.trigger(o);
            if (o.isDefaultPrevented())return;
            s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function () {
                t.trigger({type: "shown", relatedTarget: i})
            })
        }, activate: function (t, n, r) {
            function o() {
                i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
            }

            var i = n.find("> .active"), s = r && e.support.transition && i.hasClass("fade");
            s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
        }
    }, e.fn.tab = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("tab");
            i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
        })
    }, e.fn.tab.Constructor = t, e(function () {
        e("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
            t.preventDefault(), e(this).tab("show")
        })
    })
}(window.jQuery), !function (e) {
    e(function () {
        "use strict";
        e.support.transition = function () {
            var e = function () {
                var e = document.createElement("bootstrap"), t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    msTransition: "MSTransitionEnd",
                    transition: "transitionend"
                }, n;
                for (n in t)if (e.style[n] !== undefined)return t[n]
            }();
            return e && {end: e}
        }()
    })
}(window.jQuery), function (e) {
    function c() {
        n.setAttribute("content", s), o = !0
    }

    function h() {
        n.setAttribute("content", i), o = !1
    }

    function p(t) {
        l = t.accelerationIncludingGravity, u = Math.abs(l.x), a = Math.abs(l.y), f = Math.abs(l.z), !e.orientation && (u > 7 || (f > 6 && a < 8 || f < 8 && a > 6) && u > 5) ? o && h() : o || c()
    }

    if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1))return;
    var t = e.document;
    if (!t.querySelector)return;
    var n = t.querySelector("meta[name=viewport]"), r = n && n.getAttribute("content"), i = r + ",maximum-scale=1", s = r + ",maximum-scale=10", o = !0, u, a, f, l;
    if (!n)return;
    e.addEventListener("orientationchange", c, !1), e.addEventListener("devicemotion", p, !1)
}(this), function (e) {
    "use strict";
    e.picturefill = function () {
        var t = e.document.getElementsByTagName("div");
        for (var n = 0, r = t.length; n < r; n++)if (t[n].getAttribute("data-picture") !== null) {
            var i = t[n].getElementsByTagName("div"), s = [];
            for (var o = 0, u = i.length; o < u; o++) {
                var a = i[o].getAttribute("data-media");
                (!a || e.matchMedia && e.matchMedia(a).matches) && s.push(i[o])
            }
            var f = t[n].getElementsByTagName("img")[0];
            s.length ? (f || (f = e.document.createElement("img"), f.alt = t[n].getAttribute("data-alt"), t[n].appendChild(f)), f.src = s.pop().getAttribute("data-src")) : f && t[n].removeChild(f)
        }
    }, e.addEventListener ? (e.addEventListener("resize", e.picturefill, !1), e.addEventListener("DOMContentLoaded", function () {
        e.picturefill(), e.removeEventListener("load", e.picturefill, !1)
    }, !1), e.addEventListener("load", e.picturefill, !1)) : e.attachEvent && e.attachEvent("onload", e.picturefill)
}(this), function (e, t, n) {
    typeof define == "function" && define.amd ? define(["jquery"], function (r) {
        return n(r, e, t), r.mobile
    }) : n(e.jQuery, e, t)
}(this, document, function (e, t, n, r) {
    (function (e) {
        e.event.special.throttledresize = {
            setup: function () {
                e(this).bind("resize", n)
            }, teardown: function () {
                e(this).unbind("resize", n)
            }
        };
        var t = 250, n = function () {
            s = (new Date).getTime(), o = s - r, o >= t ? (r = s, e(this).trigger("throttledresize")) : (i && clearTimeout(i), i = setTimeout(n, t - o))
        }, r = 0, i, s, o
    })(e), function (e, n) {
        e.extend(e.support, {orientation: "orientation"in t && "onorientationchange"in t})
    }(e), function (e, t) {
        function d() {
            var e = o();
            e !== u && (u = e, r.trigger(i))
        }

        var r = e(t), i = "orientationchange", s, o, u, a, f, l = {0: !0, 180: !0};
        if (e.support.orientation) {
            var c = t.innerWidth || e(t).width(), h = t.innerHeight || e(t).height(), p = 50;
            a = c > h && c - h > p, f = l[t.orientation];
            if (a && f || !a && !f)l = {"-90": !0, 90: !0}
        }
        e.event.special.orientationchange = e.extend({}, e.event.special.orientationchange, {
            setup: function () {
                if (e.support.orientation && !e.event.special.orientationchange.disabled)return !1;
                u = o(), r.bind("throttledresize", d)
            }, teardown: function () {
                if (e.support.orientation && !e.event.special.orientationchange.disabled)return !1;
                r.unbind("throttledresize", d)
            }, add: function (e) {
                var t = e.handler;
                e.handler = function (e) {
                    return e.orientation = o(), t.apply(this, arguments)
                }
            }
        }), e.event.special.orientationchange.orientation = o = function () {
            var r = !0, i = n.documentElement;
            return e.support.orientation ? r = l[t.orientation] : r = i && i.clientWidth / i.clientHeight < 1.1, r ? "portrait" : "landscape"
        }, e.fn[i] = function (e) {
            return e ? this.bind(i, e) : this.trigger(i)
        }, e.attrFn && (e.attrFn[i] = !0)
    }(e, this), function (e, t) {
        var r = {touch: "ontouchend"in n};
        e.mobile = e.mobile || {}, e.mobile.support = e.mobile.support || {}, e.extend(e.support, r), e.extend(e.mobile.support, r)
    }(e), function (e, t, n, r) {
        function x(e) {
            while (e && typeof e.originalEvent != "undefined")e = e.originalEvent;
            return e
        }

        function T(t, n) {
            var i = t.type, s, o, a, l, c, h, p, d, v;
            t = e.Event(t), t.type = n, s = t.originalEvent, o = e.event.props, i.search(/^(mouse|click)/) > -1 && (o = f);
            if (s)for (p = o.length, l; p;)l = o[--p], t[l] = s[l];
            i.search(/mouse(down|up)|click/) > -1 && !t.which && (t.which = 1);
            if (i.search(/^touch/) !== -1) {
                a = x(s), i = a.touches, c = a.changedTouches, h = i && i.length ? i[0] : c && c.length ? c[0] : r;
                if (h)for (d = 0, v = u.length; d < v; d++)l = u[d], t[l] = h[l]
            }
            return t
        }

        function N(t) {
            var n = {}, r, s;
            while (t) {
                r = e.data(t, i);
                for (s in r)r[s] && (n[s] = n.hasVirtualBinding = !0);
                t = t.parentNode
            }
            return n
        }

        function C(t, n) {
            var r;
            while (t) {
                r = e.data(t, i);
                if (r && (!n || r[n]))return t;
                t = t.parentNode
            }
            return null
        }

        function k() {
            g = !1
        }

        function L() {
            g = !0
        }

        function A() {
            E = 0, v.length = 0, m = !1, L()
        }

        function O() {
            k()
        }

        function M() {
            _(), c = setTimeout(function () {
                c = 0, A()
            }, e.vmouse.resetTimerDuration)
        }

        function _() {
            c && (clearTimeout(c), c = 0)
        }

        function D(t, n, r) {
            var i;
            if (r && r[t] || !r && C(n.target, t))i = T(n, t), e(n.target).trigger(i);
            return i
        }

        function P(t) {
            var n = e.data(t.target, s);
            if (!m && (!E || E !== n)) {
                var r = D("v" + t.type, t);
                r && (r.isDefaultPrevented() && t.preventDefault(), r.isPropagationStopped() && t.stopPropagation(), r.isImmediatePropagationStopped() && t.stopImmediatePropagation())
            }
        }

        function H(t) {
            var n = x(t).touches, r, i;
            if (n && n.length === 1) {
                r = t.target, i = N(r);
                if (i.hasVirtualBinding) {
                    E = w++, e.data(r, s, E), _(), O(), d = !1;
                    var o = x(t).touches[0];
                    h = o.pageX, p = o.pageY, D("vmouseover", t, i), D("vmousedown", t, i)
                }
            }
        }

        function B(e) {
            if (g)return;
            d || D("vmousecancel", e, N(e.target)), d = !0, M()
        }

        function j(t) {
            if (g)return;
            var n = x(t).touches[0], r = d, i = e.vmouse.moveDistanceThreshold, s = N(t.target);
            d = d || Math.abs(n.pageX - h) > i || Math.abs(n.pageY - p) > i, d && !r && D("vmousecancel", t, s), D("vmousemove", t, s), M()
        }

        function F(e) {
            if (g)return;
            L();
            var t = N(e.target), n;
            D("vmouseup", e, t);
            if (!d) {
                var r = D("vclick", e, t);
                r && r.isDefaultPrevented() && (n = x(e).changedTouches[0], v.push({
                    touchID: E,
                    x: n.clientX,
                    y: n.clientY
                }), m = !0)
            }
            D("vmouseout", e, t), d = !1, M()
        }

        function I(t) {
            var n = e.data(t, i), r;
            if (n)for (r in n)if (n[r])return !0;
            return !1
        }

        function q() {
        }

        function R(t) {
            var n = t.substr(1);
            return {
                setup: function (r, s) {
                    I(this) || e.data(this, i, {});
                    var o = e.data(this, i);
                    o[t] = !0, l[t] = (l[t] || 0) + 1, l[t] === 1 && b.bind(n, P), e(this).bind(n, q), y && (l.touchstart = (l.touchstart || 0) + 1, l.touchstart === 1 && b.bind("touchstart", H).bind("touchend", F).bind("touchmove", j).bind("scroll", B))
                }, teardown: function (r, s) {
                    --l[t], l[t] || b.unbind(n, P), y && (--l.touchstart, l.touchstart || b.unbind("touchstart", H).unbind("touchmove", j).unbind("touchend", F).unbind("scroll", B));
                    var o = e(this), u = e.data(this, i);
                    u && (u[t] = !1), o.unbind(n, q), I(this) || o.removeData(i)
                }
            }
        }

        var i = "virtualMouseBindings", s = "virtualTouchID", o = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "), u = "clientX clientY pageX pageY screenX screenY".split(" "), a = e.event.mouseHooks ? e.event.mouseHooks.props : [], f = e.event.props.concat(a), l = {}, c = 0, h = 0, p = 0, d = !1, v = [], m = !1, g = !1, y = "addEventListener"in n, b = e(n), w = 1, E = 0, S;
        e.vmouse = {moveDistanceThreshold: 10, clickDistanceThreshold: 10, resetTimerDuration: 1500};
        for (var U = 0; U < o.length; U++)e.event.special[o[U]] = R(o[U]);
        y && n.addEventListener("click", function (t) {
            var n = v.length, r = t.target, i, o, u, a, f, l;
            if (n) {
                i = t.clientX, o = t.clientY, S = e.vmouse.clickDistanceThreshold, u = r;
                while (u) {
                    for (a = 0; a < n; a++) {
                        f = v[a], l = 0;
                        if (u === r && Math.abs(f.x - i) < S && Math.abs(f.y - o) < S || e.data(u, s) === f.touchID) {
                            t.preventDefault(), t.stopPropagation();
                            return
                        }
                    }
                    u = u.parentNode
                }
            }
        }, !0)
    }(e, t, n), function (e, t, r) {
        function f(t, n, r) {
            var i = r.type;
            r.type = n, e.event.handle.call(t, r), r.type = i
        }

        e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function (t, n) {
            e.fn[n] = function (e) {
                return e ? this.bind(n, e) : this.trigger(n)
            }, e.attrFn && (e.attrFn[n] = !0)
        });
        var i = e.mobile.support.touch, s = "touchmove scroll", o = i ? "touchstart" : "mousedown", u = i ? "touchend" : "mouseup", a = i ? "touchmove" : "mousemove";
        e.event.special.scrollstart = {
            enabled: !0, setup: function () {
                function o(e, n) {
                    r = n, f(t, r ? "scrollstart" : "scrollstop", e)
                }

                var t = this, n = e(t), r, i;
                n.bind(s, function (t) {
                    if (!e.event.special.scrollstart.enabled)return;
                    r || o(t, !0), clearTimeout(i), i = setTimeout(function () {
                        o(t, !1)
                    }, 50)
                })
            }
        }, e.event.special.tap = {
            tapholdThreshold: 750, setup: function () {
                var t = this, r = e(t);
                r.bind("vmousedown", function (i) {
                    function a() {
                        clearTimeout(u)
                    }

                    function l() {
                        a(), r.unbind("vclick", c).unbind("vmouseup", a), e(n).unbind("vmousecancel", l)
                    }

                    function c(e) {
                        l(), s === e.target && f(t, "tap", e)
                    }

                    if (i.which && i.which !== 1)return !1;
                    var s = i.target, o = i.originalEvent, u;
                    r.bind("vmouseup", a).bind("vclick", c), e(n).bind("vmousecancel", l), u = setTimeout(function () {
                        f(t, "taphold", e.Event("taphold", {target: s}))
                    }, e.event.special.tap.tapholdThreshold)
                })
            }
        }, e.event.special.swipe = {
            scrollSupressionThreshold: 50,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 20,
            verticalDistanceThreshold: 10,
            setup: function () {
                var t = this, n = e(t);
                n.bind(o, function (t) {
                    function f(t) {
                        if (!s)return;
                        var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t;
                        o = {
                            time: (new Date).getTime(),
                            coords: [n.pageX, n.pageY]
                        }, Math.abs(s.coords[0] - o.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault()
                    }

                    var i = t.originalEvent.touches ? t.originalEvent.touches[0] : t, s = {
                        time: (new Date).getTime(),
                        coords: [i.pageX, i.pageY],
                        origin: e(t.target)
                    }, o;
                    n.bind(a, f).one(u, function (t) {
                        n.unbind(a, f), s && o && o.time - s.time < e.event.special.swipe.durationThreshold && Math.abs(s.coords[0] - o.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(s.coords[1] - o.coords[1]) < e.event.special.swipe.verticalDistanceThreshold && s.origin.trigger("swipe").trigger(s.coords[0] > o.coords[0] ? "swipeleft" : "swiperight"), s = o = r
                    })
                })
            }
        }, e.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe",
            swiperight: "swipe"
        }, function (t, n) {
            e.event.special[t] = {
                setup: function () {
                    e(this).bind(n, e.noop)
                }
            }
        })
    }(e, this)
}), "use strict", function (e, t, n) {
    function s(t) {
        var n = e(t), r = n.val(), i = n.val("").height(), s = t.scrollHeight, o = s > i ? s - i : 0;
        return n.data("minHeight", i), n.data("scrollOffset", o), e.browser.msie && n.css("overflow-y", "hidden").scroll(function () {
            this.scrollTop = 0
        }), n.val(r)
    }

    function o() {
        var t = e(this), r = t.height(), i = t.data("scrollOffset"), s = t.data("minHeight"), o = n.scrollTop(), u, a;
        e.browser.msie || t.height(s), a = t.prop("scrollHeight") || 98, u = a - i, t.height(u), n.scrollTop(o), r !== u && t.trigger("autoresize:resize", u)
    }

    function u() {
        s(this).bind(i, o), o.call(this)
    }

    var r = "textarea", i = "keyup change paste input";
    t.autoResize = function () {
        return this.filter(r).each(u)
    }
}(jQuery, jQuery.fn, jQuery(window)), function () {
    var e, t, n, r, i, s = {}.hasOwnProperty, o = function (e, t) {
        function r() {
            this.constructor = e
        }

        for (var n in t)s.call(t, n) && (e[n] = t[n]);
        return r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype, e
    };
    r = function () {
        function e() {
            this.options_index = 0, this.parsed = []
        }

        return e.prototype.add_node = function (e) {
            return e.nodeName.toUpperCase() === "OPTGROUP" ? this.add_group(e) : this.add_option(e)
        }, e.prototype.add_group = function (e) {
            var t, n, r, i, s, o;
            t = this.parsed.length, this.parsed.push({
                array_index: t,
                group: !0,
                label: this.escapeExpression(e.label),
                children: 0,
                disabled: e.disabled
            }), s = e.childNodes, o = [];
            for (r = 0, i = s.length; r < i; r++)n = s[r], o.push(this.add_option(n, t, e.disabled));
            return o
        }, e.prototype.add_option = function (e, t, n) {
            if (e.nodeName.toUpperCase() === "OPTION")return e.text !== "" ? (t != null && (this.parsed[t].children += 1), this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                value: e.value,
                text: e.text,
                html: e.innerHTML,
                selected: e.selected,
                disabled: n === !0 ? n : e.disabled,
                group_array_index: t,
                classes: e.className,
                style: e.style.cssText
            })) : this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                empty: !0
            }), this.options_index += 1
        }, e.prototype.escapeExpression = function (e) {
            var t, n;
            return e == null || e === !1 ? "" : /[\&\<\>\"\'\`]/.test(e) ? (t = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            }, n = /&(?!\w+;)|[\<\>\"\'\`]/g, e.replace(n, function (e) {
                return t[e] || "&amp;"
            })) : e
        }, e
    }(), r.select_to_array = function (e) {
        var t, n, i, s, o;
        n = new r, o = e.childNodes;
        for (i = 0, s = o.length; i < s; i++)t = o[i], n.add_node(t);
        return n.parsed
    }, t = function () {
        function e(t, n) {
            this.form_field = t, this.options = n != null ? n : {};
            if (!e.browser_is_supported())return;
            this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers()
        }

        return e.prototype.set_default_values = function () {
            var e = this;
            return this.click_test_action = function (t) {
                return e.test_active_click(t)
            }, this.activate_action = function (t) {
                return e.activate_field(t)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.allow_single_deselect = this.options.allow_single_deselect != null && this.form_field.options[0] != null && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : !0, this.group_search = this.options.group_search != null ? this.options.group_search : !0, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : !0, this.max_selected_options = this.options.max_selected_options || Infinity, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : !0, this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : !0
        }, e.prototype.set_default_text = function () {
            return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || e.default_multiple_text : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || e.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || e.default_no_result_text
        }, e.prototype.mouse_enter = function () {
            return this.mouse_on_container = !0
        }, e.prototype.mouse_leave = function () {
            return this.mouse_on_container = !1
        }, e.prototype.input_focus = function (e) {
            var t = this;
            if (this.is_multiple) {
                if (!this.active_field)return setTimeout(function () {
                    return t.container_mousedown()
                }, 50)
            } else if (!this.active_field)return this.activate_field()
        }, e.prototype.input_blur = function (e) {
            var t = this;
            if (!this.mouse_on_container)return this.active_field = !1, setTimeout(function () {
                return t.blur_test()
            }, 100)
        }, e.prototype.results_option_build = function (e) {
            var t, n, r, i, s;
            t = "", s = this.results_data;
            for (r = 0, i = s.length; r < i; r++) {
                n = s[r], n.group ? t += this.result_add_group(n) : t += this.result_add_option(n);
                if (e != null ? e.first : void 0)n.selected && this.is_multiple ? this.choice_build(n) : n.selected && !this.is_multiple && this.single_set_selected_text(n.text)
            }
            return t
        }, e.prototype.result_add_option = function (e) {
            var t, n;
            return e.search_match ? this.include_option_in_results(e) ? (t = [], !e.disabled && (!e.selected || !this.is_multiple) && t.push("active-result"), e.disabled && (!e.selected || !this.is_multiple) && t.push("disabled-result"), e.selected && t.push("result-selected"), e.group_array_index != null && t.push("group-option"), e.classes !== "" && t.push(e.classes), n = document.createElement("li"), n.className = t.join(" "), n.style.cssText = e.style, n.setAttribute("data-option-array-index", e.array_index), n.innerHTML = e.search_text, this.outerHTML(n)) : "" : ""
        }, e.prototype.result_add_group = function (e) {
            var t;
            return !e.search_match && !e.group_match ? "" : e.active_options > 0 ? (t = document.createElement("li"), t.className = "group-result", t.innerHTML = e.search_text, this.outerHTML(t)) : ""
        }, e.prototype.results_update_field = function () {
            this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build();
            if (this.results_showing)return this.winnow_results()
        }, e.prototype.reset_single_select_options = function () {
            var e, t, n, r, i;
            r = this.results_data, i = [];
            for (t = 0, n = r.length; t < n; t++)e = r[t], e.selected ? i.push(e.selected = !1) : i.push(void 0);
            return i
        }, e.prototype.results_toggle = function () {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, e.prototype.results_search = function (e) {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, e.prototype.winnow_results = function () {
            var e, t, n, r, i, s, o, u, a, f, l, c, h;
            this.no_results_clear(), i = 0, o = this.get_search_text(), e = o.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), r = this.search_contains ? "" : "^", n = new RegExp(r + e, "i"), f = new RegExp(e, "i"), h = this.results_data;
            for (l = 0, c = h.length; l < c; l++) {
                t = h[l], t.search_match = !1, s = null;
                if (this.include_option_in_results(t)) {
                    t.group && (t.group_match = !1, t.active_options = 0), t.group_array_index != null && this.results_data[t.group_array_index] && (s = this.results_data[t.group_array_index], s.active_options === 0 && s.search_match && (i += 1), s.active_options += 1);
                    if (!t.group || !!this.group_search)t.search_text = t.group ? t.label : t.html, t.search_match = this.search_string_match(t.search_text, n), t.search_match && !t.group && (i += 1), t.search_match ? (o.length && (u = t.search_text.search(f), a = t.search_text.substr(0, u + o.length) + "</em>" + t.search_text.substr(u + o.length), t.search_text = a.substr(0, u) + "<em>" + a.substr(u)), s != null && (s.group_match = !0)) : t.group_array_index != null && this.results_data[t.group_array_index].search_match && (t.search_match = !0)
                }
            }
            return this.result_clear_highlight(), i < 1 && o.length ? (this.update_results_content(""), this.no_results(o)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
        }, e.prototype.search_string_match = function (e, t) {
            var n, r, i, s;
            if (t.test(e))return !0;
            if (this.enable_split_word_search && (e.indexOf(" ") >= 0 || e.indexOf("[") === 0)) {
                r = e.replace(/\[|\]/g, "").split(" ");
                if (r.length)for (i = 0, s = r.length; i < s; i++) {
                    n = r[i];
                    if (t.test(n))return !0
                }
            }
        }, e.prototype.choices_count = function () {
            var e, t, n, r;
            if (this.selected_option_count != null)return this.selected_option_count;
            this.selected_option_count = 0, r = this.form_field.options;
            for (t = 0, n = r.length; t < n; t++)e = r[t], e.selected && (this.selected_option_count += 1);
            return this.selected_option_count
        }, e.prototype.choices_click = function (e) {
            e.preventDefault();
            if (!this.results_showing && !this.is_disabled)return this.results_show()
        }, e.prototype.keyup_checker = function (e) {
            var t, n;
            t = (n = e.which) != null ? n : e.keyCode, this.search_field_scale();
            switch (t) {
                case 8:
                    if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0)return this.keydown_backstroke();
                    if (!this.pending_backstroke)return this.result_clear_highlight(), this.results_search();
                    break;
                case 13:
                    e.preventDefault();
                    if (this.results_showing)return this.result_select(e);
                    break;
                case 27:
                    return this.results_showing && this.results_hide(), !0;
                case 9:
                case 38:
                case 40:
                case 16:
                case 91:
                case 17:
                    break;
                default:
                    return this.results_search()
            }
        }, e.prototype.clipboard_event_checker = function (e) {
            var t = this;
            return setTimeout(function () {
                return t.results_search()
            }, 50)
        }, e.prototype.container_width = function () {
            return this.options.width != null ? this.options.width : "" + this.form_field.offsetWidth + "px"
        }, e.prototype.include_option_in_results = function (e) {
            return this.is_multiple && !this.display_selected_options && e.selected ? !1 : !this.display_disabled_options && e.disabled ? !1 : e.empty ? !1 : !0
        }, e.prototype.search_results_touchstart = function (e) {
            return this.touch_started = !0, this.search_results_mouseover(e)
        }, e.prototype.search_results_touchmove = function (e) {
            return this.touch_started = !1, this.search_results_mouseout(e)
        }, e.prototype.search_results_touchend = function (e) {
            if (this.touch_started)return this.search_results_mouseup(e)
        }, e.prototype.outerHTML = function (e) {
            var t;
            return e.outerHTML ? e.outerHTML : (t = document.createElement("div"), t.appendChild(e), t.innerHTML)
        }, e.browser_is_supported = function () {
            return window.navigator.appName === "Microsoft Internet Explorer" ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : !0
        }, e.default_multiple_text = "Select Some Options", e.default_single_text = "Select an Option", e.default_no_result_text = "No results match", e
    }(), e = jQuery, e.fn.extend({
        chosen: function (r) {
            return t.browser_is_supported() ? this.each(function (t) {
                var i, s;
                i = e(this), s = i.data("chosen"), r === "destroy" && s ? s.destroy() : s || i.data("chosen", new n(this, r))
            }) : this
        }
    }), n = function (t) {
        function n() {
            return i = n.__super__.constructor.apply(this, arguments), i
        }

        return o(n, t), n.prototype.setup = function () {
            return this.form_field_jq = e(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
        }, n.prototype.set_up_html = function () {
            var t, n;
            return t = ["chosen-container"], t.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && t.push(this.form_field.className), this.is_rtl && t.push("chosen-rtl"), n = {
                "class": t.join(" "),
                style: "width: " + this.container_width() + ";",
                title: this.form_field.title
            }, this.form_field.id.length && (n.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = e("<div />", n), this.is_multiple ? this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>') : this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior(), this.form_field_jq.trigger("chosen:ready", {chosen: this})
        }, n.prototype.register_observers = function () {
            var e = this;
            return this.container.bind("mousedown.chosen", function (t) {
                e.container_mousedown(t)
            }), this.container.bind("mouseup.chosen", function (t) {
                e.container_mouseup(t)
            }), this.container.bind("mouseenter.chosen", function (t) {
                e.mouse_enter(t)
            }), this.container.bind("mouseleave.chosen", function (t) {
                e.mouse_leave(t)
            }), this.search_results.bind("mouseup.chosen", function (t) {
                e.search_results_mouseup(t)
            }), this.search_results.bind("mouseover.chosen", function (t) {
                e.search_results_mouseover(t)
            }), this.search_results.bind("mouseout.chosen", function (t) {
                e.search_results_mouseout(t)
            }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function (t) {
                e.search_results_mousewheel(t)
            }), this.search_results.bind("touchstart.chosen", function (t) {
                e.search_results_touchstart(t)
            }), this.search_results.bind("touchmove.chosen", function (t) {
                e.search_results_touchmove(t)
            }), this.search_results.bind("touchend.chosen", function (t) {
                e.search_results_touchend(t)
            }), this.form_field_jq.bind("chosen:updated.chosen", function (t) {
                e.results_update_field(t)
            }), this.form_field_jq.bind("chosen:activate.chosen", function (t) {
                e.activate_field(t)
            }), this.form_field_jq.bind("chosen:open.chosen", function (t) {
                e.container_mousedown(t)
            }), this.form_field_jq.bind("chosen:close.chosen", function (t) {
                e.input_blur(t)
            }), this.search_field.bind("blur.chosen", function (t) {
                e.input_blur(t)
            }), this.search_field.bind("keyup.chosen", function (t) {
                e.keyup_checker(t)
            }), this.search_field.bind("keydown.chosen", function (t) {
                e.keydown_checker(t)
            }), this.search_field.bind("focus.chosen", function (t) {
                e.input_focus(t)
            }), this.search_field.bind("cut.chosen", function (t) {
                e.clipboard_event_checker(t)
            }), this.search_field.bind("paste.chosen", function (t) {
                e.clipboard_event_checker(t)
            }), this.is_multiple ? this.search_choices.bind("click.chosen", function (t) {
                e.choices_click(t)
            }) : this.container.bind("click.chosen", function (e) {
                e.preventDefault()
            })
        }, n.prototype.destroy = function () {
            return e(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
        }, n.prototype.search_field_disabled = function () {
            this.is_disabled = this.form_field_jq[0].disabled;
            if (this.is_disabled)return this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field();
            this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1;
            if (!this.is_multiple)return this.selected_item.bind("focus.chosen", this.activate_action)
        }, n.prototype.container_mousedown = function (t) {
            if (!this.is_disabled) {
                t && t.type === "mousedown" && !this.results_showing && t.preventDefault();
                if (t == null || !e(t.target).hasClass("search-choice-close"))return this.active_field ? !this.is_multiple && t && (e(t.target)[0] === this.selected_item[0] || e(t.target).parents("a.chosen-single").length) && (t.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), e(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field()
            }
        }, n.prototype.container_mouseup = function (e) {
            if (e.target.nodeName === "ABBR" && !this.is_disabled)return this.results_reset(e)
        }, n.prototype.search_results_mousewheel = function (e) {
            var t;
            e.originalEvent && (t = -e.originalEvent.wheelDelta || e.originalEvent.detail);
            if (t != null)return e.preventDefault(), e.type === "DOMMouseScroll" && (t *= 40), this.search_results.scrollTop(t + this.search_results.scrollTop())
        }, n.prototype.blur_test = function (e) {
            if (!this.active_field && this.container.hasClass("chosen-container-active"))return this.close_field()
        }, n.prototype.close_field = function () {
            return e(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
        }, n.prototype.activate_field = function () {
            return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
        }, n.prototype.test_active_click = function (t) {
            var n;
            return n = e(t.target).closest(".chosen-container"), n.length && this.container[0] === n[0] ? this.active_field = !0 : this.close_field()
        }, n.prototype.results_build = function () {
            return this.parsing = !0, this.selected_option_count = null, this.results_data = r.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({first: !0})), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
        }, n.prototype.result_do_highlight = function (e) {
            var t, n, r, i, s;
            if (e.length) {
                this.result_clear_highlight(), this.result_highlight = e, this.result_highlight.addClass("highlighted"), r = parseInt(this.search_results.css("maxHeight"), 10), s = this.search_results.scrollTop(), i = r + s, n = this.result_highlight.position().top + this.search_results.scrollTop(), t = n + this.result_highlight.outerHeight();
                if (t >= i)return this.search_results.scrollTop(t - r > 0 ? t - r : 0);
                if (n < s)return this.search_results.scrollTop(n)
            }
        }, n.prototype.result_clear_highlight = function () {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
        }, n.prototype.results_show = function () {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {chosen: this}))
        }, n.prototype.update_results_content = function (e) {
            return this.search_results.html(e)
        }, n.prototype.results_hide = function () {
            return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {chosen: this})), this.results_showing = !1
        }, n.prototype.set_tab_index = function (e) {
            var t;
            if (this.form_field.tabIndex)return t = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = t
        }, n.prototype.set_label_behavior = function () {
            var t = this;
            this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = e("label[for='" + this.form_field.id + "']"));
            if (this.form_field_label.length > 0)return this.form_field_label.bind("click.chosen", function (e) {
                return t.is_multiple ? t.container_mousedown(e) : t.activate_field()
            })
        }, n.prototype.show_search_field_default = function () {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        }, n.prototype.search_results_mouseup = function (t) {
            var n;
            n = e(t.target).hasClass("active-result") ? e(t.target) : e(t.target).parents(".active-result").first();
            if (n.length)return this.result_highlight = n, this.result_select(t), this.search_field.focus()
        }, n.prototype.search_results_mouseover = function (t) {
            var n;
            n = e(t.target).hasClass("active-result") ? e(t.target) : e(t.target).parents(".active-result").first();
            if (n)return this.result_do_highlight(n)
        }, n.prototype.search_results_mouseout = function (t) {
            if (e(t.target).hasClass("active-result"))return this.result_clear_highlight()
        }, n.prototype.choice_build = function (t) {
            var n, r, i = this;
            return n = e("<li />", {"class": "search-choice"}).html("<span>" + t.html + "</span>"), t.disabled ? n.addClass("search-choice-disabled") : (r = e("<a />", {
                "class": "search-choice-close",
                "data-option-array-index": t.array_index
            }), r.bind("click.chosen", function (e) {
                return i.choice_destroy_link_click(e)
            }), n.append(r)), this.search_container.before(n)
        }, n.prototype.choice_destroy_link_click = function (t) {
            t.preventDefault(), t.stopPropagation();
            if (!this.is_disabled)return this.choice_destroy(e(t.target))
        }, n.prototype.choice_destroy = function (e) {
            if (this.result_deselect(e[0].getAttribute("data-option-array-index")))return this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), e.parents("li").first().remove(), this.search_field_scale()
        }, n.prototype.results_reset = function () {
            this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this
                .form_field_jq.trigger("change");
            if (this.active_field)return this.results_hide()
        }, n.prototype.results_reset_cleanup = function () {
            return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
        }, n.prototype.result_select = function (e) {
            var t, n;
            if (this.result_highlight)return t = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.is_multiple ? t.removeClass("active-result") : this.reset_single_select_options(), n = this.results_data[t[0].getAttribute("data-option-array-index")], n.selected = !0, this.form_field.options[n.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(n) : this.single_set_selected_text(n.text), (!e.metaKey && !e.ctrlKey || !this.is_multiple) && this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {selected: this.form_field.options[n.options_index].value}), this.current_selectedIndex = this.form_field.selectedIndex, this.search_field_scale())
        }, n.prototype.single_set_selected_text = function (e) {
            return e == null && (e = this.default_text), e === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").text(e)
        }, n.prototype.result_deselect = function (e) {
            var t;
            return t = this.results_data[e], this.form_field.options[t.options_index].disabled ? !1 : (t.selected = !1, this.form_field.options[t.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {deselected: this.form_field.options[t.options_index].value}), this.search_field_scale(), !0)
        }, n.prototype.single_deselect_control_build = function () {
            if (!this.allow_single_deselect)return;
            return this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")
        }, n.prototype.get_search_text = function () {
            return this.search_field.val() === this.default_text ? "" : e("<div/>").text(e.trim(this.search_field.val())).html()
        }, n.prototype.winnow_results_set_highlight = function () {
            var e, t;
            t = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), e = t.length ? t.first() : this.search_results.find(".active-result").first();
            if (e != null)return this.result_do_highlight(e)
        }, n.prototype.no_results = function (t) {
            var n;
            return n = e('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), n.find("span").first().html(t), this.search_results.append(n), this.form_field_jq.trigger("chosen:no_results", {chosen: this})
        }, n.prototype.no_results_clear = function () {
            return this.search_results.find(".no-results").remove()
        }, n.prototype.keydown_arrow = function () {
            var e;
            if (!this.results_showing || !this.result_highlight)return this.results_show();
            e = this.result_highlight.nextAll("li.active-result").first();
            if (e)return this.result_do_highlight(e)
        }, n.prototype.keyup_arrow = function () {
            var e;
            if (!this.results_showing && !this.is_multiple)return this.results_show();
            if (this.result_highlight)return e = this.result_highlight.prevAll("li.active-result"), e.length ? this.result_do_highlight(e.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())
        }, n.prototype.keydown_backstroke = function () {
            var e;
            if (this.pending_backstroke)return this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke();
            e = this.search_container.siblings("li.search-choice").last();
            if (e.length && !e.hasClass("search-choice-disabled"))return this.pending_backstroke = e, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")
        }, n.prototype.clear_backstroke = function () {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
        }, n.prototype.keydown_checker = function (e) {
            var t, n;
            t = (n = e.which) != null ? n : e.keyCode, this.search_field_scale(), t !== 8 && this.pending_backstroke && this.clear_backstroke();
            switch (t) {
                case 8:
                    this.backstroke_length = this.search_field.val().length;
                    break;
                case 9:
                    this.results_showing && !this.is_multiple && this.result_select(e), this.mouse_on_container = !1;
                    break;
                case 13:
                    e.preventDefault();
                    break;
                case 38:
                    e.preventDefault(), this.keyup_arrow();
                    break;
                case 40:
                    e.preventDefault(), this.keydown_arrow()
            }
        }, n.prototype.search_field_scale = function () {
            var t, n, r, i, s, o, u, a, f;
            if (this.is_multiple) {
                r = 0, u = 0, s = "position:absolute; left: -1000px; top: -1000px; display:none;", o = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"];
                for (a = 0, f = o.length; a < f; a++)i = o[a], s += i + ":" + this.search_field.css(i) + ";";
                return t = e("<div />", {style: s}), t.text(this.search_field.val()), e("body").append(t), u = t.width() + 25, t.remove(), n = this.container.outerWidth(), u > n - 10 && (u = n - 10), this.search_field.css({width: u + "px"})
            }
        }, n
    }(t)
}.call(this), function (e) {
    e.cookie = function (t, n, r) {
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(n)) || n === null || n === undefined)) {
            r = e.extend({}, r);
            if (n === null || n === undefined)r.expires = -1;
            if (typeof r.expires == "number") {
                var i = r.expires, s = r.expires = new Date;
                s.setDate(s.getDate() + i)
            }
            return n = String(n), document.cookie = [encodeURIComponent(t), "=", r.raw ? n : encodeURIComponent(n), r.expires ? "; expires=" + r.expires.toUTCString() : "", r.path ? "; path=" + r.path : "", r.domain ? "; domain=" + r.domain : "", r.secure ? "; secure" : ""].join("")
        }
        r = n || {};
        var o = r.raw ? function (e) {
            return e
        } : decodeURIComponent, u = document.cookie.split("; ");
        for (var a = 0, f; f = u[a] && u[a].split("="); a++)if (o(f[0]) === t)return o(f[1] || "");
        return null
    }
}(jQuery), function (e, t, n) {
    "use strict";
    var r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N;
    T = {
        paneClass: "pane",
        sliderClass: "slider",
        contentClass: "content",
        iOSNativeScrolling: !1,
        preventPageScrolling: !1,
        disableResize: !1,
        alwaysVisible: !1,
        flashDelay: 1500,
        sliderMinHeight: 20,
        sliderMaxHeight: null
    }, w = "scrollbar", b = "scroll", h = "mousedown", p = "mousemove", v = "mousewheel", d = "mouseup", y = "resize", u = "drag", S = "up", g = "panedown", s = "DOMMouseScroll", o = "down", x = "wheel", a = "keydown", c = "keyup", E = "touchmove", r = t.navigator.appName === "Microsoft Internet Explorer" && /msie 7./i.test(t.navigator.appVersion) && t.ActiveXObject, i = null, l = {}, f = {
        up: 38,
        down: 40,
        pgup: 33,
        pgdown: 34,
        home: 36,
        end: 35
    }, N = function () {
        var e, t, r;
        return e = n.createElement("div"), t = e.style, t.position = "absolute", t.width = "100px", t.height = "100px", t.overflow = b, t.top = "-9999px", n.body.appendChild(e), r = e.offsetWidth - e.clientWidth, n.body.removeChild(e), r
    }, m = function () {
        function f(r, s) {
            this.el = r, this.options = s, i || (i = N()), this.$el = e(this.el), this.doc = e(n), this.win = e(t), this.generate(), this.createEvents(), this.addEvents(), this.reset()
        }

        return f.prototype.preventScrolling = function (e, t) {
            if (!this.isActive)return;
            if (e.type === s)(t === o && e.originalEvent.detail > 0 || t === S && e.originalEvent.detail < 0) && e.preventDefault(); else if (e.type === v) {
                if (!e.originalEvent || !e.originalEvent.wheelDelta)return;
                (t === o && e.originalEvent.wheelDelta < 0 || t === S && e.originalEvent.wheelDelta > 0) && e.preventDefault()
            }
        }, f.prototype.updateScrollValues = function () {
            var e;
            e = this.content[0], this.maxScrollTop = e.scrollHeight - e.clientHeight, this.contentScrollTop = e.scrollTop, this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = this.contentScrollTop * this.maxSliderTop / this.maxScrollTop
        }, f.prototype.createEvents = function () {
            var e = this;
            this.events = {
                down: function (t) {
                    return e.isBeingDragged = !0, e.offsetY = t.pageY - e.slider.offset().top, e.pane.addClass("active"), e.doc.bind(p, e.events[u]).bind(d, e.events[S]), !1
                }, drag: function (t) {
                    return e.sliderY = t.pageY - e.$el.offset().top - e.offsetY, e.scroll(), e.updateScrollValues(), e.contentScrollTop >= e.maxScrollTop ? e.$el.trigger("scrollend") : e.contentScrollTop === 0 && e.$el.trigger("scrolltop"), !1
                }, up: function (t) {
                    return e.isBeingDragged = !1, e.pane.removeClass("active"), e.doc.unbind(p, e.events[u]).unbind(d, e.events[S]), !1
                }, resize: function (t) {
                    e.reset()
                }, panedown: function (t) {
                    return e.sliderY = (t.offsetY || t.originalEvent.layerY) - e.sliderHeight * .5, e.scroll(), e.events.down(t), !1
                }, scroll: function (t) {
                    if (e.isBeingDragged)return;
                    e.updateScrollValues(), e.sliderY = e.sliderTop, e.slider.css({top: e.sliderTop});
                    if (t == null)return;
                    e.contentScrollTop >= e.maxScrollTop ? (e.options.preventPageScrolling && e.preventScrolling(t, o), e.$el.trigger("scrollend")) : e.contentScrollTop === 0 && (e.options.preventPageScrolling && e.preventScrolling(t, S), e.$el.trigger("scrolltop"))
                }, wheel: function (t) {
                    if (t == null)return;
                    return e.sliderY += -t.wheelDeltaY || -t.delta, e.scroll(), !1
                }
            }
        }, f.prototype.addEvents = function () {
            var e;
            this.removeEvents(), e = this.events, this.options.disableResize || this.win.bind(y, e[y]), this.slider.bind(h, e[o]), this.pane.bind(h, e[g]).bind("" + v + " " + s, e[x]), this.content.bind("" + b + " " + v + " " + s + " " + E, e[b])
        }, f.prototype.removeEvents = function () {
            var e;
            e = this.events, this.win.unbind(y, e[y]), this.slider.unbind(), this.pane.unbind(), this.content.unbind("" + b + " " + v + " " + s + " " + E, e[b]).unbind(a, e[a]).unbind(c, e[c])
        }, f.prototype.generate = function () {
            var e, t, n, r, s;
            return n = this.options, r = n.paneClass, s = n.sliderClass, e = n.contentClass, !this.$el.find("" + r).length && !this.$el.find("" + s).length && this.$el.append('<div class="' + r + '"><div class="' + s + '" /></div>'), this.content = this.$el.children("." + e), this.content.attr("tabindex", 0), this.slider = this.$el.find("." + s), this.pane = this.$el.find("." + r), i && (t = {right: -i}, this.$el.addClass("has-scrollbar")), n.iOSNativeScrolling && (t == null && (t = {}), t.WebkitOverflowScrolling = "touch"), t != null && this.content.css(t), this
        }, f.prototype.restore = function () {
            return this.stopped = !1, this.pane.show(), this.addEvents()
        }, f.prototype.reset = function () {
            var e, t, n, s, o, u, a, f, l;
            return this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), e = this.content[0], n = e.style, s = n.overflowY, r && this.content.css({height: this.content.height()}), t = e.scrollHeight + i, u = this.pane.outerHeight(), f = parseInt(this.pane.css("top"), 10), o = parseInt(this.pane.css("bottom"), 10), a = u + f + o, l = Math.round(a / t * a), l < this.options.sliderMinHeight ? l = this.options.sliderMinHeight : this.options.sliderMaxHeight != null && l > this.options.sliderMaxHeight && (l = this.options.sliderMaxHeight), s === b && n.overflowX !== b && (l += i), this.maxSliderTop = a - l, this.contentHeight = t, this.paneHeight = u, this.paneOuterHeight = a, this.sliderHeight = l, this.slider.height(l), this.events.scroll(), this.pane.show(), this.isActive = !0, this.pane.outerHeight(!0) >= e.scrollHeight && s !== b ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === e.scrollHeight && s === b ? this.slider.hide() : this.slider.show(), this.options.alwaysVisible ? this.pane.css({
                opacity: 1,
                visibility: "visible"
            }) : this.pane.css({opacity: "", visibility: ""}), this
        }, f.prototype.scroll = function () {
            return this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.content.scrollTop((this.paneHeight - this.contentHeight + i) * this.sliderY / this.maxSliderTop * -1), this.slider.css({top: this.sliderY}), this
        }, f.prototype.scrollBottom = function (e) {
            return this.reset(), this.content.scrollTop(this.contentHeight - this.content.height() - e).trigger(v), this
        }, f.prototype.scrollTop = function (e) {
            return this.reset(), this.content.scrollTop(+e).trigger(v), this
        }, f.prototype.scrollTo = function (t) {
            var n, r, i;
            return this.reset(), i = e(t).offset().top, i > this.maxSliderTop && (n = i / this.contentHeight, r = this.maxSliderTop * n, this.sliderY = r, this.scroll()), this
        }, f.prototype.stop = function () {
            return this.stopped = !0, this.removeEvents(), this.pane.hide(), this
        }, f.prototype.flash = function () {
            var e = this;
            return this.reset(), this.pane.addClass("flashed"), setTimeout(function () {
                e.pane.removeClass("flashed")
            }, this.options.flashDelay), this
        }, f
    }(), e.fn.nanoScroller = function (t) {
        return this.each(function () {
            var n, r;
            (r = this.nanoscroller) || (n = e.extend({}, T, t), this.nanoscroller = r = new m(this, n));
            if (t && typeof t == "object") {
                e.extend(r.options, t);
                if (t.scrollBottom)return r.scrollBottom(t.scrollBottom);
                if (t.scrollTop)return r.scrollTop(t.scrollTop);
                if (t.scrollTo)return r.scrollTo(t.scrollTo);
                if (t.scroll === "bottom")return r.scrollBottom(0);
                if (t.scroll === "top")return r.scrollTop(0);
                if (t.scroll && t.scroll instanceof e)return r.scrollTo(t.scroll);
                if (t.stop)return r.stop();
                if (t.flash)return r.flash()
            }
            return r.reset()
        })
    }
}(jQuery, window, document), jQuery.fn.sortElements = function () {
    var e = [].sort;
    return function (t, n) {
        n = n || function () {
            return this
        };
        var r = this.map(function () {
            var e = n.call(this), t = e.parentNode, r = t.insertBefore(document.createTextNode(""), e.nextSibling);
            return function () {
                if (t === this)throw new Error("You can't sort elements if any one is a descendant of another.");
                t.insertBefore(this, r), t.removeChild(r)
            }
        });
        return e.call(this, t).each(function (e) {
            r[e].call(n.call(this))
        })
    }
}(), function (e) {
    var t = {
        addTag: function (t) {
            var n, r = e(this);
            if (typeof t == "string") {
                var i = e(this).find("input[type=hidden]").filter(function () {
                    return e(this).val() == t
                });
                if (i.length)return;
                n = e("<li></li>")
            } else n = e(t), t = n.text();
            var s = r.data("tagit"), o = e('<input type="hidden"/>').attr("name", s.field).val(t);
            n.empty().text(t).prepend(o);
            var u = e('<a class="close"></a>');
            u.text(unescape("%D7")).click(function () {
                e(this).parent().remove()
            }), n.addClass("btn btn-tag").append(u);
            if (!e(n).parent().length) {
                var a = e(".btn-tag", r).last();
                a.length === 0 ? n.insertBefore(e(".tagit-edit-handle", r)) : n.insertAfter(a)
            }
            r.trigger("tagit-tag-added", [t])
        }, removeTag: function (t) {
            var n = e(this), r = n.find("input[type=hidden]").filter(function () {
                return e(this).val() == t
            });
            r.length && (r.parent().remove(), n.trigger("tagit-tag-removed", [t]))
        }, getTags: function () {
            return e.map(e(this).find("input[type=hidden]"), function (t) {
                return e(t).val()
            })
        }
    };
    e.extend(e.fn, {
        tagit: function () {
            var n = e.makeArray(arguments), r = n.shift();
            return t[r] ? t[r].apply(this, n) : this.each(function () {
                var t = e(this), n = e.extend({}, e.fn.tagit.defaults);
                e.isPlainObject(r) && (n = e.extend(n, r));
                if (!t.is(".tagit")) {
                    t.data("tagit", n);
                    var i = e('<li class="tagit-edit-handle"></li>'), s = e('<input type="text" class="no-style" />'), o = e("<ul></ul>").addClass("dropdown-menu");
                    t.bind("tagit-tag-added", function () {
                        o.removeClass("open")
                    }), o.click(function (n) {
                        var r = e(n.target);
                        r.is("li") && e(t).tagit("addTag", r.text())
                    });
                    var u = !1;
                    t.bind("focusin", function (t) {
                        u || (u = !0, e(this).addClass("focused"), s.focus(), u = !1)
                    }).bind("focusout", function (t) {
                        u || (e(this).removeClass("focused"), s.val(""))
                    }), s.keydown(function (n) {
                        var r = e(this), i = r.val(), s = n.which;
                        if (s == 9 || s == 13 || s == 188 || s == 186) {
                            if (o.is(".open")) {
                                var u = e("li.selected", o);
                                u.length && (t.tagit("addTag", u.text()), r.val(""), r.focus())
                            } else i && (t.tagit("addTag", r.val()), r.val(""), n.preventDefault());
                            n.preventDefault()
                        } else if (s == 38 || s == 40) {
                            if (o.is(".open")) {
                                var a = e("li", o), u = e(a).filter(".selected");
                                if (u.length == 0 && a.length > 0)a.eq(s == 38 ? a.length - 1 : 0).addClass("selected"); else {
                                    var f = s == 38 ? "prev" : "next", l = u[f]().addClass("selected");
                                    l.length && u.removeClass("selected")
                                }
                                n.preventDefault()
                            }
                        } else s == 8 && !i && (r.parent().prev().remove(), n.preventDefault())
                    }), s.keypress(function (t) {
                        var n = e(this), r = n.val(), i = t.which;
                        r = (r + String.fromCharCode(i)).toLowerCase();
                        if (r) {
                            var s = e(this).parents(".tagit"), u = s.data("tagit").tags, a = s.tagit("getTags");
                            e.isFunction(u) && (u = u(r)), o.empty();
                            var f = e.grep(u, function (t) {
                                return e.inArray(t, a) == -1
                            }), l = 0;
                            e.each(f, function (t, n) {
                                n.toLowerCase().indexOf(r) == 0 && (o.append(e("<li></li>").text(n)), l++)
                            }), l > 0 ? o.addClass("open") : o.removeClass("open")
                        }
                    }), i.append(s).append(o);
                    var a = e("li", t).last();
                    a.length === 0 ? t.append(i) : i.insertAfter(a), t.addClass("tagit"), e("li:not(.tagit-edit-handle)", t).each(function () {
                        e(t).tagit("addTag", this)
                    })
                }
            })
        }
    }), e.fn.tagit.defaults = {field: "tag", tags: []}
}(jQuery), function (e) {
    function t(t, r, i) {
        var s = this;
        return this.on("click.pjax", t, function (t) {
            var o = e.extend({}, h(r, i));
            o.container || (o.container = e(this).attr("data-pjax") || s), n(t, o)
        })
    }

    function n(t, n, r) {
        r = h(n, r);
        var s = t.currentTarget;
        if (s.tagName.toUpperCase() !== "A")throw"$.fn.pjax or $.pjax.click requires an anchor element";
        if (t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)return;
        if (location.protocol !== s.protocol || location.host !== s.host)return;
        if (s.hash && s.href.replace(s.hash, "") === location.href.replace(location.hash, ""))return;
        if (s.href === location.href + "#")return;
        var o = {url: s.href, container: e(s).attr("data-pjax"), target: s, fragment: null};
        i(e.extend({}, o, r)), t.preventDefault()
    }

    function r(t, n, r) {
        r = h(n, r);
        var s = t.currentTarget;
        if (s.tagName.toUpperCase() !== "FORM")throw"$.pjax.submit requires a form element";
        var o = {
            type: s.method,
            url: s.action,
            data: e(s).serializeArray(),
            container: e(s).attr("data-pjax"),
            target: s,
            fragment: null,
            timeout: 0
        };
        i(e.extend({}, o, r)), t.preventDefault()
    }

    function i(t) {
        function u(t, r) {
            var i = e.Event(t, {relatedTarget: n});
            return s.trigger(i, r), !i.isDefaultPrevented()
        }

        t = e.extend(!0, {}, e.ajaxSettings, i.defaults, t), e.isFunction(t.url) && (t.url = t.url());
        var n = t.target, r = c(t.url).hash, s = t.context = p(t.container);
        t.data || (t.data = {}), t.data._pjax = s.selector;
        var a;
        t.beforeSend = function (e, n) {
            n.type !== "GET" && (n.timeout = 0), n.timeout > 0 && (a = setTimeout(function () {
                u("pjax:timeout", [e, t]) && e.abort("timeout")
            }, n.timeout), n.timeout = 0), e.setRequestHeader("X-PJAX", "true"), e.setRequestHeader("X-PJAX-Container", s.selector);
            var r;
            if (!u("pjax:beforeSend", [e, n]))return !1;
            t.requestUrl = c(n.url).href
        }, t.complete = function (e, n) {
            a && clearTimeout(a), u("pjax:complete", [e, n, t]), u("pjax:end", [e, t])
        }, t.error = function (e, n, r) {
            var i = v("", e, t), s = u("pjax:error", [e, n, r, t]);
            t.type == "GET" && n !== "abort" && s && o(i.url)
        }, t.success = function (n, a, l) {
            var h = v(n, l, t);
            if (!h.contents) {
                o(h.url);
                return
            }
            i.state = {
                id: t.id || f(),
                url: h.url,
                title: h.title,
                container: s.selector,
                fragment: t.fragment,
                timeout: t.timeout
            }, (t.push || t.replace) && window.history.replaceState(i.state, h.title, h.url), h.title && (document.title = h.title), s.html(h.contents), typeof t.scrollTo == "number" && e(window).scrollTop(t.scrollTo), (t.replace || t.push) && window._gaq
            ga("send", "pageview");
            if (r !== "") {
                var p = c(h.url);
                p.hash = r, i.state.url = p.href, window.history.replaceState(i.state, h.title, p.href);
                var d = e(p.hash);
                d.length && e(window).scrollTop(d.offset().top)
            }
            u("pjax:success", [n, a, l, t])
        }, i.state || (i.state = {
            id: f(),
            url: window.location.href,
            title: document.title,
            container: s.selector,
            fragment: t.fragment,
            timeout: t.timeout
        }, window.history.replaceState(i.state, document.title));
        var h = i.xhr;
        h && h.readyState < 4 && (h.onreadystatechange = e.noop, h.abort()), i.options = t;
        var h = i.xhr = e.ajax(t);
        return h.readyState > 0 && (t.push && !t.replace && (b(i.state.id, s.clone().contents()), window.history.pushState(null, "", l(t.requestUrl))), u("pjax:start", [h, t]), u("pjax:send", [h, t])), i.xhr
    }

    function s(t, n) {
        var r = {url: window.location.href, push: !1, replace: !0, scrollTo: !1};
        return i(e.extend(r, h(t, n)))
    }

    function o(e) {
        window.history.replaceState(null, "", "#"), window.location.replace(e)
    }

    function u(t) {
        var n = t.state;
        if (n && n.container) {
            var r = e(n.container);
            if (r.length) {
                var s = m[n.id];
                if (i.state) {
                    var u = i.state.id < n.id ? "forward" : "back";
                    w(u, i.state.id, r.clone().contents())
                }
                var a = e.Event("pjax:popstate", {state: n, direction: u});
                r.trigger(a);
                var f = {
                    id: n.id,
                    url: n.url,
                    container: r,
                    push: !1,
                    fragment: n.fragment,
                    timeout: n.timeout,
                    scrollTo: !1
                };
                s ? (r.trigger("pjax:start", [null, f]), n.title && (document.title = n.title), r.html(s), i.state = n, r.trigger("pjax:end", [null, f])) : i(f), r[0].offsetHeight
            } else o(location.href)
        }
    }

    function a(t) {
        var n = e.isFunction(t.url) ? t.url() : t.url, r = t.type ? t.type.toUpperCase() : "GET", i = e("<form>", {
            method: r === "GET" ? "GET" : "POST",
            action: n,
            style: "display:none"
        });
        r !== "GET" && r !== "POST" && i.append(e("<input>", {
            type: "hidden",
            name: "_method",
            value: r.toLowerCase()
        }));
        var s = t.data;
        if (typeof s == "string")e.each(s.split("&"), function (t, n) {
            var r = n.split("=");
            i.append(e("<input>", {type: "hidden", name: r[0], value: r[1]}))
        }); else if (typeof s == "object")for (key in s)i.append(e("<input>", {
            type: "hidden",
            name: key,
            value: s[key]
        }));
        e(document.body).append(i), i.submit()
    }

    function f() {
        return (new Date).getTime()
    }

    function l(e) {
        return e.replace(/\?_pjax=[^&]+&?/, "?").replace(/_pjax=[^&]+&?/, "").replace(/[\?&]$/, "")
    }

    function c(e) {
        var t = document.createElement("a");
        return t.href = e, t
    }

    function h(t, n) {
        return t && n ? n.container = t : e.isPlainObject(t) ? n = t : n = {container: t}, n.container && (n.container = p(n.container)), n
    }

    function p(t) {
        t = e(t);
        if (!t.length)throw"no pjax container for " + t.selector;
        if (t.selector !== "" && t.context === document)return t;
        if (t.attr("id"))return e("#" + t.attr("id"));
        throw"cant get selector for pjax container!"
    }

    function d(e, t) {
        return e.filter(t).add(e.find(t))
    }

    function v(t, n, r) {
        var i = {};
        i.url = l(n.getResponseHeader("X-PJAX-URL") || r.requestUrl);
        if (/<html/i.test(t))var s = e(t.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]), o = e(t.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]); else var s = o = e(t);
        if (o.length === 0)return i;
        i.title = d(s, "title").last().text();
        if (r.fragment) {
            if (r.fragment === "body")var u = o; else var u = d(o, r.fragment).first();
            u.length && (i.contents = u.contents(), i.title || (i.title = u.attr("title") || u.data("title")))
        } else/<html/i.test(t) || (i.contents = o);
        return i.contents && (i.contents = i.contents.not("title"), i.contents.find("title").remove()), i.title && (i.title = e.trim(i.title)), i
    }

    function b(e, t) {
        m[e] = t, y.push(e);
        while (g.length)delete m[g.shift()];
        while (y.length > i.defaults.maxCacheLength)delete m[y.shift()]
    }

    function w(e, t, n) {
        var r, i;
        m[t] = n, e === "forward" ? (r = y, i = g) : (r = g, i = y), r.push(t), (t = i.pop()) && delete m[t]
    }

    function E() {
        e.fn.pjax = t, e.pjax = i, e.pjax.enable = e.noop, e.pjax.disable = S, e.pjax.click = n, e.pjax.submit = r, e.pjax.reload = s, e.pjax.defaults = {
            timeout: 650,
            push: !0,
            replace: !1,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20
        }, e(window).bind("popstate.pjax", u)
    }

    function S() {
        e.fn.pjax = function () {
            return this
        }, e.pjax = a, e.pjax.enable = E, e.pjax.disable = e.noop, e.pjax.click = e.noop, e.pjax.submit = e.noop, e.pjax.reload = function () {
            window.location.reload()
        }, e(window).unbind("popstate.pjax", u)
    }

    var m = {}, g = [], y = [];
    e.inArray("state", e.event.props) < 0 && e.event.props.push("state"), e.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/), e.support.pjax ? E() : S()
}(jQuery), typeof JSON != "object" && (JSON = {}), function () {
    "use strict";
    function f(e) {
        return e < 10 ? "0" + e : e
    }

    function quote(e) {
        return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
            var t = meta[e];
            return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + e + '"'
    }

    function str(e, t) {
        var n, r, i, s, o = gap, u, a = t[e];
        a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
        switch (typeof a) {
            case"string":
                return quote(a);
            case"number":
                return isFinite(a) ? String(a) : "null";
            case"boolean":
            case"null":
                return String(a);
            case"object":
                if (!a)return "null";
                gap += indent, u = [];
                if (Object.prototype.toString.apply(a) === "[object Array]") {
                    s = a.length;
                    for (n = 0; n < s; n += 1)u[n] = str(n, a) || "null";
                    return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                }
                if (rep && typeof rep == "object") {
                    s = rep.length;
                    for (n = 0; n < s; n += 1)typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                } else for (r in a)Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
        }
    }

    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
        var r;
        gap = "", indent = "";
        if (typeof n == "number")for (r = 0; r < n; r += 1)indent += " "; else typeof n == "string" && (indent = n);
        rep = t;
        if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number")return str("", {"": e});
        throw new Error("JSON.stringify")
    }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
        function walk(e, t) {
            var n, r, i = e[t];
            if (i && typeof i == "object")for (n in i)Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
            return reviver.call(e, t, i)
        }

        var j;
        text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({"": j}, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}(), function (e, t) {
    var n = e.jQuery || e.Cowboy || (e.Cowboy = {}), r;
    n.throttle = r = function (e, r, i, s) {
        function a() {
            function p() {
                u = +(new Date), i.apply(n, l)
            }

            function v() {
                o = t
            }

            var n = this, a = +(new Date) - u, l = arguments;
            s && !o && p(), o && clearTimeout(o), s === t && a > e ? p() : r !== !0 && (o = setTimeout(s ? v : p, s === t ? e - a : e))
        }

        var o, u = 0;
        return typeof r != "boolean" && (s = i, i = r, r = t), n.guid && (a.guid = i.guid = i.guid || n.guid++), a
    }, n.debounce = function (e, n, i) {
        return i === t ? r(e, n, !1) : r(e, i, n !== !1)
    }
}(this), function (e) {
    var t = function (e) {
        return function (t) {
            return (t.textContent || t.innerText || "").toUpperCase().indexOf(e.toUpperCase()) >= 0
        }
    };
    t.sizzleFilter = !0, e.find.selectors.pseudos.Contains = t, e.fn.autofocus = function () {
        "autofocus"in document.createElement("input") || e(this).focus()
    }, e.fn.filterInput = function (t) {
        var n = e.extend({clear: e.noop}, t);
        return this.each(function () {
            var t = e(this), r = t.val() ? "" : 'style="display: none"', i = "<i " + r + ' class="a-icon-clear filter-input-clear"></i>';
            if (!t.hasClass("filter-input-done")) {
                var s = t.width() - 8, o = e('<div class="filter-input-container" />');
                o.insertAfter(t), o.css("width", s + "px").append(t.detach().addClass("filter-input-done")).append(i), e("html").hasClass("ie7") ? o.find("input").css("width", t.width() - 28 - 8 + "px") : o.find("input").css("width", t.width() - 28 + "px");
                var u = o.find(".filter-input-done"), a = o.find(".filter-input-clear");
                t.focus(function () {
                    t.parent().addClass("focus")
                }), t.blur(function () {
                    t.parent().removeClass("focus")
                }), o.click(function () {
                    u.focus()
                }), a.click(function () {
                    u.val("").focus().change().keyup(), n.clear()
                }), u.keyup(function () {
                    e(this).val() == "" ? a.hide() : a.show()
                })
            }
        })
    }, e.fn.serializeObject = function () {
        var t = {}, n = this.serializeArray(), r = [];
        return this.find("select").filter("[multiple]").each(function () {
            r.push(e(this).attr("name"))
        }), e.each(n, function () {
            t[this.name] !== undefined ? t[this.name].push(this.value || "") : r.indexOf(this.name) == -1 ? t[this.name] = this.value || "" : t[this.name] = [this.value] || []
        }), t
    }
}(jQuery), Array.prototype.remove = function (e) {
    arrLength = this.length;
    for (var t = 0; t < arrLength; t++)this[t] == e && this.splice(t, 1)
}, Array.prototype.unique = function () {
    var e = this.concat();
    for (var t = 0; t < e.length; ++t)for (var n = t + 1; n < e.length; ++n)e[t] === e[n] && e.splice(n, 1);
    return e
};
var delay = function () {
    var e = 0;
    return function (t, n) {
        clearTimeout(e), e = setTimeout(t, n)
    }
}();
$filterRequest = null, $("#suggestion_form").submit(function () {
    if ($("#searchField").val().length < 1)return !1
}), $(window).bind("popstate", function (e) {
    data = history.state;
    if ($(".taxon-page").length)if (data && data.tabTarget)$(".nav-tabs a").filter("a[data-target=" + data.tabTarget + "]").tab("show"); else {
        var t = location.pathname, n = $(".nav-tabs a").filter('a[href="' + t + '"]');
        n.length ? n.tab("show") : $(".nav-tabs a").filter("a[data-target=#resources]").tab("show")
    }
}), $(function () {
    $("form").submit(function () {
        return $(this).submit(function (e) {
            return e.preventDefault(), e.stopPropagation(), !1
        }), !0
    }), Modernizr.touch && $(".dropdown-toggle").append('<span class="close">&times;</span>'), $(document).on("pjax:end", function (e) {
        $(".facet-filters-search,.search-filters-container").each(function () {
            var e = getQueryString(), t = e.at.split(","), n = e.au.split(","), r = e.ln.split(","), i = e.sp.split(","), s = e.offset, o = e.limit, u = e.q, a = e.sort;
            $(".search-filter").each(function () {
                var e = $(this).attr("data-filtertype"), s = $(this).attr("data-filtervalue"), f = !1;
                switch (e) {
                    case"at":
                        f = $.inArray(s, t) != -1;
                        break;
                    case"au":
                        f = $.inArray(s, n) != -1;
                        break;
                    case"ln":
                        f = $.inArray(s, r) != -1;
                        break;
                    case"sp":
                        f = $.inArray(s, i) != -1;
                        break;
                    case"limit":
                        f = o == s;
                        break;
                    case"sort":
                        f = a == s
                }
                f ? $(this).addClass("selected") : $(this).removeClass("selected");
                var l = "/search?q=" + encodeURIComponent(u);
                l += "&at=";
                if (e == "at") {
                    var c = t, h = addNewOrRemoveExistingItemFromSet(c, s), p = arrayToCommaSeparatedList(h);
                    l += arrayToCommaSeparatedList(addNewOrRemoveExistingItemFromSet(t, s))
                } else l += arrayToCommaSeparatedList(t);
                l += "&au=", e == "au" ? l += arrayToCommaSeparatedList(addNewOrRemoveExistingItemFromSet(n, s)) : l += arrayToCommaSeparatedList(n), l += "&sp=", e == "sp" ? l += arrayToCommaSeparatedList(addNewOrRemoveExistingItemFromSet(i, s)) : l += arrayToCommaSeparatedList(i), l += "&ln=", e == "ln" ? l += arrayToCommaSeparatedList(addNewOrRemoveExistingItemFromSet(r, s)) : l += arrayToCommaSeparatedList(r), l += "&offset=", e == "offset" ? l += s : l += "0", l += "&sort=", e == "sort" ? l += s : l += a, l += "&limit=", e == "limit" ? l += s : l += o, $(this).attr("href", l)
            })
        })
    }), $(document).on("click", ".search-filter", function (e) {
        if (!$.support.pjax)return !0;
        e.preventDefault();
        var t = $(this).attr("href").replace(/.*\/\/[^\/]*/, ""), n = t;
        $.pjax.defaults.scrollTo = !1, $.pjax.defaults.timeout = 3e4, $.pjax({url: n, container: "#results-container"});
        var r = $(this).attr("data-filtertype"), i = $(this).attr("data-filtervalue"), s = $(this).attr("data-filterbehavior");
        s == "radio" && $("a[data-filtertype=" + r + "]").removeClass("selected"), $(this).toggleClass("selected");
        var o = getQueryString(), u = o.at.split(","), a = o.au.split(","), f = o.ln.split(","), l = o.sp.split(","), c = o.offset, h = o.limit, p = o.q, d = o.sort;
        $(".search-filter").each(function () {
            var e = $(this).attr("data-filtertype"), t = $(this).attr("data-filtervalue"), n = "/search?q=" + encodeURIComponent(p);
            n += "&at=";
            if (e == "at") {
                var r = u, i = addNewOrRemoveExistingItemFromSet(r, t), s = arrayToCommaSeparatedList(i);
                n += arrayToCommaSeparatedList(addNewOrRemoveExistingItemFromSet(u, t))
            } else n += arrayToCommaSeparatedList(u);
            n += "&au=", e == "au" ? n += arrayToCommaSeparatedList(addNewOrRemoveExistingItemFromSet(a, t)) : n += arrayToCommaSeparatedList(a), n += "&sp=", e == "sp" ? n += arrayToCommaSeparatedList(addNewOrRemoveExistingItemFromSet(l, t)) : n += arrayToCommaSeparatedList(l), n += "&ln=", e == "ln" ? n += arrayToCommaSeparatedList(addNewOrRemoveExistingItemFromSet(f, t)) : n += arrayToCommaSeparatedList(f), n += "&offset=", e == "offset" ? n += t : n += "0", n += "&limit=", e == "limit" ? n += t : n += h, n += "&sort=", e == "sort" ? n += t : n += d, $(this).attr("href", n)
        })
    }), $("input[autofocus]").autofocus(), $(".dropdown-menu form").click(function (e) {
        e.stopPropagation()
    }), $(".filter-input").filterInput({}), $(".chosen-select").chosen({
        disable_search_threshold: "12",
        width: "220px"
    }), carouselSetup($("#taxon-carousel"), 3500), carouselSetup($("#news-carousel"), 6e3), carouselSetup($("#home-carousel"), 12e3), carouselSetup($("#feature-carousel"), 4500), homeCarouselSetup(), filterSetup(), $("#searchField").bind("keyup", function (e) {
        $q = $(this).val();
        var t = $("#search").data("languages"), n = $("#searchField").data("options");
        if (e.keyCode == "27" || e.keyCode == "13" || !$q) {
            $("#searchForm #suggResults").hide();
            return
        }
        var r = "/search/typeahead?format=json&q=" + $q;
        $.getJSON(r, function (e) {
            var t = "", n = e.results.length;
            for (var r = 0; r < n; r++) {
                var i = e.results[r].name;

                function s(e) {
                    return e.replace(/\s+$/, "")
                }

                var o = i.search(/inmeta/i);
                o <= 0 && i.charAt(i.length - 1) != " " && (t += '<li><a href="/search/?q=' + i + '">' + i + "</a></li>")
            }
            $("#searchForm #suggResults ul").html(t), n && $("#searchForm #suggResults").show()
        }), !1
    }), $(".control-group textarea").autoResize(), jobListingSortable(), $(".print-link").click(function (e) {
        window.print(), e.preventDefault()
    }), $("body").on("show", ".modal", function () {
        var e = $(this), t = e.outerHeight();
        $(window).height() < t ? e.css({
            "margin-top": "0",
            top: "10px",
            position: "absolute"
        }) : e.css("marginTop", -(e.outerHeight() / 2) + "px")
    }), $("body").on("click", ".collapsible", function () {
        $(this).toggleClass("collapsed"), $(this).next().slideToggle()
    }), $(".product-list>li>a").click(function (e) {
        e.preventDefault(), $(this).parent().toggleClass("closed"), $(this).next("ul").slideToggle()
    }), $(".facet-filters-search > ul > li.file-format li > a").click(function (e) {
        e.preventDefault();
        var t = ".asset-list>li>ul>li." + $(this).data("language");
        $(".asset-list>li>ul>li.filter").length == 0 ? ($(t).toggleClass("filter"), $(".asset-list>li>ul>li").not(".filter").slideUp()) : ($(t).toggleClass("filter"), $(".asset-list>li>ul>li.filter").length == 0 ? $(".asset-list>li>ul>li").slideDown() : $(t).slideToggle())
    });
    var e = $("#userAccount-country"), t = function (t) {
        t = t || e;
        if ($("#rpps-field").data("countries")) {
            var n = $("#rpps-field").data("countries").toUpperCase().split(",");
            return $.inArray(t.val().toUpperCase(), n) > -1
        }
        return !1
    }, n = function (n) {
        n = n || e, t(n) && $("#rpps-field").show() || $("#rpps-field").hide()
    };
    n(), $("#rpps-field input").prop("disabled", !0)
}), function (e) {
    e.fn.taxonomyFilter = function (t) {
        this.change(function () {
            var t = e(this).val();
            return menuSelection.updateSearchCookie(t, e(this).closest(".group").data("group"), menuSearchTerms), $list = e(this).closest(".group").find(".filter-items"), $list.find("li.search-hidden").removeClass("search-hidden"), t && ($matches = $list.find("a:Contains('" + t + "')").closest("li"), e("li", $list).not($matches).not(".selected").addClass("search-hidden")), checkEmpty(e(this)), !1
        }).keyup(function () {
            e(this).change(), setTimeout(function () {
                setupNanoScroll()
            }, 400)
        })
    }
}(jQuery);
var taxonomySelected = [];
$.cookie("menuSelection") && (taxonomySelected = decodeURI($.cookie("menuSelection")).split(","));
var menuSearchTerms = {};
$.cookie("menuSearchTerms") && (menuSearchTerms = JSON.parse(decodeURI($.cookie("menuSearchTerms"))));
var menu = {};
$.cookie("menu") && (menu = JSON.parse(decodeURI($.cookie("menu"))));
var menuSelection = {
    click: function (e) {
        var t = e.attr("id"), n = e.closest("li").hasClass("selected");
        n ? this.add(e) : this.remove(e)
    }, add: function (e) {
        var t = e.attr("id");
        $.inArray(t, taxonomySelected) < 0 && taxonomySelected.push(t), this.updateCookie()
    }, remove: function (e) {
        taxonomySelected.remove(e.attr("id")), this.updateCookie()
    }, clear: function () {
        $(".filter-search").val("").change(), taxonomySelected = [], menuSearchTerms = {}, menu = {}, $(".mega-menu-show").removeAttr("checked"), this.updateCookie(), $.cookie("menuSearchTerms", "", {path: "/"}), $.cookie("menu", "", {path: "/"})
    }, refreshMenu: function () {
        var e = $("#menu").find(".menu-li.active");
        if (e.length) {
            var t = taxonomySelected.length - 1, n = e.find(".filter-items .checkbox > div");
            for (var r = 0; r <= t; r++) {
                var i = n.filter("#" + taxonomySelected[r]);
                i.length && i.click()
            }
        }
    }, clearMenu: function () {
        $menuItems = $("#menu").find(".filter-items li"), $menuItems.filter(".filter-items li.selected").removeClass("selected"), this.clear(), $menuItems.removeClass("hidden").each(function () {
            var e = $(this)
        })
    }, updateSelected: function (e) {
        this.clear(), e.find(".filter-items li.selected").each(function () {
            menuSelection.add($(this).find(".checkbox > div"))
        })
    }, updateCookie: function () {
        this.deleteCookie(), $.cookie("menuSelection", taxonomySelected.join(","), {path: "/"})
    }, updateSearchCookie: function (e, t, n) {
        n[t] = e;
        var r = JSON.stringify(n);
        $.cookie("menuSearchTerms", r, {path: "/"})
    }, deleteCookie: function () {
        $.cookie("menuSelection", "", {path: "/"})
    }
};
$(function () {
    (function () {
        var e = $(".megamenu");
        setupNanoScroll(), e.find(".filters li").each(function () {
            var e = $(this), t = e.height();
            $("html").hasClass("oldie")
        }), e.find(".filter-input").filterInput(), e.find(".filter-search").taxonomyFilter()
    })();
    var e = {}, t = $(".menu-li.active"), n = $("#menu");
    $(".megamenu-link").click(function (r) {
         
        typeof e.abort == "function" && e.abort(), r.preventDefault();
        var i = $(this).closest("li"),
            mi = $(this).attr("rel"),
            s = $(this).attr("href"),
            o = i.find(".megamenu-container"),
            u = o.find(".megamenu");
        if (i.hasClass("active")) {
            t = null, i.removeClass("active"), n.removeClass("menu-open"), setTimeout(function () {
                o.hide()
            }, 200);
            return
        }
        t != null && (i.siblings().removeClass("active"),
            t.find(".megamenu-container").hide()), t = i,
            o.hasClass("loaded") ? setMenuOpenCookie(u.find(".mega-menu-show")) : e = $.ajax({
            url: s,
                data: "action=ajaxmegamenupage&menuid="+mi,
                type:'POST',
            cache: !1,
            tryCount: 0,
            retryLimit: 1,
            timeout: 8e3
        }).done(function (e) {
            u.html(e), o.removeClass("content-loading"), o.addClass("loaded"), setupNanoScroll(), u.find(".filter-input").filterInput(), u.find(".filter-search").taxonomyFilter(), setMenuOpenCookie(u.find(".mega-menu-show"))
        }).error(function (e, t, n) {
            if (t == "timeout") {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                    return
                }
                errorAlert();
                return
            }
            e.status == 500 ? errorAlert() : errorAlert()
        }), o.show(), i.addClass("active").removeClass("menu-gradient-closed"), n.addClass("menu-open")
    }), n.on("click", ".close", function (e) {
        e.preventDefault();
        var r = $(this).closest(".menu-li");
        t = null, n.removeClass("menu-open"), r.removeClass("active").addClass("menu-gradient-closed"), setTimeout(function () {
            r.find(".megamenu-container").hide()
        }, 200)
    }), n.on("click", ".taxonomy-type a", function (e) {
        e.preventDefault();
        var t = $(this), n = t.closest(".megamenu");
        if (t.hasClass("selected"))return !1;
        n.find(".taxonomy-type a").removeClass("selected"), t.addClass("selected");
        var r = t.data("view");
        n.find(".filters").removeClass("show"), n.find(".filters." + r).addClass("show"), setMenuOpenCookie(t)
    }), $(".main-menu").on("click", ".mega-menu-show:checkbox", function (e) {
        var t = $(this);
        setMenuOpenCookie(t)
    }), $(".main-menu").on("click", ".menu-clear", function (e) {
        menuSelection.clearMenu(), $(".megamenu").each(function (e) {
            $(this).find(".taxonomy-type a").first().click()
        })
    }), n.on("click", ".checkbox > div", function (e) {

        var t = $(this), n = t.closest(".megamenu");
        t.closest("li").toggleClass("selected");
        var r = [],
            i = n.find(".group").data("group"),
            s = taxonomy[i];
        t.closest(".filters").find(".filter-items").each(function () {
            var e = $(this), t = [];
            e.find("li").each(function () {
                //alert(s);
                var e = $(this);
                r.length && r.indexOf(this.id) == -1 ? (e.hasClass("selected") && menuSelection.remove(e.find(".checkbox > div")), e.removeClass("selected").addClass("hidden")) : (e.removeClass("hidden"), e.hasClass("selected") && s.hasOwnProperty(this.id) && (t = t.concat(s[this.id]).unique()))
            }), t.length && (r = t)
        }), n.find(".filter-search").change(), setTimeout(function () {
            setupNanoScroll()
        }, 400), menuSelection.click(t)
    })
}), $(document).ready(function () {
    $(".cal-view").click(function (e) {
        e.preventDefault(), $(".faux-tabs > li").removeClass("selected"), $(this).parent().addClass("selected"), $("#events").removeClass("list").addClass("cal"), addPopups(), $(".calendar ul.event").popover("enable")
    }), $(".list-view").click(function (e) {
        e.preventDefault(), $(".faux-tabs > li").removeClass("selected"), $(this).parent().addClass("selected"), $("#events").addClass("list").removeClass("cal"), addPopups(), $(".calendar ul.event").popover("disable")
    }), addPopups(), calendarMore(), $(".calendar-select").chosen({
        disable_search_threshold: "12",
        width: "100%"
    }).change(function (e) {
        var t = $("#year").val(), n = $("#month").val();
        $("#cal-date-select").removeClass("open"), updateCalendar(n, t)
    }), $(".month-changer").click(function (e) {
        e.preventDefault();
        var t = $(this), n = t.data("year"), r = t.data("month");
        $("html").hasClass("ie7") || ($("#year").data("chosen").current_value = n, $("#month").data("chosen").current_value = r), updateCalendar(r, n)
    })
}), $(document).ready(function () {
    $('.nav-tabs a[data-target="#products"]').popover({
        delay: {show: 75, hide: 0},
        offset: 10,
        html: !0,
        trigger: "manual",
        template: '<div id="help-product-tab" class="popover"><div class="arrow"></div><div class="popover-inner"><span class="close">&times;</span><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
        title: $("#products").data("help-title"),
        content: $("#products").find(".help-content").html(),
        placement: "top"
    });
    if ($("html").hasClass("no-history")) {
        var e = $.cookie("showProductPopover");
        e && ($('.nav-tabs a[data-target="#products"]').popover("show"), $.cookie("showProductPopover", null, {path: "/"}))
    }
    helpTrialTooltip();
    var t = $(".taxon-page .nav-tabs a");
    t.click(function () {
        var e = $(this).data("target"), t = $(this).attr("href");
        History.pushState({tabTarget: e}, null, t)
    }), t.on("show", function (e) {
        if ($("html").hasClass("no-history"))return window.location = $(this).attr("href"), !1;
        $(this).data("target") != "#products" && $('.nav-tabs a[data-target="#products"]').popover("hide")
    }), t.on("shown", function () {
        var e = $(this).data("target"), t = $(e), n = $(this).attr("href");
        t.hasClass("content-loading") && $.ajax({url: n, type: "GET", cache: !1}).done(function (e) {
            t.html(e).removeClass("content-loading").addClass("loaded"), t.attr("id") === "related-science" && filterSetup(), t.attr("id") === "products" && helpTrialTooltip(), setCartCheckoutButton()
        }).fail(function (e) {
            errorAlert()
        })
    }), $("#showcase-toggle").click(function (e) {
        e.preventDefault(), $('.nav-tabs a[data-target="#products"]').popover("hide"), $(".taxon-page.showcase-hidden").length ? ($.cookie("hide_overview", null, {path: "/"}), $(".take-action-bar-mini").fadeToggle(0), $(".showcase-container").slideToggle(function () {
            $(".taxon-page").toggleClass("showcase-hidden"), $(".carousel").carousel("cycle"), $(".carousel .pause").removeClass("paused")
        })) : ($(".carousel").carousel("pause"), $(".showcase-container").slideToggle(function () {
            $(".take-action-bar-mini").fadeToggle(100), $(".taxon-page").toggleClass("showcase-hidden"), $.cookie("hide_overview", "hide", {path: "/"})
        }))
    }), $(".take-action-bar").clone().addClass("take-action-bar-mini").find("br, span").remove().end().insertAfter(".nav-tabs-taxon"), $(".take-action-bar").on("click", "a", function (e) {
        e.preventDefault(), $('.nav-tabs a[data-target="#products"]').popover("hide");
        var t = "#" + $(this).attr("id").slice(0, -5);
        $(t).modal()
    }), $(".cart-modal-link").click(function (e) {
        if (isCartEmpty()) {
            var t = $('.nav-tabs a[data-target="#products"]').parent().hasClass("active");
            return $("html").hasClass("no-history") && !t ? ($.cookie("showProductPopover", "true", {path: "/"}), $('.nav-tabs a[data-target="#products"]').tab("show")) : $('.nav-tabs a[data-target="#products"]').tab("show").popover("show"), !1
        }
        e.stopPropagation()
    }), $(document).on("click", ".quote-help-modal", function () {
        return $('.nav-tabs a[data-target="#products"]').popover("hide"), $("#cart-modal").modal(), !1
    }), Modernizr.touch || ($(".take-action-bar").not(".take-action-bar-mini").find("a").tooltip({
        placement: "left",
        template: '<div class="tooltip tooltip-help"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    }), $(".take-action-bar-mini a").tooltip({
        placement: "bottom",
        template: '<div class="tooltip tooltip-help"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    })), $("#email-list").tagit(), $(".collapse").on("hide", function () {
        $(this).siblings(".collapse-plus-minus").removeClass("expanded")
    }), $(".collapse").on("show", function () {
        $(this).siblings(".collapse-plus-minus").addClass("expanded")
    })
});
var assetRoute = "media", assetHelpers = {};
assetHelpers.getResourcePath = function () {
    return assetHelpers.resourcePath || (assetHelpers.resourcePath = $("#asset-container").data("resource-slug")), assetHelpers.resourcePath
};
var $assetAjax = null;
$(document).ready(function () {
    selectFilterMenuItemsFromUrlHash(), History.Adapter.bind(window, "statechange", function () {
        filtersChanged($(this))
    }), $(".dropdown-toggle").dropdown(), $("#share-modal").hasClass("shareerror") && $("#share-modal").modal({keyboard: !1}), $("#contact-modal").hasClass("contacterror") && $("#contact-modal").modal({keyboard: !1}), $("#asset-share-modal").hasClass("shareasseterror") && $("#asset-share-modal").modal({keyboard: !1}), $("#feedback-modal").hasClass("feedbackerror") && $("#feedback-modal").modal({keyboard: !1}), $(document).on("click", ".asset-share-link", function (e) {
        e.preventDefault();
        var t = $("#asset-share-modal");
        t.find(".asset-share-title").text($(this).attr("data-title")), t.find('input[data-source="assettitle"]').val($(this).attr("data-title")), t.find('input[data-source="assetslug"]').val($(this).attr("data-url")), t.modal()
    }), $(document).on("click", ".asset-title-bar", function (e) {
        e.preventDefault(), $(this).siblings().slideToggle()
    })
}), $(document).on("click", ".media-query a", function (e) {
    e.preventDefault(), filtersChanged($(this))
}), $(document).on("click", ".asset-filter-reset", function (e) {
    e.preventDefault(), $(".media-query a").each(function () {
        $(this).data("default") ? $(this).addClass("selected") : $(this).removeClass("selected")
    });
    var t = prepareMediaFilter();
    t.pageArgs.container = !0, t.pageArgs.cancelQuery = !1, t.pageArgs.mediaMenu = !0, t.queryArgs.reset = !0, t[t.types] && (t[t.types] = 3), $("#asset-container").append('<div class="loading"></div>'), $("#asset-container").load(assetHelpers.getResourcePath(), t, function () {
        $(".loading").remove()
    })
}), $(document).on("click", "a.asset-show-multilingual", function (e) {
    e.preventDefault(), $(this).after('<img class="ajax-spinner" src="/images/loader-sm.gif" width="12" height="12" alt="Loading" style="margin-left: 5px;"/>');
    var t = $(this).parent(), n = $(this).closest(".asset-item"), r = /^(?:\?.+\=)(.+)(?:&group\=)(.+)$/g, i = $(this).attr("href"), s = r.exec(i), o = {
        queryArgs: {
            assetid: s[1],
            assetgroupid: s[2]
        }, pageArgs: {container: !1, mediamenu: !1, multilingual: !0}
    }, u = t.closest(".asset-group");
    o.queryArgs.types = u.data("assettype"), $(".meta-info").find("a").each(function (e) {
        var t = $(this).data("query");
        if ($(this).hasClass("selected")) {
            var n = t.split("=")[0], r = t.split("=")[1];
            o.queryArgs[n] = r
        }
    }), $.post(assetHelpers.getResourcePath(), o, function (e) {
        var r = $(e);
        r.css("display", "none"), n.after(r).queue(function () {
            r.slideDown(), $(this).dequeue()
        }), $a = t.find("a"), text = $a.data("hide-text"), $a.removeClass("asset-show-multilingual").addClass("asset-hide-multilingual").html('<i class="a-icon-translation"></i>' + text), $(".ajax-spinner").remove()
    })
}), $(document).on("click", "a.asset-hide-multilingual", function (e) {
    e.preventDefault();
    var t = $(this).closest(".asset-item").parent(), n = t.find(".asset-multilingual");
    n.slideUp().queue(function () {
        n.remove(), $(this).dequeue()
    }), text = $(this).data("show-text"), $(this).removeClass("asset-hide-multilingual").addClass("asset-show-multilingual").html('<i class="a-icon-translation"></i>' + text)
}), $(document).on("click", ".more-assets,.all-assets", function (e) {
    e.preventDefault();
    var t = $(this);
    t.parent().append('<img src="/images/loader-sm.gif" width="15" height="15" alt="Loading" class="ajax-spinner" style="line-height:15px;vertical-align:middle;" />');
    var n = prepareMediaFilter();
    n.pageArgs.container = !1, n.pageArgs.mediamenu = !1, n.pageArgs.container = !1, n.pageArgs.collection = !1;
    var r = t.closest(".asset-group");
    n.queryArgs.types = r.data("assettype");
    var i = r.data("totalassets"), s = r.find(".asset-group-list").children("li").last();
    n.queryArgs.from = s.data("assetrow"), n.queryArgs.count = howManyMore = t.parent().find("#how-many-more-assets").text(), t.hasClass("all-assets") ? (n.queryArgs.count = 0, n.queryArgs.viewall = !0) : n.queryArgs.viewmore = !0, $.post(assetHelpers.getResourcePath(), n, function (e) {
        var r = $(e);
        s.after(r), n.queryArgs.count == 0 ? t.closest(".view-menu").remove() : (howManyMore = t.parent().find("#how-many-more-assets").text(), rowDifference = i - n.queryArgs.from - howManyMore, rowDifference <= 0 ? t.closest(".view-menu").remove() : rowDifference < howManyMore && (howManyMore = rowDifference), rowDifference > 0 && t.parent().find("#how-many-more-assets").text(howManyMore)), $(".ajax-spinner").remove()
    })
}), $(".show-pdf-asset-translations").on("click", function (e) {
    setTextPlease(this, $(".assettranslationscollapsable").toggle())
}), $(document).ready(function () {
    !$(".assettranslationscollapsable").hasClass("expand") && $(".assettranslationscollapsable").toggle(), setTextPlease($(".show-pdf-asset-translations"), $(".assettranslationscollapsable"))
}), $(document).ready(function () {
    $("#search-landing .collapsed .salescontact-title-bar").siblings().slideToggle(), $(document).on("click", ".salescontact-title-bar", function (e) {
        e.preventDefault(), $(this).siblings().slideToggle()
    }), $("#contact-distributor-modal").hasClass("salescontact-contact-error") && $("#contact-distributor-modal").modal({keyboard: !1}), $("#contact-global-modal").hasClass("global-contact-error") && $("#contact-global-modal").modal({keyboard: !1}), $(".clicked-modal-button").click(function (e) {
        var t = $(e.currentTarget).data("country"), n = $('*[data-source="country"]');
        n.val(t);
        var r = $(e.currentTarget).data("zipcode"), i = $('*[data-source="zipcode"]');
        i.val(r);
        var s = $(e.currentTarget).data("distributorid"), o = $('*[data-source="distributorid"]');
        o.val(s);
        var u = $(e.currentTarget).data("salescontactid"), a = $('#contact-distributor-modal *[data-source="salescontactid"]');
        a.val(u)
    }), $(".popoverOption").popover({
        placement: "bottom",
        trigger: "hover",
        template: '<div class="popover salescontactfinder-popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })
});
var $assetAjax = null;
$(document).ready(function () {
    $(".dropdown-toggle").dropdown(), $(document).on("click", ".tag-title-bar", function (e) {
        e.preventDefault(), $(this).siblings().slideToggle()
    })
}), $(document).on("click", ".tag-query a", function (e) {
    e.preventDefault();
    var t = $(this), n = !1, r = $(this).closest(".tag-query");
    r.hasClass("single-select") && r.find("a.selected").removeClass("selected"), $(this).toggleClass("selected");
    var i = !0;
    if ($(this).hasClass("show-all-a")) {
        var s = $(this).closest(".show-all");
        $(this).hasClass("selected") || $(this).toggleClass("selected"), s.find("a").slice(1).each(function () {
            $(this).removeClass("selected")
        })
    } else if ($(this).closest("ul.tag-query").hasClass("show-all-ul")) {
        var s = $(this).closest(".show-all"), o = $(this).closest(".show-all").find("a"), u = o.size() - 1, a = 0, f = 0;
        o.slice(1).each(function () {
            $(this).hasClass("selected") ? a++ : (i = !1, f++)
        }), f === u && (i = !0), i || a === u ? (s.find("a").each(function () {
            $(this).removeClass("selected")
        }), s.find("a").first().addClass("selected")) : s.find("a").first().removeClass("selected")
    }
    var l = prepareTagFilter();
    l.assetArgs.pageArgs.container = !0, l.assetArgs.pageArgs.cancelQuery = n, l.assetArgs.pageArgs.mediaMenu = !0, $assetAjax != null && $assetAjax.readyState != "4" ? $assetAjax.abort() : ($("#tag-container").append('<div class="loading"></div>'), r.closest("li").children("h5").append('<img src="/images/loader-sm.gif" width="13" height="13" alt="Loading" class="ajax-spinner" style="margin-left:5px" />')), $assetAjax = $.ajax({
        url: "/tags",
        data: l,
        cache: !1
    }).done(function (e) {
        $("#tag-container").html(e), $(".ajax-spinner").remove(), $(".loading").remove()
    })
}), $(document).on("click", ".tag-filter-reset", function (e) {
    e.preventDefault(), $(".tag-query a").each(function () {
        $(this).data("default") ? $(this).addClass("selected") : $(this).removeClass("selected")
    });
    var t = prepareTagFilter();
    t.assetArgs.pageArgs.container = !0, t.assetArgs.pageArgs.cancelQuery = !1, t.assetArgs.pageArgs.mediaMenu = !0, t.assetArgs.queryArgs.reset = !0, t[t.types] && (t[t.types] = 3), $("#tag-container").append('<div class="loading"></div>'), $("#tag-container").load("/tags", t, function () {
        $(".loading").remove()
    })
}), $(document).ready(function () {
    function e(e) {
        e.find(".ajax-spinner").remove();
        return
    }

    var t = !1;
    $("#products").on("click", ".product-group-link", function (n) {
        n.preventDefault(), n.stopPropagation();
        var r = $(this), i = $(this).closest("li"), s = i.find(".product-group-text"), o = i.find("div"), u = r.find(".product-group-text").html(), a = $(this).attr("href"), f = r.data("replace");
        if (o.html().trim() === "" && !t) {
            i.find(".product-group-link").append('<img src="/images/loader-sm.gif" width="13" height="13" alt="Loading" class="ajax-spinner" />');
            var l = {productArgs: {taxonId: $(this).data("taxonid")}};
            t = !0, $.ajax({url: a, type: "GET", cache: !1, data: l}).done(function (n) {
                f ? (o.append(n), e(i), r.remove(), s.show().css("display", "block").parent().toggleClass("collapsed"), setCartCheckoutButton()) : (i.html(n), e(i)), $("#help-product-family-show").alert("close"), t = !1
            }).fail(function (e) {
                errorAlert()
            })
        }
    }), $(".dfu-translations-link").click(function (e) {
        e.preventDefault(), $(this).toggleClass("hide-dfu"), $(this).siblings("ul.bullets").find(".dfu-translations").slideToggle()
    }), $(document).on("click", "#help-product-family-show .close", function () {
        $.cookie("help-product-family-show", "hide", {path: "/"})
    })
}), $(document).ready(function () {
    $("#modelObject-countryid").chosen({width: "100%"}), $("#modelObject-countryid").chosen({width: "100%"}).change(function () {
        var e = $("#modelObject-countryid").chosen().val(), t = prepareTagFilter();
        t.queryArgs = e, $assetAjax = $.ajax({url: "/cart/submit", data: t, cache: !1}).done(function (e) {
            var t = $(e);
            $("#tag-container").html(e), $("label:contains(State)").addClass("control-label"), $("label:contains(State)").addClass("state-label"), $(".state-select").wrap("<div class='controls'></div>"), $("</label>").replaceWith(""), $("#us_state").hide(), $(".state-select").css("margin-top", "-30px")
        })
    });
    var e = {
        updateItems: function (e, t, n) {
            t += "/update?format=json", $.ajax({
                url: t,
                type: "POST",
                dataType: "json",
                data: e,
                contentType: "application/json; charset=utf-8"
            }).done(function (e) {
                n(!0, e)
            }).fail(function (e) {
                n(!1, e)
            });
            return
        }, deleteItem: function (e, t, n) {
            t += "/delete?format=json", $.ajax({
                url: t,
                type: "POST",
                dataType: "json",
                data: e,
                contentType: "application/json; charset=utf-8"
            }).done(function (e) {
                n(!0, e)
            }).fail(function (e) {
                n(!1, e)
            });
            return
        }, updateCount: function (e) {
            $(".shopping-cart-count-trial").html(e.trial), $(".shopping-cart-count-quote").html(e.quote), $(".shopping-cart-count-total").html(e.total)
        }
    };
    $(".cart-enable").on("click", ":checkbox", function (t) {
        $this = $(this), $this.closest("h5.h-bar").length && (t.stopPropagation(), $this.parent().hasClass("add-trial") ? $(this).closest("li").find(".add-trial :checkbox").attr("checked", this.checked) : $(this).closest("li").find(".add-quote :checkbox").attr("checked", this.checked));
        var n = $(".cart-enable").data("carturl"), r = $("#cart-form").serialize();
        e.updateItems(r, n, function (t, n) {
            t && ($('.nav-tabs a[data-target="#products"]').popover("hide"), e.updateCount(n), setCartCheckoutButton())
        })
    }), $(document).on("input", ".add-quantity>input", $.debounce(300, function () {
        var t = $(this), n = $("#cart-form").serialize(), r = $(".cart-enable"), i = r.data("carturl"), s = r.attr("data-cart-update"), o = r.attr("data-cart-error");
        e.updateItems(n, i, function (n, r) {
            n ? (tooltipHelper(t, s, "left"), e.updateCount(r), setCartCheckoutButton()) : tooltipHelper(t, o, "left")
        })
    })), $(".shopping-cart").on("click", ".shopping-cart-remove", function (t) {
        t.preventDefault();
        var n = $(this).closest(".product-item"), r = $(".shopping-cart").data("carturl"), i = {
            item: {
                itemId: n.data("itemid"),
                quote: 1,
                trial: 1
            }
        };
        e.deleteItem(i, r, function (t, r) {
            t && (n.remove(), e.updateCount(r))
        })
    }), $(document).on("change", ".cart-action :checkbox", function () {
        var e = $(this), t = $(".cart-enable"), n = t.length ? t.attr("data-cart-add") : "Added", r = t.length ? t.attr("data-cart-remove") : "Removed", i = e.is(":checked") ? n : r;
        tooltipHelper(e, i, "left")
    }), $(document).on("submit click", ".disabled", function (e) {
        e.preventDefault(), e.stopPropagation()
    }), setCartCheckoutButton()
}), $(document).ready(function () {
    addPopupArchive(), $("#share-whatsnew-modal").hasClass("shareasseterror") && $("#share-whatsnew-modal").modal({keyboard: !1}), $(document).on("click", ".whatsnew-share-link", function (e) {
        e.preventDefault();
        var t = $("#share-whatsnew-modal");
        t.find(".whatsnew-share-title").text($(this).attr("data-title")), t.find('input[data-source="assettitle"]').val($(this).attr("data-title")), t.find('input[data-source="assetslug"]').val($(this).attr("data-url")), t.modal()
    }), $(".feature-container").on("click", ".feature-image-link", function (e) {
        if (Modernizr.touch) {
            var t = $(this), n = t.closest(".feature-carousel"), r = n.hasClass("hover");
            return r || ($(".feature-carousel").removeClass("hover"), n.addClass("hover")), !1
        }
    }), $(".archive-select").chosen({disable_search_threshold: "12", width: "100%"}).change(function (e) {
        var t = $("#year").val(), n = $("#month").val();
        $(".archive-date-select").removeClass("open"), updateArchiveDateValues(n, t)
    }), $(".archive-month-changer").click(function (e) {
        e.preventDefault();
        var t = $(this), n = t.data("year"), r = t.data("month");
        $("html").hasClass("ie7") || ($("#year").data("chosen").current_value = n, $("#month").data("chosen").current_value = r), updateArchiveDateValues(r, n)
    }), $("#archive-specialties a").click(function () {
        var e = $(this), t = e.closest("ul"), n = t.find("a"), r = n.filter(".show-all-a");
        if (e.hasClass("show-all-a")) {
            if (e.hasClass("selected"))return !1;
            n.removeClass("selected"), r.addClass("selected")
        } else if (e.hasClass("selected")) {
            e.removeClass("selected");
            var i = n.filter(".selected");
            i.length || r.addClass("selected")
        } else {
            r.removeClass("selected"), e.addClass("selected");
            var i = n.filter(".selected");
            n.length - i.length == 1 && (n.removeClass("selected"), r.addClass("selected"))
        }
        var s = [];
        return n.filter(".selected").each(function () {
            s.push($(this).data("type"))
        }), $("#archiveSpecialties").val(s.join()), postArchiveForm(), !1
    }), $(".archive-filter-box select").chosen({disable_search_threshold: "12", width: "100%"}).change(function () {
        var e = $(this).val();
        e ? $("#archiveSpecialties").val(e.join()) : $("#archiveSpecialties").val(""), postArchiveForm()
    })
}), function (e) {
    var t = 174e4, n = e("#user-name"), r = n.length > 0;
    if (r) {
        var i = n.hasClass("persistent"), s = function (n) {
            var r = "";
            i || (r = new Date((new Date).getTime() + t - 100)), (!i || typeof n == "boolean" && n) && e.cookie("sessiontimer", "1", {
                path: "/",
                expires: r
            })
        };
        setInterval(function () {
            e.cookie("sessiontimer") || (window.location = "/account/logout?timedout")
        }, 1e4), s(!0), e.ajaxSetup({complete: s})
    }
}(jQuery), $("#embargoWarning").bind("closed", function () {
    $.cookie("dismissedcountryembargo", "true", {domain: ".arthrex.com", expires: 1e4})
}), function () {
    $(function () {
        return $(".search-filter-button").on({
            click: function () {
                return $(".search-filters-container").toggle()
            }
        }), $(".search-filter-header").on({
            click: function () {
                var e, t;
                return t = $(this), e = t.attr("data-filters"), $("div[data-filters]").addClass("hidden"), $("li[data-filters]").children().removeClass("selected"), $('div[data-filters="' + e + '"]').removeClass("hidden"), $('li[data-filters="' + e + '"]').children().addClass("selected")
            }
        })
    })
}.call(this), $(document).ready(function () {
    $("#share-search-modal").hasClass("searchshareerror") && $("#share-search-modal").modal({keyboard: !1}), $(document).on("click", ".search-share-link", function (e) {
        e.preventDefault();
        var t = $("#share-search-modal");
        t.find(".search-share-title").text($(this).attr("data-title")), t.find('input[data-source="searchtitle"]').val($(this).attr("data-title")), t.find('input[data-source="slug"]').val($(this).attr("data-url")), t.modal()
    })
}), $(document).ready(function () {
    $(".register").fadeOut(6e3), $("#userAccount-country").chosen({width: "100%"}), $("#userAccount-country").chosen({width: "100%"}).change(function () {
        var e = $("#userAccount-country").chosen().val(), t = $(this).closest("form");
        e == "US" || e == "CA" ? (t.find(".country-specific-wrapper.select").css("display", "block").find("input,select").prop("disabled", !1), t.find(".country-specific-wrapper.free").css("display", "none").find("input,select").prop("disabled", !0)) : (t.find(".country-specific-wrapper.select").css("display", "none").find("input,select").prop("disabled", !0), t.find(".country-specific-wrapper.free").css("display", "block").find("input,select").prop("disabled", !1));
        var n = prepareTagFilter();
        n.queryArgs = e, $assetAjax = $.ajax({url: "/account/register", data: n, cache: !1}).done(function (e) {
            var t = $(e);
            $("#tag-container").html(e), $("label:contains(State)").addClass("control-label"), $("label:contains(State)").addClass("state-label"), $(".state-select").wrap("<div class='controls'></div>"), $("</label>").replaceWith(""), $("#us_state").hide(), $(".state-select").css("margin-top", "-30px")
        })
    })
}), $(document).ready(function () {
    $("#country-select").chosen({width: "100%"}), $("#country-select").chosen({width: "100%"}).change(function () {
        var e = $("#country-select").chosen().val(), t = prepareTagFilter();
        t.queryArgs = e, $assetAjax = $.ajax({
            url: "/form/state",
            data: t,
            cache: !1,
            dataType: "json"
        }).done(function (e) {
            var t = '<option value=""></option>';
            $.each(e, function (n) {
                t += '<option value="' + e[n].id + '">' + e[n].name + "</option>"
            }), $("#state-select").html(t)
        })
    })
}), $(document).ready(function () {
    function e() {
        $(".whats-new-prior div.content-loading").length || $(".whats-new-prior").append('<div class="content-loading"></div>');
        var e = $(".whats-new-filter-select select").val();
        n(e), t(), $(".whats-new-filter-select").hide(), $(".whats-new-filter-link").show()
    }

    function t() {
        if ($(".whats-new-filter-select select").length) {
            var e = $(".whats-new-filter-select select").val(), t = [];
            $(".whats-new-filter-select select > option").each(function (n, r) {
                $.inArray(r.value, e) >= 0 && t.push(r.text)
            });
            var n = t.length >= 1 ? t.join(", ") : $(".selected-filters").data("placeholder");
            $(".whats-new-filter-link span").text(n)
        }
    }

    function n(e) {
        var t = e && e.length >= 1 && e[0] !== undefined ? {specialties: JSON.stringify(e)} : {specialties: ""}, n = $("#langSelect2").data("currentLanguage") ? $("#langSelect2").data("currentLanguage").toLowerCase() : "en";
        url = "/" + (n != "en" ? n : ""), $request = $.ajax({
            url: url,
            type: "POST",
            data: t,
            cache: "false"
        }).success(function (e) {
            $(".whats-new-prior-content").html(e), $(".whats-new-more-specialties").tooltip()
        }).error(function (e) {
        }).complete(function () {
            $(".whats-new-prior .content-loading").remove()
        })
    }

    function r() {
        var e = !1;
        if ($.cookie("specialties")) {
            var n = decodeURI($.cookie("specialties")).split(",");
            $(n).each(function () {
                var e = $('.whats-new-specialty-link[data-type="' + this + '"]');
                e && e.length && e.parent().toggleClass("active"), $(".whats-new-filter-select select") && $('.whats-new-filter-select select option[value="' + this + '"]').attr("selected", "selected")
            }), $(".whats-new-filter-select select").trigger("chosen:updated")
        }
        i(), t()
    }

    function i() {
        $(".whats-new-specialty-link").length && ($('.whats-new-filters li.active:not(".single-select")').length === 0 ? $(".whats-new-filters li.single-select").addClass("active") : $(".whats-new-filters li.single-select").removeClass("active"))
    }

    $(".whats-new-more-specialties").tooltip(), r(), $(".whats-new-filter-select").hide(), $(".whats-new-filter-select select").chosen({width: "95%"}).change(function () {
        e()
    }), $("#reset-filters").click(function (t) {
        t.preventDefault(), $(".whats-new-filter-select select").val(""), e()
    }), $("html").on("touchstart", function (e) {
        $(".whats-new-filter-select").hide(), $(".whats-new-filter-link").show()
    }), $(".whats-new-filter-select select").on("touchstart", function (e) {
        e.stopPropagation()
    }), $("#reset-filters").on("touchstart", function (e) {
        e.stopPropagation()
    }), $(".whats-new-specialty-link").click(function (e) {
        e.preventDefault(), $(".whats-new-prior").append('<div class="content-loading"></div>');
        var t = $(this);
        t.parent().hasClass("single-select") === !0 && $('.whats-new-filters li:not(".single-select")').removeClass("active"), t.parent().toggleClass("active"), i();
        var r = [];
        $(".active .whats-new-specialty-link").each(function () {
            r.push($(this).data("type"))
        }), n(r)
    }), $(".whats-new-filter-link").click(function (e) {
        e.preventDefault(), $(".whats-new-filter-link").hide(), $(".whats-new-filter-select").show()
    })
});