//AngularJs
var appSim = angular.module('simulador', ['ngMorph', 'ui.utils.masks']);


appSim.directive('strongSecret', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                if (ngModelValue > 2500 && ngModelValue < 50000) {
                    ctrl.$setValidity('sixCharactersValidator', true);
                } else {
                    ctrl.$setValidity('sixCharactersValidator', false);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
});
        
appSim.controller('simCtrl', ['$scope', function($scope) {
    
    $scope.outroValor = "";
    $scope.formOutro = "Outro";
    $scope.actionUrl = "pessoal";
    $scope.outro = {
       closeEl: '.close',
       modal: {
        template: '<div class="col-md-12 calcular"><div class="row"><span class="close-x pull-right close">x</span></div><div class="row"><form id="formCalcular" name="formCalcular"><label>Valor</label>'
                +'<input required type="text" name="inp-calcular" class="form-control" ng-model="outroValor" ui-money-mask="0" strong-secret />'
                +'<p ng-show="outroValor > 0 && !formCalcular.$valid"><small>Digite um valor entre R$ 2.500 a R$ 50.000</small></p>'
                +'<button type="button" ng-disabled="!formCalcular.$valid" ng-click="upOutroValor()">continuar</button></form></div></div>',
       }
     }
     
     $scope.validate = function(value){
//         console.log(value);
     }
     
     $scope.upOutroValor = function(){
        $scope.formOutro = "R$ " + this.outroValor;
        angular.element('#valor-06').attr("value", this.outroValor + '.00');
        angular.element('.close').trigger("click");
     }
     
    $scope.cleanOutroValor = function(){
        $scope.formOutro = "Outro";
     }
    
}]);
//FIM ANGULAR JS

Start = {
    init: function(){
        Start.owlCarousel();
        Start.blogPage();
        Start.contatoSend();
        Start.openMenuMobile();
        
        $('.maskCEP').mask("00000-000");
        $('.maskCPF').mask("000.000.000-00");
        $('.maskFONE').focusout(function(){
            var phone, element;
            element = $(this);
            element.unmask();
            phone = element.val().replace(/\D/g, '');
            
            if(phone.length > 10) {
                element.mask("(00) 00000-0009");
            } else {
                element.mask("(00) 0000-00009");
            }
        }).trigger('focusout');
    },
    
    owlCarousel: function () {
        var simple = $(".simple-owl-carousel");
        simple.length > 0 && simple.each(function () {
            var ele = $(this),
                    items = ele.data("items"),
                    slidespeed = ele.data("slidespeed"),
                    pagination = ele.data("pagination"),
                    autoplay = ele.data("autoplay"),
                    navigation = ele.data("navigation"),
                    customnav = ele.data("custom-navigation");

            items || (items = 4);
            items = parseInt(items, 10);

            slidespeed || (slidespeed = 500);
            slidespeed = parseInt(slidespeed, 10);

            pagination = pagination ? !0 : !1;
            autoplay = false == autoplay ? !1 : !0;
            navigation = navigation ? !0 : !1;

            ele.owlCarousel({
                items: items,
                pagination: pagination, //dots
                slideSpeed: slidespeed,
                autoPlay: autoplay,
                navigation: navigation,
                lazyLoad: true,
                navigationText: [" Prev ", "Next"]
            });

            customnav ?
                    $("#" + customnav + " .next").on("click", function () {
                ele.trigger('owl.next');
            })
                    : !1;

            customnav ?
                    $("#" + customnav + " .prev").on("click", function () {
                ele.trigger('owl.prev');
            })
                    : !1;
        });
    },
    blogPage: function(){
        $(".loadMore .btn").click(function(e){
            e.preventDefault();
            //e.StopPropagation();
            var self = $(this);
            var container = "#blog .items",
                page = self.data("page")+1,
                pageTotal = $("#blog #pagetotal").data("pagetotal");
            
            if(self.attr("disabled") == "disabled") {
                return false;
            }

            $.ajax({
                url: "",
                data: {'Post_page' : page },
                dataType: 'html',
                beforeSend: function(){
                    $(".ajax-preloader").show();
                },
                success: function(html) {
                    var items = $(html).find("div.itemBlog");
                    
                    $.each(items, function(key, item) {
                        $(item).imagesLoaded(function(){
                            $(container).append($(item));
                        });
                    });

                    $(".ajax-preloader").hide();
                }
            })
                .done(function(){
                    if(page >= pageTotal) {
                        self.attr("disabled", true);
                    }
                    self.data("page", page);
                });
        });
    },
    contatoSend: function(){
        $("#faleConosco-form button").click(function(e){
            e.preventDefault();
            var form = $(this).parents("form");
            
            $.ajax({
                url: "site/sendContato/",
                data: form.serialize(),
                type: "post",
                dataType: "json",
                beforeSend: function(){
                    form.find("input, textarea").removeClass("error");
                },
                success: function(json){
                    if(json.success){
                        form.find("input, textarea").val("");
                    } else {
                        $.each(json.erros, function( index, value ) {
                            $("#FaleConosco_"+index).addClass("error")
                        });
                    }
                    $("#messageSend .dataMsg").html(json.msg);
                    $("#messageSend").addClass("active");
                }
            });
        });
        $("#messageSend .closeMessageSend").click(function(){
            $("#messageSend").removeClass("active");
        });
    },
    openMenuMobile: function(){
        $("#toogle-menu").click(function(){
            $(this).toggleClass("active");
            $("#nav-principal").toggleClass("active");
        });
    },
    
    ajustePreSimulador: function() {
        var windowWidth = $(window).width();
        var containerWidth = $(".container").width();
        var preSimuladorWidth = $("#pre-simulador").width();
        var padding = ((((windowWidth - containerWidth )/2)) + 50) + 'px';
        $("#pre-simulador").css("padding-left", padding);
    },
    abrirPopupAtendimento: function(){
        var width = 300;
        var height = 600;
        var left = 99;
        var top = 99;
        window.open('http://177.70.121.160/sisconsulta/atendimento/atendimentocreditovc', '', 'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left + ', scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');
        return false;
    }
}

Start.init();


/**
 * Isotope initialization
 */
(function ($) { "use strict";

    jQuery(window).load(function () {
        var container = jQuery('.isotope-container');

        if (container.length > 0) {
            
            if (jQuery().imagesLoaded && jQuery().isotope) {

                if (document.querySelector('body').offsetHeight < window.innerHeight) {
                    document.documentElement.style.overflowY = 'scroll';
                }

                // init the plugin
                container.imagesLoaded(function () {

                    jQuery('.ajax-page-preloader').css({
                        display: 'none'
                    });

                    container.fadeIn(1000, function () {
                        try {
                            $('video.self-host').mediaelementplayer({
                                enableAutosize: true,
                                videoWidth: -1,
                                videoHeight: -1
                            });
                        }
                        catch (err) { }

                        try {
                            $('audio').mediaelementplayer({
                                enableAutosize: true,
                                features: ['playpause', 'progress', 'current']
                            });
                        }
                        catch (err) { }
                    }).isotope({
                        layoutMode: 'sloppyMasonry',
                        itemSelector: '.isotope-element'
                    });
                });

                // reLayout the isotope plugin if the windows is resized
                jQuery(window).smartresize(function () {
                    container.isotope('reLayout');
                });

                // handle the isotope filter
                jQuery('ol.portfolio-isotope-filters li').click(function () {
                    var selector = jQuery(this).attr('data-filter');
                    container.isotope({ filter: selector });
                    return false;
                });
            }
        }
        else {
            try {
                $('video.self-host').mediaelementplayer({
                    enableAutosize: true,
                    videoWidth: -1,
                    videoHeight: -1
                });
            }
            catch (err) { }

            try {
                $('audio').mediaelementplayer({
                    enableAutosize: true,
                    features: ['playpause', 'progress', 'current']
                });
            }
            catch (err) { }
        }
    });
    
    
    //Carregar mais posts
    $("#loadMorePost").click(function(e){
        e.preventDefault();
        //e.StopPropagation();
        var self = $(this);
        var container = self.data("container");
        var page = self.data("page") + 1;
        
        if(self.attr("disabled") == "disabled") {
            return false;
        }
        
        $.ajax({
            url: sBaseUrl+"/blog/modulo/",
            data: {'Post_page' : page },
            dataType: 'html',
            beforeSend: function(){
                $(".ajax-preloader").show();
            },
            success: function(html) {
                var items = $(html).find("div.element-wrap");
                var pagetotal = $(html).find("a#pagetotal").data("pagetotal");
                
                $.each(items, function(key, item) {
                    $(item).imagesLoaded(function(){
                        $(container).append($(item)).isotope( 'appended', $(item) );
                    });
                });
                
                if(page >= pagetotal) {
                    self.css('opacity', '.3');
                    self.attr('disabled', true);
                }
                self.data("page", page);
                $(".ajax-preloader").hide();
            }
        });
    });

})(jQuery);