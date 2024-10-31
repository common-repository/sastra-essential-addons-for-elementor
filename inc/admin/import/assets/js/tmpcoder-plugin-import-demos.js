var w = 0;
(function(jQuery) {

"use strict";

jQuery(document).on('click','.import-demo-content', function(e){

    window.requiredPlugins = false; 
    window.requiredTheme = false; 
    window.requiredFiles = false; 
    window.reference = jQuery(this); 

    window.message_text = jQuery('.message-text');
    window.message_error_message = jQuery('.display-error-message');
    window.install_required_plugins = jQuery(this).closest('.import-demo-box').find('.install-required-plugins').attr('data-file');
    window.xml_file_url = jQuery(this).closest('.import-demo-box').find('.xml-file-url').attr('data-file');
    window.redux_file_url = jQuery(this).closest('.import-demo-box').find('.redux-file-url').attr('data-file');
    window.elementor_file_url = jQuery(this).closest('.import-demo-box').find('.elementor-file-url').attr('data-file');
    window.widget_file_url = jQuery(this).closest('.import-demo-box').find('.widget-file-url').attr('data-file');
    window.revslider_file_url = jQuery(this).closest('.import-demo-box').find('.revslider-file-url').attr('data-file');
    window.tmpcoder_cpt_data = jQuery(this).closest('.import-demo-box').find('.tmpcoder-cpt-data').attr('data-file');

    if (!widget_file_url)
    {
        jQuery('[name="importlist[install_widgets]"').parent().parent().remove();
    }
    if (!revslider_file_url)
    {
        jQuery('[name="importlist[install_revslider_data]"').parent().parent().remove();
    }

    window.revslider_file_url = jQuery(this).closest('.import-demo-box').find('.revslider-file-url').attr('data-file');
    window.theme_demo_slug = jQuery(this).closest('.import-demo-box').find('.theme-demo-slug').attr('data-file');
    window.theme_demo_name = jQuery(this).closest('.plugin_box').find('.plugin_name').text();
    window.set_demo_name = jQuery('.demo-name').text('"'+theme_demo_name+'"');
    window.theme_demo_url = jQuery(this).closest('.plugin_box').find('.demo-preview-btn').attr('href');

    var confirmImport = confirm('For the best results, it is recommended to temporarily deactivate All other Active plugins Except Elementor and Sastra Addons for Elementor.\n\nElementor Header, Footer, Pages, Media Files, Menus and some required plugins will be installed on your website.');

    message_text.text(tmpcoder_ajax_object.start_import_message);

    e.preventDefault();

    if (confirmImport){

        message_text.text(tmpcoder_ajax_object.start_import_message);

        import_required_files();
        import_process_popup_open();
        install_require_plugins();
        tmpcoder_fix_plugin_compatibility();

        var installPlugins = setInterval(function() {

            if ( Object.values(requiredPlugins).every(Boolean) && requiredTheme && requiredFiles ) {
                reset_posts();
                clearInterval( installPlugins );
            }
        // Clear
        }, 1000);
    }
});

/**
 * Install/Activate Required Plugin.
*/

const import_required_files = function()
{
    var import_data_action = 'tmpcoder_get_prebuilt_demos';
    var _nonce_key = tmpcoder_ajax_object.nonce

    jQuery.ajax({
        url:tmpcoder_ajax_object.ajax_url,
        method:'POST',
        data: 
        {
            action: import_data_action,
            demo_slug: theme_demo_slug,
            _ajax_nonce: _nonce_key,
        },
        beforeSend: function() {
            reference.text(reference.attr('data-loading'));
            jQuery('#prepare-data-loader').removeClass('hide-import-img-loader');
            jQuery('[name="importlist[install_required_plugins]"').prop('checked', true);
            jQuery('#install-plugin-loader').addClass('hide-import-img-loader');
            setTimeout(function(){
                message_text.text(tmpcoder_ajax_object.delete_previews_demo_message);
            },500);

            var progres = getRandomInt(1,2);
            set_progress_value(progres,0);
        }
    })
    .done( function( response ) {

        if (response.success == true)
        {
            if (response.data.status == 'success') 
            {
                if(response.data.length != 0)
                {
                    xml_file_url = response.data.data[0]["xml-file-url"]; 
                    redux_file_url = response.data.data[0]["redux-file-url"]; 
                    elementor_file_url = response.data.data[0]["elementor-file-url"]; 

                    reference.closest('.import-demo-box').find('.xml-file-url').attr('data-file', xml_file_url);
                    reference.closest('.import-demo-box').find('.elementor-file-url').attr('data-file', redux_file_url);
                    reference.closest('.import-demo-box').find('.redux-file-url').attr('data-file', elementor_file_url);
                    window.requiredFiles = true;
                }
                else
                {
                    message_text.text(response.data.message);        
                }
            }   
        }
        else{
            if (response.data.status == 'error')
            {
                message_text.text(response.data.message);
            }
        }
    })
    .fail( function( error ) {
        console.log(error);
    })
}

/**
 * Install/Activate Required Plugin.
*/

const install_require_plugins = function()
{
    var import_data_action = 'tmpcoder-install-required-plugins';
    var _nonce_key = tmpcoder_ajax_object.nonce

    installRequiredTheme();

    window.requiredPlugins = install_required_plugins !== undefined ? JSON.parse(install_required_plugins) : false;

    // Install Plugins
    if ( requiredPlugins ) {

        if ( false === requiredPlugins['contact-form-7'] ) {
            installPluginViaAjax('contact-form-7');
        }
        
        if ( false === requiredPlugins['redux-framework'] ) {
            installPluginViaAjax('redux-framework');
        }
        
        if ( false === requiredPlugins['woocommerce'] ) {
            installPluginViaAjax('woocommerce');
        }

        if ( false === requiredPlugins['advanced-custom-fields'] ) {
            installPluginViaAjax('advanced-custom-fields');
        }
    }
}

/**
 * Reset Old Imported Post.
*/

const reset_posts = function()
{

    uninstall_process_popup_open();

    var import_data_action = 'tmpcoder-plugin-reset-posts';
    var _nonce_key = tmpcoder_ajax_object.nonce

    jQuery.ajax({
        url:tmpcoder_ajax_object.ajax_url,
        method:'POST',
        data: 
        {
            action: import_data_action,
            _ajax_nonce: _nonce_key,
        },
        beforeSend: function() {
            reference.text(reference.attr('data-loading'));
            jQuery('#prepare-data-loader').removeClass('hide-import-img-loader');
            jQuery('[name="importlist[install_required_plugins]"').prop('checked', true);
            jQuery('#install-plugin-loader').addClass('hide-import-img-loader');
            setTimeout(function(){
                message_text.text(tmpcoder_ajax_object.delete_previews_demo_message);
            },500);

            var progres = getRandomInt(3,5);
            set_progress_value(progres,0);
        }
    })
    .done( function( response ) {

        if (response.success == true)
        {
            var progres = getRandomInt(6,10);
            set_progress_value(progres,1);
            jQuery('[name="importlist[preparing_data]"').prop('checked', true);
            jQuery('#prepare-data-loader').addClass('hide-import-img-loader');
            import_xml(xml_file_url, false, tmpcoder_cpt_data);
        }
    })
    .fail( function( error ) {
        console.log(error);
    })
}

/**
 * Import Site XML Data.
*/

const import_xml = function(file_url, is_retry=false, tmpcoder_cpt_data='') {

    var wxr_url    = file_url;
    var import_data_action  = 'tmpcoder-plugin-import-prepare-xml';
    var _nonce_key = tmpcoder_ajax_object.nonce

    jQuery.ajax({
        url:tmpcoder_ajax_object.ajax_url,
        method:'POST',
        data: 
        {
            wxr_url: wxr_url,
            action: import_data_action,
            _ajax_nonce: _nonce_key,
        },
        beforeSend:  function() {

            var progres = getRandomInt(11,30);
            set_progress_value(progres,2);
            jQuery('#install-content-loader').removeClass('hide-import-img-loader');
            message_text.text(tmpcoder_ajax_object.import_site_content_message);
        }
    })
    .done( function( response ) {

        if (response.success == true)
        {
            if (response.data.url)
            {
                var progres = getRandomInt(31,50);
                set_progress_value(progres,2);
                tmpcoder_wxr_import(response.data.url+'&tmpcoder_cpt_data='+tmpcoder_cpt_data,is_retry);
            }
        }
        else
        {
            if (response.data)
            {
                window.onbeforeunload = null;
                message_text.html(response.data+ ' <a href="">Close popup</a>');
                message_text.addClass('notice notice-error');
                jQuery('#install-content-loader').remove();
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');            
            }
            else
            {
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');            
                message_text.text(tmpcoder_ajax_object.invalid_request_url_message);
            }
        }
    })
    .fail( function( error ) {
        console.log(error);
        window.onbeforeunload = null;
        message_text.html(' <a href="">Close popup</a>');
        message_text.addClass('notice notice-error');
        jQuery('#install-content-loader').remove();
        reference.text(reference.attr('data-id'));
        jQuery('.import-demo-content').removeAttr('style');            
    })
}

const tmpcoder_wxr_import = function(url) {

    var progres = getRandomInt(51,70);
    set_progress_value(progres,2);
    message_text.text(tmpcoder_ajax_object.import_site_content_message);
    message_error_message.removeAttr('style');
    jQuery('.progress-counter').removeAttr('style');
    jQuery('.progress').removeAttr('style');
    const evtSource = new EventSource(url, { withCredentials: true });

    evtSource.onmessage = ( message ) => {
        const eventData = JSON.parse( message.data );
        switch ( eventData.action ) {
            case 'complete':
                if ( false === eventData.error ) {
                    evtSource.close();
                    jQuery('[name="importlist[install_content]"').prop('checked', true);
                    jQuery('#install-content-loader').addClass('hide-import-img-loader');
                    var progres = getRandomInt(71,85);
                    set_progress_value(progres,2);
                    import_redux_options(redux_file_url);   
                } else {
                    message_text.text('');
                    jQuery('.progress-counter').css('display','none');
                    jQuery('.progress').css('display','none');

                    message_error_message.text(tmpcoder_ajax_object.import_site_content_faild_message);            

                    message_error_message.css('color','red');

                    if (url.indexOf('&is_retry=true') != -1)
                    {
                        var update_url = url;
                    }
                    else
                    {
                        var update_url = url+'&is_retry=true';
                    }

                    jQuery('.tmpcoder-retry-import').attr('data-xml-url',update_url);
                    jQuery('.error-message-text-button').css('display','flex');
                }
                break;
        }
    };

    evtSource.onerror = ( error ) => {
        evtSource.close();
        message_text.text('');
        jQuery('.progress-counter').css('display','none');
        jQuery('.progress').css('display','none');

        message_error_message.text(tmpcoder_ajax_object.import_site_content_faild_message);
        message_error_message.css('color','red');

        if (url.indexOf('&is_retry=true') != -1)
        {
            var update_url = url;
        }
        else
        {
            var update_url = url+'&is_retry=true';
        }

        jQuery('.tmpcoder-retry-import').attr('data-xml-url',update_url);          
        jQuery('.error-message-text-button').css('display','flex');          
    };

    evtSource.addEventListener( 'log', function ( message ) {

        const eventLogData = JSON.parse( message.data );
        let importMessage = eventLogData.message || '';

        if ( importMessage && 'info' === eventLogData.level ) {

            importMessage = importMessage.replace( /"/g, function () {
                return '';
            });

            if (importMessage)
            {
                message_text.text(importMessage);
            }
        }
    });
}

/**
 * Import Redux Options.
*/

const import_redux_options  = function(redux_file_url) {

    var redux_file_url      = redux_file_url;
    var import_data_action  = 'tmpcoder-plugin-import-redux-options';
    var _nonce_key = tmpcoder_ajax_object.nonce
    message_text.removeAttr('style');
    message_error_message.removeAttr('style');
    jQuery('.progress-counter').removeAttr('style');
    jQuery('.progress').removeAttr('style');

    jQuery.ajax({
        url:tmpcoder_ajax_object.ajax_url,
        method:'POST',
        data: 
        {
            redux_file_url: redux_file_url,
            tmpcoder_current_active_demo:theme_demo_slug,
            action: import_data_action,
            _ajax_nonce: _nonce_key,
        },
        beforeSend:  function() {
            jQuery('#site-setting-loader').removeClass('hide-import-img-loader');
            message_text.text(tmpcoder_ajax_object.import_site_options_message);
        }
    })
    .done( function( response ) {

        if (response.success == true)
        {
            jQuery('[name="importlist[install_site_settings]"').prop('checked', true);
            jQuery('#site-setting-loader').addClass('hide-import-img-loader');
            var progres = getRandomInt(86,90);
            set_progress_value(progres,3);
            import_elementor_options(elementor_file_url);
        }
        else
        {
            if (response.data)
            {
                window.onbeforeunload = null;
                message_text.html(response.data+ ' <a href="">Close popup</a>');
                message_text.addClass('notice notice-error');
                jQuery('#install-content-loader').remove();
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');
            }
            else
            {
                message_text.text(tmpcoder_ajax_object.import_site_options_failed_message);
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');
            }
        }
    })
    .fail( function( error ) {
        console.log(error);
        window.onbeforeunload = null;
        message_text.html( ' <a href="">Close popup</a>');
        message_text.addClass('notice notice-error');
        jQuery('#install-content-loader').remove();
        reference.text(reference.attr('data-id'));
        jQuery('.import-demo-content').removeAttr('style');
    })
}

/**
 * Import Elementor Settings.
*/

const import_elementor_options = function(elementor_file_url){

    var elementor_file_url  = elementor_file_url;
    var import_data_action  = 'tmpcoder-plugin-import-elementor-options';
    var _nonce_key = tmpcoder_ajax_object.nonce

    jQuery.ajax({
        url:tmpcoder_ajax_object.ajax_url,
        method:'POST',
        data: 
        {
            elementor_file_url: elementor_file_url,
            action: import_data_action,
            _ajax_nonce: _nonce_key,
        },
        beforeSend:  function() {
            jQuery('#elementor-setting-loader').removeClass('hide-import-img-loader');
            message_text.text(tmpcoder_ajax_object.import_elementor_options_message);
        }
    })
    .done( function( response ) {

        if (response.success == true)
        {
            jQuery('[name="importlist[install_elementor_settings]"').prop('checked', true);
            jQuery('#elementor-setting-loader').addClass('hide-import-img-loader');
            var progres = getRandomInt(91,95);
            set_progress_value(progres,4);

            if (widget_file_url)
            {
                reset_widget_data(function(){
                    import_widget_data(widget_file_url);
                });
            }
            else
            {
                end_import();
            }
        }
        else
        {
            if (response.data)
            {
                window.onbeforeunload = null;
                message_text.html(response.data+ ' <a href="">Close popup</a>');
                message_text.addClass('notice notice-error');
                jQuery('#install-content-loader').remove();
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');
            }
            else
            {
                message_text.text(tmpcoder_ajax_object.import_elementor_failed_message);
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');
            }
        }
    })
    .fail( function( error ) {
        console.log(error);
        window.onbeforeunload = null;
        message_text.html( ' <a href="">Close popup</a>');
        message_text.addClass('notice notice-error');
        jQuery('#install-content-loader').remove();
        reference.text(reference.attr('data-id'));
        jQuery('.import-demo-content').removeAttr('style');
    })
} 

/**
 * Reset Widgets Data.
*/

const reset_widget_data = function(callback){

    var import_data_action = 'tmpcoder-plugin-reset-widgets-data';
    var _nonce_key = tmpcoder_ajax_object.nonce

    jQuery.ajax({
        url:tmpcoder_ajax_object.ajax_url,
        method:'POST',
        data: 
        {
            action: import_data_action,
            _ajax_nonce: _nonce_key,
        },
        beforeSend:  function() {
            message_text.text(tmpcoder_ajax_object.reset_widgets_message);
            jQuery('#install-widget-loader').removeClass('hide-import-img-loader');
        }
    })
    .done( function( response ) {

        if (response.success == true)
        {
            console.log('Reset widget data successfully');
            callback();
        }
        else
        {
            if (response.data)
            {
                window.onbeforeunload = null;
                message_text.html(response.data+ ' <a href="">Close popup</a>');
                message_text.addClass('notice notice-error');
                jQuery('#install-content-loader').remove();
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');
            }
            else
            {
                message_text.text(tmpcoder_ajax_object.reset_widgets_failed_message);
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');            
                callback();
            }
        }
    })
    .fail( function( error ) {
        console.log(error);
        callback();
    })
}

/**
 * Import Widgets Data.
*/

const import_widget_data = function(widget_file_url){

    var widget_file_url = widget_file_url;
    var import_data_action  = 'tmpcoder-plugin-import-widgets';
    var _nonce_key = tmpcoder_ajax_object.nonce

    jQuery.ajax({
        url:tmpcoder_ajax_object.ajax_url,
        method:'POST',
        data: 
        {
            widgets_file_url: widget_file_url,
            action: import_data_action,
            _ajax_nonce: _nonce_key,
        },
        beforeSend:  function() {
            jQuery('#install-widget-loader').removeClass('hide-import-img-loader');
            var progres = getRandomInt(95,99);
            set_progress_value(progres,4);
            message_text.text(tmpcoder_ajax_object.importing_widgets_message);
        }
    })
    .done( function( response ) {

        if (response.success == true)
        {
            jQuery('[name="importlist[install_widgets]"').prop('checked', true);
            jQuery('#install-widget-loader').addClass('hide-import-img-loader');
            set_progress_value(100,5);  

            jQuery('.import-demo-content').removeAttr('style');
            message_text.text(tmpcoder_ajax_object.demo_import_success_message);
            end_import();
        }
        else
        {
            if (response.data)
            {
                window.onbeforeunload = null;
                message_text.html(response.data+ ' <a href="">Close popup</a>');
                message_text.addClass('notice notice-error');
                jQuery('#install-content-loader').remove();
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');
            }
            else
            {
                message_text.text(response.data);
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');
            }
        }
    })
    .fail( function( error ) {
        console.log(error);
        window.onbeforeunload = null;
        message_text.html(' <a href="">Close popup</a>');
        message_text.addClass('notice notice-error');
        jQuery('#install-content-loader').remove();
        reference.text(reference.attr('data-id'));
        jQuery('.import-demo-content').removeAttr('style');
    })
}

/**
 * Import Revolution Slider Data.
*/

const import_revslider_data = function(revslider_file_url) {

    var import_data_action = 'tmpcoder-plugin-import-revslider-data';
    var _nonce_key = tmpcoder_ajax_object.nonce

    jQuery.ajax({
        url:tmpcoder_ajax_object.ajax_url,
        method:'POST',
        data: 
        {
            revslider_file_url: revslider_file_url,
            tmpcoder_current_active_demo:theme_demo_slug,
            action: import_data_action,
            _ajax_nonce: _nonce_key,
        },
        beforeSend:  function() {
            jQuery('#revslider-data-loader').removeClass('hide-import-img-loader');
            var progres = getRandomInt(95,99);
            set_progress_value(progres,4);
            message_text.text(tmpcoder_ajax_object.import_revslider_data_message);
        }
    })
    .done( function( response ) {

        if (response.success == true)
        {
            jQuery('[name="importlist[install_revslider_data]"').prop('checked', true);
            jQuery('#revslider-data-loader').addClass('hide-import-img-loader');
            set_progress_value(100,5); 
            end_import();
        }
        else
        {
            if (response.data)
            {
                window.onbeforeunload = null;
                message_text.html(response.data+ ' <a href="">Close popup</a>');
                message_text.addClass('notice notice-error');
                jQuery('#revslider-data-loader').remove();
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');
            }
            else
            {
                message_text.text(tmpcoder_ajax_object.import_revslider_failed_message);
                reference.text(reference.attr('data-id'));
                jQuery('.import-demo-content').removeAttr('style');
            }
        }
    })
    .fail( function( error ) {
        console.log(error);
        window.onbeforeunload = null;
        message_text.html(' <a href="">Close popup</a>');
        message_text.addClass('notice notice-error');
        jQuery('#revslider-data-loader').remove();
        reference.text(reference.attr('data-id'));
        jQuery('.import-demo-content').removeAttr('style');
    })
}

/**
 * Import End.
*/

const end_import = function() 
{
    var import_data_action = 'tmpcoder-plugin-import-end';
    var _nonce_key = tmpcoder_ajax_object.nonce

    jQuery.ajax({
        url:tmpcoder_ajax_object.ajax_url,
        method:'POST',
        data: 
        {
            action: import_data_action,
            tmpcoder_current_active_demo:theme_demo_slug,
            tmpcoder_demo_url: theme_demo_url,
            _ajax_nonce: _nonce_key,
        },
        beforeSend:  function() {
            set_progress_value(100,5);
        }
    })
    .done( function( response ) {
        jQuery('#import-process-complete-popup .popup-content .popup-message').html(tmpcoder_ajax_object.import_process_sucess_message);
        process_complete_popup_open();
        set_progress_value(0,0);
        window.onbeforeunload = null;
    })
    .fail( function( error ) {
        console.log(error);
    })
} 

// Popup code
const import_process_popup_open = function()
{
    jQuery('#import-demo-popup').fadeIn();
    jQuery('.tmpcoder-admin-popup-wrap').fadeIn();
} 

const set_progress_value = function(bar_value, step_value)
{
    jQuery('.progress-counter').text(' '+step_value+'/5 completed');    
    jQuery('.progress-bar').attr('aria-valuenow',bar_value);    
    jQuery('.progress-bar').attr('style','width:'+bar_value+'%');    
    jQuery('.progress-bar').text(bar_value+'%');    
}

function process_complete_popup_open() {
    jQuery('#import-demo-popup').remove();
    jQuery('#uninstall-demo-popup').remove();
    jQuery('.tmpcoder-admin-popup').css('display','inline-block');
    jQuery('#import-process-complete-popup').fadeIn();
}

jQuery(document).on('click', '#import-process-complete-popup .popup-close', function(){
    window.location.reload();
});

// import site
jQuery(document).on('click','.import-button', function(e){
    e.preventDefault();
    import_process_popup_open();
    return false;
})

// temprary
jQuery(document).on('click','.demo-success-button', function(e){
    e.preventDefault();
    jQuery('#import-process-complete-popup .popup-content .popup-message').html(tmpcoder_ajax_object.import_process_sucess_message);
    process_complete_popup_open();
    return false;
})

// temprary
jQuery(document).on('click','.popup-close', function(){
    jQuery('#import-demo-uninstall-popup').fadeOut();
    jQuery('#uninstall-demo-popup').fadeOut();
    jQuery('.tmpcoder-admin-popup').fadeOut();
    jQuery('.tmpcoder-import-popup-wrap').fadeOut();
})

function uninstall_confirm_popup_open() {
    jQuery('#import-demo-uninstall-popup').fadeIn();
    jQuery('.tmpcoder-import-popup-wrap').fadeIn();
    jQuery('.tmpcoder-admin-popup').fadeIn();
    set_progress_value(0,0);
}

function uninstall_process_popup_open() {

    window.onbeforeunload = function(e) {
        return 'Changes that you made may not be saved.';
    };
}
    
const uninstall_demo = function()
{
    var import_data_action = 'tmpcoder-plugin-reset-posts';
    var _nonce_key = tmpcoder_ajax_object.nonce

    jQuery.ajax({
        url:tmpcoder_ajax_object.ajax_url,
        method:'POST',
        data: 
        {
            action: import_data_action,
            _ajax_nonce: _nonce_key,
        },
        beforeSend: function() {
            
            var progres = getRandomInt(1,70);
            jQuery('#uninstall-demo-popup').find('.progress-counter').text('0/1 completed');
            jQuery('#uninstall-demo-popup').find('.progress-bar').text(progres+'%');
            jQuery('#uninstall-demo-popup').find('.progress-bar').attr('aria-valuenow',progres);
            jQuery('#uninstall-demo-popup').find('.progress-bar').attr('style','width:'+progres+'%');
        }
    })
    .done( function( response ) {

        if (response.success == true)
        {
            window.onbeforeunload = null;
            jQuery('#uninstall-demo-popup').find('.progress-counter').text('1/1 completed');
            jQuery('#uninstall-demo-popup').find('.progress-bar').text('100%');
            jQuery('#uninstall-demo-popup').find('.progress-bar').attr('aria-valuenow','100');
            jQuery('#uninstall-demo-popup').find('.progress-bar').attr('style','width:100%');

            jQuery('#import-process-complete-popup .popup-content .popup-message').html(tmpcoder_ajax_object.uninstall_process_sucess_message);

            setTimeout(function(){
                process_complete_popup_open();
            },500)
        }
    })
    .fail( function( error ) {
        console.log(error);
        window.onbeforeunload = null;
    })    
} 

jQuery(document).on('click', '.uninstall-button', function(e){
    e.preventDefault();

    window.theme_demo_name = jQuery(this).closest('.plugin_box').find('.plugin_name').text();

    console.log(theme_demo_name);

    jQuery('.uninstall-demo-name').html('"'+theme_demo_name+'"');

    uninstall_confirm_popup_open();
})        

jQuery(document).on('click','.uninstall-confirm-button', function(e){
    e.preventDefault();
    uninstall_process_popup_open();
    jQuery('#import-demo-uninstall-popup').remove();
    jQuery('#uninstall-demo-popup').fadeIn();
    jQuery('.tmpcoder-admin-popup').css('display','flex');
    uninstall_demo();
})

// temprary
jQuery(document).on('click','.uninstall-success-button', function(e){
    e.preventDefault();
    jQuery('#import-process-complete-popup .popup-content .popup-message').html(tmpcoder_ajax_object.uninstall_process_sucess_message);
    process_complete_popup_open();
    return false;
})

// temprary
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*----- Sticky Elements Header -----*/

jQuery(window).on("scroll", function(){

    var top = jQuery('.tmpcoder-elements-header').length > 0 ? jQuery('.tmpcoder-elements-header').position().top : 0;

    if (top > 500 ) {
        jQuery('.tmpcoder-elements-header').addClass('tmpcoder-elements-header-fixed');
    } else {
        jQuery('.tmpcoder-elements-header').removeClass('tmpcoder-elements-header-fixed');
    }
});

/*----- Sticky Elements Header End -----*/

const installPluginViaAjax = function( slug ) {

    wp.updates.installPlugin({
        slug: slug,
        success: function() {
            jQuery.ajax({
                type: 'POST',
                url: tmpcoder_ajax_object.ajax_url,
                data: {
                    action: 'tmpcoder_activate_required_plugins',
                    plugin: slug,
                    nonce: tmpcoder_ajax_object.nonce,
                },
                success: function( response ) {
                    window.requiredPlugins[slug] = true;
                },
                error: function( response ) {
                    console.log(response);
                    window.requiredPlugins[slug] = true;
                }
            });
        },
        error: function( xhr, ajaxOptions, thrownerror ) {
            console.log(xhr.errorCode)
            if ( 'folder_exists' === xhr.errorCode ) {
                jQuery.ajax({
                    type: 'POST',
                    url: tmpcoder_ajax_object.ajax_url,
                    data: {
                        action: 'tmpcoder_activate_required_plugins',
                        plugin: slug,
                        nonce: tmpcoder_ajax_object.nonce,
                    },
                    success: function( response ) {
                        window.requiredPlugins[slug] = true;
                    }
                });
            }
        },
    });
}

const tmpcoder_fix_plugin_compatibility = function() {
    jQuery.ajax({
        type: 'POST',
        url: tmpcoder_ajax_object.ajax_url,
        data: {
            action: 'tmpcoder_fix_plugin_compatibility',
            nonce: tmpcoder_ajax_object.nonce,
        },
        success: function( response ) {
            console.log('Plugins deactivated successfully!');
        },
        error: function( response ) {
            console.log('No plugins deactivated!');
        }
    });
}

const installRequiredTheme = function() {
    
    var themeStatus = reference.data('theme-status');

    if ( 'req-theme-active' === themeStatus ) {
        window.requiredTheme = true;
        return;
    } else if ( 'req-theme-inactive' === themeStatus ) {
        jQuery.post(
            tmpcoder_ajax_object.ajax_url,
            {
                action: 'tmpcoder_activate_required_theme',
                nonce: tmpcoder_ajax_object.nonce,
            }
        );
        window.requiredTheme = true;
        return;         
    }

    wp.updates.installTheme({
        slug: 'sastrawp',
        success: function() {
            jQuery.post(
                tmpcoder_ajax_object.ajax_url,
                {
                    action: 'tmpcoder_activate_required_theme',
                    nonce: tmpcoder_ajax_object.nonce,
                }
            );
            window.requiredTheme = true;
        }
    });
}

// Search Demo
var searchTimeout = null,
    maingGridHtml = jQuery('.tmpcoder-import-demo-grid').html();
jQuery('.tmpcoder-import-demo-search').find('input').keyup(function(e) {
    if ( e.which === 13 ) {
        return false;
    }

    var val = jQuery(this).val().toLowerCase();

    if (searchTimeout != null) {
        clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(function() {
        searchTimeout = null;
        searchDemo( val, maingGridHtml );
    }, 1000);  
});

// Price Filter
jQuery('.tmpcoder-import-demo-price-filter ul li').on('click', function() {
    var price = jQuery(this).text(),
        price = 'premium' == price.toLowerCase() ? 'pro' : price.toLowerCase();

    fiterFreeProTemplates( price );
    jQuery('.tmpcoder-import-demo-price-filter').children().first().attr( 'data-price', price );
    jQuery('.tmpcoder-import-demo-price-filter').children().first().text( 'Price: '+ jQuery(this).text() );
});

const searchDemo = function( tag, html ) {
    var price = jQuery('.tmpcoder-import-demo-price-filter').children().first().attr( 'data-price' ),
        priceAttr = 'mixed' === price ? '' : '[data-price*="'+ price +'"]';

    if ( '' !== tag ) {
        jQuery('.main-grid .grid-item').hide();
        jQuery('.main-grid .grid-item[data-title*="'+ tag +'"]'+ priceAttr).show();
    } else {
        jQuery('.main-grid').html( html );
        jQuery('.main-grid .grid-item'+ priceAttr).show();
    }

    if ( ! jQuery('.main-grid .grid-item').is(':visible') ) {
        jQuery('.tmpcoder-import-demo-page-title').hide();
        jQuery('.tmpcoder-import-demo-not-found').css('display', 'flex');
    } else {
        jQuery('.tmpcoder-import-demo-not-found').hide();
        jQuery('.tmpcoder-import-demo-page-title').show();
    }

    // Reorder Search accoring to Title match
    jQuery('.main-grid .grid-item:visible').each(function(i){
        if ( '' !== tag ) {
            let title = jQuery(this).attr('data-title');

            if ( -1 === title.indexOf(tag) ) {
                jQuery('.main-grid').append( jQuery(this).remove() );
            }
        }
    });
}

const fiterFreeProTemplates = function( price ) {
    var tag = jQuery('.tmpcoder-import-demo-search').find('input').val(),
        tagAttr = '' === tag ? '' : '[data-title*="'+ tag +'"]';

    if ( 'free' == price ) {
        jQuery('.main-grid .grid-item').hide();
        jQuery('.main-grid .grid-item[data-price*="'+ price +'"]'+ tagAttr).show();
    } else if ( 'pro' == price ) {
        jQuery('.main-grid .grid-item').hide();
        jQuery('.main-grid .grid-item[data-price*="'+ price +'"]'+ tagAttr).show();
    } else {
        jQuery('.main-grid .grid-item'+ tagAttr).show();
    }
}

jQuery(document).on('click','.tmpcoder-retry-import', function(e){
    var retry_url = jQuery(this).attr('data-xml-url');    
    tmpcoder_wxr_import(retry_url);
    jQuery(this).parent().css('display','none');    
});

}(jQuery));