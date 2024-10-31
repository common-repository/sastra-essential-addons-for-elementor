<?php
namespace TMPCODER\Widgets;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Background;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Group_Control_Image_Size;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class TMPCODER_Page_List extends Widget_Base {
	
	public function get_name() {
		return 'tmpcoder-page-list';
	}

	public function get_title() {
		return esc_html__( 'Page List', 'sastra-essential-addons-for-elementor' );
	}

	public function get_icon() {
		return 'tmpcoder-icon eicon-editor-list-ul';
	}

	public function get_categories() {
		return [ 'tmpcoder-widgets-category' ];
	}

	public function get_keywords() {
		return [ 'page-list', 'list'];
	}

	public function add_control_title_pointer_color_hr() {}

	public function add_control_title_pointer() {}

	public function add_control_title_pointer_height() {}
	
	public function add_control_title_pointer_animation() {}
    
    protected function register_controls() {

		// Tab: Content ==============
		// Section: Content ----------
		$this->start_controls_section(
			'section_page_list_general',
			[
				'label' => esc_html__( 'General', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'taxonomy_list_layout',
			[
				'label' => esc_html__( 'Select Layout', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::CHOOSE,
				'default' => 'vertical',
				'options' => [
					'vertical' => [
						'title' => esc_html__( 'Vertical', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-editor-list-ul',
					],
					'horizontal' => [
						'title' => esc_html__( 'Horizontal', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-ellipsis-h',
					],
				],
                'prefix_class' => 'tmpcoder-page-list-',
				'label_block' => false,
			]
		);

		$repeater = new \Elementor\Repeater();

        $repeater->add_control(
            'page_list_item_type',
            [
                'label'       => esc_html__( 'Page Type', 'sastra-essential-addons-for-elementor' ),
                'type'        => Controls_Manager::SELECT,
                'default'     => 'square',
                'label_block' => false,
                'default' => 'custom',
                'options'     => [
                    'custom' => esc_html__( 'Custom', 'sastra-essential-addons-for-elementor' ),
                    'dynamic'  => esc_html__( 'Dynamic', 'sastra-essential-addons-for-elementor' )
                ]
            ]
        );

		$repeater->add_control(
			'query_page_selection',
			[
				'label' => esc_html__( 'Select Page', 'sastra-essential-addons-for-elementor' ),
				'type' => 'tmpcoder-ajax-select2',
				'options' => 'ajaxselect2/get_posts_by_post_type',
				'query_slug' => 'page',
				'label_block' => true,
                'condition' => [
                    'page_list_item_type' => 'dynamic'
                ]
			]
		);

		$repeater->add_control(
			'page_list_item_title', 
			[
				'label' => esc_html__( 'Title', 'sastra-essential-addons-for-elementor' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default' => esc_html__( 'New Page' , 'sastra-essential-addons-for-elementor' ),
				'label_block' => true,
				'separator' => 'before',
                'condition' => [
                    'page_list_item_type' => 'custom'
                ]
			]
		);

		$repeater->add_control(
			'page_list_item_sub_title', 
			[
				'label' => esc_html__( 'Sub Title', 'sastra-essential-addons-for-elementor' ),
				'label_block' => true,
				'type' => \Elementor\Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default' => esc_html__( 'New Page Sub Title' , 'sastra-essential-addons-for-elementor' ),
			]
		);

		$repeater->add_control(
			'page_list_item_title_url',
			[
				'label' => esc_html__( 'Title Link', 'sastra-essential-addons-for-elementor' ),
				'type' => \Elementor\Controls_Manager::URL,
				'dynamic' => [
					'active' => true,
				],
				'placeholder' => esc_html__( 'https://your-link.com', 'sastra-essential-addons-for-elementor' ),
				'default' => [
					'url' => '',
					'is_external' => true,
					'nofollow' => true,
					'custom_attributes' => '',
				],
                'condition' => [
                    'page_list_item_type' => 'custom'
                ],
				'label_block' => true,
			]
		);

		$repeater->add_control(
			'open_in_new_page',
			[
				'label' => esc_html__( 'Open In New Page', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'render_type' => 'template',
				'default' => 'yes',
				'separator' => 'before',
                'condition' => [
                    'page_list_item_type' => 'dynamic'
                ]
			]
		);

		$repeater->add_control(
			'page_list_item_icon',
			[
				'label' => esc_html__( 'Select Icon', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::ICONS,
				'skin' => 'inline',
				'label_block' => false,
				'separator' => 'before',
				'exclude_inline_options' => 'svg'
			]
		);

		$repeater->add_control(
			'show_page_list_item_badge',
			[
				'label' => esc_html__( 'Show Badge', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'return_value' => 'yes',
				'label_block' => false,
				'default' => '',
                'separator' => 'before'
			]
		);

		$repeater->add_control(
			'show_page_list_item_badge_animation',
			[
				'label' => esc_html__( 'Enable Animation', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'label_block' => false,
                'condition' => [
                    'show_page_list_item_badge' => 'yes'
                ]
			]
		);

		$repeater->add_control(
			'page_list_item_badge_text', [
				'label' => esc_html__( 'Badge Text', 'sastra-essential-addons-for-elementor' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default' => esc_html__( 'Badge' , 'sastra-essential-addons-for-elementor' ),
                'condition' => [
                    'show_page_list_item_badge' => 'yes'
                ]
			]
		);

		$repeater->add_control(
			'badge_bg_color',
			[
				'label'  => esc_html__( 'Background Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#5729d9',
				'selectors' => [
					'{{WRAPPER}} {{CURRENT_ITEM}} .tmpcoder-page-list-item-badge' => 'background-color: {{VALUE}}',
				],
                'condition' => [
                    'show_page_list_item_badge' => 'yes'
                ]
			]
		);

		$this->add_control(
			'page_list',
			[
				'label' => esc_html__( 'Repeater List', 'sastra-essential-addons-for-elementor' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[
						'page_list_item_title' => esc_html__( 'New Page 1', 'sastra-essential-addons-for-elementor' ),
						'page_list_item_sub_title' => esc_html__( 'First Sub Title', 'sastra-essential-addons-for-elementor' ),						
					],
					[
						'page_list_item_title' => esc_html__( 'New Page 2', 'sastra-essential-addons-for-elementor' ),
						'page_list_item_sub_title' => esc_html__( 'Second Sub Title', 'sastra-essential-addons-for-elementor' ),
					],
					[
						'page_list_item_title' => esc_html__( 'New Page 3', 'sastra-essential-addons-for-elementor' ),
						'page_list_item_sub_title' => esc_html__( 'Third Sub Title', 'sastra-essential-addons-for-elementor' ),
					],
				],
				'title_field' => '{{{ page_list_item_title }}}',
			]
		);

        $this->end_controls_section();

		// Section: Request New Feature
		tmpcoder_add_section_request_feature( $this, Controls_Manager::RAW_HTML, '' );
		
		tmpcoder_pro_features_list_section( $this, '', Controls_Manager::RAW_HTML, 'page-list', [
			'Title Hover Animations',
		] );

		// Styles ====================
		// Section: General ---
		$this->start_controls_section(
			'section_style_page_list_general',
			[
				'label' => esc_html__( 'List Items', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'show_label' => false,
			]
		);

		$this->add_responsive_control(
			'page_list_item_padding',
			[
				'label' => esc_html__( 'Padding', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px' ],
				'default' => [
					'top' => '5',
					'right' => 0,
					'bottom' => '5',
					'left' => 0,
					'isLinked' => ''
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				]
			]
		);

		$this->add_responsive_control(
			'page_list_item_margin',
			[
				'label' => esc_html__( 'Margin', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px' ],
				'default' => [
					'top' => '5',
					'right' =>  '8',
					'bottom' => 0,
					'left' => 0,
					'unit' => 'px',
					'isLinked' => false
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'page_list_item_border_type',
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
				'default' => 'solid',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item' => 'border-style: {{VALUE}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_control(
			'page_list_item_border_width',
			[
				'label' => esc_html__( 'Border Width', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px' ],
				'default' => [
					'top' => 0,
					'right' => 0,
					'bottom' => 1,
					'left' => 0,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'condition' => [
					'page_list_item_border_type!' => 'none',
				],
			]
		);

		$this->add_control(
			'page_list_item_radius',
			[
				'label' => esc_html__( 'Border Radius', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'default' => [
					'top' => 0,
					'right' => 0,
					'bottom' => 0,
					'left' => 0,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				]
			]
		);

		$this->end_controls_section();

		// Styles ====================
		// Section: Title ---
		$this->start_controls_section(
			'section_style_page_list_title',
			[
				'label' => esc_html__( 'Title', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'show_label' => false,
			]
		);

		$this->start_controls_tabs( 'list_item_style' );

		$this->start_controls_tab(
			'page_list_item_normal',
			[
				'label' => esc_html__( 'Normal', 'sastra-essential-addons-for-elementor' ),
			]
		);

		$this->add_control(
			'page_list_item_title_color',
			[
				'label'  => esc_html__( 'Title Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#5729d9',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item a' => 'color: {{VALUE}}',
				],
			]
		);


		$this->add_control(
			'page_list_item_border_color',
			[
				'label'  => esc_html__( 'Border Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#E8E8E8',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item' => 'border-color: {{VALUE}}',
				]
			]
		);

		$this->add_control(
			'page_list_item_transition_duration',
			[
				'label' => esc_html__( 'Transition Duration', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::NUMBER,
				'default' => 0.5,
				'min' => 0,
				'max' => 5,
				'step' => 0.1,
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item' => 'transition-duration: {{VALUE}}s',
					'{{WRAPPER}} .tmpcoder-page-list-item a' => 'transition-duration: {{VALUE}}s'
				]
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'page_list_item_title_typo',
				'selector' => '{{WRAPPER}} .tmpcoder-page-list-item a',
				'fields_options' => [
					'typography'      => [
						'default' => 'custom',
					],
					'font_size'      => [
						'default'    => [
							'size' => '14',
							'unit' => 'px',
						],
					],
					'line_height'     => [
						'default' => [
							'size' => '0.8',
							'unit' => 'em',
						]
					],
				]
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'page_list_item_hover',
			[
				'label' => esc_html__( 'Hover', 'sastra-essential-addons-for-elementor' ),
			]
		);

		$this->add_control(
			'page_list_item_title_color_hr',
			[
				'label'  => esc_html__( 'Title Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#5729d9',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item a:hover' => 'color: {{VALUE}}',
				],
			]
		);


        $this->add_control_title_pointer_color_hr();

		$this->end_controls_tab();

		$this->end_controls_tabs();

        $this->add_control_title_pointer();

        $this->add_control_title_pointer_animation();

        $this->add_control_title_pointer_height();

		$this->add_responsive_control(
			'title_distance',
			[
				'label' => esc_html__( 'Bottom Distance', 'sastra-essential-addons-for-elementor' ),
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
					'{{WRAPPER}} .tmpcoder-page-list-item div a' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before'
			]
		);

		$this->end_controls_section();
		

		$this->start_controls_section(
			'section_style_sub_title',
			[
				'label' => esc_html__( 'Sub Title', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE
			]
		);

		$this->add_control(
			'page_list_item_sub_title_color',
			[
				'label'  => esc_html__( 'Sub Title Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#B6B6B6',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item p' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'page_list_item_sub_title_typo',
				'selector' => '{{WRAPPER}} .tmpcoder-page-list-item p',
				'fields_options' => [
					'typography'      => [
						'default' => 'custom',
					],
					'font_size'      => [
						'default'    => [
							'size' => '12',
							'unit' => 'px',
						],
					],
					'line_height'     => [
						'default' => [
							'size' => '0.8',
							'unit' => 'em',
						]
					]
				]
			]
		);

		$this->end_controls_section();

		// Tab: Style ==============
		// Section: Content --------
		$this->start_controls_section(
			'section_style_badge',
			[
				'label' => esc_html__( 'Badge', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE
			]
		);

		$this->add_control(
			'badge_color',
			[
				'label'  => esc_html__( 'Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#FFFFFF',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item-badge' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'badge_bg_color',
			[
				'label'  => esc_html__( 'Background Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#5729d9',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item-badge' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'badge_vertical_align',
			[
				'label' => esc_html__( 'Vertical Align', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::CHOOSE,
				'label_block' => false,
				'default' => 'center',
				'options' => [
					'top' => [
						'title' => esc_html__( 'Top', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-v-align-top',
					],
					'center' => [
						'title' => esc_html__( 'Middle', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-v-align-middle',
					],
					'bottom' => [
						'title' => esc_html__( 'Bottom', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-v-align-bottom',
					]
				],
				'prefix_class' => 'tmpcoder-pl-badge-',
				'render_type' => 'template',
				'separator' => 'before'
			]
		);

		$this->add_responsive_control(
			'badge_size',
			[
				'label' => esc_html__( 'Size', 'sastra-essential-addons-for-elementor' ),
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
					'size' => 12,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item-badge' => 'font-size: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before'
			]
		);

		$this->add_responsive_control(
			'badge_distance',
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
					'size' => 5,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item-badge' => 'margin-left: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'badge_border_padding',
			[
				'label' => esc_html__( 'Padding', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'default' => [
					'top' => 2,
					'right' => 5,
					'bottom' => 2,
					'left' => 5,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item-badge' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				]
			]
		);

		$this->add_control(
			'badge_border_radius',
			[
				'label' => esc_html__( 'Border Radius', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'default' => [
					'top' => 0,
					'right' => 0,
					'bottom' => 0,
					'left' => 0,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list-item-badge' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				]
			]
		);

        $this->end_controls_section();

		// Tab: Style ==============
		// Section: Content --------
		$this->start_controls_section(
			'section_style_icon',
			[
				'label' => esc_html__( 'Icon', 'sastra-essential-addons-for-elementor' ),
				'tab' => Controls_Manager::TAB_STYLE
			]
		);

		$this->add_control(
			'icon_color',
			[
				'label'  => esc_html__( 'Color', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '#5729d9',
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list i' => 'color: {{VALUE}}',
					'{{WRAPPER}} .tmpcoder-page-list svg' => 'fill: {{VALUE}}'
				],
			]
		);

		$this->add_control(
			'icon_vertical_align',
			[
				'label' => esc_html__( 'Vertical Align', 'sastra-essential-addons-for-elementor' ),
				'type' => Controls_Manager::CHOOSE,
				'label_block' => false,
				'default' => 'center',
				'options' => [
					'top' => [
						'title' => esc_html__( 'Top', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-v-align-top',
					],
					'center' => [
						'title' => esc_html__( 'Middle', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-v-align-middle',
					],
					'bottom' => [
						'title' => esc_html__( 'Bottom', 'sastra-essential-addons-for-elementor' ),
						'icon' => 'eicon-v-align-bottom',
					]
				],
				'prefix_class' => 'tmpcoder-pl-icon-',
				'render_type' => 'template',
				'separator' => 'before'
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
						'max' => 50,
					],
				],
				'default' => [
					'unit' => 'px',
					'size' => 15,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list i' => 'font-size: {{SIZE}}{{UNIT}}; max-height: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .tmpcoder-page-list svg' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .tmpcoder-page-list i:before' => 'max-height: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .tmpcoder-page-list-item-icon' => 'max-height: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before'
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
					'size' => 5,
				],
				'selectors' => [
					'{{WRAPPER}} .tmpcoder-page-list .tmpcoder-page-list-item-icon' => 'margin-right: {{SIZE}}{{UNIT}};',
				],
			]
		);

        $this->end_controls_section();
    }
	
    protected function render() {
        $settings = $this->get_settings_for_display();

        $class = '';

		// Pointer Class
		$page_title_pointer = ! tmpcoder_is_availble() ? 'none' : $settings['title_pointer'];
		$page_title_pointer_animation = ! tmpcoder_is_availble() ? 'fade' : $settings['title_pointer_animation'];
		$pointer_item_class = (isset($settings['title_pointer']) && 'none' !== $settings['title_pointer']) ? 'tmpcoder-pointer-item' : 'tmpcoder-no-pointer';

		$class .= ' tmpcoder-pointer-'. $page_title_pointer;
		$class .= ' tmpcoder-pointer-line-fx tmpcoder-pointer-fx-'. $page_title_pointer_animation;

        echo '<div class="tmpcoder-page-list-wrap">';
            echo '<ul class="tmpcoder-page-list">';
            
                foreach ( $settings['page_list'] as $key=>$item ) {

					if ( 'yes' === $item['open_in_new_page'] ) {
						$target = '_blank';
					} else {
						$target = '_self';
					}

					if ( 'yes' === $item['show_page_list_item_badge_animation'] ) {
						$badge_anim_class = ' tmpcoder-pl-badge-anim-yes';
					} else {
						$badge_anim_class = '';
					}

					$this->add_render_attribute( 'page_list_item'. $key, 'class', 'tmpcoder-page-list-item elementor-repeater-item-'. $item['_id']. $class . $badge_anim_class );

                    if ( isset($item['page_list_item_icon']) && '' !== $item['page_list_item_icon']['value'] ) {
                        ob_start();
                        \Elementor\Icons_Manager::render_icon( $item['page_list_item_icon'], [ 'aria-hidden' => 'true' ] );
                        $icon = ob_get_clean();
                    }

                    if ( 'dynamic' === $item['page_list_item_type'] && isset($item['query_page_selection']) ) {

						echo wp_kses_post('<li '. $this->get_render_attribute_string('page_list_item'. $key) .'>');
						echo (isset($item['page_list_item_icon']) && '' !== $item['page_list_item_icon']['value']) ? '<span class="tmpcoder-page-list-item-icon">'. wp_kses($icon, tmpcoder_wp_kses_allowed_html()) .'</span>' : '';
                        	echo '<div>';
                                echo '<a class="'. esc_attr($pointer_item_class) .'" href='. esc_url(get_the_permalink(get_page_by_path($item['query_page_selection']))) .' target='. esc_attr($target) .'>';
                                    echo esc_html(get_the_title(get_page_by_path($item['query_page_selection'])));
                                echo '</a>';
                                if ( isset($item['page_list_item_sub_title']) && '' !== $item['page_list_item_sub_title']  ) {
                                    echo '<p>'. esc_html($item['page_list_item_sub_title']) .'</p>';
                                }
							echo '</div>';
							echo 'yes' === $item['show_page_list_item_badge'] ? '<span class="tmpcoder-page-list-item-badge">'. esc_html($item['page_list_item_badge_text']) .'</span>' : '';
						echo '</li>';

                    } else if ( 'custom' === $item['page_list_item_type'] && isset($item['page_list_item_title']) ) {

                        if ( ! empty( $item['page_list_item_title_url']['url'] ) ) {
                            $this->add_link_attributes( 'title_link_'. $key, $item['page_list_item_title_url'] );
                        }

                        echo wp_kses_post('<li '. $this->get_render_attribute_string('page_list_item'. $key) .'>');
                            echo (isset($item['page_list_item_icon']) && '' !== $item['page_list_item_icon']['value']) ? '<span class="tmpcoder-page-list-item-icon">'. wp_kses($icon, tmpcoder_wp_kses_allowed_html()) .'</span>' : '';
                            echo '<div>';
                                echo wp_kses_post('<a  '. $this->get_render_attribute_string( 'title_link_'. $key ) .' class="'. $pointer_item_class .'">');
                                    echo esc_html($item['page_list_item_title']);
                                echo '</a>';
                                if ( isset($item['page_list_item_sub_title']) && '' !== $item['page_list_item_sub_title'] ) {
                                    echo '<p>'. esc_html($item['page_list_item_sub_title']) .'</p>';
                                }
                            echo '</div>';
                            echo 'yes' === $item['show_page_list_item_badge'] ? '<span class="tmpcoder-page-list-item-badge">'. esc_html($item['page_list_item_badge_text']) .'</span>' : '';
                        echo '</li>';

                    }
                }

            echo '</ul>';
        echo '</div>';
    }
}