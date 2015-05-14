<?php
add_action('admin_menu', 'webriti_admin_menu_pannel');  
function webriti_admin_menu_pannel()
 {	add_theme_page( __('theme','health'), __('Option Panel','health'), 'edit_theme_options', 'webriti', 'webriti_option_panal_function' );
 
 	add_theme_page( __('webriti_themes','health'), __('Webriti Themes','health'), 'edit_theme_options', 'webriti_themes', 'webriti_themes_function' );
	
	add_action('admin_enqueue_scripts', 'webriti_admin_enqueue_script');
 }
function webriti_admin_enqueue_script($hook)
{		
	if('appearance_page_webriti' == $hook){
	wp_enqueue_script('health-tab',get_template_directory_uri().'/functions/theme_options/js/option-panel-js.js',array('media-upload','jquery-ui-sortable'));	
	
	wp_enqueue_script( 'health-bootstrap-modal', get_template_directory_uri() . '/functions/theme_options/js/bootstrap-modal.js');
	
	wp_enqueue_style('thickbox');	
	
	wp_enqueue_style('health-option',get_template_directory_uri().'/functions/theme_options/css/style-option.css');
	
	wp_enqueue_style('health-hc-bootstrap',get_template_directory_uri().'/functions/theme_options/css/hc-bootstrap.css');
	}
}
	function webriti_option_panal_function()
	{	require_once('webriti_option_pannel.php'); }


	function webriti_themes_function ()
	{	
		require_once('webriti_theme.php');
	}
	//Theme pages css and js
?>