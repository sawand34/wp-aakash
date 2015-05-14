<div class="block ui-tabs-panel deactive" id="option-ui-id-3" >	
	<?php $current_options = get_option('hc_lite_options');
	if(isset($_POST['webriti_settings_save_3']))
	{	
		if($_POST['webriti_settings_save_3'] == 1) 
		{
			if ( empty($_POST) || !wp_verify_nonce($_POST['webriti_gernalsetting_nonce_customization'],'webriti_customization_nonce_gernalsetting') )
			{  print 'Sorry, your nonce did not verify.';	exit; }
			else  
			{		
				$current_options['service_title']=sanitize_text_field($_POST['service_title']);
                $current_options['service_description'] = sanitize_text_field($_POST['service_description']);
				$current_options['service_one_icon']=sanitize_text_field($_POST['service_one_icon']);
				$current_options['service_one_title']=sanitize_text_field($_POST['service_one_title']);
				$current_options['service_one_description']=sanitize_text_field($_POST['service_one_description']);
				$current_options['home_service_one_link']=sanitize_text_field($_POST['home_service_one_link']);
				$current_options['home_service_one_link_target']=sanitize_text_field($_POST['home_service_one_link_target']);
				
				$current_options['service_two_icon']=sanitize_text_field($_POST['service_two_icon']);
				$current_options['service_two_title']=sanitize_text_field($_POST['service_two_title']);
				$current_options['service_two_description']=sanitize_text_field($_POST['service_two_description']);
				$current_options['home_service_two_link']=sanitize_text_field($_POST['home_service_two_link']);
				$current_options['home_service_two_link_target']=sanitize_text_field($_POST['home_service_two_link_target']);
				
				$current_options['service_third_icon']=sanitize_text_field($_POST['service_third_icon']);
				$current_options['service_third_title']=sanitize_text_field($_POST['service_third_title']);
				$current_options['service_third_description']=sanitize_text_field($_POST['service_third_description']);
				$current_options['home_service_third_link']=sanitize_text_field($_POST['home_service_third_link']);
				$current_options['home_service_third_link_target']=sanitize_text_field($_POST['home_service_third_link_target']);
				
				$current_options['service_four_icon']=sanitize_text_field($_POST['service_four_icon']);
				$current_options['service_four_title']=sanitize_text_field($_POST['service_four_title']);;
				$current_options['service_four_description']=sanitize_text_field($_POST['service_four_description']);
				$current_options['home_service_fourth_link']=sanitize_text_field($_POST['home_service_fourth_link']);
				$current_options['home_service_fourth_link_target']=sanitize_text_field($_POST['home_service_fourth_link_target']);
				
				update_option('hc_lite_options',$current_options);
			}
		}	
		if($_POST['webriti_settings_save_3'] == 2) 
		{
			$current_options['service_title']='Awesome Services';
			$current_options['service_description'] ='Lorem ipsum dolor sit amet, consectetuer adipiscing elit lorem ipsum dolor sit amet.';
			
			
			$current_options['service_one_icon']='fa-wheelchair';
			$current_options['service_one_title']='Medical Guidance';
			$current_options['service_one_description']='Lorem ipsum dolor sit amet, consectetur adipricies sem Unlimited ColorsCras pulvin, maurisoicituding adipiscing, Lorem ipsum dolor sit amet, consect adipiscing elit, sed diam nonummy nibh euis udin';
			$current_options['home_service_one_link']='#';
			$current_options['home_service_one_link_target']="on";
			
			$current_options['service_two_icon']='fa-medkit';
			$current_options['service_two_title']='Emergency Help';
			$current_options['service_two_description']='Lorem ipsm dolor sit amet, consectetur adipricies sem Unlimited ColorsCras pulvin, maurisoicituding adipiscing, Lorem ipsum dolor sit amet, consect adipiscing elit, sed diam nonummy nibh euis udin';
			$current_options['home_service_two_link']='#';
			$current_options['home_service_two_link_target']="on";
			
			$current_options['service_third_icon']='fa-ambulance';
			$current_options['service_third_title']='Cardio Monitoring';
			$current_options['service_third_description']='Lorem ipsum dolor sit amet, consectetur adipricies sem Unlimited ColorsCras pulvin, maurisoicituding adipiscing, Lorem ipsum dolor sit amet, consect adipiscing elit, sed diam nonummy nibh euis udin';
			$current_options['home_service_third_link']='#';
			$current_options['home_service_third_link_target']="on";
			
			$current_options['service_four_icon']='fa-user-md';
			$current_options['service_four_title']='Medical Treatment';
			$current_options['service_four_description']='Lorem ipsum dolor sit amet, consectetur adipricies sem Unlimited ColorsCras pulvin, maurisoicituding adipiscing, Lorem ipsum dolor sit amet, consect adipiscing elit, sed diam nonummy nibh euis udin';
			$current_options['home_service_fourth_link']='#';
			$current_options['home_service_fourth_link_target']="on";
			update_option('hc_lite_options',$current_options);
		}
	}  ?>
	<form method="post" id="webriti_theme_options_3">
		<div id="heading">
			<table style="width:100%;"><tr>
				<td><h2><?php _e('Service Settings','health');?></h2></td>
				<td><div class="webriti_settings_loding" id="webriti_loding_3_image"></div>
					<div class="webriti_settings_massage" id="webriti_settings_save_3_success" ><?php _e('Options data successfully Saved','health');?></div>
					<div class="webriti_settings_massage" id="webriti_settings_save_3_reset" ><?php _e('Options data successfully reset','health');?></div>
				</td>
				<td style="text-align:right;">
					<input class="reset-button btn" type="button" name="reset" value="Restore Defaults" onclick="webriti_option_data_reset('3');">
					<input class="btn btn-primary" type="button" value="Save Options" onclick="webriti_option_data_save('3')" >
				</td>
				</tr>
			</table>	
		</div>		
		<?php wp_nonce_field('webriti_customization_nonce_gernalsetting','webriti_gernalsetting_nonce_customization'); ?>
		<div class="section">
			<h3><?php _e('Awesome Services','health'); ?></h3>
			<hr>
			<h3><?php _e('Service Title','health'); ?></h3>
			<input class="webriti_inpute"  type="text" name="service_title" id="service_title" value="<?php echo $current_options['service_title']; ?>" >
			<span class="explain"><?php _e('Enter the service title.','health'); ?></span>
		</div>
		<div class="section">	
		<h3><?php _e('Service Description','health'); ?></h3>
			<textarea rows="3" cols="8" id="service_description" name="service_description"><?php if($current_options['service_description']!='') { echo esc_attr($current_options['service_description']); } ?></textarea>
			<span class="explain"><?php _e('Enter the service description.','health'); ?></span>
		</div>
		<div class="section">	
			<h3><?php _e('Service one','health'); ?></h3><hr>
			<h3><?php _e('Service Icons','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="service_one_icon" id="service_one_icon" value="<?php echo $current_options['service_one_icon']; ?>" >
			<p class="explain"><?php _e('Service Icon (Using Font Awesome icons name) like: fa-medkit.','health'); ?><a href="http://fortawesome.github.io/Font-Awesome/icons/"><?php _e('Get your fontawesome icons.','health'); ?></a></p>
			<h3><?php _e('Service Title','health'); ?></h3>
			<input class="webriti_inpute"  type="text" name="service_one_title" id="service_one_title" value="<?php echo $current_options['service_one_title']; ?>" >
			<span class="explain"><?php _e('Enter the service title.','health'); ?></span>
			<h3><?php _e('Service Description','health'); ?></h3>
			<textarea rows="3" cols="8" id="service_one_description" name="service_one_description"><?php if($current_options['service_one_description']!='') { echo esc_attr($current_options['service_one_description']); } ?></textarea>
			<span class="explain"><?php _e('Enter the service description.','health'); ?></span>
			
			<h3><?php _e('Home service one page and icon Link','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="home_service_one_link" id="home_service_one_link" placeholder="Enter http://example.com"  value="<?php if(isset($current_options['home_service_one_link'])) { echo $current_options['home_service_one_link']; } ?>" >
			<span class="explain"><?php _e('Enter the home service one icon and title link.','health'); ?></span>
			<p><input type="checkbox" id="home_service_one_link_target" name="home_service_one_link_target" <?php if($current_options['home_service_one_link_target']=='on') echo "checked='checked'"; ?> > <?php _e('Open link in a new window/tab','health'); ?></p>
		</div>
		<div class="section">	
			<h3><?php _e('Service two','health'); ?></h3><hr>
			<h3><?php _e('Service Icons','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="service_two_icon" id="service_two_icon" value="<?php echo $current_options['service_two_icon']; ?>" >
			<p class="explain"><?php _e('Service Icon (Using Font Awesome icons name) like: fa-medkit.','health'); ?><a href="http://fortawesome.github.io/Font-Awesome/icons/"><?php _e('Get your fontawesome icons.','health'); ?></a></p>
			<h3><?php _e('Service Title','health'); ?></h3>
			<input class="webriti_inpute"  type="text" name="service_two_title" id="service_two_title" value="<?php echo $current_options['service_two_title']; ?>" >
			<span class="explain"><?php _e('Enter the service title.','health'); ?></span>
			<h3><?php _e('Service Description','health'); ?></h3>
			<textarea rows="3" cols="8" id="service_two_description" name="service_two_description"><?php if($current_options['service_two_description']!='') { echo esc_attr($current_options['service_two_description']); } ?></textarea>
			<span class="explain"><?php _e('Enter the service description.','health'); ?></span>
			
			<h3><?php _e('Home service two page and icon Link','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="home_service_two_link" id="home_service_two_link" placeholder="Enter http://example.com"  value="<?php if(isset($current_options['home_service_two_link'])) { echo $current_options['home_service_two_link']; } ?>" >
			<span class="explain"><?php _e('Enter the home service two icon and title link.','health'); ?></span>
			<p><input type="checkbox" id="home_service_two_link_target" name="home_service_two_link_target" <?php if($current_options['home_service_two_link_target']=='on') echo "checked='checked'"; ?> > <?php _e('Open link in a new window/tab','health'); ?></p>
			
		</div>
		<div class="section">	
			<h3><?php _e('Service Third','health'); ?></h3><hr>
			<h3><?php _e('Service Icons','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="service_third_icon" id="service_third_icon" value="<?php echo $current_options['service_third_icon']; ?>" >
			<p class="explain"><?php _e('Service Icon (Using Font Awesome icons name) like: fa-medkit.','health'); ?><a href="http://fortawesome.github.io/Font-Awesome/icons/"><?php _e('Get your fontawesome icons.','health'); ?></a></p>
			<h3><?php _e('Service Title','health'); ?></h3>
			<input class="webriti_inpute"  type="text" name="service_third_title" id="service_third_title" value="<?php echo $current_options['service_third_title']; ?>" >
			<span class="explain"><?php _e('Enter the service title.','health'); ?></span>
			<h3><?php _e('Service Description','health'); ?></h3>
			<textarea rows="3" cols="8" id="service_third_description" name="service_third_description"><?php if($current_options['service_third_description']!='') { echo esc_attr($current_options['service_third_description']); } ?></textarea>
			<span class="explain"><?php _e('Enter the service description.','health'); ?></span>
			
			
			<h3><?php _e('Home service third page and icon Link','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="home_service_third_link" id="home_service_third_link" placeholder="Enter http://example.com"  value="<?php if(isset($current_options['home_service_third_link'])) { echo $current_options['home_service_third_link']; } ?>" >
			<span class="explain"><?php _e('Enter the home service third icon and title link.','health'); ?></span>
			<p><input type="checkbox" id="home_service_third_link_target" name="home_service_third_link_target" <?php if($current_options['home_service_third_link_target']=='on') echo "checked='checked'"; ?> > <?php _e('Open link in a new window/tab','health'); ?></p>
			
		</div>
		<div class="section">	
			<h3><?php _e('Service Four','health'); ?></h3><hr>
			<h3><?php _e('Service Icons','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="service_four_icon" id="service_four_icon" value="<?php echo $current_options['service_four_icon']; ?>" >
			<p class="explain"><?php _e('Service Icon (Using Font Awesome icons name) like: fa-medkit.','health'); ?><a href="http://fortawesome.github.io/Font-Awesome/icons/"><?php _e('Get your fontawesome icons.','health'); ?></a></p>
			<h3><?php _e('Service Title','health'); ?></h3>
			<input class="webriti_inpute"  type="text" name="service_four_title" id="service_four_title" value="<?php echo $current_options['service_four_title']; ?>" >
			<span class="explain"><?php _e('Enter the service title.','health'); ?></span>
			<h3><?php _e('Service Description','health'); ?></h3>
			<textarea rows="3" cols="8" id="service_four_description" name="service_four_description"><?php if($current_options['service_four_description']!='') { echo esc_attr($current_options['service_four_description']); } ?></textarea>
			<span class="explain"><?php _e('Enter the service description.','health'); ?></span>
			
			
			<h3><?php _e('Home service fourth page and icon Link','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="home_service_fourth_link" id="home_service_fourth_link" placeholder="Enter http://example.com"  value="<?php if(isset($current_options['home_service_fourth_link'])) { echo $current_options['home_service_fourth_link']; } ?>" >
			<span class="explain"><?php _e('Enter the home service fourth icon and title link.','health'); ?></span>
			<p><input type="checkbox" id="home_service_fourth_link_target" name="home_service_fourth_link_target" <?php if($current_options['home_service_fourth_link_target']=='on') echo "checked='checked'"; ?> > <?php _e('Open link in a new window/tab','health'); ?></p>
			
		</div>
		
		<div id="button_section">
			<input type="hidden" value="1" id="webriti_settings_save_3" name="webriti_settings_save_3" />
			<input class="reset-button btn" type="button" name="reset" value="Restore Defaults" onclick="webriti_option_data_reset('3');">
			<input class="btn btn-primary" type="button" value="Save Options" onclick="webriti_option_data_save('3')" >
		</div>
	</form>
</div>