<?php

use Elementor\Utils;
use Elementor\Group_Control_Image_Size;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if (!function_exists('tmpcoder_get_icon')) {
	
	function tmpcoder_get_icon( $icon, $dir ) {
		if ( false !== strpos( $icon, 'svg-' ) ) {
			return tmpcoder_get_svg_icon( $icon, $dir );

		} elseif ( false !== strpos( $icon, 'fa-' ) ) {
			$dir = '' !== $dir ? '-'. $dir : '';
			return wp_kses('<i class="'. esc_attr($icon . $dir) .'"></i>', [
				'i' => [
					'class' => []
				]
			]);
		} else {
			return '';
		}
	}
}

/**
** Get SVG Icon
*/

function tmpcoder_get_svg_icon( $icon, $dir ) {
	$style_attr = '';

	// Rotate Right
	if ( 'right' === $dir ) {
		
		$style_attr = 'class="tmpcoder-right-svg-icon" ';
	}

	$icons = [
		// Arrows
		'svg-angle-1-left' => '<svg '. $style_attr .'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 283.4 512" style="enable-background:new 0 0 283.4 512;" xml:space="preserve"><g><polygon class="st0" points="54.5,256.3 283.4,485.1 256.1,512.5 0,256.3 0,256.3 27.2,229 256.1,0 283.4,27.4 "/></g></svg>', 
		'svg-angle-2-left' => '<svg '. $style_attr .'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 303.3 512" style="enable-background:new 0 0 303.3 512;" xml:space="preserve"><g><polygon class="st0" points="94.7,256 303.3,464.6 256,512 47.3,303.4 0,256 47.3,208.6 256,0 303.3,47.4 "/></g></svg>', 
		'svg-angle-3-left' => '<svg '. $style_attr .'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 291.4 512" style="enable-background:new 0 0 291.4 512;" xml:space="preserve"><g><path class="st0" d="M281.1,451.5c13.8,13.8,13.8,36.3,0,50.1c-13.8,13.8-36.3,13.8-50.1,0L10.4,281C3.5,274.1,0,265.1,0,256c0-9.1,3.5-18.1,10.4-25L231,10.4c13.8-13.8,36.3-13.8,50.1,0c6.9,6.9,10.4,16,10.4,25s-3.5,18.1-10.4,25L85.5,256L281.1,451.5z"/></g></svg>', 
		'svg-angle-4-left' => '<svg '. $style_attr .'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 259.6 512" style="enable-background:new 0 0 259.6 512;" xml:space="preserve"><g><path class="st0" d="M256.6,18.1L126.2,256.1l130.6,237.6c3.6,5.6,3.9,10.8,0.2,14.9c-0.2,0.2-0.2,0.3-0.3,0.3s-0.3,0.3-0.3,0.3c-3.9,3.9-10.3,3.6-14.2-0.3L2.9,263.6c-2-2.1-3.1-4.7-2.9-7.5c0-2.8,1-5.6,3.1-7.7L242,3.1c4.1-4.1,10.6-4.1,14.6,0l0,0C260.7,7.3,260.5,10.9,256.6,18.1z"/></g></svg>', 
		'svg-arrow-1-left' => '<svg '. $style_attr .'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 338.4" style="enable-background:new 0 0 512 338.4;" xml:space="preserve"><g><polygon class="st0" points="511.4,183.1 53.4,183.1 188.9,318.7 169.2,338.4 0,169.2 169.2,0 188.9,19.7 53.4,155.3 511.4,155.3 "/></g></svg>', 
		'svg-arrow-2-left' => '<svg '. $style_attr .'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 320.6" style="enable-background:new 0 0 512 320.6;" xml:space="preserve"><g><polygon class="st0" points="512,184.4 92.7,184.4 194.7,286.4 160.5,320.6 34.3,194.4 34.3,194.4 0,160.2 160.4,0 194.5,34.2 92.7,136 512,136 "/></g></svg>', 
		'svg-arrow-3-left' => '<svg '. $style_attr .'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 499.6 320.6" style="enable-background:new 0 0 499.6 320.6;" xml:space="preserve"><g><path class="st0" d="M499.6,159.3c0.3,7-2.4,13.2-7,17.9c-4.3,4.3-10.4,7-16.9,7H81.6l95.6,95.6c9.3,9.3,9.3,24.4,0,33.8c-4.6,4.6-10.8,7-16.9,7c-6.1,0-12.3-2.4-16.9-7L6.9,177.2c-9.3-9.3-9.3-24.4,0-33.8l16.9-16.9l0,0L143.3,6.9c9.3-9.3,24.4-9.3,33.8,0c4.6,4.6,7,10.8,7,16.9s-2.4,12.3-7,16.9l-95.6,95.6h393.7C488.3,136.3,499.1,146.4,499.6,159.3z"/></g></svg>', 
		'svg-arrow-4-left' => '<svg '. $style_attr .'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 499.6 201.3" style="enable-background:new 0 0 499.6 201.3;" xml:space="preserve"><g><polygon class="st0" points="0,101.1 126,0 126,81.6 499.6,81.6 499.6,120.8 126,120.8 126,201.3 "/></g></svg>', 
	
		// Blockquote
		'svg-blockquote-1' => '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 406.1" style="enable-background:new 0 0 512 406.1;" xml:space="preserve"><g><g id="Layer_2_1_" class="st0"><path class="st1" d="M510.6,301.8c0,57.6-46.7,104.3-104.3,104.3c-12.6,0-24.7-2.3-36-6.4c-28.3-9.1-64.7-29.1-82.8-76.3C218.9,145.3,477.7,0.1,477.7,0.1l6.4,12.3c0,0-152.4,85.7-132.8,200.8C421.8,170.3,510.1,220.2,510.6,301.8z"/><path class="st1" d="M234.6,301.8c0,57.6-46.7,104.3-104.3,104.3c-12.6,0-24.7-2.3-36-6.4c-28.3-9.1-64.7-29.1-82.8-76.3C-57.1,145.3,201.8,0.1,201.8,0.1l6.4,12.3c0,0-152.4,85.7-132.8,200.8C145.9,170.3,234.1,220.2,234.6,301.8z"/></g></g></svg>',
		'svg-blockquote-2' => '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 415.9" style="enable-background:new 0 0 512 415.9;" xml:space="preserve"><g><g class="st0"><polygon class="st1" points="512,0 303.1,208 303.1,415.9 512,415.9 "/><polygon class="st1" points="208.9,0 0,208 0,415.9 208.9,415.9 "/></g></g></svg>',
		'svg-blockquote-3' => '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 369.3" style="enable-background:new 0 0 512 369.3;" xml:space="preserve"><g><g class="st0"><polygon class="st1" points="240.7,0 240.7,240.5 88.1,369.3 88.1,328.3 131.4,240.5 0.3,240.5 0.3,0 "/><polygon class="st1" points="512,43.3 512,238.6 388.1,343.2 388.1,310 423.2,238.6 316.7,238.6 316.7,43.3 "/></g></g></svg>',
		'svg-blockquote-4' => '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 369.3" style="enable-background:new 0 0 512 369.3;" xml:space="preserve"><g><g class="st0"><g><path class="st1" d="M469.1,299.1c-62,79.7-148.7,69.8-148.7,69.8v-86.5c0,0,42.6-0.6,77.5-35.4c20.3-20.3,22.7-65.6,22.8-81.4h-101V-10.9H512v176.6C512.2,184.7,509.4,247.2,469.1,299.1z"/></g><g><path class="st1" d="M149.3,299.1c-62,79.7-148.7,69.8-148.7,69.8v-86.5c0,0,42.6-0.6,77.5-35.4c20.3-20.3,22.7-65.6,22.8-81.4H0V-10.9h192.2v176.6C192.4,184.7,189.7,247.2,149.3,299.1z"/></g></g></g></svg>',
		'svg-blockquote-5' => '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 422.1" style="enable-background:new 0 0 512 422.1;" xml:space="preserve"><g><g class="st0"><polygon class="st1" points="237,0 237,223.7 169.3,422.1 25.7,422.1 53.4,223.7 0,223.7 0,0 "/><polygon class="st1" points="512,0 512,223.7 444.3,422.1 300.7,422.1 328.4,223.7 275,223.7 275,0 "/></g></g></svg>',
		
		// Sharing
		'svg-sharing-1' => '<?xml version="1.0" ?><svg style="enable-background:new 0 0 48 48;" version="1.1" viewBox="0 0 48 48" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Icons"><g id="Icons_15_"><g><path d="M25.03766,20.73608v-3.7207c0-0.3799,0.4135-0.6034,0.7263-0.4023l9.3855,5.9218     c0.3017,0.19,0.3017,0.6146,0,0.8045l-5.1844,3.2738l-1.8659,1.1843l-2.3352,1.4749c-0.3129,0.2011-0.7263-0.0335-0.7263-0.4022     v-3.2403v-0.4916" style="fill:#5F83CF;"/><path d="M29.96506,26.61318l-1.8659,1.1843l-2.3352,1.4749c-0.3128,0.2011-0.7263-0.0335-0.7263-0.4022     v-3.2403v-0.4916c-2.5759,0.1057-5.718-0.3578-7.8439,0.6112c-1.9663,0.8963-3.5457,2.5639-4.2666,4.6015     c-0.1282,0.3623-0.2296,0.7341-0.3029,1.1114v-2.9721c0-1.128,0.2449-2.2513,0.7168-3.2759     c0.4588-0.9961,1.1271-1.8927,1.948-2.6196c0.8249-0.7306,1.8013-1.2869,2.8523-1.6189     c1.5111-0.4774,3.1532-0.4118,4.7155-0.3096c0.7252,0.0475,1.4538,0.0698,2.1808,0.0698" style="fill:#5F83CF;"/></g></g></g></svg>',
		'svg-sharing-2' => '<?xml version="1.0" ?><svg style="enable-background:new 0 0 48 48;" version="1.1" viewBox="0 0 48 48" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Icons"><g id="Icons_16_"><g><path d="M27.775,21.64385L27.775,21.64385l1-0.01h1v1.65l2.17-1.38l0.1-0.06l2.95-1.87l-5.22-3.29v0.87     v0.77h-1l-1-0.02l0,0" style="fill:#5F83CF;"/><path d="M28.775,18.32385c-0.33,0-0.67-0.01-1-0.02c-0.22-0.01-0.43-0.02-0.65-0.04     c-1.3358-0.0496-2.5105-0.0408-3.55,0.24c-0.5,0.16-0.97,0.38-1.41,0.67c-0.26,0.16-0.51,0.34-0.74,0.55     c-0.62,0.54-1.12,1.22-1.47,1.97c-0.35,0.77-0.54,1.62-0.54,2.47v2.24c0.06-0.29,0.13-0.57,0.23-0.84     c0.54-1.53,1.73-2.79,3.22-3.47c1.34-0.61,3.21-0.47,4.91-0.45c0.35,0,0.68,0,1-0.01" style="fill:#5F83CF;"/><path d="M31.945,23.63175l-1.8884,1.1873v3.8702c0,0.5422-0.5142,0.991-1.1499,0.991H16.0432     c-0.6357,0-1.1498-0.4488-1.1498-0.991v-8.7689c0-0.5515,0.5142-1.0002,1.1498-1.0002h3.5525h0.0037     c0.0561-0.0748,0.1739-0.2057,0.2393-0.2618c0.6731-0.5983,1.4864-1.0657,2.3465-1.3368     c0.0467-0.0187,0.0935-0.0281,0.1402-0.0374h-6.2821c-1.6734,0-3.0383,1.1872-3.0383,2.6362v8.7689     c0,1.449,1.3649,2.6269,3.0383,2.6269h12.8634c1.6734,0,3.0383-1.1779,3.0383-2.6269V23.63175z" style="fill:#F2F2F2;"/></g></g></g></svg>',

		'svg-icons' => '',
		
	];
	
	return $icons[$icon];
}

/**
** Get SVG Icons Array
*/

if (!function_exists('tmpcoder_get_svg_icons_array')) {

	function tmpcoder_get_svg_icons_array( $stack, $fa_icons ) {
		$svg_icons = [];

		if ( 'arrows' === $stack ) {
			$svg_icons['svg-angle-1-left'] = esc_html__( 'Angle', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-angle-2-left'] = esc_html__( 'Angle Bold', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-angle-3-left'] = esc_html__( 'Angle Bold Round', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-angle-4-left'] = esc_html__( 'Angle Plane', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-arrow-1-left'] = esc_html__( 'Arrow', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-arrow-2-left'] = esc_html__( 'Arrow Bold', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-arrow-3-left'] = esc_html__( 'Arrow Bold Round', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-arrow-4-left'] = esc_html__( 'Arrow Caret', 'sastra-essential-addons-for-elementor' );

		} elseif ( 'blockquote' === $stack ) {
			$svg_icons['svg-blockquote-1'] = esc_html__( 'Blockquote Round', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-blockquote-2'] = esc_html__( 'Blockquote ST', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-blockquote-3'] = esc_html__( 'Blockquote BS', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-blockquote-4'] = esc_html__( 'Blockquote Edges', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-blockquote-5'] = esc_html__( 'Blockquote Quad', 'sastra-essential-addons-for-elementor' );

		} elseif ( 'sharing' === $stack ) {
			$svg_icons['svg-sharing-1'] = esc_html__( 'sharing 1', 'sastra-essential-addons-for-elementor' );
			$svg_icons['svg-sharing-2'] = esc_html__( 'sharing 2', 'sastra-essential-addons-for-elementor' );
		}

		// Merge FontAwesome and SVG icons
		return array_merge( $fa_icons, $svg_icons );
	}	
}

add_action('wp_ajax_tmpcoder_add_cart_single_product', 'tmpcoder_add_cart_single_product_ajax');
add_action('wp_ajax_nopriv_tmpcoder_add_cart_single_product', 'tmpcoder_add_cart_single_product_ajax');

if (!function_exists('tmpcoder_add_cart_single_product_ajax')) {
	
	function tmpcoder_add_cart_single_product_ajax() {

		add_action( 'wp_loaded', [ 'WC_Form_Handler', 'add_to_cart_action' ], 20 );

		if ( is_callable( [ 'WC_AJAX', 'get_refreshed_fragments' ] ) ) {
	
			WC_AJAX::get_refreshed_fragments();
		}

		die();
	}
}

add_action('woocommerce_after_mini_cart', 'tmpcoder_woocommerce_after_mini_cart');

function tmpcoder_woocommerce_after_mini_cart(){
	echo '<div style="display: none;">
		<input class="refresh-tmpcoder-cart-qty" type="hidden" value="'. esc_attr(WC()->cart->get_cart_contents_count()). '" />
		<div class="refresh-tmpcoder-cart-total">'. esc_html(WC()->cart->get_cart_total()).'</div>
	</div>';
}

/* Update Page Meta Data Start */

add_action('save_post_page','tmpcoder_save_page_meta_data',10,3);

if (!function_exists('tmpcoder_save_page_meta_data')) {
	
	function tmpcoder_save_page_meta_data($post_id, $post, $update){

		if (class_exists('WooCommerce')) {

			if ($update) {
				
				if (get_post_type($post_id) === 'page') {

					$woo_cart_page_id = wc_get_page_id('cart');			
					$woo_shop_page_id = wc_get_page_id('shop');			
					$woo_checkout_page_id = wc_get_page_id('checkout');			
					$woo_myaccount_page_id = wc_get_page_id('myaccount');			
					$add_meta_key = '';

					if ($post_id == $woo_shop_page_id) {
						$add_meta_key = 'tmpcoder_shop_page';  
					}
					elseif ($post_id == $woo_cart_page_id) {
						$add_meta_key = 'tmpcoder_cart_page';  
					}
					elseif ($post_id == $woo_checkout_page_id) {
						$add_meta_key = 'tmpcoder_checkout_page';  
					}
					elseif ($post_id == $woo_myaccount_page_id) {
						$add_meta_key = 'tmpcoder_myaccount_page';  
					}

					if ($add_meta_key != '') {
						update_post_meta($post_id, $add_meta_key, 1); 
					}
				}
			}
		}

        // privacypolicy_page set meta
        $wp_page_for_privacy_policy = get_option('wp_page_for_privacy_policy');
        if ( $wp_page_for_privacy_policy == $post_id ){
            update_post_meta($post_id, 'tmpcoder_privacypolicy_page', 1);
        }
	}
}

/* Update Page Meta Data End */

/* Get Post Id By Post Meta Key Start */

if (!function_exists('tmpcoder_get_post_id_by_meta_key_and_meta_value')) {
					
	function tmpcoder_get_post_id_by_meta_key_and_meta_value( $meta_key='', $meta_value='' ) {

	    global $wpdb;
	    if ($meta_value) {
	    	$post_id = $wpdb->get_var( $wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key = %s AND meta_value = %s ", $meta_key, $meta_value) );
	    }
	    else
	    {
	    	$post_id = $wpdb->get_var( $wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key = %s", $meta_key) );
	    }
	    if( $post_id != '' )
	    return (int) $post_id;

	    return false;
	}
}				

/* Get Post Id By Post Meta Key End */

/*
 * Create Function for display breadcrumb
*/

if (!function_exists('tmpcoder_breadcrumb')) {
	
	function tmpcoder_breadcrumb($delimiter = "") {
	    

	    if ($delimiter == "") {
	        $delimiter = " / ";
	    }

	    if (!defined('TMPCODER_BREAD_DELIMITER')) {
	        define('TMPCODER_BREAD_DELIMITER', $delimiter);
	    }

	    $is_woocommerce = false;
	    if ( class_exists('WooCommerce') ) {
	        if (is_woocommerce()) {
	            $is_woocommerce = true;
	        }
	    }

	    if (!is_home()) {

	        if ( ( is_category() || is_tag() ) && !$is_woocommerce ) {

	            echo wp_kses(tmpcoder_render_category($delimiter), array(
                    'label' => array(
                        'class' => array()
                    ),
                    'a' => array(
                        'href'=> array(),
                    ),
                    'span' => array(
                        'class' => array(),
                    ),

                ));

	        }elseif (is_author()) {

	            echo wp_kses(tmpcoder_render_author($delimiter), array(
                    'label' => array(
                        'class' => array()
                    ),
                    'a' => array(
                        'href'=> array(),
                    ),
                    'span' => array(
                        'class' => array(),
                    ),
                ));
	            
	        }elseif (is_day()) {

	            echo wp_kses(tmpcoder_render_day($delimiter), array(
                    'label' => array(
                        'class' => array()
                    ),
                    'a' => array(
                        'href'=> array(),
                    ),
                    'span' => array(
                        'class' => array(),
                    ),
                ));
	            
	        }elseif (is_month()) {

	            echo wp_kses(tmpcoder_render_month($delimiter), array(
                    'label' => array(
                        'class' => array()
                    ),
                    'a' => array(
                        'href'=> array(),
                    ),
                    'span' => array(
                        'class' => array(),
                    ),
                ));
	            
	        }elseif (is_year()) {

	            echo wp_kses(tmpcoder_render_year($delimiter), array(
                    'label' => array(
                        'class' => array()
                    ),
                    'a' => array(
                        'href'=> array(),
                    ),
                    'span' => array(
                        'class' => array(),
                    ),
                ));
	            
	        }elseif ( is_single() && !$is_woocommerce ) {

	            echo wp_kses(tmpcoder_render_single($delimiter), array(
                    'label' => array(
                        'class' => array()
                    ),
                    'a' => array(
                        'href'=> array(),
                    ),
                    'span' => array(
                        'class' => array(),
                    ),
                ));

	        }elseif (is_page()) {

	            if (class_exists('Woocommerce')) {
	                
	                if ( is_cart() || is_checkout() || is_account_page() || is_wc_endpoint_url()) {
	                    add_filter( 'woocommerce_breadcrumb_defaults', 'tmpcoder_breadcrumb_delimiter' );
	                    
	                    woocommerce_breadcrumb(); 

	                }else{
		
	                    echo wp_kses(tmpcoder_render_page($delimiter), array(
                            'label' => array(
                                'class' => array()
                            ),
                            'a' => array(
                                'href'=> array(),
                            ),
                            'span' => array(
                                'class' => array(),
                            ),
                        ));
	                }
	            }
	            else
	            {
                    echo wp_kses(tmpcoder_render_page($delimiter), array(
                        'label' => array(
                            'class' => array()
                        ),
                        'a' => array(
                            'href'=> array(),
                        ),
                        'span' => array(
                            'class' => array(),
                        ),
                    ));
	            }

	        }elseif (is_search()) {

	            echo wp_kses(tmpcoder_render_search($delimiter), array(
                    'label' => array(
                        'class' => array()
                    ),
                    'a' => array(
                        'href'=> array(),
                    ),
                    'span' => array(
                        'class' => array(),
                    ),
                ));

	        }elseif (is_404()) {

	            echo wp_kses(tmpcoder_render_404($delimiter), array(
                    'label' => array(
                        'class' => array()
                    ),
                    'a' => array(
                        'href'=> array(),
                    ),
                    'span' => array(
                        'class' => array(),
                    ),
                ));

	        }elseif (class_exists('WooCommerce') && is_woocommerce()) {

	            add_filter( 'woocommerce_breadcrumb_defaults', 'tmpcoder_breadcrumb_delimiter' );

	            woocommerce_breadcrumb(); 
	        }
	    }
	}
}

if (!function_exists('tmpcoder_breadcrumb_delimiter')) {

    function tmpcoder_breadcrumb_delimiter( $defaults ) {
        $defaults['delimiter'] = TMPCODER_BREAD_DELIMITER;
        $defaults['before'] = '<span>';
        $defaults['after'] = '</span>';
        return $defaults;
    }
}

if (!function_exists('tmpcoder_render_page')) {
	
	function tmpcoder_render_page($delimiter)
	{   
	    $output = "<label><a href='".esc_url(home_url())."' >Home</a></label>";
	    $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	    $output .= "<label class='current-item-name'>".the_title('', '', false )."</label>";

	    return $output;
	}
}

if (!function_exists('tmpcoder_render_category')) {
	
	function tmpcoder_render_category($delimiter)
	{
	    $output = "<label><a href='".esc_url(home_url())."' >Home</a></label>";

	    if ( is_category() ){

	        // parent category
	        if ( $term_ids = get_ancestors( get_queried_object_id(), 'category', 'taxonomy' ) ) {
	            $crumbs = [];
	            $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	            foreach ( $term_ids as $term_id ) {
	                $term = get_term( $term_id, 'category' );

	                if ( $term && ! is_wp_error( $term ) ) {
	                    $crumbs[] = "<label>".sprintf( '<a href="%s">%s</a>', esc_url( get_term_link( $term ) ), esc_html( $term->name ) )."</label>";
	                }
	            }

	            $output .= implode( "<span class='custom-delimiter'> ".$delimiter." </span>", array_reverse( $crumbs ) );
	        }

	        $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	        $output .= "<label class='current-item-name'>".single_cat_title('',false)."</label>";
	    }

	    if (is_tag()) {
	        $tags = single_tag_title('',false);
	        if ($tags) {
	            $tag_name = $tags;
	            $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	            $output .= "<label class='current-item-name'>". $tag_name ."</label>";
	        }
	    }
	    return $output;
	}
}

if (!function_exists('tmpcoder_render_single')) {
	
	function tmpcoder_render_single($delimiter)
	{
	    $output = "<label><a href='".esc_url(home_url())."' >Home</a></label>";

	    // parent category
	    $parent_cat = current( get_the_category() );
	    if ($parent_cat) {
	        if ( $term_ids = get_ancestors( $parent_cat->term_id, 'category', 'taxonomy' ) ) {
	            $term_ids = array_reverse( $term_ids );

	            $crumbs = [];
	            $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	            foreach ( $term_ids as $term_id ) {
	                $term = get_term( $term_id, 'category' );

	                if ( $term && ! is_wp_error( $term ) ) {
	                    $crumbs[] = "<label>".sprintf( '<a href="%s">%s</a>', esc_url( get_term_link( $term ) ), esc_html( $term->name ) )."</label>";
	                }
	            }
	            $output .= implode( "<span class='custom-delimiter'> ".$delimiter." </span>", $crumbs );
	        }
	    }

	    $category = get_the_category(); 
	    if ($category) {
	        $name = $category[0]->cat_name;
	        $cat_id = get_cat_ID( $name );
	        $name = get_cat_name( $cat_id );
	        $link = get_category_link( $cat_id );
	        $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	        $output .= "<label><a href='".esc_url($link)."' >".$name."</a></label>";             
	    }

	    $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	    $output .= "<label class='current-item-name'>".the_title('', '', false )."</label>";

	    return $output;
	}
}

if (!function_exists('tmpcoder_render_author')) {
	
	function tmpcoder_render_author($delimiter)
	{   
	    $author_name = get_the_author();
	    $output = "<label><a href='".esc_url(home_url())."' >Home</a></label>";
	    $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	    $output .= "<label class='current-item-name'>". $author_name ."</label>";

	    return $output;
	}
}

if (!function_exists('tmpcoder_render_day')) {
	
	function tmpcoder_render_day($delimiter)
	{
	    $output = "<label><a href='".esc_url(home_url())."' >Home</a></label>";
	    $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	    $output .= "<label class='current-item-name'>". get_the_time('F jS, Y') ."</label>";
	    return $output;
	}
}

if (!function_exists('tmpcoder_render_month')) {
	
	function tmpcoder_render_month($delimiter)
	{
	    $output = "<label><a href='".esc_url(home_url())."' >Home</a></label>";
	    $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	    $output .= "<label class='current-item-name'>". get_the_time('F, Y') ."</label>";
	    return $output;
	}
}

if (!function_exists('tmpcoder_render_year')) {
	
	function tmpcoder_render_year($delimiter)
	{
	    $output = "<label><a href='".esc_url(home_url())."' >Home</a></label>";
	    $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	    $output .= "<label class='current-item-name'>". get_the_time('Y') ."</label>";
	    return $output;
	}
}

if (!function_exists('tmpcoder_render_search')) {
	function tmpcoder_render_search($delimiter)
	{
	    $search = get_search_query();
	    $output = "<label><a href='".esc_url(home_url())."' >Home</a></label>";
	    $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	    $output .= "<label class='current-item-name'>". sprintf('Search results for: %s', $search ) ."</label>";
	    return $output;
	}
}

if (!function_exists('tmpcoder_render_404')) {
	function tmpcoder_render_404($delimiter)
	{
	    $search = get_search_query();
	    $output = "<label><a href='".esc_url(home_url())."' >Home</a></label>";
	    $output .= "<span class='custom-delimiter'> ".$delimiter." </span>";
	    $output .= "<label class='current-item-name'>". __('404', 'sastra-essential-addons-for-elementor') ."</label>";

	    return $output;
	}
}

/**
* Is Elementor check
* @return [boolean]
*/

if (!function_exists('tmpcoder_is_elementor_editor')) {
	function tmpcoder_is_elementor_editor(){
	    return class_exists('\Elementor\Plugin') ? true : false;
	}
}

/**
* Elementor editor mode
* @return [boolean]
*/

if (!function_exists('tmpcoder_is_elementor_editor_mode')) {
	
	function tmpcoder_is_elementor_editor_mode(){
	    if( tmpcoder_is_elementor_editor() && \Elementor\Plugin::instance()->editor->is_edit_mode() ){
	        return true;
	    }else{
	        return false;
	    }
	}
}

/**
* Template Preview mode
* @return [boolean]
*/

if (!function_exists('tmpcoder_is_preview_mode')) {
	function tmpcoder_is_preview_mode(){
	    if( tmpcoder_is_elementor_editor_mode() || get_post_type() === 'theme-advanced-hook' ){
	        return true;
	    }else{
	        return false;
	    }
	}
}

if (!function_exists('tmpcoder_get_last_product_id')) {
	
	function tmpcoder_get_last_product_id(){
	    global $wpdb;
	    
	    // Getting last Product ID (max value)
	    $results = $wpdb->get_col( "
	        SELECT MAX(ID) FROM {$wpdb->prefix}posts
	        WHERE post_type LIKE 'product'
	        AND post_status = 'publish'" 
	    );
	    return reset($results);
	}
}

if (!function_exists('tmpcoder_get_last_post_id')) {
	
	function tmpcoder_get_last_post_id(){
	    global $wpdb;
	    
	    // Getting last Product ID (max value)
	    $results = $wpdb->get_col( "
	        SELECT MAX(ID) FROM {$wpdb->prefix}posts
	        WHERE post_type LIKE 'post'
	        AND post_status = 'publish'" 
	    );
	    return reset($results);
	}
}

if (!function_exists('tmpcoder_animation_timings')) {
	
	function tmpcoder_animation_timings() {
		$timing_functions = [
			'ease-default' => 'Default',
			'linear' => 'Linear',
			'ease-in' => 'Ease In',
			'ease-out' => 'Ease Out',
			'pro-eio' => 'EI Out (Pro)',
			'pro-eiqd' => 'EI Quad (Pro)',
			'pro-eicb' => 'EI Cubic (Pro)',
			'pro-eiqrt' => 'EI Quart (Pro)',
			'pro-eiqnt' => 'EI Quint (Pro)',
			'pro-eisn' => 'EI Sine (Pro)',
			'pro-eiex' => 'EI Expo (Pro)',
			'pro-eicr' => 'EI Circ (Pro)',
			'pro-eibk' => 'EI Back (Pro)',
			'pro-eoqd' => 'EO Quad (Pro)',
			'pro-eocb' => 'EO Cubic (Pro)',
			'pro-eoqrt' => 'EO Quart (Pro)',
			'pro-eoqnt' => 'EO Quint (Pro)',
			'pro-eosn' => 'EO Sine (Pro)',
			'pro-eoex' => 'EO Expo (Pro)',
			'pro-eocr' => 'EO Circ (Pro)',
			'pro-eobk' => 'EO Back (Pro)',
			'pro-eioqd' => 'EIO Quad (Pro)',
			'pro-eiocb' => 'EIO Cubic (Pro)',
			'pro-eioqrt' => 'EIO Quart (Pro)',
			'pro-eioqnt' => 'EIO Quint (Pro)',
			'pro-eiosn' => 'EIO Sine (Pro)',
			'pro-eioex' => 'EIO Expo (Pro)',
			'pro-eiocr' => 'EIO Circ (Pro)',
			'pro-eiobk' => 'EIO Back (Pro)',
		];
		
		if ( tmpcoder_is_availble() && defined('TMPCODER_ADDONS_PRO_VERSION') ) {
			$timing_functions = \TMPCODER\Inc\Controls\TMPCODER_Control_Animations_Pro::tmpcoder_animation_timings();
		}

		return $timing_functions;
	}
}

if (!function_exists('tmpcoder_is_availble')) {
	
	function tmpcoder_is_availble(){
		return false;
	}
}

// Get Post Sharing Icon
function tmpcoder_get_post_sharing_icon( $args = [] ) {

	$args['url'] = esc_url($args['url']);
	
	if ( 'facebook-f' === $args['network'] ) {
		$sharing_url = 'https://www.facebook.com/sharer.php?u='. $args['url'];
		$network_title = esc_html__( 'Facebook', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'twitter' === $args['network'] ) {
		$sharing_url = 'https://twitter.com/intent/tweet?url='. $args['url'];
		$network_title = esc_html__( 'Twitter', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'linkedin-in' === $args['network'] ) {
		$sharing_url = 'https://www.linkedin.com/shareArticle?mini=true&url='. $args['url'] .'&title='. $args['title'] .'&summary='. $args['text'] .'&source='. $args['url'];
		$network_title = esc_html__( 'LinkedIn', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'pinterest-p' === $args['network'] ) {
		// $sharing_url = 'https://www.pinterest.com/pin/find/?url='. $args['url'];
		$sharing_url = 'https://www.pinterest.com/pin/create/button/?url='. $args['url'] .'&media='. $args['image'];
		$network_title = esc_html__( 'Pinterest', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'reddit' === $args['network'] ) {
		$sharing_url = 'https://reddit.com/submit?url='. $args['url'] .'&title='. $args['title'];
		$network_title = esc_html__( 'Reddit', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'tumblr' === $args['network'] ) {
		$sharing_url = 'https://tumblr.com/share/link?url='. $args['url'];
		$network_title = esc_html__( 'Tumblr', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'digg' === $args['network'] ) {
		$sharing_url = 'https://digg.com/submit?url='. $args['url'];
		$network_title = esc_html__( 'Digg', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'xing' === $args['network'] ) {
		$sharing_url = 'https://www.xing.com/app/user?op=share&url='. $args['url'];
		$network_title = esc_html__( 'Xing', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'vk' === $args['network'] ) {
		$sharing_url = 'https://vkontakte.ru/share.php?url='. $args['url'] .'&title='. $args['title'] .'&description='. wp_trim_words( $args['text'], 250 ) .'&image='. $args['image'] .'/';
		$network_title = esc_html__( 'vKontakte', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'odnoklassniki' === $args['network'] ) {
		$sharing_url = 'http://odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl='. $args['url'];
		$network_title = esc_html__( 'OdnoKlassniki', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'get-pocket' === $args['network'] ) {
		$sharing_url = 'https://getpocket.com/edit?url='. $args['url'];
		$network_title = esc_html__( 'Pocket', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'skype' === $args['network'] ) {
		$sharing_url = 'https://web.skype.com/share?url='. $args['url'];
		$network_title = esc_html__( 'Skype', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'whatsapp' === $args['network'] ) {
		$show_title = isset($args['show_whatsapp_title']) && 'yes' === $args['show_whatsapp_title'];
		$show_excerpt = isset($args['show_whatsapp_excerpt']) && 'yes' === $args['show_whatsapp_excerpt'];
	
		if ( $show_title && $show_excerpt ) {
			$sharing_url = 'https://api.whatsapp.com/send?text=*'. $args['title'] .'*%0a'. wp_strip_all_tags($args['text']) .'%0a'. $args['url'];
		} else if ( 'yes' === $show_title ) {
			$sharing_url = 'https://api.whatsapp.com/send?text=*'. $args['title'] .'*%0a'. $args['url'];
		} else if ( 'yes' === $show_excerpt ) {
			$sharing_url = 'https://api.whatsapp.com/send?text=*'. wp_strip_all_tags($args['text']) .'%0a'. $args['url'];
		} else {
			$sharing_url = 'https://api.whatsapp.com/send?text='. $args['url'];
		}
		$network_title = esc_html__( 'WhatsApp', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'telegram' === $args['network'] ) {
		$sharing_url = 'https://telegram.me/share/url?url='. $args['url'] .'&text='. $args['text'];
		$network_title = esc_html__( 'Telegram', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'envelope' === $args['network'] ) {
		$sharing_url = 'mailto:?subject='. $args['title'] .'&body='. $args['url'];
		$network_title = esc_html__( 'Email', 'sastra-essential-addons-for-elementor' );
	} elseif ( 'print' === $args['network'] ) {
		$sharing_url = 'javascript:window.print()';
		$network_title = esc_html__( 'Print', 'sastra-essential-addons-for-elementor' );
	} else {
		$sharing_url = '';
		$network_title = '';
	}

	$sharing_url = 'print' === $args['network'] ? $sharing_url : $sharing_url;

	$output = '';

	if ( '' !== $network_title ) {
		$output .= '<a href="'. $sharing_url .'" class="tmpcoder-sharing-icon tmpcoder-sharing-'. esc_attr( $args['network'] ) .'" title="" target="_blank">';
			// Tooltip
			$output .= 'yes' === $args['tooltip'] ? '<span class="tmpcoder-sharing-tooltip tmpcoder-tooltip">'. esc_html( $network_title ) .'</span>' : '';
			
			// Category
			if ( 'envelope' === $args['network'] || 'print' === $args['network'] ) {
				$category = 'fas';
			} else {
				$category = 'fab';
			}

			// Icon
			if ( 'yes' === $args['icons'] ) {
				$output .= '<i class="'. esc_attr($category) .' fa-'. esc_attr( $args['network'] ) .'"></i>';
			}

			// Label
			if ( isset( $args['labels'] ) && 'yes' === $args['labels'] ) {
				$label = isset( $args['custom_label'] ) && '' !== $args['custom_label'] ? $args['custom_label'] :  $network_title;
				$output .= '<span class="tmpcoder-sharing-label">'. esc_html( $label ) .'</span>';
			}
		$output .= '</a>';
	}

	return $output;
}

/**
** Get Shop Page URL
*/
function tmpcoder_get_shop_url( $settings ) {
	global $wp;

    if ( '' == get_option('permalink_structure' ) ) {
        $url = remove_query_arg(array('page', 'paged'), add_query_arg($wp->query_string, '', esc_url(home_url($wp->request))));
    } else {
        $url = preg_replace('%\/page/[0-9]+%', '', esc_url(home_url(trailingslashit($wp->request))));
    }

	// TMPCODER Filters
	$url = add_query_arg( 'tmpcoderfilters', '', $url );

	// Min/Max.
	if ( isset( $_GET['min_price'] ) ) {// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$url = add_query_arg( 'min_price', wc_clean( sanitize_text_field(wp_unslash( $_GET['min_price'] )) ), $url );// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}

	if ( isset( $_GET['max_price'] ) ) {// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$url = add_query_arg( 'max_price', wc_clean( sanitize_text_field(wp_unslash( $_GET['max_price'] )) ), $url );// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}

	// Search
	if ( isset( $_GET['psearch'] ) ) {// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$url = add_query_arg( 'psearch', sanitize_text_field(wp_unslash( $_GET['psearch'] )), $url );// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}

	// Rating
	if ( isset( $_GET['filter_rating'] ) ) {// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$url = add_query_arg( 'filter_rating', sanitize_text_field(wp_unslash( $_GET['filter_rating'] )), $url );// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}

	// Categories
	if ( isset( $_GET['filter_product_cat'] ) ) {// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$url = add_query_arg( 'filter_product_cat', sanitize_text_field(wp_unslash( $_GET['filter_product_cat'] )), $url );// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}

	// Tags
	if ( isset( $_GET['filter_product_tag'] ) ) {// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$url = add_query_arg( 'filter_product_tag', sanitize_text_field(wp_unslash( $_GET['filter_product_tag'] )), $url );// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}

	// All current filters.
	if ( $_chosen_attributes = WC()->query->get_layered_nav_chosen_attributes() ) { 
		foreach ( $_chosen_attributes as $name => $data ) {
			$filter_name = wc_attribute_taxonomy_slug( $name );
			if ( ! empty( $data['terms'] ) ) {
				$url = add_query_arg( 'filter_' . $filter_name, implode( ',', $data['terms'] ), $url );
			}

			if ( !empty($settings) ) {
				if ( 'or' === $settings['tax_query_type'] || isset($_GET['query_type_' . $filter_name]) ) {// phpcs:ignore WordPress.Security.NonceVerification.Recommended
					$url = add_query_arg( 'query_type_' . $filter_name, 'or', $url );
				}
			}
		}
	}

	// Sorting
	if ( isset( $_GET['orderby'] ) ) {// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$url = add_query_arg( 'orderby', sanitize_text_field(wp_unslash($_GET['orderby'])), $url );// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}

	// Fix URL
	// $url = str_replace( '%2C', ',', $url );
	
	return $url;
}

/**
** Get Available Custom Post Types or Taxonomies
*/

if (!function_exists('tmpcoder_get_custom_types_of')) {
	
    function tmpcoder_get_custom_types_of( $query='', $exclude_defaults = true ) {

        // Taxonomies
        if ( 'tax' === $query ) {
            $custom_types = get_taxonomies( [ 'show_in_nav_menus' => true ], 'objects' );
        
        // Post Types
        } else {
            $custom_types = get_post_types( [ 'show_in_nav_menus' => true ], 'objects' );
        }

        $custom_type_list = [];

        foreach ( $custom_types as $key => $value ) {
            if ( $exclude_defaults ) {
                if ( $key != 'post' && $key != 'page' && $key != 'category' && $key != 'post_tag' ) {
                    $custom_type_list[ $key ] = $value->label;
                }
            } else {
                $custom_type_list[ $key ] = $value->label;
            }
        }

        return $custom_type_list;
    }
}

/**
** Get Custom Meta Keys
*/

if (!function_exists('tmpcoder_get_custom_meta_keys')) {

	function tmpcoder_get_custom_meta_keys() {
		$data = [];
		$options = [];
		$merged_meta_keys = [];
		$post_types = tmpcoder_get_custom_types_of( 'post', false );

		foreach ( $post_types as $post_type_slug => $post_type_name ) {
			$data[ $post_type_slug ] = [];
			$posts = get_posts( [ 'post_type' => $post_type_slug, 'posts_per_page' => -1 ] );

			foreach (  $posts as $key => $post ) {
				$meta_keys = get_post_custom_keys( $post->ID );

				if ( ! empty($meta_keys) ) {
					for ( $i = 0; $i < count( $meta_keys ); $i++ ) {
						if ( '_' !== substr( $meta_keys[$i], 0, 1 ) ) {
							array_push( $data[$post_type_slug], $meta_keys[$i] );
						}
					}
				}
			}

			$data[ $post_type_slug ] = array_unique( $data[ $post_type_slug ] );
		}

		foreach ( $data as $array ) {
			$merged_meta_keys = array_unique( array_merge( $merged_meta_keys, $array ) );
		}
		
		// Rekey
		$merged_meta_keys = array_values($merged_meta_keys);

		for ( $i = 0; $i < count( $merged_meta_keys ); $i++ ) {
			$options[ $merged_meta_keys[$i] ] = $merged_meta_keys[$i];
		}

		return [ $data, $options ];
	}
}

/**
** Get Taxonomy Custom Meta Keys
*/

if (!function_exists('tmpcoder_get_custom_meta_keys_tax')) {
	
	function tmpcoder_get_custom_meta_keys_tax() { // needs ajaxifying
		$data = [];
		$options = [];
		$merged_meta_keys = [];
		$tax_types = tmpcoder_get_custom_types_of( 'tax', false );

		foreach ( $tax_types as $taxonomy_slug => $post_type_name ) {
			$data[ $taxonomy_slug ] = [];
			$taxonomies = get_terms( $taxonomy_slug );

			foreach (  $taxonomies as $key => $tax ) {
				$meta_keys = get_term_meta( $tax->term_id );
				$meta_keys = array_keys($meta_keys);

				if ( ! empty($meta_keys) ) {
					for ( $i = 0; $i < count( $meta_keys ); $i++ ) {
						if ( '_' !== substr( $meta_keys[$i], 0, 1 ) ) {
							array_push( $data[$taxonomy_slug], $meta_keys[$i] );
						}
					}
				}
			}

			$data[ $taxonomy_slug ] = array_unique( $data[ $taxonomy_slug ] );
		}

		foreach ( $data as $array ) {
			$merged_meta_keys = array_unique( array_merge( $merged_meta_keys, $array ) );
		}
		
		// Rekey
		$merged_meta_keys = array_values($merged_meta_keys);

		for ( $i = 0; $i < count( $merged_meta_keys ); $i++ ) {
			$options[ $merged_meta_keys[$i] ] = $merged_meta_keys[$i];
		}

		return [ $data, $options ];
	}
}

/**
** TMPCODER Library Button
*/

if (!function_exists('tmpcoder_library_buttons')) {
	
	function tmpcoder_library_buttons( $module, $controls_manager, $tutorial_url = '' ) {

		return false;

		if ( empty(get_option('tmpcoder_wl_plugin_links')) ) {
			if ( '' !== $tutorial_url ) {
				$tutorial_link = '<a href="'. esc_url($tutorial_url) .'" target="_blank">'. esc_html__( 'Watch Video Tutorial ', 'sastra-essential-addons-for-elementor' ) .'<span class="dashicons dashicons-video-alt3"></span></a>';
			} else {
				$tutorial_link = '';
			}

			$module->add_control(
	            'tmpcoder_library_buttons',
	            [
					'raw' => '<div class='. $module->get_name() .'><a href="#" target="_blank" data-theme="'. esc_attr(get_template()) .'">'. esc_html__( 'Widget Preview', 'sastra-essential-addons-for-elementor' ) .'</a> <a href="#">'. esc_html__( 'Predefined Styles', 'sastra-essential-addons-for-elementor' ) .'</a></div>'. $tutorial_link,
					'type' => $controls_manager,
				]
	        );
        }
	}
}

/**
** Request Feature Section
*/

if (!function_exists('tmpcoder_add_section_request_feature')) {
	
	function tmpcoder_add_section_request_feature( $module, $raw_html, $tab ) {
		$module->start_controls_section(
			'section_request_new_feature',
			[
				'label' => __( 'Request Feature', 'sastra-essential-addons-for-elementor' ),
				'tab' => $tab,
			]
		);

		$module->add_control(
			'request_new_feature',
			[
				'type' => $raw_html,
				/* Translators: %s is the plugin name. */
				'raw' => sprintf(__( 'Missing an Option, have a New Widget or any kind of Feature Idea? Please share it with us and lets discuss. <a href="%s" target="_blank">Request New Feature <span class="dashicons dashicons-star-empty"></span></a>', 'sastra-essential-addons-for-elementor' ), TMPCODER_REQUEST_NEW_FEATURE_URL)
			]
		);

		$module->end_controls_section(); // End Controls Section
	}
}

/**
** Upgrade to Pro Notice
*/

if (!function_exists('tmpcoder_upgrade_pro_notice')) {
	
	function tmpcoder_upgrade_pro_notice( $module, $controls_manager, $widget, $option, $condition = [] ) {
		if ( tmpcoder_is_availble() ) {
			return;
		}

		$url = TMPCODER_PURCHASE_PRO_URL.'/?ref=tmpcoder-plugin-panel-'. $widget .'-upgrade-pro#purchasepro';

		$module->add_control(
            $option .'_pro_notice',
            [
				'raw' => 'This option is available<br> in the <strong><a href="'. $url .'" target="_blank">Pro version</a></strong> and above.',
				'type' => $controls_manager,
				'content_classes' => 'tmpcoder-pro-notice',
				'condition' => [
					$option => $condition,
				]
			]
        );
	}
}

/**
** Pro Features List Section
*/

if (!function_exists('tmpcoder_pro_features_list_section')) {
	
	function tmpcoder_pro_features_list_section( $module, $section, $type, $widget, $features ) {
		if ( tmpcoder_is_availble() ) {
			return;
		}

		if ( '' === $section ) {
			$module->start_controls_section(
				'pro_features_section',
				[
					'label' => __('Pro Features', 'sastra-essential-addons-for-elementor').' <span class="dashicons dashicons-star-filled"></span>',
				]
			);			
		} else {
			$module->start_controls_section(
				'pro_features_section',
				[
					'label' => __('Pro Features', 'sastra-essential-addons-for-elementor').' <span class="dashicons dashicons-star-filled"></span>',
					'tab' => $section,
				]
			);
		}


		$list_html = '';

		for ($i=0; $i < count($features); $i++) { 
			$list_html .= '<li>'. $features[$i] .'</li>';
		}

		$module->add_control(
			'pro_features_list',
			[
				'type' => $type,
				'raw' => '<ul>'. $list_html .'</ul>
						  <a href="'.TMPCODER_PURCHASE_PRO_URL.'?ref=tmpcoder-plugin-panel-pro-sec-'. $widget .'-upgrade-pro#purchasepro" target="_blank">'. __('Get Pro version', 'sastra-essential-addons-for-elementor').'</a>',
				'content_classes' => 'tmpcoder-pro-features-list',
			]
		);

		$module->end_controls_section();
	}
}

if (!function_exists('tmpcoder_animation_timing_pro_conditions')) {
	
	function tmpcoder_animation_timing_pro_conditions() {
		return ['pro-eio','pro-eiqd','pro-eicb','pro-eiqrt','pro-eiqnt','pro-eisn','pro-eiex','pro-eicr','pro-eibk','pro-eoqd','pro-eocb','pro-eoqrt','pro-eoqnt','pro-eosn','pro-eoex','pro-eocr','pro-eobk','pro-eioqd','pro-eiocb','pro-eioqrt','pro-eioqnt','pro-eiosn','pro-eioex','pro-eiocr','pro-eiobk'];
	}
}


/**
** Filter oEmbed Results
*/

if (!function_exists('tmpcoder_filter_oembed_results')) {
	
	function tmpcoder_filter_oembed_results( $html ) {
		// Filter
		preg_match( '/<iframe.*src=\"(.*)\".*><\/iframe>/isU', $html, $matches );

		// Return URL
		return  $matches[1] .'&auto_play=true';
	}
}

/**
** Get Library Template ID
*/

if (!function_exists('tmpcoder_get_template_id')) {
	
	function tmpcoder_get_template_id( $slug ) {
		
		$template = get_page_by_path( $slug, OBJECT, TMPCODER_THEME_ADVANCED_HOOKS_POST_TYPE );

        return isset( $template->ID ) ? $template->ID : false;
	}
}

// if (!function_exists('tmpcoder_is_theme_builder_template')) {
	
// 	function tmpcoder_is_theme_builder_template(){

// 		$current_page = get_post(get_the_ID());

// 		if ( $current_page ) {
// 			return strpos($current_page->post_name, 'user-archive') !== false || strpos($current_page->post_name, 'user-single') !== false || strpos($current_page->post_name, 'user-product') !== false;
// 		} else {
// 			return false;
// 		}
// 	} 
// }

add_action( 'wp_enqueue_scripts', 'tmpcoder_redirect_upgrade_page_script');
add_action( 'admin_enqueue_scripts', 'tmpcoder_redirect_upgrade_page_script');
function tmpcoder_redirect_upgrade_page_script() {
    wp_enqueue_script( 'tmpcoder-redirect-url-utils-script', TMPCODER_PLUGIN_URI .'assets/js/utils'.tmpcoder_script_suffix().'.js', ['jquery'], tmpcoder_get_plugin_version(), false );

    if ( is_admin() ){
        $utils_script = "
        jQuery(document).ready( function($) {    
            let TMPCODER_PURCHASE_PRO_URL = '". esc_html(TMPCODER_PURCHASE_PRO_URL)."';
            let TMPCODER_SUPPORT_URL = '". esc_html(TMPCODER_SUPPORT_URL)."';
            $( 'ul#adminmenu a[href*=\"page=tmpcoder-upgrade\"]' ).attr('href', TMPCODER_PURCHASE_PRO_URL+'?ref=tmpcoder-plugin-backend-menu-upgrade-pro#purchasepro').attr( 'target', '_blank' );
            $( 'ul#adminmenu a[href*=\"page=tmpcoder-support\"]' ).attr('href', TMPCODER_SUPPORT_URL).attr( 'target', '_blank' );
            $( 'ul#adminmenu a[href*=\"#purchasepro\"]' ).css('color', 'orangered');
        });";
        wp_add_inline_script( 'tmpcoder-redirect-url-utils-script', $utils_script );
    }
}

add_filter('woocommerce_single_product_carousel_options', 'tmpcoder_update_woo_flexslider_options');

if (!function_exists('tmpcoder_update_woo_flexslider_options')) {
	function tmpcoder_update_woo_flexslider_options( $options ) {
		$options['directionNav'] = true;
		return $options;
	}
}

/**
** Mailchimp AJAX Subscribe
*/

add_action( 'wp_ajax_mailchimp_subscribe', 'tmpcoder_ajax_mailchimp_subscribe' );
add_action( 'wp_ajax_nopriv_mailchimp_subscribe', 'tmpcoder_ajax_mailchimp_subscribe' );

if (!function_exists('tmpcoder_ajax_mailchimp_subscribe')) {
	
	function tmpcoder_ajax_mailchimp_subscribe() {
		// API Key
		
		if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'sastra-addons') ) {
            exit; // Get out of here, the nonce is rotten!
        }

	    $api_key = !empty(get_option('tmpcoder_mailchimp_api_key')) && false != get_option('tmpcoder_mailchimp_api_key') ? get_option('tmpcoder_mailchimp_api_key') : ''; // GOGA

	    $api_key_sufix = explode( '-', $api_key )[1];

	    // List ID
	    $list_id = isset($_POST['listId']) ? sanitize_text_field(wp_unslash($_POST['listId'])) : '';


	    // Merge Additional Fields
	    $merge_fields = array(
	        'FNAME' => !empty( $_POST['tmpcoder_mailchimp_firstname'] ) ? sanitize_text_field(wp_unslash($_POST['tmpcoder_mailchimp_firstname'])) : '',
	        'LNAME' => !empty( $_POST['tmpcoder_mailchimp_lastname'] ) ? sanitize_text_field(wp_unslash($_POST['tmpcoder_mailchimp_lastname'])) : '',
			'PHONE' => !empty ( $_POST['tmpcoder_mailchimp_phone_number'] ) ? sanitize_text_field(wp_unslash($_POST['tmpcoder_mailchimp_phone_number'])) : '',
	    );

        $tmpcoder_mailchimp_email = !empty($_POST['tmpcoder_mailchimp_email']) ? sanitize_email(wp_unslash($_POST['tmpcoder_mailchimp_email'])) : '';

	    // API URL
	    $api_url = 'https://'. $api_key_sufix .'.api.mailchimp.com/3.0/lists/'. $list_id .'/members/'. md5(strtolower($tmpcoder_mailchimp_email));

	    // API Args
	    $api_args = [
			'method' => 'PUT',
			'headers' => [
				'Content-Type' => 'application/json',
				'Authorization' => 'apikey '. $api_key,
			],
			'body' => wp_json_encode([
				'email_address' => $tmpcoder_mailchimp_email,
				'status' => 'subscribed',
				'merge_fields' => $merge_fields,
			]),
	    ];

	    // Send Request
	    $request = wp_remote_post( $api_url, $api_args );

		if ( ! is_wp_error($request) ) {
			$request = json_decode( wp_remote_retrieve_body($request) );

			// Set Status
			if ( ! empty($request) ) {
				if ($request->status == 'subscribed') {
					wp_send_json([ 'status' => 'subscribed' ]);
				} else {
					wp_send_json([ 'status' => $request->title ]);
				}
			}
		}
	}
}


if (!function_exists('tmpcoder_get_mailchimp_lists')) {

	/**
	** Mailchimp - Get Lists
	*/
	
	function tmpcoder_get_mailchimp_lists(){

		$api_key = get_option('tmpcoder_mailchimp_api_key', '');

		$mailchimp_list = [
			'def' => esc_html__( 'Select List', 'sastra-essential-addons-for-elementor' )
		];

		if ( '' === $api_key ) {
			return $mailchimp_list;
		} else {
	    	$url = 'https://'. substr( $api_key, strpos( $api_key, '-' ) + 1 ) .'.api.mailchimp.com/3.0/lists/';
		    $args = [ 'headers' => [ 'Authorization' => 'Basic ' . base64_encode( 'user:'. $api_key ) ] ]; 

		    $response = wp_remote_get( $url, $args );
		    
		    if (!is_wp_error($response)) {
			    
			    $body = json_decode($response['body']);
				 
				if ( ! empty( $body->lists ) ) {
					foreach ( $body->lists as $list ) {
						$mailchimp_list[$list->id] = $list->name .' ('. $list->stats->member_count .')';
					}
				}
		    }

			return $mailchimp_list;
		}	
	}
}

// Needs further logic
if (!function_exists('tmpcoder_get_mailchimp_groups')) {
	
	function tmpcoder_get_mailchimp_groups() {
		$groups_array = ['def' => 'Select Group'];
		foreach ($this->tmpcoder_get_mailchimp_lists() as $key => $value ) {
			if ( 'def' === $key ) {
				continue;
			}
			$audience = $key; // How to get settin
			$api_key = get_option('tmpcoder_mailchimp_api_key');
			$url = 'https://'. substr( $api_key, strpos( $api_key, '-' ) + 1 ) .'.api.mailchimp.com/3.0/lists/'.$audience.'/interest-categories';
			$args = [ 'headers' => [ 'Authorization' => 'Basic ' . base64_encode( 'user:'. $api_key ) ] ];
			
			$response = wp_remote_get( $url, $args );

			foreach ( json_decode($response['body'])->categories as $key => $value ) {
				$group_name = $value->title;
				$group_id = $value->id;
				$url = 'https://'. substr( $api_key, strpos( $api_key, '-' ) + 1 ) .'.api.mailchimp.com/3.0/lists/'.$audience.'/interest-categories/'. $value->id .'/interests';
				$args = [ 'headers' => [ 'Authorization' => 'Basic ' . base64_encode( 'user:'. $api_key ) ] ];

				
				$response = wp_remote_get( $url, $args );
				
				foreach (json_decode($response['body'])->interests as $key => $value ) {
					// var_dump($group_name, $group_id);
					// var_dump($group_name, $group_id, $value->id, $value->name);
					$groups_array[$value->id] = $value->name;
				}
			}
		}

		return $groups_array;
	}
}

/**
** Get WooCommerce Builder Modules
*/

if (!function_exists('tmpcoder_get_woocommerce_builder_modules')) {
	
	function tmpcoder_get_woocommerce_builder_modules() {
		return [
			// ------ Array Value name ------
			// 'widget name' => ['widget-slug', 'live demo link', 'docs link', 'tag','file name','widget class','widget icon'],

			'Woo Grid/Slider/Carousel' => ['woo-grid', 'woo-grid', 'woo-grid-slider-carousel', 'new','woo-product-grid.php','TMPCODER_Woo_Grid','woo-grid-1.svg'],
			'Product Title' => ['product-title', '', 'product-title', 'new','woo-product-title.php','TMPCODER_Woo_Product_Title','product-title.svg'],
			'Product Media' => ['product-media', '', 'product-media', 'new','woo-product-media.php','TMPCODER_Product_Media','product-media.svg'],
			'Product Price' => ['product-price', '', 'product-price', 'new','woo-product-price.php','TMPCODER_Woo_Product_Price','product-price.svg'],
			'Product Add to Cart' => ['product-add-to-cart', '', 'product-add-to-cart', 'new','woo-add-to-cart.php','TMPCODER_Woo_Add_To_Cart','product-add-to-cart.svg'],
			'Product Tabs' => ['product-tabs', '', 'product-tabs', 'new','woo-product-tab.php','TMPCODER_Product_Tabs','product-tabs.svg'],
			'Product Excerpt' => ['product-excerpt', '', 'product-excerpt', 'new','woo-short-description.php','TMPCODER_Woo_Short_Description','product-excerpt.svg'],
			'Product Content' => ['product-content', '', 'product-content', 'new','woo-product-content.php','TMPCODER_Woo_Product_Content','product-content.svg'],
			'Product Rating' => ['product-rating', '', 'product-rating', 'new','woo-product-rating.php','TMPCODER_Product_Rating','product-rating.svg'],
			'Product Meta' => ['product-meta', '', 'product-meta', 'new','woo-product-meta.php','TMPCODER_Product_Meta','product-meta.svg'],
			'Product Stock' => ['product-stock', '', 'product-stock', 'new','woo-product-stock.php','TMPCODER_Product_Stock','product-stock.svg'],
			'Product Mini Cart' => ['product-mini-cart', '', 'product-mini-cart', 'new','woo-mini-cart.php','TMPCODER_Product_Mini_Cart','product-mini-cart.svg'],
		];
	}
}

/**
** Get Theme Builder Modules
*/

if (!function_exists('tmpcoder_get_theme_builder_modules')) {
	
	function tmpcoder_get_theme_builder_modules() {
		return [
			// ------ Array Value name ------
			// 'widget name' => ['widget-slug', 'live demo link', 'docs link', 'tag','file name','widget class','widget icon'],

			'Post Title' => ['post-title', '', 'post-title', 'new','post-title.php','TMPCODER_Post_Title','post-title.svg'],
			'Post Thumbnail' => ['post-thumbnail', '', 'post-thumbnail', 'new','post-thumbnail.php','TMPCODER_Post_Thumbnail','post-thumbnail.svg'],
			'Post Content' => ['post-content', '', 'post-content', 'new','post-content.php','TMPCODER_Post_Content','post-content.svg'],
			'Post Meta' => ['post-info', '', '', 'new','post-info.php','TMPCODER_Post_Info','post-meta.svg'],
			'Post Navigation' => ['post-navigation', '', 'post-navigation', 'new','post-navigation.php','TMPCODER_Post_Navigation','post-navigation.svg'],
			'Post Comments' => ['post-comments', '', 'post-comments', 'new','post-comments.php','TMPCODER_Post_Comments','post-comments.svg'],
			'Author Box' => ['author-box', '', 'author-box', 'new','author-box.php','TMPCODER_Author_Box','author-box.svg'],
			'Post Excerpt' => ['post-excerpt', '', '', 'new','post-excerpt.php','TMPCODER_Post_Excerpt','post-content.svg'],
		];
	}
}

if (!function_exists('tmpcoder_get_registered_modules')) {
	
	function tmpcoder_get_registered_modules(){
		return [
			// ------ Array Value name ------
			// 'widget name' => ['widget-slug', 'live demo link', 'docs link', 'tag','file name','widget class','widget icon'],

			'Post Grid/Slider/Carousel' => ['post-grid', 'post-grid-slider-carousel', 'post-grid-slider-carousel', 'new','post-grid.php','TMPCODER_Post_Grid','post-grid.svg'],
			'Image Grid/Slider/Carousel' => ['media-grid', 'image-grid-slider-carousel', 'image-grid-slider-carousel', 'new','media-grid.php','TMPCODER_Media_Grid','img-grid.svg'],
			'Magazine Grid/Slider' => ['magazine-grid', 'magazine-grid-slider', 'magazine-grid-slider', 'new','magazine-grid.php','TMPCODER_Magazine_Grid','magazine-grid.svg'],
			'Posts/Story Timeline' => ['posts-timeline', 'posts-story-timeline', 'posts-story-timeline', 'new','post-timeline.php','TMPCODER_Posts_Timeline','post-timeline.svg'],
			'Advanced Slider' => ['advanced-slider', 'advanced-slider', 'advanced-slider', 'new','advanced-slider.php','TMPCODER_Advanced_Slider','advance-slider.svg'],
			'Off-Canvas Content' => ['offcanvas', 'off-canvas-content', 'off-canvas-content', 'new','off-canvas.php','TMPCODER_Offcanvas','off-canvas-menu.svg'],
			'Testimonial' => ['testimonial', 'testimonial', 'testimonial', 'new','testimonial-carousel.php','TMPCODER_Testimonial_Carousel','testimonial.svg'],
			'Nav Menu' => ['nav-menu', 'nav-menu', 'nav-menu', 'new','navigation-menu.php','TMPCODER_Navigation_Menu','nav-menu.svg'],
			'Mega Menu' => ['mega-menu', 'mega-menu', 'mega-menu', 'new','mega-menu.php','TMPCODER_Mega_Menu','mega-menu.svg'],
			'Onepage Navigation' => ['onepage-nav', 'onepage-nav', 'onepage-navigation', 'new','onepage-nav.php','TMPCODER_OnepageNav','one-page-nav.svg'],
			'Data Table' => ['data-table', 'data-table', 'data-table', 'new','data-table.php','TMPCODER_Data_Table','data-table.svg'],
			'Pricing Table' => ['pricing-table', 'pricing-table', 'pricing-table', 'new','pricing-table.php','TMPCODER_Pricing_Table','price-table.svg'],
			'Countdown' => ['countdown', 'countdown', 'countdown', 'new','countdown.php','TMPCODER_Countdown','countdown.svg'],
			'Progress Bar' => ['progress-bar', 'progress-bar', 'progress-bar', 'new','progress-bar.php','TMPCODER_Progress_Bar','progress-bar.svg'],
			'Dual Color Heading' => ['dual-color-heading', 'dual-color-heading', 'dual-color-heading', 'new','dual-color-heading.php','TMPCODER_Dual_Color_Heading','dual-color-heading.svg'],
			'Image Accordion' => ['image-accordion', 'image-accordion', 'image-accordion', 'new','image-accordion.php','TMPCODER_Image_Accordion','image-accordian.svg'],
			'Advanced Accordion' => ['advanced-accordion', 'advance-accordion', 'advanced-accordion', 'new','advanced-accordion.php','TMPCODER_Advanced_Accordion','advance-accordion.svg'],
			'Advanced Text' => ['advanced-text', 'advanced-text', 'advanced-text', 'new','animation-text.php','TMPCODER_Advanced_Text','advance-text.svg'],
			'Flip Carousel' => ['flip-carousel', 'flip-carousel', 'flip-carousel', 'new','flip-carousel.php','TMPCODER_Flip_Carousel','flip-carousel.svg'],
			'Flip Box' => ['flip-box', 'flip-box', 'flip-box', 'new','flip-box.php','TMPCODER_Flip_Box','flip-box.svg'],
			'Promo Box' => ['promo-box', 'promo-box', 'promo-box', 'new','promo-box.php','TMPCODER_Promo_Box','promo-box.svg'],
			'Feature List' => ['feature-list', 'feature-list', 'feature-list', 'new','feature-list.php','TMPCODER_Feature_List','feature-list.svg'],
			'Before After' => ['before-after', 'before-after', 'before-after', 'new','before-after.php','TMPCODER_Before_After','before-after.svg'],
			'Image Hotspots' => ['image-hotspots', 'image-hotspots', 'image-hotspots', 'new','image-hotspots.php','TMPCODER_Image_Hotspots','image-hotspots.svg'],
			'Form Styler' => ['forms', 'form-styler', 'form-styler', 'new','form-styler.php','TMPCODER_Form_Styler','form-styler.svg'],
			'MailChimp' => ['mailchimp', 'mailchimp', 'mailchimp', 'new','mailchimp.php','TMPCODER_Mailchimp','mailchimp.svg'],
			'Content Ticker' => ['content-ticker', 'content-ticker', 'content-ticker', 'new','content-ticker.php','TMPCODER_Content_Ticker','content-ticker.svg'],
			'Button' => ['button', 'button', 'button', 'new','button.php','TMPCODER_Button','button.svg'],
			'Dual Button' => ['dual-button', 'dual-button', 'dual-button', 'new','dual-button.php','TMPCODER_Dual_Button','dual-button.svg'],
			'Team Member' => ['team-member', 'team-member', 'team-member', 'new','team-member.php','TMPCODER_Team_Member','team-member.svg'],
			'Price List' => ['price-list', 'price-list', 'price-list', 'new','price-list.php','TMPCODER_Price_List','price-list.svg'],
			'Business Hours' => ['business-hours', 'business-hours', 'business-hours', 'new','business-hours.php','TMPCODER_Business_Hours','business-hour.svg'],
			'Sharing Buttons' => ['sharing-buttons', 'sharing-buttons', 'sharing-buttons', 'new','social-share.php','TMPCODER_Social_Share','sharing-buttons.svg'],
			'Search Form' => ['search', 'search-form', 'search-form', 'new','wp-search.php','TMPCODER_Search','search-form.svg'],
			'Back to Top' => ['back-to-top', 'back-to-top-button', 'back-to-top', 'new','top-scroll.php','TMPCODER_Back_To_Top','back-to-top.svg'],
			'Phone Call' => ['phone-call', 'phone-call-button', 'phone-call', 'new','phone-call.php','TMPCODER_Phone_Call','phone-call.svg'],
			'Lottie Animations' => ['lottie-animations', 'lottie-animation', 'lottie-animations', 'new','lottie-animations.php','TMPCODER_Lottie_Animations','lottie-animations.svg'],
			'Site Logo' => ['logo', '', 'site-logo', 'new','site-logo.php','TMPCODER_Site_Logo','site-logo.svg'],
			'Taxonomy List' => ['taxonomy-list', '', 'taxonomy-list', 'new','taxonomy-list.php','TMPCODER_Taxonomy_List','taxonomy-list.svg'],
			'Page List' => ['page-list', 'page-list', 'page-list', 'new', 'page-list.php','TMPCODER_Page_List','page-list.svg'],
			'Reading Progress Bar' => ['reading-progress-bar', 'reading-progress-bar-widget', 'reading-progress-bar', 'new','reading-progress-bar.php','TMPCODER_Reading_Progress_Bar','reading-progress-bar.svg'],
			'Breadcrumb' => ['Breadcrumb', '', 'breadcrumb', 'new','breadcrumb.php','TMPCODER_Breadcrumb','breadcrumb.svg'],
			'Archive List' => ['archive-list', '', '', 'new','archive-list.php','TMPCODER_Archive_List','page-list.svg'],
            'Recent Post List' => ['recent-post-list', '', 'recent-post-list', 'new','recent-post-list.php','TMPCODER_Post_List','page-list.svg'],
		];
	}
}

/**
** Get Extension Modules
*/
if (!function_exists('tmpcoder_get_extension_modules')) {
	
	function tmpcoder_get_extension_modules() {
		return [
			// ------ Array Value name ------
			// 'extensions name' => ['option name', 'extensions icon', 'tag', 'docs link'],

			'Particles' => ['tmpcoder-particles','particles.svg','', 'particles'],
			'Parallax Background' => ['tmpcoder-parallax-background','parallax-background.svg','','parallax-background'],
			'Parallax Multi Layer' => ['tmpcoder-parallax-multi-layer','parallax-multi-layer.svg', '', 'parallax-multi-layer'],
			'Custom Css' => ['tmpcoder-custom-css','custom-css.svg', '','custom-css'],
			'Sticky Section' => ['tmpcoder-sticky-section','sticky-section.svg','', 'sticky-section'],
			'Advanced Sticky Section (Pro)' => ['tmpcoder-advanced-sticky-section-pro','sticky-section.svg', 'pro'],
			'Floating Effects' => ['tmpcoder-floating-effects','floating-effects.svg', '','floating-effects'],
		];
	}
}

/**
** Get All Widgets
*/

if (!function_exists('tmpcoder_get_all_widgtes')) {
	
	function tmpcoder_get_all_widgtes(){

		$general_widgets = tmpcoder_get_registered_modules();
		$theme_builder_widgets = tmpcoder_get_theme_builder_modules();
		$woo_builder_widgets = tmpcoder_get_woocommerce_builder_modules();

		return array_merge($general_widgets,$theme_builder_widgets,$woo_builder_widgets);
	}
}

function tmpcoder_get_widget_lists(){

	$array = [];
	foreach (tmpcoder_get_all_widgtes() as $key => $value) {
 		array_push($array, 'tmpcoder-'.$value[0]);
 	}
 	return $array;
}

add_action( 'wp_ajax_tmpcoder_get_elementor_pages', 'tmpcoder_get_elementor_pages' );

function tmpcoder_get_elementor_pages(){
		
	check_ajax_referer( 'welcome_nonce', '_ajax_nonce' );

	if ( ! current_user_can('install_plugins') ) {
		wp_send_json_error( esc_html__('Invalid User', 'sastra-essential-addons-for-elementor') );
	}
	
	global $wpdb;

	$post_ids = $wpdb->get_col(
		'SELECT `post_id` FROM `' . $wpdb->postmeta . '`
				WHERE `meta_key` = \'_elementor_version\';'
	);

	$tmpcoder_widgets_list ='';
	$page = !empty($_GET['page']) ? sanitize_text_field( wp_unslash($_GET['page']) ) : '';
	
	$tmpcoder_widgets_list = tmpcoder_get_widget_lists();
	
	if ( empty( $post_ids ) ) {
		wp_send_json_error(esc_html('Empty post list.'));
	}

	$scan_post_ids = [];
	$countWidgets  = [];

	foreach ( $post_ids as $post_id ) {

		if( 'revision' === get_post_type($post_id) ){
			continue;
		}

		$get_widgets = tmpcoder_disabled_unused_elements( $post_id, $tmpcoder_widgets_list );			

		$scan_post_ids[$post_id] = $get_widgets;

		if( !empty( $get_widgets ) ){	

			foreach($get_widgets as $key => $value ){	

				if(!empty($value) && in_array( $value, $tmpcoder_widgets_list ) ){						

					$countWidgets[$value] = (isset($countWidgets[$value]) ? absint($countWidgets[$value]) : 0) + 1;
				}
			}
		}
	}	

	foreach ($tmpcoder_widgets_list as $key => $value) {
		if (!in_array($countWidgets[$value], $countWidgets)) {
			$desableWidgets = str_replace('tmpcoder-', 'tmpcoder-element-', $value);			
			$unusedWidgets[] = $desableWidgets;
			update_option($desableWidgets,'');
		}
	}

	$output = [];
	$val1 = count($tmpcoder_widgets_list);
	$val2 = count($countWidgets);
	$val3 = $val1 - $val2;
	$output['message'] = "* ".$val3." Unused Widgets Found!";
	$output['totalWidgets'] = $val1;
	$output['unusedWidgets'] = $unusedWidgets;
	wp_send_json_success($output);
}

function tmpcoder_disabled_unused_elements( $post_id = '', $tmpcoder_widgets_list = '' ){

	if( !empty($post_id) ){

		if (Elementor\Plugin::instance()->documents->get($post_id)) {
			$meta_data = Elementor\Plugin::instance()->documents->get($post_id);
		}

		if (is_object($meta_data)) {
			$meta_data = $meta_data->get_elements_data();
		}

		if ( empty( $meta_data ) ) {
			return '';
		}
		
		$to_return = [];

		\Elementor\Plugin::instance()->db->iterate_data( $meta_data, function( $element ) use ($tmpcoder_widgets_list, &$to_return) {

			$page = !empty($_GET['page']) ? sanitize_text_field(wp_unslash($_GET['page'])) : '';// phpcs:ignore WordPress.Security.NonceVerification.Recommended
			
			if ( !empty( $element['widgetType'] ) && array_key_exists($element['widgetType'], array_flip($tmpcoder_widgets_list) ) ) {

				$to_return[] = $element['widgetType'];
			}
		});
	}	

	return array_values($to_return);
}

// Change number of products that are displayed per page (shop page)
add_filter( 'loop_shop_per_page', 'tmpcoder_shop_products_per_page', 20 );

function tmpcoder_shop_products_per_page( $cols ) {
 
	if( is_product_category() ){
		return get_option('tmpcoder_woo_shop_cat_ppp', 6);
	} else if(is_product_tag()){
		return get_option('tmpcoder_woo_shop_tag_ppp', 6);
	} else {
	 	return get_option('tmpcoder_woo_shop_ppp', 6);
	}
}

/**
** Get Available WooCommerce Taxonomies
*/
if (!function_exists('tmpcoder_get_woo_taxonomies')) {
	
	function tmpcoder_get_woo_taxonomies() {
		$taxonomy_list = [];

		foreach ( get_object_taxonomies( 'product' ) as $taxonomy_data ) {
			$taxonomy = get_taxonomy( $taxonomy_data );
			if( $taxonomy->show_ui ) {
				$taxonomy_list[ $taxonomy_data ] = $taxonomy->label;
			}
		}

		return $taxonomy_list;
	}
}

add_filter( 'wp_kses_allowed_html', 'tmpcoder_form_wp_kses_allowed_html', 10, 2 );

function tmpcoder_form_wp_kses_allowed_html( $allowed_tags, $context ) {
    if ( 'form' === $context ) {
        // Define the allowed tags for the form itself
        $allowed_tags['form'] = array(
            'action' => true,
            'method' => true,
            'enctype' => true,
            'name' => true,
            'id' => true,
        );

        // Define the allowed tags for all inner tags
        $allowed_tags = array_merge( $allowed_tags, array(
            'input' => array(
                'type' => true,
                'name' => true,
                'value' => true,
                'id' => true,
            ),
            'textarea' => array(
                'name' => true,
                'style' => true,
                'with' => true,
                'id' => true,
            ),
            'button' => array(
                'type' => true,
                'name' => true,
                'id' => true,
            ),
            'select' => array(
                'name' => true,
                'id' => true,
            ),
            'option' => array(
                'value' => true,
            ),
            'label' => array(
                'for' => true,
            ),
        ) );
    }

    return $allowed_tags;
}

if ( !function_exists('tmpcoder_wp_kses_allowed_html') ){
    function tmpcoder_wp_kses_allowed_html(){
        $kses_defaults = wp_kses_allowed_html( 'post' );
        $svg_args = array(
            'iframe'   => array(
        		'id' => true,
        		'src' => true,
        		'style' => true,
        		'class' => true,
                'frameborder' => true,
                'allow' => true,
                'allowfullscreen' => true,
        	),
            'style'   => array(),
            'script'   => array(),
            'svg'   => array(
	            'version' => true,
	            'style' => true,
	            'xmlns:xlink' => true,
	            'id' => true,
	            'data-*' => true,
	            'x' => true,
	            'y' => true,
	            'xml:space' => true,
	            'class'           => true,
	            'aria-hidden'     => true,
	            'aria-labelledby' => true,
	            'role'            => true,
	            'xmlns'           => true,
	            'width'           => true,
	            'height'          => true,
	            'viewbox'         => true, // <= Must be lower case!
            ),
            'g'     => array( 
	            'fill' => true,
	            'id' => true,
	            'class' => true,
            ),
            'title' => array( 'title' => true ),
            'path'  => array( 
                'd'               => true, 
                'fill'            => true,
                'style' => true,
                'stroke' => true,
                'stroke-miterlimit' => true,
                'stroke-width' => true,
                'fill-rule' => true,
                'transform' => true,
            ),
            'line'  => array ( 
                'id'        => true,
                'x1'        => true,
                'y1'        => true,
                'x2'        => true,
                'y2'        => true
            ),
            'polygon' => array(
	            'class' => true,
	            'points' => true,
            ),

            'form' => array(
                'action' => true,
                'method' => true,
                'enctype' => true,
                'name' => true,
                'id' => true,
                'class' => true,
                'novalidate' => true,
                'aria-*' => true,
                'data-*' => true,
            ),
            'input' => array(
                'type' => true,
                'name' => true,
                'value' => true,
                'title' => true,
                'id' => true,
                'class' => true,
                'placeholder' => true,
                'autocomplete' => true,
                'size' => true,
                'aria-*' => true,
                'data-*' => true,
                'tmpcoder-query-type' => true,
                'tmpcoder-taxonomy-type' => true,
                'number-of-results' => true,
                'ajax-search' => true,
                'show-description' => true,
                'number-of-words' => true,
                'show-ajax-thumbnails' => true,
                'show-view-result-btn' => true,
                'view-result-text' => true,
                'no-results' => true,
                'exclude-without-thumb' => true,
                'link-target' => true,
                'ajax-search-img-size' => true,
            ),
            'select' => array(
                'name' => true,
                'value' => true,
                'id' => true,
                'class' => true,
                'data-*' => true,
                'placeholder' => true,
                'autocomplete' => true,
                'aria-*' => true,
                'size' => true,
                'aria-invalid' => true,
            ),
            'option' => array(
                'value' => true,
                'data-*' => true,
                'aria-*' => true,
            ),
            'optgroup' => array(
                'value' => true,
                'label' => true,
                'data-' => true,
                'aria-*' => true,
            ),
            'textarea' => array(
                'name' => true,
                'with' => true,
                'style' => true,
                'rows' => true,
                'id' => true,
                'class' => true,
                'data-*' => true,
                'placeholder' => true,
                'autocomplete' => true,
                'aria-*' => true,
                'size' => true,
                'aria-invalid' => true,
            ),
            'button' => array(
                'type' => true,
                'name' => true,
                'id' => true,
                'class' => true,
                'data-*' => true,
                'placeholder' => true,
                'autocomplete' => true,
                'aria-*' => true,
                'size' => true,
                'aria-invalid' => true,
                'onclick' => true,
            ),

        );
        $allowed_tags = array_merge( $kses_defaults, $svg_args );

        $allowed_tags['a']['nofollow'] = true;
        $allowed_tags['a']['onclick'] = true;
        $allowed_tags['div']['layout-settings'] = true;
        $allowed_tags['div']['onClick'] = true;

        // Parallax section support
        $allowed_tags['section']['speed-data'] = true;
        $allowed_tags['section']['bg-image'] = true;
        $allowed_tags['section']['scroll-effect'] = true;

        $allowed_tags['div']['speed-data'] = true;
        $allowed_tags['div']['bg-image'] = true;
        $allowed_tags['div']['scroll-effect'] = true;

        $allowed_tags['header']['speed-data'] = true;
        $allowed_tags['header']['bg-image'] = true;
        $allowed_tags['header']['scroll-effect'] = true;

        $allowed_tags['footer']['speed-data'] = true;
        $allowed_tags['footer']['bg-image'] = true;
        $allowed_tags['footer']['scroll-effect'] = true;

        $allowed_tags['main']['speed-data'] = true;
        $allowed_tags['main']['bg-image'] = true;
        $allowed_tags['main']['scroll-effect'] = true;

        $allowed_tags['article']['speed-data'] = true;
        $allowed_tags['article']['bg-image'] = true;
        $allowed_tags['article']['scroll-effect'] = true;

        $allowed_tags['aside']['speed-data'] = true;
        $allowed_tags['aside']['bg-image'] = true;
        $allowed_tags['aside']['scroll-effect'] = true;

        $allowed_tags['nav']['speed-data'] = true;
        $allowed_tags['nav']['bg-image'] = true;
        $allowed_tags['nav']['scroll-effect'] = true;
        
        // Multi Layer Parallax
        $allowed_tags['div']['scalar-speed'] = true;
        $allowed_tags['div']['direction'] = true;
        $allowed_tags['div']['style-top'] = true;        
        $allowed_tags['div']['style-left'] = true;
        
        // section particles effect
        $allowed_tags['section']['particle-source'] = true;
        $allowed_tags['div']['particle-source'] = true;
        $allowed_tags['header']['particle-source'] = true;
        $allowed_tags['footer']['particle-source'] = true;
        $allowed_tags['main']['particle-source'] = true;
        $allowed_tags['article']['particle-source'] = true;
        $allowed_tags['aside']['particle-source'] = true;
        $allowed_tags['nav']['particle-source'] = true;

        $allowed_tags['button']['value'] = true;

        return $allowed_tags;
    }
}

/**
 * Validate an HTML tag against a safe allowed list.
 *
 * @param string $tag
 *
 * @return string
 */
if ( !function_exists('tmpcoder_validate_html_tag') ){

	function tmpcoder_validate_html_tag ( $tag ) {
		$allowed_html_wrapper_tags= [
			'article',
			'aside',
			'div',
			'footer',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'header',
			'main',
			'nav',
			'p',
			'section',
			'span',
		];

	    return in_array( strtolower( $tag ), $allowed_html_wrapper_tags ) ? $tag : 'div';
    }
}

function tmpcoder_script_suffix() {
  // $dir = is_rtl() ? '-rtl' : '';
  return defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
}

function tmpcoder_get_plugin_version() {
	return TMPCODER_PLUGIN_VER;
}

/**
** Set Global Fonts in All Widgets
*/

add_action( 'wp_ajax_tmpcoder_set_global_fonts', 'tmpcoder_set_global_fonts' );

function tmpcoder_set_global_fonts(){

    if ( ! current_user_can('install_plugins') ) {
        wp_send_json_error( esc_html__('Invalid User', 'sastra-essential-addons-for-elementor') );
    }
    
    global $wpdb;

    $post_ids = $wpdb->get_results(
        'SELECT * FROM '.$wpdb->postmeta.' WHERE `meta_key` = \'_elementor_data\';'
    );
    
    if ( empty( $post_ids ) ) {
        wp_send_json_error(esc_html('Empty post list.'));
    }

    foreach ( $post_ids as $post_id ) {

        $post_id = get_object_vars($post_id);

        $old_meta_value = $post_id['meta_value'];
        $new_meta_value = preg_replace( '/,"\b\w+_font_family":"+[a-zA-Z+\s]+"/' , '', $old_meta_value);

        $set_global_font = update_post_meta( $post_id['post_id'], '_elementor_data', $new_meta_value);
    }

    \Elementor\Plugin::instance()->files_manager->clear_cache();
        $plugin_slugs[] = 'elementor';
        
    $output = [];
    $output['set_global_font'] = 'success';
    wp_send_json_success($output);
}

if (!function_exists('tmpcoder_render_svg_icon')) {
	
	function tmpcoder_render_svg_icon($item){

		if ($item) {
			ob_start();
			\Elementor\Icons_Manager::render_icon($item, ['aria-hidden' => 'true']);
			return ob_get_clean();
		}
	} 
}

add_action( 'admin_init', 'tmpcoder_disable_default_woo_pages_creation', 2 );
/**
** Prevent WooCommerce creating default pages
*/
function tmpcoder_disable_default_woo_pages_creation() {
	
	$screen = get_current_screen();
	
	if ( !isset($_GET['action']) ) {// phpcs:ignore WordPress.Security.NonceVerification.Recommended
    	add_filter( 'woocommerce_create_pages', '__return_empty_array' );
	}
}

/* Set global fonts in all widgets [START] */

add_action('redux/field/'.TMPCODER_THEME_OPTION_NAME.'/fieldset/after/'.TMPCODER_THEME_OPTION_NAME, 'tmpcoder_add_global_option');

function tmpcoder_add_global_option($data){

    if (get_template() == 'sastrawp') {

        if (isset($data['id']) && $data['id'] == 'heading_6') {

        	$pro_class = !tmpcoder_is_availble() ? 'set-global-options-pro' : '';

            ?>
            <div class="tmpcoder-settings inte-settings common-box-shadow set-global-fonts-popup <?php echo esc_attr($pro_class); ?>">
                <div class="tmpcoder-settings-group">
                    <div class="tmpcoder-setting">
                        <h4>
                            <span class="mailchimp-label"><?php esc_html_e( 'Apply Global Fonts to All Widgets', 'sastra-essential-addons-for-elementor' ); ?></span>
                            
                            <div class="about-text"><?php esc_html_e('Use the Global Options to set and apply selected fonts globally across all widgets.', 'sastra-essential-addons-for-elementor' ); ?></div>
                        </h4>
                    </div>
                    <p class="submit">
                        <button class="button tmpcoder-options-button tmpcoder-template-conditions set-global-fonts-btn" type="button"><?php esc_html_e('Set Global Fonts', 'sastra-essential-addons-for-elementor'); ?></button>
                    </p>
                </div>
                <?php if (!tmpcoder_is_availble()) { ?>	
                <div class="tmpcoder-setting-tooltip">
                    <a href="<?php echo esc_attr(TMPCODER_PURCHASE_PRO_URL) ?>?ref=tmpcoder-plugin-backend-settings-woo-pro#purchasepro" class="tmpcoder-setting-tooltip-link" target="_blank">
                        <span class="dashicons dashicons-lock"></span>
                        <span class="dashicons dashicons-unlock"></span>
                    </a>
                    <div class="tmpcoder-setting-tooltip-text"><?php esc_html_e( 'Upgrade to Pro', 'sastra-essential-addons-for-elementor' ); ?></div>
                </div>
            	<?php } ?>
            </div>  
            <div class="tmpcoder-condition-popup-wrap tmpcoder-admin-popup-wrap">
                <div class="tmpcoder-condition-popup tmpcoder-admin-popup">
                    <header>
                        <h2><?php esc_html_e( 'Apply Global Fonts to All Widgets', 'sastra-essential-addons-for-elementor' ); ?></h2>
                            <?php esc_html_e( 'Please do not refresh the page', 'sastra-essential-addons-for-elementor' ); ?><br>
                    </header>
                    <table class="tmpcoder-options-table widefat">
                        <tbody>
                            <tr class="bsf-target-rules-row tmpcoder-options-row">                                
                                <div class="set-global-loader">
                                	<img src="<?php echo esc_url(TMPCODER_ADDONS_ASSETS_URL.'images/backend-loader.gif'); ?>" alt="" />
                                </div>
                                <img class="set-global-font-success" src="<?php echo esc_url(TMPCODER_ADDONS_ASSETS_URL.'images/right-sign.jpg'); ?>" alt="" />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <?php

        }
    }
}

/* set global fonts in all widgets [END] */


/**
** Upgrade to pro version notice dismiss handler
*/
function tmpcoder_upgrade_pro_notice_handle() {

   if ( ! current_user_can('install_plugins') ) {
        wp_send_json_error( esc_html__('Invalid User', 'sastra-essential-addons-for-elementor') );
    }

    if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'welcome_nonce') ) {
    	exit; // Get out of here, the nonce is rotten!
    }

    $activate_pro_notice = isset($_POST['activate_pro_notice']) ? sanitize_text_field(wp_unslash($_POST['activate_pro_notice'])) : '';

    $activate_theme_notice = isset($_POST['activate_theme_notice']) ? sanitize_text_field(wp_unslash($_POST['activate_theme_notice'])) : '';

    if ($activate_theme_notice == 'true') {
    	set_transient('tmpcoder_activate_theme_dismissed_' . get_current_user_id(), true, 24 * HOUR_IN_SECONDS);
		$output = [];
	    $output['tmpcoder_activate_theme_dismiss'] = 'success';
	    wp_send_json_success($output);
    }

	if ( $activate_pro_notice == 'true' ){
		set_transient('tmpcoder_activate_pro_notice_dismissed_' . get_current_user_id(), true, 24 * HOUR_IN_SECONDS);
		$output = [];
	    $output['tmpcoder_activate_to_pro_notice_dismiss'] = 'success';
	    wp_send_json_success($output);
	}else{
		set_transient('tmpcoder_upgrade_pro_notice_dismissed_' . get_current_user_id(), true, 24 * HOUR_IN_SECONDS);
	    $output = [];
	    $output['tmpcoder_upgrade_to_pro_notice_dismiss'] = 'success';
	    wp_send_json_success($output);
	}
}
add_action('wp_ajax_tmpcoder_upgrade_pro_notice_dismiss', 'tmpcoder_upgrade_pro_notice_handle');
	
add_filter('option_page_capability_tmpcoder-settings', 'tmpcoder_set_settings', 10, 3);

if (!function_exists('tmpcoder_set_settings')) {
	
	function tmpcoder_set_settings($capability)
	{	
		if (!isset($_POST['_wpnonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_wpnonce'])), 'tmpcoder-settings-options') ) {
            exit; // Get out of here, the nonce is rotten!
        }

        $options = $_POST;
		$post_id = tmpcoder_get_post_id_by_meta_key_and_meta_value('tmpcoder_registerd_settings');

		if ($post_id) {
			update_post_meta($post_id, 'tmpcoder_registerd_settings', $options);
		}
		else
		{
			global $user_ID;
			$new_post = array(
			'post_title'  => 'Tmpcoder Registerd Settings',
			'post_status' => 'publish',
			'post_author' => $user_ID,
			'post_type'   => 'theme-advanced-hook',
			);

			$post_id = wp_insert_post($new_post);
			$tmpcoder_registerd_settings = tmpcoder_get_settings();
			update_post_meta($post_id, 'tmpcoder_registerd_settings', $options);
		}
	} 
}

if (!function_exists('tmpcoder_get_settings')) {
	
	function tmpcoder_get_settings($option_name="", $default_value="")
	{
		$post_id = tmpcoder_get_post_id_by_meta_key_and_meta_value('tmpcoder_registerd_settings');

		if ($post_id) {
			$post_meta = get_post_meta($post_id, 'tmpcoder_registerd_settings',true);
			if (isset($post_meta[$option_name])) {
				return $post_meta[$option_name];
			}
		} else {
			return $default_value;
		}
	} 
}


if (!function_exists('tmpcoder_post_type_video_popup')) {
	
	function tmpcoder_post_type_video_popup() {
	    ?> <div class="tmpcoder-video-popup"></div> <?php

	}
	add_action('wp_body_open', 'tmpcoder_post_type_video_popup');
}

if (!function_exists('tmpcoder_avoid_elementor_redirection')) {
	
	function tmpcoder_avoid_elementor_redirection($plugin) {
	    if ($plugin == 'elementor/elementor.php') {
	        delete_transient( 'elementor_activation_redirect' );
	    }
	}
	add_action('activated_plugin', 'tmpcoder_avoid_elementor_redirection');
}
