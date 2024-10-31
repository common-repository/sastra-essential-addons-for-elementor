( function( $ ) {

	"use strict";

	// Elementor Editor Popup
	var TmpcoderElementorEditorPopup = {

		loaded: false,

		init: function() {
			window.elementor.on( 'preview:loaded', TmpcoderElementorEditorPopup.loadPreview );
		},

		loadPreview: function() {
			window.elementorFrontend.hooks.addAction( 'frontend/element_ready/shortcode.default', function( $scope ) {
				$scope.find( '.tmpcoder-template-edit-btn' ).on( 'click', TmpcoderElementorEditorPopup.renderPopup );
			} );

			window.elementorFrontend.hooks.addAction( 'frontend/element_ready/tmpcoder-advanced-slider.default', function( $scope ) {
				$scope.find( '.tmpcoder-template-edit-btn' ).on( 'click', TmpcoderElementorEditorPopup.renderPopup );
			} );

			window.elementorFrontend.hooks.addAction( 'frontend/element_ready/tmpcoder-tabs.default', function( $scope ) {
				$scope.find( '.tmpcoder-template-edit-btn' ).on( 'click', TmpcoderElementorEditorPopup.renderPopup );
			} );

			window.elementorFrontend.hooks.addAction( 'frontend/element_ready/tmpcoder-content-toggle.default', function( $scope ) {
				$scope.find( '.tmpcoder-template-edit-btn' ).on( 'click', TmpcoderElementorEditorPopup.renderPopup );
			} );
		},

		renderPopup: function( link ) {
			// Open Editor
			TmpcoderElementorEditorPopup.getPopup().show();

			// Render Iframe
			$( '#tmpcoder-template-editor-popup .dialog-message').html( '<iframe src="' + $( this ).data( 'permalink' ) + '&elementor' + '" id="tmpcoder-template-edit-frame" width="100%" height="100%"></iframe>' );
			
			// Preloading
			$( '#tmpcoder-template-editor-popup .dialog-message').append( '<div id="tmpcoder-template-editor-loading"><div class="elementor-loader-wrapper"><div class="elementor-loader"><div class="elementor-loader-boxes"><div class="elementor-loader-box"></div><div class="elementor-loader-box"></div><div class="elementor-loader-box"></div><div class="elementor-loader-box"></div></div></div><div class="elementor-loading-title">Loading</div></div></div>' );

			// Loaded
			$( '#tmpcoder-template-edit-frame').on( 'load', function() {
				$( '#tmpcoder-template-editor-loading').fadeOut( 300 );
			} );

			// Close
			$( '#tmpcoder-template-editor-popup .dialog-close-button' ).css({
				'right' : '30px',
				'width' : '35px',
				'height' : '35px',
				'line-height' : '30px',
				'border-radius' : '50%',
				'text-align' : 'center',
				'opacity' : '1',
				'background-color' : '#333',
				'box-shadow' : '1px 1px 3px 0 #000',
			}).html( '<i class="eicon-close"></i>');

			$( '#tmpcoder-template-editor-popup .dialog-close-button i' ).css({
				'font-size' : '15px',
				'color' : '#fff',
			})

			$( '#tmpcoder-template-editor-popup .dialog-close-button' ).on( 'click', function() {
				elementor.reloadPreview();
			});
		},

		getPopup: function() {

			if ( ! TmpcoderElementorEditorPopup.loaded ) {
				this.loaded = elementor.dialogsManager.createWidget( 'lightbox', {
					id: 'tmpcoder-template-editor-popup',
					closeButton: true,
					hide: { onBackgroundClick: false }
				} );
			}

			return TmpcoderElementorEditorPopup.loaded;
		}

	};

	$( window ).on( 'elementor:init', TmpcoderElementorEditorPopup.init );


	// Modal Popups
	var TmpcoderModalPopups = {

		init: function() {
			if ( ! $( 'body' ).hasClass( 'elementor-editor-tmpcoder-popups' ) ) {
				return;
			}

			// Load Preview
			window.elementor.on( 'preview:loaded', TmpcoderModalPopups.onPreviewLoad );

			// Change Preview
			window.elementor.on( 'preview:loaded', TmpcoderModalPopups.onPreviewChange );

			// Change Controls
			elementor.settings.page.model.on( 'change', TmpcoderModalPopups.onControlChange );
		},

		onPreviewLoad: function() {
			// Open Popup Settings
			setTimeout(function() {
				$( '#elementor-panel-footer-settings' ).trigger( 'click' );
			}, 2000);

			// Popup Settings Notification
			TmpcoderModalPopups.settingsNotification();

			// Fix Popup Layout
			window.elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {
				var popup = $scope.closest( '.tmpcoder-template-popup' );

				TmpcoderModalPopups.fixPopupLayout( popup );
			} );
		},

		onPreviewChange: function() {
			// preview change code goes here
		},

		onControlChange: function( model ) {
			var iframe = document.getElementById( 'elementor-preview-iframe' ),
				iframeContent = iframe.contentDocument || iframe.contentWindow.document;

			// Popup
			var popup = $( '.tmpcoder-template-popup', iframeContent );

			// Scrollbar
			if ( model.changed.hasOwnProperty( 'popup_height' ) ) {
				// elementor.reloadPreview();
			}

			// Display As
			if ( model.changed.hasOwnProperty( 'popup_display_as' ) ) {
				if ( 'notification' === model.changed['popup_display_as'] ) {
					popup.addClass( 'tmpcoder-popup-notification' );
				} else {
					popup.removeClass( 'tmpcoder-popup-notification' );
				}
			}

			if ( model.changed.hasOwnProperty( 'popup_display_as' ) ) {

			}

			// Entrance Animation
			if ( model.changed.hasOwnProperty( 'popup_animation' ) ) {
				var popupContainer = popup.find('.tmpcoder-popup-container');

				popupContainer.removeAttr( 'class');
				popupContainer.addClass( 'tmpcoder-popup-container animated '+ model.changed['popup_animation'] );
			}
		},

		fixPopupLayout: function( popup ) {
			var settings = TmpcoderModalPopups.getDocumentSettings();

			// Add Scrollbar
			if ( ! popup.find('.tmpcoder-popup-container-inner').hasClass('ps') ) {
				const ps = new PerfectScrollbar(popup.find('.tmpcoder-popup-container-inner')[0], {
					suppressScrollX: true
				});
			}

			if ( 'notification' === settings.popup_display_as ) {
				popup.addClass( 'tmpcoder-popup-notification' );
			}
		},

		getDocumentSettings: function() {
			var documentSettings = {},
				settings = elementor.settings.page.model;

			jQuery.each(settings.getActiveControls(), function (controlKey) {
				documentSettings[controlKey] = settings.attributes[controlKey];
			});

			return documentSettings;
		},

		settingsNotification: function() {
			// Get Close Time
			var closeTime = JSON.parse( localStorage.getItem( 'TmpcoderPopupEditorNotification') ) || {};

			if ( closeTime + 604800000 >= Date.now() ) {
				return;
			}

			// Notification HTML
			var nHTML = '\
				<div id="tmpcoder-template-settings-notification">\
					<h4><i class="eicon-info-circle"></i><span>Please Note</span></h4>\
					<p>Click here to access <strong>Popup Settings</strong>.</p>\
					<i class="eicon-close"></i>\
				</div>\
			';

			// Render Notification
			$( 'body' ).append( nHTML ).hide().fadeIn();

			// Hide on Click
			$( '#tmpcoder-template-settings-notification .eicon-close' ).on( 'click', function() {
				$( '#tmpcoder-template-settings-notification' ).fadeOut();

				// Save Close Time in Browser
				localStorage.setItem( 'TmpcoderPopupEditorNotification', Date.now() );
			});
		},
	};

	$( window ).on( 'elementor:init', TmpcoderModalPopups.init );


	// Theme Builder
	var TmpcoderTemplateEditor = {

		init: function() {
			if ( ! $( 'body' ).hasClass( 'elementor-editor-tmpcoder-theme-builder' ) ) {
				return;
			}

			// Load Preview
			window.elementor.on( 'preview:loaded', TmpcoderTemplateEditor.onPreviewLoad );
		},

		onPreviewLoad: function() {

			// Open Popup Settings
			setTimeout(function() {
				$( '#elementor-panel-footer-settings' ).trigger( 'click' );
			}, 500 );

			// Popup Settings Notification
			TmpcoderTemplateEditor.settingsNotification();

			// Submit Preview Changes
			$( '#elementor-panel-footer-settings' ).on( 'click', function() {
				setTimeout(function() {

					$( '.elementor-control-submit_preview_changes' ).on( 'click', function() {
						$( '#elementor-panel-saver-button-publish' ).trigger( 'click' );
						$( '#elementor-preview-loading' ).show();


						var saveChanges = setInterval(function() {
							if ( ! $( 'html' ).hasClass( 'nprogress-busy' ) ) {
								location.reload();
								clearInterval(saveChanges);
							}
						}, 500 );
					});
				});
			});

		},

		settingsNotification: function() {
			// Get Close Time
			var closeTime = JSON.parse( localStorage.getItem( 'TmpcoderTemplateEditorNotification') ) || {};

			if ( closeTime + 604800000 >= Date.now() ) {
				return;
			}

			// Notification HTML
			var nHTML = '\
				<div id="tmpcoder-template-settings-notification">\
					<h4><i class="eicon-info-circle"></i><span>Please Note</span></h4>\
					<p>You can change <strong>Preview Settings</strong> here.</p>\
					<i class="eicon-close"></i>\
				</div>\
			';

			setTimeout(function() {
				// Render Notification
				$( 'body' ).append( nHTML ).hide().fadeIn();

				// Set Close Time
				$( document ).on( 'click', function() {
					$( '#tmpcoder-template-settings-notification' ).fadeOut();
				});

				// Hide on Click
				$( '#tmpcoder-template-settings-notification .eicon-close' ).on( 'click', function() {
					$( '#tmpcoder-template-settings-notification' ).fadeOut();

					// Save Close Time in Browser
					localStorage.setItem( 'TmpcoderTemplateEditorNotification', Date.now() );
				});
			}, 1000 );
		},
	};

	$( window ).on( 'elementor:init', TmpcoderTemplateEditor.init );

}( jQuery ) );
