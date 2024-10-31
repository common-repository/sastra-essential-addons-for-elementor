var welcomeScreenFunctions = {

  desabledUnusedWidget: function(){

    jQuery('.tmpcoder-btn-unused').click( function() {

      var action = 'tmpcoder_get_elementor_pages';
      var _nonce_key = welcomeScreen.ajax_nonce

      jQuery.ajax({
          url:welcomeScreen.ajax_url,
          method:'POST',
          data: 
          {
              action: action,
              _ajax_nonce: _nonce_key,
          },
          beforeSend: function() {
            jQuery('.welcome-backend-loader').fadeIn();
            jQuery('.tmpcoder-theme-welcome').css('opacity','0.5');
          }
      })
      .done( function( response ) {

          if (response.success == true)
          {

            var currentURL = window.location.href;
            window.location.href = TmpcodersanitizeURL(currentURL);
            jQuery('.welcome-backend-loader').fadeOut();
            jQuery('.tmpcoder-theme-welcome').css('opacity','1');   
          }
          else
          {
            var currentURL = window.location.href;
            window.location.href = TmpcodersanitizeURL(currentURL);
            jQuery('.welcome-backend-loader').fadeOut();
            jQuery('.tmpcoder-theme-welcome').css('opacity','1');     
          }
      })
      .fail( function( error ) {
          console.log(error);
      })
    })
  },

  setGlobalFonts: function(){

    jQuery('.set-global-fonts-btn').click( function(e) {

      var action = 'tmpcoder_set_global_fonts';
      var _nonce_key = welcomeScreen.ajax_nonce

      var confirmReset = confirm('Are you sure ?.\n Use the Global Options to set and apply selected fonts globally across all widgets.');

      if (confirmReset)
      {
        jQuery.ajax({
            url:welcomeScreen.ajax_url,
            method:'POST',
            data: 
            {
                action: action,
                _ajax_nonce: _nonce_key,
            },
            beforeSend: function() {
              jQuery('.set-global-fonts-popup').fadeIn();
              jQuery('.tmpcoder-condition-popup-wrap').fadeIn();     
              jQuery('.set-global-loader').css('display','flex');
              jQuery('.set-global-font-success').css('display','none');
            }
        })
        .done( function( response ) {

            if (response.success == true)
            {
              jQuery('.set-global-loader').css('display','none');
              jQuery('.set-global-font-success').css('display','flex');

              setTimeout(function() {
                  jQuery('.tmpcoder-condition-popup-wrap').fadeOut();
              }, 1700);
            }
            else
            {
              jQuery('.tmpcoder-condition-popup-wrap').fadeOut();     
            }
        })
        .fail( function( error ) {
            console.log(error);
        })
      }
    });
  },

  upgradeProNotice: function(){
    jQuery('.tmpcoder-upgrade-pro-notice .tmpcoder-upgrade-pro-notice-dismiss').click( function(e) {

        $this = jQuery(this);
        $this.parent().slideUp( 700, function() {
          $this.parent().remove();
        });
        
        var action = 'tmpcoder_upgrade_pro_notice_dismiss';
        var _nonce_key = welcomeScreen.ajax_nonce;
        var activate_pro_notice = jQuery(this).hasClass('activate-pro-notice');
        var activate_theme_notice = jQuery(this).hasClass('activate-theme-notice');

        jQuery.ajax({
          url:welcomeScreen.ajax_url,
            type: 'POST',
            data: {
                action: action,
                nonce: _nonce_key,
                activate_pro_notice: activate_pro_notice,
                activate_theme_notice: activate_theme_notice,
            },
        })
        .done( function( response ) {

            if (response.success == true)
            {
              console.log('Notice dismissed');   
            }
            else
            {
              console.log('Failed to dismiss notice');    
            }
        })
        .fail( function( error ) {
            console.log(error);
        })
    });
  }
};

jQuery( document ).ready( function() {
  welcomeScreenFunctions.desabledUnusedWidget();
  welcomeScreenFunctions.setGlobalFonts();
  welcomeScreenFunctions.upgradeProNotice();
});
