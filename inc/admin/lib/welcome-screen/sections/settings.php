<?php 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
?>
<div class="tmpcoder-settings-page">
    <form method="post" action="options.php">
        <?php 
            // Settings
            settings_fields( 'tmpcoder-settings' );
            do_settings_sections( 'tmpcoder-settings' );
        ?>
        <div class="tmpcoder-settings inte-settings common-box-shadow">
            <div class="tmpcoder-settings-group">
                <div class="tmpcoder-setting">
                    <h4>
                        <span class="mailchimp-label"><?php esc_html_e( 'MailChimp API Key', 'sastra-essential-addons-for-elementor' ); ?></span>
                    </h4>
                        
                    <a class="mailchimp-link" href="https://mailchimp.com/help/about-api-keys/" target="_blank"><?php esc_html_e( 'How to get MailChimp API Key?', 'sastra-essential-addons-for-elementor' ); ?></a>
                    <input type="text" name="tmpcoder_mailchimp_api_key" id="tmpcoder_mailchimp_api_key" value="<?php echo esc_attr(tmpcoder_get_settings('tmpcoder_mailchimp_api_key')); ?>">
                </div>
                <div class="tmpcoder-settings-group tmpcoder-settings-group-woo">
                    <div class="tmpcoder-settings-group-inner">
                    <?php if ( !tmpcoder_is_availble() ) : ?>

                        <div class="tmpcoder-settings-group-tooltip">
                            <div class="tmpcoder-setting">
                                <div class="tmpcoder-setting-inner">
                                    <h4>
                                        <span><?php esc_html_e( 'Shop Page: Products Per Page', 'sastra-essential-addons-for-elementor' ); ?></span>
                                        <br>
                                    </h4>
                                    <input type="text" value="6" disabled>
                                </div>
                                <div class="tmpcoder-setting-tooltip">
                                    <a href="<?php echo esc_attr(TMPCODER_PURCHASE_PRO_URL) ?>?ref=tmpcoder-plugin-backend-settings-woo-pro#purchasepro" class="tmpcoder-setting-tooltip-link" target="_blank">
                                        <span class="dashicons dashicons-lock"></span>
                                        <span class="dashicons dashicons-unlock"></span>
                                    </a>
                                    <div class="tmpcoder-setting-tooltip-text"><?php esc_html_e( 'Upgrade to Pro', 'sastra-essential-addons-for-elementor' ); ?></div>
                                </div>
                            </div>
                            <div class="tmpcoder-setting">
                                <div class="tmpcoder-setting-inner">
                                    <h4>
                                        <span><?php esc_html_e( 'Product Category: Products Per Page', 'sastra-essential-addons-for-elementor' ); ?></span>
                                        <br>
                                    </h4>
                                    <input type="text" value="6" disabled>
                                </div>
                                <div class="tmpcoder-setting-tooltip">
                                    <a href="<?php echo esc_attr(TMPCODER_PURCHASE_PRO_URL) ?>?ref=tmpcoder-plugin-backend-settings-woo-pro#purchasepro" class="tmpcoder-setting-tooltip-link" target="_blank">
                                        <span class="dashicons dashicons-lock"></span>
                                        <span class="dashicons dashicons-unlock"></span>
                                    </a>
                                    <div class="tmpcoder-setting-tooltip-text"><?php esc_html_e( 'Upgrade to Pro', 'sastra-essential-addons-for-elementor' ); ?></div>
                                </div>
                            </div>
                            <div class="tmpcoder-setting">
                                <div class="tmpcoder-setting-inner">
                                    <h4>
                                        <span><?php esc_html_e( 'Product Tag: Products Per Page', 'sastra-essential-addons-for-elementor' ); ?></span>
                                        <br>
                                    </h4>
                                    <input type="text" value="6" disabled>
                                </div>
                                <div class="tmpcoder-setting-tooltip">
                                    <a href="<?php echo esc_attr(TMPCODER_PURCHASE_PRO_URL) ?>?ref=tmpcoder-plugin-backend-settings-woo-pro#purchasepro" class="tmpcoder-setting-tooltip-link" target="_blank">
                                        <span class="dashicons dashicons-lock"></span>
                                        <span class="dashicons dashicons-unlock"></span>
                                    </a>
                                    <div class="tmpcoder-setting-tooltip-text"><?php esc_html_e( 'Upgrade to Pro', 'sastra-essential-addons-for-elementor' ); ?></div>
                                </div>
                            </div>
                        </div>
                    <?php else: ?>
                        <?php do_action('tmpcoder_woocommerce_settings'); ?>
                    <?php endif; ?>
                    </div>

                    <?php
                        if ( tmpcoder_is_availble() ) {
                            ?>
                                <div class="tmpcoder-woo-template-info">
                                    <div class="tmpcoder-woo-template-title">
                                        <h4>Add Wishlist To My Account</h4>
                                        <span>Adds wishlist menu item to my account widget</span>
                                    </div>
                                    <input type="checkbox" name="tmpcoder_add_wishlist_to_my_account" id="tmpcoder_add_wishlist_to_my_account" <?php echo checked( tmpcoder_get_settings('tmpcoder_add_wishlist_to_my_account', 'on'), 'on', false ); ?>>
                                    <label for="tmpcoder_add_wishlist_to_my_account"></label>
                                </div>

                                <div class="tmpcoder-woo-template-info tmpcoder-compare-wishlist">
                                    <?php
                                        $pages = get_pages(); // Get all pages on the site
                                        $current_page = tmpcoder_get_settings( 'tmpcoder_wishlist_page' ); // Get the current selected page
                                        echo '<label for="tmpcoder_wishlist_page">Select Wishlist Page</label>';
                                        echo '<select name="tmpcoder_wishlist_page" id="tmpcoder_wishlist_page" >';
                                        
                                        foreach ( $pages as $page ) {
                                            $selected = ( $current_page == $page->ID ) ? 'selected="selected"' : '';
                                            echo '<option value="' . esc_attr($page->ID) . '" ' . esc_attr($selected) . '>' . esc_html($page->post_title) . '</option>';
                                        }
                                        echo '</select>';
                                    ?>
                                </div>

                                <div class="tmpcoder-woo-template-info tmpcoder-compare-wishlist">
                                    <?php
                                        $pages = get_pages(); // Get all pages on the site
                                        $current_page = tmpcoder_get_settings( 'tmpcoder_compare_page' ); // Get the current selected page
                                        echo '<label for="tmpcoder_compare_page">Select Compare Page</label>';
                                        echo '<select name="tmpcoder_compare_page" id="tmpcoder_compare_page" >';
                                        
                                        foreach ( $pages as $page ) {
                                            $selected = ( $current_page == $page->ID ) ? 'selected="selected"' : '';
                                            echo '<option value="' . esc_attr($page->ID) . '" ' . esc_attr($selected) . '>' . esc_html($page->post_title) . '</option>';
                                        }
                                        echo '</select>';
                                    ?>
                                </div>
                          
                            <?php

                            do_action('tmpcoder_video_options_tab');
                        }
                        else
                        {
                            ?>

                            <div class="tmpcoder-settings-group-tooltip">
                                <div class="tmpcoder-woo-template-info tmpcoder-setting tmpcoder-add-wishlist">
                                    <div class="tmpcoder-setting-inner">
                                        <div class="tmpcoder-woo-template-title">
                                            <h4>Add Wishlist To My Account</h4>
                                            <span>Adds wishlist menu item to my account widget</span>
                                        </div>
                                        <input type="checkbox" id="tmpcoder_add_wishlist_to_my_account" disabled="disabled">
                                        <label for="tmpcoder_add_wishlist_to_my_account"></label>
                                    </div>
                                    <div class="tmpcoder-setting-tooltip">
                                        <a href="<?php echo esc_attr(TMPCODER_PURCHASE_PRO_URL) ?>?ref=tmpcoder-plugin-backend-settings-woo-pro#purchasepro" class="tmpcoder-setting-tooltip-link" target="_blank">
                                            <span class="dashicons dashicons-lock"></span>
                                            <span class="dashicons dashicons-unlock"></span>
                                        </a>
                                        <div class="tmpcoder-setting-tooltip-text"><?php esc_html_e( 'Upgrade to Pro', 'sastra-essential-addons-for-elementor' ); ?></div>
                                    </div>
                                </div>

                                <div class="tmpcoder-woo-template-info tmpcoder-compare-wishlist tmpcoder-setting">
                                    <div class="tmpcoder-setting-inner">
                                        <?php
                                            echo '<label for="tmpcoder_wishlist_page">Select Wishlist Page</label>';
                                            echo '<select name="tmpcoder_wishlist_page" id="tmpcoder_wishlist_page" disabled>';
                                            echo '<option>Select Wishlist Page</option>';
                                            echo '</select>';
                                        ?>
                                    </div>
                                    <div class="tmpcoder-setting-tooltip">
                                        <a href="<?php echo esc_attr(TMPCODER_PURCHASE_PRO_URL) ?>?ref=tmpcoder-plugin-backend-settings-woo-pro#purchasepro" class="tmpcoder-setting-tooltip-link" target="_blank">
                                            <span class="dashicons dashicons-lock"></span>
                                            <span class="dashicons dashicons-unlock"></span>
                                        </a>
                                        <div class="tmpcoder-setting-tooltip-text"><?php esc_html_e( 'Upgrade to Pro', 'sastra-essential-addons-for-elementor' ); ?></div>
                                    </div>
                                </div>
                                
                                <div class="tmpcoder-woo-template-info tmpcoder-compare-wishlist tmpcoder-setting">
                                    <div class="tmpcoder-setting-inner">
                                        <?php 
                                        echo '<label for="tmpcoder_compare_page">Select Compare Page</label>';
                                        echo '<select name="tmpcoder_compare_page" id="tmpcoder_compare_page" disabled>';
                                        echo '<option>Select Compare Page</option>';     
                                        echo '</select>';
                                        ?>
                                    </div>
                                    <div class="tmpcoder-setting-tooltip">
                                        <a href="<?php echo esc_attr(TMPCODER_PURCHASE_PRO_URL) ?>?ref=tmpcoder-plugin-backend-settings-woo-pro#purchasepro" class="tmpcoder-setting-tooltip-link" target="_blank">
                                            <span class="dashicons dashicons-lock"></span>
                                            <span class="dashicons dashicons-unlock"></span>
                                        </a>
                                        <div class="tmpcoder-setting-tooltip-text"><?php esc_html_e( 'Upgrade to Pro', 'sastra-essential-addons-for-elementor' ); ?></div>
                                    </div>
                                </div>  
                                <div class="tmpcoder-woo-template-info tmpcoder-compare-wishlist tmpcoder-setting">
                                    <h3><?php echo esc_html('Enable featured video option for post types') ?></h3>
                                    <div class="tmpcoder-setting-tooltip">
                                        <a href="<?php echo esc_attr(TMPCODER_PURCHASE_PRO_URL) ?>?ref=tmpcoder-plugin-backend-settings-woo-pro#purchasepro" class="tmpcoder-setting-tooltip-link" target="_blank">
                                            <span class="dashicons dashicons-lock"></span>
                                            <span class="dashicons dashicons-unlock"></span>
                                        </a>
                                        <div class="tmpcoder-setting-tooltip-text"><?php esc_html_e( 'Upgrade to Pro', 'sastra-essential-addons-for-elementor' ); ?></div>
                                    </div>
                                </div>
                                <?php 
                                $args = array(
                                   'public'   => true,
                                   '_builtin' => false
                                );
                                $output = 'names'; // 'names' or 'objects' (default: 'names')
                                $operator = 'and'; // 'and' or 'or' (default: 'and')
                                $post_types = get_post_types( $args, $output, $operator );
                                $post_types['post'] = "post"; 
                                $post_types['page'] = "page"; 
                                if ( $post_types ) { 
                                    foreach ( $post_types  as $post_type ) { //Add menu to exist custom post type                       
                                        $pt = get_post_type_object( $post_type );
                                        echo '<div class="tmpcoder-pty-cls tmpcoder-woo-template-info"><div class="tmpcoder-posty-labl">' . esc_html($pt->labels->name) . '</div>'; 
                                        ?>
                                            <input type="checkbox" id="video-<?php echo esc_attr($post_type); ?>" value="<?php echo esc_attr($post_type); ?>" disabled="disabled">
                                            <label class="tmpcoder_onoff_switcher" for="video-<?php echo esc_attr($post_type); ?>">
                                                <span class="tmpcoder_onoff_slder"></span>
                                            </label>

                                        <?php
                                        echo "</div>";
                                        ?>

                                        <?php
                                    }                      
                                }
                                ?>
                            </div>
                            <?php
                        }
                    ?>
                </div>

                <?php if (! tmpcoder_is_availble() ) : ?>
                    <div class="tmpcoder-settings-group-tooltip">
                        <div class="tmpcoder-woo-template-info tmpcoder-compare-wishlist tmpcoder-setting">
                            <h3><?php echo esc_html('Enable Secondary Featured Image') ?></h3>
                            <div class="tmpcoder-setting-tooltip">
                                <a href="<?php echo esc_attr(TMPCODER_PURCHASE_PRO_URL) ?>?ref=tmpcoder-plugin-backend-settings-woo-pro#purchasepro" class="tmpcoder-setting-tooltip-link" target="_blank">
                                    <span class="dashicons dashicons-lock"></span>
                                    <span class="dashicons dashicons-unlock"></span>
                                </a>
                                <div class="tmpcoder-setting-tooltip-text"><?php esc_html_e( 'Upgrade to Pro', 'sastra-essential-addons-for-elementor' ); ?></div>
                            </div>
                            
                        </div>
                        <?php
                        $post_types = tmpcoder_get_custom_types_of( 'post', false );
                        foreach ( $post_types as $key => $value ) {
                            if ( 'page' == $key || 'e-landing-page' === $key ) {
                                continue;
                            }
                            ?>
                                <div class="tmpcoder-woo-template-info">
                                    <div class="tmpcoder-woo-template-title">
                                        <div><?php echo esc_html($value); ?></div>
                                    </div>
                                    <input type="checkbox" id="tmpcoder_image_options_<?php echo esc_attr($key) ?>" disabled="disabled">
                                    <label for="tmpcoder_image_options_<?php echo esc_attr($key) ?>"></label>
                                </div>
                            <?php
                        }
                        ?>
                    </div>
                <?php else: ?>
                    <?php do_action('tmpcoder_secondary_image_options_tab'); ?>
                <?php endif; ?>

            </div>
            <?php submit_button( '', 'tmpcoder-options-button' ); ?>
        </div>  
        <div class="welcome-backend-loader">
            <img src="<?php echo esc_url(TMPCODER_ADDONS_ASSETS_URL.'images/backend-loader.gif'); ?>" alt="" width="80" height="80" />
        </div>
        <div class="tmpcoder-settings-saved">
            <span><?php esc_html_e('Options Updated', 'sastra-essential-addons-for-elementor'); ?></span>
            <span class="dashicons dashicons-smiley"></span>
        </div>
    </form>
</div>