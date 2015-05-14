<?php 	/**Includes reqired resources here**/
   	define('WEBRITI_TEMPLATE_DIR_URI',get_template_directory_uri());	
   	define('WEBRITI_TEMPLATE_DIR',get_template_directory());
   	define('WEBRITI_THEME_FUNCTIONS_PATH',WEBRITI_TEMPLATE_DIR.'/functions');	
   	define('WEBRITI_THEME_OPTIONS_PATH',WEBRITI_TEMPLATE_DIR_URI.'/functions/theme_options');
   	
   	require( WEBRITI_THEME_FUNCTIONS_PATH . '/menu/default_menu_walker.php' ); // for Default Menus
   	require( WEBRITI_THEME_FUNCTIONS_PATH . '/menu/webriti_nav_walker.php' ); // for Custom Menus	
   	
   	require( WEBRITI_THEME_FUNCTIONS_PATH . '/commentbox/comment-function.php' ); //for comments
   	require( WEBRITI_THEME_FUNCTIONS_PATH . '/widget/custom-sidebar.php' ); //for widget register
   	
   	
   	//content width
   	if ( ! isset( $content_width ) ) $content_width = 900;		
   	//wp title tag starts here
   	function hc_head( $title, $sep )
   	{	global $paged, $page;		
   		if ( is_feed() )
   			return $title;
   		// Add the site name.
   		$title .= get_bloginfo( 'name' );
   		// Add the site description for the home/front page.
   		$site_description = get_bloginfo( 'description' );
   		if ( $site_description && ( is_home() || is_front_page() ) )
   			$title = "$title $sep $site_description";
   		// Add a page number if necessary.
   		if ( $paged >= 2 || $page >= 2 )
   			$title = "$title $sep " . sprintf( _e( 'Page', 'helth' ), max( $paged, $page ) );
   		return $title;
   	}	
   	add_filter( 'wp_title', 'hc_head', 10,2 );
   	
   	add_action( 'after_setup_theme', 'hc_setup' ); 	
   	function hc_setup()
   	{	// Load text domain for translation-ready
   		load_theme_textdomain( 'health', WEBRITI_THEME_FUNCTIONS_PATH . '/lang' );		
   		
   		add_theme_support( 'post-thumbnails' ); //supports featured image
   		// This theme uses wp_nav_menu() in one location.
   		register_nav_menu( 'primary', __( 'Primary Menu', 'health' ) );
   		// theme support 	
   		$args = array('default-color' => '000000',);
   		add_theme_support( 'custom-background', $args  ); 
   		add_theme_support( 'automatic-feed-links'); 
   		
   		require_once('theme_setup_data.php');
   		require( WEBRITI_THEME_FUNCTIONS_PATH . '/theme_options/option_pannel.php' ); // for Custom Menus		
   		// setup admin pannel defual data for index page		
   		$health_center_lite_theme=theme_data_setup();
   		
   		function hc_custom_excerpt_length( $length ) {	return 50; }
   		add_filter( 'excerpt_length', 'hc_custom_excerpt_length', 999 );
   		
   		function hc_new_excerpt_more( $more ) {	return '';}
   		add_filter('excerpt_more', 'hc_new_excerpt_more');
   		
   		$current_theme_options = get_option('hc_lite_options'); // get existing option data 		
   		if($current_theme_options)
   		{ 	$hc_lite_theme_options = array_merge($health_center_lite_theme, $current_theme_options);
   			update_option('hc_lite_options',$hc_lite_theme_options);			
   		}
   		else
   		{	add_option('hc_lite_options',$health_center_lite_theme);	}
   		
   		
   	}
   	/******** health center js and cs *********/
   	function hc_scripts()
   	{	// Theme Css 
   		wp_enqueue_style('health-responsive', WEBRITI_TEMPLATE_DIR_URI . '/css/media-responsive.css');
   		
		wp_enqueue_style('health-font', WEBRITI_TEMPLATE_DIR_URI . '/css/font/font.css');	
   		
		wp_enqueue_style('health-bootstrap', WEBRITI_TEMPLATE_DIR_URI . '/css/bootstrap.css');	
   		
		wp_enqueue_style('health-font-awesome', WEBRITI_TEMPLATE_DIR_URI . '/css/font-awesome-4.0.3/css/font-awesome.min.css');	
   		
		wp_enqueue_script('health-menu', WEBRITI_TEMPLATE_DIR_URI .'/js/menu/menu.js',array('jquery'));
   		
		wp_enqueue_script('health-bootstrap_min', WEBRITI_TEMPLATE_DIR_URI .'/js/bootstrap.min.js');	
   	}
   	
   	add_action('wp_enqueue_scripts', 'hc_scripts');
   	if ( is_singular() ){ wp_enqueue_script( "comment-reply" );	}
   	
   	// Read more tag to formatting in blog page 
   	function hc_content_more($more)
   	{  global $post;
   	   return ' <a href="' . get_permalink() . "#more-{$post->ID}\" class=\"hc_blog_btn\">Read More<i class='fa fa-long-arrow-right'></i></a>";
   	}   
   	add_filter( 'the_content_more_link', 'hc_content_more' );
   ?>