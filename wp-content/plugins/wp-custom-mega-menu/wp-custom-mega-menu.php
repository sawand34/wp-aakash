<?php
/**
 * Created by PhpStorm.
 * User: Sawan Kumar
 * Date: 22/03/15
 * Time: 2:50 PM
 */
/*
Plugin Name: Custom mega menu
Description: Its a menu where you can search and identify
Author: Sawan Kumar
Author URI: http://www.omwebsoft.com
License: GPLv2 or later
Text Domain: akismet
*/
wp_enqueue_style('custom-style', plugins_url( '/mega-menu-style.css', __FILE__ ), array(),'all');
register_nav_menu( 'primary', __( 'Primary Menu', 'theme-slug' ) );
function cmm_nav_menu_args($args){ ?>
    <div id="menu" class="medicalprofessional clear">
    <div class="blue-gradient clearfix nav-container">
    <nav class="center main-menu">
        <ul>
<?php
    $current_theme_location = $args['theme_location'];
    $locations = get_nav_menu_locations();
    $menu_id = $locations[ $current_theme_location ];
    $menu_items = wp_get_nav_menu_items( $menu_id );
	$menu_c = 0 ;
    foreach($menu_items as $menu_item){
		if($menu_c==1){
        if(!$menu_item->menu_item_parent){ //getting only the parent menu ?>
            <li class="menu-li " style="width: 120px">
                <div class="menu-item">
                    <a class="megamenu-link" href="<?php bloginfo('wpurl') ?>/wp-admin/admin-ajax.php"
                       rel="<?php echo $current_theme_location.'_'.$menu_item->ID; ?>"
                       >
                        <span><?php echo $menu_item->title; ?></span></a>
                </div>
                <div class="megamenu-container center content-loading">
                    <div class="megamenu"></div>
                </div>
            </li>
          <?php
        }
		}else { if(!$menu_item->menu_item_parent){  ?>
        
        <li class="menu-li " style="width: 120px">
                <div class="menu-item">
                    <a class="" href="<?php echo get_permalink($menu_item->object_id); ?>"
                       rel="<?php echo $current_theme_location.'_'.$menu_item->ID; ?>"
                       >
                        <span><?php echo $menu_item->title; ?></span></a>
                </div>
                <div class="megamenu-container center content-loading">
                    <div class="megamenu"></div>
                </div>
            </li>
   <?php   
		}
		}
$menu_c = $menu_c + 1;
    } ?>
            </ul>
    </nav>
    </div>
    </div>
<?php
}
add_filter( 'wp_nav_menu_args', 'cmm_nav_menu_args', 9999 );
//add_filter( 'wp_nav_menu', 'cmm_nav_menu_args', 10, 2 );
//adding javascript
function cmm_add_script() {
    wp_enqueue_script(
        'jquesyex',
        '//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js',
        array( 'jquery' )
    );
    wp_enqueue_script(
        'headerscript',
        plugins_url( '/headscript.js' , __FILE__ ),
        array( 'jquery' )
    );
    wp_enqueue_script(
        'mainscript',
        plugins_url( '/script.js' , __FILE__ ),
        array( 'jquery' )
    );
    wp_enqueue_script(
        'historyscript',
        '//cdnjs.cloudflare.com/ajax/libs/history.js/1.8/native.history.min.js',
        array( 'jquery' )
    );


}

add_action( 'wp_enqueue_scripts', 'cmm_add_script' );
//adding html to footer
function cmm_footer_html() {
    echo '<div class="modal" id="error-modal">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h3 class="error-header">Error</h3>
    </div>
    <div class="modal-body">
        <div class="alert alert-error">There was an error retrieving the content. Please try again, or try refreshing the page.</div>
    </div>
    <div class="modal-footer">
        <a href="#" class="btn" data-dismiss="modal">Close</a>
    </div>
</div>';
}
add_action('wp_footer', 'cmm_footer_html', 100);
function ajaxmegamenupage(){
    include('custom-menu.php');
    exit;
}
add_action( 'wp_ajax_ajaxmegamenupage', 'ajaxmegamenupage' );
add_action( 'wp_ajax_nopriv_ajaxmegamenupage', 'ajaxmegamenupage' );

function register_my_menus() {
    register_nav_menus(
        array(
            'header-menu' => __( 'Header Menu' ),
            'extra-menu' => __( 'Extra Menu' )
        )
    );
}
add_action( 'init', 'register_my_menus' );