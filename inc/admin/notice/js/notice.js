const installRequiredTheme = function() {

    jQuery(document).on('click','#tmpcoder-install-active-theme-from-notice',function(){

        $this = jQuery(this);
        var status = $this.data('status');
        $this.attr('disabled','disabled');

        if (status == 'active')
        {
            activeRequiredTheme();
        }
        else if(status == 'install')
        {
            $this.text(tmpcoder_ajax_object.installing);
            wp.updates.installTheme({
                slug: 'sastrawp',
                success: function() {
                    activeRequiredTheme();
                }
            });
        }
    });
}

installRequiredTheme();
const activeRequiredTheme = function() {

    $this.text(tmpcoder_ajax_object.activating);
    jQuery.post(
        tmpcoder_ajax_object.ajax_url,
        {
            action: 'tmpcoder_activate_required_theme',
            nonce: tmpcoder_ajax_object.nonce,
        },
        function(response){
            window.location.href= tmpcoder_ajax_object.welcome_url;
        }
    );
} 