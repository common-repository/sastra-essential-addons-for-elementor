<?php
namespace TMPCODER\Widgets;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Image_Size;
use Elementor\Group_Control_Css_Filter;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Repeater;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Widget_Base;
use Elementor\Utils;
use Elementor\Icons;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class TMPCODER_Price_List extends Widget_Base {
		
	public function get_name() {
		return 'tmpcoder-price-list';
	}

	public function get_title() {
		return esc_html__( 'Price List', 'sastra-essential-addons-for-elementor' );
	}

	public function get_icon() {
		return 'tmpcoder-icon eicon-price-list';
	}

	public function get_categories() {
		return [ 'tmpcoder-widgets-category'];
	}

	public function get_keywords() {
		return [ 'pricing list', 'price list', 'price menu', 'pricing menu', 'food menu', 'restaurant menu' ];
	}

    public function get_custom_help_url() {
		return TMPCODER_NEED_HELP_URL;
    }

	public function add_repeater_args_prlist_image() {
		return [
			'type' => Controls_Manager::HIDDEN,
			'default' => ''
		];
	}

	public function add_repeater_args_prlist_link() {
		return [
			'type' => Controls_Manager::HIDDEN,
			'default' => ''
		];
	}
	public function add_control_prlist_position() {}
	
	public function add_control_prlist_vr_position() {}
	
	public function add_section_style_image() {}

	protected function register_controls() {
		
		// Section: Items -----------
		$this->start_controls_section(
			'section_price_list_items',
			[
				'label' => esc_html__( 'Items', 'sastra-essential-addons-for-elementor' ),
			]
		);

		tmpcoder_library_buttons( $this, Controls_Manager::RAW_HTML );
		
		$repeater = new Repeater();

		$repeater->add_control(
			'prlist_title',
			[
				'label' => esc_html__( 'Title', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default' => 'Sweet Cakes',
			]
		);

		$repeater->add_control(
			'prlist_price',
			[
				'label' => esc_html__( 'Price', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default' => '$30',
			]
		);

		$repeater->add_control(
			'prlist_old_price',
			[
				'label' => esc_html__( 'Old Price', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default' => '',
			]
		);

		$repeater->add_control(
			'prlist_description',
			[
				'label'   	=> esc_html__( 'Description', 'sastra-essential-addons-for-elementor' ),
				'type'    	=> Controls_Manager::TEXTAREA,
				'dynamic' => [
					'active' => true,
				],
				'default' => 'Lorem ipsum dolor sit amet, mea ei viderer probatus consequuntur, sonet vocibus lobortis has ad. Eos erant indoctum an, dictas invidunt est ex, et sea consulatu torquatos. Best pricing list widget.',
			]
		);

		$repeater->add_control( 'prlist_image', $this->add_repeater_args_prlist_image() );

		$repeater->add_control( 'prlist_link', $this->add_repeater_args_prlist_link() );

		if ( ! tmpcoder_is_availble() ) {
			$repeater->add_control(
				'price_list_pro_notice',
				[
					'type' => Controls_Manager::RAW_HTML,
					'raw' => '<span style="color:#2a2a2a;">Custom Image, Image Position and Custom Link</span> options are available<br> in the <strong><a href="'.TMPCODER_PURCHASE_PRO_URL.'?ref=rea-plugin-panel-price-list-upgrade-pro#purchasepro" target="_blank">Pro version</a></strong>',
					'content_classes' => 'tmpcoder-pro-notice',
				]
			);
		}

		$this->add_control(
			'prlist_items',
			[
				'type' => Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[
						'prlist_title' => 'Sweet Cakes',
						'prlist_price' => '$30',
						'prlist_description' => 'Lorem ipsum dolor sit amet, mea ei viderer probatus consequuntur, sonet vocibus lobortis has ad. Eos erant indoctum an, dictas invidunt est ex, et sea consulatu torquatos. Best pricing list widget.',
						'prlist_image' => [
							'url' => Utils::get_placeholder_image_src(),
						],
					],
					[
						'prlist_title' => 'Fresh Vegetables',
						'prlist_price' => '$50',
						'prlist_description' => 'Lorem ipsum dolor sit amet, mea ei viderer probatus consequuntur, sonet vocibus lobortis has ad. Eos erant indoctum an, dictas invidunt est ex, et sea consulatu torquatos. Best pricing list widget.',
						'prlist_image' => [
							'url' => Utils::get_placeholder_image_src(),
						],
					],
					[
						'prlist_title' => 'White Potatoes',
						'prlist_price' => '$27',
						'prlist_old_price' => '35',
						'prlist_description' => 'Lorem ipsum dolor sit amet, mea ei viderer probatus consequuntur, sonet vocibus lobortis has ad. Eos erant indoctum an, dictas invidunt est ex, et sea consulatu torquatos. Best pricing list widget.',
						'prlist_image' => [
							'url' => Utils::get_placeholder_image_src(),
						],
					],
				],
				'title_field' => '{{{ prlist_title }}}',
			]
		);

		$this->add_control_prlist_position();

		$this->add_control_prlist_vr_position();

		$this->end_controls_section(); // End Controls Section

		// Section: Request New Feature
		tmpcoder_add_section_request_feature( $this, Controls_Manager::RAW_HTML, '' );

		// Section: Pro Features
		tmpcoder_pro_features_list_section( $this, '', Controls_Manager::RAW_HTML, 'price-list', [
			'Add Images to Menu Items',
			'Add Custom Links to Menu Items',
			'Advanced Layout Options',
		] );
		
		// Styles
		// Section: General ----------
		$this->start_controls_section(
			'section_style_general',
			[
				'label' => esc_html__( 'General', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name' => 'general_bg_color',
				'types' => [ 'classic', 'gradient' ],
				'selector' => '{{WRAPPER}} .tmpcoder-price-list-item'
			]
		);

		$this->add_responsive_control(
			'general_gutter',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Gutter', 'sastra-essential-addons-for-elementor' ),
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 50,
					]
				],
				'default' => [
					'unit' => 'px',
					'size' => 5,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-item' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'general_padding',
			[
				'label' => esc_html__( 'Padding', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'default' => [
					'top' => 10,
					'right' => 10,
					'bottom' => 10,
					'left' => 10,
				],
				'size_units' => [ 'px' ],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'general_border',
				'label' => esc_html__( 'Border', 'sastra-essential-addons-for-elementor' ),
				'fields_options' => [
					'color' => [
						'default' => '#E8E8E8',
						'width' => [
							'default' => [
								'top' => '1',
								'right' => '1',
								'bottom' => '1',
								'left' => '1',
								'isLinked' => true,
							],
						],
					],
				],
				'selector' => '{{WRAPPER}} .tmpcoder-price-list-item',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'general_border_radius',
			[
				'label' => esc_html__( 'Border Radius', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'default' => [
					'top' => 2,
					'right' => 2,
					'bottom' => 2,
					'left' => 2,
				],
				'separator' => 'before',
			]
		);

		$this->add_control(
			'general_box_shadow_divider',
			[
				'type' => Controls_Manager::DIVIDER,
				'style' => 'thick',
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'general_box_shadow',
				'selector' => '{{WRAPPER}} .tmpcoder-price-list-item',
			]
		);

		$this->end_controls_section(); // End Controls Section


		// Styles
		// Section: Image ------------
		$this->add_section_style_image();

		// Styles
		// Section: Title ------------
		$this->start_controls_section(
			'section_style_title',
			[
				'label' => esc_html__( 'Title', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'show_label' => false,
			]
		);

		$this->add_control(
			'title_color',
			[
				'type' => Controls_Manager::COLOR,
				'label' => esc_html__( 'Color', 'sastra-essential-addons-for-elementor' ),
				'default' => '#5729d9',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-title' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'title_typography',
				'selector' => '{{WRAPPER}} .tmpcoder-price-list-title',
			]
		);


		$this->add_responsive_control(
			'title_distance',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Distance', 'sastra-essential-addons-for-elementor' ),
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 50,
					]
				],
				'default' => [
					'unit' => 'px',
					'size' => 5,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-title' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before',
				'condition' => [
					'prlist_position' => 'center',
				],
			]
		);


		$this->end_controls_section(); // End Controls Section

		// Styles
		// Section: Separator ------------
		$this->start_controls_section(
			'section_style_separator',
			[
				'label' => esc_html__( 'Separator', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'show_label' => false,
			]
		);

		$this->add_control(
			'separator_color',
			[
				'type' => Controls_Manager::COLOR,
				'label' => esc_html__( 'Color', 'sastra-essential-addons-for-elementor' ),
				'default' => '#a8a8a8',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-separator' => 'border-color: {{VALUE}};',
				],
				'separator' => 'after',
			]
		);

		$this->add_control(
			'separator_style',
			[
				'label' => esc_html__( 'Style', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SELECT,
				'options' => [
					'none' => esc_html__( 'None', 'sastra-essential-addons-for-elementor' ),
					'solid' => esc_html__( 'Solid', 'sastra-essential-addons-for-elementor' ),
					'double' => esc_html__( 'Double', 'sastra-essential-addons-for-elementor' ),
					'dotted' => esc_html__( 'Dotted', 'sastra-essential-addons-for-elementor' ),
					'dashed' => esc_html__( 'Dashed', 'sastra-essential-addons-for-elementor' ),
					'groove' => esc_html__( 'Groove', 'sastra-essential-addons-for-elementor' ),
				],
				'default' => 'dotted',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-separator' => 'border-bottom-style: {{VALUE}};',
				],
				'render_type' => 'template',
			]
		);

		$this->add_responsive_control(
			'separator_weight',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Weight', 'sastra-essential-addons-for-elementor' ),
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 10,
					]
				],
				'default' => [
					'unit' => 'px',
					'size' => 2,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-separator' => 'border-bottom-width: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'separator_spacing',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Spacing', 'sastra-essential-addons-for-elementor' ),
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 50,
					]
				],
				'default' => [
					'unit' => 'px',
					'size' => 15,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-separator' => 'margin-left: {{SIZE}}{{UNIT}};margin-right: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section(); // End Controls Section


		// Styles
		// Section: Price ------------
		$this->start_controls_section(
			'section_style_price',
			[
				'label' => esc_html__( 'Price', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'show_label' => false,
			]
		);

		$this->add_control(
			'price_color',
			[
				'type' => Controls_Manager::COLOR,
				'label' => esc_html__( 'Color', 'sastra-essential-addons-for-elementor' ),
				'default' => '#5729d9',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-price' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'price_bg_color',
			[
				'type' => Controls_Manager::COLOR,
				'label' => esc_html__( 'Background Color', 'sastra-essential-addons-for-elementor' ),
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-price-wrap' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'price_width',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Min Width', 'sastra-essential-addons-for-elementor' ),
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 100,
					]
				],
				'default' => [
					'unit' => 'px',
					'size' => 20,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-price-wrap' => 'min-width: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_control(
			'price_typography_divider',
			[
				'type' => Controls_Manager::DIVIDER,
				'style' => 'thick',
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'price_typography',
				'selector' => '{{WRAPPER}} .tmpcoder-price-list-price, {{WRAPPER}} .tmpcoder-price-list-old-price',
			]
		);

		$this->add_control(
			'old_price_section',
			[
				'label' => esc_html__( 'Old Price', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'old_price_color',
			[
				'type' => Controls_Manager::COLOR,
				'label' => esc_html__( 'Color', 'sastra-essential-addons-for-elementor' ),
				'default' => '#f75959',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-old-price' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'old_price_size',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Font Size', 'sastra-essential-addons-for-elementor' ),
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'min' => 10,
						'max' => 50,
					]
				],
				'default' => [
					'unit' => 'px',
					'size' => 11,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-old-price' => 'font-size: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'old_price_hr_position',
			[
				'label' => esc_html__( 'Alignment', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::CHOOSE,
				'label_block' => false,
				'default' => 'before',
				'options' => [
					'before' => [
						'title' => esc_html__( 'Before', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-h-align-left',
					],
					'after' => [
						'title' => esc_html__( 'After', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-h-align-right',
					],
				],
				'prefix_class' => 'tmpcoder-price-list-old-position-',
				'render_type' => 'template',
			]
		);

		$this->add_control(
			'old_price_vr_position',
			[
				'label' => esc_html__( 'Vertical Position', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::CHOOSE,
				'label_block' => false,
				'options' => [
					'top' => [
						'title' => esc_html__( 'Top', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-v-align-top',
					],
					'middle' => [
						'title' => esc_html__( 'Middle', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-v-align-middle',
					],
					'bottom' => [
						'title' => esc_html__( 'Bottom', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-v-align-bottom',
					],	
				],
				'default' => 'top',
				'selectors_dictionary' => [
					'top' => 'flex-start',
					'middle' => 'center',
					'bottom' => 'flex-end',
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-old-price' => '-webkit-align-self: {{VALUE}}; align-self: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'price_padding',
			[
				'label' => esc_html__( 'Padding', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'default' => [
					'top' => 0,
					'right' => 0,
					'bottom' => 0,
					'left' => 0,
				],
				'size_units' => [ 'px' ],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-price-wrap' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'price_border',
				'label' => esc_html__( 'Border', 'sastra-essential-addons-for-elementor' ),
				'fields_options' => [
					'color' => [
						'default' => '#E8E8E8',
						'width' => [
							'default' => [
								'top' => '1',
								'right' => '1',
								'bottom' => '1',
								'left' => '1',
								'isLinked' => true,
							],
						],
					],
				],
				'selector' => '{{WRAPPER}} .tmpcoder-price-list-price-wrap',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'price_border_radius',
			[
				'label' => esc_html__( 'Border Radius', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-price-wrap' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'default' => [
					'top' => 1,
					'right' => 1,
					'bottom' => 1,
					'left' => 1,
				],
				'separator' => 'before',
			]
		);

		$this->add_control(
			'price_box_shadow_divider',
			[
				'type' => Controls_Manager::DIVIDER,
				'style' => 'thick',
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'price_box_shadow',
				'selector' => '{{WRAPPER}} .tmpcoder-price-list-price-wrap',
			]
		);

		$this->end_controls_section(); // End Controls Section


		// Styles
		// Section: Description ------
		$this->start_controls_section(
			'section_style_description',
			[
				'label' => esc_html__( 'Description', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'show_label' => false,
			]
		);

		$this->add_control(
			'description_color',
			[
				'type' => Controls_Manager::COLOR,
				'label' => esc_html__( 'Color', 'sastra-essential-addons-for-elementor' ),
				'default' => '#757575',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-description' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'description_typography',
				'selector' => '{{WRAPPER}} .tmpcoder-price-list-description',
			]
		);

		$this->add_control(
			'description_align',
			[
				'label' => esc_html__( 'Alignment', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::CHOOSE,
				'default' => 'left',
				'options' => [
					'left' => [
						'title' => esc_html__( 'Left', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-text-align-left',
					],
					'center' => [
						'title' => esc_html__( 'Center', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-text-align-center',
					],
					'right' => [
						'title' => esc_html__( 'Right', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-text-align-right',
					],
					'justify' => [
						'title' => esc_html__( 'Justify', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-text-align-justify',
					],
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-description' => 'text-align: {{VALUE}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'description_distance',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Distance', 'sastra-essential-addons-for-elementor' ),
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 50,
					]
				],
				'default' => [
					'unit' => 'px',
					'size' => 7,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-price-list-description' => 'margin-top: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->end_controls_section(); // End Controls Section	

	}

	public function render_pro_element_image($item, $item_count) {}

	protected function render() {
		
		$settings = $this->get_settings();
		$item_count = 0;
	
		?>

		<div class="tmpcoder-price-list">
			
			<?php foreach ( $settings['prlist_items'] as $item ) : ?>

				<div class="tmpcoder-price-list-item elementor-repeater-item-<?php echo esc_attr( $item['_id'] ); ?> elementor-clearfix">
							
				<?php $this->render_pro_element_image($item, $item_count); ?>

					<div class="tmpcoder-price-list-content">
						
						<div class="tmpcoder-price-list-heading">
							
							<?php if ( '' !== $item['prlist_title'] ) : ?>								
							<span class="tmpcoder-price-list-title"><?php echo esc_html( $item['prlist_title'] ); ?></span>							
							<?php endif; ?>
							
							<?php if ( 'none' !== $settings['separator_style'] ) : ?>						
								<span class="tmpcoder-price-list-separator"></span>
							<?php endif ?>

							<?php if ( '' !== $item['prlist_price'] || '' !== $item['prlist_old_price'] ) : ?>
								<span class="tmpcoder-price-list-price-wrap">
									<?php if ( '' !== $item['prlist_price'] ) : ?>	
									<span class="tmpcoder-price-list-price"><?php echo esc_html( $item['prlist_price'] ); ?></span>
									<?php endif; ?>

									<?php if ( '' !== $item['prlist_old_price'] ) : ?>	
									<span class="tmpcoder-price-list-old-price"><?php echo esc_html( $item['prlist_old_price'] ); ?></span>
									<?php endif; ?>
								</span>
							<?php endif; ?>

						</div>
						
						<?php if ( '' !== $item['prlist_description'] ) : ?>
							<div class="tmpcoder-price-list-description"><?php echo wp_kses_post( $item['prlist_description'] ); ?></div>
						<?php endif; ?>
					</div>

				</div>

				<?php
				$item_count++;
			endforeach;
			?>
		</div>
		<?php

	}
}