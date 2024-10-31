<?php
/**
 * Epsilon Welcome Screen
 *
 * @package Epsilon Framework
 */

use TMPCODER\Classes\Pro_Modules;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Class TMPCODER_Welcome_Screen
*/

class TMPCODER_Welcome_Screen {
	/**
	 * Theme name
	 *
	 * @var string
	 */
	public $theme_name = '';

	/**
	 * Theme slug
	 *
	 * @var string
	 */
	public $theme_slug = '';

	/**
	 * Author Logo
	 *
	 * @var string
	 */
	public $author_logo = '';

	/**
	 * Required actions
	 *
	 * @var array|mixed
	 */
	public $actions = array();

	/**
	 * Actions count
	 *
	 * @var int
	 */
	public $actions_count = 0;

	/**
	 * Required Plugins
	 *
	 * @var array|mixed
	 */
	public $plugins = array();

	/**
	 * Notice message
	 *
	 * @var mixed|string
	 */
	public $notice = '';

	/**
	 * Tab sections
	 *
	 * @var array
	 */
	public $sections = array();

	/**
	 * EDD Strings
	 *
	 * @var array
	 */
	public $strings = array();

	/**
	 * EDD load
	 *
	 * @var bool
	 */
	public $edd = false;

	/**
	 * If we have an EDD product, we need to add an ID
	 *
	 * @var string
	 */
	public $download_id = '';

	/**
	 * TMPCODER_Welcome_Screen constructor.
	 *
	 * @param array $config Configuration array.
	 */
	public function __construct( $config = array() ) {
		$theme = (is_object(wp_get_theme()->parent())) ? wp_get_theme()->parent() : wp_get_theme();
		$defaults = array(
			'theme-name'  => TMPCODER_PLUGIN_NAME,
			'theme-slug'  => TMPCODER_THEME,
			'author-logo' => get_template_directory_uri() . '/inc/admin/lib/welcome-screen/img/templatescoder.png',
			'actions'     => array(),
			'plugins'     => array(),
			'notice'      => '',
			'sections'    => array(),
			'edd'         => false,
			'download_id' => '',
		);

		$config = wp_parse_args( $config, $defaults );

		/**
		 * Configure our welcome screen
		 */
		$this->theme_name    = TMPCODER_PLUGIN_NAME;
		$this->theme_slug    = TMPCODER_THEME;
		$this->author_logo   = $config['author-logo'];
		$this->actions       = $config['actions'];
		$this->actions_count = $this->count_actions();
		$this->plugins       = $config['plugins'];
		$this->notice        = $config['notice'];
		$this->sections      = $config['sections'];
		$this->edd           = $config['edd'];
		$this->download_id   = $config['download_id'];

		if ( $this->edd ) {
			$this->strings = EDD_Theme_Helper::get_strings();
		}

		if ( empty( $config['sections'] ) ) {
			$this->sections = $this->set_default_sections( $config );
		}

		/**
		 * Create the dashboard page
		 */
		add_action( 'admin_menu', array( $this, 'welcome_screen_menu' ) );

		/**
		 * Load the welcome screen styles and scripts
		 */
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );

		add_action( 'admin_init', [$this, 'tmpcoder_register_addons_settings'] );
	}

	// Register Settings
	function tmpcoder_register_addons_settings() {

		// Integrations
	    register_setting( 'tmpcoder-settings', 'tmpcoder_mailchimp_api_key' );

	    // WooCommerce
	    register_setting( 'tmpcoder-settings', 'tmpcoder_add_wishlist_to_my_account' );
	    register_setting( 'tmpcoder-settings', 'tmpcoder_wishlist_page' );
    	register_setting( 'tmpcoder-settings', 'tmpcoder_compare_page' );
    	register_setting( 'tmpcoder-settings', 'tmpcoder_woo_shop_ppp' );
	    register_setting( 'tmpcoder-settings', 'tmpcoder_woo_shop_cat_ppp' );
	    register_setting( 'tmpcoder-settings', 'tmpcoder_woo_shop_tag_ppp' );
    	
	    // Extensions
        register_setting('tmpcoder-elements-settings', 'tmpcoder-particles');
        register_setting('tmpcoder-elements-settings', 'tmpcoder-parallax-background');
        register_setting('tmpcoder-elements-settings', 'tmpcoder-parallax-multi-layer');
        register_setting('tmpcoder-elements-settings', 'tmpcoder-custom-css');
        register_setting('tmpcoder-elements-settings', 'tmpcoder-sticky-section');
        register_setting('tmpcoder-elements-settings', 'tmpcoder-floating-effects');

        // Element Toggle
        if ( false == get_option( 'tmpcoder-element-toggle-all' ) ) {
			add_option( 'tmpcoder-element-toggle-all',"on" );
		}
	    register_setting( 'tmpcoder-elements-settings', 'tmpcoder-element-toggle-all', [ 'default' => 'on' ]  );

	    // Widgets
	    foreach ( tmpcoder_get_registered_modules() as $title => $data ) {
	        $slug = $data[0];
        	if ( false == get_option( 'tmpcoder-element-'.$slug ) ) {
				add_option( 'tmpcoder-element-'.$slug ,"on" );
			}
	        register_setting( 'tmpcoder-elements-settings', 'tmpcoder-element-'. $slug, [ 'default' => 'on' ] );
	    }

	    $theme_builder_modules = tmpcoder_get_theme_builder_modules();

	    $theme_builder_modules_pro = (tmpcoder_is_availble() && defined( 'TMPCODER_ADDONS_PRO_VERSION' )) ? Pro_Modules::tmpcoder_get_theme_builder_modules() : [];

        // Theme Builder
	    foreach ( array_merge($theme_builder_modules,$theme_builder_modules_pro) as $title => $data ) {
	        $slug = $data[0];
	        $slug = str_replace('-pro', '', $slug);
        	if ( false == get_option( 'tmpcoder-element-'.$slug ) ) {
				add_option( 'tmpcoder-element-'.$slug ,"on" );
			}
	        register_setting( 'tmpcoder-elements-settings', 'tmpcoder-element-'. $slug, [ 'default' => 'on' ] );
	    }

	    $woo_modules = tmpcoder_get_woocommerce_builder_modules();
	    $woo_modules_pro = (tmpcoder_is_availble() && defined( 'TMPCODER_ADDONS_PRO_VERSION' )) ? Pro_Modules::tmpcoder_get_woocommerce_builder_modules() : [];

	    // WooCommerce Builder
	    foreach ( array_merge($woo_modules, $woo_modules_pro) as $title => $data ) {
	        $slug = is_array($data) ? $data[0] : $data;
	        $slug = str_replace('-pro', '', $slug);
			if ( false == get_option( 'tmpcoder-element-'.$slug ) ) {
				add_option( 'tmpcoder-element-'.$slug ,"on" );
			}
	        register_setting( 'tmpcoder-elements-settings', 'tmpcoder-element-'. $slug, [ 'default' => 'on' ] );
	    }
	}
	
	/**
	 * Instance constructor
	 *
	 * @param array $config Configuration array.
	 *
	 * @returns object
	 */
	public static function get_instance( $config = array() ) {
		static $inst;

		if ( ! $inst ) {
			$inst = new TMPCODER_Welcome_Screen( $config );
		}

		return $inst;
	}
    
	/**
	 * Load welcome screen css and javascript
	 */
	public function enqueue() {
		if ( is_admin() ) {
			wp_enqueue_style(
				'welcome-screen',
				TMPCODER_PLUGIN_URI . 'inc/admin/lib/welcome-screen/css/welcome'.tmpcoder_script_suffix().'.css', 
                array(),  
                tmpcoder_get_plugin_version()
			);

			wp_enqueue_script(
				'welcome-screen',
				TMPCODER_PLUGIN_URI . 'inc/admin/lib/welcome-screen/js/welcome'.tmpcoder_script_suffix().'.js',
				array(
					'jquery-ui-slider',
				),
				tmpcoder_get_plugin_version()
			);

            wp_localize_script(
				'welcome-screen',
				'welcomeScreen',
				array(
					'nr_actions_required'      => absint( $this->count_actions() ),
					'template_directory'       => esc_url( get_template_directory_uri() ),
					'no_required_actions_text' => esc_html__( 'Hooray! There are no required actions for you right now.', 'sastra-essential-addons-for-elementor' ),
					'ajax_nonce'               => wp_create_nonce( 'welcome_nonce' ),
					'ajax_url'                 => admin_url('admin-ajax.php'),
					'activating_string'        => esc_html__( 'Activating', 'sastra-essential-addons-for-elementor' ),
					'body_class'               => 'appearance_page_' . $this->theme_slug . '-welcome',
					'no_actions'               => esc_html__( 'Hooray! There are no required actions for you right now.', 'sastra-essential-addons-for-elementor' ),
				)
			);
		}
	}

	/**
	 * Return the actions left
	 *
	 * @return array|mixed
	 */
	private function get_actions_left() {
		if ( ! empty( $this->actions ) ) {
			$actions_left = get_option( $this->theme_slug . '_actions_left', array() );
			return $actions_left;
		}

		return array();
	}

	/**
	 * Returns the plugins left to be installed
	 *
	 * @return array|mixed
	 */
	private function get_plugins_left() {
		if ( ! empty( $this->plugins ) ) {
			$plugins_left = get_option( $this->theme_slug . '_plugins_left', array() );
			if ( empty( $plugins_left ) ) {
				foreach ( $this->plugins as $plugin => $prop ) {
					$plugins_left[ $plugin ] = true;
				}

				return $plugins_left;
			}

			return $plugins_left;
		}

		return array();
	}


	/**
	 * Registers the welcome screen menu
	 */
	public function welcome_screen_menu() {
		
		$title = sprintf(
            /* Translators: 1: Menu Title */
             esc_html__( 'About %1$s', 'sastra-essential-addons-for-elementor' ), esc_html( TMPCODER_PLUGIN_NAME ) );

		if ( 0 < $this->actions_count ) {
			$title .= '<span class="badge-action-count">' . esc_html( $this->actions_count ) . '</span>';
		}
		
		if (did_action( 'elementor/loaded' )) {
			add_menu_page('Sastra Addons', 'Sastra Addons', 'manage_options', 'sastra-welcome',[$this,'render_welcome_screen'],TMPCODER_ADDONS_ASSETS_URL.'images/logo-icon.svg','58.6' );
		}
	}

	/**
	 * Render the welcome screen
	 */
	public function render_welcome_screen() {
		require_once( ABSPATH . 'wp-load.php' );
		require_once( ABSPATH . 'wp-admin/admin.php' );
		require_once( ABSPATH . 'wp-admin/admin-header.php' );

		$theme = (is_object(wp_get_theme()->parent())) ? wp_get_theme()->parent() : wp_get_theme();
        $tab   = isset( $_GET['tab'] ) ? sanitize_text_field( wp_unslash( $_GET['tab'] ) ) : 'getting-started';// phpcs:ignore WordPress.Security.NonceVerification.Recommended

		?>
		<div class="wrap tmpcoder-theme-wrap">
            <hr class="wp-header-end">
            
            <div class="about-wrap epsilon-wrap tmpcoder-theme-welcome">

            	<div class="top-header-main common-box-shadow">
					<div class="main-header-part">
					    <div class="row">
					        <div class="col-xl-6">
					            <div class="main-header-logo">
					            	<img src="<?php echo esc_url(TMPCODER_ADDONS_ASSETS_URL.'images/logo.png'); ?>" alt="Sastra-logo">
					            </div>
					        </div>
					        <div class="col-xl-6">
					            <div class="btn-group-main">
					            	<ul>
					            		<?php if (!defined( 'TMPCODER_ADDONS_PRO_VERSION' )) { ?>
					            		<li class="tmpcoder-upgrade-now-button"><a target="_blank" href="<?php echo esc_url( TMPCODER_PURCHASE_PRO_URL.'?ref=tmpcoder-welcome-screen' ); ?>" class="btn-link">
					            		<img src="<?php echo esc_url(TMPCODER_ADDONS_ASSETS_URL.'images/pro-icon.svg'); ?>">
					            		<span><?php echo esc_html__( 'Get Pro Now', 'sastra-essential-addons-for-elementor' ); ?></span>
					            		</a></li>
					            		<?php } ?>
					            		<li><a target="_blank" href="<?php echo esc_url( TMPCODER_SUPPORT_URL ); ?>" class="btn-link">
					            		<img src="<?php echo esc_url(TMPCODER_ADDONS_ASSETS_URL.'images/support.svg'); ?>">
					            		<span><?php echo esc_html__( 'Support', 'sastra-essential-addons-for-elementor' ); ?></span>
					            		</a></li>
					            		<li>
					            			<a target="_blank" href="<?php echo esc_url( TMPCODER_DOCUMENTATION_URL ); ?>" class="btn-link">
							            		<img src="<?php echo esc_url(TMPCODER_ADDONS_ASSETS_URL.'images/documentation.svg'); ?>">
							            		<span><?php echo esc_html__( 'Documentation', 'sastra-essential-addons-for-elementor' ); ?></span>	
					            			</a>
					            		</li>
					            	</ul>
					            </div>
					        </div>
					    </div>
					</div>

					<h2 class="nav-tab-wrapper wp-clearfix">
						
						<?php foreach ( $this->sections as $id => $section ) { ?>
							
							<?php $class = $id === $tab ? 'nav-tab-active' : ''; ?>

							<a class="nav-tab <?php echo esc_attr($class);  ?>" href="<?php echo esc_url( $section['url'] ); ?>">
								<img src="<?php echo esc_url(TMPCODER_ADDONS_ASSETS_URL.'images/'.$section['icon']); ?>">
								<span><?php echo wp_kses_post( $section['label'] ); ?></span>
							</a>
						<?php } ?>
					</h2>

				</div>

				<?php
				if (isset($this->sections[ $tab ]['path']) && $this->sections[ $tab ]['path'] != "") {
				 	
					require_once $this->sections[ $tab ]['path'];
			 	} 
			 	?>

            </div>
		</div>
		<?php
	}

	/**
	 * Count the number of actions left
	 *
	 * @return int
	 */
	private function count_actions() {
		$actions_left = get_option( $this->theme_slug . '_actions_left', array() );

		$i = 0;
		foreach ( $this->actions as $action ) {
			$true = false;

			if ( ! $action['check'] ) {
				$true = true;
			}

			if ( ! empty( $actions_left ) && isset( $actions_left[ $action['id'] ] ) && ! $actions_left[ $action['id'] ] ) {
				$true = false;
			}

			if ( $true ) {
				$i ++;
			}
		}

		return $i;
	}

	/**
	 * Generate url for the backend section tabs
	 *
	 * @param string $id Id of the backend tab.
	 *
	 * @return string
	 */
	public static function tmpcoder_generate_admin_url( $id = '' ) {
		$url = 'admin.php?page=%1$s-welcome&tab=%2$s';

        return admin_url( sprintf( $url, TMPCODER_THEME, $id ) );
	}

	/**
	 * Generate default sections, with exclusion
	 *
	 * @param array $config Configuration array.
	 *
	 * @return array
	 */
	private function set_default_sections( $config = array() ) {
		$arr = array(
			'getting-started'     => array(
				'id'    => 'getting-started',
				'icon'    => 'getting-start-tab.svg',
                'url'   => $this->tmpcoder_generate_admin_url( 'getting-started' ),
				'label' => __( 'Getting Started', 'sastra-essential-addons-for-elementor' ),
				'path'  => TMPCODER_PLUGIN_DIR . '/inc/admin/lib/welcome-screen/sections/getting-started.php',
			),
			'prebuilt-blocks' => array(
				'id'    => 'prebuilt-blocks',
				'icon'    => 'prebuilt-block-tab.svg',
				'url'   => $this->tmpcoder_generate_admin_url( 'prebuilt-blocks' ),
				'label' => __( 'Prebuilt Blocks', 'sastra-essential-addons-for-elementor' ),
				'path'  => TMPCODER_PLUGIN_DIR . '/inc/admin/lib/welcome-screen/sections/prebuilt-blocks.php',
			),
			'prebuilt-demos' => array(
				'id'    => 'prebuilt-demos',
				'icon'    => 'prebuilt-websites-tab.svg',
				'url'   => admin_url().'admin.php?page=tmpcoder-import-demo',
				'label' => __( 'Prebuilt Websites', 'sastra-essential-addons-for-elementor' ),
			),
			'site-builder' => array(
				'id'    => 'site-builder',
				'icon'    => 'site-builder-tab.svg',
				'url'   => $this->tmpcoder_generate_admin_url( 'site-builder' ),
				'label' => __( 'Site Builder', 'sastra-essential-addons-for-elementor' ),
				'path'  => TMPCODER_PLUGIN_DIR . '/inc/admin/lib/welcome-screen/sections/site-builder.php',
			),
			'widgets'   => array(
				'id'    => 'widgets',
				'icon'    => 'widget-setting-tab.svg',
				'url'   => $this->tmpcoder_generate_admin_url( 'widgets' ),
				'label' => __( 'Widget Settings', 'sastra-essential-addons-for-elementor' ),
				'path'  => TMPCODER_PLUGIN_DIR . '/inc/admin/lib/welcome-screen/sections/widgets.php',
			),
			'global-options'   => array(
				'id'    => 'global-options',
				'icon'  => 'global-setting-tab.svg',
				'url'   => admin_url('admin.php?page='.TMPCODER_THEME.'_addon_global_settings'),
				'label' => __( 'Global Options', 'sastra-essential-addons-for-elementor' ),
			),
			'settings'  => array(
				'id'    => 'settings',
				'icon'    => 'intigrations-tab.svg',
				'url'   => $this->tmpcoder_generate_admin_url( 'settings' ),
				'label' => __( 'Integrations', 'sastra-essential-addons-for-elementor' ),
				'path'  => TMPCODER_PLUGIN_DIR . '/inc/admin/lib/welcome-screen/sections/settings.php',
			),
			'system-info' => array(
				'id'    => 'system-info',
				'icon'    => 'system-info-tab.svg',
				'url'   => $this->tmpcoder_generate_admin_url( 'system-info' ),
				'label' => __( 'System Info', 'sastra-essential-addons-for-elementor' ),
				'path'  => TMPCODER_PLUGIN_DIR . '/inc/admin/lib/welcome-screen/sections/system-status.php',
			),
		);

		if (defined('TMPCODER_CURRENT_THEME_NAME') && TMPCODER_CURRENT_THEME_NAME != 'SastraWP') {    
			unset($arr['global-options']);
			unset($arr['prebuilt-demos']);
		}
		if (!class_exists('ReduxFramework')) {
			unset($arr['global-options']);
		}

		if ( isset( $config['sections_exclude'] ) && ! empty( $config['sections_exclude'] ) ) {
			foreach ( $config['sections_exclude'] as $id ) {
				unset( $arr[ $id ] );
			}
		}

		if ( isset( $config['sections_include'] ) && ! empty( $config['sections_include'] ) ) {
			foreach ( $config['sections_include'] as $id => $props ) {
				$arr[ $id ] = $props;
			}
		}

		$arr = apply_filters('tmpcoder_add_options_tabs', $arr);

		return $arr;
	}

}
