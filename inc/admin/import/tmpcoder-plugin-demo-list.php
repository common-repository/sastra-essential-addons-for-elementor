<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// Register Menus
function tmpcoder_add_import_demo_menu() {
    add_submenu_page( TMPCODER_THEME.'-welcome', 'Prebuilt Websites', 'Prebuilt Websites', 'manage_options', 'tmpcoder-import-demo', 'tmpcoder_import_demo_list' );
}

add_action( 'admin_menu', 'tmpcoder_add_import_demo_menu' );

function tmpcoder_import_demo_list(){

    $is_cf7_active = is_plugin_active('contact-form-7/wp-contact-form-7.php') ? true : false;
    $is_woo_active = is_plugin_active('woocommerce/woocommerce.php') ? true : false;
    $is_redux_active = is_plugin_active('redux-framework/redux-framework.php') ? true : false;
    $is_acf_active = is_plugin_active('advanced-custom-fields/acf.php') ? true : false;

    $import_demos = array();
    
    $is_valid = 1;
    $registration_link = admin_url('admin.php?page='.TMPCODER_THEME.'-welcome&tab=registration');
    $current_active_demo = get_option('tmpcoder_current_active_demo');

    ?>

    <div class="tmpcoder-import-demo-page">
        <header>
            <div class="tmpcoder-import-demo-left">
                <div class="tmpcoder-import-demo-logo">
                    <div class="import-header-logo"><img src="<?php echo esc_url(TMPCODER_ADDONS_ASSETS_URL .'images/logo.png'); ?>">
                    </div>
                    <h1><?php esc_html_e('Prebuilt Websites', 'sastra-essential-addons-for-elementor'); ?></h1>
                </div>
            </div>

            <div class="tmpcoder-import-demo-right">
                <div class="tmpcoder-import-demo-search">
                    <input type="text" autocomplete="off" placeholder="<?php esc_html_e('Search Websites...', 'sastra-essential-addons-for-elementor'); ?>">
                    <span class="dashicons dashicons-search"></span>
                </div>

                <div class="tmpcoder-import-demo-price-filter">
                    <span data-price="mixed"><?php esc_html_e('Filter', 'sastra-essential-addons-for-elementor'); ?></span>
                    <span class="dashicons dashicons-arrow-down-alt2"></span>
                    <ul>
                        <li><?php esc_html_e('All', 'sastra-essential-addons-for-elementor'); ?></li>
                        <li><?php esc_html_e('Free', 'sastra-essential-addons-for-elementor'); ?></li>
                        <li><?php esc_html_e('Pro', 'sastra-essential-addons-for-elementor'); ?></li>
                    </ul>
                </div>
            </div>
        </header>

    <?php

    if ( $is_valid ){

        $import_error_msg = '';
        $import_demos_resp = TMPCODER_Remote_Api::get_prebuilt_demos();

        if ( isset($import_demos_resp['status']) && $import_demos_resp['status'] == 'success' ){
            $import_demos = $import_demos_resp['data'];
        }else{
            $import_error_msg = isset($import_demos_resp['message']) ? $import_demos_resp['message'] : '';
        }
        
        ?>

        <?php 
        if ( !empty($import_demos) && $import_error_msg == '' ){ ?>

            <div class="tmpcoder-import-demo-grid main-grid">

            <?php
            foreach ($import_demos as $demo_key => $demo_value) {
                $value = (array) $demo_value;

                $required_plugins = (array) $value['require-plugins-list'];
                $plugin_list = [];
                $is_price = isset($value['is_pro']) && $value['is_pro'] ? 'pro' : 'free';
                $is_upgrade_pro = isset($value['is_upgrade_pro']) && $value['is_upgrade_pro'] ? 'pro' : 'free';

                if ($required_plugins) {
                    if (isset($required_plugins['contact-form-7'])) {
                        $plugin_list['contact-form-7'] = $is_cf7_active;
                    }
                    if (isset($required_plugins['redux-framework'])) {
                        $plugin_list['redux-framework'] = $is_redux_active;
                    }
                    if (isset($required_plugins['woocommerce'])) {
                        $plugin_list['woocommerce'] = $is_woo_active;
                    }
                    if (isset($required_plugins['advanced-custom-fields'])) {
                        $plugin_list['advanced-custom-fields'] = $is_acf_active;
                    }
                }

                ?>
                <div class="col plugin_box grid-item" data-price="<?php echo esc_attr($is_price); ?>" data-title="<?php echo esc_attr(strtolower($value['name'])) ?>">
                    <?php if ( isset($value['new']) ){ ?>
                    <img src="<?php echo esc_url( TMPCODER_PLUGIN_URI .'/assets/images/new-tag-icon.png' ); ?>" alt="" loading="lazy" class="new-tag-icon" />
                    <?php } ?>

                    <div class="grid-item-inn">
                        <a target="_blank" title="<?php echo esc_attr('View '.$value['name'], 'sastra-essential-addons-for-elementor'); ?>" href="<?php echo esc_url($value['preview-url'], 'sastra-essential-addons-for-elementor') ?>"><img src="<?php echo esc_url( $value['image'] ); ?>" alt="plugin box image" class="demo-preview" loading="lazy"></a>

                        <div class="action_bar">
                            <span class="plugin_name"><?php echo esc_html( $value['name'] ); ?></span>
                        </div>
                        <span class="import-demo-box action_button active">
                            <?php
                            if ($current_active_demo == $value['theme-demo-slug']) {
                                ?>
                                <a href="#import-demo-popup" class="button button-primary uninstall-button"> <?php echo esc_html('Uninstall', 'sastra-essential-addons-for-elementor') ?></a>
                                <?php
                            }
                            else
                            {
                                if ($is_upgrade_pro == 'pro') { ?>
                                    <a href="<?php echo esc_url(TMPCODER_PURCHASE_PRO_URL.'?ref=tmpcoder-import-demo'); ?>" class="button button-primary upgrade-btn" target="_blank" > <?php echo esc_html('Upgrade to PRO', 'sastra-essential-addons-for-elementor') ?></a>
                                <?php }
                                else
                                { ?>
                                <a class="button button-primary import-demo-content" data-id="<?php echo esc_attr('Import Site', 'sastra-essential-addons-for-elementor') ?>" data-url="<?php echo esc_url(home_url()); ?>" data-loading="<?php echo esc_attr('Importing...', 'sastra-essential-addons-for-elementor') ?>" href="javascript:void(0)" data-theme-status="<?php echo esc_attr(tmpcoder_get_theme_status()); ?>"> <?php echo esc_attr( 'Import Site' ); ?>
                                </a>     
                                <?php }
                                ?>
                               <?php 
                            }

                            ?>
                            <a target="_blank" href="<?php echo esc_url($value['preview-url'], 'sastra-essential-addons-for-elementor') ?>" class="button button-secondary demo-preview-btn"> <span class="dashicons dashicons-external"></span><?php echo esc_html('Preview', 'sastra-essential-addons-for-elementor') ?></a>

                            <?php if(isset($value['require-plugins-list'])){ ?>
                            <span class="install-required-plugins" data-file="<?php echo esc_attr(wp_json_encode($plugin_list), 'sastra-essential-addons-for-elementor'); ?>">
                            </span>
                            <?php } ?>

                            <?php if(isset($value['xml-file-url'])){ ?>
                            <span class="xml-file-url" data-file=""></span>
                            <?php } ?>

                            <?php if(isset($value['customizer-file-url'])){ ?>
                            <span class="customizer-file-url" data-file=""></span>
                            <?php } ?>
                            
                            <?php if(isset($value['widget-file-url'])){ ?>
                            <span class="widget-file-url" data-file=""></span>
                            <?php } ?>

                            <?php if(isset($value['elementor-file-url'])){ ?>
                            <span class="elementor-file-url" data-file=""></span>
                            <?php } ?>

                            <?php if(isset($value['redux-file-url'])){ ?>
                            <span class="redux-file-url" data-file=""></span>
                            <?php } ?>

                            <?php if(isset($value['revslider-file-url'])){ ?>
                            <span class="revslider-file-url" data-file=""></span>
                            <?php } ?>

                            <?php if(isset($value['register-cpt-data'])){ ?>
                            <span class="tmpcoder-cpt-data" data-file="<?php echo esc_attr($value['register-cpt-data'], 'sastra-essential-addons-for-elementor'); ?>"></span>
                            <?php } ?>

                            <?php if(isset($value['theme-demo-slug'])){ ?>
                            <span class="theme-demo-slug" data-file="<?php echo esc_attr($value['theme-demo-slug'], 'sastra-essential-addons-for-elementor'); ?>"></span>
                            <?php } ?>
                        </span>
                    </div>
                </div>
            
            <?php 
            }
            ?>
            </div>
            <?php
            
        }else if ($import_error_msg != '') {
            echo '<div class="not-found-message">'.esc_html($import_error_msg).'</div>';
        }else{
            echo '<div class="not-found-message">'.esc_html('There`s currently no demo available. Please try again later').'</div>';
        } ?>
        
        <div class="tmpcoder-import-demo-not-found">
            <h1><?php esc_html_e('No Search Results Found.', 'sastra-essential-addons-for-elementor'); ?></h1>
            <p><?php esc_html_e('Can\'t find a Demo you are looking for?', 'sastra-essential-addons-for-elementor'); ?></p>
        </div>

        <?php 
        }else{ ?>
        <div class="tmpcoder-message-box">
            <h3><?php esc_html_e('Demos can only be imported with valid product registration', 'sastra-essential-addons-for-elementor'); ?></h3>
            <p><?php 
            echo esc_html_e("Enter a valid purchase code to import the full demo", 'sastra-essential-addons-for-elementor');
            ?></p>
            <a href="<?php echo esc_url($registration_link); ?>" class="button"><?php echo esc_html_e('Product Registration', 'sastra-essential-addons-for-elementor'); ?></a>
        </div>
        <?php 
        } ?>

        </div>

        <div class="tmpcoder-import-popup-wrap tmpcoder-admin-popup-wrap">
            <div class="tmpcoder-import-popup tmpcoder-admin-popup">
                <div id="import-demo-popup" class="white-popup-1 mfp-hide">
                    <h2 class="popup-heading"><span class="dashicons dashicons-info"></span> <?php esc_html_e('Importing Demo', 'sastra-essential-addons-for-elementor') ?></h2>
                    <div class="popup-content">
                        <span class="import-data-note"><?php esc_html_e('Please do not refresh or close the page while importing data is in progress.', 'sastra-essential-addons-for-elementor') ?></span><br><br>
                        <span class="import-data-note-2"><?php esc_html_e('The import process can take a few minutes depending on the size of the site you are importing and speed of the server.', 'sastra-essential-addons-for-elementor') ?>
                        </span>
                        <h4 class="demo-sub-title"><?php esc_html_e('Importing', 'sastra-essential-addons-for-elementor') ?> <strong class="demo-name"></strong> <?php esc_html_e('in progress...', 'sastra-essential-addons-for-elementor') ?></h4>
                        <p class="message-text"></p>
                        <ul>
                            <li>
                                <div class="checklist-item">
                                    <input type="checkbox" name="importlist[install_required_plugins]" disabled="" />
                                    <label><?php esc_html_e('Installing/Activating required plugins', 'sastra-essential-addons-for-elementor') ?></label>
                                    <img id="install-plugin-loader" class="import-loader-img" src="<?php echo esc_url( TMPCODER_PLUGIN_URI.'assets/images/loader.gif') ?>" alt="share">
                                </div>
                            </li>
                            <li>
                                <div class="checklist-item">
                                    <input type="checkbox" name="importlist[preparing_data]" disabled="" />
                                    <label><?php esc_html_e('Deleting previously imported demo', 'sastra-essential-addons-for-elementor') ?></label>
                                    <img id="prepare-data-loader" class="hide-import-img-loader import-loader-img" src="<?php echo esc_url(TMPCODER_PLUGIN_URI.'assets/images/loader.gif'); ?>" alt="share">
                                </div>
                            </li>
                            <li>
                                <div class="checklist-item">
                                    <input type="checkbox" name="importlist[install_content]" disabled="" />
                                    <label><?php esc_html_e('Import site content', 'sastra-essential-addons-for-elementor') ?></label>
                                    <img id="install-content-loader" class="hide-import-img-loader import-loader-img" src="<?php echo esc_url(TMPCODER_PLUGIN_URI.'assets/images/loader.gif'); ?>" alt="share">
                                </div>
                            </li>
                            <li>
                                <div class="checklist-item">
                                    <input type="checkbox" name="importlist[install_site_settings]" disabled="" />
                                    <label><?php esc_html_e('Import site settings', 'sastra-essential-addons-for-elementor') ?></label>
                                    <img id="site-setting-loader" class="hide-import-img-loader import-loader-img" src="<?php echo esc_url(TMPCODER_PLUGIN_URI.'assets/images/loader.gif'); ?>" alt="share">
                                </div>
                            </li>
                            <li>
                                <div class="checklist-item">
                                    <input type="checkbox" name="importlist[install_elementor_settings]" disabled="" />
                                    <label><?php esc_html_e('Import elementor settings', 'sastra-essential-addons-for-elementor') ?></label>
                                    <img id="elementor-setting-loader" class="hide-import-img-loader import-loader-img" src="<?php echo esc_url(TMPCODER_PLUGIN_URI.'assets/images/loader.gif'); ?>" alt="share">
                                </div>
                            </li>
                            <li>
                                <div class="checklist-item">
                                    <input type="checkbox" name="importlist[install_revslider_data]" disabled="" />
                                    <label><?php esc_html_e('Import revolution slider data', 'sastra-essential-addons-for-elementor') ?></label>
                                    <img id="revslider-data-loader" class="hide-import-img-loader import-loader-img" src="<?php echo esc_url(TMPCODER_PLUGIN_URI.'assets/images/loader.gif'); ?>" alt="share">
                                </div>
                            </li>
                            <li>
                                <div class="checklist-item">
                                    <input type="checkbox" name="importlist[install_widgets]" disabled="" />
                                    <label><?php esc_html_e('Import widget data', 'sastra-essential-addons-for-elementor') ?></label>
                                    <img id="install-widget-loader" class="hide-import-img-loader import-loader-img" src="<?php echo esc_url(TMPCODER_PLUGIN_URI.'assets/images/loader.gif'); ?>" alt="share">
                                </div>
                            </li>
                        </ul>
                        <div class="error-message-text-button">
                            <p class="display-error-message"></p>
                            <button class="tmpcoder-retry-import button button-primary"><?php esc_html_e('Resume Import Procces', 'sastra-essential-addons-for-elementor') ?></button>
                        </div>
                        <div class="progress-counter"> <?php esc_html_e('0/5 completed', 'sastra-essential-addons-for-elementor') ?> </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="0"
                            aria-valuemin="0" aria-valuemax="100" style="width:0%">
                                <?php esc_html_e('0%', 'sastra-essential-addons-for-elementor') ?>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div id="import-process-complete-popup" class="white-popup-1 mfp-hide">
                    <h2 class="popup-heading"><span class="dashicons dashicons-yes-alt"></span> <?php esc_html_e('Congratulations!', 'sastra-essential-addons-for-elementor') ?></h2>
                    <div class="popup-content">
                        <p class="popup-message"></p>
                        <div class="align-right-side">
                            <a class="button button-primary popup-close"><?php esc_html_e('OK', 'sastra-essential-addons-for-elementor') ?></a>
                        </div>
                    </div>
                </div>

                <div id="uninstall-demo-popup" class="white-popup-1 mfp-hide">
                    <h2 class="popup-heading"><span class="dashicons dashicons-info"></span> <?php esc_html_e('Uninstalling Demo', 'sastra-essential-addons-for-elementor') ?></h2>
                    <div class="popup-content">
                        <span class="import-data-note"><?php esc_html_e('Please do not refresh or close the page while uninstalling data is in progress.', 'sastra-essential-addons-for-elementor') ?></span>
                        <h4 class="demo-sub-title"><?php esc_html_e('Uninstalling', 'sastra-essential-addons-for-elementor') ?> <strong class="uninstall-demo-name"></strong> <?php esc_html_e('in progress...', 'sastra-essential-addons-for-elementor') ?></h4>
                        
                        <div class="progress-counter"><?php esc_html_e('0/1 completed', 'sastra-essential-addons-for-elementor') ?></div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="70"
                            aria-valuemin="0" aria-valuemax="100" style="width:70%">
                                <?php esc_html_e('70%', 'sastra-essential-addons-for-elementor') ?>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="import-demo-uninstall-popup" class="white-popup mfp-hide">
                    <h2 class="popup-heading"><span class="dashicons dashicons-editor-help"></span> <?php esc_html_e('Warning', 'sastra-essential-addons-for-elementor') ?> </h2>
                    <div class="popup-content">
                        <h3 class="content-title"><?php esc_html_e('Are you sure want to uninstall this demo?', 'sastra-essential-addons-for-elementor') ?></h3>
                        <p class="popup-message"><?php esc_html_e('This will remove dummy content and also all widgets you add in this demo. We highly recommend you to create backup before continue.', 'sastra-essential-addons-for-elementor') ?></p>
                        <a class="button button-primary uninstall-confirm-button"><?php esc_html_e('OK', 'sastra-essential-addons-for-elementor') ?></a>
                        <a class="button button-secondary popup-close"><?php esc_html_e('Cancel', 'sastra-essential-addons-for-elementor') ?></a>
                    </div>
                </div>
            </div>
        </div>

    <?php 
}

add_action('admin_enqueue_scripts','tmpcoder_demo_import_scripts_func');

if ( ! function_exists( 'tmpcoder_demo_import_scripts_func' ) ) :
    
    function tmpcoder_demo_import_scripts_func() {

        wp_enqueue_script( 'tmpcoder-plugin-import-demos', plugins_url( 'inc/admin/import/assets/js/tmpcoder-plugin-import-demos'.tmpcoder_script_suffix().'.js', TMPCODER_PLUGIN_FILE ), ['updates'] , TMPCODER_PLUGIN_VER, true);

        wp_enqueue_style('tmpcoder-plugin-import-demos', plugins_url( 'inc/admin/import/assets/css/tmpcoder-plugin-import-demos'.tmpcoder_script_suffix().'.css', TMPCODER_PLUGIN_FILE ), [] , TMPCODER_PLUGIN_VER, false);

        wp_localize_script( 'tmpcoder-plugin-import-demos', 'tmpcoder_ajax_object', array( 
            'ajax_url' => admin_url( 'admin-ajax.php' ),
            'site_url' => site_url(),
            'nonce' => wp_create_nonce('sastra-addons'),
            'start_import_message' => __('Start Importing...', 'sastra-essential-addons-for-elementor'),
            'delete_previews_demo_message' => __('Delete previously imported demo...', 'sastra-essential-addons-for-elementor'),
            'import_site_content_message' => __('Importing Site Content...', 'sastra-essential-addons-for-elementor'),
            'invalid_request_url_message' => __('! Invalid Request URL', 'sastra-essential-addons-for-elementor'),
            'import_site_content_faild_message' => __('Importing Site Content Failed.- Server Timeout Error', 'sastra-essential-addons-for-elementor'),
            'import_site_options_message' => __('Importing Site Options...', 'sastra-essential-addons-for-elementor'),
            'import_site_options_failed_message' => __('Failed - Importing Site Options...', 'sastra-essential-addons-for-elementor'),
            'import_elementor_options_message' => __('Importing Elementor Options...', 'sastra-essential-addons-for-elementor'),
            'import_elementor_failed_message' => __('Failed - Importing Elementor Options...', 'sastra-essential-addons-for-elementor'),
            'reset_widgets_message' => __('Reset Widgets...', 'sastra-essential-addons-for-elementor'),
            'reset_widgets_failed_message' => __('Failed - Reset Widgets...', 'sastra-essential-addons-for-elementor'),
            'importing_widgets_message' => __('Importing Widgets...', 'sastra-essential-addons-for-elementor'),
            'demo_import_success_message' => __('Demo imported successfully', 'sastra-essential-addons-for-elementor'),
            'import_process_sucess_message' => __('Import process success', 'sastra-essential-addons-for-elementor'),
            'uninstall_process_sucess_message' => __('Uninstall process success', 'sastra-essential-addons-for-elementor'),
            'import_revslider_data_message' => __('Import Revolution Slider Data ', 'sastra-essential-addons-for-elementor'),
            'import_revslider_failed_message' => __('Failed - Importing Revolution Slider Data ', 'sastra-essential-addons-for-elementor'),
            'install_plugin_failed_message' => __('Failed - Install/Active Required plugins', 'sastra-essential-addons-for-elementor'),
        ));
    }
endif;

/**
** Get Theme Status
*/

if (!function_exists('tmpcoder_get_theme_status')) {
    
    function tmpcoder_get_theme_status() {
        $theme = wp_get_theme();

        // Theme installed and activate.
        if ( 'SastraWP' === $theme->name || 'SastraWP' === $theme->parent_theme ) {
            return 'req-theme-active';
        }

        // Theme installed but not activate.
        foreach ( (array) wp_get_themes() as $theme_dir => $theme ) {
            if ( 'SastraWP' === $theme->name || 'SastraWP' === $theme->parent_theme ) {
                return 'req-theme-inactive';
            }
        }

        return 'req-theme-not-installed';
    }
}