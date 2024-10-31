(function($) {
    "use strict";

    var actionTargetProductId;

    if ( typeof VideoLightBoxWidget != 'function' ) { 
        window.VideoLightBoxWidget = function(){
        }
    }

    const hasRtl = function(){
        if (jQuery("body").hasClass("rtl"))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function changeActionTargetProductId (productId) {
        actionTargetProductId = productId;
    }
     
    const widgetTaxonomyList = function($scope) {
        var taxList = $scope.find('.tmpcoder-taxonomy-list');

        if ( taxList.data('show-on-click') == 'yes' ) {

            // $scope.find('.tmpcoder-tax-dropdown').css('margin-left', -($scope.find('.tmpcoder-tax-dropdown').width()));

            taxList.find('.tmpcoder-taxonomy i.tmpcoder-tax-dropdown').on('click', function(e) {

                e.preventDefault();

                if ( taxList.find('.tmpcoder-sub-taxonomy[data-term-id="child-'+ $(this).closest('li').data('term-id') +'"]').hasClass('tmpcoder-sub-hidden') ) {
                    $(this).removeClass('fa-caret-right').addClass('fa-caret-down');
                    // $scope.find('.fa-caret-down').css('margin-left', -($scope.find('.fa-caret-down').width()));
                    taxList.find('.tmpcoder-sub-taxonomy[data-term-id="child-'+ $(this).closest('li').data('term-id') +'"]').removeClass('tmpcoder-sub-hidden');
                } else {
                    $(this).removeClass('fa-caret-down').addClass('fa-caret-right');
                    // $scope.find('.fa-caret-right').css('margin-left', -($scope.find('.fa-caret-right').width()));
                    taxList.find('.tmpcoder-sub-taxonomy[data-term-id="child-'+ $(this).closest('li').data('term-id') +'"]').addClass('tmpcoder-sub-hidden');

                    taxList.find('.tmpcoder-inner-sub-taxonomy[data-term-id="grandchild-'+ $(this).closest('li').data('term-id') +'"]').each(function() {
                        if ( !$(this).hasClass('tmpcoder-sub-hidden') ) {
                            taxList.find('.tmpcoder-sub-taxonomy[data-id="'+ $(this).data('parent-id') +'"] i.tmpcoder-tax-dropdown').removeClass('fa-caret-down').addClass('fa-caret-right');
                            // $scope.find('.fa-caret-right').css('margin-left', -($scope.find('.fa-caret-right').width()));
                            $(this).addClass('tmpcoder-sub-hidden');
                        }
                    });

                    taxList.find('.tmpcoder-inner-sub-taxonomy-2[data-term-id="great-grandchild-'+ $(this).closest('li').data('term-id') +'"]').each(function() {
                        if ( !$(this).hasClass('tmpcoder-sub-hidden') ) {
                            taxList.find('.tmpcoder-sub-taxonomy[data-id="'+ $(this).data('parent-id') +'"] i.tmpcoder-tax-dropdown').removeClass('fa-caret-down').addClass('fa-caret-right');
                            // $scope.find('.fa-caret-right').css('margin-left', -($scope.find('.fa-caret-right').width()));
                            $(this).addClass('tmpcoder-sub-hidden');
                        }
                    });

                    // if (!taxList.find('.tmpcoder-inner-sub-taxonomy[data-term-id="grandchild-'+ $(this).parent('li').data('term-id') +'"]').hasClass('tmpcoder-sub-hidden')) {
                    //  taxList.find('.tmpcoder-sub-taxonomy[data-term-id="child-'+ $(this).parent('li').data('term-id') +'"] i').removeClass('fa-caret-down').addClass('fa-caret-right');
                    //  taxList.find('.tmpcoder-inner-sub-taxonomy[data-term-id="grandchild-'+ $(this).parent('li').data('term-id') +'"]').addClass('tmpcoder-sub-hidden');
                    // }
                }

                taxList.find('.tmpcoder-inner-sub-taxonomy[data-term-id="grandchild-'+ $(this).closest('li').data('term-id') +'"] i.tmpcoder-tax-dropdown').removeClass('fa-caret-down').addClass('fa-caret-right');

                if ( !taxList.find('.tmpcoder-inner-sub-taxonomy-2[data-term-id="great-grandchild-'+ $(this).closest('li').data('term-id') +'"]').hasClass('tmpcoder-sub-hidden') ) {
                    taxList.find('.tmpcoder-inner-sub-taxonomy-2[data-term-id="great-grandchild-'+ $(this).closest('li').data('term-id') +'"]').addClass('tmpcoder-sub-hidden');
                }
            });

            taxList.find('.tmpcoder-sub-taxonomy i.tmpcoder-tax-dropdown').on('click', function(e) {

                e.preventDefault();

                if ( taxList.find('.tmpcoder-inner-sub-taxonomy[data-parent-id="'+ $(this).closest('li').data('id') +'"]').hasClass('tmpcoder-sub-hidden') ) {
                    $(this).removeClass('fa-caret-right').addClass('fa-caret-down');
                    // $scope.find('.fa-caret-down').css('margin-left', -($scope.find('.fa-caret-down').width()));
                    taxList.find('.tmpcoder-inner-sub-taxonomy[data-parent-id="'+ $(this).closest('li').data('id') +'"]').removeClass('tmpcoder-sub-hidden');
                } else {
                    $(this).removeClass('fa-caret-down').addClass('fa-caret-right');
                    // taxList.find('.tmpcoder-sub-taxonomy i').removeClass('fa-caret-down').addClass('fa-caret-right');
                    // $scope.find('.fa-caret-right').css('margin-left', -($scope.find('.fa-caret-right').width()));
                    taxList.find('.tmpcoder-inner-sub-taxonomy[data-parent-id="'+ $(this).closest('li').data('id') +'"]').addClass('tmpcoder-sub-hidden');
                }

                taxList.find('.tmpcoder-inner-sub-taxonomy[data-parent-id="'+ $(this).closest('li').data('id') +'"] i.tmpcoder-tax-dropdown').removeClass('fa-caret-down').addClass('fa-caret-right');

                if ( !taxList.find('.tmpcoder-inner-sub-taxonomy-2[data-term-id="great-grandchild-'+ $(this).closest('li').data('term-id').replace('child-', '') +'"]').hasClass('tmpcoder-sub-hidden') ) {
                    taxList.find('.tmpcoder-inner-sub-taxonomy-2[data-term-id="great-grandchild-'+ $(this).closest('li').data('term-id').replace('child-', '') +'"]').addClass('tmpcoder-sub-hidden');
                }
            });

            taxList.find('.tmpcoder-inner-sub-taxonomy i.tmpcoder-tax-dropdown').on('click', function(e) {

                e.preventDefault();

                if ( taxList.find('.tmpcoder-inner-sub-taxonomy-2[data-parent-id="'+ $(this).closest('li').data('id') +'"]').hasClass('tmpcoder-sub-hidden') ) {
                    $(this).removeClass('fa-caret-right').addClass('fa-caret-down');
                    // $scope.find('.fa-caret-down').css('margin-left', -($scope.find('.fa-caret-down').width()));
                    taxList.find('.tmpcoder-inner-sub-taxonomy-2[data-parent-id="'+ $(this).closest('li').data('id') +'"]').removeClass('tmpcoder-sub-hidden');
                } else {
                    $(this).removeClass('fa-caret-down').addClass('fa-caret-right');
                    // taxList.find('.tmpcoder-sub-taxonomy i').removeClass('fa-caret-down').addClass('fa-caret-right');
                    // $scope.find('.fa-caret-right').css('margin-left', -($scope.find('.fa-caret-right').width()));
                    taxList.find('.tmpcoder-inner-sub-taxonomy-2[data-parent-id="'+ $(this).closest('li').data('id') +'"]').addClass('tmpcoder-sub-hidden');
                }
            });
        }
    }

    // End of widgetTaxonomyList

    const widgetMailchimp = function( $scope, $ ) {
        var mailchimpForm = $scope.find( 'form' );

        mailchimpForm.on( 'submit', function(e) {
            e.preventDefault();

            var buttonText = $(this).find('button').text();

            // Change Text
            $(this).find('button').text( $(this).find('button').data('loading') );

            var $formdata = $(this).serializeArray();
            var result = {};
            $.each($formdata, function() {
                result[this.name] = this.value;
            });

            result['action'] = 'mailchimp_subscribe';
            result['listId'] = mailchimpForm.data( 'list-id' );
            result['nonce'] = tmpcoder_plugin_script.nonce;

            $.ajax({
                url: tmpcoder_plugin_script.ajax_url,
                type: 'POST',
                data: result,
                success: function(data) {
                    if ( 'yes' == mailchimpForm.data('clear-fields') ) {
                        mailchimpForm.find('input').each(function() {
                            $(this).val('');
                        });
                    }

                    mailchimpForm.find('button').text( buttonText );

                    if ( 'subscribed' === data.status ) {
                        $scope.find( '.tmpcoder-mailchimp-success-message' ).show();
                    } else {
                        $scope.find( '.tmpcoder-mailchimp-error-message' ).show();
                    }
                    
                    $scope.find( '.tmpcoder-mailchimp-message' ).fadeIn();
                }
            });

        });

    } // End widgetMailchimp

    const widgetProductMiniCart = function( $scope, $ ) {

        $scope.find('.tmpcoder-mini-cart').css({"display": "none"});
    
        // $( document.body ).trigger( 'wc_fragment_refresh' );

        var animationSpeed = $scope.find('.tmpcoder-mini-cart-wrap').data('animation');

        $('body').on('click', function(e) {
            if ( !e.target.classList.value.includes('tmpcoder-mini-cart') && !e.target.closest('.tmpcoder-mini-cart') ) {
                if ( $scope.hasClass('tmpcoder-mini-cart-slide') ) {
                    $scope.find('.tmpcoder-mini-cart').slideUp(animationSpeed);
                } else {
                    $scope.find('.tmpcoder-mini-cart').fadeOut(animationSpeed);
                }
            }
        });

        if ( $scope.hasClass('tmpcoder-mini-cart-sidebar') ) {
            if ( $('#wpadminbar').length ) {
                $scope.find('.tmpcoder-mini-cart').css({
                    // 'top': $('#wpadminbar').css('height'),
                    // 'height': $scope.find('.tmpcoder-shopping-cart-wrap').css('height') -  $('#wpadminbar').css('height')
                    'z-index': 999999
                });
            }

            closeSideBar();

            $scope.find('.tmpcoder-shopping-cart-wrap').on('click', function(e) {
                // if ( !e.target.classList.value.includes('widget_shopping_cart_content') && !e.target.closest('.widget_shopping_cart_content') ) {
                if ( !e.target.classList.value.includes('tmpcoder-shopping-cart-inner-wrap') && !e.target.closest('.tmpcoder-shopping-cart-inner-wrap') ) {
                    // $scope.find('.widget_shopping_cart_content').addClass('tmpcoder-mini-cart-slide-out');
                    $scope.find('.tmpcoder-shopping-cart-inner-wrap').addClass('tmpcoder-mini-cart-slide-out');
                    $scope.find('.tmpcoder-mini-cart-slide-out').css('animation-speed', animationSpeed);
                    $scope.find('.tmpcoder-shopping-cart-wrap').fadeOut(animationSpeed);
                    $('body').removeClass('tmpcoder-mini-cart-sidebar-body');
                    setTimeout(function() {
                        // $scope.find('.widget_shopping_cart_content').removeClass('tmpcoder-mini-cart-slide-out');
                        $scope.find('.tmpcoder-shopping-cart-inner-wrap').removeClass('tmpcoder-mini-cart-slide-out');
                        $scope.find('.tmpcoder-mini-cart').css({"display": "none"});
                    }, animationSpeed + 100);
                }
            });
        }

        if ( $scope.find('.tmpcoder-mini-cart').length ) {
            if ( $scope.hasClass('tmpcoder-mini-cart-sidebar') || $scope.hasClass('tmpcoder-mini-cart-dropdown') ) {
                $scope.find('.tmpcoder-mini-cart-toggle-btn').on('click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if ( 'none' === $scope.find('.tmpcoder-mini-cart').css("display") ) {
                        if ( $scope.hasClass('tmpcoder-mini-cart-slide') ) {
                            $scope.find('.tmpcoder-mini-cart').slideDown(animationSpeed);
                        } else {
                            $scope.find('.tmpcoder-mini-cart').fadeIn(animationSpeed);
                        }
                        if ( $scope.hasClass('tmpcoder-mini-cart-sidebar') ) {
                            $scope.find('.tmpcoder-shopping-cart-wrap').fadeIn(animationSpeed);
                            // $scope.find('.widget_shopping_cart_content').addClass('tmpcoder-mini-cart-slide-in');
                            $scope.find('.tmpcoder-shopping-cart-inner-wrap').addClass('tmpcoder-mini-cart-slide-in');
                            $scope.find('.tmpcoder-mini-cart-slide-in').css('animation-speed', animationSpeed);
                            $('body').addClass('tmpcoder-mini-cart-sidebar-body');
                        }
                        setTimeout(function() {
                            // $scope.find('.widget_shopping_cart_content').removeClass('tmpcoder-mini-cart-slide-in');
                            $scope.find('.tmpcoder-shopping-cart-inner-wrap').removeClass('tmpcoder-mini-cart-slide-in');
                            if ( $scope.hasClass('tmpcoder-mini-cart-sidebar') ) {
                                $scope.find('.tmpcoder-woo-mini-cart').trigger('resize');
                            }
                        }, animationSpeed + 100);
                    } else {
                        if ( $scope.hasClass('tmpcoder-mini-cart-slide') ) {
                            $scope.find('.tmpcoder-mini-cart').slideUp(animationSpeed);
                        } else {
                            $scope.find('.tmpcoder-mini-cart').fadeOut(animationSpeed);
                        }
                    }
                });
            }
        }

        var mutationObserver = new MutationObserver(function(mutations) {
            if (  $scope.hasClass('tmpcoder-mini-cart-sidebar') ) {
                closeSideBar();

                // if ( $scope.find('.tmpcoder-mini-cart').data('close-cart-heading') ) {
                //  $scope.find('.tmpcoder-close-cart h2').text($scope.find('.tmpcoder-mini-cart').data('close-cart-heading').replace(/-/g, ' '));
                // }
            }
            
            $scope.find('.woocommerce-mini-cart-item').on('click', '.tmpcoder-remove-item-from-mini-cart', function() {
                $(this).closest('li').addClass('tmpcoder-before-remove-from-mini-cart');
            });
        });

        // Listen to Mini Cart Changes
        mutationObserver.observe($scope[0], {
            childList: true,
            subtree: true,
        });

        function closeSideBar() {
            $scope.find('.tmpcoder-close-cart span').on('click', function(e) {
                // $scope.find('.widget_shopping_cart_content').addClass('tmpcoder-mini-cart-slide-out');
                $scope.find('.tmpcoder-shopping-cart-inner-wrap').addClass('tmpcoder-mini-cart-slide-out');
                $scope.find('.tmpcoder-mini-cart-slide-out').css('animation-speed', animationSpeed);
                $scope.find('.tmpcoder-shopping-cart-wrap').fadeOut(animationSpeed);
                $('body').removeClass('tmpcoder-mini-cart-sidebar-body');
                setTimeout(function() {
                    // $scope.find('.widget_shopping_cart_content').removeClass('tmpcoder-mini-cart-slide-out');
                    $scope.find('.tmpcoder-shopping-cart-inner-wrap').removeClass('tmpcoder-mini-cart-slide-out');
                    $scope.find('.tmpcoder-mini-cart').css({"display": "none"});
                }, animationSpeed + 100);
            });
        }
    }
    
    // End of widgetProductMiniCart

    const widgetAdvancedAccordion = function($scope, $) {
        var acc = $scope.find('.tmpcoder-acc-button');
        var accItemWrap = $scope.find('.tmpcoder-accordion-item-wrap');
        var accordionType = $scope.find('.tmpcoder-advanced-accordion').data('accordion-type');
        var activeIndex = +$scope.find('.tmpcoder-advanced-accordion').data('active-index') - 1;
        var accordionTrigger = $scope.find('.tmpcoder-advanced-accordion').data('accordion-trigger');
        var interactionSpeed = +$scope.find('.tmpcoder-advanced-accordion').data('interaction-speed') * 1000;

        // ?active_panel=panel-index#your-id
        var activeTabIndexFromLocation = window.location.href.indexOf("active_panel=");

        if (activeTabIndexFromLocation > -1) {
            activeIndex = +window.location.href.substring(activeTabIndexFromLocation,  window.location.href.lastIndexOf("#")).replace("active_panel=", '') - 1;
        }

        if ('click' === accordionTrigger) {

            if ( accordionType == 'accordion' ) {
                acc.on("click", function() {
                    var thisIndex = acc.index(this);
                    acc.each(function(index){
                        index != thisIndex ? $(this).removeClass('tmpcoder-acc-active') : '';
                    });
                    $scope.find('.tmpcoder-acc-panel').each(function(index) {
                        index != thisIndex ? $(this).removeClass('tmpcoder-acc-panel-active') && $(this).slideUp(interactionSpeed) : '';
                    });
                    $(this).toggleClass("tmpcoder-acc-active");
                    var panel = $(this).next();
                    if ( !panel.hasClass('tmpcoder-acc-panel-active') ) {
                        panel.slideDown(interactionSpeed);
                        panel.addClass('tmpcoder-acc-panel-active');
                    } else {
                        panel.slideUp(interactionSpeed);
                        panel.removeClass('tmpcoder-acc-panel-active');
                    }
                });
            } else {
                acc.each(function() {
                    $(this).on("click", function() {
                        $(this).toggleClass("tmpcoder-acc-active");
                        var panel = $(this).next();
                        if ( !panel.hasClass('tmpcoder-acc-panel-active') ) {
                            panel.slideDown(interactionSpeed);
                            panel.addClass('tmpcoder-acc-panel-active');
                        } else {
                            panel.slideUp(interactionSpeed);
                            panel.removeClass('tmpcoder-acc-panel-active');
                        }
                    });
                });
            }

            acc && (activeIndex > -1 && acc.eq(activeIndex).trigger('click'));
        } else if ( accordionTrigger == 'hover' ) {
            accItemWrap.on("mouseenter", function() {
                    var thisIndex = accItemWrap.index(this);

                    $(this).find('.tmpcoder-acc-button').addClass("tmpcoder-acc-active");

                    var panel = $(this).find('.tmpcoder-acc-panel');
                        panel.slideDown(interactionSpeed);
                        panel.addClass('tmpcoder-acc-panel-active');

                    accItemWrap.each(function(index) {
                        if (index != thisIndex) {
                            $(this).find('.tmpcoder-acc-button').removeClass("tmpcoder-acc-active");
                            var panel = $(this).find('.tmpcoder-acc-panel');
                            panel.slideUp(interactionSpeed);
                            panel.removeClass('tmpcoder-acc-panel-active');
                        }
                    });
            });
            
            accItemWrap &&  (activeIndex > -1 && accItemWrap.eq(activeIndex).trigger('mouseenter'));
        }

        $scope.find('.tmpcoder-acc-search-input').on( {
            focus: function() {
                $scope.addClass( 'tmpcoder-acc-search-input-focus' );
            },
            blur: function() {
                $scope.removeClass( 'tmpcoder-search-form-input-focus' );
            }
        } );
        
        let allInAcc = $scope.find('.tmpcoder-advanced-accordion > *');

        $scope.find('i.fa-times').on('click', function() {
            $scope.find('.tmpcoder-acc-search-input').val('');
            $scope.find('.tmpcoder-acc-search-input').trigger('keyup');
        });

        var iconBox = $scope.find('.tmpcoder-acc-icon-box');

        iconBox.each(function() {
            $(this).find('.tmpcoder-acc-icon-box-after').css({
                'border-top': $(this).height()/2 + 'px solid transparent', 
                'border-bottom': $(this).height()/2 + 'px solid transparent'
            }); 
        });

        $(window).resize(function() {
            iconBox.each(function() {
                $(this).find('.tmpcoder-acc-icon-box-after').css({
                    'border-top': $(this).height()/2 + 'px solid transparent', 
                    'border-bottom': $(this).height()/2 + 'px solid transparent'
                }); 
            });
        });

        $scope.find('.tmpcoder-acc-search-input').on('keyup', function() {
            setTimeout( () => {
                let thisValue = $(this).val();
                if ( thisValue.length > 0 ) {
                    $scope.find('.tmpcoder-acc-search-input-wrap').find('i.fa-times').css('display', 'inline-block');
                    allInAcc.each(function() {
                        if ( $(this).hasClass('tmpcoder-accordion-item-wrap') ) {
                            var itemWrap = $(this);
                            if ( itemWrap.text().toUpperCase().indexOf(thisValue.toUpperCase()) == -1 ) {
                                itemWrap.hide();
                                if ( itemWrap.find('.tmpcoder-acc-button').hasClass('tmpcoder-acc-active') && itemWrap.find('.tmpcoder-acc-panel').hasClass('tmpcoder-acc-panel-active') ) {
                                    itemWrap.find('.tmpcoder-acc-button').removeClass('tmpcoder-acc-active');
                                    itemWrap.find('.tmpcoder-acc-panel').removeClass('tmpcoder-acc-panel-active');
                                }
                            } else {
                                itemWrap.show();
                                if ( !itemWrap.find('.tmpcoder-acc-button').hasClass('tmpcoder-acc-active') && !itemWrap.find('.tmpcoder-acc-panel').hasClass('tmpcoder-acc-panel-active') ) {
                                    itemWrap.find('.tmpcoder-acc-button').addClass('tmpcoder-acc-active');
                                    itemWrap.find('.tmpcoder-acc-panel').addClass('tmpcoder-acc-panel-active');
                                    itemWrap.find('.tmpcoder-acc-panel').slideDown(interactionSpeed);
                                }
                            }
                        }
                    });
                } else {
                    $scope.find('.tmpcoder-acc-search-input-wrap').find('i.fa-times').css('display', 'none');
                    allInAcc.each(function() {
                        if ( $(this).hasClass('tmpcoder-accordion-item-wrap') ) {
                            $(this).show();
                            if ( $(this).find('.tmpcoder-acc-panel').hasClass('tmpcoder-acc-panel-active') ) {
                                $(this).find('.tmpcoder-acc-panel').removeClass('tmpcoder-acc-panel-active');
                            }
                            if ( $(this).find('.tmpcoder-acc-button').hasClass('tmpcoder-acc-active') ) {
                                $(this).find('.tmpcoder-acc-button').removeClass('tmpcoder-acc-active')
                            }
                            $(this).find('.tmpcoder-acc-panel').slideUp(interactionSpeed);
                        }
                    });
                    // if ('click' === accordionTrigger) {
                    //  acc && (activeIndex > -1 && acc.eq(activeIndex).trigger('click'));
                    // } else if ( 'hover' === accordionTrigger ) {
                    //  accItemWrap &&  (activeIndex > -1 && accItemWrap.eq(activeIndex).trigger('mouseenter'));
                    // }
                }
            }, 1000);
        });
    }
        // end widgetAdvancedAccordion 

    const widgetWishlistButton = function($scope, $) {
        $.ajax({
            url: tmpcoder_plugin_script.ajax_url,
            type: 'POST',
            data: {
                action: 'check_product_in_wishlist',
                product_id: $scope.find('.tmpcoder-wishlist-add').data('product-id'),
                nonce: tmpcoder_plugin_script.nonce,
            },
            success: function(response) {
                if ( true == response ) {
                    if ( !$scope.find('.tmpcoder-wishlist-add').hasClass('tmpcoder-button-hidden') ) {
                        $scope.find('.tmpcoder-wishlist-add').addClass('tmpcoder-button-hidden');
                    }

                    if ( $scope.find('.tmpcoder-wishlist-remove').hasClass('tmpcoder-button-hidden') ) {
                        $scope.find('.tmpcoder-wishlist-remove').removeClass('tmpcoder-button-hidden');
                    }
                }
            }
        });

        $scope.find('.tmpcoder-wishlist-add').click(function(e) {
            e.preventDefault();
            var product_id = $(this).data('product-id');

            $(this).fadeTo(500, 0);

            $.ajax({
                url: tmpcoder_plugin_script.ajax_url,
                type: 'POST',
                data: {
                    action: 'add_to_wishlist',
                    product_id: product_id,
                    nonce: tmpcoder_plugin_script.nonce,
                },
                success: function() {
                    $scope.find('.tmpcoder-wishlist-add[data-product-id="' + product_id + '"]').hide();
                    $scope.find('.tmpcoder-wishlist-remove[data-product-id="' + product_id + '"]').show();
                    $scope.find('.tmpcoder-wishlist-remove[data-product-id="' + product_id + '"]').fadeTo(500, 1);
                    changeActionTargetProductId(product_id);
                    $(document).trigger('added_to_wishlist');
                },
                error: function(response) {
                    var error_message = response.responseJSON.message;
                    // Display error message
                    alert(error_message);
                }
            });
        });
        $scope.find('.tmpcoder-wishlist-remove').on('click', function(e) {
            e.preventDefault();
            var product_id = $(this).data('product-id');

            $(this).fadeTo(500, 0);

            $.ajax({
                url: tmpcoder_plugin_script.ajax_url,
                type: 'POST',
                data: {
                    action: 'remove_from_wishlist',
                    product_id: product_id,
                    nonce: tmpcoder_plugin_script.nonce,
                },
                success: function() {
                    $scope.find('.tmpcoder-wishlist-remove[data-product-id="' + product_id + '"]').hide();
                    $scope.find('.tmpcoder-wishlist-add[data-product-id="' + product_id + '"]').show();
                    $scope.find('.tmpcoder-wishlist-add[data-product-id="' + product_id + '"]').fadeTo(500, 1);
                    changeActionTargetProductId(product_id);
                    $(document).trigger('removed_from_wishlist');
                }
            });
        });

        $(document).on('removed_from_wishlist', function() {
            $scope.find('.tmpcoder-wishlist-remove[data-product-id="' + actionTargetProductId + '"]').hide();
            $scope.find('.tmpcoder-wishlist-add[data-product-id="' + actionTargetProductId + '"]').show();
            $scope.find('.tmpcoder-wishlist-add[data-product-id="' + actionTargetProductId + '"]').fadeTo(500, 1);
        });
    }
        // end widgetWishlistButton     
    
    const widgetWishlist = function($scope, $) {

        $.ajax({
            url: tmpcoder_plugin_script.ajax_url,
            type: 'POST',
            data: {
                action: 'count_wishlist_items',
                element_addcart_simple_txt: $scope.find('.tmpcoder-wishlist-products').attr('element_addcart_simple_txt'),
                element_addcart_grouped_txt: $scope.find('.tmpcoder-wishlist-products').attr('element_addcart_grouped_txt'),
                element_addcart_variable_txt: $scope.find('.tmpcoder-wishlist-products').attr('element_addcart_variable_txt'),
                nonce: tmpcoder_plugin_script.nonce,
            },
            success: function(response) { 
                // Get all elements with the class 'tmpcoder-wishlist-product' and their product IDs
                var productElements = $scope.find('.tmpcoder-wishlist-product');
                var productIds = productElements.map(function() {
                    return $(this).data('product-id');
                }).get();
                
                // Filter out the items in the response that match the product IDs
                var newWishlistItems = response.wishlist_items.filter(function(item) {
                    return !productIds.includes(item.product_id);
                });

                // Convert the wishlist_items to an array of product_ids for easier searching
                var wishlistProductIds = response.wishlist_items.map(function(item) {
                    return item.product_id;
                });

                productElements.each(function() {
                    var productId = $(this).data('product-id');
                
                    // If the product ID is not in the wishlistProductIds array, remove the element
                    if (!wishlistProductIds.includes(productId)) {
                    $(this).remove();
                    }
                });

                newWishlistItems.forEach(function(item) {
                    var html = '<tr class="tmpcoder-wishlist-product" data-product-id="' + item.product_id + '">';
                        html += '<td><span class="tmpcoder-wishlist-remove" data-product-id="' + item.product_id + '"></span></td>';
                        html += '<td><a class="tmpcoder-wishlist-img-wrap" href="' + item.product_url + '">' + item.product_image + '</a></td>';
                        html += '<td><a class="tmpcoder-wishlist-product-name" href="' + item.product_url + '">' + item.product_title + '</a></td>';
                        html += '<td><div class="tmpcoder-wishlist-product-price">' + item.product_price + '</div></td>';
                        html += '<td><div class="tmpcoder-wishlist-product-status">' + item.product_stock + '</div></td>';
                        html += '<td><div class="tmpcoder-wishlist-product-atc">' + item.product_atc + '</div></td>';
                    html += '</tr>';
                    $scope.find('.tmpcoder-wishlist-products tbody').append(html);
                });

                if ( 0 < +response.wishlist_count ) {
                    if ( $scope.find('.tmpcoder-wishlist-products').hasClass('tmpcoder-wishlist-empty-hidden') ) {
                        $scope.find('.tmpcoder-wishlist-products').removeClass('tmpcoder-wishlist-empty-hidden');
                    }

                    if ( !$scope.find('.tmpcoder-wishlist-empty').hasClass('tmpcoder-wishlist-empty-hidden') ) {
                        $scope.find('.tmpcoder-wishlist-empty').addClass('tmpcoder-wishlist-empty-hidden');
                    }
                } else {
                    if ( !$scope.find('.tmpcoder-wishlist-products').hasClass('tmpcoder-wishlist-empty-hidden') ) {
                        $scope.find('.tmpcoder-wishlist-products').addClass('tmpcoder-wishlist-empty-hidden');
                    }

                    if ( $scope.find('.tmpcoder-wishlist-empty').hasClass('tmpcoder-wishlist-empty-hidden') ) {
                        $scope.find('.tmpcoder-wishlist-empty').removeClass('tmpcoder-wishlist-empty-hidden');
                    }
                }
            },
            error: function(error) {
                console.log(error);
            }
        });

        $scope.on('click', '.tmpcoder-wishlist-remove', function(e) {
            e.preventDefault();
            var product_id = $(this).data('product-id');

            $.ajax({
                url: tmpcoder_plugin_script.ajax_url,
                type: 'POST',
                data: {
                    action: 'remove_from_wishlist',
                    product_id: product_id,
                    nonce: tmpcoder_plugin_script.nonce,
                },
                success: function(response) {
                    if ( 1 === $scope.find('.tmpcoder-wishlist-product').length ) {  
                        if ( !$scope.find('.tmpcoder-wishlist-products').hasClass('tmpcoder-wishlist-empty-hidden') ) {
                            $scope.find('.tmpcoder-wishlist-products').addClass('tmpcoder-wishlist-empty-hidden');
                        }

                        if ( $scope.find('.tmpcoder-wishlist-empty').hasClass('tmpcoder-wishlist-empty-hidden') ) {
                            $scope.find('.tmpcoder-wishlist-empty').removeClass('tmpcoder-wishlist-empty-hidden');
                        }
                    }

                    $scope.find('.tmpcoder-wishlist-product[data-product-id="' + product_id + '"]').remove();
                    changeActionTargetProductId(product_id);
                    $(document).trigger('removed_from_wishlist');   
                },
                error: function(error) {
                    console.log(error);
                }
            });
        });

        $( 'body' ).on( 'added_to_cart', function(ev, fragments, hash, button) {
            button.next().fadeTo( 700, 1 );

            button.css('display', 'none');
        });

    } // end widgetWishlistTest

    const widgetMiniWishlist = function($scope, $) {
        
        if ( !($scope.find('.tmpcoder-wishlist-count').length > 0 && 0 == $scope.find('.tmpcoder-wishlist-count').text()) ) {
            $scope.find('.tmpcoder-wishlist-count').css('display', 'inline-flex');
        } else {

        }
        
        function wishlistRemoveHandler() {
            $scope.find('.tmpcoder-wishlist-remove').on('click', function(e) {
                e.preventDefault();
                var product_id = $(this).data('product-id');
                $.ajax({
                    url: tmpcoder_plugin_script.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'remove_from_wishlist',
                        product_id: product_id,
                        nonce: tmpcoder_plugin_script.nonce,
                    },
                    success: function() {
                           $scope.find('.tmpcoder-wishlist-product[data-product-id="' + product_id + '"]').remove();
                        changeActionTargetProductId(product_id);
                        $(document).trigger('removed_from_wishlist');
                    }
                });
            });
        }

        wishlistRemoveHandler();

        var mutationObserver = new MutationObserver(function(mutations) {
            wishlistRemoveHandler();
        });

        mutationObserver.observe($scope[0], {
            childList: true,
            subtree: true,
        });

        $.ajax({
            url: tmpcoder_plugin_script.ajax_url,
            type: 'POST',
            data: {
                action: 'count_wishlist_items',
                nonce: tmpcoder_plugin_script.nonce,
            },
            success: function(response) {
                if ( $scope.find('.tmpcoder-wishlist-count').css('display') == 'none' && 0 < response.wishlist_count ) {
                    $scope.find('.tmpcoder-wishlist-count').text(response.wishlist_count);
                    $scope.find('.tmpcoder-wishlist-count').css('display', 'inline-flex');
                } else if ( 0 == response.wishlist_count ) {
                    $scope.find('.tmpcoder-wishlist-count').css('display', 'none');
                    $scope.find('.tmpcoder-wishlist-count').text(response.wishlist_count);
                } else {
                    $scope.find('.tmpcoder-wishlist-count').text(response.wishlist_count);
                }

                if ( true ) {
                    // Get all elements with the class 'tmpcoder-wishlist-product' and their product IDs
                    var productElements = $scope.find('.tmpcoder-wishlist-product');
                    var productIds = productElements.map(function() {
                      return $(this).data('product-id');
                    }).get();
                    
                    // Filter out the items in the response that match the product IDs
                    var newWishlistItems = response.wishlist_items.filter(function(item) {
                      return !productIds.includes(item.product_id);
                    });

                    // Convert the wishlist_items to an array of product_ids for easier searching
                    var wishlistProductIds = response.wishlist_items.map(function(item) {
                        return item.product_id;
                    });

                    productElements.each(function() {
                      var productId = $(this).data('product-id');
                    
                      // If the product ID is not in the wishlistProductIds array, remove the element
                      if (!wishlistProductIds.includes(productId)) {
                        $(this).remove();
                      }
                    });

                    newWishlistItems.forEach(function(item) {
                        $scope.find('.tmpcoder-wishlist-products').append('<li class="tmpcoder-wishlist-product" data-product-id="'+ item.product_id +'"><a class="tmpcoder-wishlist-product-img" href="'+ item.product_url +'">'+ item.product_image +'</a><div><a href="'+ item.product_url +'">'+ item.product_title +'</a><div class="tmpcoder-wishlist-product-price">'+ item.product_price +'</div></div><span class="tmpcoder-wishlist-remove" data-product-id="'+ item.product_id +'"></span></li>');
                    });
                }
            }
        });

        $(document).on('added_to_wishlist', function() {
            $.ajax({
                url: tmpcoder_plugin_script.ajax_url,
                type: 'POST',
                data: {
                    action: 'update_mini_wishlist',
                    product_id: actionTargetProductId,
                    nonce: tmpcoder_plugin_script.nonce,
                },
                success: function(response) {
                    if ( $scope.find('.tmpcoder-wishlist-products').find('li[data-product-id='+ response.product_id +']').length == 0 ) {
                        $scope.find('.tmpcoder-wishlist-products').append('<li class="tmpcoder-wishlist-product" data-product-id="'+ response.product_id +'"><a class="tmpcoder-wishlist-product-img" href="'+ response.product_url +'">'+ response.product_image +'</a><div><a href="'+ response.product_url +'">'+ response.product_title +'</a><div class="tmpcoder-wishlist-product-price">'+ response.product_price +'</div></div><span class="tmpcoder-wishlist-remove" data-product-id="'+ response.product_id +'"></span></li>');
                    }

                    $scope.find('.tmpcoder-wishlist-count').text(response.wishlist_count);
                    $scope.find('.tmpcoder-wishlist-count').css('display', 'inline-flex');
                }
            });
        });

        $(document).on('removed_from_wishlist', function() {
            $scope.find('.tmpcoder-wishlist-product[data-product-id="' + actionTargetProductId + '"]').remove();
            $.ajax({
                url: tmpcoder_plugin_script.ajax_url,
                type: 'POST',
                data: {
                    action: 'update_mini_wishlist',
                    product_id: actionTargetProductId,
                    nonce: tmpcoder_plugin_script.nonce,
                },
                success: function(response) {
                    $scope.find('.tmpcoder-wishlist-count').text(response.wishlist_count);
                    
                    if ( response.wishlist_count == 0 ) {
                        $scope.find('.tmpcoder-wishlist-count').css('display', 'none');
                    } else {
                        $scope.find('.tmpcoder-wishlist-count').css('display', 'inline-flex');
                    }
                }
            });
        });
        $scope.find('.tmpcoder-wishlist').css({"display": "none"});

        var animationSpeed = $scope.find('.tmpcoder-wishlist-wrap').data('animation');

        $('body').on('click', function(e) {
            if ( !e.target.classList.value.includes('tmpcoder-wishlist-wrap') && !e.target.closest('.tmpcoder-wishlist-wrap') ) {
                if ( $scope.hasClass('tmpcoder-wishlist-slide') ) {
                    $scope.find('.tmpcoder-wishlist').slideUp(animationSpeed);
                } else {
                    $scope.find('.tmpcoder-wishlist').fadeOut(animationSpeed);
                }
            }
        });

        if ( 0 !== $scope.hasClass('tmpcoder-wishlist-sidebar').length ) {
            if ( $('#wpadminbar').length ) {
                $scope.find('.tmpcoder-wishlist').css({
                    // 'top': $('#wpadminbar').css('height'),
                    // 'height': $scope.find('.tmpcoder-shopping-cart-wrap').css('height') -  $('#wpadminbar').css('height')
                    'z-index': 999999
                });
            }

            closeSideBar();

            $scope.find('.tmpcoder-wishlist').on('click', function(e) {
                // if ( !e.target.classList.value.includes('widget_shopping_cart_content') && !e.target.closest('.widget_shopping_cart_content') ) {
                if ( !e.target.classList.value.includes('tmpcoder-wishlist-inner-wrap') && !e.target.closest('.tmpcoder-wishlist-inner-wrap') ) {
                    // $scope.find('.widget_shopping_cart_content').addClass('tmpcoder-mini-cart-slide-out');
                    $scope.find('.tmpcoder-wishlist-inner-wrap').addClass('tmpcoder-wishlist-slide-out');
                    $scope.find('.tmpcoder-wishlist-slide-out').css('animation-speed', animationSpeed);
                    $scope.find('.tmpcoder-wishlist').fadeOut(animationSpeed);
                    $('body').removeClass('tmpcoder-wishlist-sidebar-body');
                    setTimeout(function() {
                        // $scope.find('.widget_shopping_cart_content').removeClass('tmpcoder-mini-cart-slide-out');
                        $scope.find('.tmpcoder-wishlist-inner-wrap').removeClass('tmpcoder-wishlist-slide-out');
                        $scope.find('.tmpcoder-wishlist').css({"display": "none"});
                    }, animationSpeed + 100);
                }
            });
        }

        if ( $scope.find('.tmpcoder-wishlist').length ) {
            if ( $scope.hasClass('tmpcoder-wishlist-sidebar') || $scope.hasClass('tmpcoder-wishlist-dropdown') ) {
                $scope.find('.tmpcoder-wishlist-toggle-btn').on('click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if ( 'none' === $scope.find('.tmpcoder-wishlist').css("display") ) {
                        if ( $scope.hasClass('tmpcoder-wishlist-slide') ) {
                            $scope.find('.tmpcoder-wishlist').slideDown(animationSpeed);
                        } else {
                            $scope.find('.tmpcoder-wishlist').fadeIn(animationSpeed);
                        }
                        if ( $scope.hasClass('tmpcoder-wishlist-sidebar') ) {
                            $scope.find('.tmpcoder-wishlist').fadeIn(animationSpeed);
                            $scope.find('.tmpcoder-wishlist-inner-wrap').addClass('tmpcoder-wishlist-slide-in');
                            $scope.find('.tmpcoder-wishlist-slide-in').css('animation-speed', animationSpeed);
                            $('body').addClass('tmpcoder-wishlist-sidebar-body');
                        }
                        setTimeout(function() {
                            // $scope.find('.widget_shopping_cart_content').removeClass('tmpcoder-mini-cart-slide-in');
                            $scope.find('.tmpcoder-wishlist').removeClass('tmpcoder-wishlist-slide-in');
                            if ( $scope.hasClass('tmpcoder-wishlist-sidebar') ) {
                                $scope.find('.tmpcoder-wishlist').trigger('resize');
                            }
                        }, animationSpeed + 100);
                    } else {
                        if ( $scope.hasClass('tmpcoder-wishlist-slide') ) {
                            $scope.find('.tmpcoder-wishlist').slideUp(animationSpeed);
                        } else {
                            $scope.find('.tmpcoder-wishlist').fadeOut(animationSpeed);
                        }
                    }
                });
            }
        }

        var mutationObserver = new MutationObserver(function(mutations) {
            if (  0 !== $scope.hasClass('tmpcoder-wishlist-sidebar').length ) {
                closeSideBar();
            }
            
            $scope.find('.tmpcoder-wishlist-product').on('click', '.tmpcoder-wishlist-remove', function() {
                $(this).closest('li').addClass('tmpcoder-before-remove-from-wishlist');
            });

            if ( $scope.find('.tmpcoder-wishlist-product').length !== 0 ) {
                $scope.find('.tmpcoder-wishlist-empty').addClass('tmpcoder-wishlist-empty-hidden');
                $scope.find('.tmpcoder-view-wishlist').removeClass('tmpcoder-hidden-element');
            } else {
                $scope.find('.tmpcoder-wishlist-empty').removeClass('tmpcoder-wishlist-empty-hidden');
                $scope.find('.tmpcoder-view-wishlist').addClass('tmpcoder-hidden-element');
            }
        });

        // Listen to Mini Cart Changes
        mutationObserver.observe($scope[0], {
            childList: true,
            subtree: true,
        });

        function closeSideBar() {
            $scope.find('.tmpcoder-close-wishlist span').on('click', function(e) {
                // $scope.find('.widget_shopping_cart_content').addClass('tmpcoder-mini-cart-slide-out');
                $scope.find('.tmpcoder-wishlist-inner-wrap').addClass('tmpcoder-wishlist-slide-out');
                $scope.find('.tmpcoder-wishlist-slide-out').css('animation-speed', animationSpeed);
                $scope.find('.tmpcoder-wishlist').fadeOut(animationSpeed);
                $('body').removeClass('tmpcoder-wishlist-sidebar-body');
                setTimeout(function() {
                    // $scope.find('.widget_shopping_cart_content').removeClass('tmpcoder-mini-cart-slide-out');
                    $scope.find('.tmpcoder-wishlist-inner-wrap').removeClass('tmpcoder-wishlist-slide-out');
                    $scope.find('.tmpcoder-wishlist').css({"display": "none"});
                }, animationSpeed + 100);
            });
        }
    } // end widgetMiniWishlist

    const widgetCompareButton = function($scope, $) {
        $.ajax({
            url: tmpcoder_plugin_script.ajax_url,
            type: 'POST',
            data: {
                action: 'check_product_in_compare',
                product_id: $scope.find('.tmpcoder-compare-add').data('product-id'),
                nonce: tmpcoder_plugin_script.nonce,
            },
            success: function(response) {
                if ( true == response ) {
                    if ( !$scope.find('.tmpcoder-compare-add').hasClass('tmpcoder-button-hidden') ) {
                        $scope.find('.tmpcoder-compare-add').addClass('tmpcoder-button-hidden');
                    }

                    if ( $scope.find('.tmpcoder-compare-remove').hasClass('tmpcoder-button-hidden') ) {
                        $scope.find('.tmpcoder-compare-remove').removeClass('tmpcoder-button-hidden');
                    }
                }
            }
        });

        // $(document).ready(function() {
            $scope.find('.tmpcoder-compare-add').click(function(e) {
                e.preventDefault();
                var product_id = $(this).data('product-id');

                $(this).fadeTo(500, 0);

                $.ajax({
                    url: tmpcoder_plugin_script.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'add_to_compare',
                        product_id: product_id,
                        nonce: tmpcoder_plugin_script.nonce,
                    },
                    success: function() {
                        $scope.find('.tmpcoder-compare-add[data-product-id="' + product_id + '"]').hide();
                        $scope.find('.tmpcoder-compare-remove[data-product-id="' + product_id + '"]').show();
                        $scope.find('.tmpcoder-compare-remove[data-product-id="' + product_id + '"]').fadeTo(500, 1);
                        changeActionTargetProductId(product_id);
                        $(document).trigger('added_to_compare');
                    },
                    error: function(response) {
                        var error_message = response.responseJSON.message;
                        // Display error message
                        alert(error_message);
                    }
                });
            });
            $scope.find('.tmpcoder-compare-remove').click(function(e) {
                e.preventDefault();
                var product_id = $(this).data('product-id');
                
                $(this).fadeTo(500, 0);

                $.ajax({
                    url: tmpcoder_plugin_script.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'remove_from_compare',
                        product_id: product_id,
                        nonce: tmpcoder_plugin_script.nonce,
                    },
                    success: function() {
                        $scope.find('.tmpcoder-compare-remove[data-product-id="' + product_id + '"]').hide();
                        $scope.find('.tmpcoder-compare-add[data-product-id="' + product_id + '"]').show();
                        $scope.find('.tmpcoder-compare-add[data-product-id="' + product_id + '"]').fadeTo(500, 1);
                        changeActionTargetProductId(product_id);
                        $(document).trigger('removed_from_compare');
                    }
                });
            });

            $(document).on('removed_from_compare', function() {
                $scope.find('.tmpcoder-compare-remove[data-product-id="' + actionTargetProductId + '"]').hide();
                $scope.find('.tmpcoder-compare-add[data-product-id="' + actionTargetProductId + '"]').show();
                $scope.find('.tmpcoder-compare-add[data-product-id="' + actionTargetProductId + '"]').fadeTo(500, 1);
            });

        // });

    } // end widgetCompareButton

    const widgetMiniCompare = function($scope, $) {
        
        if ( !($scope.find('.tmpcoder-compare-count').length > 0 && 0 == $scope.find('.tmpcoder-compare-count').text()) ) {
            $scope.find('.tmpcoder-compare-count').css('display', 'inline-flex');
        }

        // WITH AJAX
        if ( $scope.hasClass('tmpcoder-compare-style-popup') ) {
            $scope.find('.tmpcoder-compare-toggle-btn').on('click', function(e) {
                e.preventDefault();

                $('body').addClass('tmpcoder-body-overflow-hidden');

                $scope.find('.tmpcoder-compare-bg').removeClass('tmpcoder-compare-popup-hidden');
                $scope.find('.tmpcoder-compare-popup').removeClass('tmpcoder-compare-fade-out').addClass('tmpcoder-compare-fade-in');
                $scope.find('.tmpcoder-compare-bg').removeClass('tmpcoder-compare-fade-out').addClass('tmpcoder-compare-fade-in');

                $scope.find('.tmpcoder-compare-popup-inner-wrap').html('<div class="tmpcoder-compare-loader-wrap"><div class="tmpcoder-double-bounce"><div class="tmpcoder-child tmpcoder-double-bounce1"></div><div class="tmpcoder-child tmpcoder-double-bounce2"></div></div></div>');
                $.ajax({
                    url: tmpcoder_plugin_script.ajax_url,
                    type: 'POST',
                    data: {
                        nonce: tmpcoder_plugin_script.nonce,
                        action: 'tmpcoder_get_page_content',
                        tmpcoder_compare_page_id: tmpcoder_plugin_script.comparePageID
                    },
                    success: function(response) {
                        $scope.find('.tmpcoder-compare-popup-inner-wrap').html(response.data.content);
                        widgetCompare($scope);
                        
                        $scope.find('.tmpcoder-compare-remove').click(function(e) {
                            e.preventDefault();
                            var productID = $(this).data('product-id');
                        
                            $.ajax({
                                url: tmpcoder_plugin_script.ajax_url,
                                type: 'POST',
                                data: {
                                    action: 'remove_from_compare',
                                    product_id: productID,
                                    nonce: tmpcoder_plugin_script.nonce,
                                },
                                success: function() {
                                    changeActionTargetProductId(productID);
                                    $scope.find('[data-product-id="' + productID + '"]').remove();
                                    if ( !($scope.find('.tmpcoder-compare-popup-inner-wrap').find('.tmpcoder-compare-remove').length > 0) ) {
                                        $scope.find('.tmpcoder-compare-products').addClass('tmpcoder-hidden-element');
                                        $scope.find('.tmpcoder-compare-empty').removeClass('tmpcoder-hidden-element');
                                    } else {
                                        $scope.find('.tmpcoder-compare-empty').addClass('tmpcoder-hidden-element');
                                        $scope.find('.tmpcoder-compare-products').removeClass('tmpcoder-hidden-element');
                                    }
                                    $(document).trigger('removed_from_compare');
                                }
                            });
                        });
                    },
                    error: function(xhr, status, error) {
                        console.log(xhr.responseText);
                    }
                });
            });

            $scope.find('.tmpcoder-close-compare').click(function(e) {
                $scope.find('.tmpcoder-compare-popup').removeClass('tmpcoder-compare-fade-in').addClass('tmpcoder-compare-fade-out');
                $scope.find('.tmpcoder-compare-bg').removeClass('tmpcoder-compare-fade-in').addClass('tmpcoder-compare-fade-out');
                setTimeout(function() {
                    $scope.find('.tmpcoder-compare-bg').addClass('tmpcoder-compare-popup-hidden');
                    $('body').removeClass('tmpcoder-body-overflow-hidden');
                }, 600)
            });

            $scope.find('.tmpcoder-compare-bg').click(function(e) {
                if ( !e.target.classList.value.includes('tmpcoder-compare-popup') && !e.target.closest('.tmpcoder-compare-popup') ) {
                    var thisTarget = $(this);
                    $scope.find('.tmpcoder-compare-popup').removeClass('tmpcoder-compare-fade-in').addClass('tmpcoder-compare-fade-out');
                    $scope.find('.tmpcoder-compare-bg').removeClass('tmpcoder-compare-fade-in').addClass('tmpcoder-compare-fade-out');
                    setTimeout(function() {
                        thisTarget.addClass('tmpcoder-compare-popup-hidden');
                        $('body').removeClass('tmpcoder-body-overflow-hidden');
                    }, 600);
                }
            });

        }

        $.ajax({
            url: tmpcoder_plugin_script.ajax_url,
            type: 'POST',
            data: {
                action: 'count_compare_items',
                nonce: tmpcoder_plugin_script.nonce,
            },
            success: function(response) {
                if ( $scope.find('.tmpcoder-compare-count').css('display') == 'none' && 0 < response.compare_count ) {
                    $scope.find('.tmpcoder-compare-count').text(response.compare_count);
                    $scope.find('.tmpcoder-compare-count').css('display', 'inline-flex');
                } else if ( 0 == response.compare_count ) {
                    $scope.find('.tmpcoder-compare-count').css('display', 'none');
                    $scope.find('.tmpcoder-compare-count').text(response.compare_count);
                } else {
                    $scope.find('.tmpcoder-compare-count').text(response.compare_count);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });

        $(document).on('removed_from_compare', function() {
            $.ajax({
                url: tmpcoder_plugin_script.ajax_url,
                type: 'POST',
                data: {
                    action: 'update_mini_compare',
                    product_id: actionTargetProductId,
                    nonce: tmpcoder_plugin_script.nonce,
                },
                success: function(response) {
                    $scope.find('.tmpcoder-compare-count').text(response.compare_count);
                    
                    if ( response.compare_count == 0 ) {
                        $scope.find('.tmpcoder-compare-count').css('display', 'none');
                    } else {
                        $scope.find('.tmpcoder-compare-count').css('display', 'inline-flex');
                    }
                }
            });
        });

        $(document).on('added_to_compare', function() {
            $.ajax({
                url: tmpcoder_plugin_script.ajax_url,
                type: 'POST',
                data: {
                    action: 'update_mini_compare',
                    product_id: actionTargetProductId,
                    nonce: tmpcoder_plugin_script.nonce,
                },
                success: function(response) {
                    $scope.find('.tmpcoder-compare-count').text(response.compare_count);
                    $scope.find('.tmpcoder-compare-count').css('display', 'inline-flex');
                }
            });
        });
    } // end widgetMiniCompare

    const widgetCompare = function($scope, $) {
        
        jQuery.ajax({
            url: tmpcoder_plugin_script.ajax_url,
            type: 'POST',
            data: {
                action: 'count_compare_items',
                remove_text: $scope.find('.tmpcoder-compare-table-wrap').attr('remove_from_compare_text'),
                compare_empty_text: $scope.find('.tmpcoder-compare-table-wrap').attr('compare_empty_text'),
                element_addcart_simple_txt: $scope.find('.tmpcoder-compare-table-wrap').attr('element_addcart_simple_txt'),
                element_addcart_grouped_txt: $scope.find('.tmpcoder-compare-table-wrap').attr('element_addcart_grouped_txt'),
                element_addcart_variable_txt: $scope.find('.tmpcoder-compare-table-wrap').attr('element_addcart_variable_txt'),
                nonce: tmpcoder_plugin_script.nonce,
            },
            success: function(response) {
                if ( true ) {
                    $scope.find('.tmpcoder-compare-table-wrap').html(response.compare_table);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });

        $scope.on('click', '.tmpcoder-compare-remove', function(e) {
            e.preventDefault();
            var productID = jQuery(this).data('product-id');
        
            jQuery.ajax({
                url: tmpcoder_plugin_script.ajax_url,
                type: 'POST',
                data: {
                    action: 'remove_from_compare',
                    product_id: productID,
                    nonce: tmpcoder_plugin_script.nonce,
                },
                success: function() {
                    changeActionTargetProductId(productID);
                    $scope.find('[data-product-id="' + productID + '"]').remove();
                    if ( !($scope.find('.tmpcoder-compare-remove').length > 0) ) {
                        $scope.find('.tmpcoder-compare-products').addClass('tmpcoder-hidden-element');
                        $scope.find('.tmpcoder-compare-empty').removeClass('tmpcoder-hidden-element');
                    } else {
                        $scope.find('.tmpcoder-compare-empty').addClass('tmpcoder-hidden-element');
                        $scope.find('.tmpcoder-compare-products').removeClass('tmpcoder-hidden-element');
                    }
                    jQuery(document).trigger('removed_from_compare');
                }
            });
        });
        
        jQuery( 'body' ).on( 'added_to_cart', function(ev, fragments, hash, button) {
            button.next().fadeTo( 700, 1 );

            button.css('display', 'none');
        });
    } // end widgetCompare

    const widgetProductMedia = function( $scope, $ ) {
        // Fix Main Slider Distortion
        $(document).ready(function($) {
            $(window).trigger('resize');
            setTimeout(function() {
                $(window).trigger('resize');
                $scope.find('.tmpcoder-product-media-wrap').removeClass('tmpcoder-zero-opacity');
            }, 1000);
        });

        var sliderIcons = $scope.find('.tmpcoder-gallery-slider-arrows-wrap');
        sliderIcons.remove();

       $(document).ready(function($) {
           if ( $scope.find('.woocommerce-product-gallery__trigger').length ) {
                $scope.find('.woocommerce-product-gallery__trigger').remove();
            }
        });

        $scope.find('.flex-viewport').append(sliderIcons);
        
        $scope.find('.tmpcoder-gallery-slider-arrow').on('click', function() {
            if ($(this).hasClass('tmpcoder-gallery-slider-prev-arrow')) {
                $scope.find('a.flex-prev').trigger('click');
            } else if ($(this).hasClass('tmpcoder-gallery-slider-next-arrow')) {
                $scope.find('a.flex-next').trigger('click');
            }
        });
    
        // Lightbox
        var lightboxSettings = $( '.tmpcoder-product-media-wrap' ).attr( 'data-lightbox' );
    
        if ( typeof lightboxSettings !== typeof undefined && lightboxSettings !== false && ! editorCheck() ) {
            
            $scope.find('.woocommerce-product-gallery__image').each(function() {
                $(this).attr('data-lightbox', lightboxSettings);
                $(this).attr('data-src', $(this).find('a').attr('href'));
            });


            $scope.find('.woocommerce-product-gallery__image').on('click', function(e) {
                e.stopPropagation();
            });

            $scope.find('.tmpcoder-product-media-lightbox').on('click', function() {
                $scope.find('.woocommerce-product-gallery__image').trigger('click');
            });

            var MediaWrap = $scope.find( '.woocommerce-product-gallery__wrapper' );
                lightboxSettings = JSON.parse( lightboxSettings );
    
            // Init Lightbox
            MediaWrap.lightGallery( lightboxSettings );
    
            // Show/Hide Controls
            MediaWrap.on( 'onAferAppendSlide.lg, onAfterSlide.lg', function( event, prevIndex, index ) {
                var lightboxControls = $( '#lg-actual-size, #lg-zoom-in, #lg-zoom-out, #lg-download' ),
                    lightboxDownload = $( '#lg-download' ).attr( 'href' );
    
                if ( $( '#lg-download' ).length ) {
                    if ( -1 === lightboxDownload.indexOf( 'wp-content' ) ) {
                        lightboxControls.addClass( 'tmpcoder-hidden-element' );
                    } else {
                        lightboxControls.removeClass( 'tmpcoder-hidden-element' );
                    }
                }
    
                // Autoplay Button
                if ( '' === lightboxSettings.autoplay ) {
                    $( '.lg-autoplay-button' ).css({
                         'width' : '0',
                         'height' : '0',
                         'overflow' : 'hidden'
                    });
                }
            });
        }

        if ( $scope.hasClass('tmpcoder-product-media-thumbs-slider') && $scope.hasClass('tmpcoder-product-media-thumbs-vertical') ) {

            var thumbsToShow = $scope.find('.tmpcoder-product-media-wrap').data('slidestoshow');
            var thumbsToScroll = +$scope.find('.tmpcoder-product-media-wrap').data('slidestoscroll');

            $scope.find('.flex-control-nav').css('height', ((100/thumbsToShow) * $scope.find('.flex-control-nav li').length) + '%');

            $scope.find('.flex-control-nav').wrap('<div class="tmpcoder-fcn-wrap"></div>');

            var thumbIcon1 = $scope.find('.tmpcoder-thumbnail-slider-prev-arrow');
            var thumbIcon2 = $scope.find('.tmpcoder-thumbnail-slider-next-arrow');

            thumbIcon1.remove();
            thumbIcon2.remove();

            if ( $scope.find('.tmpcoder-product-media-wrap').data('slidestoshow') < $scope.find('.flex-control-nav li').length ) {
                $scope.find('.tmpcoder-fcn-wrap').prepend(thumbIcon1);
                $scope.find('.tmpcoder-fcn-wrap').append(thumbIcon2);
            }

            var posy = 0;
            var slideCount = 0;

            $scope.find('.tmpcoder-thumbnail-slider-next-arrow').on('click', function() {
                    // var currTrans =  $scope.find('.flex-control-nav').css('transform') != 'none' ? $scope.find('.flex-control-nav').css('transform').split(/[()]/)[1] : 0;
                    // posx = currTrans ? currTrans.split(',')[4] : 0;
                    if ( (slideCount + thumbsToScroll) < $scope.find('.flex-control-nav li').length - 1 ) {
                        posy++;
                        slideCount = slideCount + thumbsToScroll;
                        $scope.find('.flex-control-nav').css('transform', 'translateY('+ (parseInt(-posy) * (parseInt($scope.find('.flex-control-nav li:last-child').css('height').slice(0, -2)) + parseInt($scope.find('.flex-control-nav li').css('margin-bottom'))) * thumbsToScroll) +'px)');
                        if ( posy >= 1 ) {
                            $scope.find('.tmpcoder-thumbnail-slider-prev-arrow').attr('disabled', false);
                        } else {
                            $scope.find('.tmpcoder-thumbnail-slider-prev-arrow').attr('disabled', true);
                        }
                    } else {
                        posy = 0;
                        slideCount = 0;
                        $scope.find('.flex-control-nav').css('transform', `translateY(0)`);
                        $scope.find('.tmpcoder-thumbnail-slider-prev-arrow').attr('disabled', true);
                    }
            });

            $scope.find('.tmpcoder-thumbnail-slider-prev-arrow').on('click', function() {
                    if ( posy >= 1 ) {
                        posy--;
                        if ( posy == 0 ) {
                            $(this).attr('disabled', true);
                        }
                        slideCount = slideCount - thumbsToScroll;
                        $scope.find('.flex-control-nav').css('transform', 'translateY('+ parseInt(-posy) * (parseInt($scope.find('.flex-control-nav li').css('height').slice(0, -2)) + parseInt($scope.find('.flex-control-nav li:last-child').css('margin-top'))) * thumbsToScroll +'px)');
                        if ( slideCount < $scope.find('.flex-control-nav li').length - 1 ) {
                            $scope.find('.tmpcoder-thumbnail-slider-next-arrow').attr('disabled', false);
                        } else {
                            $scope.find('.tmpcoder-thumbnail-slider-next-arrow').attr('disabled', true);
                        }
                    } else {
                        // slideCount = $scope.find('.flex-control-nav li').length - 1;
                        // $scope.find('.flex-control-nav').css('transform', `translateX(0)`);
                        $(this).attr('disabled', true);
                    }
            });
        }

        if ( $scope.hasClass('tmpcoder-product-media-thumbs-slider') && $scope.find('.tmpcoder-product-media-wrap').hasClass('tmpcoder-product-media-thumbs-horizontal') ) {

            var thumbsToShow = $scope.find('.tmpcoder-product-media-wrap').data('slidestoshow');
            var thumbsToScroll = +$scope.find('.tmpcoder-product-media-wrap').data('slidestoscroll');

            $scope.find('.flex-control-nav').css('width', ((100/thumbsToShow) * $scope.find('.flex-control-nav li').length) +'%');

            $scope.find('.flex-control-nav').wrap('<div class="tmpcoder-fcn-wrap"></div>');

            var thumbIcon1 = $scope.find('.tmpcoder-thumbnail-slider-prev-arrow');
            var thumbIcon2 = $scope.find('.tmpcoder-thumbnail-slider-next-arrow');

            thumbIcon1.remove();
            thumbIcon2.remove();

            if ( $scope.find('.tmpcoder-product-media-wrap').data('slidestoshow') < $scope.find('.flex-control-nav li').length ) {
                $scope.find('.tmpcoder-fcn-wrap').prepend(thumbIcon1);
                $scope.find('.tmpcoder-fcn-wrap').append(thumbIcon2);
                $scope.find('.tmpcoder-thumbnail-slider-arrow').removeClass('tmpcoder-tsa-hidden');
            }

            var posx = 0;
            var slideCount = 0;
            $scope.find('.tmpcoder-thumbnail-slider-prev-arrow').attr('disabled', true);

                      
            // Calculate item width and margin once
            var itemWidth = parseFloat($scope.find('.flex-control-nav li').css('width'));
            var itemMargin = parseFloat($scope.find('.flex-control-nav li').css('margin-right'));
            var totalItems = $scope.find('.flex-control-nav li').length;
            var containerWidth = $scope.find('.flex-control-nav').parent().width();
            var totalWidth = (itemWidth + itemMargin) * totalItems;

            $scope.find('.tmpcoder-thumbnail-slider-next-arrow').on('click', function() {
                var maxPosx = Math.ceil((totalWidth - containerWidth) / ((itemWidth + itemMargin) * thumbsToScroll));

                if (posx < maxPosx) {
                    posx++;
                    slideCount += thumbsToScroll;
                    var translateXValue = Math.min(posx * (itemWidth + itemMargin) * thumbsToScroll, totalWidth - containerWidth);
                    $scope.find('.flex-control-nav').css('transform', 'translateX(-' + translateXValue + 'px)');
                    
                    // Update previous arrow state
                    $scope.find('.tmpcoder-thumbnail-slider-prev-arrow').attr('disabled', posx <= 0);
                    
                    // Update next arrow state
                    $scope.find('.tmpcoder-thumbnail-slider-next-arrow').attr('disabled', posx >= maxPosx);
                }
            });

            $scope.find('.tmpcoder-thumbnail-slider-prev-arrow').on('click', function() {
                if (posx > 0) {
                    posx--;
                    slideCount -= thumbsToScroll;
                    var translateXValue = posx * (itemWidth + itemMargin) * thumbsToScroll;
                    $scope.find('.flex-control-nav').css('transform', 'translateX(-' + translateXValue + 'px)');
                    
                    // Update previous arrow state
                    $scope.find('.tmpcoder-thumbnail-slider-prev-arrow').attr('disabled', posx <= 0);
                    
                    // Update next arrow state
                    var maxPosx = Math.ceil((totalWidth - containerWidth) / ((itemWidth + itemMargin) * thumbsToScroll));
                    $scope.find('.tmpcoder-thumbnail-slider-next-arrow').attr('disabled', posx >= maxPosx);
                }
            });

        }
    } // End widgetProductMedia

    const widgetMegaMenu = function( $scope, $ ) {

        var $navMenu = $scope.find( '.tmpcoder-nav-menu-container' ),
            $mobileNavMenu = $scope.find( '.tmpcoder-mobile-nav-menu-container' );

        // Menu
        var subMenuFirst = $navMenu.find( '.tmpcoder-nav-menu > li.menu-item-has-children' ),
            subMenuDeep = $navMenu.find( '.tmpcoder-sub-menu li.menu-item-has-children' );

        if ( $scope.find('.tmpcoder-mobile-toggle').length ) {
            $scope.find('a').on('click', function() {
                if (this.pathname == window.location.pathname && !($(this).parent('li').children().length > 1)) {
                    $scope.find('.tmpcoder-mobile-toggle').trigger('click');
                }
            });
        }

        // Click
        if ( $navMenu.attr('data-trigger') === 'click' ) {

            // First Sub
            subMenuFirst.children('a').on( 'click', function(e) {
                var currentItem = $(this).parent(),
                    childrenSub = currentItem.children('.tmpcoder-sub-menu, .tmpcoder-sub-mega-menu');

                // Reset
                subMenuFirst.not(currentItem).removeClass('tmpcoder-sub-open');
                if ( $navMenu.hasClass('tmpcoder-nav-menu-horizontal') || ( $navMenu.hasClass('tmpcoder-nav-menu-vertical') ) ) {
                    subMenuAnimation( subMenuFirst.children('.tmpcoder-sub-menu, .tmpcoder-sub-mega-menu'), false );
                }

                if ( ! currentItem.hasClass( 'tmpcoder-sub-open' ) ) {
                    e.preventDefault();
                    currentItem.addClass('tmpcoder-sub-open');
                    subMenuAnimation( childrenSub, true );
                } else {
                    currentItem.removeClass('tmpcoder-sub-open');
                    subMenuAnimation( childrenSub, false );
                }
            });

            // Deep Subs
            subMenuDeep.on( 'click', function(e) {
                var currentItem = $(this),
                    childrenSub = currentItem.children('.tmpcoder-sub-menu');

                // Reset
                if ( $navMenu.hasClass('tmpcoder-nav-menu-horizontal') ) {
                    subMenuAnimation( subMenuDeep.find('.tmpcoder-sub-menu'), false );
                }

                if ( ! currentItem.hasClass( 'tmpcoder-sub-open' ) ) {
                    e.preventDefault();
                    currentItem.addClass('tmpcoder-sub-open');
                    subMenuAnimation( childrenSub, true );

                } else {
                    currentItem.removeClass('tmpcoder-sub-open');
                    subMenuAnimation( childrenSub, false );
                }
            });

            // Reset Subs on Document click
            $( document ).mouseup(function (e) {
                if ( ! subMenuFirst.is(e.target) && subMenuFirst.has(e.target).length === 0 ) {
                    subMenuFirst.not().removeClass('tmpcoder-sub-open');
                    subMenuAnimation( subMenuFirst.children('.tmpcoder-sub-menu, .tmpcoder-sub-mega-menu'), false );
                }
                if ( ! subMenuDeep.is(e.target) && subMenuDeep.has(e.target).length === 0 ) {
                    subMenuDeep.removeClass('tmpcoder-sub-open');
                    subMenuAnimation( subMenuDeep.children('.tmpcoder-sub-menu'), false );
                }
            });
        
        // Hover
        } else {
            // Mouse Over
            subMenuFirst.on( 'mouseenter', function() {
                subMenuAnimation( $(this).children('.tmpcoder-sub-menu, .tmpcoder-sub-mega-menu'), true );
            });

            subMenuDeep.on( 'mouseenter', function() {
                subMenuAnimation( $(this).children('.tmpcoder-sub-menu'), true );
            });

            // Mouse Leave
            subMenuFirst.on( 'mouseleave', function() {
                subMenuAnimation( $(this).children('.tmpcoder-sub-menu, .tmpcoder-sub-mega-menu'), false );
            });

            subMenuDeep.on( 'mouseleave', function() {
                subMenuAnimation( $(this).children('.tmpcoder-sub-menu'), false );
            }); 
        }

        // Mobile Menu
        var mobileMenu = $mobileNavMenu.find( '.tmpcoder-mobile-nav-menu' );

        // Toggle Button
        $mobileNavMenu.find( '.tmpcoder-mobile-toggle' ).on( 'click', function() {
            // Change Toggle Text
            if ( ! $(this).hasClass('tmpcoder-mobile-toggle-open') ) {
                $(this).addClass('tmpcoder-mobile-toggle-open');

                if ( $(this).find('.tmpcoder-mobile-toggle-text').length ) {
                    $(this).children().eq(0).hide();
                    $(this).children().eq(1).show();
                }
            } else {
                $(this).removeClass('tmpcoder-mobile-toggle-open');
                $(this).trigger('focusout');

                if ( $(this).find('.tmpcoder-mobile-toggle-text').length ) {
                    $(this).children().eq(1).hide();
                    $(this).children().eq(0).show();
                }
            }

            // Show Menu
            if ( $scope.hasClass('tmpcoder-mobile-menu-display-offcanvas') ) {
                $(this).closest('.elementor-top-section').addClass('tmpcoder-section-full-height');
                $('body').css('overflow', 'hidden');
                $(this).parent().siblings('.tmpcoder-mobile-mega-menu-wrap').toggleClass('tmpcoder-mobile-mega-menu-open');
            } else {
                $(this).parent().siblings('.tmpcoder-mobile-mega-menu-wrap').stop().slideToggle();
            }

            // Hide Off-Canvas Menu
            $scope.find('.mobile-mega-menu-close').on('click', function() {
                $(this).closest('.tmpcoder-mobile-mega-menu-wrap').removeClass('tmpcoder-mobile-mega-menu-open');
                $('body').css('overflow', 'visible');
                $(this).closest('.elementor-top-section').removeClass('tmpcoder-section-full-height');
            });
            $scope.find('.tmpcoder-mobile-mega-menu-overlay').on('click', function() {
                $(this).siblings('.tmpcoder-mobile-mega-menu-wrap').removeClass('tmpcoder-mobile-mega-menu-open');
                $('body').css('overflow', 'visible');
                $(this).closest('.elementor-top-section').removeClass('tmpcoder-section-full-height');
            });

            // Fix Width
            fullWidthMobileDropdown();
        });

        // Sub Menu Class
        mobileMenu.find('.sub-menu').removeClass('tmpcoder-sub-menu').addClass('tmpcoder-mobile-sub-menu');

        // Add Submenu Icon
        let mobileSubIcon = mobileMenu.find('.tmpcoder-mobile-sub-icon'),
            mobileSubIconClass = 'fas ';

        if ( $scope.hasClass('tmpcoder-sub-icon-caret-down') ) {
            mobileSubIconClass += 'fa-caret-down';
        } else if ( $scope.hasClass('tmpcoder-sub-icon-angle-down') ) {
            mobileSubIconClass += 'fa-angle-down';
        } else if ( $scope.hasClass('tmpcoder-sub-icon-chevron-down') ) {
            mobileSubIconClass += 'fa-chevron-down';
        } else if ( $scope.hasClass('tmpcoder-sub-icon-plus') ) {
            mobileSubIconClass += 'fa-plus';
        }

        mobileSubIcon.addClass(mobileSubIconClass);

        // Sub Menu Dropdown
        mobileMenu.find('.menu-item-has-children > a .tmpcoder-mobile-sub-icon, .menu-item-has-children > a[href="#"]').on( 'click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var parentItem = $(this).closest('li.menu-item');

            // Toggle
            if ( ! parentItem.hasClass('tmpcoder-mobile-sub-open') ) {
                e.preventDefault();
                parentItem.addClass('tmpcoder-mobile-sub-open');

                if ( ! $scope.hasClass('tmpcoder-mobile-menu-display-offcanvas') ) {
                    $(window).trigger('resize');
                    parentItem.children('.tmpcoder-mobile-sub-menu').first().stop().slideDown();
                }

                // Mega Menu
                if ( parentItem.hasClass('tmpcoder-mega-menu-true') ) {
                    if ( parentItem.hasClass('tmpcoder-mega-menu-ajax') && ! parentItem.find('.tmpcoder-mobile-sub-mega-menu').find('.elementor').length  ) {
                        let subIcon = parentItem.find('.tmpcoder-mobile-sub-icon');

                        $.ajax({
                            type: 'GET',
                            url: tmpcoder_plugin_script.resturl + '/tmpcodermegamenu/',
                            data: {
                                item_id: parentItem.data('id')
                            },
                            beforeSend:function() {
                                subIcon.removeClass(mobileSubIconClass).addClass('fas fa-circle-notch fa-spin');
                            },
                            success: function( response ) {
                                subIcon.removeClass('fas fa-circle-notch fa-spin').addClass(mobileSubIconClass);

                                if ( $scope.hasClass('tmpcoder-mobile-menu-display-offcanvas') ) {
                                    parentItem.find('.tmpcoder-menu-offcanvas-back').after(response);
                                    offCanvasSubMenuAnimation( parentItem );
                                } else {
                                    parentItem.find('.tmpcoder-mobile-sub-mega-menu').html(response);
                                    parentItem.children('.tmpcoder-mobile-sub-mega-menu').slideDown();
                                }

                                parentItem.find('.tmpcoder-mobile-sub-mega-menu').find('.elementor-element').each(function() {
                                    elementorFrontend.elementsHandler.runReadyTrigger($(this));
                                });
                            }
                        });
                    } else {
                        if ( $scope.hasClass('tmpcoder-mobile-menu-display-offcanvas') ) {
                            offCanvasSubMenuAnimation( parentItem );
                        } else {
                            parentItem.children('.tmpcoder-mobile-sub-mega-menu').slideDown();
                        }
                    }
                } else {
                    if (  $scope.hasClass('tmpcoder-mobile-menu-display-offcanvas') ) {
                        offCanvasSubMenuAnimation( parentItem );
                    }   
                }
            
            } else {
                // SlideUp
                parentItem.removeClass('tmpcoder-mobile-sub-open');

                if ( ! $scope.hasClass('tmpcoder-mobile-menu-display-offcanvas') ) {
                    parentItem.children('.tmpcoder-mobile-sub-menu').slideUp();
                    parentItem.children('.tmpcoder-mobile-sub-mega-menu').slideUp();
                }
            }
        });

        // Off-Canvas Back Button
        $scope.find('.tmpcoder-menu-offcanvas-back').on('click', function() {
            $(this).closest('.tmpcoder-mobile-mega-menu').removeClass('tmpcoder-mobile-sub-offcanvas-open');
            $(this).closest('.menu-item').removeClass('tmpcoder-mobile-sub-open');
            $scope.find('.tmpcoder-mobile-mega-menu-wrap').removeAttr('style');
            $scope.find('.tmpcoder-mobile-sub-mega-menu').removeAttr('style');
        });

        // Run Functions
        MegaMenuCustomWidth();
        fullWidthMobileDropdown();

        // Run Functions on Resize
        $(window).smartresize(function() {
            MegaMenuCustomWidth();
            fullWidthMobileDropdown();
        });

        // Mega Menu Full or Custom Width
        function MegaMenuCustomWidth() {
            let megaItem = $scope.find('.tmpcoder-mega-menu-true');

            megaItem.each(function() {
                let megaSubMenu = $(this).find('.tmpcoder-sub-mega-menu')

                if ( $(this).hasClass('tmpcoder-mega-menu-width-full') ) {
                    megaSubMenu.css({
                        'max-width' : $(window).width() +'px',
                        'left' : - $scope.find('.tmpcoder-nav-menu-container').offset().left +'px'
                    }); // conditions for sticky replace needed
                } else if ( $(this).hasClass('tmpcoder-mega-menu-width-stretch') ) {
                    // Sections (Old)
                    if ( 0 === $(this).closest('.e-con').length ) {
                        var elContainer = $(this).closest('.elementor-section');
                            elContainer = elContainer.hasClass('elementor-inner-section') ? elContainer : elContainer.children('.elementor-container');

                        var elWidgetGap = !elContainer.hasClass('elementor-inner-section') ? elContainer.find('.elementor-element-populated').css('padding') : '0';
                            elWidgetGap = parseInt(elWidgetGap.replace('px', ''), 10);

                    // Container (New)
                    } else {
                        var elContainer = $(this).closest('.e-con-inner');

                        var elWidgetGap = elContainer.find('.elementor-element.e-con').css('padding'),
                            elWidgetGap = parseInt(elWidgetGap, 10);
                    }

                    var elContainerWidth = elContainer.outerWidth() - (elWidgetGap * 2),
                        offsetLeft = -($scope.offset().left - elContainer.offset().left) + elWidgetGap;

                    megaSubMenu.css({
                        'width' : elContainerWidth +'px',
                        'left' : offsetLeft +'px'
                    });
                } else if ( $(this).hasClass('tmpcoder-mega-menu-width-custom') ) {
                    megaSubMenu.css({
                        'width' : $(this).data('custom-width') +'px',
                    });
                } else if ( $(this).hasClass('tmpcoder-mega-menu-width-default') && $(this).hasClass('tmpcoder-mega-menu-pos-relative') ) {
                    megaSubMenu.css({
                        'width' : $(this).closest('.elementor-column').outerWidth() +'px',
                    });
                }
            });
        }

        // Full Width Dropdown
        function fullWidthMobileDropdown() {
            if ( ! $scope.hasClass( 'tmpcoder-mobile-menu-full-width' ) || ! $scope.closest('.elementor-column').length ) {
                return;
            }

            var eColumn   = $scope.closest('.elementor-column'),
                mWidth    = $scope.closest('.elementor-top-section').outerWidth() - 2 * mobileMenu.offset().left,
                mPosition = eColumn.offset().left + parseInt(eColumn.css('padding-left'), 10);

            mobileMenu.parent('div').css({
                'width' : mWidth +'px',
                'left' : - mPosition +'px'
            });
        }

        // Sub Menu Animation
        function subMenuAnimation( selector, show ) {
            if ( show === true ) {
                selector.stop().addClass('tmpcoder-animate-sub');
        } else {
                selector.stop().removeClass('tmpcoder-animate-sub');
            }
        }

        // Off-Canvas Sub Menu Animation
        function offCanvasSubMenuAnimation( selector ) {
            let title = selector.children('a').clone().children().remove().end().text();

            selector.closest('.tmpcoder-mobile-mega-menu').addClass('tmpcoder-mobile-sub-offcanvas-open');
            selector.find('.tmpcoder-menu-offcanvas-back').find('h3').text(title);

            let parentItem = $scope.find('.tmpcoder-mobile-mega-menu').children('.tmpcoder-mobile-sub-open'),
                subSelector = parentItem.children('ul').length ? parentItem.children('ul') : parentItem.children('.tmpcoder-mobile-sub-mega-menu'),
                subHeight = subSelector.outerHeight();

            if ( subHeight > $(window).height() ) {
                $scope.find('.tmpcoder-mobile-sub-mega-menu').not(selector.find('.tmpcoder-mobile-sub-mega-menu')).hide();
                $scope.find('.tmpcoder-mobile-mega-menu-wrap').css('overflow-y', 'scroll');
            }
        }
    }

    // End widgetMegaMenu
     
    const widgetMagazineGrid = function( $scope, $ ) {
        // Settings
        var iGrid = $scope.find( '.tmpcoder-magazine-grid-wrap' ),
            settings = iGrid.attr( 'data-slick' ),
            dataSlideEffect = iGrid.attr('data-slide-effect');

        // Slider
        if ( typeof settings !== typeof undefined && settings !== false ) {
            iGrid.slick({
                fade: 'fade' === dataSlideEffect ? true : false
            });
        }

        $(document).ready(function() {
            iGrid.css('opacity', 1);
        });

        var iGridLength = iGrid.find('.tmpcoder-mgzn-grid-item').length;

        // Media Hover Link
        if ( 'yes' === iGrid.find( '.tmpcoder-grid-media-wrap' ).attr( 'data-overlay-link' ) && ! editorCheck() ) {
            iGrid.find( '.tmpcoder-grid-media-wrap' ).css('cursor', 'pointer');
            
            iGrid.find( '.tmpcoder-grid-media-wrap' ).on( 'click', function( event ) {
                var targetClass = event.target.className;

                if ( -1 !== targetClass.indexOf( 'inner-block' ) || -1 !== targetClass.indexOf( 'tmpcoder-cv-inner' ) || 
                     -1 !== targetClass.indexOf( 'tmpcoder-grid-media-hover' ) ) {
                    event.preventDefault();

                    var itemUrl = $(this).find( '.tmpcoder-grid-media-hover-bg' ).attr( 'data-url' );
                    
                    itemUrl = TmpcodersanitizeURL(itemUrl);

                    // GOGA - leave if necessary
                    if ( iGrid.find( '.tmpcoder-grid-item-title a' ).length ) {
                        if ( '_blank' === iGrid.find( '.tmpcoder-grid-item-title a' ).attr('target') ) {
                            window.open(itemUrl, '_blank').focus();
                        } else {
                            window.location.href = itemUrl;
                        }
                    }
                }
            });
        }

        // Sharing
        if ( $scope.find( '.tmpcoder-sharing-trigger' ).length ) {
            var sharingTrigger = $scope.find( '.tmpcoder-sharing-trigger' ),
                sharingInner = $scope.find( '.tmpcoder-post-sharing-inner' ),
                sharingWidth = 5;

            // Calculate Width
            sharingInner.first().find( 'a' ).each(function() {
                sharingWidth += $(this).outerWidth() + parseInt( $(this).css('margin-right'), 10 );
            });

            // Calculate Margin
            var sharingMargin = parseInt( sharingInner.find( 'a' ).css('margin-right'), 10 );

            // Set Positions
            if ( 'left' === sharingTrigger.attr( 'data-direction') ) {
                // Set Width
                sharingInner.css( 'width', sharingWidth +'px' );

                // Set Position
                sharingInner.css( 'left', - ( sharingMargin + sharingWidth ) +'px' );
            } else if ( 'right' === sharingTrigger.attr( 'data-direction') ) {
                // Set Width
                sharingInner.css( 'width', sharingWidth +'px' );

                // Set Position
                sharingInner.css( 'right', - ( sharingMargin + sharingWidth ) +'px' );
            } else if ( 'top' === sharingTrigger.attr( 'data-direction') ) {
                // Set Margins
                sharingInner.find( 'a' ).css({
                    'margin-right' : '0',
                    'margin-top' : sharingMargin +'px'
                });

                // Set Position
                sharingInner.css({
                    'top' : -sharingMargin +'px',
                    'left' : '50%',
                    '-webkit-transform' : 'translate(-50%, -100%)',
                    'transform' : 'translate(-50%, -100%)'
                });
            } else if ( 'right' === sharingTrigger.attr( 'data-direction') ) {
                // Set Width
                sharingInner.css( 'width', sharingWidth +'px' );

                // Set Position
                sharingInner.css({
                    'left' : sharingMargin +'px',
                    // 'bottom' : - ( sharingInner.outerHeight() + sharingTrigger.outerHeight() ) +'px',
                });
            } else if ( 'bottom' === sharingTrigger.attr( 'data-direction') ) {
                // Set Margins
                sharingInner.find( 'a' ).css({
                    'margin-right' : '0',
                    'margin-bottom' : sharingMargin +'px'
                });

                // Set Position
                sharingInner.css({
                    'bottom' : -sharingMargin +'px',
                    'left' : '50%',
                    '-webkit-transform' : 'translate(-50%, 100%)',
                    'transform' : 'translate(-50%, 100%)'
                });
            }

            if ( 'click' === sharingTrigger.attr( 'data-action' ) ) {
                sharingTrigger.on( 'click', function() {
                    var sharingInner = $(this).next();

                    if ( 'hidden' === sharingInner.css( 'visibility' ) ) {
                        sharingInner.css( 'visibility', 'visible' );
                        sharingInner.find( 'a' ).css({
                            'opacity' : '1',
                            'top' : '0'
                        });

                        setTimeout( function() {
                            sharingInner.find( 'a' ).addClass( 'tmpcoder-no-transition-delay' );
                        }, sharingInner.find( 'a' ).length * 100 );
                    } else {
                        sharingInner.find( 'a' ).removeClass( 'tmpcoder-no-transition-delay' );

                        sharingInner.find( 'a' ).css({
                            'opacity' : '0',
                            'top' : '-5px'
                        });
                        setTimeout( function() {
                            sharingInner.css( 'visibility', 'hidden' );
                        }, sharingInner.find( 'a' ).length * 100 );
                    }
                });
            } else {
                sharingTrigger.on( 'mouseenter', function() {
                    var sharingInner = $(this).next();

                    sharingInner.css( 'visibility', 'visible' );
                    sharingInner.find( 'a' ).css({
                        'opacity' : '1',
                        'top' : '0',
                    });
                    
                    setTimeout( function() {
                        sharingInner.find( 'a' ).addClass( 'tmpcoder-no-transition-delay' );
                    }, sharingInner.find( 'a' ).length * 100 );
                });
                $scope.find( '.tmpcoder-grid-item-sharing' ).on( 'mouseleave', function() {
                    var sharingInner = $(this).find( '.tmpcoder-post-sharing-inner' );

                    sharingInner.find( 'a' ).removeClass( 'tmpcoder-no-transition-delay' );

                    sharingInner.find( 'a' ).css({
                        'opacity' : '0',
                        'top' : '-5px'
                    });
                    setTimeout( function() {
                        sharingInner.css( 'visibility', 'hidden' );
                    }, sharingInner.find( 'a' ).length * 100 );
                });
            }
        }

        // Likes
        if ( $scope.find( '.tmpcoder-post-like-button' ).length ) {

            $scope.find( '.tmpcoder-post-like-button' ).on( 'click', function() {
                var current = $(this);

                if ( '' !== current.attr( 'data-post-id' ) ) {

                $.ajax({
                    type: 'POST',
                    url: current.attr( 'data-ajax' ),
                    data: {
                        action : 'tmpcoder_likes_init',
                        post_id : current.attr( 'data-post-id' ),
                        nonce : current.attr( 'data-nonce' )
                    },
                    beforeSend:function() {
                        current.fadeTo( 500, 0.5 );
                    },  
                    success: function( response ) {
                        // Get Icon
                        var iconClass = current.attr( 'data-icon' );

                        // Get Count
                        var countHTML = response.count;

                        if ( '' === countHTML.replace(/<\/?[^>]+(>|$)/g, "") ) {
                            countHTML = '<span class="tmpcoder-post-like-count">'+ current.attr( 'data-text' ) +'</span>';

                            if ( ! current.hasClass( 'tmpcoder-likes-zero' ) ) {
                                current.addClass( 'tmpcoder-likes-zero' );
                            }
                        } else {
                            current.removeClass( 'tmpcoder-likes-zero' );
                        }

                        // Update Icon
                        if ( current.hasClass( 'tmpcoder-already-liked' ) ) {
                            current.prop( 'title', 'Like' );
                            current.removeClass( 'tmpcoder-already-liked' );
                            current.html( '<i class="'+ iconClass.replace( 'fas', 'far' ) +'"></i>' + countHTML );
                        } else {
                            current.prop( 'title', 'Unlike' );
                            current.addClass( 'tmpcoder-already-liked' );
                            current.html( '<i class="'+ iconClass.replace( 'far', 'fas' ) +'"></i>' + countHTML );
                        }

                        current.fadeTo( 500, 1 );
                    }
                });

                }

                return false;
            });

        }

    }

    const widgetAdvancedSlider = function( $scope, $ ) {

        var $advancedSlider = $scope.find( '.tmpcoder-advanced-slider' ),
        sliderData = $advancedSlider.data('slick'),
        videoBtnSize = $advancedSlider.data('video-btn-size');
        
        // Slider Columns
        var sliderClass = $scope.attr('class'),

        sliderColumnsDesktop = sliderClass.match(/tmpcoder-adv-slider-columns-\d/) ? +sliderClass.match(/tmpcoder-adv-slider-columns-\d/).join().slice(-1) : 2,
                sliderColumnsWideScreen = sliderClass.match(/columns--widescreen\d/) ? +sliderClass.match(/columns--widescreen\d/).join().slice(-1) : sliderColumnsDesktop,
                sliderColumnsLaptop = sliderClass.match(/columns--laptop\d/) ? +sliderClass.match(/columns--laptop\d/).join().slice(-1) : sliderColumnsDesktop,
                sliderColumnsTablet = sliderClass.match(/columns--tablet\d/) ? +sliderClass.match(/columns--tablet\d/).join().slice(-1) : 1,
                sliderColumnsTabletExtra = sliderClass.match(/columns--tablet_extra\d/) ? +sliderClass.match(/columns--tablet_extra\d/).join().slice(-1) : sliderColumnsTablet,
                sliderColumnsMobileExtra = sliderClass.match(/columns--mobile_extra\d/) ? +sliderClass.match(/columns--mobile_extra\d/).join().slice(-1) : sliderColumnsTablet,
                sliderColumnsMobile = sliderClass.match(/columns--mobile\d/) ? +sliderClass.match(/columns--mobile\d/).join().slice(-1) : 1,

            sliderSlidesToScroll = +(sliderClass.match(/tmpcoder-adv-slides-to-scroll-\d/).join().slice(-1)),
            dataSlideEffect = $advancedSlider.attr('data-slide-effect');

        $advancedSlider.slick({
            appendArrows :  $scope.find('.tmpcoder-slider-controls'),
            appendDots :  $scope.find('.tmpcoder-slider-dots'),
            customPaging : function (slider, i) {
                var slideNumber = (i + 1),
                    totalSlides = slider.slideCount;
                return '<span class="tmpcoder-slider-dot"></span>';
            },
            slidesToShow: sliderColumnsDesktop,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        slidesToShow: sliderColumnsWideScreen,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsWideScreen ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsWideScreen && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 2399,
                    settings: {
                        slidesToShow: sliderColumnsDesktop,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsDesktop ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsDesktop && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 1221,
                    settings: {
                        slidesToShow: sliderColumnsLaptop,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsLaptop ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsLaptop && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: sliderColumnsTabletExtra,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsTabletExtra ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsTabletExtra && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: sliderColumnsTablet,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsTablet ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsTablet && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 880,
                    settings: {
                        slidesToShow: sliderColumnsMobileExtra,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsMobileExtra ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsMobileExtra && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: sliderColumnsMobile,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsMobile ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsMobile && 'fade' === dataSlideEffect) ? true : false
                    }
                }
            ],
        });

        $(document).ready(function() {
            
            $scope.find('.slick-current').addClass('tmpcoder-slick-visible');

            var maxHeight = -1;
            // $scope.find('.slick-slide').each(function() {
            // if ($(this).height() > maxHeight) {
            //  maxHeight = $(this).height();
            // }
            // });
            // $scope.find('.slick-slide').each(function() {
            // if ($(this).height() < maxHeight) {
            //  console.log(Math.ceil((maxHeight-$(this).height())/2) + 'px 0');
            //  $(this).css('margin', Math.ceil((maxHeight-$(this).height())/2) + 'px 0');
            //  // $(this).css('transform', 'translateY(-50%)');
            // }
            // });

            // GOGA - needs condition check if there are any images
            if ( $scope.find('.tmpcoder-slider-img').length !== 0 ) {
                $scope.find('.tmpcoder-advanced-slider').css('height', $scope.find('.slick-current').outerHeight());
            
                $scope.find('.tmpcoder-slider-arrow').on('click', function() {
                    console.log('works resize');
                    $scope.find('.tmpcoder-advanced-slider').css('height', $scope.find('.slick-current').outerHeight());
                });
    
                $(window).smartresize(function() {
                    $scope.find('.tmpcoder-advanced-slider').css('height', $scope.find('.slick-current').outerHeight());
                });
            }
        });
        
        function sliderVideoSize(){
              
            // var sliderWidth = $advancedSlider.find('.tmpcoder-slider-item').outerWidth(),
            //  sliderHeight = $advancedSlider.find('.tmpcoder-slider-item').outerHeight(),
            //  sliderRatio = sliderWidth / sliderHeight,
            //  iframeRatio = (16/9),
            //  iframeHeight,
            //  iframeWidth,
            //  iframeTopDistance = 0,
            //  iframeLeftDistance = 0;

            // if ( sliderRatio > iframeRatio ) {
            //  iframeWidth = sliderWidth;
            //  iframeHeight = iframeWidth / iframeRatio;
            //  iframeTopDistance = '-'+ ( iframeHeight - sliderHeight ) / 2 +'px';
            // } else {
            //  iframeHeight = sliderHeight;
            //  iframeWidth = iframeHeight * iframeRatio;
            //  iframeLeftDistance = '-'+ ( iframeWidth - sliderWidth ) / 2 +'px';
            // }

            // $advancedSlider.find('iframe').css({
            //  'display': 'block',
            //  'width': iframeWidth +'px',
            //  'height': iframeHeight +'px',
            //  'max-width': 'none',
            //  'position': 'absolute',
            //  'left': iframeLeftDistance +'',
            //  'top': iframeTopDistance +'',
            //  'text-align': 'inherit',
            //  'line-height':'0px',
            //  'border-width': '0px',
            //  'margin': '0px',
            //  'padding': '0px',
            // });
            
            $advancedSlider.find('iframe').attr('width', $scope.find('.tmpcoder-slider-item').width());
            $advancedSlider.find('iframe').attr('height', $scope.find('.tmpcoder-slider-item').height());

            var viewportWidth = $(window).outerWidth();

            var MobileResp = +elementorFrontend.config.responsive.breakpoints.mobile.value;
            var MobileExtraResp = +elementorFrontend.config.responsive.breakpoints.mobile_extra.value;
            var TabletResp = +elementorFrontend.config.responsive.breakpoints.tablet.value;
            var TabletExtraResp = +elementorFrontend.config.responsive.breakpoints.tablet_extra.value;
            var LaptopResp = +elementorFrontend.config.responsive.breakpoints.laptop.value;
            var wideScreenResp = +elementorFrontend.config.responsive.breakpoints.widescreen.value;

            var activeBreakpoints = elementorFrontend.config.responsive.activeBreakpoints;

            [...$scope[0].classList].forEach(className => {
                if (className.startsWith('tmpcoder-slider-video-icon-size-')) {
                    $scope[0].classList.remove(className);
                }
            });

            // Mobile
            if ( MobileResp >= viewportWidth && activeBreakpoints.mobile != null ) {
                $scope.addClass('tmpcoder-slider-video-icon-size-'+videoBtnSize.mobile);
            // Mobile Extra
            } else if ( MobileExtraResp >= viewportWidth && activeBreakpoints.mobile_extra != null ) {
                $scope.addClass('tmpcoder-slider-video-icon-size-'+videoBtnSize.mobile_extra);
            // Tablet
            } else if ( TabletResp >= viewportWidth && activeBreakpoints.tablet != null ) {
                $scope.addClass('tmpcoder-slider-video-icon-size-'+videoBtnSize.tablet);
            // Tablet Extra
            } else if ( TabletExtraResp >= viewportWidth && activeBreakpoints.tablet_extra != null ) {
                $scope.addClass('tmpcoder-slider-video-icon-size-'+videoBtnSize.tablet_extra);
            // Laptop
            } else if ( LaptopResp >= viewportWidth && activeBreakpoints.laptop != null ) {
                $scope.addClass('tmpcoder-slider-video-icon-size-'+videoBtnSize.laptop);
            // Desktop
            } else if ( wideScreenResp > viewportWidth ) {
                $scope.addClass('tmpcoder-slider-video-icon-size-'+videoBtnSize.desktop);
            }  else {
                $scope.addClass('tmpcoder-slider-video-icon-size-'+videoBtnSize.widescreen);
            }
            // tmpcoder-slider-video-icon-size-
        }

        $(window).on('load resize', function(){
            sliderVideoSize();
        });

        $(document).ready(function () {
            // Handler when all assets (including images) are loaded
            if ( $scope.find('.tmpcoder-advanced-slider').length ) {
                $scope.find('.tmpcoder-advanced-slider').css('opacity', 1);
                autoplayVideo();
            }
        });

        function autoplayVideo() {
            $advancedSlider.find('.slick-current').each(function() {

                var videoSrc = $(this).find('.tmpcoder-slider-item').attr('data-video-src'),
                videoAutoplay = $(this).find('.tmpcoder-slider-item').attr('data-video-autoplay');
                
                if ( $(this).find( '.tmpcoder-slider-video' ).length !== 1 && videoAutoplay === 'yes' ) {
                    if ( videoSrc.includes('vimeo') || videoSrc.includes('youtube') ) {
                        if ( sliderColumnsDesktop == 1 ) {
                            // $(this).find('.tmpcoder-cv-inner').prepend('<div class="tmpcoder-slider-video"><iframe src="'+ videoSrc +'" width="100%" height="100%"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');
                            $(this).find('.tmpcoder-cv-inner').prepend('<div class="tmpcoder-slider-video"><iframe src="'+ videoSrc +'"  frameborder="0" allow="autoplay" allowfullscreen></iframe></div>');
                        } else {
                            $(this).find('.tmpcoder-cv-container').prepend('<div class="tmpcoder-slider-video"><iframe src="'+ videoSrc +'" width="100%" height="100%"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'); 
                        }
                        sliderVideoSize();
                    } else {
                        var videoMute = $(this).find('.tmpcoder-slider-item').attr('data-video-mute');
                        var videoControls = $(this).find('.tmpcoder-slider-item').attr('data-video-controls');
                        var videoLoop = $(this).find('.tmpcoder-slider-item').attr('data-video-loop');

                        $(this).find('.tmpcoder-cv-inner').prepend('<div class="tmpcoder-slider-video tmpcoder-custom-video"><video autoplay '+ videoLoop + ' ' + videoMute + ' ' + videoControls + ' ' +  'src="'+ videoSrc +'" width="100%" height="100%"></video></div>');
                        
                        $advancedSlider.find('video').attr('width', $scope.find('.tmpcoder-slider-item').width());
                        $advancedSlider.find('video').attr('height', $scope.find('.tmpcoder-slider-item').height());
                    }

                    // GOGA - remove condition if not necessary
                    if ( $(this).find('.tmpcoder-slider-content') ) {
                        $(this).find('.tmpcoder-slider-content').fadeOut(300);
                    }
                }
            });
        }

        function slideAnimationOff() {
            if ( sliderColumnsDesktop == 1 ) {
                $advancedSlider.find('.tmpcoder-slider-item').not('.slick-active').find('.tmpcoder-slider-animation').removeClass( 'tmpcoder-animation-enter' );
            }
        }

        function slideAnimationOn() {
            $advancedSlider.find('.slick-active').find('.tmpcoder-slider-content').fadeIn(0);
            $advancedSlider.find('.slick-cloned').find('.tmpcoder-slider-content').fadeIn(0);
            $advancedSlider.find('.slick-current').find('.tmpcoder-slider-content').fadeIn(0);
            if ( sliderColumnsDesktop == 1 ) {
                $advancedSlider.find('.slick-active').find('.tmpcoder-slider-animation').addClass( 'tmpcoder-animation-enter' );
            }
        }
        
        slideAnimationOn();

        $advancedSlider.on( 'click', '.tmpcoder-slider-video-btn', function() {

            var currentSlide = $(this).closest('.slick-slide'),
                videoSrc = currentSlide.find('.tmpcoder-slider-item').attr('data-video-src');

                console.log(videoSrc);
        
            console.log(currentSlide, videoSrc);
        
            var allowFullScreen = '';
        
            if ( videoSrc.includes('youtube') ) {
                videoSrc += "&autoplay=1"; // Tell YouTube to autoplay
                allowFullScreen = 'allowfullscreen="allowfullscreen"';
            } else if ( videoSrc.includes('vimeo') ) {
                allowFullScreen = 'allowfullscreen';
            } else {
                var videoMute = currentSlide.find('.tmpcoder-slider-item').attr('data-video-mute');
                var videoControls = currentSlide.find('.tmpcoder-slider-item').attr('data-video-controls');
                var videoLoop = currentSlide.find('.tmpcoder-slider-item').attr('data-video-loop');
                
                if ( currentSlide.find( '.tmpcoder-slider-video' ).length !== 1 ) {
                    currentSlide.find('.tmpcoder-cv-container').prepend('<div class="tmpcoder-slider-video tmpcoder-custom-video"><video '+ videoLoop + ' ' + videoMute + ' ' + videoControls + ' ' + 'src="'+ videoSrc +'" width="100%" height="100%"></video></div>');

                    $advancedSlider.find('video').attr('width', $scope.find('.tmpcoder-slider-item').width());
                    $advancedSlider.find('video').attr('height', $scope.find('.tmpcoder-slider-item').height());

                    currentSlide.find('.tmpcoder-slider-content').fadeOut(300);

                    currentSlide.find('video')[0].play();
                }
                return;
            }
        
            if ( currentSlide.find( '.tmpcoder-slider-video' ).length !== 1 ) {
                // currentSlide.find('.tmpcoder-cv-container').prepend('<div class="tmpcoder-slider-video"><iframe src="'+ videoSrc +'" width="100%" height="100%"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"></iframe></div>');
                currentSlide.find('.tmpcoder-cv-container').prepend('<div class="tmpcoder-slider-video"><iframe src="'+ videoSrc +'" width="100%" height="100%"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"'+ allowFullScreen +'></iframe></div>');

                sliderVideoSize();
                currentSlide.find('.tmpcoder-slider-content').fadeOut(300);
            }
        
        });

        $advancedSlider.on( {
            beforeChange: function() {
                $advancedSlider.find('.tmpcoder-slider-item').not('.slick-active').find('.tmpcoder-slider-video').remove();
                $advancedSlider.find('.tmpcoder-animation-enter').find('.tmpcoder-slider-content').fadeOut(300);
                slideAnimationOff();
            },
            afterChange: function( event, slick, currentSlide ) {
                slideAnimationOn();
                autoplayVideo();
                $scope.find('.slick-slide').removeClass('tmpcoder-slick-visible');
                $scope.find('.slick-current').addClass('tmpcoder-slick-visible');
                $scope.find('.slick-current').nextAll().slice(0, sliderColumnsDesktop - 1).addClass('tmpcoder-slick-visible');
                $scope.find('.tmpcoder-advanced-slider').css('height', $scope.find('.slick-current').outerHeight());
            }
        });

        // Adjust Horizontal Pagination
        if ( $scope.find( '.slick-dots' ).length && $scope.hasClass( 'tmpcoder-slider-dots-horizontal') ) {
            // Calculate Width
            var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

            // on Load
            if ( $scope.find( '.slick-dots' ).length ) {
                $scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
            }

            // on Resize
            $(window).smartresize(function() {
                setTimeout(function() {
                    // Calculate Width
                    var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

                    // Set Width
                    $scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
                }, 300 );
            });
        }

    }
     
    const widgetImageAccordion = function( $scope, $ ) {

        var settings = JSON.parse($scope.find( '.tmpcoder-img-accordion-media-hover' ).attr( 'data-settings' ));

        // var MediaWrap = $scope.find( '.tmpcoder-img-accordion-media-hover' );
        var MediaWrap = $scope.find( '.tmpcoder-image-accordion' );
        // var  lightboxSettings = settings.lightbox;
        var lightboxSettings = $scope.find('.tmpcoder-image-accordion').attr('lightbox') ? JSON.parse($scope.find('.tmpcoder-image-accordion').attr('lightbox')) : '';

        var thisTargetHasClass = false;

        if ( $scope.find('.tmpcoder-image-accordion-wrap').hasClass('tmpcoder-acc-no-column') ) {
            if ( !$scope.hasClass('tmpcoder-image-accordion-row') );
            $scope.removeClass('tmpcoder-image-accordion-column').addClass('tmpcoder-image-accordion-row');
            $scope.find('.tmpcoder-image-accordion').css('flex-direction', 'row');
        }

        if ( '' !== lightboxSettings ) {
        
            // Init Lightbox
            MediaWrap.lightGallery( lightboxSettings );

            // Fix LightGallery Thumbnails
            MediaWrap.on('onAfterOpen.lg',function() {
                if ( $('.lg-outer').find('.lg-thumb-item').length ) {
                    $('.lg-outer').find('.lg-thumb-item').each(function() {
                        var imgSrc = $(this).find('img').attr('src'),
                            newImgSrc = imgSrc,
                            extIndex = imgSrc.lastIndexOf('.'),
                            imgExt = imgSrc.slice(extIndex),
                            cropIndex = imgSrc.lastIndexOf('-'),
                            cropSize = /\d{3,}x\d{3,}/.test(imgSrc.substring(extIndex,cropIndex)) ? imgSrc.substring(extIndex,cropIndex) : false;
                        
                        if ( 42 <= imgSrc.substring(extIndex,cropIndex).length ) {
                            cropSize = '';
                        }

                        if ( cropSize !== '' ) {
                            if ( false !== cropSize ) {
                                newImgSrc = imgSrc.replace(cropSize, '-150x150');
                            } else {
                                newImgSrc = [imgSrc.slice(0, extIndex), '-150x150', imgSrc.slice(extIndex)].join('');
                            }
                        }

                        // Change SRC
                        $(this).find('img').attr('src', newImgSrc);

                        if ( false == cropSize || '-450x450' === cropSize ) {
                            $(this).find('img').attr('src', imgSrc);
                        }
                    });
                }
            });

            // Show/Hide Controls
            $scope.find( '.tmpcoder-image-accordion' ).on( 'onAferAppendSlide.lg, onAfterSlide.lg', function( event, prevIndex, index ) {
                var lightboxControls = $( '#lg-actual-size, #lg-zoom-in, #lg-zoom-out, #lg-download' ),
                    lightboxDownload = $( '#lg-download' ).attr( 'href' );

                if ( $( '#lg-download' ).length ) {
                    if ( -1 === lightboxDownload.indexOf( 'wp-content' ) ) {
                        lightboxControls.addClass( 'tmpcoder-hidden-element' );
                    } else {
                        lightboxControls.removeClass( 'tmpcoder-hidden-element' );
                    }
                }

                // Autoplay Button
                if ( '' === lightboxSettings.autoplay ) {
                    $( '.lg-autoplay-button' ).css({
                         'width' : '0',
                         'height' : '0',
                         'overflow' : 'hidden'
                    });
                }
            });
        }

        MediaWrap.css('cursor', 'pointer');

        // Init Media Hover Link

        var accordionItem = $scope.find('.tmpcoder-image-accordion-item');

        // Media Hover Link
        function mediaHoverLink() {
            if ( ! editorCheck() ) {

                $scope.find('.tmpcoder-img-accordion-media-hover').on( 'click', function( event ) {
                    var thisSettings = event.target.className.includes('tmpcoder-img-accordion-media-hover') ? JSON.parse($(this).attr('data-settings')) : JSON.parse($(this).closest('.tmpcoder-img-accordion-media-hover').attr( 'data-settings' ));
                    
                    if ( !$(event.target).hasClass('tmpcoder-img-accordion-item-lightbox') && 0 === $(event.target).closest('.tmpcoder-img-accordion-item-lightbox').length ) {
                        var itemUrl = thisSettings.activeItem.overlayLink;

                        itemUrl = TmpcodersanitizeURL(itemUrl);

                        if (itemUrl != '') {

                            if ( '_blank' === thisSettings.activeItem.overlayLinkTarget ) {
                                window.open(itemUrl, '_blank').focus();
                            } else {
                                window.location.href = itemUrl;
                            }
                        }
                    }
                });
            }               
        }

        if ( 'hover' === settings.activeItem.interaction) {

            mediaHoverLink();
            
            accordionItem.on('mouseenter', function() {
                accordionItem.removeClass('tmpcoder-image-accordion-item-grow');
                accordionItem.find('.tmpcoder-animation-wrap').removeClass('tmpcoder-animation-wrap-active');
                $(this).addClass('tmpcoder-image-accordion-item-grow');
                $(this).find('.tmpcoder-animation-wrap').addClass('tmpcoder-animation-wrap-active');
            });

            accordionItem.on('mouseleave', function() {
                $(this).removeClass('tmpcoder-image-accordion-item-grow');
                $(this).find('.tmpcoder-animation-wrap').removeClass('tmpcoder-animation-wrap-active');
            });

        } else if ( 'click' === settings.activeItem.interaction ) {
            $scope.find('.tmpcoder-img-accordion-media-hover').removeClass('tmpcoder-animation-wrap');
            accordionItem.on('click', '.tmpcoder-img-accordion-media-hover', function(event) {
                thisTargetHasClass = event.target.className.includes('tmpcoder-img-accordion-media-hover') ? event.target.className.includes('tmpcoder-animation-wrap-active') : $(this).closest('.tmpcoder-img-accordion-media-hover').hasClass('tmpcoder-animation-wrap-active');
                if (thisTargetHasClass && !editorCheck()) {
                    var thisSettings = event.target.className.includes('tmpcoder-img-accordion-media-hover') ? JSON.parse($(this).attr('data-settings')) : JSON.parse($(this).closest('.tmpcoder-img-accordion-media-hover').attr( 'data-settings' ));
                    
                    if ( !$(event.target).hasClass('tmpcoder-img-accordion-item-lightbox') && 0 === $(event.target).closest('.tmpcoder-img-accordion-item-lightbox').length ) {
                        var itemUrl = thisSettings.activeItem.overlayLink;
                        itemUrl = TmpcodersanitizeURL(itemUrl);

                        if (itemUrl != '') {
                            if ( '_blank' === thisSettings.activeItem.overlayLinkTarget ) {
                                window.open(itemUrl, '_blank').focus();
                            } else {
                                window.location.href = itemUrl;
                            }
                        }
                    }
                } else {
                    $scope.find('.tmpcoder-img-accordion-media-hover').removeClass('tmpcoder-animation-wrap').removeClass('tmpcoder-animation-wrap-active');
                    accordionItem.removeClass('tmpcoder-image-accordion-item-grow');
                    $(this).closest('.tmpcoder-image-accordion-item').addClass('tmpcoder-image-accordion-item-grow');
                    $(this).closest('.tmpcoder-img-accordion-media-hover').addClass('tmpcoder-animation-wrap-active');
                }
            });
        } else {
            $scope.find('.tmpcoder-img-accordion-media-hover').removeClass('tmpcoder-animation-wrap');
        }

        accordionItem.each(function() {
            if ( $(this).index() === settings.activeItem.defaultActive - 1 ) {
                if ( 'click' === settings.activeItem.interaction) {
                    setTimeout(() => {
                        $(this).find('.tmpcoder-img-accordion-media-hover').trigger('click');
                    }, 400);
                } else {
                    setTimeout(() => {
                        $(this).find('.tmpcoder-img-accordion-media-hover').trigger('mouseenter');
                    }, 400);
                }
            }
        });
        
        $scope.find('.tmpcoder-image-accordion-wrap').css('opacity', 1); 
    }

    const widgetFlipCarousel = function( $scope, $ ) {
        var flipsterSettings = JSON.parse($scope.find('.tmpcoder-flip-carousel').attr('data-settings'));

        $scope.find('.tmpcoder-flip-carousel').css('opacity', 1);
        
        $scope.find('.tmpcoder-flip-carousel').flipster({
            itemContainer: 'ul',
            itemSelector: 'li',
            fadeIn: 400,
            start: flipsterSettings.starts_from_center === 'yes' ? 'center' : 0,
            style: flipsterSettings.carousel_type,
            loop: flipsterSettings.loop === 'yes' ? true : false,
            autoplay: flipsterSettings.autoplay === 'no' ? false : flipsterSettings.autoplay_milliseconds,
            pauseOnHover: flipsterSettings.pause_on_hover === 'yes' ? true : false,
            click: flipsterSettings.play_on_click === 'yes' ? true : false,
            scrollwheel: flipsterSettings.play_on_scroll === 'yes' ? true : false,
            touch: true,
            nav: 'true' === flipsterSettings.pagination_position ? true : flipsterSettings.pagination_position ? flipsterSettings.pagination_position : false,
            spacing: flipsterSettings.spacing,
            buttons: 'custom',
            buttonPrev: flipsterSettings.button_prev,
            buttonNext: flipsterSettings.button_next
        });
        
        var paginationButtons = $scope.find('.tmpcoder-flip-carousel').find('.flipster__nav__item').find('.flipster__nav__link');
        
        paginationButtons.each(function() {
            $(this).text(parseInt($(this).text()) + 1);
        });
    }

    /* Add to Cart Widget */
    const widgetProductAddToCart = function($scope,$) {
        var qtyInput = jQuery('.woocommerce .tmpcoder-quantity-wrapper'),
            qtyInputInStock = qtyInput.find('input.qty').attr('max') ? qtyInput.find('input.qty').attr('max') : 99999999,
            qtyLayout = $scope.find('.tmpcoder-product-add-to-cart').attr('layout-settings'),
            qtyWrapper = $scope.find('.tmpcoder-add-to-cart-icons-wrap'),
            plusIconChild = !$scope.find('.tmpcoder-add-to-cart-icons-wrap').length ? 'last-child' : 'first-child',
            minusIconChild = !$scope.find('.tmpcoder-add-to-cart-icons-wrap').length ? 'first-child' : 'last-child';

        $scope.find('input.qty').each(function() {
            if (!$(this).val()) {
                $(this).val(0);
            }
        });
        
        $scope.find('.variations').find('select').on('change', function () {
            var resetButtonDisplay = false;
            $scope.find('.variations').find('select').each(function () {
                if ( 'choose an option' !== $(this).find('option:selected').text().toLowerCase() ) {
                    resetButtonDisplay = true;
                }
            });

            if ( resetButtonDisplay == false ) {
                $scope.find('.reset_variations').css('display', 'none');
            } else {
                $scope.find('.reset_variations').css('display', 'inline-block');
            }
        });

        // convert to text input
        if (qtyLayout !== 'default' ) {
            qtyInput.find('input.qty').attr('type', 'text').removeAttr('step').removeAttr('min').removeAttr('max');
            // qtyInput.find('input.qty').attr('type', 'text').removeAttr('step').removeAttr('max');
        }
    
        // plus
        qtyInput.on('click', 'i:'+plusIconChild, function() {

            if ( parseInt(jQuery(this).prev('.quantity').find('input.qty').val(), 10) < qtyInputInStock && qtyLayout == 'both' ) {

                if (parseInt(jQuery(this).prev('.quantity').find('input.qty').val(), 10) == 0)
                {
                    jQuery('.single_add_to_cart_button').removeAttr('style');
                }

                jQuery(this).prev('.quantity').find('input.qty').val( parseInt(jQuery(this).prev('.quantity').find('input.qty').val(), 10) + 1);
                jQuery('input[name="update_cart"]').removeAttr('disabled');
            } else if ( parseInt(jQuery(this).parent().siblings('.quantity').find('input.qty').val(), 10) < qtyInputInStock && qtyLayout !== 'both' && qtyLayout !== 'default' ) {
                jQuery(this).parent().siblings('.quantity').find('input.qty').val( parseInt(jQuery(this).parent().siblings('.quantity').find('input.qty').val(), 10) + 1);
                jQuery('input[name="update_cart"]').removeAttr('disabled');

                var qty = jQuery(this).parent().siblings('.quantity').find('input.qty').val();

                if (qty < 1)
                {
                    jQuery('.single_add_to_cart_button').css('pointer-events','none');
                    jQuery('.single_add_to_cart_button').css('opacity','0.5');
                }
                else
                {
                    jQuery('.single_add_to_cart_button').removeAttr('style');
                }
            }
        });
        
        // minus
        qtyInput.on('click', 'i:'+minusIconChild, function() {

            if ( parseInt(jQuery(this).next('.quantity').find('input.qty').val(), 10) > 1 && qtyLayout == 'both' ) {
                jQuery(this).next('.quantity').find('input.qty').val( parseInt(jQuery(this).next('.quantity').find('input.qty').val(), 10) - 1);
                jQuery('input[name="update_cart"]').removeAttr('disabled');
            } else if ( parseInt(jQuery(this).parent().siblings('.quantity').find('input.qty').val(), 10) > 0 && qtyLayout !== 'both' && qtyLayout !== 'default' ) {
                jQuery(this).parent().siblings('.quantity').find('input.qty').val( parseInt(jQuery(this).parent().siblings('.quantity').find('input.qty').val(), 10) - 1);
                jQuery('input[name="update_cart"]').removeAttr('disabled');

                var qty = jQuery(this).parent().siblings('.quantity').find('input.qty').val();

                if (qty < 1)
                {
                    jQuery('.single_add_to_cart_button').css('pointer-events','none');
                    jQuery('.single_add_to_cart_button').css('opacity','0.5');
                }
                else
                {
                    jQuery('.single_add_to_cart_button').removeAttr('style');
                }
            }
        });
    
        jQuery(document).on('keyup change blur','input.qty',function(){
            if (jQuery(this).val() < 1)
            {
                jQuery('.single_add_to_cart_button').css('pointer-events','none');
                jQuery('.single_add_to_cart_button').css('opacity','0.5');
            }
            else{
                jQuery('.single_add_to_cart_button').removeAttr('style');
            }
        });

        qtyInput.find('input.qty').keyup(function() {
            if ( jQuery(this).val() > qtyInputInStock ) {
                jQuery(this).val( qtyInputInStock );
            }
        });

        if ( 'yes' === $scope.find('.tmpcoder-product-add-to-cart').data('ajax-add-to-cart') ) {
            if ( !$('div[data-elementor-type="tmpcoder-theme-builder"]').hasClass('product-type-external') ) {
                $scope.find('.single_add_to_cart_button').on('click', ajaxAddToCart);
            }
        }

        function ajaxAddToCart(e) {
            e.preventDefault();
        
            let $form = $( this ).closest('form');

            var $variationForm = $form.closest('.variations_form');

            let isGrouped = $form.hasClass('grouped_form');
        
            if ( ! $form[0].checkValidity() ) {
                $form[0].reportValidity();
        
                return false;
            }
                    
            let $thisBtn = $( this ),
                product_id = $thisBtn.val() || '',
                cartFormData = $form.serialize();
                
                // // Get the ID of the selected variation
                // let variation_id = $scope.find('input[name="variation_id"]').val();
                // console.log(window['wc_variation_form']);
                // // Get the data of the selected variation
                // let variation_data = window['wc_variation_form'].variation_data[variation_id];
                
                // // Get the availability HTML of the selected variation
                // let availability_html = variation_data.availability_html;
                
                // // Check if the variation is in stock
                // if (availability_html.indexOf('In stock') !== -1) {
                //   console.log('Selected variation is in stock');
                // } else {
                //   console.log('Selected variation is out of stock');
                // }
            
            if (isGrouped) {
                let nonZero = false;
                $scope.find('.woocommerce-grouped-product-list-item__quantity').find('input').each(function() {
                    if ($(this).val() > 0 ) {
                        nonZero = true;
                    }
                });

                if ( !nonZero ) {
                    // The grouped product does not have the required number of items selected
                    alert(tmpcoder_plugin_script.chooseQuantityText);
                    return;
                }
            }
        
            $.ajax( {
                type: 'POST',
                url: tmpcoder_plugin_script.ajax_url,
                data: 'action=tmpcoder_add_cart_single_product&add-to-cart=' + product_id + '&' + cartFormData,
                beforeSend: function () {
                    if ( $variationForm.length > 0 && ! $variationForm.find('.variations select').val() ) {
                        // Do not trigger added_to_cart event if options are not selected for variable product
                        return;
                    } 
                    if ( $thisBtn.hasClass('disabled') ) {
                        return
                    }

                    $thisBtn.removeClass( 'added' ).addClass( 'loading' );
                },
                complete: function () {
                    if ( $variationForm.length > 0 && ! $variationForm.find('.variations select').val() ) {
                        // Do not trigger added_to_cart event if options are not selected for variable product
                        return;
                    } 

                    if ( $thisBtn.hasClass('disabled') ) {
                        return
                    }

                    $thisBtn.addClass( 'added' ).removeClass( 'loading' );
                },
                success: function ( response ) {

                    // GOGA - remove later
                    if (response.notices && response.notices.length > 0) {

                        // The selected variation is low in stock, display a warning message
                        if (response.notices[0].type === 'wc_low_stock') {
                            alert('Only ' + response.notices[0].message + ' left in stock!');
                        } else {
                            alert(response.notices[0].message);
                        }
                    }

                    if ( response.error && response.product_url ) {
                        window.location = response.product_url;
                        return;
                    }
        
                    if ( typeof wc_add_to_cart_params === 'undefined' ) {
                        return false;
                    }
        
                    if ( $variationForm.length > 0 && ! $variationForm.find('.variations select').val() ) {
                        // Do not trigger added_to_cart event if options are not selected for variable product
                        return;
                    }
                    
                    if ( $thisBtn.hasClass('disabled') ) {
                        return;
                    }

                    $( document.body ).trigger( 'wc_fragment_refresh' );
                    $( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, $thisBtn ] );

                    setTimeout( function () {
                        $thisBtn.removeClass( 'added' );
                        var currentCartCount = parseInt($('.tmpcoder-mini-cart-icon-count').text());
                        var updatedCartCount = parseInt($scope.find('.tmpcoder-quantity-wrapper .qty').val());
                        $('.tmpcoder-mini-cart-icon-count').text(currentCartCount + updatedCartCount);
                        
                        if ( $('.refresh-tmpcoder-cart-qty').length > 0 ){
                            $('.tmpcoder-cart-total .tmpcoder-total-qty').text($('.refresh-tmpcoder-cart-qty').val());
                            $('.tmpcoder-cart-popup .tmpcoder-cart-popup-count').text($('.refresh-tmpcoder-cart-qty').val());
                        }
                        if ( $('.refresh-tmpcoder-cart-total').length > 0 ){
                            $('.tmpcoder-cart-total .woocommerce-Price-amount').replaceWith( $('.refresh-tmpcoder-cart-total .woocommerce-Price-amount').clone() );
                        }
                    }, 200);
                },
            } );
        }
    }

    jQuery( 'body' ).on('removed_from_cart', function(ev, fragments, hash, button){
        setTimeout(function(){
            if ( jQuery('.refresh-tmpcoder-cart-qty').length > 0 ){
                jQuery('.tmpcoder-cart-total .tmpcoder-total-qty').text(jQuery('.refresh-tmpcoder-cart-qty').val());
                jQuery('.tmpcoder-cart-popup .tmpcoder-cart-popup-count').text(jQuery('.refresh-tmpcoder-cart-qty').val());
            }
            if ( jQuery('.refresh-tmpcoder-cart-total').length > 0 ){
                jQuery('.tmpcoder-cart-total .woocommerce-Price-amount').replaceWith( jQuery('.refresh-tmpcoder-cart-total .woocommerce-Price-amount').clone() );
            }
        }, 200);
    });

    jQuery( 'body' ).on( 'removed_from_cart added_to_cart updated_cart_totals', function(event){

        if (jQuery(".mini-cart-custom-icon").val() == 1)
        {
            jQuery(".tmpcoder-cart-popup-body").addClass('custom-remove-icon');
        } 
        jQuery("#tmpcoder-cart-button").load(location.href+" #tmpcoder-cart-button>*","");
        jQuery("#tmpcoder-cart-popup").load(location.href+" #tmpcoder-cart-popup>*","");
    });

    /* Add to Cart Widget - END */

    const widgetReadingProgressBar = function($scope, $) {

        if ( $scope.find('.tmpcoder-reading-progress-bar-container').length != 0 ) {
            var rpbContainer = $scope.find('.tmpcoder-reading-progress-bar-container');
            readingProgressBar($scope, rpbContainer);
        }

        function readingProgressBar($scope, rpbContainer) {

            var initialPaddingTop = $('body').css('paddingTop');
            var initialPaddingBottom = $('body').css('paddingBottom');

            if ( '0px' === rpbContainer.css('top') ) {
                if ( 'colored' == rpbContainer.data('background-type') ) {
                    $('body').css('paddingTop', $scope.find('.tmpcoder-reading-progress-bar').css('height'));
                }
                if ( $('#wpadminbar').length ) {
                    rpbContainer.css('top', $('#wpadminbar').height());
                }
                $('body').css('paddingBottom', initialPaddingBottom);
            } else if ( '0px' === rpbContainer.css('bottom') && 'colored' == rpbContainer.data('background-type') ) {
                $('body').css('paddingBottom', $scope.find('.tmpcoder-reading-progress-bar').css('height'));
                $('body').css('paddingTop', initialPaddingTop);
            }

            readingProgressBarFill($scope);
            window.onscroll = function() {
                readingProgressBarFill($scope);
            };

        }

        function readingProgressBarFill($scope) {
            if ( $scope.find('.tmpcoder-reading-progress-bar').length ) {
                var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                var scrolled = (winScroll / height) * 100;
                $scope.find(".tmpcoder-reading-progress-bar").css('width', scrolled + "%");
            }
        }

    }
    
    const widgetOffcanvas = function( $scope, $ ) {
        let animationDuration;

        if ( $scope.hasClass('tmpcoder-offcanvas-entrance-animation-pro-sl') ) {
            $scope.removeClass('tmpcoder-offcanvas-entrance-animation-pro-sl').addClass('tmpcoder-offcanvas-entrance-animation-fade');
        } else if ( $scope.hasClass('tmpcoder-offcanvas-entrance-animation-pro-gr') ) {
            $scope.removeClass('tmpcoder-offcanvas-entrance-animation-pro-gr').addClass('tmpcoder-offcanvas-entrance-animation-fade');
        }

        if ( $scope.hasClass('tmpcoder-offcanvas-entrance-type-pro-ps') ) {
            $scope.removeClass('tmpcoder-offcanvas-entrance-type-pro-ps').addClass('tmpcoder-offcanvas-entrance-type-cover');
        }

        function openOffcanvas(offcanvasSelector) {
            if ( !$scope.hasClass('tmpcoder-offcanvas-entrance-type-push') && !$scope.find('.tmpcoder-offcanvas-content').hasClass('tmpcoder-offcanvas-content-relative') ) {
                $('body').addClass('tmpcoder-offcanvas-body-overflow');
            }
            animationDuration = +offcanvasSelector.find('.tmpcoder-offcanvas-content').css('animation-duration').replace('s', '') * 1000;
            offcanvasSelector.fadeIn(animationDuration);
            offcanvasSelector.addClass('tmpcoder-offcanvas-wrap-active');
            if ( $scope.hasClass('tmpcoder-offcanvas-entrance-animation-slide') ) {
                if ( offcanvasSelector.find('.tmpcoder-offcanvas-content').hasClass('tmpcoder-offcanvas-slide-in') ) {
                    offcanvasSelector.find('.tmpcoder-offcanvas-content').removeClass('tmpcoder-offcanvas-slide-in').addClass('tmpcoder-offcanvas-slide-out');
                } else {
                    offcanvasSelector.find('.tmpcoder-offcanvas-content').removeClass('tmpcoder-offcanvas-slide-out').addClass('tmpcoder-offcanvas-slide-in');
                }
            } else if ( $scope.hasClass('tmpcoder-offcanvas-entrance-animation-grow') ) {
                if ( offcanvasSelector.find('.tmpcoder-offcanvas-content').hasClass('tmpcoder-offcanvas-grow-in') ) {
                    offcanvasSelector.find('.tmpcoder-offcanvas-content').removeClass('tmpcoder-offcanvas-grow-in').addClass('tmpcoder-offcanvas-grow-out');
                } else {
                    offcanvasSelector.find('.tmpcoder-offcanvas-content').removeClass('tmpcoder-offcanvas-grow-out').addClass('tmpcoder-offcanvas-grow-in');
                }
            } else if ( $scope.hasClass('tmpcoder-offcanvas-entrance-animation-fade') ) {
                if ( offcanvasSelector.find('.tmpcoder-offcanvas-content').hasClass('tmpcoder-offcanvas-fade-in') ) {
                    offcanvasSelector.find('.tmpcoder-offcanvas-content').removeClass('tmpcoder-offcanvas-fade-in').addClass('tmpcoder-offcanvas-fade-out');
                } else {
                    offcanvasSelector.find('.tmpcoder-offcanvas-content').removeClass('tmpcoder-offcanvas-fade-out').addClass('tmpcoder-offcanvas-fade-in');
                }
            }

            $(window).trigger('resize');
        }

        function closeOffcanvas(offcanvasSelector) {
            if ( !$scope.hasClass('tmpcoder-offcanvas-entrance-type-push') && !$scope.find('.tmpcoder-offcanvas-content').hasClass('tmpcoder-offcanvas-content-relative') ) {
                $('body').removeClass('tmpcoder-offcanvas-body-overflow');
            }
            if ( $scope.hasClass('tmpcoder-offcanvas-entrance-animation-slide') ) {
                offcanvasSelector.find('.tmpcoder-offcanvas-content').removeClass('tmpcoder-offcanvas-slide-in').addClass('tmpcoder-offcanvas-slide-out');
            } else if ( $scope.hasClass('tmpcoder-offcanvas-entrance-animation-grow') ) {
                offcanvasSelector.find('.tmpcoder-offcanvas-content').removeClass('tmpcoder-offcanvas-grow-in').addClass('tmpcoder-offcanvas-grow-out');
            } else if ( $scope.hasClass('tmpcoder-offcanvas-entrance-animation-fade') ) {
                offcanvasSelector.find('.tmpcoder-offcanvas-content').removeClass('tmpcoder-offcanvas-fade-in').addClass('tmpcoder-offcanvas-fade-out');
            }

            offcanvasSelector.fadeOut(animationDuration);
            offcanvasSelector.removeClass('tmpcoder-offcanvas-wrap-active');
            // setTimeout(function() {
            // }, 600);
        }

        if ( $scope.hasClass('tmpcoder-offcanvas-entrance-type-push') ) {    

            function growBodyWidth() {

                if ($('.tmpcoder-offcanvas-body-inner-wrap-'+ $scope.data('id')).length < 1 ) {
                    var offcanvasWrap = $('.tmpcoder-offcanvas-wrap-'+ $scope.data('id')).clone();
                    $('.tmpcoder-offcanvas-wrap-'+ $scope.data('id')).remove();

                    if ( !($('.tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id')).length > 0) ) {
                        $("body").wrapInner('<div class="tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id') + '" />');
                    }

                    bodyInnerWrap = $('.tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id'));
    
                    bodyInnerWrap.css('position', 'relative');
    
                    if ( !(bodyInnerWrap.prev('.tmpcoder-offcanvas-wrap').length > 0) ) {
                        console.log(offcanvasWrap);
                        document.querySelector('body').insertBefore(offcanvasWrap[0], document.querySelector('.tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id')));
                    }

                    offcanvasSelector = $('.tmpcoder-offcanvas-wrap-'+ $scope.data('id'));
                }

                openOffcanvas(offcanvasSelector);

                $('body').addClass('tmpcoder-offcanvas-body-overflow');

                if ( offcanvasSelector.find('.tmpcoder-offcanvas-content').hasClass('tmpcoder-offcanvas-content-left') ) {
                    // bodyInnerWrap.animate({'margin-left': offcanvasSelector.find('.tmpcoder-offcanvas-content').width() + 'px'}, 'slow');
                    bodyInnerWrap.css({
                        'transition-duration': offcanvasSelector.find('.tmpcoder-offcanvas-content').css('animation-duration'),
                        'transform': 'translateX('+ offcanvasSelector.find('.tmpcoder-offcanvas-content').outerWidth() +'px)',
                    });
                } else if ( offcanvasSelector.find('.tmpcoder-offcanvas-content').hasClass('tmpcoder-offcanvas-content-right') ) {
                    // bodyInnerWrap.animate({'margin-right': offcanvasSelector.find('.tmpcoder-offcanvas-content').width() + 'px'}, 'slow');
                    bodyInnerWrap.css({
                        'transition-duration': offcanvasSelector.find('.tmpcoder-offcanvas-content').css('animation-duration'),
                        'transform': 'translateX(-'+ offcanvasSelector.find('.tmpcoder-offcanvas-content').outerWidth() +'px)',
                    });
                } else if ( offcanvasSelector.find('.tmpcoder-offcanvas-content').hasClass('tmpcoder-offcanvas-content-top') ) {
                    // bodyInnerWrap.animate({'margin-top': offcanvasSelector.find('.tmpcoder-offcanvas-content').outerHeight() + 'px'}, 'slow');
                    bodyInnerWrap.css({
                        'transition-duration': offcanvasSelector.find('.tmpcoder-offcanvas-content').css('animation-duration'),
                        'margin-top': offcanvasSelector.find('.tmpcoder-offcanvas-content').outerHeight() + 'px',
                    });
                }
            }

            function reduceBodyWidth() {
                
                if ( !bodyInnerWrap && !offcanvasSelector )  {
                    bodyInnerWrap = $('.tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id'));
                    offcanvasSelector = $('.tmpcoder-offcanvas-wrap-'+ $scope.data('id'));
                }

                closeOffcanvas(offcanvasSelector);

                if ( offcanvasSelector.find('.tmpcoder-offcanvas-content').hasClass('tmpcoder-offcanvas-content-left') ) {
                    // bodyInnerWrap.animate({'margin-left': 0}, 'slow');
                    bodyInnerWrap.css({'transform': 'translateX(0px)'});
                } else if ( offcanvasSelector.find('.tmpcoder-offcanvas-content').hasClass('tmpcoder-offcanvas-content-right') ) {
                    // bodyInnerWrap.animate({'margin-right': 0}, 'slow');
                    bodyInnerWrap.css({'transform': 'translateX(0px)'});
                } else if ( offcanvasSelector.find('.tmpcoder-offcanvas-content').hasClass('tmpcoder-offcanvas-content-top') ) {
                    // bodyInnerWrap.animate({'margin-top': 0}, 'slow');
                    bodyInnerWrap.css({'margin-top': 0});
                }

                $('body').removeClass('tmpcoder-offcanvas-body-overflow');
                setTimeout(function() {
                    var cnt = $('.tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id')).contents();
                    $('.tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id')).replaceWith(cnt);
                }, 1000);
            }

            function closeTriggers() {
                offcanvasSelector.on('click', function(e){
                    if ( !e.target.classList.value.includes('tmpcoder-offcanvas-content') && !e.target.closest('.tmpcoder-offcanvas-content') ) {
                        reduceBodyWidth();
                    }
                });
                
                $(document).on('keyup', function(event) {
                    if (event.key == "Escape") {
                        reduceBodyWidth();
                    }
                });
    
                offcanvasSelector.find('.tmpcoder-close-offcanvas').on('click', function() {
                    reduceBodyWidth();
                });
            }

            if ( !($('.tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id')).length > 0) ) {
                $("body").wrapInner('<div class="tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id') + '" />');
            }

            var bodyInnerWrap = $('.tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id'));

            bodyInnerWrap.css('position', 'relative');

            if ( !(bodyInnerWrap.prev('.tmpcoder-offcanvas-wrap').length > 0) ) {
                $scope.find('.tmpcoder-offcanvas-wrap').addClass('tmpcoder-offcanvas-wrap-'+ $scope.data('id'));

                document.querySelector('body').insertBefore($scope.find('.tmpcoder-offcanvas-wrap')[0], document.querySelector('.tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id')));
            }

            var offcanvasSelector = $('.tmpcoder-offcanvas-wrap-'+ $scope.data('id'));

            $scope.find('.tmpcoder-offcanvas-trigger').on('click', function() {
                if ( $('.tmpcoder-offcanvas-wrap-'+ $scope.data('id')).length > 0 && $scope.find('.tmpcoder-offcanvas-wrap').length > 0 ) {
                    $('.tmpcoder-offcanvas-wrap-'+ $scope.data('id')).remove();
                    $scope.find('.tmpcoder-offcanvas-wrap').addClass('tmpcoder-offcanvas-wrap-'+ $scope.data('id'));
                    document.querySelector('body').insertBefore($scope.find('.tmpcoder-offcanvas-wrap')[0], document.querySelector('.tmpcoder-offcanvas-body-inner-wrap-' + $scope.data('id')));
                    offcanvasSelector = $('.tmpcoder-offcanvas-wrap-'+ $scope.data('id'));
                }

                if (offcanvasSelector.hasClass('tmpcoder-offcanvas-wrap-active')) {
                    reduceBodyWidth();
                } else {
                    growBodyWidth();
                }
            });

            if ( 'yes' === $scope.find('.tmpcoder-offcanvas-container').data('offcanvas-open') ) {
                $scope.find('.tmpcoder-offcanvas-trigger').trigger('click');
            }

            closeTriggers();
            
            $('body').on('click', function() {
                closeTriggers();
            });

            var mutationObserver = new MutationObserver(function(mutations) {
                closeTriggers();
            });

            mutationObserver.observe($scope[0], {
                childList: true,
                subtree: true,
            });
        } else {

            $scope.find('.tmpcoder-offcanvas-trigger').on('click', function() {
                if ( !$scope.find('.tmpcoder-offcanvas-wrap').hasClass('tmpcoder-offcanvas-wrap-active') ) {
                    openOffcanvas($scope.find('.tmpcoder-offcanvas-wrap'));
                } else if ( $scope.find('.tmpcoder-offcanvas-wrap').hasClass('tmpcoder-offcanvas-wrap-active') && $scope.find('.tmpcoder-offcanvas-wrap').hasClass('tmpcoder-offcanvas-wrap-relative') ) {
                    closeOffcanvas($scope.find('.tmpcoder-offcanvas-wrap'));
                }
            });

            $scope.find('.tmpcoder-offcanvas-wrap').on('click', function(e){
                if ( !e.target.classList.value.includes('tmpcoder-offcanvas-content') && !e.target.closest('.tmpcoder-offcanvas-content') ) {
                    closeOffcanvas($scope.find('.tmpcoder-offcanvas-wrap'));
                }
            });

            if ( 'yes' === $scope.find('.tmpcoder-offcanvas-container').data('offcanvas-open') ) {
                $scope.find('.tmpcoder-offcanvas-trigger').trigger('click');
            }
            
            $(document).on('keyup', function(event) {
                if (event.key == "Escape") {
                    closeOffcanvas($scope.find('.tmpcoder-offcanvas-wrap'));
                }
            });

            $scope.find('.tmpcoder-close-offcanvas').on('click', function() {
                closeOffcanvas($scope.find('.tmpcoder-offcanvas-wrap'));
            });
        }
    }

    const widgetOnepageNav = function( $scope, $ ) {
        
        $(document).ready(function(){
            // Get all the links with the class "nav-link"
            var $navLinks = $scope.find( '.tmpcoder-onepage-nav-item' ),
                scrollSpeed = parseInt( $scope.find('.tmpcoder-onepage-nav').attr( 'data-speed' ), 10 ),
                // sections = $( '.elementor-section' );
                getSections = [];
                $navLinks.each(function() {
                    getSections.push($($(this).find('a').attr('href')));
                });

                var sections = $(getSections);

            var currentUrl = TmpcodersanitizeURL(window.location.href);
            var sectionId = currentUrl.split("#")[1];
            
            // Check if the URL contains a section id
            if(sectionId) {
                // Get the section element
                var $section = $("#" + sectionId);
            
                // Get the offset position of the section
                var sectionPos = $section.offset().top;
            
                // Smoothly scroll to the section
                $('html, body').animate({
                scrollTop: sectionPos
                }, scrollSpeed);
            }

            $navLinks.each(function() {
                if(currentUrl.indexOf($(this).find('a').attr('href')) !== -1){
                    $(this).addClass('tmpcoder-onepage-active-item');
                }
            });
        
            // Iterate over each link
            $navLinks.each(function() {
                // Add a click event to each link
                $(this).click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    // Remove the active class from all links
                    $navLinks.removeClass('tmpcoder-onepage-active-item');
                    // Add the active class to the clicked link
                    $(this).addClass('tmpcoder-onepage-active-item');
                    // Get the id of the section the link points to
                    var sectionId = $(this).find('a').attr('href');
                    // Get the section element
                    var $section = $(sectionId);
                    // Get the offset position of the section
                    var sectionPos = $section.offset().top;
                    // Smoothly scroll to the section
                    $('html, body').animate({
                        scrollTop: sectionPos
                    }, scrollSpeed);
                });
            });
        
            $(window).on("scroll", function(event) {
                event.preventDefaut();
                event.stopPropagation();
                // Get the current scroll position
                var scrollPos = $(this).scrollTop();

                if ( !$.isEmptyObject(sections) ) {
                    // Iterate over each section
                    sections.each(function() {
                        if ( $(this).length > 0 ) {
                            // Get the offset position of the section
                            var sectionPos = $(this).offset().top;
                            // Get the height of the section
                            var sectionHeight = sectionPos + $(this).outerHeight();
                        
                            // Check if the section is in view
                            if (scrollPos >= sectionPos - 50 && scrollPos < sectionPos + sectionHeight - 50) {
                            // if ( scrollPos >= sectionPos && scrollPos < sectionPos + sectionHeight ) {
                                // Get the id of the section
                                var sectionId = "#" + $(this).attr("id");
                        
                                // Remove the active class from all links
                                $navLinks.removeClass("tmpcoder-onepage-active-item");
                        
                                // Add the active class to the corresponding link
                                $navLinks.filter(function(){
                                    return $(this).find('a[href=' + sectionId + ']').length;
                                }).addClass("tmpcoder-onepage-active-item");
                            }
                        }
                    });
                }
            });
        });

    } 
    // End OnepageNav

    const widgetBackToTop = function($scope,$) {

        var sttBtn = $scope.find( '.tmpcoder-stt-btn' ),
            settings = sttBtn.attr('data-settings');
        
        // Get Settings 
        settings = JSON.parse(settings);

        if ( settings.fixed === 'fixed' ) {

            if ( 'none' !== settings.animation ) {
                sttBtn.css({
                    'opacity' : '0'
                });

                if ( settings.animation ==='slide' ) {
                    sttBtn.css({
                        'margin-bottom': '-100px',
                    });
                }
            }

            // Run on Load
            scrollToTop($(window).scrollTop(), sttBtn, settings);

            // Run on Scroll
            $(window).scroll(function() {
                scrollToTop($(this).scrollTop(), sttBtn, settings);
            });
        } // end fixed check
         
        // Click to Scroll Top
        sttBtn.on('click', function() {
            $('html, body').animate({ scrollTop : 0}, settings.scrolAnim );
            return false;
        });

        function scrollToTop( scrollTop, button, settings ) {
            // Show
            if ( scrollTop > settings.animationOffset ) {
                
                if ( 'fade' === settings.animation ) {
                    sttBtn.stop().css('visibility', 'visible').animate({
                        'opacity' : '1'
                    }, settings.animationDuration);
                } else if ( 'slide' === settings.animation ){
                    sttBtn.stop().css('visibility', 'visible').animate({
                        'opacity' : '1',
                        'margin-bottom' : 0
                    }, settings.animationDuration);
                } else {
                    sttBtn.css('visibility', 'visible');
                }

            // Hide
            } else {

                if ( 'fade' === settings.animation ) {
                    sttBtn.stop().animate({'opacity': '0'}, settings.animationDuration);
                } else if (settings.animation === 'slide') {
                    sttBtn.stop().animate({
                        'margin-bottom' : '-100px',
                        'opacity' : '0'
                    }, settings.animationDuration);
                } else {
                    sttBtn.css('visibility', 'hidden');
                }

            }
        }
    }

    /* -------- Countdown Timer ------- */

    const Countdown = function($scope,$){

        var countDownWrap = $scope.children( '.elementor-widget-container' ).children( '.tmpcoder-countdown-wrap' ),
            countDownInterval = null,
            dataInterval = countDownWrap.data( 'interval' ),
            dataShowAgain = countDownWrap.data( 'show-again' ),
            endTime = new Date( dataInterval * 1000);

        // Evergreen End Time
        if ( 'evergreen' === countDownWrap.data( 'type' ) ) {
            var evergreenDate = new Date(),
                widgetID = $scope.attr( 'data-id' ),
                settings = JSON.parse( localStorage.getItem( 'TmpcoderCountDownSettings') ) || {};

            // End Time
            if ( settings.hasOwnProperty( widgetID ) ) {
                if ( Object.keys(settings).length === 0 || dataInterval !== settings[widgetID].interval ) {
                    endTime = evergreenDate.setSeconds( evergreenDate.getSeconds() + dataInterval );
                } else {
                    endTime = settings[widgetID].endTime;
                }
            } else {
                endTime = evergreenDate.setSeconds( evergreenDate.getSeconds() + dataInterval );
            }

            if ( endTime + dataShowAgain < evergreenDate.setSeconds( evergreenDate.getSeconds() ) ) {
                endTime = evergreenDate.setSeconds( evergreenDate.getSeconds() + dataInterval );
            }

            // Settings
            settings[widgetID] = {
                interval: dataInterval,
                endTime: endTime
            };

            // Save Settings in Browser
            localStorage.setItem( 'TmpcoderCountDownSettings', JSON.stringify( settings ) );
        }

        // Start CountDown
        if ( ! editorCheck() ) { //tmp
        }
        // Init on Load
        initCountDown();

        // Start CountDown
        countDownInterval = setInterval( initCountDown, 1000 );

        function initCountDown() {
            var timeLeft = endTime - new Date();

            var numbers = {
                days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
                hours: Math.floor(timeLeft / (1000 * 60 * 60) % 24),
                minutes: Math.floor(timeLeft / 1000 / 60 % 60),
                seconds: Math.floor(timeLeft / 1000 % 60)
            };

            if ( numbers.days < 0 || numbers.hours < 0 || numbers.minutes < 0 ) {
                numbers = {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                };
            }

            $scope.find( '.tmpcoder-countdown-number' ).each(function() {
                var number = numbers[ $(this).attr( 'data-item' ) ];

                if ( 1 === number.toString().length ) {
                    number = '0' + number;
                }

                $(this).text( number );

                // Labels
                var labels = $(this).next();

                if ( labels.length ) {
                    if ( ! $(this).hasClass( 'tmpcoder-countdown-seconds' ) ) {
                        var labelText = labels.data( 'text' );

                        if ( '01' == number ) {
                            labels.text( labelText.singular );
                        } else {
                            labels.text( labelText.plural );
                        }
                    }
                }
            });

            // Stop Counting
            if ( timeLeft < 0 ) {
                clearInterval( countDownInterval );

                // Actions
                expiredActions();
            }
        }

        function expiredActions() {
            var dataActions = countDownWrap.data( 'actions' );

            if ( ! editorCheck() ) {
                
                if ( dataActions.hasOwnProperty( 'hide-timer' ) ) {
                    countDownWrap.hide();
                }
                
                if ( dataActions.hasOwnProperty( 'hide-element' ) ) {
                    $( dataActions['hide-element'] ).hide();
                }
                
                if ( dataActions.hasOwnProperty( 'message' ) ) {
                    if ( ! $scope.children( '.elementor-widget-container' ).children( '.tmpcoder-countdown-message' ).length ) {
                        countDownWrap.after( '<div class="tmpcoder-countdown-message">'+ dataActions['message'] +'</div>' );
                    }
                }
                
                if ( dataActions.hasOwnProperty( 'redirect' ) ) {
                    window.location.href = TmpcodersanitizeURL(dataActions['redirect']);
                }

                if ( dataActions.hasOwnProperty( 'load-template' ) ) {
                    countDownWrap.next('.elementor').show();
                }
            }
        }
    }

    /* -------- Countdown Timer End ------- */

    function editorCheck(){
        return jQuery( 'body' ).hasClass( 'elementor-editor-active' ) ? true : false;
    }

    /* Post Grid Widget Js Start */

    const widgetPostGrid = function( $scope , $ ){
        var iGrid = $scope.find( '.tmpcoder-grid' );
        var loadedItems;

        if ( ! iGrid.length ) {
            return;
        }

        if ( $scope.find('.woocommerce-result-count').length ) {
            var resultCountText = $scope.find('.woocommerce-result-count').text();
            resultCountText = resultCountText.replace( /\d\u2013\d+/, '1\u2013' + $scope.find('.tmpcoder-grid-item').length );

            $scope.find('.woocommerce-result-count').text(resultCountText);
        }

        // Settings
        var settings = iGrid.attr( 'data-settings' );

        if ( $scope.find(".tmpcoder-grid-orderby form").length ) {
            var select = $scope.find(".tmpcoder-grid-orderby form");
            $scope.find(".orderby").on("change", function () {
                select.trigger("submit");
            });
        }

        // Grid
        if ( typeof settings !== typeof undefined && settings !== false ) {
            settings = JSON.parse( iGrid.attr( 'data-settings' ) );

            // Init Functions
            isotopeLayout( settings );
            setTimeout(function() {
                isotopeLayout( settings );
            }, 100 );

            if ( editorCheck() ) {
                setTimeout(function() {
                    isotopeLayout( settings );
                }, 500 );
                setTimeout(function() {
                    isotopeLayout( settings );
                }, 1000 );
            }

            $( window ).on( 'load', function() {
                setTimeout(function() {
                    isotopeLayout( settings );
                }, 100 );
            });

            $(document).ready(function() {
                setTimeout(function() {
                    isotopeLayout( settings );
                }, 100 );
            });

            $(window).smartresize(function(){
                setTimeout(function() {
                    isotopeLayout( settings );
                }, 200 );
            });

            isotopeFilters( settings );

            var initialItems = 0;

            // Filtering Transitions
            iGrid.on( 'arrangeComplete', function( event, filteredItems ) {
                var deepLinkStager = 0,
                    filterStager = 0,
                    initStager = 0,
                    duration = settings.animation_duration,
                    filterDuration = settings.filters_animation_duration;

                if ( iGrid.hasClass( 'grid-images-loaded' ) ) {
                    initStager = 0;
                } else {
                    iGrid.css( 'opacity', '1' );

                    // Default Animation
                    if ( 'default' === settings.animation && 'default' === settings.filters_animation ) {
                        return;
                    }
                }

                for ( var key in filteredItems ) {
                    if ( initialItems == 0 || key > initialItems - 1 ) {
                        initStager += settings.animation_delay;
                        $scope.find( filteredItems[key]['element'] ).find( '.tmpcoder-grid-item-inner' ).css({
                            'opacity' : '1',
                            'top' : '0',
                            'transform' : 'scale(1)',
                            'transition' : 'all '+ duration +'s ease-in '+ initStager +'s',
                        });
                    }

                    filterStager += settings.filters_animation_delay;
                    if ( iGrid.hasClass( 'grid-images-loaded' ) ) {
                        $scope.find( filteredItems[key]['element'] ).find( '.tmpcoder-grid-item-inner' ).css({
                            'transition' : 'all '+ filterDuration +'s ease-in '+ filterStager +'s',
                        });
                    }

                    // DeepLinking
                    var deepLink = window.location.hash;

                    if ( deepLink.indexOf( '#filter:' ) >= 0 && deepLink.indexOf( '#filter:*' ) < 0 ) {
                        deepLink = deepLink.replace( '#filter:', '' );

                        $scope.find( filteredItems[key]['element'] ).filter(function() {
                            if ( $(this).hasClass( deepLink ) ) {
                                deepLinkStager += settings.filters_animation_delay;
                                return $(this);
                            }
                        }).find( '.tmpcoder-grid-item-inner' ).css({
                            'transition-delay' : deepLinkStager +'s'
                        });
                    }
                }

                initialItems = filteredItems.length;
            });

            // iGrid.imagesLoaded().progress( function( instance, image ) {
            // });

            // Grid Images Loaded
            iGrid.imagesLoaded(function() {
                if ( '1' !== iGrid.css( 'opacity' ) ) {
                    iGrid.css( 'opacity', '1' );
                }
                
                setTimeout(function() {
                    iGrid.addClass( 'grid-images-loaded' );
                }, 500 );

                // Equal Heights
                setEqualHeight(settings);
            });

            // Infinite Scroll / Load More
            if ( 'load-more' === settings.pagination_type || 'infinite-scroll' === settings.pagination_type ) {
                if ( $scope.find( '.tmpcoder-grid-pagination' ).length && ! editorCheck() ) {
                    var pagination = $scope.find( '.tmpcoder-grid-pagination' ),
                        scopeClass = '.elementor-element-'+ $scope.attr( 'data-id' );

                    var navClass = false,
                        threshold = false;

                    if ( 'infinite-scroll' === settings.pagination_type ) {
                        threshold = 300;
                        navClass = scopeClass +' .tmpcoder-load-more-btn';
                    }

                    iGrid.infiniteScroll({
                        path: scopeClass +' .tmpcoder-grid-pagination a',
                        hideNav: navClass,
                        append: false,
                        history: false,
                        scrollThreshold: threshold,
                        status: scopeClass +' .page-load-status',
                        onInit: function() {
                            this.on( 'load', function() {
                                iGrid.removeClass( 'grid-images-loaded' );
                            });
                        }
                    });

                    // Request
                    iGrid.on( 'request.infiniteScroll', function( event, path ) {
                        pagination.find( '.tmpcoder-load-more-btn' ).hide();
                        pagination.find( '.tmpcoder-pagination-loading' ).css( 'display', 'inline-block' );
                    });

                    // Load
                    var pagesLoaded = 0;

                    iGrid.on( 'load.infiniteScroll', function( event, response ) {
                        pagesLoaded++;

                        // get posts from response
                        var items = $( response ).find( scopeClass ).find( '.tmpcoder-grid-item' );

                        if ( $scope.find('.woocommerce-result-count').length ) {
                            var resultCount = $scope.find('.woocommerce-result-count').text();
                            var updatedResultCount = resultCount.replace( /\d\u2013\d+/, '1\u2013' + ( $scope.find('.tmpcoder-grid-item').length + items.length ) );
                            $scope.find('.woocommerce-result-count').text(updatedResultCount);
                        }
                        
                        iGrid.infiniteScroll( 'appendItems', items );
                        iGrid.isotope( 'appended', items );

                        items.imagesLoaded().progress( function( instance, image ) {
                            isotopeLayout( settings );

                            // Fix Layout
                            setTimeout(function() {
                                isotopeLayout( settings );
                                isotopeFilters( settings );
                            }, 10 );
                
                            setTimeout(function() {
                                iGrid.addClass( 'grid-images-loaded' );
                            }, 500 );
                        });

                        // Loading
                        pagination.find( '.tmpcoder-pagination-loading' ).hide();

                        if ( settings.pagination_max_pages - 1 !== pagesLoaded ) {
                            if ( 'load-more' === settings.pagination_type ) {
                                pagination.find( '.tmpcoder-load-more-btn' ).fadeIn();

                                if ( $scope.find('.tmpcoder-grid-filters').length ) {
                                    if ( '*' !== $scope.find('.tmpcoder-active-filter').attr('data-filter') ) {
                                        if ( 0 < $scope.find('.tmpcoder-active-filter').length ) {
                                            let dataFilterClass = $scope.find('.tmpcoder-active-filter').attr('data-filter').substring(1);
                                            items.each(function() {
                                                if ( !$(this).hasClass(dataFilterClass) ) {
                                                    loadedItems = false;
                                                } else {
                                                    loadedItems = true;
                                                    return false;
                                                }
                                            });
                
                                            if ( !loadedItems ) {
                                                $scope.find( '.tmpcoder-grid' ).infiniteScroll( 'loadNextPage' );
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            pagination.find( '.tmpcoder-pagination-finish' ).fadeIn( 1000 );
                            pagination.delay( 2000 ).fadeOut( 1000 );
                            setTimeout(function() {
                                pagination.find( '.tmpcoder-pagination-loading' ).hide();
                            }, 500 );
                        }

                        // Init Likes
                        // No need for this anymore
                        // setTimeout(function() {
                        //  postLikes( settings );
                        // }, 300 );

                        // Init Lightbox
                        lightboxPopup( settings );
                        VideoLightBoxWidget();

                        // Fix Lightbox
                        iGrid.data( 'lightGallery' ).destroy( true );
                        iGrid.lightGallery( settings.lightbox );

                        // Init Media Hover Link
                        mediaHoverLink();

                        // Init Post Sharing
                        postSharing();

                        lazyLoadObserver();

                        setTimeout(function() {
                            setEqualHeight(settings);
                            window.dispatchEvent(new Event('resize'));
                        }, 1500);
                        
                    });

                    pagination.find( '.tmpcoder-load-more-btn' ).on( 'click', function() {
                        iGrid.infiniteScroll( 'loadNextPage' );
                        return false;
                    });
                } else {
                    $scope.find( '.tmpcoder-load-more-btn' ).on( 'click', function() {
                        alert( 'Load More is Disabled in the Editor! Please Preview this Page to see it in action' );
                    });
                }
            }

        // Slider
        } else {
            iGrid.animate({ 'opacity': '1' }, 1000);

            settings = JSON.parse( iGrid.attr( 'data-slick' ) );

            var sliderClass = $scope.attr('class'),
                sliderColumnsDesktop = sliderClass.match(/tmpcoder-grid-slider-columns-\d/) ? +sliderClass.match(/tmpcoder-grid-slider-columns-\d/).join().slice(-1) : 2,
                sliderColumnsWideScreen = sliderClass.match(/columns--widescreen\d/) ? +sliderClass.match(/columns--widescreen\d/).join().slice(-1) : sliderColumnsDesktop,
                sliderColumnsLaptop = sliderClass.match(/columns--laptop\d/) ? +sliderClass.match(/columns--laptop\d/).join().slice(-1) : sliderColumnsDesktop,
                sliderColumnsTablet = sliderClass.match(/columns--tablet\d/) ? +sliderClass.match(/columns--tablet\d/).join().slice(-1) : 2,
                sliderColumnsTabletExtra = sliderClass.match(/columns--tablet_extra\d/) ? +sliderClass.match(/columns--tablet_extra\d/).join().slice(-1) : sliderColumnsTablet,
                sliderColumnsMobileExtra = sliderClass.match(/columns--mobile_extra\d/) ? +sliderClass.match(/columns--mobile_extra\d/).join().slice(-1) : sliderColumnsTablet,
                sliderColumnsMobile = sliderClass.match(/columns--mobile\d/) ? +sliderClass.match(/columns--mobile\d/).join().slice(-1) : 1,
                sliderRows = settings.sliderRows,
                sliderSlidesToScroll = settings.sliderSlidesToScroll;


            // GOGA - add rows control and vertical gutter maybe
            iGrid.slick({
                appendDots : $scope.find( '.tmpcoder-grid-slider-dots' ),
                rows: sliderRows,
                customPaging : function ( slider, i ) {
                    var slideNumber = (i + 1),
                        totalSlides = slider.slideCount;

                    return '<span class="tmpcoder-grid-slider-dot"></span>';
                },
                slidesToShow: sliderColumnsDesktop,
                responsive: [
                    {
                        breakpoint: 10000,
                        settings: {
                            slidesToShow: sliderColumnsWideScreen,
                            slidesToScroll: sliderSlidesToScroll > sliderColumnsWideScreen ? 1 : sliderSlidesToScroll
                        }
                    },
                    {
                        breakpoint: 2399,
                        settings: {
                            slidesToShow: sliderColumnsDesktop,
                            slidesToScroll: sliderSlidesToScroll > sliderColumnsDesktop ? 1 : sliderSlidesToScroll
                        }
                    },
                    {
                        breakpoint: 1221,
                        settings: {
                            slidesToShow: sliderColumnsLaptop,
                            slidesToScroll: sliderSlidesToScroll > sliderColumnsLaptop ? 1 : sliderSlidesToScroll
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: sliderColumnsTabletExtra,
                            slidesToScroll: sliderSlidesToScroll > sliderColumnsTabletExtra ? 1 : sliderSlidesToScroll
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: sliderColumnsTablet,
                            slidesToScroll: sliderSlidesToScroll > sliderColumnsTablet ? 1 : sliderSlidesToScroll
                        }
                    },
                    {
                        breakpoint: 880,
                        settings: {
                            slidesToShow: sliderColumnsMobileExtra,
                            slidesToScroll: sliderSlidesToScroll > sliderColumnsMobileExtra ? 1 : sliderSlidesToScroll
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: sliderColumnsMobile,
                            slidesToScroll: sliderSlidesToScroll > sliderColumnsMobile ? 1 : sliderSlidesToScroll
                        }
                    }
                ],
            });

            VideoLightBoxWidget();
            
            var gridNavPrevArrow = $scope.find('.tmpcoder-grid-slider-prev-arrow');
            var gridNavNextArrow = $scope.find('.tmpcoder-grid-slider-next-arrow');

            if ( gridNavPrevArrow.length > 0 && gridNavNextArrow.length > 0 ) {
                var positionSum = gridNavPrevArrow.position().left * -2;
                if ( positionSum > 0 ) {
                    $(window).on('load', function() {
                        if ( $(window).width() <= ($scope.outerWidth() + gridNavPrevArrow.outerWidth() + gridNavNextArrow.outerWidth() + positionSum) ) {
                            gridNavPrevArrow.addClass('tmpcoder-adjust-slider-prev-arrow');
                            gridNavNextArrow.addClass('tmpcoder-adjust-slider-next-arrow');
                        }
                    });

                    $(window).smartresize(function() {
                        if ( $(window).width() <= ($scope.outerWidth() + gridNavPrevArrow.outerWidth() + gridNavNextArrow.outerWidth() + positionSum) ) {
                            gridNavPrevArrow.addClass('tmpcoder-adjust-slider-prev-arrow');
                            gridNavNextArrow.addClass('tmpcoder-adjust-slider-next-arrow');
                        } else {
                            gridNavPrevArrow.removeClass('tmpcoder-adjust-slider-prev-arrow');
                            gridNavNextArrow.removeClass('tmpcoder-adjust-slider-next-arrow');
                        }
                    });
                }
            }

            // Adjust Horizontal Pagination
            if ( $scope.find( '.slick-dots' ).length && $scope.hasClass( 'tmpcoder-grid-slider-dots-horizontal') ) {
                // Calculate Width
                var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

                // on Load
                if ( $scope.find( '.slick-dots' ).length ) {
                    $scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
                }


                $(window).smartresize(function() {
                    setTimeout(function() {
                        // Calculate Width
                        var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

                        // Set Width
                        $scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
                    }, 300 );
                });
            }
        }

        checkWishlistAndCompare();
        addRemoveCompare();
        addRemoveWishlist();

        var mutationObserver = new MutationObserver(function(mutations) {
            // checkWishlistAndCompare();
            addRemoveCompare();
            addRemoveWishlist();
        });

        mutationObserver.observe($scope[0], {
            childList: true,
            subtree: true,
        });

        // Add To Cart AJAX
        if ( iGrid.find( '.tmpcoder-grid-item-add-to-cart' ).length ) {
            var addCartIcon = iGrid.find( '.tmpcoder-grid-item-add-to-cart' ).find( 'i' ),
                addCartIconClass = addCartIcon.attr( 'class' );

            if ( addCartIcon.length ) {
                addCartIconClass = addCartIconClass.substring( addCartIconClass.indexOf('fa-'), addCartIconClass.length );
            }

            $( 'body' ).on( 'adding_to_cart', function( ev, button, data ) {
                button.fadeTo( 'slow', 0 );
            });

            $( 'body' ).on( 'added_to_cart', function(ev, fragments, hash, button) {
                var product_id = button.data('product_id');

                button.next().fadeTo( 700, 1 );

                button.css('display', 'none');

                if ( 'sidebar' === button.data('atc-popup') ) {
                    if ( $('.tmpcoder-mini-cart-toggle-wrap a').length ) {
                        $('.tmpcoder-mini-cart-toggle-wrap a').each(function() {
                            if ( 'none' === $(this).closest('.tmpcoder-mini-cart-inner').find('.tmpcoder-mini-cart').css('display') ) {
                                $(this).trigger('click');
                            }
                        });
                    }
                } else if ( 'popup' === button.data('atc-popup') ) {
                    var popupItem = button.closest('.tmpcoder-grid-item'),
                        popupText = popupItem.find('.tmpcoder-grid-item-title').text(),
                        popupLink = button.next().attr('href'),
                        popupImageSrc = popupItem.find('.tmpcoder-grid-image-wrap').length ? popupItem.find('.tmpcoder-grid-image-wrap').data('src') : '',
                        popupAnimation = button.data('atc-animation'),
                        fadeOutIn = button.data('atc-fade-out-in'),
                        animTime = button.data('atc-animation-time'),
                        popupImage,
                        animationClass = 'tmpcoder-added-to-cart-default',
                        removeAnimationClass;

                    if ( 'slide-left' === popupAnimation ) {
                        animationClass = 'tmpcoder-added-to-cart-slide-in-left';
                        removeAnimationClass = 'tmpcoder-added-to-cart-slide-out-left';
                    } else if ( 'scale-up' === popupAnimation ) {
                        animationClass = 'tmpcoder-added-to-cart-scale-up';
                        removeAnimationClass = 'tmpcoder-added-to-cart-scale-down';
                    } else if ( 'skew' === popupAnimation ) {
                        animationClass = 'tmpcoder-added-to-cart-skew';
                        removeAnimationClass = 'tmpcoder-added-to-cart-skew-off';
                    } else if ( 'fade' === popupAnimation ) {
                        animationClass = 'tmpcoder-added-to-cart-fade';
                        removeAnimationClass = 'tmpcoder-added-to-cart-fade-out';
                    } else {
                        removeAnimationClass = 'tmpcoder-added-to-cart-popup-hide';
                    }

                    if ( '' !== popupImageSrc ) {
                        popupImage = '<div class="tmpcoder-added-tc-popup-img"><img src='+popupImageSrc+' alt="" /></div>';
                    } else {
                        popupImage = '';
                    }
                    
                    if ( !($scope.find('.tmpcoder-grid').find('#tmpcoder-added-to-cart-'+product_id).length > 0) ) {
                        $scope.find('.tmpcoder-grid').append('<div id="tmpcoder-added-to-cart-'+product_id+'" class="tmpcoder-added-to-cart-popup ' + animationClass + '">'+ popupImage +'<div class="tmpcoder-added-tc-title"><p>'+ popupText + ' ' + tmpcoder_plugin_script.addedToCartText +'</p><p><a href='+popupLink+'>'+ tmpcoder_plugin_script.viewCart +'</a></p></div></div>');

                        setTimeout(() => {
                            $(this).find('#tmpcoder-added-to-cart-'+product_id).addClass(removeAnimationClass);
                            setTimeout(() => {
                                $(this).find('#tmpcoder-added-to-cart-'+product_id).remove();
                            }, animTime * 1000);
                        }, fadeOutIn * 1000);
                    }
                }

                if ( addCartIcon.length ) {
                    button.find( 'i' ).removeClass( addCartIconClass ).addClass( 'fa-check' );
                    setTimeout(function() {
                        button.find( 'i' ).removeClass( 'fa-check' ).addClass( addCartIconClass );
                    }, 3500 );
                }
            });
        }

        // Init Post Sharing
        postSharing();

        // Post Sharing
        function postSharing() {
            if ( $scope.find( '.tmpcoder-sharing-trigger' ).length ) {
                var sharingTrigger = $scope.find( '.tmpcoder-sharing-trigger' ),
                    sharingInner = $scope.find( '.tmpcoder-post-sharing-inner' ),
                    sharingWidth = 5;

                // Calculate Width
                sharingInner.first().find( 'a' ).each(function() {
                    sharingWidth += $(this).outerWidth() + parseInt( $(this).css('margin-right'), 10 );
                });

                // Calculate Margin
                var sharingMargin = parseInt( sharingInner.find( 'a' ).css('margin-right'), 10 );

                // Set Positions
                if ( 'left' === sharingTrigger.attr( 'data-direction') ) {
                    // Set Width
                    sharingInner.css( 'width', sharingWidth +'px' );

                    // Set Position
                    sharingInner.css( 'left', - ( sharingMargin + sharingWidth ) +'px' );
                } else if ( 'right' === sharingTrigger.attr( 'data-direction') ) {
                    // Set Width
                    sharingInner.css( 'width', sharingWidth +'px' );

                    // Set Position
                    sharingInner.css( 'right', - ( sharingMargin + sharingWidth ) +'px' );
                } else if ( 'top' === sharingTrigger.attr( 'data-direction') ) {
                    // Set Margins
                    sharingInner.find( 'a' ).css({
                        'margin-right' : '0',
                        'margin-top' : sharingMargin +'px'
                    });

                    // Set Position
                    sharingInner.css({
                        'top' : -sharingMargin +'px',
                        'left' : '50%',
                        '-webkit-transform' : 'translate(-50%, -100%)',
                        'transform' : 'translate(-50%, -100%)'
                    });
                } else if ( 'right' === sharingTrigger.attr( 'data-direction') ) {
                    // Set Width
                    sharingInner.css( 'width', sharingWidth +'px' );

                    // Set Position
                    sharingInner.css({
                        'left' : sharingMargin +'px',
                        // 'bottom' : - ( sharingInner.outerHeight() + sharingTrigger.outerHeight() ) +'px',
                    });
                } else if ( 'bottom' === sharingTrigger.attr( 'data-direction') ) {
                    // Set Margins
                    sharingInner.find( 'a' ).css({
                        'margin-right' : '0',
                        'margin-bottom' : sharingMargin +'px'
                    });

                    // Set Position
                    sharingInner.css({
                        'bottom' : -sharingMargin +'px',
                        'left' : '50%',
                        '-webkit-transform' : 'translate(-50%, 100%)',
                        'transform' : 'translate(-50%, 100%)'
                    });
                }

                if ( 'click' === sharingTrigger.attr( 'data-action' ) ) {
                    sharingTrigger.on( 'click', function() {
                        var sharingInner = $(this).next();

                        if ( 'hidden' === sharingInner.css( 'visibility' ) ) {
                            sharingInner.css( 'visibility', 'visible' );
                            sharingInner.find( 'a' ).css({
                                'opacity' : '1',
                                'top' : '0'
                            });

                            setTimeout( function() {
                                sharingInner.find( 'a' ).addClass( 'tmpcoder-no-transition-delay' );
                            }, sharingInner.find( 'a' ).length * 100 );
                        } else {
                            sharingInner.find( 'a' ).removeClass( 'tmpcoder-no-transition-delay' );

                            sharingInner.find( 'a' ).css({
                                'opacity' : '0',
                                'top' : '-5px'
                            });
                            setTimeout( function() {
                                sharingInner.css( 'visibility', 'hidden' );
                            }, sharingInner.find( 'a' ).length * 100 );
                        }
                    });
                } else {
                    sharingTrigger.on( 'mouseenter', function() {
                        var sharingInner = $(this).next();

                        sharingInner.css( 'visibility', 'visible' );
                        sharingInner.find( 'a' ).css({
                            'opacity' : '1',
                            'top' : '0',
                        });
                        
                        setTimeout( function() {
                            sharingInner.find( 'a' ).addClass( 'tmpcoder-no-transition-delay' );
                        }, sharingInner.find( 'a' ).length * 100 );
                    });
                    $scope.find( '.tmpcoder-grid-item-sharing' ).on( 'mouseleave', function() {
                        var sharingInner = $(this).find( '.tmpcoder-post-sharing-inner' );

                        sharingInner.find( 'a' ).removeClass( 'tmpcoder-no-transition-delay' );

                        sharingInner.find( 'a' ).css({
                            'opacity' : '0',
                            'top' : '-5px'
                        });
                        setTimeout( function() {
                            sharingInner.css( 'visibility', 'hidden' );
                        }, sharingInner.find( 'a' ).length * 100 );
                    });
                }
            }               
        }

        // Init Media Hover Link
        mediaHoverLink();

        // Media Hover Link
        function mediaHoverLink() {
            // console.log(iGrid.find('.tmpcoder-grid-media-wrap').find('img').length);
            if ( 'yes' === $scope.find('.tmpcoder-grid-image-wrap').data('img-on-hover') ) {
                var img;
                var thisImgSrc;
                let secondaryImg;
                iGrid.find('.tmpcoder-grid-media-wrap').on('mouseover', function() {
                    // img = $(this).find( 'img' );
                    // thisImgSrc = img.attr('src');
                    
                    // secondaryImg = $(this).find('.tmpcoder-grid-image-wrap').data('src-secondary');
                    
                    // if ( isValidHttpUrl(secondaryImg) ) {
                    //  img.attr( 'src', secondaryImg );
                    // }
                    
                    if ( $(this).find('img:nth-of-type(2)').attr('src') !== undefined && $(this).find('img:nth-of-type(2)').attr('src') !== '' ) {
                        // $(this).find('img:first-of-type').fadeOut(0).addClass('tmpcoder-hidden-img');
                        // $(this).find('img:nth-of-type(2)').fadeIn(500).removeClass('tmpcoder-hidden-img');

                        if ($(this).closest('[data-widget_type="tmpcoder-post-grid.default"]'))
                        {
                            $(this).find('.grid-main-image').addClass('tmpcoder-hidden-img');
                            $(this).find('img:nth-of-type(2)').removeClass('tmpcoder-hidden-img');
                        }
                        else
                        {
                            $(this).find('img:first-of-type').addClass('tmpcoder-hidden-img');
                            $(this).find('img:nth-of-type(2)').removeClass('tmpcoder-hidden-img');
                        }
                    }
                });

                iGrid.find('.tmpcoder-grid-media-wrap').on('mouseleave', function() {
                    // if ( secondaryImg == img.attr('src') ) {
                    //  img.attr('src', thisImgSrc);
                    // }

                    if ( $(this).find('img:nth-of-type(2)').attr('src') !== undefined && $(this).find('img:nth-of-type(2)').attr('src') !== '' ) {
                        // $(this).find('img:nth-of-type(2)').fadeOut(0).addClass('tmpcoder-hidden-img');
                        // $(this).find('img:first-of-type').fadeIn(500).removeClass('tmpcoder-hidden-img');
                        $(this).find('img:nth-of-type(2)').addClass('tmpcoder-hidden-img');
                        $(this).find('img:first-of-type').removeClass('tmpcoder-hidden-img');
                    }
                });
            }
            
            function isValidHttpUrl(string) {
                let url;
                try {
                  url = new URL(string);
                } catch (_) {
                  return false;
                }
                return url.protocol === "http:" || url.protocol === "https:";
            }

            if ( 'yes' === iGrid.find( '.tmpcoder-grid-media-wrap' ).attr( 'data-overlay-link' ) && ! editorCheck() ) {
                iGrid.find( '.tmpcoder-grid-media-wrap' ).css('cursor', 'pointer');

                iGrid.find( '.tmpcoder-grid-media-wrap' ).on( 'click', function( event ) {
                    var targetClass = event.target.className;

                    if ( -1 !== targetClass.indexOf( 'inner-block' ) || -1 !== targetClass.indexOf( 'tmpcoder-cv-inner' ) || 
                         -1 !== targetClass.indexOf( 'tmpcoder-grid-media-hover' ) ) {
                        event.preventDefault();

                        var itemUrl = $(this).find( '.tmpcoder-grid-media-hover-bg' ).attr( 'data-url' ),
                            itemUrl = itemUrl.replace('#new_tab', '');
                            itemUrl = TmpcodersanitizeURL(itemUrl);

                        if ( '_blank' === iGrid.find( '.tmpcoder-grid-item-title a' ).attr('target') ) {
                            window.open(itemUrl, '_blank').focus();
                        } else {
                            window.location.href = itemUrl;
                        }
                    }
                });
            }               
        }

        // Init Lightbox
        if ( !$scope.hasClass('elementor-widget-tmpcoder-woo-category-grid-pro') && !$scope.hasClass('elementor-widget-tmpcoder-category-grid-pro') ) {
            lightboxPopup( settings );
        }

        // Lightbox Popup
        function lightboxPopup( settings ) {
            if ( -1 === $scope.find( '.tmpcoder-grid-item-lightbox' ).length ) {
                return;
            }

            var lightbox = $scope.find( '.tmpcoder-grid-item-lightbox' ),
                lightboxOverlay = lightbox.find( '.tmpcoder-grid-lightbox-overlay' ).first();

            // Set Src Attributes
            lightbox.each(function() {
                var source = $(this).find('.inner-block > span').attr( 'data-src' ),
                    gridItem = $(this).closest( 'article' ).not('.slick-cloned');

                if ( ! iGrid.hasClass( 'tmpcoder-media-grid' ) ) {
                    gridItem.find( '.tmpcoder-grid-image-wrap' ).attr( 'data-src', source );
                }

                var dataSource = gridItem.find( '.tmpcoder-grid-image-wrap' ).attr( 'data-src' );

                if ( typeof dataSource !== typeof undefined && dataSource !== false ) {
                    if ( -1 === dataSource.indexOf( 'wp-content' ) ) {
                        gridItem.find( '.tmpcoder-grid-image-wrap' ).attr( 'data-iframe', 'true' );
                    }
                }
            });

            // Init Lightbox
            iGrid.lightGallery( settings.lightbox );

            // Fix LightGallery Thumbnails
            iGrid.on('onAfterOpen.lg',function() {
                if ( $('.lg-outer').find('.lg-thumb-item').length ) {
                    $('.lg-outer').find('.lg-thumb-item').each(function() {
                        var imgSrc = $(this).find('img').attr('src'),
                            newImgSrc = imgSrc,
                            extIndex = imgSrc.lastIndexOf('.'),
                            imgExt = imgSrc.slice(extIndex),
                            cropIndex = imgSrc.lastIndexOf('-'),
                            cropSize = /\d{3,}x\d{3,}/.test(imgSrc.substring(extIndex,cropIndex)) ? imgSrc.substring(extIndex,cropIndex) : false;
                        
                        if ( 42 <= imgSrc.substring(extIndex,cropIndex).length ) {
                            cropSize = '';
                        }

                        if ( cropSize !== '' ) {
                            if ( false !== cropSize ) {
                                newImgSrc = imgSrc.replace(cropSize, '-150x150');
                            } else {
                                newImgSrc = [imgSrc.slice(0, extIndex), '-150x150', imgSrc.slice(extIndex)].join('');
                            }
                        }

                        // Change SRC
                        $(this).find('img').attr('src', newImgSrc);
                    });
                }
            });

            // Show/Hide Controls
            $scope.find( '.tmpcoder-grid' ).on( 'onAferAppendSlide.lg, onAfterSlide.lg', function( event, prevIndex, index ) {
                var lightboxControls = $( '#lg-actual-size, #lg-zoom-in, #lg-zoom-out, #lg-download' ),
                    lightboxDownload = $( '#lg-download' ).attr( 'href' );

                if ( $( '#lg-download' ).length ) {
                    if ( -1 === lightboxDownload.indexOf( 'wp-content' ) ) {
                        lightboxControls.addClass( 'tmpcoder-hidden-element' );
                    } else {
                        lightboxControls.removeClass( 'tmpcoder-hidden-element' );
                    }
                }

                // Autoplay Button
                if ( '' === settings.lightbox.autoplay ) {
                    $( '.lg-autoplay-button' ).css({
                         'width' : '0',
                         'height' : '0',
                         'overflow' : 'hidden'
                    });
                }
            });

            // Overlay
            if ( lightboxOverlay.length ) {
                $scope.find( '.tmpcoder-grid-media-hover-bg' ).after( lightboxOverlay.remove() );

                $scope.find( '.tmpcoder-grid-lightbox-overlay' ).on( 'click', function() {
                    if ( ! editorCheck() ) {
                        $(this).closest( 'article' ).find( '.tmpcoder-grid-image-wrap' ).trigger( 'click' );
                    } else {
                        alert( 'Lightbox is Disabled in the Editor!' );
                    }
                });
            } else {
                lightbox.find( '.inner-block > span' ).on( 'click', function() {
                    if ( ! editorCheck() ) {
                        var imageWrap = $(this).closest( 'article' ).find( '.tmpcoder-grid-image-wrap' );
                            imageWrap.trigger( 'click' );
                    } else {
                        alert( 'Lightbox is Disabled in the Editor!' );
                    }
                });
            }
        }

        // Init Likes
        postLikes( settings );

        // Likes
        function postLikes( settings ) {
            if ( ! $scope.find( '.tmpcoder-post-like-button' ).length ) {
                return;
            }
            
            $scope.on('click', '.tmpcoder-post-like-button', function(e) {
                e.preventDefault();

                var current = $(this);

                if ( '' !== current.attr( 'data-post-id' ) ) {

                $.ajax({
                    type: 'POST',
                    url: current.attr( 'data-ajax' ),
                    data: {
                        action : 'tmpcoder_likes_init',
                        post_id : current.attr( 'data-post-id' ),
                        nonce : current.attr( 'data-nonce' )
                    },
                    beforeSend:function() {
                        current.fadeTo( 500, 0.5 );
                    },  
                    success: function( response ) {
                        // Get Icon
                        var iconClass = current.attr( 'data-icon' );

                        // Get Count
                        var countHTML = response.count;

                        if ( '' === countHTML.replace(/<\/?[^>]+(>|$)/g, "") ) {
                            countHTML = '<span class="tmpcoder-post-like-count">'+ current.attr( 'data-text' ) +'</span>';

                            if ( ! current.hasClass( 'tmpcoder-likes-zero' ) ) {
                                current.addClass( 'tmpcoder-likes-zero' );
                            }
                        } else {
                            current.removeClass( 'tmpcoder-likes-zero' );
                        }

                        // Update Icon
                        if ( current.hasClass( 'tmpcoder-already-liked' ) ) {
                            current.prop( 'title', 'Like' );
                            current.removeClass( 'tmpcoder-already-liked' );
                            current.html( '<i class="'+ iconClass.replace( 'fas', 'far' ) +'"></i>' + countHTML );
                        } else {
                            current.prop( 'title', 'Unlike' );
                            current.addClass( 'tmpcoder-already-liked' );
                            current.html( '<i class="'+ iconClass.replace( 'far', 'fas' ) +'"></i>' + countHTML );
                        }

                        current.fadeTo( 500, 1 );
                    }
                });

                }

                return false;
            });
        }

        // Isotope Layout
        function isotopeLayout( settings ) {
            var grid = $scope.find( '.tmpcoder-grid' ),
                item = grid.find( '.tmpcoder-grid-item' ),
                itemVisible = item.filter( ':visible' ),
                layout = settings.layout,
                defaultLayout = settings.layout,
                mediaAlign = settings.media_align,
                mediaWidth = settings.media_width,
                mediaDistance = settings.media_distance,
                columns = 3,
                columnsMobile = 1,
                columnsMobileExtra,
                columnsTablet = 2,
                columnsTabletExtra,
                columnsDesktop = parseInt(settings.columns_desktop, 10),
                columnsLaptop,
                columnsWideScreen,
                gutterHr = settings.gutter_hr,
                gutterVr = settings.gutter_vr,
                gutterHrMobile = settings.gutter_hr_mobile,
                gutterVrMobile = settings.gutter_vr_mobile,
                gutterHrMobileExtra = settings.gutter_hr_mobile_extra,
                gutterVrMobileExtra = settings.gutter_vr_mobile_extra,
                gutterHrTablet = settings.gutter_hr_tablet,
                gutterVrTablet = settings.gutter_vr_tablet,
                gutterHrTabletExtra = settings.gutter_hr_tablet_extra,
                gutterVrTabletExtra = settings.gutter_vr_tablet_extra,
                gutterHrWideScreen = settings.gutter_hr_widescreen,
                gutterVrWideScreen = settings.gutter_vr_widescreen,
                gutterHrLaptop = settings.gutter_hr_laptop,
                gutterVrLaptop = settings.gutter_vr_laptop,
                contWidth = grid.width() + gutterHr - 0.3,
                // viewportWidth = $( 'body' ).prop( 'clientWidth' ),
                viewportWidth = $(window).outerWidth(),
                defaultLayout,
                transDuration = 400;

            // Get Responsive Columns
            var prefixClass = $scope.attr('class'),
                prefixClass = prefixClass.split(' ');

            for ( var i=0; i < prefixClass.length - 1; i++ ) {

                if ( -1 !== prefixClass[i].search(/mobile\d/) ) {
                    columnsMobile = prefixClass[i].slice(-1);
                }

                if ( -1 !== prefixClass[i].search(/mobile_extra\d/) ) {
                    columnsMobileExtra = prefixClass[i].slice(-1);
                }

                if ( -1 !== prefixClass[i].search(/tablet\d/) ) {
                    columnsTablet = prefixClass[i].slice(-1);
                }

                if ( -1 !== prefixClass[i].search(/tablet_extra\d/) ) {
                    columnsTabletExtra = prefixClass[i].slice(-1);
                }

                if ( -1 !== prefixClass[i].search(/widescreen\d/) ) {
                    columnsWideScreen = prefixClass[i].slice(-1);
                }

                if ( -1 !== prefixClass[i].search(/laptop\d/) ) {
                    columnsLaptop = prefixClass[i].slice(-1);
                }
            }

            var MobileResp = +elementorFrontend.config.responsive.breakpoints.mobile.value;
            var MobileExtraResp = +elementorFrontend.config.responsive.breakpoints.mobile_extra.value;
            var TabletResp = +elementorFrontend.config.responsive.breakpoints.tablet.value;
            var TabletExtraResp = +elementorFrontend.config.responsive.breakpoints.tablet_extra.value;
            var LaptopResp = +elementorFrontend.config.responsive.breakpoints.laptop.value;
            var wideScreenResp = +elementorFrontend.config.responsive.breakpoints.widescreen.value;

            var activeBreakpoints = elementorFrontend.config.responsive.activeBreakpoints;

            // Mobile
            if ( MobileResp >= viewportWidth && activeBreakpoints.mobile != null ) {
                columns = columnsMobile;
                gutterHr = gutterHrMobile;
                gutterVr = gutterVrMobile;

            // Mobile Extra
            } else if ( MobileExtraResp >= viewportWidth && activeBreakpoints.mobile_extra != null ) {
                columns = (columnsMobileExtra) ? columnsMobileExtra : columnsTablet;
                gutterHr = gutterHrMobileExtra;
                gutterVr = gutterVrMobileExtra;

            // Tablet
            } else if ( TabletResp >= viewportWidth && activeBreakpoints.tablet != null ) {
                columns = columnsTablet;
                gutterHr = gutterHrTablet;
                gutterVr = gutterVrTablet;

            // Tablet Extra
            } else if ( TabletExtraResp >= viewportWidth && activeBreakpoints.tablet_extra != null ) {
                columns = (columnsTabletExtra) ? columnsTabletExtra : columnsTablet;
                gutterHr = gutterHrTabletExtra;
                gutterVr = gutterVrTabletExtra;

            // Laptop
            } else if ( LaptopResp >= viewportWidth && activeBreakpoints.laptop != null ) {
                columns = (columnsLaptop) ? columnsLaptop : columnsDesktop;
                gutterHr = gutterHrLaptop;
                gutterVr = gutterVrLaptop;

            // Desktop
            } else if ( wideScreenResp > viewportWidth ) {
                columns = columnsDesktop;
                gutterHr = settings.gutter_hr;
                gutterVr = settings.gutter_vr;
            }  else {
                columns = (columnsWideScreen) ? columnsWideScreen : columnsDesktop;
                gutterHr = gutterHrWideScreen;
                gutterVr = gutterVrWideScreen;
            }

            // Limit Columns for Higher Screens
            if ( columns > 8 ) {
                columns = 8;
            }

            if ( 'string' == typeof(columns) && -1 !== columns.indexOf('pro') ) {
                columns = 3;
            }

            contWidth = grid.width() + gutterHr - 0.3;

            // Calculate Item Width
            item.outerWidth( Math.floor( contWidth / columns - gutterHr ) );

            // Set Vertical Gutter
            item.css( 'margin-bottom', gutterVr +'px' );

            // Reset Vertical Gutter for 1 Column Layout
            if ( 1 === columns ) {
                item.last().css( 'margin-bottom', '0' );
            }

            // add last row & make all post equal height
            var maxTop = -1;
            itemVisible.each(function ( index ) {

                // define
                var thisHieght = $(this).outerHeight(),
                    thisTop = parseInt( $(this).css( 'top' ) , 10 );

                // determine last row
                if ( thisTop > maxTop ) {
                    maxTop = thisTop;
                }
                
            });

            if ( 'fitRows' === layout ) {
                itemVisible.each(function() {
                    if ( parseInt( $(this).css( 'top' ) ) === maxTop  ) {
                        $(this).addClass( 'rf-last-row' );
                    }
                });
            }

            // List Layout
            if ( 'list' === layout ) {
                var imageHeight = item.find( '.tmpcoder-grid-image-wrap' ).outerHeight();
                    item.find( '.tmpcoder-grid-item-below-content' ).css( 'min-height', imageHeight +'px' );

                if ( $( 'body' ).prop( 'clientWidth' ) < 480 ) {

                    item.find( '.tmpcoder-grid-media-wrap' ).css({
                        'float' : 'none',
                        'width' : '100%'
                    });

                    item.find( '.tmpcoder-grid-item-below-content' ).css({
                        'float' : 'none',
                        'width' : '100%',
                    });

                    item.find( '.tmpcoder-grid-image-wrap' ).css( 'padding', '0' );

                    item.find( '.tmpcoder-grid-item-below-content' ).css( 'min-height', '0' );

                    if ( 'zigzag' === mediaAlign ) {
                        item.find( '[class*="elementor-repeater-item"]' ).css( 'text-align', 'center' );
                    }

                } else {

                    if ( 'zigzag' !== mediaAlign ) {

                        item.find( '.tmpcoder-grid-media-wrap' ).css({
                            'float' : mediaAlign,
                            'width' : mediaWidth +'%'
                        });

                        var listGutter = 'left' === mediaAlign ? 'margin-right' : 'margin-left';
                            item.find( '.tmpcoder-grid-media-wrap' ).css( listGutter, mediaDistance +'px' );

                        item.find( '.tmpcoder-grid-item-below-content' ).css({
                            'float' : mediaAlign,
                            'width' : 'calc((100% - '+ mediaWidth +'%) - '+ mediaDistance +'px)',
                        });

                    // Zig-zag
                    } else {
                        // Even
                        item.filter(':even').find( '.tmpcoder-grid-media-wrap' ).css({
                            'float' : 'left',
                            'width' : mediaWidth +'%'
                        });
                        item.filter(':even').find( '.tmpcoder-grid-item-below-content' ).css({
                            'float' : 'left',
                            'width' : 'calc((100% - '+ mediaWidth +'%) - '+ mediaDistance +'px)',
                        });
                        item.filter(':even').find( '.tmpcoder-grid-media-wrap' ).css( 'margin-right', mediaDistance +'px' );

                        // Odd
                        item.filter(':odd').find( '.tmpcoder-grid-media-wrap' ).css({
                            'float' : 'right',
                            'width' : mediaWidth +'%'
                        });
                        item.filter(':odd').find( '.tmpcoder-grid-item-below-content' ).css({
                            'float' : 'right',
                            'width' : 'calc((100% - '+ mediaWidth +'%) - '+ mediaDistance +'px)',
                        });
                        item.filter(':odd').find( '.tmpcoder-grid-media-wrap' ).css( 'margin-left', mediaDistance +'px' );

                        // Fix Elements Align
                        if ( ! grid.hasClass( 'tmpcoder-grid-list-ready' ) ) {
                            item.each( function( index ) {
                                var element = $(this).find( '[class*="elementor-repeater-item"]' );

                                if ( index % 2 === 0 ) {
                                    element.each(function() {
                                        if ( ! $(this).hasClass( 'tmpcoder-grid-item-align-center' ) ) {
                                            if ( 'none' === $(this).css( 'float' ) ) {
                                                $(this).css( 'text-align', 'left' );
                                            } else {
                                                $(this).css( 'float', 'left' );
                                            }

                                            var inner = $(this).find( '.inner-block' );
                                        }
                                    });
                                } else {
                                    element.each(function( index ) {
                                        if ( ! $(this).hasClass( 'tmpcoder-grid-item-align-center' ) ) {
                                            if ( 'none' === $(this).css( 'float' ) ) {
                                                $(this).css( 'text-align', 'right' );
                                            } else {
                                                $(this).css( 'float', 'right' );
                                            }

                                            var inner = $(this).find( '.inner-block' );

                                            if ( '0px' !== inner.css( 'margin-left' ) ) {
                                                inner.css( 'margin-right', inner.css( 'margin-left' ) );
                                                inner.css( 'margin-left', '0' );
                                            }

                                            // First Item
                                            if ( 0 === index ) {
                                                if ( '0px' !== inner.css( 'margin-right' ) ) {
                                                    inner.css( 'margin-left', inner.css( 'margin-right' ) );
                                                    inner.css( 'margin-right', '0' );
                                                }
                                            }
                                        }
                                    });
                                }
                            });

                        }

                        setTimeout(function() {
                            if ( ! grid.hasClass( 'tmpcoder-grid-list-ready' ) ) {
                                grid.addClass( 'tmpcoder-grid-list-ready' );
                            }
                        }, 500 );
                    }

                }
            }

            // Set Layout
            defaultLayout = layout;
            if ( 'list' === layout ) {
                layout = 'fitRows';
            }

            // No Transition
            if ( 'default' !== settings.filters_animation ) {
                transDuration = 0;
            }

            // Run Isotope
            var iGrid = grid.isotope({
                layoutMode: layout,
                masonry: {
                    // columnWidth: contWidth / columns,
                    gutter: gutterHr
                },
                fitRows: {
                    // columnWidth: contWidth / columns,
                    gutter: gutterHr
                },
                transitionDuration: transDuration,
                    percentPosition: true
            });
        }

        // Set equal height to all grid-items
        function setEqualHeight( settings ) {
            let iGrid = $scope.find( '.tmpcoder-grid' ),
                items = iGrid.children('article'),
                columns = Math.floor(iGrid.outerWidth() / items.outerWidth());

            if ( 'fitRows' === settings.layout && columns > 1 ) {
                let maxHeight = Math.max.apply(null, items.map(function(item) {
                    return $(this).outerHeight();
                }));

                items.each(function() {
                    $(this).css('height', maxHeight + 'px');
                });
                
                if ( 'yes' === settings.stick_last_element_to_bottom ) {
                    $scope.addClass('tmpcoder-grid-last-element-yes');
                }
            }
        }

        function lazyLoadObserver() {
            setTimeout(function() {
                let lazyLoadObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if(entry.isIntersecting && entry.target.src.includes('icon-256x256')) {
                            setTimeout(function() {
                                entry.target.src = entry.target.parentElement.dataset.src;
                                entry.target.classList.toggle('tmpcoder-hidden-image');
                                $(window).trigger('resize');
                            }, 100);
                        }
                    });
                }, {});
                
                $scope.find('.tmpcoder-grid-image-wrap img:first-of-type, .tmpcoder-grid-video-wrap img:first-of-type').each(function() {
                    lazyLoadObserver.observe($(this)[0]);
                });
            }, 100);
        }

        lazyLoadObserver();

        // Isotope Filters
        function isotopeFilters( settings ) {

            // Count
            if ( 'yes' === settings.filters_count ) {
                $scope.find( '.tmpcoder-grid-filters a, .tmpcoder-grid-filters span' ).each(function() {
                    if ( '*' === $(this).attr( 'data-filter') ) {
                        $(this).find( 'sup' ).text( $scope.find( '.tmpcoder-grid-filters' ).next().find('article').length );
                    } else {
                        $(this).find( 'sup' ).text( $scope.find( $(this).attr( 'data-filter' ) ).length );
                    }
                });
            }

            // Return if Disabled
            if ( 'yes' === settings.filters_linkable ) {
                return;
            }

            // Deeplinking on Load
            if ( 'yes' === settings.deeplinking ) {
                var deepLink = window.location.hash.replace( '#filter:', '.' );

                if ( window.location.hash.match( '#filter:all' ) ) {
                    deepLink = '*';
                }

                var activeFilter = $scope.find( '.tmpcoder-grid-filters span[data-filter="'+ deepLink +'"]:not(.tmpcoder-back-filter)' ),
                    activeFilterWrap = activeFilter.parent();

                // Sub Filters
                if ( 'parent' === activeFilter.parent().attr( 'data-role' ) ) {
                    if ( activeFilterWrap.parent( 'ul' ).find( 'ul[data-parent="'+ deepLink +'"]').length ) {
                        activeFilterWrap.parent( 'ul' ).children( 'li' ).css( 'display', 'none' );
                        activeFilterWrap.siblings( 'ul[data-parent="'+ deepLink +'"]' ).css( 'display', 'block' );
                    }
                } else if ( 'sub' === activeFilter.parent().attr( 'data-role' ) ) {
                    activeFilterWrap.closest( '.tmpcoder-grid-filters' ).children( 'li' ).css( 'display', 'none' );
                    activeFilterWrap.parent( 'ul' ).css( 'display', 'inline-block' );
                }

                // Active Filter Class
                $scope.find( '.tmpcoder-grid-filters span' ).removeClass( 'tmpcoder-active-filter' );
                activeFilter.addClass( 'tmpcoder-active-filter' );

                $scope.find( '.tmpcoder-grid' ).isotope({ filter: deepLink });

                // Fix Lightbox
                if ( '*' !== deepLink ) {
                    settings.lightbox.selector = deepLink +' .tmpcoder-grid-image-wrap';
                } else {
                    settings.lightbox.selector = ' .tmpcoder-grid-image-wrap';
                }

                lightboxPopup( settings );
            }

            // Hide Empty Filters
            if ( 'yes' === settings.filters_hide_empty ) {
                $scope.find( '.tmpcoder-grid-filters span' ).each(function() {
                    var searchClass = $(this).attr( 'data-filter' );

                    if ( '*' !== searchClass ) {
                        if ( 0 === iGrid.find(searchClass).length ) {
                            $(this).parent( 'li' ).addClass( 'tmpcoder-hidden-element' );
                        } else {
                            $(this).parent( 'li' ).removeClass( 'tmpcoder-hidden-element' );
                        }
                    }
                });
            }

            // Set a Default Filter
            if ( !$scope.hasClass('elementor-widget-tmpcoder-woo-category-grid-pro') && !$scope.hasClass('elementor-widget-tmpcoder-category-grid-pro') ) {
                if ( '' !== settings.filters_default_filter ) {
                    setTimeout(function() {
                        $scope.find( '.tmpcoder-grid-filters' ).find('span[data-filter*="-'+ settings.filters_default_filter +'"]')[0].click();
                    }, 100)
                }
            }

            // Click Event
            $scope.find( '.tmpcoder-grid-filters span' ).on( 'click', function() {
                initialItems = 0;

                var filterClass = $(this).data( 'filter' ),
                    filterWrap = $(this).parent( 'li' ),
                    filterRole = filterWrap.attr( 'data-role' );

                // Active Filter Class
                $scope.find( '.tmpcoder-grid-filters span' ).removeClass( 'tmpcoder-active-filter' );
                $(this).addClass( 'tmpcoder-active-filter' );

                // Sub Filters
                if ( 'parent' === filterRole ) {
                    if ( filterWrap.parent( 'ul' ).find( 'ul[data-parent="'+ filterClass +'"]').length ) {
                        filterWrap.parent( 'ul' ).children( 'li' ).css( 'display', 'none' );
                        filterWrap.siblings( 'ul[data-parent="'+ filterClass +'"]' ).css( 'display', 'block' );
                    }
                } else if ( 'back' === filterRole ) {
                    filterWrap.closest( '.tmpcoder-grid-filters' ).children( 'li' ).css( 'display', 'inline-block' );
                    filterWrap.parent().css( 'display', 'none' );
                }

                // Deeplinking
                if ( 'yes' === settings.deeplinking ) {
                    var filterHash = '#filter:'+ filterClass.replace( '.', '' );

                    if ( '*' === filterClass ) {
                        filterHash = '#filter:all';
                    }

                    var url = window.location.pathname + window.location.search + filterHash;
                    url = TmpcodersanitizeURL(url);
                    window.location.href = url;
                }

                // Infinite Scroll
                if ( 'infinite-scroll' === settings.pagination_type ) {
                    if ( 0 === iGrid.find($(this).attr('data-filter')).length ) {
                        $scope.find( '.tmpcoder-grid' ).infiniteScroll( 'loadNextPage' );
                    }
                }

                // Load More
                if ( 'load-more' === settings.pagination_type ) {
                    if ( 0 === iGrid.find($(this).attr('data-filter')).length ) {
                        $scope.find( '.tmpcoder-grid' ).infiniteScroll( 'loadNextPage' );
                    }
                }

                // Filtering Animation
                if ( 'default' !== settings.filters_animation ) {
                    $scope.find( '.tmpcoder-grid-item-inner' ).css({
                        'opacity' : '0',
                        'transition' : 'none'
                    });
                }

                if ( 'fade-slide' === settings.filters_animation ) {
                    $scope.find( '.tmpcoder-grid-item-inner' ).css( 'top', '20px' );
                } else if ( 'zoom' === settings.filters_animation ) {
                    $scope.find( '.tmpcoder-grid-item-inner' ).css( 'transform', 'scale(0.01)' );
                } else {
                    $scope.find( '.tmpcoder-grid-item-inner' ).css({
                        'top' : '0',
                        'transform' : 'scale(1)'
                    });
                }

                // Filter Grid Items
                $scope.find( '.tmpcoder-grid' ).isotope({ filter: filterClass });

                // Fix Lightbox
                if ( '*' !== filterClass ) {
                    settings.lightbox.selector = filterClass +' .tmpcoder-grid-image-wrap';
                } else {
                    settings.lightbox.selector = ' .tmpcoder-grid-image-wrap';
                }

                // Destroy Lightbox
                iGrid.data('lightGallery').destroy( true );
                // Init Lightbox
                iGrid.lightGallery( settings.lightbox );
            });

        }

        function checkWishlistAndCompare() {
            var wishlistArray;
            
            if ( iGrid.find('.tmpcoder-wishlist-add').length ) {

                $.ajax({
                        url: tmpcoder_plugin_script.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'check_product_in_wishlist_grid',
                            nonce: tmpcoder_plugin_script.nonce,
                        },
                        success: function(response) {
                                wishlistArray = response;
                        }
                });
                
                
                iGrid.find('.tmpcoder-wishlist-add').each(function() {
                    var wishlistBtn = $(this);
                    
                    if ( $.inArray(wishlistBtn.data('product-id'), wishlistArray) !== -1 ) {
                        if ( !wishlistBtn.hasClass('tmpcoder-button-hidden') ) {
                            wishlistBtn.addClass('tmpcoder-button-hidden');
                        }

                        if ( wishlistBtn.next().hasClass('tmpcoder-button-hidden') ) {
                            wishlistBtn.next().removeClass('tmpcoder-button-hidden');
                        }
                    }
                });
            }

            if ( iGrid.find('.tmpcoder-compare-add').length > 0 ) {
                var compareArray = [];
                
                $.ajax({
                        url: tmpcoder_plugin_script.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'check_product_in_compare_grid',
                            nonce: tmpcoder_plugin_script.nonce,
                        },
                        success: function(response) {
                            compareArray = response;
                        },
                        error: function(error) {
                            console.log(error);
                        }
                });
            
                
                iGrid.find('.tmpcoder-compare-add').each(function() {
                    var compareBtn = $(this);
                    
                    if ( $.inArray(compareBtn.data('product-id'), compareArray) !== -1 ) {
                        if ( !compareBtn.hasClass('tmpcoder-button-hidden') ) {
                            compareBtn.addClass('tmpcoder-button-hidden');
                        }

                        if ( compareBtn.next().hasClass('tmpcoder-button-hidden') ) {
                            compareBtn.next().removeClass('tmpcoder-button-hidden');
                        }
                    }
                });
                
            }
        }

        function addRemoveCompare() {
            if ( iGrid.find('.tmpcoder-compare-add').length ) {
                $scope.find('.tmpcoder-compare-add').click(function(e) {
                    e.preventDefault();
                    var event_target = $(this);
                    var product_id = $(this).data('product-id');

                    event_target.fadeTo(500, 0);

                    $.ajax({
                        url: tmpcoder_plugin_script.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'add_to_compare',
                            product_id: product_id,
                            nonce: tmpcoder_plugin_script.nonce,
                        },
                        success: function() {
                            $scope.find('.tmpcoder-compare-add[data-product-id="' + product_id + '"]').hide();
                            $scope.find('.tmpcoder-compare-remove[data-product-id="' + product_id + '"]').show();
                            $scope.find('.tmpcoder-compare-remove[data-product-id="' + product_id + '"]').fadeTo(500, 1);
                            changeActionTargetProductId(product_id);
                            $(document).trigger('added_to_compare');

                            if ( 'sidebar' === event_target.data('atcompare-popup') ) {
                                // GOGA - configure after adding compare dropdown functinality
                                if ( $('.tmpcoder-compare-toggle-btn').length ) {
                                    $('.tmpcoder-compare-toggle-btn').each(function() {
                                        if ( 'none' === $(this).next('.tmpcoder-compare').css('display') ) {
                                            $(this).trigger('click');
                                        }
                                    });
                                }
                            } else if ( 'popup' === event_target.data('atcompare-popup') ) {
                                // Popup Link needs wishlist
                                var popupItem = event_target.closest('.tmpcoder-grid-item'),
                                    popupText = popupItem.find('.tmpcoder-grid-item-title').text(),
                                    popupLink = tmpcoder_plugin_script.comparePageURL,
                                    popupTarget = 'yes' == event_target.data('open-in-new-tab') ? '_blank' : '_self',
                                    popupImageSrc = popupItem.find('.tmpcoder-grid-image-wrap').length ? popupItem.find('.tmpcoder-grid-image-wrap').data('src') : '',
                                    popupAnimation = event_target.data('atcompare-animation'),
                                    fadeOutIn = event_target.data('atcompare-fade-out-in'),
                                    animTime = event_target.data('atcompare-animation-time'),
                                    popupImage,
                                    animationClass = 'tmpcoder-added-to-compare-default',
                                    removeAnimationClass;

                                if ( 'slide-left' === popupAnimation ) {
                                    animationClass = 'tmpcoder-added-to-compare-slide-in-left';
                                    removeAnimationClass = 'tmpcoder-added-to-compare-slide-out-left';
                                } else if ( 'scale-up' === popupAnimation ) {
                                    animationClass = 'tmpcoder-added-to-compare-scale-up';
                                    removeAnimationClass = 'tmpcoder-added-to-compare-scale-down';
                                } else if ( 'skew' === popupAnimation ) {
                                    animationClass = 'tmpcoder-added-to-compare-skew';
                                    removeAnimationClass = 'tmpcoder-added-to-compare-skew-off';
                                } else if ( 'fade' === popupAnimation ) {
                                    animationClass = 'tmpcoder-added-to-compare-fade';
                                    removeAnimationClass = 'tmpcoder-added-to-compare-fade-out';
                                } else {
                                    removeAnimationClass = 'tmpcoder-added-to-compare-popup-hide';
                                }

                                if ( '' !== popupImageSrc ) {
                                    popupImage = '<div class="tmpcoder-added-tcomp-popup-img"><img src='+popupImageSrc+' alt="" /></div>';
                                } else {
                                    popupImage = '';
                                }
                                
                                if ( !($scope.find('.tmpcoder-grid').find('#tmpcoder-added-to-comp-'+product_id).length > 0) ) {
                                    $scope.find('.tmpcoder-grid').append('<div id="tmpcoder-added-to-comp-'+product_id+'" class="tmpcoder-added-to-compare-popup ' + animationClass + '">'+ popupImage +'<div class="tmpcoder-added-tc-title"><p>'+ popupText +' was added to Compare</p><p><a target='+ popupTarget +' href='+popupLink+'>View Compare</a></p></div></div>');

                                    setTimeout(() => {
                                        $scope.find('#tmpcoder-added-to-comp-'+product_id).addClass(removeAnimationClass);
                                        setTimeout(() => {
                                            $scope.find('#tmpcoder-added-to-comp-'+product_id).remove();
                                        }, animTime * 1000);
                                    }, fadeOutIn * 1000);
                                }
                            }
                        },
                        error: function(response) {
                            var error_message = response.responseJSON.message;
                            // Display error message
                            alert(error_message);
                        }
                    });
                });

                $scope.find('.tmpcoder-compare-remove').click(function(e) {
                    e.preventDefault();
                    var product_id = $(this).data('product-id');
                    $(this).fadeTo(500, 0);

                    $.ajax({
                        url: tmpcoder_plugin_script.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'remove_from_compare',
                            nonce: tmpcoder_plugin_script.nonce,
                            product_id: product_id
                        },
                        success: function() {
                            $scope.find('.tmpcoder-compare-remove[data-product-id="' + product_id + '"]').hide();
                            $scope.find('.tmpcoder-compare-add[data-product-id="' + product_id + '"]').show();
                            $scope.find('.tmpcoder-compare-add[data-product-id="' + product_id + '"]').fadeTo(500, 1);
                             changeActionTargetProductId(product_id);
                            $(document).trigger('removed_from_compare');
                        }
                    });
                });

                $(document).on('removed_from_compare', function() {
                    $scope.find('.tmpcoder-compare-remove[data-product-id="' + actionTargetProductId + '"]').hide();
                    $scope.find('.tmpcoder-compare-add[data-product-id="' + actionTargetProductId + '"]').show();
                    $scope.find('.tmpcoder-compare-add[data-product-id="' + actionTargetProductId + '"]').fadeTo(500, 1);
                });

            }
        }

        function addRemoveWishlist() {
            let isPopupActive = false;
            if ( iGrid.find('.tmpcoder-wishlist-add').length ) {
                $scope.find('.tmpcoder-wishlist-add').click(function(e) {
                    e.preventDefault();
                    var event_target = $(this);
                    var product_id = $(this).data('product-id');

                    event_target.fadeTo(500, 0);

                    $.ajax({
                        url: tmpcoder_plugin_script.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'add_to_wishlist',
                            nonce: tmpcoder_plugin_script.nonce,
                            product_id: product_id
                        },
                        success: function() {
                            $scope.find('.tmpcoder-wishlist-add[data-product-id="' + product_id + '"]').hide();
                            $scope.find('.tmpcoder-wishlist-remove[data-product-id="' + product_id + '"]').show();
                            $scope.find('.tmpcoder-wishlist-remove[data-product-id="' + product_id + '"]').fadeTo(500, 1);
                             changeActionTargetProductId(product_id);
                            $(document).trigger('added_to_wishlist');

                            if ( 'sidebar' === event_target.data('atw-popup') ) {
                                // GOGA - configure after adding wishlist dropdown functinality
                                if ( $('.tmpcoder-wishlist-toggle-btn').length ) {
                                    $('.tmpcoder-wishlist-toggle-btn').each(function() {
                                        if ( 'none' === $(this).next('.tmpcoder-wishlist').css('display') ) {
                                            $(this).trigger('click');
                                        }
                                    });
                                }
                            } else if ( 'popup' === event_target.data('atw-popup') ) {
                                // Popup Link needs wishlist
                                var popupItem = event_target.closest('.tmpcoder-grid-item'),
                                    popupText = popupItem.find('.tmpcoder-grid-item-title').text(),
                                    popupLink = tmpcoder_plugin_script.wishlistPageURL,
                                    popupTarget = 'yes' == event_target.data('open-in-new-tab') ? '_blank' : '_self',
                                    popupImageSrc = popupItem.find('.tmpcoder-grid-image-wrap').length ? popupItem.find('.tmpcoder-grid-image-wrap').data('src') : '',
                                    popupAnimation = event_target.data('atw-animation'),
                                    fadeOutIn = event_target.data('atw-fade-out-in'),
                                    animTime = event_target.data('atw-animation-time'),
                                    popupImage,
                                    animationClass = 'tmpcoder-added-to-wishlist-default',
                                    removeAnimationClass;

                                if ( 'slide-left' === popupAnimation ) {
                                    animationClass = 'tmpcoder-added-to-wishlist-slide-in-left';
                                    removeAnimationClass = 'tmpcoder-added-to-wishlist-slide-out-left';
                                } else if ( 'scale-up' === popupAnimation ) {
                                    animationClass = 'tmpcoder-added-to-wishlist-scale-up';
                                    removeAnimationClass = 'tmpcoder-added-to-wishlist-scale-down';
                                } else if ( 'skew' === popupAnimation ) {
                                    animationClass = 'tmpcoder-added-to-wishlist-skew';
                                    removeAnimationClass = 'tmpcoder-added-to-wishlist-skew-off';
                                } else if ( 'fade' === popupAnimation ) {
                                    animationClass = 'tmpcoder-added-to-wishlist-fade';
                                    removeAnimationClass = 'tmpcoder-added-to-wishlist-fade-out';
                                } else {
                                    removeAnimationClass = 'tmpcoder-added-to-wishlist-popup-hide';
                                }

                                if ( '' !== popupImageSrc ) {
                                    popupImage = '<div class="tmpcoder-added-tw-popup-img"><img src='+popupImageSrc+' alt="" /></div>';
                                } else {
                                    popupImage = '';
                                }
                                if (!isPopupActive) {
                                    isPopupActive = true;
                                    
                                    if ( !($scope.find('.tmpcoder-grid').find('#tmpcoder-added-to-wish-'+product_id).length > 0) ) {
                                        $scope.find('.tmpcoder-grid').append('<div id="tmpcoder-added-to-wish-'+product_id+'" class="tmpcoder-added-to-wishlist-popup ' + animationClass + '">'+ popupImage +'<div class="tmpcoder-added-tw-title"><p>'+ popupText +' was added to Wishlist</p><p><a target="'+ popupTarget +'" href='+popupLink+'>View Wishlist</a></p></div></div>');
            
                                        setTimeout(() => {
                                            $scope.find('#tmpcoder-added-to-wish-'+product_id).addClass(removeAnimationClass);
                                            setTimeout(() => {
                                                $scope.find('#tmpcoder-added-to-wish-'+product_id).remove();
                                            }, animTime * 1000);
                                        }, fadeOutIn * 1000);
                                    }
                                }
                            }
                        },
                        error: function(response) {
                            var error_message = response.responseJSON.message;
                            // Display error message
                            alert(error_message);
                        }
                    });
                });

                $scope.find('.tmpcoder-wishlist-remove').on('click', function(e) {
                    e.preventDefault();
                    var product_id = $(this).data('product-id');

                    $(this).fadeTo(500, 0);

                    $.ajax({
                        url: tmpcoder_plugin_script.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'remove_from_wishlist',
                            nonce: tmpcoder_plugin_script.nonce,
                            product_id: product_id
                        },
                        success: function() {
                            $scope.find('.tmpcoder-wishlist-remove[data-product-id="' + product_id + '"]').hide();
                            $scope.find('.tmpcoder-wishlist-add[data-product-id="' + product_id + '"]').show();
                            $scope.find('.tmpcoder-wishlist-add[data-product-id="' + product_id + '"]').fadeTo(500, 1);
                             changeActionTargetProductId(product_id);
                            $(document).trigger('removed_from_wishlist');
                        }
                    });
                });

                $(document).on('removed_from_wishlist', function() {
                    $scope.find('.tmpcoder-wishlist-remove[data-product-id="' + actionTargetProductId + '"]').hide();
                    $scope.find('.tmpcoder-wishlist-add[data-product-id="' + actionTargetProductId + '"]').show();
                    $scope.find('.tmpcoder-wishlist-add[data-product-id="' + actionTargetProductId + '"]').fadeTo(500, 1);
                });

            }   
        }
    }
    
    /* Post Grid Widget Js End */

    /* Testimonial Carousel js start */
    
    const widgetTestimonialCarousel = function( $scope , $ ) {
        var testimonialCarousel = $scope.find( '.tmpcoder-testimonial-carousel' );
        var settings = JSON.parse( testimonialCarousel.attr( 'data-slick' ) );
        
        // Slider Columns
        var sliderClass = $scope.attr('class'),
            sliderColumnsDesktop = sliderClass.match(/tmpcoder-testimonial-slider-columns-\d/) ? +sliderClass.match(/tmpcoder-testimonial-slider-columns-\d/).join().slice(-1) : 2,
            sliderColumnsWideScreen = sliderClass.match(/columns--widescreen\d/) ? +sliderClass.match(/columns--widescreen\d/).join().slice(-1) : sliderColumnsDesktop,
            sliderColumnsLaptop = sliderClass.match(/columns--laptop\d/) ? +sliderClass.match(/columns--laptop\d/).join().slice(-1) : sliderColumnsDesktop,
            sliderColumnsTablet = sliderClass.match(/columns--tablet\d/) ? +sliderClass.match(/columns--tablet\d/).join().slice(-1) : 2,
            sliderColumnsTabletExtra = sliderClass.match(/columns--tablet_extra\d/) ? +sliderClass.match(/columns--tablet_extra\d/).join().slice(-1) : sliderColumnsTablet,
            sliderColumnsMobileExtra = sliderClass.match(/columns--mobile_extra\d/) ? +sliderClass.match(/columns--mobile_extra\d/).join().slice(-1) : sliderColumnsTablet,
            sliderColumnsMobile = sliderClass.match(/columns--mobile\d/) ? +sliderClass.match(/columns--mobile\d/).join().slice(-1) : 1,
            sliderSlidesToScroll = settings.sliderSlidesToScroll,
            dataSlideEffect = testimonialCarousel.attr('data-slide-effect');

        testimonialCarousel.slick({
            appendArrows: $scope.find('.tmpcoder-testimonial-controls'),
            appendDots: $scope.find('.tmpcoder-testimonial-dots'),
            customPaging: function (slider, i) {
                var slideNumber = (i + 1),
                    totalSlides = slider.slideCount;

                return '<span class="tmpcoder-testimonial-dot"></span>';
            },
            slidesToShow: sliderColumnsDesktop,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        slidesToShow: sliderColumnsWideScreen,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsWideScreen ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsWideScreen && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 2399,
                    settings: {
                        slidesToShow: sliderColumnsDesktop,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsDesktop ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsDesktop && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 1221,
                    settings: {
                        slidesToShow: sliderColumnsLaptop,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsLaptop ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsLaptop && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: sliderColumnsTabletExtra,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsTabletExtra ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsTabletExtra && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: sliderColumnsTablet,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsTablet ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsTablet && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 880,
                    settings: {
                        slidesToShow: sliderColumnsMobileExtra,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsMobileExtra ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsMobileExtra && 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: sliderColumnsMobile,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsMobile ? 1 : sliderSlidesToScroll,
                        fade: (1 == sliderColumnsMobile && 'fade' === dataSlideEffect) ? true : false
                    }
                }
            ],
        });

        // Show Arrows On Hover
        if ( $scope.hasClass( 'tmpcoder-testimonial-nav-fade' ) ) {
            $scope.on( 'mouseover', function() {
                $scope.closest( 'section' ).find( '.tmpcoder-testimonial-arrow' ).css({
                    'opacity' : 1,
                });
            } );
            $scope.closest( 'section' ).on( 'mouseout', function() {
                $scope.find( '.tmpcoder-testimonial-arrow' ).css({
                    'opacity' : 0,
                });
            } );
        }

        // on Load
        if ( $scope.find( '.slick-dots' ).length ) {
            // Calculate Width
            var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

            // Set Width
            $scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
        }

        $(window).smartresize(function() {
            setTimeout(function() {
                if ( $scope.find( '.slick-dots' ).length ) {
                    // Calculate Width
                    var dotsWrapWidth = $scope.find( '.slick-dots li' ).outerWidth() * $scope.find( '.slick-dots li' ).length - parseInt( $scope.find( '.slick-dots li span' ).css( 'margin-right' ), 10 );

                    // Set Width
                    $scope.find( '.slick-dots' ).css( 'width', dotsWrapWidth );
                }
            }, 300 );
        });
    }

    /* Testimonial Carousel js end */

    const widgetProgressBar = function( $scope, $ ){

        var $progressBar = $scope.find( '.tmpcoder-progress-bar' ),
            prBarCircle = $scope.find( '.tmpcoder-prbar-circle' ),
            $prBarCircleSvg = prBarCircle.find('.tmpcoder-prbar-circle-svg'),
            $prBarCircleLine =  $prBarCircleSvg.find('.tmpcoder-prbar-circle-line'),
            $prBarCirclePrline = $scope.find( '.tmpcoder-prbar-circle-prline' ),
            prBarHrLine = $progressBar.find('.tmpcoder-prbar-hr-line-inner'),
            prBarVrLine = $progressBar.find('.tmpcoder-prbar-vr-line-inner'),
            prBarOptions = $progressBar.data('options'),
            prBarCircleOptions = prBarCircle.data('circle-options'),
            prBarCounter = $progressBar.find('.tmpcoder-prbar-counter-value'),
            prBarCounterValue = prBarOptions.counterValue,
            prBarCounterValuePersent = prBarOptions.counterValuePersent,
            prBarAnimDuration = prBarOptions.animDuration,
            prBarAnimDelay = prBarOptions.animDelay,
            prBarLoopDelay = +prBarOptions.loopDelay,
            currentDeviceMode = elementorFrontend.getCurrentDeviceMode(),
            numeratorData = {
                toValue: prBarCounterValue,
                duration: prBarAnimDuration,
            };

        if ( 'yes' === prBarOptions.counterSeparator ) {
            numeratorData.delimiter = ',';
        }


        function isInViewport( $selector ) {
            if ( $selector.length ) {
                var elementTop = $selector.offset().top,
                elementBottom = elementTop + $selector.outerHeight(),
                viewportTop = $(window).scrollTop(),
                viewportBottom = viewportTop + $(window).height();

                if ( elementTop > $(window).height() ) {
                    elementTop += 50;
                }

                return elementBottom > viewportTop && elementTop < viewportBottom;
            }
        };

        function progressBar() {

            if ( isInViewport( prBarVrLine ) ) {
                prBarVrLine.css({
                    'height': prBarCounterValuePersent + '%'
                });
            }

            if ( isInViewport( prBarHrLine ) ) {
                prBarHrLine.css({
                    'width': prBarCounterValuePersent + '%'
                });
            }

            if ( isInViewport( prBarCircle ) ) {
                var circleDashOffset = prBarCircleOptions.circleOffset;
                
                $prBarCirclePrline.css({
                    'stroke-dashoffset': circleDashOffset
                });
            }

            // Set Delay
            if ( isInViewport( prBarVrLine ) || isInViewport( prBarHrLine ) || isInViewport( prBarCircle ) ) {
                setTimeout(function() {
                    prBarCounter.numerator( numeratorData );
                }, prBarAnimDelay );
            }
        
        }

        progressBar();

        if (prBarOptions.loop === 'yes') {
            setInterval(function() {

                if ( isInViewport( prBarVrLine ) ) {
                    prBarVrLine.css({
                        'height': 0 + '%'
                    });
                }

                if ( isInViewport( prBarHrLine ) ) {
                    prBarHrLine.css({
                        'width': 0 + '%'
                    });
                }

                if ( isInViewport( prBarCircle ) ) {
                    var circleDashOffset = prBarCircleOptions.circleOffset;
                    
                    $prBarCirclePrline.css({
                        'stroke-dashoffset': $prBarCirclePrline.css('stroke-dasharray')
                    });
                }

                // Set Delay
                if ( isInViewport( prBarVrLine ) || isInViewport( prBarHrLine ) || isInViewport( prBarCircle ) ) {
                    setTimeout(function() {
                        prBarCounter.numerator( {
                            toValue: 0,
                            duration: prBarAnimDuration,
                        } );
                    }, prBarAnimDelay);
                }

                setTimeout(function() {
                    progressBar();
                }, prBarAnimDuration + prBarAnimDelay);
            }, (prBarAnimDuration + prBarAnimDelay) * prBarLoopDelay);
        }

         $(window).on('scroll', function() {
            progressBar();
        });
    }

    /* widgetFeatureList js Start */  

    const widgetFeatureList = function( $scope, $ ){
        
        $scope.find('.tmpcoder-feature-list-item:not(:last-of-type)').find('.tmpcoder-feature-list-icon-wrap').each(function(index) {
            var offsetTop = $scope.find('.tmpcoder-feature-list-item').eq(index + 1).find('.tmpcoder-feature-list-icon-wrap').offset().top;
            
            $(this).find('.tmpcoder-feature-list-line').height(offsetTop - $(this).offset().top + 'px');
        });

        $(window).resize(function() {
            $scope.find('.tmpcoder-feature-list-item:not(:last-of-type)').find('.tmpcoder-feature-list-icon-wrap').each(function(index) {
                var offsetTop = $scope.find('.tmpcoder-feature-list-item').eq(index + 1).find('.tmpcoder-feature-list-icon-wrap').offset().top;
                
                $(this).find('.tmpcoder-feature-list-line').height(offsetTop - $(this).offset().top + 'px');
            });
        })
    }

    /* widgetFeatureList js End */  

    /* widgetFlipBox js Start */  

    const widgetFlipBox = function( $scope, $ ){

        var $flipBox = $scope.find('.tmpcoder-flip-box'),
            flipBoxTrigger = $flipBox.data('trigger');

         if ( 'box' === flipBoxTrigger ) {

            $flipBox.find('.tmpcoder-flip-box-front').on( 'click', function() {
                $(this).closest('.tmpcoder-flip-box').addClass('tmpcoder-flip-box-active'); 
            });

            $(window).on( 'click', function () {
                if( $(event.target).closest('.tmpcoder-flip-box').length === 0 ) {
                    $flipBox.removeClass('tmpcoder-flip-box-active');
                }
            });
       
        } else if ( 'btn' == flipBoxTrigger ) {
      
            $flipBox.find('.tmpcoder-flip-box-btn').on( 'click', function() {
                $(this).closest('.tmpcoder-flip-box').addClass('tmpcoder-flip-box-active');          
            });

            $(window).on( 'click', function () {
                if( $(event.target).closest('.tmpcoder-flip-box').length === 0 ) {
                    $flipBox.removeClass('tmpcoder-flip-box-active');
                }
            });

          
        } else if ( 'hover' == flipBoxTrigger ) {
      
            $flipBox.hover(function () {
                $(this).toggleClass('tmpcoder-flip-box-active');
            });

        }
    }

    /* widgetFlipBox js End */  


    /* widgetDataTable js Start */  

    const widgetDataTable = function( $scope, $ ){

        var beforeFilter = $scope.find("tbody .tmpcoder-table-row"),
            itemsPerPage = +$scope.find('.tmpcoder-table-inner-container').attr('data-rows-per-page'),
            paginationListItems = $scope.find('.tmpcoder-table-custom-pagination-list-item'),
            initialRows = $scope.find('.tmpcoder-table-inner-container tbody tr'),
            table = $scope.find('.tmpcoder-table-inner-container tbody'),
            pageIndex, value, paginationIndex;

        // Table Custom Pagination
        if ( 'yes' === $scope.find('.tmpcoder-table-inner-container').attr('data-custom-pagination') ) {

            var tableRows = initialRows.filter(function(index) {
                return index < $scope.find('.tmpcoder-table-inner-container').attr('data-rows-per-page');
            });

            table.html(tableRows);

            adjustPaginationList();

            $scope.on('click', '.tmpcoder-table-custom-pagination-list-item', function() {
                    paginationListItems.removeClass('tmpcoder-active-pagination-item');
                    $(this).addClass('tmpcoder-active-pagination-item');
                    adjustPaginationList();
                    table.hide();
                    pageIndex = +$(this).text();
                    itemsPerPage = +$scope.find('.tmpcoder-table-inner-container').attr('data-rows-per-page');

                    table.html(initialRows.filter(function(index) {
                            index++;
                            return index > itemsPerPage * (pageIndex - 1) && index <= itemsPerPage * pageIndex;
                    }));

                    table.show();
                    beforeFilter = $scope.find("tbody .tmpcoder-table-row");
                    beforeFilter.find('.tmpcoder-table-tr-before-remove').each(function() {
                        $(this).removeClass('tmpcoder-table-tr-before-remove');
                    });

                    entryInfo();
            });

            $scope.find('.tmpcoder-table-prev-next').each(function() {
                pageIndex = +$scope.find('.tmpcoder-active-pagination-item').text();

                if ( $(this).hasClass('tmpcoder-table-custom-pagination-prev')) {

                    $(this).on('click', function() {

                        if ( 1 < pageIndex ) {
                            paginationListItems.removeClass('tmpcoder-active-pagination-item');
                            pageIndex--;

                            paginationListItems.each(function(index) {
                                index++;
                                if ( index === pageIndex) {
                                    $(this).addClass('tmpcoder-active-pagination-item');
                                    pageIndex = +$(this).text();
                                }
                            });
                            adjustPaginationList();

                            table.html(initialRows.filter(function(index) {
                                index++;
                                return index > itemsPerPage * (pageIndex - 1) && index <= itemsPerPage * pageIndex;
                            }));

                            beforeFilter = $scope.find("tbody .tmpcoder-table-row");

                            if ( '' == value ) {
                                table.html(beforeFilter);
                            }
                        }

                        entryInfo();
                    });

                } else {

                    $(this).on('click', function() {

                        if (  paginationListItems.length > pageIndex ) {
                            paginationListItems.removeClass('tmpcoder-active-pagination-item');
                            pageIndex++;
                            
                            paginationListItems.each(function(index) {
                                index++;
                                if ( index === pageIndex) {
                                    $(this).addClass('tmpcoder-active-pagination-item');
                                    pageIndex = +$(this).text();
                                }
                            });
                            adjustPaginationList();

                            table.html(initialRows.filter(function(index) {
                                index++;
                                return index > itemsPerPage * (pageIndex - 1) && index <= itemsPerPage * pageIndex;
                            }));

                            beforeFilter = $scope.find("tbody .tmpcoder-table-row");
                                                
                            if ( '' == value ) {
                                table.html(beforeFilter);
                            }
                        }

                        entryInfo();
                    });
                }

                beforeFilter.find('.tmpcoder-table-tr-before-remove').each(function() {
                    $(this).removeClass('tmpcoder-table-tr-before-remove');
                });

            });

        }

        $scope.find('.tmpcoder-table-inner-container').removeClass('tmpcoder-hide-table-before-arrange');

        entryInfo();

        // Table Live Search
        beforeFilter = $scope.find("tbody .tmpcoder-table-row");
        $scope.find(".tmpcoder-table-live-search").keyup(function () {
            if ( this.value !== '' ) {
                $scope.find('.tmpcoder-table-pagination-cont').addClass('tmpcoder-hide-pagination-on-search');
            } else {
                $scope.find('.tmpcoder-table-pagination-cont').removeClass('tmpcoder-hide-pagination-on-search');
            }
            value = this.value.toLowerCase().trim();

            var afterFilter = [];

            initialRows.each(function (index) {
                // if (!index) return; // TODO: restore if better
                $(this).find("td").each(function () {
                    var id = $(this).text().toLowerCase().trim();
                    var not_found = (id.indexOf(value) == -1);
                    // $(this).closest('tr').toggle(!not_found);
                    // return not_found;
                    if ( !not_found ) {
                        afterFilter.push($(this).closest('tr'));
                    }
                });
            });

            table.html(afterFilter);

            if ( '' == value ) {
                table.html(beforeFilter);
            }

            entryInfo();
        });

        // Table Sorting
        if ( 'yes' === $scope.find('.tmpcoder-table-inner-container').attr('data-table-sorting') ) {
            $(window).click(function(e) {
                if ( !$(e.target).hasClass('tmpcoder-table-th') && 0 === $(e.target).closest('.tmpcoder-table-th').length ) {
                    if ( !$(e.target).hasClass('tmpcoder-active-td-bg-color') && 0 === $(e.target).closest('.tmpcoder-active-td-bg-color').length ) {
                        $scope.find('td').each(function() {
                            if($(this).hasClass('tmpcoder-active-td-bg-color')) {
                                $(this).removeClass('tmpcoder-active-td-bg-color');
                            }
                        });
                    }
                }
            });

            $scope.find('th').click(function(){

                var indexOfTr = $(this).index();

                $scope.find('td').each(function() {
                    if($(this).index() === indexOfTr) {
                        $(this).addClass('tmpcoder-active-td-bg-color');
                    } else {
                        $(this).removeClass('tmpcoder-active-td-bg-color');
                    }
                });

                $scope.find('th').each(function() {
                    $(this).find('.tmpcoder-sorting-icon').html('<i class="fas fa-sort" aria-hidden="true"></i>');
                });

                var table = $(this).parents('table').eq(0);
                var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))

                this.asc = !this.asc
                if ($scope.hasClass('tmpcoder-data-table-type-custom') ? !this.asc : this.asc) {
                    if ($scope.hasClass('tmpcoder-data-table-type-custom')) {
                        $(this).find('.tmpcoder-sorting-icon').html('<i class="fas fa-sort-down" aria-hidden="true"></i>');
                    } else {
                        $(this).find('.tmpcoder-sorting-icon').html('<i class="fas fa-sort-up" aria-hidden="true"></i>');
                    }
                    rows = rows.reverse() 
                } 

                if($scope.hasClass('tmpcoder-data-table-type-custom') ? this.asc : !this.asc) {
                    
                    if ($scope.hasClass('tmpcoder-data-table-type-custom')) {
                        $(this).find('.tmpcoder-sorting-icon').html('<i class="fas fa-sort-up" aria-hidden="true"></i>');
                    } else {

                        $(this).find('.tmpcoder-sorting-icon').html('<i class="fas fa-sort-down" aria-hidden="true"></i>');
                    }
                }

                for (var i = 0; i < rows.length; i++) {
                    table.append(rows[i])
                }

                beforeFilter.find('.tmpcoder-table-tr-before-remove').each(function() {
                    $(this).closest('.tmpcoder-table-row').next('.tmpcoder-table-appended-tr').remove();
                    $(this).removeClass('tmpcoder-table-tr-before-remove');
                });
            });
        }

        if ( $scope.find('.tmpcoder-table-inner-container').attr('data-row-pagination') === 'yes' ) {
            $scope.find('.tmpcoder-table-head-row').prepend('<th class="tmpcoder-table-th-pag" style="vertical-align: middle;">' + '#' + '</th>')
            initialRows.each(function(index) {
                    $(this).prepend('<td class="tmpcoder-table-td-pag" style="vertical-align: middle;"><span style="vertical-align: middle;">'+ (index + 1) +'</span></td>')
            })  
        }

        if ( $scope.find('.tmpcoder-table-export-button-cont').length ) {
            var exportBtn = $scope.find('.tmpcoder-table-export-button-cont .tmpcoder-button');;
            exportBtn.each(function() {
                if ( $(this).hasClass('tmpcoder-xls')) {
                    $(this).on('click', function() {    
                        let table = $scope.find('table');
                        TableToExcel.convert(table[0], { // html code may contain multiple tables so here we are refering to 1st table tag
                            name: `export.xlsx`, // fileName you could use any name
                            sheet: {
                                name: 'Sheet 1' // sheetName
                            }
                        });
                    });
                } else if ( $(this).hasClass('tmpcoder-csv')) {
                    $(this).on('click', function() {
                        htmlToCSV('why-this-arg?', "placeholder.csv", $scope.find('.tmpcoder-data-table'));
                    });
                }
            });
        }

        function entryInfo() {

            if ( 'yes' !== $scope.find('.tmpcoder-table-inner-container').attr('data-entry-info') ) {
                return;
            }

            var entryPage = +$scope.find('.tmpcoder-active-pagination-item').text(),
                lastEntry = itemsPerPage * entryPage - (itemsPerPage - $scope.find('tbody tr').length),
                firstEntry = lastEntry - $scope.find('tbody tr').length + 1;

            $scope.find('.tmpcoder-entry-info').html('Showing ' + firstEntry + ' to ' + lastEntry + ' of ' + initialRows.length + ' Entries.');
        }

        function adjustPaginationList() {
            
            paginationIndex = $scope.find('.tmpcoder-active-pagination-item').index();
            paginationListItems.each(function(index) {
                if (index == 0 || index == paginationListItems.length - 1 || index <= paginationIndex && index >= paginationIndex - 2) {
                    $(this).css('display', 'flex');
                } else {
                    $(this).css('display', 'none');
                }
            });
        }
        
        function comparer(index) {
            return function(a, b) {
                var valA = getCellValue(a, index), valB = getCellValue(b, index)
                return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
            }
        }

        function getCellValue (row, index) { 
            return $(row).children('td').eq(index).text() 
        }

        function htmlToCSV(html, filename, view) {
            var data = [];
            var rows = view.find(".tmpcoder-table-row");
                    
            for (var i = 0; i < rows.length; i++) {
                var row = [], cols = rows[i].querySelectorAll(".tmpcoder-table-text");
                        
                for (var j = 0; j < cols.length; j++) {
                        row.push(cols[j].innerText);
                }
                
                data.push(row.join(","));       
            }
        
            downloadCSVFile(data.join("\n"), filename);
        }
    
        function downloadCSVFile(csv, filename) {
            var csv_file, download_link;
        
            csv_file = new Blob([csv], {type: "text/csv"});
        
            download_link = document.createElement("a");
        
            download_link.download = filename;
        
            download_link.href = window.URL.createObjectURL(csv_file);
        
            download_link.style.display = "none";
        
            document.body.appendChild(download_link);
        
            download_link.click();
        } // Data Table CSV export        
    }

    /* widgetDataTable js End */ 

    /* widgetBeforeAfter js Start */ 

    const widgetBeforeAfter = function( $scope, $ ){
        var imagesWrap = $scope.find( '.tmpcoder-ba-image-container' ),
            imageOne = imagesWrap.find( '.tmpcoder-ba-image-1' ),
            imageTwo = imagesWrap.find( '.tmpcoder-ba-image-2' ),
            divider = imagesWrap.find( '.tmpcoder-ba-divider' ),
            startPos = imagesWrap.attr( 'data-position' );

        // Horizontal
        if ( imagesWrap.hasClass( 'tmpcoder-ba-horizontal' ) ) {
            // On Load
            divider.css( 'left', startPos +'%' );
            imageTwo.css( 'left', startPos +'%' );
            imageTwo.find( 'img' ).css( 'right', startPos +'%' );

            // On Move
            divider.on( 'move', function(e) {
                var overlayWidth = e.pageX - imagesWrap.offset().left;

                // Reset
                divider.css({
                    'left' : 'auto',
                    'right' : 'auto'
                });
                imageTwo.css({
                    'left' : 'auto',
                    'right' : 'auto'
                });

                if ( overlayWidth > 0  && overlayWidth < imagesWrap.outerWidth() ) {
                    divider.css( 'left', overlayWidth );
                    imageTwo.css( 'left', overlayWidth );
                    imageTwo.find( 'img' ).css( 'right', overlayWidth );
                } else {
                    if ( overlayWidth <= 0 ) {
                        divider.css( 'left', 0 );
                        imageTwo.css( 'left', 0 );
                        imageTwo.find( 'img' ).css( 'right', 0 );
                    } else if ( overlayWidth >= imagesWrap.outerWidth() ) {
                        divider.css( 'right', - divider.outerWidth() / 2 );
                        imageTwo.css( 'right', 0 );
                        imageTwo.find( 'img' ).css( 'right', '100%' );
                    }
                }

                hideLabelsOnTouch();
            });

        // Vertical
        } else {
            // On Load
            divider.css( 'top', startPos +'%' );
            imageTwo.css( 'top', startPos +'%' );
            imageTwo.find( 'img' ).css( 'bottom', startPos +'%' );

            // On Move
            divider.on( 'move', function(e) {
                var overlayWidth = e.pageY - imagesWrap.offset().top;

                // Reset
                divider.css({
                    'top' : 'auto',
                    'bottom' : 'auto'
                });
                imageTwo.css({
                    'top' : 'auto',
                    'bottom' : 'auto'
                });

                if ( overlayWidth > 0  && overlayWidth < imagesWrap.outerHeight() ) {
                    divider.css( 'top', overlayWidth );
                    imageTwo.css( 'top', overlayWidth );
                    imageTwo.find( 'img' ).css( 'bottom', overlayWidth );
                } else {
                    if ( overlayWidth <= 0 ) {
                        divider.css( 'top', 0 );
                        imageTwo.css( 'top', 0 );
                        imageTwo.find( 'img' ).css( 'bottom', 0 );
                    } else if ( overlayWidth >= imagesWrap.outerHeight() ) {
                        divider.css( 'bottom', - divider.outerHeight() / 2 );
                        imageTwo.css( 'bottom', 0 );
                        imageTwo.find( 'img' ).css( 'bottom', '100%' );
                    }
                }

                hideLabelsOnTouch();
            });
        }

        // Mouse Hover
        if ( 'mouse' === imagesWrap.attr( 'data-trigger' ) ) {

            imagesWrap.on( 'mousemove', function( event ) {

                // Horizontal
                if ( imagesWrap.hasClass( 'tmpcoder-ba-horizontal' ) ) {
                    var overlayWidth = event.pageX - $(this).offset().left;
                    divider.css( 'left', overlayWidth );
                    imageTwo.css( 'left', overlayWidth );
                    imageTwo.find( 'img' ).css( 'right', overlayWidth );

                // Vertical
                } else {
                    var overlayWidth = event.pageY - $(this).offset().top;
                    divider.css( 'top', overlayWidth );
                    imageTwo.css( 'top', overlayWidth );
                    imageTwo.find( 'img' ).css( 'bottom', overlayWidth );
                }

                hideLabelsOnTouch();
            });

        }

        // Hide Labels
        hideLabelsOnTouch();

        function hideLabelsOnTouch() {
            var labelOne = imagesWrap.find( '.tmpcoder-ba-label-1 div' ),
                labelTwo = imagesWrap.find( '.tmpcoder-ba-label-2 div' );

            if ( ! labelOne.length && ! labelTwo.length ) {
                return;
            }

            // Horizontal
            if ( imagesWrap.hasClass( 'tmpcoder-ba-horizontal' ) ) {
                var labelOneOffset = labelOne.position().left + labelOne.outerWidth(),
                    labelTwoOffset = labelTwo.position().left + labelTwo.outerWidth();

                if ( labelOneOffset + 15 >= parseInt( divider.css( 'left' ), 10 ) ) {
                    labelOne.stop().css( 'opacity', 0 );
                } else {
                    labelOne.stop().css( 'opacity', 1 );
                }

                if ( (imagesWrap.outerWidth() - (labelTwoOffset + 15)) <= parseInt( divider.css( 'left' ), 10 ) ) {
                    labelTwo.stop().css( 'opacity', 0 );
                } else {
                    labelTwo.stop().css( 'opacity', 1 );
                }

            // Vertical
            } else {
                var labelOneOffset = labelOne.position().top + labelOne.outerHeight(),
                    labelTwoOffset = labelTwo.position().top + labelTwo.outerHeight();

                if ( labelOneOffset + 15 >= parseInt( divider.css( 'top' ), 10 ) ) {
                    labelOne.stop().css( 'opacity', 0 );
                } else {
                    labelOne.stop().css( 'opacity', 1 );
                }

                if ( (imagesWrap.outerHeight() - (labelTwoOffset + 15)) <= parseInt( divider.css( 'top' ), 10 ) ) {
                    labelTwo.stop().css( 'opacity', 0 );
                } else {
                    labelTwo.stop().css( 'opacity', 1 );
                }
            }
        }
    }

    /* widgetBeforeAfter js End */ 

    /* widgetImageHotspots js Start */

    const widgetImageHotspots = function( $scope, $ ){

        var $imgHotspots = $scope.find( '.tmpcoder-image-hotspots' ),
            hotspotsOptions = $imgHotspots.data('options'),
            $hotspotItem = $imgHotspots.find('.tmpcoder-hotspot-item'),
            tooltipTrigger = hotspotsOptions.tooltipTrigger;

        if ( 'click' === tooltipTrigger ) {
            $hotspotItem.on( 'click', function() {
                if ( $(this).hasClass('tmpcoder-tooltip-active') ) {
                    $(this).removeClass('tmpcoder-tooltip-active');
                } else {
                    $hotspotItem.removeClass('tmpcoder-tooltip-active');
                    $(this).addClass('tmpcoder-tooltip-active');
                }
                 event.stopPropagation();
            });

            $(window).on( 'click', function () {
                $hotspotItem.removeClass('tmpcoder-tooltip-active');
            });
       
        } else if ( 'hover' === tooltipTrigger ) {
            $hotspotItem.on( 'mouseenter', function () {
                $(this).addClass('tmpcoder-tooltip-active');
            });
            
            $hotspotItem.on( 'mouseleave', function () {
                $(this).removeClass('tmpcoder-tooltip-active');
            });

        } else {
            $hotspotItem.addClass('tmpcoder-tooltip-active');
        }
    }

    /* widgetImageHotspots js End */ 

    /* widgetContentTicker js Start */  

    const widgetContentTicker = function( $scope, $ ){

        var $contentTickerSlider = $scope.find( '.tmpcoder-ticker-slider' ),
            $contentTickerMarquee = $scope.find( '.tmpcoder-ticker-marquee' ),
            marqueeData = $contentTickerMarquee.data('options');
        // Slider Columns
        var sliderClass = $scope.attr('class'),
            sliderColumnsDesktop = sliderClass.match(/tmpcoder-ticker-slider-columns-\d/) ? sliderClass.match(/tmpcoder-ticker-slider-columns-\d/).join().slice(-1) : 2,
            sliderColumnsWideScreen = sliderClass.match(/columns--widescreen\d/) ? sliderClass.match(/columns--widescreen\d/).join().slice(-1) : sliderColumnsDesktop,
            sliderColumnsLaptop = sliderClass.match(/columns--laptop\d/) ? sliderClass.match(/columns--laptop\d/).join().slice(-1) : sliderColumnsDesktop,
            sliderColumnsTablet = sliderClass.match(/columns--tablet\d/) ? sliderClass.match(/columns--tablet\d/).join().slice(-1) : 2,
            sliderColumnsTabletExtra = sliderClass.match(/columns--tablet_extra\d/) ? sliderClass.match(/columns--tablet_extra\d/).join().slice(-1) : sliderColumnsTablet,
            sliderColumnsMobileExtra = sliderClass.match(/columns--mobile_extra\d/) ? sliderClass.match(/columns--mobile_extra\d/).join().slice(-1) : sliderColumnsTablet,
            sliderColumnsMobile = sliderClass.match(/columns--mobile\d/) ? sliderClass.match(/columns--mobile\d/).join().slice(-1) : 1,
            dataSlideEffect = $contentTickerSlider.attr('data-slide-effect'),
            sliderSlidesToScroll = 'hr-slide' === dataSlideEffect && sliderClass.match(/tmpcoder-ticker-slides-to-scroll-\d/) ? +(sliderClass.match(/tmpcoder-ticker-slides-to-scroll-\d/).join().slice(-1)) : 1;

        $contentTickerSlider.slick({
            appendArrows : $scope.find('.tmpcoder-ticker-slider-controls'),
            slidesToShow: sliderColumnsDesktop,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsWideScreen,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsWideScreen ? 1 : sliderSlidesToScroll,
                        fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 2399,
                    settings: {
                        slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsDesktop,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsDesktop ? 1 : sliderSlidesToScroll,
                        fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 1221,
                    settings: {
                        slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsLaptop,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsLaptop ? 1 : sliderSlidesToScroll,
                        fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsTabletExtra,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsTabletExtra ? 1 : sliderSlidesToScroll,
                        fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsTablet,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsTablet ? 1 : sliderSlidesToScroll,
                        fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 880,
                    settings: {
                        slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsMobileExtra,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsMobileExtra ? 1 : sliderSlidesToScroll,
                        fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect ) ? 1 : sliderColumnsMobile,
                        slidesToScroll: sliderSlidesToScroll > sliderColumnsMobile ? 1 : sliderSlidesToScroll,
                        fade: ('typing' === dataSlideEffect || 'fade' === dataSlideEffect) ? true : false
                    }
                }
            ],
        });

        $contentTickerMarquee.marquee(marqueeData);
        if ( $scope.find('.tmpcoder-marquee-hidden').length > 0 ) {
            $scope.find('.tmpcoder-ticker-marquee').removeClass('tmpcoder-marquee-hidden');
        }
    }

    /* widgetContentTicker js End */  

    /* postTimeline js Start */  

    const widgetPostsTimeline = function( $scope, $ ){

        var iScrollTarget = $scope.find( '.tmpcoder-timeline-centered' ).length > 0 ? $scope.find( '.tmpcoder-timeline-centered' ) : '',
            element = $scope.find('.tmpcoder-timeline-centered').length > 0 ? $scope.find('.tmpcoder-timeline-centered') : '',
            pagination = $scope.find( '.tmpcoder-grid-pagination' ).length > 0 ? $scope.find( '.tmpcoder-grid-pagination' ) : '',
            middleLine = $scope.find('.tmpcoder-middle-line').length > 0 ? $scope.find('.tmpcoder-middle-line') : '',
            timelineFill = $scope.find(".tmpcoder-timeline-fill").length > 0 ? $scope.find(".tmpcoder-timeline-fill") : '',
            lastIcon = $scope.find('.tmpcoder-main-line-icon.tmpcoder-icon:last').length > 0 ? $scope.find('.tmpcoder-main-line-icon.tmpcoder-icon:last') : '',
            firstIcon = $scope.find('.tmpcoder-main-line-icon.tmpcoder-icon').length > 0 ? $scope.find('.tmpcoder-main-line-icon.tmpcoder-icon').first() : '',
            scopeClass = '.elementor-element-'+ $scope.attr( 'data-id' ),
            aosOffset = $scope.find('.tmpcoder-story-info-vertical').attr('data-animation-offset') ? +$scope.find('.tmpcoder-story-info-vertical').attr('data-animation-offset') : '',
            aosDuration = $scope.find('.tmpcoder-story-info-vertical').attr('data-animation-duration') ? +$scope.find('.tmpcoder-story-info-vertical').attr('data-animation-duration') : '';


        if ( $scope.find('.tmpcoder-timeline-centered').length > 0 ) {
            
            $(window).resize(function() {
                removeLeftAlignedClass();
            });

            $(window).smartresize(function() {
                removeLeftAlignedClass();
            });

            setTimeout(function() {
                removeLeftAlignedClass();
                $(window).trigger('resize');
            }, 500);

            adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element);
            
            setTimeout(function() {
                adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element);
                $(window).trigger('resize');
            }, 500);

            $(window).smartresize(function() {
                adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element);
            });

            $(window).resize(function() {
                adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element);
            });

            if ( 'load-more' !== iScrollTarget.attr('data-pagination') ) {
                $scope.find('.tmpcoder-grid-pagination').css('visibility', 'hidden');
            }

            AOS.init({
                offset: parseInt(aosOffset),
                duration: aosDuration,
                once: true,
            });

            postsTimelineFill(lastIcon, firstIcon);

            $(window).on('scroll',  function() {
                postsTimelineFill(lastIcon, firstIcon);
            });

            // init Infinite Scroll
            if ( !$scope.find('.elementor-repeater-items').length && !editorCheck() && ('load-more' === $scope.find('.tmpcoder-timeline-centered').data('pagination') || 'infinite-scroll' === $scope.find('.tmpcoder-timeline-centered').data('pagination')) ) {
                var threshold = iScrollTarget !== undefined && 'load-more' === iScrollTarget.attr('data-pagination') ? false : 10;
                // var navClass = scopeClass +' .tmpcoder-load-more-btn';
                
                iScrollTarget.infiniteScroll({
                    path: scopeClass +' .tmpcoder-grid-pagination a',
                    hideNav: false,
                    append:  scopeClass +'.tmpcoder-timeline-entry',
                    history: false,
                    scrollThreshold: threshold,
                    status: scopeClass + ' .page-load-status',
                });
                // Request
                iScrollTarget.on( 'request.infiniteScroll', function( event, path ) {
                    $scope.find( '.tmpcoder-load-more-btn' ).hide();
                    $scope.find( '.tmpcoder-pagination-loading' ).css( 'display', 'inline-block' );
                });
                
                var pagesLoaded = 0;

                iScrollTarget.on( 'load.infiniteScroll', function( event, response ) {
                    pagesLoaded++;
                    
                    // get posts from response
                    var items = $( response ).find(scopeClass).find( '.tmpcoder-timeline-entry' );
                    iScrollTarget.infiniteScroll( 'appendItems', items );

                    if ( !$scope.find('.tmpcoder-one-sided-timeline').length && !$scope.find('.tmpcoder-one-sided-timeline-left').length ) {
                        $scope.find('.tmpcoder-timeline-entry').each(function(index, value){
                            $(this).removeClass('tmpcoder-right-aligned tmpcoder-left-aligned');
                            if ( 0 == index % 2 ) {
                                $(this).addClass('tmpcoder-left-aligned');
                                $(this).find('.tmpcoder-story-info-vertical').attr('data-aos', $(this).find('.tmpcoder-story-info-vertical').attr('data-aos-left'));
                            } else {
                                $(this).addClass('tmpcoder-right-aligned');
                                $(this).find('.tmpcoder-story-info-vertical').attr('data-aos', $(this).find('.tmpcoder-story-info-vertical').attr('data-aos-right'));
                            }
                        });
                    }

                    AOS.init({
                        offset: parseInt(aosOffset),
                        duration: aosDuration,
                        once: true,
                    });

                    $(window).scroll();

                    $scope.find( '.tmpcoder-pagination-loading' ).hide();
                    // $scope.find( '.tmpcoder-load-more-btn' ).fadeIn();
                    if ( iScrollTarget.data('max-pages') - 1 !== pagesLoaded ) { // $pagination_max_pages
                        if ( 'load-more' === iScrollTarget.attr('data-pagination') ) {
                            $scope.find( '.tmpcoder-load-more-btn' ).fadeIn();
                        }
                    } else {
                        $scope.find( '.tmpcoder-pagination-finish' ).fadeIn( 1000 );
                        pagination.delay( 2000 ).fadeOut( 1000 );
                    }

                    middleLine = $scope.find('.tmpcoder-middle-line');
                    timelineFill = $scope.find(".tmpcoder-timeline-fill");
                    lastIcon = $scope.find('.tmpcoder-main-line-icon.tmpcoder-icon:last');
                    firstIcon = $scope.find('.tmpcoder-main-line-icon.tmpcoder-icon').first();
                    element = $scope.find('.tmpcoder-timeline-centered');

                    adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element);
                    $(window).trigger('resize');
                    postsTimelineFill(lastIcon, firstIcon);
                });

                if ( !editorCheck() ) {
                    $scope.find( '.tmpcoder-load-more-btn' ).on( 'click', function() {
                        iScrollTarget.infiniteScroll( 'loadNextPage' );
                        return false;
                    });

                    if ( 'infinite-scroll' == iScrollTarget.attr('data-pagination') ) {
                            iScrollTarget.infiniteScroll('loadNextPage');
                    }
                }
            }
        }

        if ( $scope.find('.swiper-wrapper').length ) {

            var swiperLoader = function swiperLoader(swiperElement, swiperConfig) {
                // if ('undefined' === typeof Swiper) {
                //  var asyncSwiper = elementorFrontend.utils.swiper;     
                //  return new asyncSwiper(swiperElement, swiperConfig).then( function (newSwiperInstance) {
                //      return newSwiperInstance;
                //  });
                //  } else {
                //  console.log(Swiper);
                //  return swiperPromise(swiperElement, swiperConfig);  
                // }

                // Check if swiperPromise is necessary
                var asyncSwiper = elementorFrontend.utils.swiper;     
                return new asyncSwiper(swiperElement, swiperConfig).then( function (newSwiperInstance) {
                    return newSwiperInstance;
                });
            };
            
            var swiperPromise = function swiperPromise(swiperElement, swiperConfig) {    
                return new Promise(function (resolve, reject) {  
                        var swiperInstance = new Swiper(swiperElement, swiperConfig); 
                        resolve(swiperInstance); 
                }); 
            };
        
            var horizontal = $scope.find('.tmpcoder-horizontal-bottom').length ? '.tmpcoder-horizontal-bottom' : '.tmpcoder-horizontal';
            var swiperSlider = $scope.find(horizontal +".swiper-container");
                        
            var slidestoshow = swiperSlider.data("slidestoshow");

            swiperLoader(swiperSlider, {
                spaceBetween: +swiperSlider.data('swiper-space-between'),
                loop: swiperSlider.data('loop') === 'yes' ? true : false,
                autoplay: swiperSlider.data("autoplay") !== 'yes' ? false : {
                    delay: +swiperSlider.attr('data-swiper-delay'),
                    disableOnInteraction: false,
                    pauseOnMouseEnter: swiperSlider.data('swiper-poh') === 'yes' ? true : false,
                },
                on: {
                    init: function () {
                        if ( $scope.find('.tmpcoder-timeline-outer-container').length > 0 ) {
                            $scope.find('.tmpcoder-timeline-outer-container').css('opacity', 1);
                        }
                    },
                },
                speed: +swiperSlider.attr('data-swiper-speed'),
                slidesPerView: swiperSlider.data("slidestoshow"),
                direction: 'horizontal',
                pagination: {
                  el: '.tmpcoder-swiper-pagination',
                  type: 'progressbar',
                },
                navigation: {
                  nextEl: '.tmpcoder-button-next',
                  prevEl: '.tmpcoder-button-prev',
                },
                // Responsive breakpoints
                breakpoints: {
                  // when window width is >= 320px
                  320: {
                    slidesPerView: 1,
                  },
                  // when window width is >= 480px
                  480: {
                    slidesPerView: 2,
                  },
                  // when window width is >= 640px
                  769: { // 640
                    slidesPerView: slidestoshow,
                  }
                },
              });

            //   swiperSlider.data('pause-on-hover') === 'yes' && swiperSlider.hover(function() {
            //    (this).swiper.autoplay.stop();
            //   }, function() {
            //    (this).swiper.autoplay.start();
            //   });

        } else {
            $(document).ready(function() {
                // Handler when all assets (including images) are loaded
                if ( $scope.find('.tmpcoder-timeline-outer-container').length ) {
                    $scope.find('.tmpcoder-timeline-outer-container').css('opacity', 1);
                }
            });
        }

        function removeLeftAlignedClass() {
            if ( $scope.find('.tmpcoder-centered').length ) {
                if ( window.innerWidth <= 767 ) {
                    $scope.find('.tmpcoder-wrapper .tmpcoder-timeline-centered').removeClass('tmpcoder-both-sided-timeline').addClass('tmpcoder-one-sided-timeline').addClass('tmpcoder-remove-one-sided-later');
                    $scope.find('.tmpcoder-wrapper .tmpcoder-left-aligned').removeClass('tmpcoder-left-aligned').addClass('tmpcoder-right-aligned').addClass('tmpcoder-remove-right-aligned-later');
                } else {
                    $scope.find('.tmpcoder-wrapper .tmpcoder-timeline-centered.tmpcoder-remove-one-sided-later').removeClass('tmpcoder-one-sided-timeline').addClass('tmpcoder-both-sided-timeline').removeClass('tmpcoder-remove-one-sided-later');
                    $scope.find('.tmpcoder-wrapper .tmpcoder-remove-right-aligned-later').removeClass('tmpcoder-right-aligned').addClass('tmpcoder-left-aligned').removeClass('tmpcoder-remove-right-aligned-later');
                }
            }
        }

      function postsTimelineFill(lastIcon, firstIcon) {
        if ( !$scope.find('.tmpcoder-timeline-fill').length ) {
            return;
        }

        if ( $scope.find('.tmpcoder-timeline-entry:eq(0)').prev('.tmpcoder-year-wrap').length > 0 ) {
            firstIcon = $scope.find('.tmpcoder-year-label').eq(0);
        }

          if ( timelineFill.length ) {
            var fillHeight = timelineFill.css('height').slice(0, -2),
                docScrollTop = document.documentElement.scrollTop,
                clientHeight = document.documentElement.clientHeight/2;
              
            if ( !((docScrollTop + clientHeight - (firstIcon.offset().top)) > lastIcon.offset().top - firstIcon.offset().top + parseInt(lastIcon.css('height').slice(0, -2))) ) {
                timelineFill.css('height', (docScrollTop  + clientHeight - (firstIcon.offset().top)) + 'px');
            }

            $scope.find('.tmpcoder-main-line-icon.tmpcoder-icon').each(function () {
                if ( $(this).offset().top < parseInt( firstIcon.offset().top + parseInt(fillHeight) ) ) {
                    $(this).addClass('tmpcoder-change-border-color');
                } else {
                    $(this).removeClass('tmpcoder-change-border-color');
                }
            });
          }
      }

      function adjustMiddleLineHeight(middleLine, timelineFill, lastIcon, firstIcon, element) {
            element = $scope.find('.tmpcoder-timeline-centered');
            if ( !$scope.find('.tmpcoder-both-sided-timeline').length && !$scope.find('.tmpcoder-one-sided-timeline').length && !$scope.find('.tmpcoder-one-sided-timeline-left').length ) {
                return;
            }

            if ( $scope.find('.tmpcoder-timeline-entry:eq(0)').prev('.tmpcoder-year-wrap').length > 0 ) {
                firstIcon = $scope.find('.tmpcoder-year-label').eq(0);
            }
            
            var firstIconOffset = firstIcon.offset().top;
            var lastIconOffset = lastIcon.offset().top;
            var middleLineTop = (firstIconOffset - element.offset().top) + 'px';
            // var middleLineHeight = (lastIconOffset - (lastIcon.css('height').slice(0, -2)/2 + (firstIconOffset - firstIcon.css('height').slice(0, -2)))) + 'px';
            var middleLineHeight = lastIconOffset - firstIconOffset + parseInt(lastIcon.css('height').slice(0, -2));
            var middleLineMaxHeight = firstIconOffset - lastIconOffset + 'px !important';

            middleLine.css('top', middleLineTop);
            middleLine.css('height', middleLineHeight);
            // middleLine.css('maxHeight', middleLineMaxHeight);
            timelineFill !== '' ? timelineFill.css('top', middleLineTop) : '';
        }   
    }

    /* postTimeline js End */  

    /* Widget Nav Menu start */

    const widgetNavMenu = function( $scope, $ )
    {
        var $navMenu = $scope.find( '.tmpcoder-nav-menu-container' ),
            $mobileNavMenu = $scope.find( '.tmpcoder-mobile-nav-menu-container' );

        // Menu
        var subMenuFirst = $navMenu.find( '.tmpcoder-nav-menu > li.menu-item-has-children' ),
            subMenuDeep = $navMenu.find( '.tmpcoder-sub-menu li.menu-item-has-children' );

        if ( $scope.find('.tmpcoder-mobile-toggle').length ) {
            $scope.find('a').on('click', function() {
                if (this.pathname == window.location.pathname && !($(this).parent('li').children().length > 1)) {
                    $scope.find('.tmpcoder-mobile-toggle').trigger('click');
                }
            });
        }

        if ( $navMenu.attr('data-trigger') === 'click' ) {
            // First Sub
            subMenuFirst.children('a').on( 'click', function(e) {
                var currentItem = $(this).parent(),
                    childrenSub = currentItem.children('.tmpcoder-sub-menu');

                // Reset
                subMenuFirst.not(currentItem).removeClass('tmpcoder-sub-open');
                if ( $navMenu.hasClass('tmpcoder-nav-menu-horizontal') || ( $navMenu.hasClass('tmpcoder-nav-menu-vertical') && $scope.hasClass('tmpcoder-sub-menu-position-absolute') ) ) {
                    subMenuAnimation( subMenuFirst.children('.tmpcoder-sub-menu'), false );
                }

                if ( ! currentItem.hasClass( 'tmpcoder-sub-open' ) ) {
                    e.preventDefault();
                    currentItem.addClass('tmpcoder-sub-open');
                    subMenuAnimation( childrenSub, true );
                } else {
                    currentItem.removeClass('tmpcoder-sub-open');
                    subMenuAnimation( childrenSub, false );
                }
            });

            // Deep Subs
            subMenuDeep.on( 'click', function(e) {
                var currentItem = $(this),
                    childrenSub = currentItem.children('.tmpcoder-sub-menu');

                // Reset
                if ( $navMenu.hasClass('tmpcoder-nav-menu-horizontal') ) {
                    subMenuAnimation( subMenuDeep.find('.tmpcoder-sub-menu'), false );
                }

                if ( ! currentItem.hasClass( 'tmpcoder-sub-open' ) ) {
                    e.preventDefault();
                    currentItem.addClass('tmpcoder-sub-open');
                    subMenuAnimation( childrenSub, true );

                } else {
                    currentItem.removeClass('tmpcoder-sub-open');
                    subMenuAnimation( childrenSub, false );
                }
            });

            // Reset Subs on Document click
            $( document ).mouseup(function (e) {
                if ( ! subMenuFirst.is(e.target) && subMenuFirst.has(e.target).length === 0 ) {
                    subMenuFirst.not().removeClass('tmpcoder-sub-open');
                    subMenuAnimation( subMenuFirst.children('.tmpcoder-sub-menu'), false );
                }
                if ( ! subMenuDeep.is(e.target) && subMenuDeep.has(e.target).length === 0 ) {
                    subMenuDeep.removeClass('tmpcoder-sub-open');
                    subMenuAnimation( subMenuDeep.children('.tmpcoder-sub-menu'), false );
                }
            });
        } else {
            // Mouse Over
            subMenuFirst.on( 'mouseenter', function() {
                if ( $navMenu.hasClass('tmpcoder-nav-menu-vertical') && $scope.hasClass('tmpcoder-sub-menu-position-absolute') ) {
                    $navMenu.find('li').not(this).children('.tmpcoder-sub-menu').hide();
                    // BUGFIX: when menu is vertical and absolute positioned, lvl2 depth sub menus wont show properly on hover
                }

                subMenuAnimation( $(this).children('.tmpcoder-sub-menu'), true );
            });

            // Deep Subs
            subMenuDeep.on( 'mouseenter', function() {
                subMenuAnimation( $(this).children('.tmpcoder-sub-menu'), true );
            });


            // Mouse Leave
            if ( $navMenu.hasClass('tmpcoder-nav-menu-horizontal') ) {
                subMenuFirst.on( 'mouseleave', function() {
                    subMenuAnimation( $(this).children('.tmpcoder-sub-menu'), false );
                });

                subMenuDeep.on( 'mouseleave', function() {
                    subMenuAnimation( $(this).children('.tmpcoder-sub-menu'), false );
                }); 
            } else {

                $navMenu.on( 'mouseleave', function() {
                    subMenuAnimation( $(this).find('.tmpcoder-sub-menu'), false );
                });
            }
        }


        // Mobile Menu
        var mobileMenu = $mobileNavMenu.find( '.tmpcoder-mobile-nav-menu' );

        // Toggle Button
        $mobileNavMenu.find( '.tmpcoder-mobile-toggle' ).on( 'click', function() {
            $(this).toggleClass('tmpcoder-mobile-toggle-fx');

            if ( ! $(this).hasClass('tmpcoder-mobile-toggle-open') ) {
                $(this).addClass('tmpcoder-mobile-toggle-open');

                if ( $(this).find('.tmpcoder-mobile-toggle-text').length ) {
                    $(this).children().eq(0).hide();
                    $(this).children().eq(1).show();
                }
            } else {
                $(this).removeClass('tmpcoder-mobile-toggle-open');
                $(this).trigger('focusout');

                if ( $(this).find('.tmpcoder-mobile-toggle-text').length ) {
                    $(this).children().eq(1).hide();
                    $(this).children().eq(0).show();
                }
            }

            // Show Menu
            $(this).parent().next().stop().slideToggle();

            // Fix Width
            fullWidthMobileDropdown();
        });

        // Sub Menu Class
        mobileMenu.find('.sub-menu').removeClass('tmpcoder-sub-menu').addClass('tmpcoder-mobile-sub-menu');

        // Sub Menu Dropdown
        mobileMenu.find('.menu-item-has-children').children('a').on( 'click', function(e) {
            var parentItem = $(this).closest('li');

            // Toggle
            if ( ! parentItem.hasClass('tmpcoder-mobile-sub-open') ) {
                e.preventDefault();
                parentItem.addClass('tmpcoder-mobile-sub-open');
                parentItem.children('.tmpcoder-mobile-sub-menu').first().stop().slideDown();
            } else {
                parentItem.removeClass('tmpcoder-mobile-sub-open');
                parentItem.children('.tmpcoder-mobile-sub-menu').first().stop().slideUp();
            }
        });

        // Run Functions
        fullWidthMobileDropdown();

        // Run Functions on Resize
        $(window).smartresize(function() {
            fullWidthMobileDropdown();
        });

        // Full Width Dropdown
        function fullWidthMobileDropdown() {
            if ( ! $scope.hasClass( 'tmpcoder-mobile-menu-full-width' ) || ! $scope.closest('.elementor-column').length ) {
                return;
            }

            var eColumn   = $scope.closest('.elementor-column'),
                mWidth    = $scope.closest('.elementor-top-section').outerWidth() - 2 * mobileMenu.offset().left,
                mPosition = eColumn.offset().left + parseInt(eColumn.css('padding-left'), 10);

            mobileMenu.css({
                'width' : mWidth +'px',
                'left' : - mPosition +'px'
            });
        }

        // Sub Menu Animation
        function subMenuAnimation( selector, show ) {
            if ( show === true ) {
                if ( $scope.hasClass('tmpcoder-sub-menu-fx-slide') ) {
                    selector.stop().slideDown();
                } else {
                    selector.stop().fadeIn();
                }
            } else {
                if ( $scope.hasClass('tmpcoder-sub-menu-fx-slide') ) {
                    selector.stop().slideUp();
                } else {
                    selector.stop().fadeOut();
                }
            }
        }
    }

    /* Widget Nav Menu end */

    /* Lottie Aimation Start */
    
    const widgetLottieAnimations = function( $scope, $ ){

        var lottieAnimations = $scope.find('.tmpcoder-lottie-animations'),
            lottieAnimationsWrap = $scope.find('.tmpcoder-lottie-animations-wrapper'),
            lottieJSON = JSON.parse(lottieAnimations.attr('data-settings'));

        var animation = lottie.loadAnimation({
          container: lottieAnimations[0], // Required
          path: lottieAnimations.attr('data-json-url'), // Required
          renderer: lottieJSON.lottie_renderer, // Required
          loop: 'yes' === lottieJSON.loop ? true : false, // Optional
          autoplay: 'yes' === lottieJSON.autoplay ? true : false
        });

        animation.setSpeed(lottieJSON.speed);

        if( lottieJSON.reverse ) {
            animation.setDirection(-1);
        } 

        animation.addEventListener('DOMLoaded', function () {
            
            if ( 'hover' !== lottieJSON.trigger && 'none' !== lottieJSON.trigger ) {
            
            // if ( 'viewport' === lottieJSON.trigger ) {
                initLottie('load');
                $(window).on('scroll', initLottie);
            }
            
            if ( 'hover' === lottieJSON.trigger ) {
                animation.pause();
                lottieAnimations.hover(function () {
                    animation.play();
                }, function () {
                    animation.pause();
                });
            }

            function initLottie(event) {
                animation.pause();

                if (typeof lottieAnimations[0].getBoundingClientRect === "function") {
                                        
                    var height = document.documentElement.clientHeight;
                    var scrollTop = (lottieAnimations[0].getBoundingClientRect().top)/height * 100;
                    var scrollBottom = (lottieAnimations[0].getBoundingClientRect().bottom)/height * 100;
                    var scrollEnd = scrollTop < lottieJSON.scroll_end;
                    var scrollStart = scrollBottom > lottieJSON.scroll_start;

                    if ( 'viewport' === lottieJSON.trigger ) {
                        scrollStart && scrollEnd ? animation.play() : animation.pause();
                    }
                    
                    if ( 'scroll' === lottieJSON.trigger ) {
                        if( scrollStart && scrollEnd) {
                            animation.pause();
                            
                            // $(window).scroll(function() {
                                // calculate the percentage the user has scrolled down the page
                                var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
                             
                                var scrollPercentRounded = Math.round(scrollPercent);
                        
                                animation.goToAndStop( (scrollPercentRounded / 100) * 4000); // why 4000
                            // });
                        }
                    };
                }
            }
        });
    }

    /* Lottie Aimation End */

    const widgetSection = function( $scope, $ ) {

        if ( $scope.attr('data-tmpcoder-particles') || $scope.find('.tmpcoder-particle-wrapper').attr('data-tmpcoder-particles-editor') ) {
            particlesEffect();
        }

        if ( $scope.hasClass('tmpcoder-jarallax') || $scope.hasClass('tmpcoder-jarallax-yes') ) {
            parallaxBackground();
        }

        if ( $scope.hasClass('tmpcoder-parallax-yes') ) {
            parallaxMultiLayer();
        }

        if ( $scope.hasClass('tmpcoder-sticky-section-yes') ) {
            stickySection();
        }

        function stickySection() {
            var positionType = !editorCheck() ? $scope.attr('data-tmpcoder-position-type') : $scope.find('.tmpcoder-sticky-section-yes-editor').attr('data-tmpcoder-position-type'),
                positionLocation = !editorCheck() ? $scope.attr('data-tmpcoder-position-location') : $scope.find('.tmpcoder-sticky-section-yes-editor').attr('data-tmpcoder-position-location'),
                positionOffset = !editorCheck() ? $scope.attr('data-tmpcoder-position-offset') : $scope.find('.tmpcoder-sticky-section-yes-editor').attr('data-tmpcoder-position-offset'),
                viewportWidth = $('body').prop('clientWidth') + 17,
                availableDevices = !editorCheck() ? $scope.attr('data-tmpcoder-sticky-devices') : $scope.find('.tmpcoder-sticky-section-yes-editor').attr('data-tmpcoder-sticky-devices'),
                activeDevices = !editorCheck() ? $scope.attr('data-tmpcoder-active-breakpoints') : $scope.find('.tmpcoder-sticky-section-yes-editor').attr('data-tmpcoder-active-breakpoints'),
                stickySectionExists = $scope.hasClass('tmpcoder-sticky-section-yes') || $scope.find('.tmpcoder-sticky-section-yes-editor') ? true : false,
                positionStyle,
                adminBarHeight,
                stickyEffectsOffset = 0,
                stickyHideDistance = 0,
                $window = $(window),
                prevScrollPos = $window.scrollTop(),
                stickyHeaderFooter = '',
                stickyAnimation = 'none',
                stickyAnimationHide = '',
                headerFooterZIndex = !editorCheck() ? $scope.attr('data-tmpcoder-z-index') : $scope.find('.tmpcoder-sticky-section-yes-editor').attr('data-tmpcoder-z-index'),
                stickType = !editorCheck() ? $scope.attr('data-tmpcoder-sticky-type') : $scope.find('.tmpcoder-sticky-section-yes-editor').attr('data-tmpcoder-sticky-type');

                var distanceFromTop = $scope.offset().top;

                if ( $scope.data('settings').sticky_animation ) {
                    stickyAnimation = $scope.data('settings').sticky_animation;
                } else {
                    stickyAnimation = $scope.find('.tmpcoder-sticky-section-yes-editor').attr('data-tmpcoder-sticky-animation');
                }

                var stickyAnimDuration = $scope.attr('data-tmpcoder-animation-duration') ? $scope.attr('data-tmpcoder-animation-duration') + 's' : 500 + 's';

                // if ( editorCheck() ) { // needs different approach
                //  if ( $scope.next('section').length > 0 && ($scope.next('section').offset().top < ($scope.offset().top + $scope.height())) ) {
                //      $scope.next('section').css('margin-top', $scope.offset().top + $scope.height() + 'px');
                //  }
                // }

            if ( $scope.closest('div[data-elementor-type="wp-post"]').length > 0 ) {
                stickyHeaderFooter = $scope.closest('div[data-elementor-type="wp-post"]');
            } else if ( $scope.closest('div[data-elementor-type="header"]').length > 0 ) {
                stickyHeaderFooter = $scope.closest('div[data-elementor-type="header"]');
            } else if ( $scope.closest('div[data-elementor-type="footer"]').length > 0 ) {
                stickyHeaderFooter = $scope.closest('div[data-elementor-type="footer"]');
            }

            if ( !$scope.find('.tmpcoder-sticky-section-yes-editor').length) {
                positionType = $scope.attr('data-tmpcoder-position-type');
                positionLocation = $scope.attr('data-tmpcoder-position-location');
                positionOffset = $scope.attr('data-tmpcoder-position-offset');
                availableDevices = $scope.attr('data-tmpcoder-sticky-devices');
                activeDevices = $scope.attr('data-tmpcoder-active-breakpoints');
                headerFooterZIndex = $scope.attr('data-tmpcoder-z-index');
            }

            if ( 'top' === positionLocation && 'auto' === $scope.css('top') ) {
                var offsetTop = 0;
                $scope.css('top', 0);
            } else {
                var offsetTop = +$scope.css('top').slice(0, -2);
            }

            if ( 0 == availableDevices.length ) {
                positionType = 'relative';
            }

            if ( editorCheck() && availableDevices ) {
                var attributes = $scope.find('.tmpcoder-sticky-section-yes-editor').attr('data-tmpcoder-sticky-devices');
                $scope.attr('data-tmpcoder-sticky-devices', attributes);
                availableDevices = $scope.attr('data-tmpcoder-sticky-devices');
            }

            changePositionType();
            changeAdminBarOffset();

            $(window).smartresize(function() { 
                distanceFromTop = $scope.offset().top;
                viewportWidth = $('body').prop('clientWidth') + 17;
                if ( $(window).scrollTop() <= stickyEffectsOffset ) {
                    changePositionType();
                }
            });
            
            if (!stickySectionExists) {
                positionStyle = 'relative';
            }

            function changePositionType() {
                if ( !$scope.hasClass('tmpcoder-sticky-section-yes') && !$scope.find('.tmpcoder-sticky-section-yes-editor') ) {
                    positionStyle = 'relative';
                    return;
                }

                var checkDevices = [['mobile_sticky', 768], ['mobile_extra_sticky', 881], ['tablet_sticky', 1025], ['tablet_extra_sticky', 1201], ['laptop_sticky', 1216],  ['desktop_sticky', 2400], ['widescreen_sticky', 4000]];
                var emptyVariables = [];

                var checkedDevices = checkDevices.filter((item, index) => {
                    return activeDevices.indexOf(item[0]) != -1;
                }).reverse();
                
                checkedDevices.forEach((device, index) => {
                    if ( device[1] > viewportWidth ) {
                        var deviceName = device[0].replace("_sticky", "");

                        if ( 'desktop' == deviceName ) {
                            if ( $scope.data('settings') ) {
                                stickyEffectsOffset = distanceFromTop + $scope.data('settings').tmpcoder_sticky_effects_offset;
                            } else {
                                stickyEffectsOffset = distanceFromTop + $scope.find('.tmpcoder-sticky-section-yes-editor').attr('data-tmpcoder-offset-settings');
                            }
                        } else {
                            if ( $scope.data('settings') ) {
                                stickyEffectsOffset = distanceFromTop + $scope.data('settings')['tmpcoder_sticky_effects_offset_' + deviceName];
                            } else {
                                stickyEffectsOffset = distanceFromTop + $scope.find('.tmpcoder-sticky-section-yes-editor').attr('data-tmpcoder-offset-settings');
                            }
                        }

                        if ( availableDevices.indexOf(device[0]) === -1 ) {
                            positionStyle = activeDevices?.indexOf(device[0]) !== -1 ? 'relative' : (emptyVariables[index - 1] ? emptyVariables[index - 1] : positionType);
                            // positionStyle = activeDevices && activeDevices.indexOf(device[0]) !== -1 ? 'static' : (emptyVariables[index - 1] ? emptyVariables[index - 1] : positionType);
                            emptyVariables[index] = positionStyle;
                        } else if ( availableDevices.indexOf(device[0]) !== -1 ) {
                            positionStyle = positionType;
                        }
                    }
                });

                var handleScroll = function() {
                    let scrollPos = $window.scrollTop();
                    
                    if ( 'fixed' != positionStyle ) {
                        if ( scrollPos > distanceFromTop) {
                            applyPosition();
                        } else if ( scrollPos <= distanceFromTop ) {
                            $scope.css({'position': 'relative' });
                        }
                    }

                    if ( 'relative' !== positionStyle ) {
                        stickyEffectsOffset = 0;
                        if ( scrollPos > stickyEffectsOffset ) {
                            if ( 'yes' == $scope.data('tmpcoder-replace-header') ) {

                                if ( 'yes' === $scope.data('tmpcoder-sticky-hide') ) {

                                    if ( scrollPos >= distanceFromTop ) {
                                        $scope.addClass('tmpcoder-visibility-hidden');
                                    }

                                    if ( scrollPos < prevScrollPos) {
                                        $scope.next().addClass('tmpcoder-hidden-header').addClass('tmpcoder-' + stickyAnimation + '-in');
                                    }
                                } else {
                                    $scope.addClass('tmpcoder-visibility-hidden');
                                    $scope.next().addClass('tmpcoder-hidden-header').addClass('tmpcoder-' + stickyAnimation + '-in');
                                }
                            } else {
                                $scope.addClass('tmpcoder-sticky-header');
                            }
                        } else if ( scrollPos <= stickyEffectsOffset ) {
                            if ( 'yes' == $scope.data('tmpcoder-replace-header') ) {
                                $scope.next().removeClass('tmpcoder-hidden-header');
                                $scope.removeClass('tmpcoder-visibility-hidden');
                                $scope.next().removeClass('tmpcoder-' + stickyAnimation + '-in');
                            } else {
                                $scope.removeClass('tmpcoder-sticky-header');
                            }
                        }
                    }

                    if ( 'yes' === $scope.data('tmpcoder-sticky-hide') ) {
                        distanceFromTop = 0;
                        if ( scrollPos >= distanceFromTop ) {
                            if ( scrollPos < prevScrollPos ) {
                                // Scrolling up
                                if ( 'yes' === $scope.data('tmpcoder-replace-header') ) {
                                    $scope.next().removeClass('tmpcoder-' + stickyAnimation + '-out');
                                    $scope.next().addClass('tmpcoder-' + stickyAnimation + '-in');
                                } else {
                                    $scope.removeClass('tmpcoder-' + stickyAnimation + '-out');
                                    $scope.addClass('tmpcoder-' + stickyAnimation + '-in');
                                }
                            } else {
                                // Scrolling down or no direction change
                                if ( 'yes' === $scope.data('tmpcoder-replace-header') ) {
                                    $scope.next().removeClass('tmpcoder-' + stickyAnimation + '-in');
                                    $scope.next().addClass('tmpcoder-' + stickyAnimation + '-out');
                                } else {
                                    $scope.removeClass('tmpcoder-' + stickyAnimation + '-in');
                                    $scope.addClass('tmpcoder-' + stickyAnimation + '-out');
                                }
                            }
                        }
                        
                        // else if ( scrollPos <= stickyHideDistance ) {
                        //  // At or above the top
                        //  $scope.removeClass('tmpcoder-sticky-hide');
                        // }    
                    }

                    // Clear any previous timeout
                    clearTimeout(scrollEndTimeout);
                  
                    // Set a new timeout to update prevScrollPos after 150 milliseconds (adjust the delay as needed)
                    scrollEndTimeout = setTimeout(() => {
                      prevScrollPos = scrollPos;
                    }, 10);
                }

                // const debouncedHandleScroll = _.debounce(handleScroll, 50);
                
                if ( 'sticky' == positionStyle ) {
                    // $(window).scroll(debouncedHandleScroll);
                    $(window).scroll(handleScroll);
                    
                    // $(window).scroll(function() {
                    //  debounceScroll(handleScroll, 50);
                    // });
                } else if ( 'fixed' == positionStyle ) {
                    applyPosition();
                    $(window).scroll(handleScroll);
                }

                if ( 'yes' == $scope.data('tmpcoder-replace-header') ) {
                    $scope.next().get(0).style.setProperty('--tmpcoder-animation-duration', stickyAnimDuration);
                }
                
                function debounceScroll(method, delay) {
                    clearTimeout(method._tId);
                    method._tId= setTimeout(function(){
                        method();
                    }, delay);
                }

                let scrollEndTimeout;
            }
            
            function applyPosition() {
                var bottom = +window.innerHeight - (+$scope.css('top').slice(0, -2) + $scope.height());
                var top = +window.innerHeight - (+$scope.css('bottom').slice(0, -2) + $scope.height());

                if ( 'yes' === $scope.data('tmpcoder-sticky-hide') && prevScrollPos < $window.scrollTop() ) {
                    return;
                }

                if ( '' == stickType ) {
                    stickType = 'fixed';
                }
                
                $scope.css({'position': stickType });
            }

            function changeAdminBarOffset() {   
                if ( $('#wpadminbar').length ) {
                    adminBarHeight = $('#wpadminbar').css('height').slice(0, $('#wpadminbar').css('height').length - 2);
                    // if ( 'top'  ===  positionLocation && ( 'fixed' == $scope.css('position')  || 'sticky' == $scope.css('position') ) ) {
                    if ( 'top'  ===  positionLocation && ( 'fixed' == $scope.css('position') ) ) {
                        $scope.css('top', +adminBarHeight + offsetTop + 'px');
                        $scope.css('bottom', 'auto');
                    } 
                }
            }
        }

        function particlesEffect() {
            var elementType = $scope.data('element_type'),
                sectionID = $scope.data('id'),
                particlesJSON = ! editorCheck() ? $scope.attr('data-tmpcoder-particles') : $scope.find('.tmpcoder-particle-wrapper').attr('data-tmpcoder-particles-editor');

            if ( ('section' === elementType || 'container' === elementType) && undefined !== particlesJSON ) {
                // Frontend
                if ( ! editorCheck() ) {
                    $scope.prepend('<div class="tmpcoder-particle-wrapper" id="tmpcoder-particle-'+ sectionID +'"></div>');

                    particlesJS('tmpcoder-particle-'+ sectionID, $scope.attr('particle-source') == 'tmpcoder_particle_json_custom' ? JSON.parse(particlesJSON) : modifyJSON(particlesJSON));

                    setTimeout(function() {
                        window.dispatchEvent(new Event('resize'));
                    }, 500);

                    setTimeout(function() {
                        window.dispatchEvent(new Event('resize'));
                    }, 1500);
                // Editor
                } else {
                    if ( $scope.hasClass('tmpcoder-particle-yes') ) {
                        particlesJS( 'tmpcoder-particle-'+ sectionID, $scope.find('.tmpcoder-particle-wrapper').attr('particle-source') == 'tmpcoder_particle_json_custom' ? JSON.parse(particlesJSON) : modifyJSON(particlesJSON));

                        $scope.find('.elementor-column').css('z-index', 9);

                        setTimeout(function() {
                            window.dispatchEvent(new Event('resize'));
                        }, 500);

                        setTimeout(function() {
                            window.dispatchEvent(new Event('resize'));
                        }, 1500);
                    } else {
                        $scope.find('.tmpcoder-particle-wrapper').remove();
                    }
                }
            }
        }

        function modifyJSON(json) {
            var wpJson = JSON.parse(json),
                particles_quantity = ! editorCheck() ? $scope.attr('tmpcoder-quantity') : $scope.find('.tmpcoder-particle-wrapper').attr('tmpcoder-quantity'),
                particles_color = ! editorCheck() ? $scope.attr('tmpcoder-color') || '#000000' : $scope.find('.tmpcoder-particle-wrapper').attr('tmpcoder-color') ? $scope.find('.tmpcoder-particle-wrapper').attr('tmpcoder-color') : '#000000',
                particles_speed = ! editorCheck() ? $scope.attr('tmpcoder-speed') : $scope.find('.tmpcoder-particle-wrapper').attr('tmpcoder-speed'),
                particles_shape = ! editorCheck() ? $scope.attr('tmpcoder-shape') : $scope.find('.tmpcoder-particle-wrapper').attr('tmpcoder-shape'),
                particles_size = ! editorCheck() ? $scope.attr('tmpcoder-size')  : $scope.find('.tmpcoder-particle-wrapper').attr('tmpcoder-size');
            
            wpJson.particles.size.value = particles_size;
            wpJson.particles.number.value = particles_quantity;
            wpJson.particles.color.value = particles_color;
            wpJson.particles.shape.type = particles_shape;
            wpJson.particles.line_linked.color = particles_color;
            wpJson.particles.move.speed = particles_speed;
            
            return wpJson;
        }

        function parallaxBackground() {
            if ( $scope.hasClass('tmpcoder-jarallax-yes') ) {
                if ( ! editorCheck() && $scope.hasClass('tmpcoder-jarallax') ) {
                    $scope.css('background-image', 'url("' + $scope.attr('bg-image') + '")');
                    $scope.jarallax({
                        type: $scope.attr('scroll-effect'),
                        speed: $scope.attr('speed-data'),
                    });
                } else if ( editorCheck() ) {
                    $scope.css('background-image', 'url("' + $scope.find('.tmpcoder-jarallax').attr('bg-image-editor') + '")');
                    $scope.jarallax({
                        type: $scope.find('.tmpcoder-jarallax').attr('scroll-effect-editor'),
                        speed: $scope.find('.tmpcoder-jarallax').attr('speed-data-editor')
                    });
                }
            } 
        }

        function parallaxMultiLayer() {
            if ( $scope.hasClass('tmpcoder-parallax-yes') ) {
                var scene = document.getElementsByClassName('tmpcoder-parallax-multi-layer');

                var parallaxInstance = Array.from(scene).map(item => {
                    return new Parallax(item, {
                        invertY: item.getAttribute('direction') == 'yes' ? true : false,
                        invertX: item.getAttribute('direction') == 'yes' ? true : false,
                        scalarX: item.getAttribute('scalar-speed'),
                        scalarY: item.getAttribute('scalar-speed'),
                        hoverOnly: true,
                        pointerEvents: true
                    });
                });

                parallaxInstance.forEach(parallax => {
                    parallax.friction(0.2, 0.2);
                });
            }
            // if ( ! editorCheck() ) {                        
                var newScene = [];

                document.querySelectorAll('.tmpcoder-parallax-multi-layer').forEach((element, index) => {
                    element.parentElement.style.position = "relative";
                    element.style.position = "absolute";
                    newScene.push(element);
                    element.remove();
                });

                document.querySelectorAll('.tmpcoder-parallax-ml-children').forEach((element, index) => {
                    element.style.position = "absolute";
                    element.style.top = element.getAttribute('style-top');
                    element.style.left = element.getAttribute('style-left');
                });

                $('.tmpcoder-parallax-yes').each(function(index) {
                    $(this).append(newScene[index]);
                });
            // }
        }

        // ***** Container Spasing Start ***** //

        function container_spacer(){
            var win = jQuery(window).width();

            var con = 0;
            if (jQuery('.elementor-section-boxed .elementor-container').length)
            {
                con = jQuery('.elementor-section-boxed .elementor-container').width();
            }

            var total = (win - con) / 2;

            jQuery('.tmpcoder-dynamic-padding-left').css('padding-left', total);
            jQuery('.tmpcoder-dynamic-padding-right').css('padding-right', total);
        }

        $( window ).on( 'load', function() {
            container_spacer();
        });

        $(window).resize(function(){
            container_spacer();
        });

    }    

    const widgetAdvancedText = function( $scope, $ ) {

        if ( $scope.hasClass('tmpcoder-advanced-text-style-animated') ) {
            var animText = $scope.find( '.tmpcoder-anim-text' ),
                animLetters = $scope.find( '.tmpcoder-anim-text-letters' ),
                animDuration = animText.attr( 'data-anim-duration' ),
                animDurationData = animDuration.split( ',' ),
                animLoop = animText.attr( 'data-anim-loop' ),
                animTextLength = animText.find('b').length,
                animTextCount = 0;

            animText.find('b').first().addClass('tmpcoder-anim-text-visible');
                
            // set animation timing
            var animDuration = parseInt( animDurationData[0], 10),
                animDelay = parseInt( animDurationData[1], 10),
                //type effect
                selectionDuration = 500,
                typeAnimationDelay = selectionDuration + 800;

            initHeadline();
        }

        function loadLongShadow() {

            var $clippedText = $scope.find( '.tmpcoder-clipped-text' ),
                clippedOption = $clippedText.data('clipped-options'),
                currentDeviceMode = elementorFrontend.getCurrentDeviceMode();

            if ( clippedOption ) {
                var longShadowSize = clippedOption.longShadowSize,
                    longShadowSizeTablet = clippedOption.longShadowSizeTablet,
                    longShadowSizeMobile = clippedOption.longShadowSizeMobile;

                if ('desktop' === currentDeviceMode ) {
                   longShadowSize = clippedOption.longShadowSize;
                }

                if ('tablet' === currentDeviceMode && longShadowSizeTablet ) {
                   longShadowSize = longShadowSizeTablet;
                }

                if ('mobile' === currentDeviceMode && longShadowSizeMobile ) {
                   longShadowSize = longShadowSizeMobile;
                }

                $clippedText.find('.tmpcoder-clipped-text-long-shadow').attr('style','text-shadow:'+longShadow( clippedOption.longShadowColor, longShadowSize, clippedOption.longShadowDirection ));
            }
        }

        loadLongShadow();

        $(window).on('resize', function() {
            loadLongShadow();
        });

        function initHeadline() {
            //insert <i> element for each letter of a changing word
            singleLetters(animLetters.find('b'));
            //initialise headline animation
            animateHeadline(animText);
        }

        function singleLetters($words) {
            $words.each(function() {
                var word = $(this),
                    letters = word.text().split(''),
                    selected = word.hasClass('tmpcoder-anim-text-visible');
                for (var i in letters) {
                    var letter = letters[i].replace(/ /g, '&nbsp;');
                
                    letters[i] = (selected) ? '<i class="tmpcoder-anim-text-in">' + letter + '</i>': '<i>' + letter + '</i>';
                }
                var newLetters = letters.join('');
                word.html(newLetters).css('opacity', 1);
            });
        }

        function animateHeadline($headlines) {
            var duration = animDelay;
            $headlines.each(function(){
                var headline = $(this),
                    spanWrapper = headline.find('.tmpcoder-anim-text-inner');
                
                if (headline.hasClass('tmpcoder-anim-text-type-clip')){
                    var newWidth = spanWrapper.outerWidth();
                        spanWrapper.css('width', newWidth);
                }

                //trigger animation
                setTimeout(function(){
                    hideWord( headline.find('.tmpcoder-anim-text-visible').eq(0) );
                }, duration);

                // Fix Bigger Words Flip
                if ( headline.hasClass( 'tmpcoder-anim-text-type-rotate-1' ) ) {
                    spanWrapper.find( 'b' ).each(function() {
                        if ( $(this).outerWidth() > spanWrapper.outerWidth() ) {
                            spanWrapper.css( 'width', $(this).outerWidth() );
                        }
                    });
                }
            });
        }

        function hideWord($word) {
            var nextWord = takeNext($word);
            
            if ( animLoop !== 'yes' ) {

                animTextCount++;
                if ( animTextCount === animTextLength ) {
                    return;
                }

            }
           
            if ( $word.parents('.tmpcoder-anim-text').hasClass('tmpcoder-anim-text-type-typing') ) {
                var parentSpan = $word.parent('.tmpcoder-anim-text-inner');
                parentSpan.addClass('tmpcoder-anim-text-selected').removeClass('waiting'); 
                setTimeout(function(){ 
                    parentSpan.removeClass('tmpcoder-anim-text-selected'); 
                    $word.removeClass('tmpcoder-anim-text-visible').addClass('tmpcoder-anim-text-hidden').children('i').removeClass('tmpcoder-anim-text-in').addClass('tmpcoder-anim-text-out');
                }, selectionDuration);
                setTimeout(function(){ showWord(nextWord, animDuration) }, typeAnimationDelay);
            
            } else if ( $word.parents('.tmpcoder-anim-text').hasClass('tmpcoder-anim-text-letters') ) {

                var bool = ( $word.children( 'i' ).length >= nextWord.children( 'i' ).length ) ? true : false;
                    hideLetter($word.find('i').eq(0), $word, bool, animDuration);
                    showLetter(nextWord.find('i').eq(0), nextWord, bool, animDuration);

            }  else if ( $word.parents('.tmpcoder-anim-text').hasClass('tmpcoder-anim-text-type-clip') ) {
                $word.parents('.tmpcoder-anim-text-inner').animate({ width : '2px' }, animDuration, function(){
                    switchWord($word, nextWord);
                    showWord(nextWord);
                });

            } else {
                switchWord($word, nextWord);
                setTimeout(function(){ hideWord(nextWord) }, animDelay);
            }

        }

        function showWord($word, $duration) {
            if ( $word.parents( '.tmpcoder-anim-text' ).hasClass( 'tmpcoder-anim-text-type-typing' ) ) {
                showLetter( $word.find( 'i' ).eq(0), $word, false, $duration );
                $word.addClass( 'tmpcoder-anim-text-visible' ).removeClass( 'tmpcoder-anim-text-hidden' );

            } else if ( $word.parents( '.tmpcoder-anim-text' ).hasClass( 'tmpcoder-anim-text-type-clip' ) ) {
                $word.parents( '.tmpcoder-anim-text-inner' ).animate({ 'width' : $word.outerWidth() }, animDuration, function() { 
                    setTimeout( function() {
                        hideWord($word);
                    }, animDelay ); 
                });
            }
        }

        function hideLetter($letter, $word, $bool, $duration) {
            $letter.removeClass('tmpcoder-anim-text-in').addClass('tmpcoder-anim-text-out');
            
            if ( !$letter.is(':last-child') ) {
                setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
            } else if ( $bool ) { 
                setTimeout(function(){ hideWord(takeNext($word)) }, animDelay);
            }

            if ( $letter.is(':last-child') ) {
                var nextWord = takeNext($word);
                switchWord($word, nextWord);
            } 
        }

        function showLetter($letter, $word, $bool, $duration) {
            $letter.addClass('tmpcoder-anim-text-in').removeClass('tmpcoder-anim-text-out');
            
            if(!$letter.is(':last-child')) { 
                setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
            } else { 
                if($word.parents('.tmpcoder-anim-text').hasClass('tmpcoder-anim-text-type-typing')) { setTimeout(function(){ $word.parents('.tmpcoder-anim-text-inner').addClass('waiting'); }, 200);}
                if(!$bool) { setTimeout(function(){ hideWord($word) }, animDelay) }
            }
        }

        function takeNext($word) {
            return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
        }

        function takePrev($word) {
            return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
        }

        function switchWord($oldWord, $newWord) {
            $oldWord.removeClass('tmpcoder-anim-text-visible').addClass('tmpcoder-anim-text-hidden');
            $newWord.removeClass('tmpcoder-anim-text-hidden').addClass('tmpcoder-anim-text-visible');
        }

        function longShadow( shadowColor, shadowSize, shadowDirection ) {
         
            var textshadow = '';

            for ( var i = 0, len = shadowSize; i < len; i++ ) {
                switch ( shadowDirection ) {
                    case 'top':
                        textshadow += '0 -'+ i +'px 0 '+ shadowColor +',';
                    break;

                    case 'right':
                        textshadow += i +'px 0 0 '+ shadowColor +',';
                    break;

                    case 'bottom':
                        textshadow += '0 '+ i +'px 0 '+ shadowColor +',';
                    break;

                    case 'left':
                        textshadow += '-'+ i +'px 0 0 '+ shadowColor +',';
                    break;

                    case 'top-left':
                        textshadow += '-'+ i +'px -'+ i +'px 0 '+ shadowColor +',';
                    break;

                    case 'top-right':
                        textshadow += i +'px -'+ i +'px 0 '+ shadowColor +',';
                    break;

                    case 'bottom-left':
                        textshadow += '-'+ i +'px '+ i +'px 0 '+ shadowColor +',';
                    break;

                    case 'bottom-right':
                        textshadow += i +'px '+ i +'px 0 '+ shadowColor +',';
                    break;

                    default:
                        textshadow += i +'px '+ i +'px 0 '+ shadowColor +',';
                    break;
                }
            }

            textshadow = textshadow.slice(0, -1);

            return textshadow;
        }

    }

    const widgetSearch = function( $scope )
    {
        var isFound = false;

        $scope.find('.tmpcoder-search-form-input').on( {
            focus: function() {
                $scope.addClass( 'tmpcoder-search-form-input-focus' );
            },
            blur: function() {
                $scope.removeClass( 'tmpcoder-search-form-input-focus' );
            }
        } );
        
        if ( $scope.find('.tmpcoder-category-select').length > 0 ) {
            // Set the selected value on page load
            $(document).ready(function() {
                var tmpcoderSelectedCategory = localStorage.getItem('tmpcoderSelectedCategory');
                if (tmpcoderSelectedCategory) {
                    $scope.find('.tmpcoder-category-select option').each(function() {
                        if ($(this).val() === tmpcoderSelectedCategory) {
                            isFound = true;
                            $scope.find('.tmpcoder-category-select').val(tmpcoderSelectedCategory);
                            return false; // Breaks out of the .each() loop
                        } else {
                            $scope.find('.tmpcoder-category-select').val(0);
                        }
                    });
                }
            });

            $scope.find('.tmpcoder-category-select').on('change', function(e) {
                
                var selectedValue = $(this).val();
                localStorage.setItem('tmpcoderSelectedCategory', selectedValue);

                if ($scope.find('.tmpcoder-search-form-input').attr('ajax-search') === 'yes') {
                    postsOffset = 0;
                    $scope.find('.tmpcoder-data-fetch').hide();
                    $scope.find('.tmpcoder-data-fetch ul').html('');
                    ajaxSearchCall($scope.find('.tmpcoder-search-form-input'), postsOffset, e);
                }
            });
        }

        // if ( $scope.find('.tmpcoder-search-input-hidden') ) {
        //  $scope.find('.tmpcoder-search-form-submit').on('click', function(e) {
        //      e.preventDefault();
        //      if ($scope.find('input').hasClass('tmpcoder-search-input-hidden')) {
        //          $scope.find('input').removeClass('tmpcoder-search-input-hidden');
        //      } else {
        //          $scope.find('input').addClass('tmpcoder-search-input-hidden');
        //          $scope.find('.tmpcoder-search-form-input').val('');
        //          $scope.find('.tmpcoder-data-fetch').slideUp(200);
        //          setTimeout(function() {
        //              $scope.find('.tmpcoder-data-fetch ul').html('');
        //              $scope.find('.tmpcoder-no-results').remove();
        //          }, 400);
        //          postsOffset = 0;
        //      }
        //  });
        // }

        var prevData;
        var searchTimeout = null;

        function ajaxSearchCall(thisObject, postsOffset, e) {
            if ( e.which === 13 ) {
                return false;
            }

            if (searchTimeout != null) {
                clearTimeout(searchTimeout);
            }
            var optionPostType = ($scope.find('.tmpcoder-category-select').length > 0 && $scope.find('.tmpcoder-category-select').find('option:selected').data('post-type'));
            var tmpcoderTaxonomyType = $scope.find('.tmpcoder-search-form-input').attr('tmpcoder-taxonomy-type');

            if ( $scope.find('.tmpcoder-category-select').length > 0) {
                if (!tmpcoderTaxonomyType) {
                    if ($scope.find('.tmpcoder-search-form-input').attr('tmpcoder-query-type') == 'product') {
                        tmpcoderTaxonomyType = 'product_cat';
                    } else {
                        tmpcoderTaxonomyType = 'category';
                    }
                }
            }

            searchTimeout = setTimeout(() => {
                var thisValue = thisObject.val();
                $.ajax({
                    type: 'POST',
                    url: tmpcoder_plugin_script.ajax_url,
                    data: { 
                        action: 'tmpcoder_data_fetch',
                        nonce: tmpcoder_plugin_script.nonce,
                        tmpcoder_keyword: $scope.find('.tmpcoder-search-form-input').val(),
                        tmpcoder_query_type: $scope.find('.tmpcoder-search-form-input').attr('tmpcoder-query-type'),
                        tmpcoder_option_post_type: optionPostType ? $scope.find('.tmpcoder-category-select').find('option:selected').data('post-type') : '',
                        tmpcoder_taxonomy_type: tmpcoderTaxonomyType,
                        tmpcoder_category: $scope.find('.tmpcoder-category-select').length > 0 ? $scope.find('.tmpcoder-category-select').val() : '',
                        tmpcoder_number_of_results: $scope.find('.tmpcoder-search-form-input').attr('number-of-results'),
                        tmpcoder_search_results_offset: postsOffset,
                        tmpcoder_show_description: $scope.find('.tmpcoder-search-form-input').attr('show-description'),
                        tmpcoder_number_of_words: $scope.find('.tmpcoder-search-form-input').attr('number-of-words'),
                        tmpcoder_show_ajax_thumbnail: $scope.find('.tmpcoder-search-form-input').attr('show-ajax-thumbnails'),
                        tmpcoder_show_view_result_btn: $scope.find('.tmpcoder-search-form-input').attr('show-view-result-btn'),
                        tmpcoder_view_result_text: $scope.find('.tmpcoder-search-form-input').attr('view-result-text'),
                        tmpcoder_no_results: $scope.find('.tmpcoder-search-form-input').attr('no-results'),
                        tmpcoder_exclude_without_thumb: $scope.find('.tmpcoder-search-form-input').attr('exclude-without-thumb'),
                        tmpcoder_ajax_search_link_target: $scope.find('.tmpcoder-search-form-input').attr('link-target'),
                        // tmpcoder_ajax_search_img_size: $scope.find('.tmpcoder-search-form-input').attr('ajax-search-img-size')
                    },
                    success: function(data) {
                        $scope.closest('section').addClass('tmpcoder-section-z-index');
                        if ( $scope.find('.tmpcoder-data-fetch ul').html() === '' ) {
                            $scope.find( '.tmpcoder-pagination-loading' ).hide();
                            $scope.find('.tmpcoder-data-fetch ul').html( data );
                            $scope.find('.tmpcoder-no-more-results').fadeOut(100);
                            setTimeout(function() {
                                if (!data.includes('tmpcoder-no-results')) {
                                    $scope.find('.tmpcoder-ajax-search-pagination').css('display', 'flex');
                                    if ( $scope.find('.tmpcoder-data-fetch ul').find('li').length < $scope.find('.tmpcoder-search-form-input').attr('number-of-results') ||
                                        $scope.find('.tmpcoder-data-fetch ul').find('li').length == $scope.find('.tmpcoder-data-fetch ul').find('li').data('number-of-results')) {
                                        $scope.find('.tmpcoder-ajax-search-pagination').css('display', 'none');
                                        $scope.find('.tmpcoder-load-more-results').fadeOut(100);
                                    } else {
                                        $scope.find('.tmpcoder-ajax-search-pagination').css('display', 'flex');
                                        $scope.find('.tmpcoder-load-more-results').fadeIn(100);
                                    }
                                } else {
                                    $scope.find('.tmpcoder-ajax-search-pagination').css('display', 'none');
                                }
                            }, 100);
                            prevData = data;
                        } else {
                            if ( data != prevData ) {
                                prevData = data;
                                if (data.includes('tmpcoder-no-results')) {
                                    $scope.find('.tmpcoder-ajax-search-pagination').css('display', 'none');
                                    $scope.find('.tmpcoder-data-fetch ul').html('');
                                    $scope.closest('section').removeClass('tmpcoder-section-z-index');
                                } else {
                                    $scope.find('.tmpcoder-ajax-search-pagination').css('display', 'flex');
                                }

                                $scope.find('.tmpcoder-data-fetch ul').append( data );

                                if (data == '') {
                                    $scope.find('.tmpcoder-load-more-results').fadeOut(100);
                                    setTimeout(function() {
                                        $scope.find( '.tmpcoder-pagination-loading' ).hide();
                                        $scope.find('.tmpcoder-no-more-results').fadeIn(100);
                                    }, 100);
                                } else {
                                    $scope.find( '.tmpcoder-pagination-loading' ).hide();
                                    $scope.find('.tmpcoder-load-more-results').show();
                                }

                                if ($scope.find('.tmpcoder-data-fetch ul').find('li').length < $scope.find('.tmpcoder-search-form-input').attr('number-of-results')) {
                                    $scope.find('.tmpcoder-load-more-results').fadeOut(100);
                                    setTimeout(function() {
                                        $scope.find( '.tmpcoder-pagination-loading' ).hide();
                                        $scope.find('.tmpcoder-no-more-results').fadeIn(100);
                                    }, 100);
                                } else {
                                    $scope.find('.tmpcoder-load-more-results').show();
                                }

                                if ( $scope.find('.tmpcoder-data-fetch ul').find('li').length == $scope.find('.tmpcoder-data-fetch ul').find('li').data('number-of-results') ) {
                                    $scope.find('.tmpcoder-load-more-results').fadeOut(100);
                                    setTimeout(function() {
                                        $scope.find( '.tmpcoder-pagination-loading' ).hide();
                                        $scope.find('.tmpcoder-no-more-results').fadeIn(100);
                                    }, 100);
                                } else {
                                    $scope.find('.tmpcoder-load-more-results').show();
                                }
                                // $scope.find( '.tmpcoder-pagination-loading' ).hide();
                            }
                        }

                        if (data.includes('tmpcoder-no-results')) {
                            $scope.find('.tmpcoder-ajax-search-pagination').css('display', 'none');
                            $scope.find('.tmpcoder-load-more-results').fadeOut();
                        } else {
                            $scope.find('.tmpcoder-ajax-search-pagination').css('display', 'flex');
                        }
                        
                        if (thisValue.length > 2) {
                            $scope.find('.tmpcoder-data-fetch').slideDown(200);
                            $scope.find('.tmpcoder-data-fetch ul').fadeTo(200, 1);
                        } else {
                            $scope.find('.tmpcoder-data-fetch').slideUp(200);
                            $scope.find('.tmpcoder-data-fetch ul').fadeTo(200, 0);
                            setTimeout(function() {
                                $scope.find('.tmpcoder-data-fetch ul').html('');
                                $scope.find('.tmpcoder-no-results').remove();
                                $scope.closest('section').removeClass('tmpcoder-section-z-index');
                            }, 600);
                            postsOffset = 0;
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
            }, 400);
        }

        if ($scope.find('.tmpcoder-search-form-input').attr('ajax-search') === 'yes') {

            $scope.find('.tmpcoder-search-form').attr('autocomplete', 'off');
            
            var postsOffset = 0;
            // $scope.find('.tmpcoder-data-fetch ul').on('scroll', function(e) { 
            //  if ( $(this).scrollTop() + $(this).innerHeight() >=  $(this)[0].scrollHeight ) {
            //      postsOffset += +$scope.find('.tmpcoder-search-form-input').attr('number-of-results');
            //      ajaxSearchCall($scope.find('.tmpcoder-search-form-input'), postsOffset, e);
            //  }
            // });

            $scope.find('.tmpcoder-load-more-results').on('click', function(e) {
                postsOffset += +$scope.find('.tmpcoder-search-form-input').attr('number-of-results');
                $scope.find('.tmpcoder-load-more-results').hide();
                $scope.find( '.tmpcoder-pagination-loading' ).css( 'display', 'inline-block' );
                ajaxSearchCall($scope.find('.tmpcoder-search-form-input'), postsOffset, e);
            });

            $scope.find('.tmpcoder-search-form-input').on('keyup', function(e) {
                postsOffset = 0;
                $scope.find('.tmpcoder-data-fetch').hide();
                $scope.find('.tmpcoder-data-fetch ul').html('');
                ajaxSearchCall($(this), postsOffset, e);
            });

            $scope.find('.tmpcoder-data-fetch').on('click', '.tmpcoder-close-search', function() {
                $scope.find('.tmpcoder-search-form-input').val('');
                $scope.find('.tmpcoder-data-fetch').slideUp(200);
                setTimeout(function() {
                    $scope.find('.tmpcoder-data-fetch ul').html('');
                    $scope.find('.tmpcoder-no-results').remove();
                    $scope.closest('section').removeClass('tmpcoder-section-z-index');
                }, 400);
                postsOffset = 0;
            });

            $('body').on('click', function(e) {
                if ( !e.target.classList.value.includes('tmpcoder-data-fetch') && !e.target.closest('.tmpcoder-data-fetch') ) {
                    if ( !e.target.classList.value.includes('tmpcoder-search-form') && !e.target.closest('.tmpcoder-search-form') ) {
                        $scope.find('.tmpcoder-search-form-input').val('');
                        $scope.find('.tmpcoder-data-fetch').slideUp(200);
                        setTimeout(function() {
                            $scope.find('.tmpcoder-data-fetch ul').html('');
                            $scope.find('.tmpcoder-no-results').remove();
                            $scope.closest('section').removeClass('tmpcoder-section-z-index');
                        }, 400);
                        postsOffset = 0;
                    }
                }
            });

            var mutationObserver = new MutationObserver(function(mutations) {
                $scope.find('.tmpcoder-data-fetch li').on('click', function() {
                    var itemUrl = $(this).find('a').attr('href');
                    var itemUrlTarget = $(this).find('a').attr('target');
                    window.open(itemUrl, itemUrlTarget).focus();
                });
            });

            // Listen to Mini Cart Changes
            mutationObserver.observe($scope[0], {
                childList: true,
                subtree: true,
            });
        }
    // End widgetSearch
    }

    jQuery(window).on('elementor/frontend/init', function () {

        jQuery(document).on("click", '.dialog-lightbox-widget .elementor-video-container', function(e) {
            jQuery(".dialog-close-button").trigger("click");
        });

        $(function () {
            $(window).resize();
        });

        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-search.default', widgetSearch);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-mailchimp.default', widgetMailchimp);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-back-to-top.default', widgetBackToTop);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-countdown.default', Countdown);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-progress-bar.default', widgetProgressBar);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-feature-list.default', widgetFeatureList);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-flip-box.default', widgetFlipBox);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-posts-timeline.default', widgetPostsTimeline);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-media-grid.default', widgetPostGrid);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-post-grid.default', widgetPostGrid);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-woo-category-grid-pro.default', widgetPostGrid);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-category-grid-pro.default', widgetPostGrid);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-nav-menu.default', widgetNavMenu);
        elementorFrontend.hooks.addAction('frontend/element_ready/tmpcoder-woo-grid.default', widgetPostGrid);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-testimonial.default",
            widgetTestimonialCarousel);
        elementorFrontend.hooks.addAction("frontend/element_ready/global",
            widgetSection);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-advanced-text.default",
            widgetAdvancedText);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-onepage-nav.default",
            widgetOnepageNav);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-offcanvas.default",
            widgetOffcanvas);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-reading-progress-bar.default",
            widgetReadingProgressBar);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-content-ticker.default",
            widgetContentTicker);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-woo-add-to-cart.default",
            widgetProductAddToCart);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-flip-carousel.default",
            widgetFlipCarousel);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-image-accordion.default",
            widgetImageAccordion);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-data-table.default",
            widgetDataTable);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-advanced-slider.default",
            widgetAdvancedSlider); 
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-before-after.default",
            widgetBeforeAfter);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-magazine-grid.default",
            widgetMagazineGrid);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-image-hotspots.default",
            widgetImageHotspots);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-lottie-animations.default",
            widgetLottieAnimations);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-mega-menu.default",
            widgetMegaMenu);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-product-media.default",
            widgetProductMedia);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-advanced-accordion.default",
            widgetAdvancedAccordion);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-wishlist-button-pro.default",
            widgetWishlistButton);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-wishlist-pro.default",
            widgetWishlist);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-mini-wishlist-pro.default",
            widgetMiniWishlist);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-compare-button-pro.default",
            widgetCompareButton);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-mini-compare-pro.default",
            widgetMiniCompare);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-compare-pro.default",
            widgetCompare);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-taxonomy-list.default",
            widgetTaxonomyList);
        elementorFrontend.hooks.addAction("frontend/element_ready/tmpcoder-product-mini-cart.default",
            widgetProductMiniCart);
    })

    jQuery('.tmpcoder-testimonial-prev-arrow').on('click', function(e) {
        e.stopPropagation();
        var slide = hasRtl() ? 'slickNext' : 'slickPrev';
        jQuery(this).parent().parent().find('.tmpcoder-testimonial-carousel').slick(slide);

        console.log(slide);
    });

    jQuery('.tmpcoder-testimonial-next-arrow').on('click', function(e) {
        e.stopPropagation();
        var slide = hasRtl() ? 'slickPrev' : 'slickNext';
        jQuery(this).parent().parent().find('.tmpcoder-testimonial-carousel').slick(slide);
    });

    jQuery('.tmpcoder-grid-slider-prev-arrow').on('click', function(e) {
        e.stopPropagation();
        var slide = hasRtl() ? 'slickNext' : 'slickPrev';
        jQuery(this).parent().prev().slick(slide);
    });

    jQuery('.tmpcoder-grid-slider-next-arrow').on('click', function(e) {
        e.stopPropagation();
        var slide = hasRtl() ? 'slickPrev' : 'slickNext';
        jQuery(this).parent().prev().slick(slide);
    });

}(jQuery));

// Resize Function - Debounce
(function($,sr){

  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

