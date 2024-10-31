(function($){

    function showNotice(message, messageType) {
        $('.theme-wizard-main').before('<div class="theme-wizard-notice notice notice-'+ messageType +'">'+ message +'</div>');
    }

    function addRightSign(tab_type=''){
        if ( $('[data-tab="'+ tab_type +'"] .wizard-right-sign').length == 0 ){
            $('[data-tab="'+ tab_type +'"]').append('<span class="wizard-right-sign dashicons dashicons-yes-alt"></span>');
        }
    }

    function removeNotice() {
        $(".theme-wizard-notice").slideUp(300, function() { $(this).remove(); });
    }
        
    function activeThemeTab(){
        $('[data-tab="theme-installation"]').addClass('nav-tab-active');
        $('#theme-installation').addClass('active');
    }

    activeThemeTab();

    if ( tmpcoderMessages.wizard_step == '' ){
        $('[data-tab="theme-installation"]').addClass('nav-tab-active');
        $('#theme-installation').addClass('active');
    }else if ( tmpcoderMessages.wizard_step == '1' ){
        addRightSign('theme-installation');
        $('[data-tab="theme-installation"]').addClass('disabled');

        setTimeout(() => {
            console.log('install-plugins');
            console.log($('[data-tab="install-plugins"]').length);
            console.log($('[data-tab="theme-installation"]').length);

            $('[data-tab="install-plugins"]').removeClass('disabled');
            $('[data-tab="install-plugins"]').trigger('click');
        }, 100);

    }else if ( tmpcoderMessages.wizard_step == '2' ){
        addRightSign('theme-installation');
        $('[data-tab="theme-installation"]').addClass('disabled');
        addRightSign('install-plugins');
        $('[data-tab="install-plugins"]').addClass('disabled');
        setTimeout(() => {
            $('[data-tab="license-registration"]').removeClass('disabled');
            $('[data-tab="license-registration"]').trigger('click');
        }, 100);
    }
    else{
        setTimeout(() => {
            $('[data-tab="install-plugins"]').trigger('click');
        }, 100);
    }

    $(document).on('submit', '.theme-installation-frm', function(e){
        e.preventDefault();
        $('.process-loader').removeClass('hide');
        $('.process-loader .loader-text').text(tmpcoderMessages.site_setting_saving);

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: $(this).serialize(),
            // dataType: 'json',
            beforeSend: function () {
                //Before sending, like showing a loading animation                        
            },
            success: function(resp){

                if( resp.includes('00000') ){
                    var dataResp = resp.split('00000');
                    resp = JSON.parse(dataResp[1]);
                }

                $('.process-loader').addClass('hide');
                $('.process-loader .loader-text').text('');

                if( resp.success ){
                    showNotice(resp.data.message, 'success');
                    setTimeout(removeNotice, 5000);

                    addRightSign('theme-installation');
                    $('[data-tab="theme-installation"]').addClass('disabled');
                    $('[data-tab="install-plugins"]').removeClass('disabled');
                    $('[data-tab="install-plugins"]').trigger('click');

                }else{
                    if ( resp?.data?.message != "" ){
                        showNotice(resp.data.message,"error");
                        setTimeout(removeNotice, 5000);
                    }
                }
            },
            error: function(err) {
                $('.process-loader').addClass('hide');
                $('.process-loader .loader-text').text('');
                showNotice(tmpcoderMessages.network_error, "error");
                setTimeout(removeNotice, 5000);
            },
        });
    });
    
    $(document).on('submit', '.install-plugins-form', function(e){
        e.preventDefault();

        $('.process-loader').removeClass('hide');
        $('.process-loader .loader-text').text(tmpcoderMessages.required_plugin_installing);

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: $(this).serialize(),
            beforeSend: function () {
                //Before sending, like showing a loading animation                        
            },
            success: function(resp){

                if( resp.includes('00000') ){
                    var dataResp = resp.split('00000');
                    resp = JSON.parse(dataResp[1]);
                }
                
                $('.process-loader').addClass('hide');
                $('.process-loader .loader-text').text('');

                if( resp.success ){

                    showNotice(resp.data.message, 'success');
                    setTimeout(removeNotice, 5000);

                    addRightSign('install-plugins');
                    $('[data-tab="install-plugins"]').addClass('disabled');
                    $('[data-tab="license-registration"]').removeClass('disabled');
                    $('[data-tab="license-registration"]').trigger('click');

                }else{
                    if ( resp?.data?.message != "" ){
                        showNotice(resp.data.message,"error");
                        setTimeout(removeNotice, 5000);
                    }
                }
            },
            error: function(err) {
                $('.process-loader').addClass('hide');
                $('.process-loader .loader-text').text('');
                showNotice(tmpcoderMessages.network_error, "error");
                setTimeout(removeNotice, 5000);
            },
        });
    });

    function tmpcoder_get_required_plugins_func(){

        $('.process-loader').removeClass('hide');
        $('.process-loader .loader-text').text(tmpcoderMessages.getting_required_plugins);

        var js_exist = $('#templatescoder-core-import-demos-js-extra').length;
        if ( $('#select-demo #templatescoder-core-import-demos-js-extra').length == 1 ) {
            js_exist = 0;
        }

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: "action=tmpcoder_get_required_plugins_func&js_exist="+ js_exist,
            // dataType: 'json',
            beforeSend: function () {
                //Before sending, like showing a loading animation
            },
            success: function(resp){

                $('.process-loader').addClass('hide');
                $('.process-loader .loader-text').text('');

                if( resp.success ){
                    
                    if ( resp?.data?.plugins ){
                        
                        var plg_html = '<div class="feature-section recommended-plugins three-col demo-import-boxed">';
                        if ( resp.data.plugins.length > 0 ){
                            resp.data.plugins.forEach(pluginRow => {
                                plg_html += '<div class="col plugin_box"><div class="theme-grid-box">';
                                plg_html += '<a target="_blank" title="'+ pluginRow.name +'" href="'+ pluginRow.link +'"><img src="'+ pluginRow.image +'" alt="plugin box image" class="demo-preview plugin-preview" loading="lazy"></a>';

                                plg_html += '<div class="action_bar "><span class="plugin_name">'+ pluginRow.name +'</span>';
                                plg_html += '<span class="plugin-card-plugin action_button active">';
                                if ( pluginRow.activated ){
                                    plg_html += '<label>'+ tmpcoderMessages.installed_and_activated +'</label>';
                                }else if ( pluginRow.installed ){
                                    plg_html += '<input type="checkbox" class="plugin-checkbox" name="plugins['+ pluginRow.slug +']" value="1" checked readonly /><label>'+ tmpcoderMessages.installed_and_activate +'</label>';
                                }else{
                                    plg_html += '<input type="checkbox" class="plugin-checkbox" name="plugins['+ pluginRow.slug +']" value="1" checked readonly /><label>'+ tmpcoderMessages.install_and_activate +'</label>';
                                }
                                plg_html += '</span>';
                                plg_html += '</div>';

                                plg_html += '</div></div>';
                            });
                        }
                        plg_html += '</div>';

                        plg_html += tmpcoderMessages.form_nonce; // nonce passing.
                        
                        plg_html += '<div class="next-step-action"><input type="hidden" name="action" value="tmpcoder_install_required_plugins_func" />';

                        if ( resp.data.next_step ){
                            plg_html += '<button type="submit" class="button button-primary next-step-btn">'+ resp.data.next_step +'</button>';
                        }else{
                            plg_html += '<button type="submit" class="button button-primary next-step-btn">'+ tmpcoderMessages.next_step_btn +'</button>';
                        }
                        plg_html += '</div>';

                        plg_html = '<h2 class="wizard-heading">'+ tmpcoderMessages.install_required_plugins +'</h2><p class="wizard-title-text">'+ tmpcoderMessages.install_required_plugins_text +'</p><form class="install-plugins-form" method="POST">'+ plg_html +'</form>';

                        $('#install-plugins .tmpcoder-message-box').html(plg_html);
                    }
                }else{
                }
            },
            error: function(err) {
                $('.process-loader').addClass('hide');
                $('.process-loader .loader-text').text('');
            },
        });
    }

    var getlicenseinfo = 0;
    function tmpcoder_wizard_pro_addons_info(){

        $('.process-loader').removeClass('hide');
        $('.process-loader .loader-text').text(tmpcoderMessages.loading_license_form);

        var js_exist = $('#templatescoder-core-import-demos-js-extra').length;
        if ( $('#select-demo #templatescoder-core-import-demos-js-extra').length == 1 ) {
            js_exist = 0;
        }

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: "action=tmpcoder_wizard_pro_addons_info&js_exist="+ js_exist,
            // dataType: 'json',
            beforeSend: function () {
                //Before sending, like showing a loading animation
            },
            success: function(resp){
                
                if( resp.success ){
                    $('.process-loader').addClass('hide');
                    $('.process-loader .loader-text').text('');
                    $('#license-registration .tmpcoder-message-box').html(resp.data.data);
                }else{

                    if ( getlicenseinfo == 0 ){ 
                        // retry 1 time because elementor redirect problem solution
                        getlicenseinfo = 1;
                        tmpcoder_wizard_pro_addons_info();
                    }else{
                        $('.process-loader').addClass('hide');
                        $('.process-loader .loader-text').text('');
                        $('#license-registration .tmpcoder-message-box').html(tmpcoderMessages.license_error);
                    }
                }
            },
            error: function(err) {
                console.log('err', err);
                $('.process-loader').addClass('hide');
                $('.process-loader .loader-text').text('');
            },
        });
    }

    $(document).on('click', '.theme-wizard-nav .nav-tab', function(){
        if ( $(this).hasClass('disabled') ){
            return;
        }
        const parentRef = $(this).closest('.theme-wizard-nav');
        const tab_id = $(this).attr('data-tab');
        parentRef.find('.nav-tab').removeClass('nav-tab-active');
        $('.tab-content').removeClass('active');
        $(this).addClass('nav-tab-active');
        $('#'+ tab_id).addClass('active');

        if ( tab_id == 'install-plugins' ){
            tmpcoder_get_required_plugins_func();
        }

        if ( tab_id == 'license-registration' ){
            tmpcoder_wizard_pro_addons_info();
        }
    });

    // $(document).on('click', '#import-process-complete-popup .popup-close2', function(e){
    //     e.preventDefault();
    //     window.location.href = '<?php echo esc_js(admin_url('admin.php?page=sastra-welcome')); ?>';
    //     return false;
    // });

    jQuery(document).on('click', '.tmpcoder-skip-wizard-link', function(){
        console.log("skip-theme-wizard");
        if ( confirm("Head’s up. This action is non reversible and you won’t be able to see this wizard again. Proceed?") ){
            var tmpcoder_admin_url = $(this).data('url');
            window.location.href = tmpcoder_admin_url;
        }
    });

})(jQuery)