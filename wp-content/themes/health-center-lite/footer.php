<!-- Footer Widget Secton -->
<div class="hc_footer_widget_area">
  <div class="container">
    <div class="row">
      <?php 
        if ( is_active_sidebar( 'footer-widget-area' ) )
        { 
        	dynamic_sidebar( 'footer-widget-area' );
        }
        else 
        {  	$args=array(
        		'before_widget' => '<div class="col-md-3 hc_footer_widget_column">',
        		'after_widget' => '</div>',
        		'before_title' => '<div class="hc_footer_widget_title"><h3>',
        		'after_title' => '</h3></div>');  
        	the_widget('WP_Widget_Meta','',$args); 	
        	the_widget('WP_Widget_Pages','',$args); 
        	the_widget('WP_Widget_Archives','',$args);
        	the_widget('WP_Widget_Categories','',$args);
        } ?>
    </div>
    <div class="row hc_footer_area">
      <div class="col-md-12">
        <p><?php  
          $current_options = get_option('hc_lite_options');
          if($current_options['footer_customizations']!='') { echo $current_options['footer_customizations']; }	?>
          <a target="_blank" rel="nofollow" href="http://wordpress.org/"><?php _e('WordPress','health'); ?></a>.<?php if($current_options['created_by_text']!='') { echo $current_options['created_by_text']; } ?>
          <a target="_blank" rel="nofollow" href="<?php if($current_options['created_by_link']!='') { echo $current_options['created_by_link']; } ?>"><?php if($current_options['created_by_webriti_text']!='') { echo $current_options['created_by_webriti_text']; } ?></a>
        </p>
      </div>
    </div>
  </div>
  <?php
    $current_options=get_option('hc_lite_options');
    if($current_options['webrit_custom_css']!='') {  ?>
  <style type="text/css"><?php echo $current_options['webrit_custom_css']; ?></style>
  <?php } ?>
</div>
<?php wp_footer(); ?>
</body>
</html>