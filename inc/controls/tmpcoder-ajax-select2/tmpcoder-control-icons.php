<?php
namespace TMPCODER;
use Elementor\Base_Data_Control;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class TMPCODER_Control_Arrow_Icons extends Base_Data_Control {
	private static $_arrow_icons;

	public function get_type() {
		return 'tmpcoder-arrow-icons';
	}

	public static function get_arrow_icons() {
		if ( is_null( self::$_arrow_icons ) ) {
			self::$_arrow_icons = [
				'Font Awesome' => [
					'fas fa-angle' => esc_html__( 'Angle', 'sastra-essential-addons-for-elementor' ),
					'fas fa-angle-double' => esc_html__( 'Angle Double', 'sastra-essential-addons-for-elementor' ),
					'fas fa-arrow' => esc_html__( 'Arrow', 'sastra-essential-addons-for-elementor' ),
					'fas fa-arrow-alt-circle' => esc_html__( 'Arrow Circle', 'sastra-essential-addons-for-elementor' ),
					'far fa-arrow-alt-circle' => esc_html__( 'Arrow Circle Alt', 'sastra-essential-addons-for-elementor' ),
					'fas fa-long-arrow-alt' => esc_html__( 'Long Arrow', 'sastra-essential-addons-for-elementor' ),
					'fas fa-chevron' => esc_html__( 'Chevron', 'sastra-essential-addons-for-elementor' ),
				],
				'Svg' => tmpcoder_get_svg_icons_array( 'arrows', [] ),
			];
		}

		return self::$_arrow_icons;
	}

	public function content_template() {
		$control_uid = $this->get_control_uid();
		?>
		<div class="elementor-control-field">
			<label for="<?php echo esc_attr($control_uid); ?>" class="elementor-control-title">{{{ data.label }}}</label>
			<div class="elementor-control-input-wrapper">
				<select id="<?php echo esc_attr($control_uid); ?>" data-setting="{{ data.name }}">
					<option value="none"><?php echo esc_html__( 'None', 'sastra-essential-addons-for-elementor' ); ?></option>
					<?php foreach ( self::get_arrow_icons() as $arrow_icons_group_name => $arrow_icons_group ) : ?>
						<optgroup label="<?php echo esc_attr($arrow_icons_group_name); ?>">
							<?php foreach ( $arrow_icons_group as $arrow_icon_name => $arrow_icon_title ) : ?>
								<option value="<?php echo esc_attr($arrow_icon_name); ?>"><?php echo esc_html($arrow_icon_title); ?></option>
							<?php endforeach; ?>
						</optgroup>
					<?php endforeach; ?>
				</select>
			</div>
		</div>
		<# if ( data.description ) { #>
		<div class="elementor-control-field-description">{{{ data.description }}}</div>
		<# } #>
		<?php
	}
}