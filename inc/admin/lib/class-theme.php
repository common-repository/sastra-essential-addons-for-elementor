<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class TMPCODER_Sastra {

	public $theme_slug = 'sastra';

	function __construct() {

		$this->init_welcome_screen();
	}

	public function init_welcome_screen() {

		TMPCODER_Welcome_Screen::get_instance(
			$config = array(
				'theme-name' => 'Sastra',
				'theme-slug' => 'sastrawp',
				'actions'    => array(),
				'plugins'    => array(),
			)
		);
	}
}

new TMPCODER_Sastra();

