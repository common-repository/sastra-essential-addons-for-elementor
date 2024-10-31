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

class TMPCODER_Image_Hotspots extends Widget_Base {
		
	public function get_name() {
		return 'tmpcoder-image-hotspots';
	}

	public function get_title() {
		return esc_html__( 'Image Hotspots', 'sastra-essential-addons-for-elementor' );
	}

	public function get_icon() {
		return 'tmpcoder-icon eicon-image-hotspot';
	}

	public function get_categories() {
		return [ 'tmpcoder-widgets-category' ];
	}

	public function get_keywords() {
		return [ 'image hotspots' ];
	}

    public function get_custom_help_url() {
    	return TMPCODER_NEED_HELP_URL;
    }

	public function add_control_tooltip_trigger() {
		$this->add_control(
			'tooltip_trigger',
			[
				'label' => esc_html__( 'Show Tooltips', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'none',
				'options' => [
					'none' => esc_html__( 'by Default', 'sastra-essential-addons-for-elementor' ),
					'pro-cl' => esc_html__( 'on Click (Pro)', 'sastra-essential-addons-for-elementor' ),
					'pro-hv' => esc_html__( 'on Hover (Pro)', 'sastra-essential-addons-for-elementor' ),
				],
				'prefix_class' => 'tmpcoder-hotspot-trigger-',
				'render_type' => 'template',
				'separator' => 'after',
			]
		);
	}

	public function add_control_tooltip_position() {
		$this->add_control(
			'tooltip_position',
			[
				'label' => esc_html__( 'Position', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'top',
				'options' => [
					'top' => esc_html__( 'Top', 'sastra-essential-addons-for-elementor' ),
					'pro-bt' => esc_html__( 'Bottom (Pro)', 'sastra-essential-addons-for-elementor' ),
					'pro-lt' => esc_html__( 'Left (Pro)', 'sastra-essential-addons-for-elementor' ),
					'pro-rt' => esc_html__( 'Right (Pro)', 'sastra-essential-addons-for-elementor' ),
				],
				'prefix_class' => 'tmpcoder-hotspot-tooltip-position-',
				'render_type' => 'template',
			]
		);
	}

	protected function register_controls() {
		
		// Section: Image ------------
		$this->start_controls_section(
			'section_image',
			[
				'label' => esc_html__( 'Image', 'sastra-essential-addons-for-elementor' ),
			]
		);

		tmpcoder_library_buttons( $this, Controls_Manager::RAW_HTML );

		$this->add_control(
			'image',
			[
				'label' => esc_html__( 'Image', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::MEDIA,
				'dynamic' => [
					'active' => true,
				],
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);

		$this->add_group_control(
			Group_Control_Image_Size::get_type(),
			[
				'name' => 'image_size',
				'default' => 'full',
				'separator' => 'before',
			]
		);

		$this->end_controls_section(); // End Controls Section

		// Section: Hotspots ---------
		$this->start_controls_section(
			'section_hotspots',
			[
				'label' => esc_html__( 'Hotspots', 'sastra-essential-addons-for-elementor' ),
			]
		);

		$repeater = new Repeater();

		$repeater->start_controls_tabs( 'tabs_hotspot_item' );

		$repeater->start_controls_tab(
			'tab_hotspot_item_content',
			[
				'label' => esc_html__( 'Content', 'sastra-essential-addons-for-elementor' ),
			]
		);

		$repeater->add_control(
			'hotspot_icon',
			[
				'label' => esc_html__( 'Select Icon', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::ICONS,
				'skin' => 'inline',
				'label_block' => false,
				'default' => [
					'value' => 'fas fa-plus',
					'library' => 'fa-solid',
				],
			]
		);

		$repeater->add_control(
			'hotspot_text',
			[
				'label' => esc_html__( 'Text', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'separator' => 'before',
			]
		);

		$repeater->add_control(
			'hotspot_custom_color',
			[
				'label' => esc_html__( 'Custom Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'separator' => 'before',
			]
		);

		$repeater->add_control(
			'hotspot_custom_text_color',
			[
				'label' => esc_html__( 'Text Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#ffffff',
				'selectors' => [
					'{{WRAPPER}} {{CURRENT_ITEM}} .tmpcoder-hotspot-content' => 'color: {{VALUE}}',
				],
				'condition' => [
					'hotspot_custom_color' => 'yes',
				],
			]
		);

		$repeater->add_control(
			'hotspot_custom_bg_color',
			[
				'label' => esc_html__( 'Background Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#5729d9',
				'selectors' => [
					'{{WRAPPER}} {{CURRENT_ITEM}} .tmpcoder-hotspot-content' => 'background-color: {{VALUE}}',
					'{{WRAPPER}} {{CURRENT_ITEM}}.tmpcoder-hotspot-anim-glow:before' => 'background-color: {{VALUE}}',
				],
				'condition' => [
					'hotspot_custom_color' => 'yes',
				],
			]
		);

		$repeater->add_control(
			'hotspot_tooltip',
			[
				'label' => esc_html__( 'Tooltip', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'default' => 'yes',
				'separator' => 'before',
			]
		);

		$repeater->add_control(
			'hotspot_tooltip_text',
			[
				'label' => '',
				'type' => Controls_Manager::WYSIWYG,
				'default' => 'Tooltip Content',
				'condition' => [
					'hotspot_tooltip' => 'yes',
				],
			]
		);

		$repeater->add_control(
			'hotspot_link',
			[
				'label' => esc_html__( 'Link', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::URL,
				'dynamic' => [
					'active' => true,
				],
				'placeholder' => esc_html__( 'https://www.your-link.com', 'sastra-essential-addons-for-elementor' ),
				'separator' => 'before',
			]
		);

		$repeater->end_controls_tab();

		$repeater->start_controls_tab(
			'tab_hotspot_item_position',
			[
				'label' => esc_html__( 'Position', 'sastra-essential-addons-for-elementor' ),
			]
		);

		$repeater->add_control(
			'hotspot_hr_position',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Horizontal Position (%)', 'sastra-essential-addons-for-elementor' ),
				'size_units' => [ '%' ],
				'range' => [
					'%' => [
						'min' => 0,
						'max' => 100,
					]
				],
				'default' => [
					'unit' => '%',
					'size' => 50,
				],
				'selectors' => [
					'{{WRAPPER}} {{CURRENT_ITEM}}.tmpcoder-hotspot-item' => 'left: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$repeater->add_control(
			'hotspot_vr_position',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Vertical Position (%)', 'sastra-essential-addons-for-elementor' ),
				'size_units' => [ '%' ],
				'range' => [
					'%' => [
						'min' => 0,
						'max' => 100,
					]
				],
				'default' => [
					'unit' => '%',
					'size' => 50,
				],
				'selectors' => [
					'{{WRAPPER}} {{CURRENT_ITEM}}.tmpcoder-hotspot-item' => 'top: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$repeater->end_controls_tab();

		$repeater->end_controls_tabs();

		$this->add_control(
			'hotspot_items',
			[
				'type' => Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[
						'hotspot_text' => '',
						'hotspot_hr_position' => [
							'unit' => '%',
							'size' => 30,
						],
						'hotspot_vr_position' => [
							'unit' => '%',
							'size' => 40,
						],
					],
					[
						'hotspot_text' => '',
						'hotspot_hr_position' => [
							'unit' => '%',
							'size' => 60,
						],
						'hotspot_vr_position' => [
							'unit' => '%',
							'size' => 20,
						],
					],
					
				],
				'title_field' => '{{{ hotspot_text }}}',
			]
		);

		if ( ! tmpcoder_is_availble() ) {
			$this->add_control(
				'hotspot_repeater_pro_notice',
				[
					'type' => Controls_Manager::RAW_HTML,
					'raw' => 'More than 2 Hotspots are available<br> in the <strong><a href="'.TMPCODER_PURCHASE_PRO_URL.'/?ref=rea-plugin-panel-image-hotspots-upgrade-pro#purchasepro" target="_blank">Pro version</a></strong>',
					'content_classes' => 'tmpcoder-pro-notice',
				]
			);
		}

		$this->add_control(
			'hotspot_animation',
			[
				'type' => Controls_Manager::SELECT,
				'label' => esc_html__( 'Animation', 'sastra-essential-addons-for-elementor' ),
				'default' => 'glow',
				'options' => [
					'none' => esc_html__( 'None', 'sastra-essential-addons-for-elementor' ),
					'glow' => esc_html__( 'Glow', 'sastra-essential-addons-for-elementor' ),
					'pulse' => esc_html__( 'Pulse', 'sastra-essential-addons-for-elementor' ),
					'shake' => esc_html__( 'Shake', 'sastra-essential-addons-for-elementor' ),
					'swing' => esc_html__( 'Swing', 'sastra-essential-addons-for-elementor' ),
					'tada' => esc_html__( 'Tada', 'sastra-essential-addons-for-elementor' ),
				],
				'render_type' => 'template',
			]
		);

		$this->add_control(
			'hotspot_origin',
			[
				'type' => Controls_Manager::SELECT,
				'label' => esc_html__( 'Origin', 'sastra-essential-addons-for-elementor' ),
				'description' => esc_html__('Defines where the point is located relative to hotspot item', 'sastra-essential-addons-for-elementor'),
				'default' => 'top-left',
				'options' => [
					'top-left' => esc_html__( 'Top Left', 'sastra-essential-addons-for-elementor' ),
					'top-right' => esc_html__( 'Top Right', 'sastra-essential-addons-for-elementor' ),
					'top-center' => esc_html__( 'Top Center', 'sastra-essential-addons-for-elementor' ),
					'center' => esc_html__( 'Center', 'sastra-essential-addons-for-elementor' ),
					'center-left' => esc_html__( 'Center Left', 'sastra-essential-addons-for-elementor' ),
					'center-right' => esc_html__( 'Center Right', 'sastra-essential-addons-for-elementor' ),
					'bottom-left' => esc_html__( 'Bottom Left', 'sastra-essential-addons-for-elementor' ),
					'bottom-right' => esc_html__( 'Bottom Right', 'sastra-essential-addons-for-elementor' ),
					'bottom-center' => esc_html__( 'Bottom Center', 'sastra-essential-addons-for-elementor' )
				],
				'selectors_dictionary' => [
					'top-left' => '',
					'top-right' => 'transform: translate(-100%, 0);',
					'top-center' => 'transform: translate(-50%, 0);',
					'center' => 'transform: translate(-50%, -50%);',
					'center-left' => 'transform: translate(0, -50%);',
					'center-right' => 'transform: translate(-100%, -50%);',
					'bottom-left' => 'transform: translate(0, -100%);',
					'bottom-right' => 'transform: translate(-100%, -100%);',
					'bottom-center' => 'transform: translate(-50%, -100%);'
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-item' => '{{VALUE}}',
				],
                'condition' => [
					'hotspot_animation' => 'glow',
				],
				'separator' => 'before'
				
			]
		);

		$this->end_controls_section(); // End Controls Section

		// Section: Tooltips ---------
		$this->start_controls_section(
			'section_tooltips',
			[
				'label' => esc_html__( 'Tooltips', 'sastra-essential-addons-for-elementor' ),
			]
		);

		$this->add_control_tooltip_trigger();

		// Upgrade to Pro Notice
		tmpcoder_upgrade_pro_notice( $this, Controls_Manager::RAW_HTML, 'image-hotspots', 'tooltip_trigger', ['pro-cl', 'pro-hv'] );

		$this->add_control_tooltip_position();

		// Upgrade to Pro Notice
		tmpcoder_upgrade_pro_notice( $this, Controls_Manager::RAW_HTML, 'image-hotspots', 'tooltip_position', ['pro-bt', 'pro-lt', 'pro-rt'] );

		$this->add_responsive_control(
            'tooltip_align',
            [
                'label' => esc_html__( 'Alignment', 'sastra-essential-addons-for-elementor' ),
                'type' => Controls_Manager::CHOOSE,
                'label_block' => false,
                'default' => 'center',
                'options' => [
                    'left' => [
                        'title' => esc_html__( 'Left', 'sastra-essential-addons-for-elementor' ),
                        'icon' => 'eicon-h-align-left',
                    ],
                    'center' => [
                        'title' => esc_html__( 'Center', 'sastra-essential-addons-for-elementor' ),
                        'icon' => 'eicon-h-align-center',
                    ],
                    'right' => [
                        'title' => esc_html__( 'Right', 'sastra-essential-addons-for-elementor' ),
                        'icon' => 'eicon-h-align-right',
                    ]
                ],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-tooltip' => 'text-align: {{VALUE}}',
				],
            ]
        );

		$this->add_responsive_control(
			'tooltip_width',
			[
				'label' => esc_html__( 'Width', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 50,
						'max' => 500,
					],
				],
				'size_units' => [ 'px' ],
				'default' => [
					'unit' => 'px',
					'size' => 115,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-tooltip' => 'width: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_control(
			'tooltip_triangle',
			[
				'label' => esc_html__( 'Triangle', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SWITCHER,				
				'default' => 'yes',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'tooltip_triangle_size',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Size', 'sastra-essential-addons-for-elementor' ),
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 20,
					]
				],
				'default' => [
					'unit' => 'px',
					'size' => 6,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-tooltip:before' => 'border-width: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-top .tmpcoder-hotspot-tooltip' => 'margin-top: calc(-{{SIZE}}{{UNIT}} + 1px);',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-bottom .tmpcoder-hotspot-tooltip' => 'margin-bottom: calc(-{{SIZE}}{{UNIT}} + 1px);',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-left .tmpcoder-hotspot-tooltip' => 'margin-left: calc(-{{SIZE}}{{UNIT}} + 1px);',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-right .tmpcoder-hotspot-tooltip' => 'margin-right: calc(-{{SIZE}}{{UNIT}} + 1px);',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-top .tmpcoder-hotspot-tooltip:before' => 'bottom: calc(-{{SIZE}}{{UNIT}} + 1px);',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-bottom .tmpcoder-hotspot-tooltip:before' => 'top: calc(-{{SIZE}}{{UNIT}} + 1px);',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-right .tmpcoder-hotspot-tooltip:before' => 'left: calc(-{{SIZE}}{{UNIT}} + 1px);',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-left .tmpcoder-hotspot-tooltip:before' => 'right: calc(-{{SIZE}}{{UNIT}} + 1px);',
				],
				'condition' => [
					'tooltip_triangle' => 'yes',
				],
			]
		);

		$this->add_control(
			'tooltip_distance',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Distance', 'sastra-essential-addons-for-elementor' ),
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 20,
					]
				],
				'default' => [
					'unit' => 'px',
					'size' => 6,
				],
				'selectors' => [
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-top .tmpcoder-hotspot-tooltip' => 'top: -{{SIZE}}{{UNIT}};',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-bottom .tmpcoder-hotspot-tooltip' => 'bottom: -{{SIZE}}{{UNIT}};',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-left .tmpcoder-hotspot-tooltip' => 'left: -{{SIZE}}{{UNIT}};',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-right .tmpcoder-hotspot-tooltip' => 'right: -{{SIZE}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_control(
			'tooltip_animation',
			[
				'type' => Controls_Manager::SELECT,
				'label' => esc_html__( 'Animation', 'sastra-essential-addons-for-elementor' ),
				'default' => 'fade',
				'options' => [
					'shift-toward' => esc_html__( 'Shift Toward', 'sastra-essential-addons-for-elementor' ),
					'fade' => esc_html__( 'Fade', 'sastra-essential-addons-for-elementor' ),
					'scale' => esc_html__( 'Scale', 'sastra-essential-addons-for-elementor' ),
				],
				'prefix_class' => 'tmpcoder-tooltip-effect-',
				'render_type' => 'template',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'tooltip_anim_duration',
			[
				'label' => esc_html__( 'Animation Duration', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::NUMBER,
				'default' => 0.2,
				'min' => 0,
				'max' => 5,
				'step' => 0.1,
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-tooltip' => '-webkit-transition-duration: {{VALUE}}s; transition-duration: {{VALUE}}s;',
				],		
			]
		);

		$this->end_controls_section(); // End Controls Section

		// Section: Request New Feature
		tmpcoder_add_section_request_feature( $this, Controls_Manager::RAW_HTML, '' );

		// Section: Pro Features
		tmpcoder_pro_features_list_section( $this, '', Controls_Manager::RAW_HTML, 'image-hotspots', [
			'Add Unlimited Hotspots',
			'Show Tooltips on Click or Hover',
			'Advanced Tooltip Positioning',
		] );
		
		// Section: Hotspots ---------
		$this->start_controls_section(
			'section_style_hotspots',
			[
				'label' => esc_html__( 'Hotspots', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'hotspot_color',
			[
				'label' => esc_html__( 'Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#ffffff',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-content' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'hotspot_bg_color',
			[
				'label' => esc_html__( 'Background Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#5729d9',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-content' => 'background-color: {{VALUE}}',
					'{{WRAPPER}} .tmpcoder-hotspot-anim-glow:before' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'hotspot_border_color',
			[
				'label' => esc_html__( 'Border Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#E8E8E8',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-content' => 'border-color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'hotspot_box_shadow',
				'selector' => '{{WRAPPER}} .tmpcoder-hotspot-content',
			]
		);

		$this->add_control(
			'hotspot_typography_divider',
			[
				'type' => Controls_Manager::DIVIDER,
				'style' => 'thick',
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'hotspot_typography',
				'selector' => '{{WRAPPER}} .tmpcoder-hotspot-text',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'icon_section',
			[
				'label' => esc_html__( 'Icon', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'icon_position',
			[
				'label' => esc_html__( 'Position', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::CHOOSE,
				'label_block' => false,
				'default' => 'right',
				'options' => [
					'left' => [
						'title' => esc_html__( 'Left', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-h-align-left',
					],
					'right' => [
						'title' => esc_html__( 'Right', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-h-align-right',
					],
				],
				'prefix_class' => 'tmpcoder-hotspot-icon-position-',
			]
		);

		$this->add_responsive_control(
			'icon_size',
			[
				'label' => esc_html__( 'Size', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => ['px'],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'default' => [
					'unit' => 'px',
					'size' => 15,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-content i' => 'font-size: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .tmpcoder-hotspot-content img' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};'
				],
			]
		);

		$this->add_responsive_control(
			'icon_box_size',
			[
				'label' => esc_html__( 'Box Size', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => ['px'],
				'range' => [
					'px' => [
						'min' => 10,
						'max' => 200,
					],
				],
				'default' => [
					'unit' => 'px',
					'size' => 35,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-content' => 'width: {{SIZE}}{{UNIT}};height: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'icon_distance',
			[
				'label' => esc_html__( 'Distance', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => ['px'],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 50,
					],
				],
				'default' => [
					'unit' => 'px',
					'size' => 8,
				],
				'selectors' => [
					'{{WRAPPER}}.tmpcoder-hotspot-icon-position-left .tmpcoder-hotspot-text ~ i' => 'margin-right: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}}.tmpcoder-hotspot-icon-position-right .tmpcoder-hotspot-text ~ i' => 'margin-left: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}}.tmpcoder-hotspot-icon-position-left .tmpcoder-hotspot-text ~ svg' => 'margin-right: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}}.tmpcoder-hotspot-icon-position-right .tmpcoder-hotspot-text ~ svg' => 'margin-left: {{SIZE}}{{UNIT}};'
				],
			]
		);

		$this->add_control(
			'hotspot_border_type',
			[
				'label' => esc_html__( 'Border Type', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SELECT,
				'options' => [
					'none' => esc_html__( 'None', 'sastra-essential-addons-for-elementor' ),
					'solid' => esc_html__( 'Solid', 'sastra-essential-addons-for-elementor' ),
					'double' => esc_html__( 'Double', 'sastra-essential-addons-for-elementor' ),
					'dotted' => esc_html__( 'Dotted', 'sastra-essential-addons-for-elementor' ),
					'dashed' => esc_html__( 'Dashed', 'sastra-essential-addons-for-elementor' ),
					'groove' => esc_html__( 'Groove', 'sastra-essential-addons-for-elementor' ),
				],
				'default' => 'none',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-content' => 'border-style: {{VALUE}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'hotspot_border_width',
			[
				'label' => esc_html__( 'Border Width', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', ],
				'default' => [
					'top' => 1,
					'right' => 1,
					'bottom' => 1,
					'left' => 1,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-content' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'condition' => [
					'hotspot_border_type!' => 'none',
				],
			]
		);

		$this->add_responsive_control(
			'hotspot_border_radius',
			[
				'label' => esc_html__( 'Border Radius', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'default' => [
					'top' => 50,
					'right' => 50,
					'bottom' => 50,
					'left' => 50,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-content' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					'{{WRAPPER}} .tmpcoder-hotspot-anim-glow:before' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->end_controls_section(); // End Controls Section

		// Section: Tooltips ---------
		$this->start_controls_section(
			'section_style_tooltips',
			[
				'label' => esc_html__( 'Tooltips', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'tooltip_color',
			[
				'label' => esc_html__( 'Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#ffffff',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-tooltip' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'tooltip_bg_color',
			[
				'type' => Controls_Manager::COLOR,
				'label' => esc_html__( 'Background Color', 'sastra-essential-addons-for-elementor' ),
				'default' => '#222222',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-tooltip' => 'background-color: {{VALUE}}',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-top .tmpcoder-hotspot-tooltip:before' => 'border-top-color: {{VALUE}}',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-bottom .tmpcoder-hotspot-tooltip:before' => 'border-top-color: {{VALUE}}',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-left .tmpcoder-hotspot-tooltip:before' => 'border-right-color: {{VALUE}}',
					'{{WRAPPER}}.tmpcoder-hotspot-tooltip-position-right .tmpcoder-hotspot-tooltip:before' => 'border-right-color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'tooltip_box_shadow',
				'selector' => '{{WRAPPER}} .tmpcoder-hotspot-tooltip',
			]
		);

		$this->add_control(
			'tooltip_typography_divider',
			[
				'type' => Controls_Manager::DIVIDER,
				'style' => 'thick',
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'tooltip_typography',
				'label' => esc_html__( 'Typography', 'sastra-essential-addons-for-elementor' ),
				'selector' => '{{WRAPPER}} .tmpcoder-hotspot-tooltip',
			]
		);

		$this->add_responsive_control(
			'tooltip_padding',
			[
				'label' => esc_html__( 'Padding', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', ],
				'default' => [
					'top' => 10,
					'right' => 10,
					'bottom' => 10,
					'left' => 10,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-tooltip' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'tooltip_border_radius',
			[
				'label' => esc_html__( 'Border Radius', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'default' => [
					'top' => 2,
					'right' => 2,
					'bottom' => 2,
					'left' => 2,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-hotspot-tooltip' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->end_controls_section(); // End Controls Section

	}

	protected function render() {
		// Get Settings
		$settings = $this->get_settings();

		$item_count = 0;
		$image_src = Group_Control_Image_Size::get_attachment_image_src( $settings['image']['id'], 'image_size', $settings );

		if ( ! $image_src ) {
			$image_src = $settings['image']['url'];
		}

		if ( ! tmpcoder_is_availble() ) {
			$settings['tooltip_trigger'] = 'none';
		}

		$hotsposts_options = [	
			'tooltipTrigger' => $settings['tooltip_trigger'],
		];

		$this->add_render_attribute( 'hotspots_attribute', 'class', 'tmpcoder-image-hotspots' );
		$this->add_render_attribute( 'hotspots_attribute', 'data-options', wp_json_encode( $hotsposts_options ) );

		?>

		<?php echo wp_kses_post('<div '.$this->get_render_attribute_string( 'hotspots_attribute').'>'); ?>
			
			<?php if ( $image_src ) : ?>
				<div class="tmpcoder-hotspot-image">
					<img src="<?php echo esc_url( $image_src ); ?>" >
				</div>
			<?php endif; ?>

			<div class="tmpcoder-hotspot-item-container">
				

				<?php foreach ( $settings['hotspot_items'] as $key => $item ) : ?>
					
					<?php

					if ( ! tmpcoder_is_availble() && $key === 2 ) {
						break;
					}

					$hotspot_tag = 'div';

					$this->add_render_attribute( 'hotspot_item_attribute'. $item_count, 'class', 'tmpcoder-hotspot-item elementor-repeater-item-'. esc_attr($item['_id'] ));

					if ( 'none' !== $settings['hotspot_animation'] ) {
						$this->add_render_attribute( 'hotspot_item_attribute'. $item_count, 'class', 'tmpcoder-hotspot-anim-'. $settings['hotspot_animation'] );
					}

					$this->add_render_attribute( 'hotspot_content_attribute'. $item_count, 'class', 'tmpcoder-hotspot-content' );

					if ( '' !== $item['hotspot_link']['url'] ) {

						$hotspot_tag = 'a';

						$this->add_render_attribute( 'hotspot_content_attribute'. $item_count, 'href', $item['hotspot_link']['url'] );

						if ( $item['hotspot_link']['is_external'] ) {
							$this->add_render_attribute( 'hotspot_content_attribute'. $item_count, 'target', '_blank' );
						}

						if ( $item['hotspot_link']['nofollow'] ) {
							$this->add_render_attribute( 'hotspot_content_attribute'. $item_count, 'nofollow', '' );
						}

					}

					?>

					<?php echo wp_kses_post('<div '. $this->get_render_attribute_string( 'hotspot_item_attribute'. $item_count ).'>'); ?>

						<?php echo wp_kses_post('<'. esc_attr( $hotspot_tag ).' '.$this->get_render_attribute_string( 'hotspot_content_attribute'. $item_count ).'>');?>
							
							<?php if ( '' !== $item['hotspot_text'] ) : ?>
								<span class="tmpcoder-hotspot-text"><?php echo esc_html( $item['hotspot_text'] ); ?></span>
							<?php endif; ?>

							<?php if ( '' !== $item['hotspot_icon']['value'] && 'svg' !== $item['hotspot_icon']['library'] ) : ?>
								<i class="<?php echo esc_attr($item['hotspot_icon']['value']); ?>"></i>
							<?php elseif ( '' !== $item['hotspot_icon']['value'] && 'svg' == $item['hotspot_icon']['library'] ) : ?>
								<img src="<?php echo esc_url($item['hotspot_icon']['value']['url']); ?>">
							<?php endif; ?>

						</<?php echo esc_attr( $hotspot_tag ); ?>>
						
						<?php if ( 'yes' === $item['hotspot_tooltip'] && '' !== $item['hotspot_tooltip_text'] ) : ?>
							<div class="tmpcoder-hotspot-tooltip"><?php echo wp_kses_post($item['hotspot_tooltip_text']); ?></div>						
						<?php endif; ?>	

					</div>

					<?php

					$item_count++;

				endforeach;

				?>

			</div>
			
		</div>

		<?php

	}
}