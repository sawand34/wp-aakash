<?php	
	$check = get_option('hc_lite_options');
  		if (  $check['front_page'] != "on" ) {
  		get_template_part('index');
  		}
  	else {
	get_header();	
	$current_options=get_option('hc_lite_options'); 
	if($current_options['home_page_image']!='') { ?>
	<div class="row">		
		<img style="height:450px; width:1200px;" src="<?php echo $current_options['home_page_image']; ?>" class="img-responsive" />
	</div>	
	<?php } ?>
	<div class="row"><div class="hc_home_border"></div></div>
	<?php 
	/****** get index service  ********/
  	get_template_part('index', 'services') ;
	
	/****** get index Projects  ********/
  	get_template_part('index', 'projects') ;
	get_footer();
	} ?>