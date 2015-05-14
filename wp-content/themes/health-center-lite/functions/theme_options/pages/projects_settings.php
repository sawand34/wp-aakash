<div class="block ui-tabs-panel deactive" id="option-ui-id-4" >	
	<?php $current_options = get_option('hc_lite_options');
	if(isset($_POST['webriti_settings_save_4']))
	{	
		if($_POST['webriti_settings_save_4'] == 1) 
		{
			if ( empty($_POST) || !wp_verify_nonce($_POST['webriti_gernalsetting_nonce_customization'],'webriti_customization_nonce_gernalsetting') )
			{  print 'Sorry, your nonce did not verify.';	exit; }
			else  
			{		
				$current_options['project_heading_one']=sanitize_text_field($_POST['project_heading_one']);
				$current_options['project_tagline']=sanitize_text_field($_POST['project_tagline']);
				
				$current_options['project_one_thumb']=sanitize_text_field($_POST['project_one_thumb']);
				$current_options['project_two_thumb']=sanitize_text_field($_POST['project_two_thumb']);
				$current_options['project_three_thumb']=sanitize_text_field($_POST['project_three_thumb']);
				$current_options['project_four_thumb']=sanitize_text_field($_POST['project_four_thumb']);
				
				$current_options['project_one_title']=sanitize_text_field($_POST['project_one_title']);
				$current_options['project_two_title']=sanitize_text_field($_POST['project_two_title']);
				$current_options['project_three_title']=sanitize_text_field($_POST['project_three_title']);
				$current_options['project_four_title']=sanitize_text_field($_POST['project_four_title']);
				$current_options['project_one_text']=sanitize_text_field($_POST['project_one_text']);
				$current_options['project_two_text']=sanitize_text_field($_POST['project_two_text']);
				$current_options['project_three_text']=sanitize_text_field($_POST['project_three_text']);
				$current_options['project_four_text']=sanitize_text_field($_POST['project_four_text']);
				$current_options['home_image_one_link']=sanitize_text_field($_POST['home_image_one_link']);
				$current_options['home_image_one_link_target']=sanitize_text_field($_POST['home_image_one_link_target']);
				$current_options['home_image_two_link']=sanitize_text_field($_POST['home_image_two_link']);
				$current_options['home_image_two_link_target']=sanitize_text_field($_POST['home_image_two_link_target']);
				$current_options['home_image_three_link']=sanitize_text_field($_POST['home_image_three_link']);
				$current_options['home_image_three_link_target']=sanitize_text_field($_POST['home_image_three_link_target']);
				$current_options['home_image_four_link']=sanitize_text_field($_POST['home_image_four_link']);
				$current_options['home_image_four_link_target']=sanitize_text_field($_POST['home_image_four_link_target']);
				
				update_option('hc_lite_options',$current_options);
			}
		}	
		if($_POST['webriti_settings_save_4'] == 2) 
		{
			$project_img = WEBRITI_TEMPLATE_DIR_URI .'/images/project_thumb.png';
					
			$current_options['project_heading_one']="Featured Portfolio Projects";
			$current_options['project_tagline']="Maecenas sit amet tincidunt elit. Pellentesque habitant morbi tristique senectus et netus et Nulla facilisi.";
			
			$current_options['project_one_thumb']=$project_img;			
			$current_options['project_one_title']="Lorem Ipsum";
			$current_options['project_one_text']="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ";
			$current_options['home_image_one_link']="#";
			$current_options['home_image_one_link_target']="on";
			
			$current_options['project_two_thumb']=$project_img;			
			$current_options['project_two_title']="Postao je popularan";
			$current_options['project_two_text']="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ";
			$current_options['home_image_two_link']="#";
			$current_options['home_image_two_link_target']="on";
			
			$current_options['project_three_thumb']=$project_img;			
			$current_options['project_three_title']="kojekakve promjene s";
			$current_options['project_three_text']="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ";
			$current_options['home_image_three_link']="#";
			$current_options['home_image_three_link_target']="on";
			
			$current_options['project_four_thumb']=$project_img;			
			$current_options['project_four_title']="kojekakve promjene s";
			$current_options['project_four_text']="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ";
			$current_options['home_image_four_link']="#";
			$current_options['home_image_four_link_target']="on";
			
			update_option('hc_lite_options',$current_options);
		}
	}  ?>
	<form method="post" id="webriti_theme_options_4">
		<div id="heading">
			<table style="width:100%;"><tr>
				<td><h2><?php _e('Projects Settings','health');?></h2></td>
				<td><div class="webriti_settings_loding" id="webriti_loding_4_image"></div>
					<div class="webriti_settings_massage" id="webriti_settings_save_4_success" ><?php _e('Options data successfully Saved','health');?></div>
					<div class="webriti_settings_massage" id="webriti_settings_save_4_reset" ><?php _e('Options data successfully reset','health');?></div>
				</td>
				<td style="text-align:right;">
					<input class="reset-button btn" type="button" name="reset" value="Restore Defaults" onclick="webriti_option_data_reset('4');">
					<input class="btn btn-primary" type="button" value="Save Options" onclick="webriti_option_data_save('4')" >
				</td>
				</tr>
			</table>	
		</div>		
		<?php wp_nonce_field('webriti_customization_nonce_gernalsetting','webriti_gernalsetting_nonce_customization'); ?>
		<div class="section">
			<h3><?php _e('Home Project  Heading','health'); ?></h3>
			<hr>
			<h3><?php _e('Project Section Heading','health'); ?></h3>
			<input class="webriti_inpute" type="text" value="<?php if(isset($current_options['project_heading_one'])) { echo $current_options['project_heading_one']; } ?>" id="project_heading_one" name="project_heading_one" size="36" />
			<span class="icons help"><span class="tooltip"><?php  _e('Enter Project Section Heading','health');?></span></span>
		
			<h3><?php _e('Project Section Tagline','health'); ?><span class="icons help"><span class="tooltip"><?php  _e('Enter Project Thumbnail','health');?></span></span></h3>
			<input class="webriti_inpute"  type="text" name="project_tagline" id="project_tagline" value="<?php if( isset($current_options['project_tagline'])) echo $current_options['project_tagline']; ?>" >
			<span class="icons help"><span class="tooltip"><?php  _e('Enter Project Section Tagline','health');?></span></span>	
		</div>		
		<div class="section">
			<h3><?php _e('Home Project One','health'); ?></h3>
			<hr>
			<h3><?php _e('Project One Title','health'); ?></h3>
			<input class="webriti_inpute" type="text" value="<?php if(isset($current_options['project_one_title'])) { echo $current_options['project_one_title']; } ?>" id="project_one_title" name="project_one_title" size="36" />
			<span class="icons help"><span class="tooltip"><?php  _e('Enter Project Title','health');?></span></span>
		
			<h3><?php _e('Project One Thumbnail','health'); ?><span class="icons help"><span class="tooltip"><?php  _e('Enter Project Thumbnail','health');?></span></span></h3>
			<input class="webriti_inpute"  type="text" name="project_one_thumb" id="project_one_thumb" value="<?php if( isset($current_options['project_one_thumb'])) echo $current_options['project_one_thumb']; ?>" >
			<input type="button" id="upload_button" value="Add Thumb One" class="upload_image_button" />			
			<?php if(isset($current_options['project_one_thumb'])) { ?>
			<p><img class="webriti_home_slide" src="<?php echo $current_options['project_one_thumb'];  ?>" /></p>
			<?php } ?>
			<h3><?php _e('Project One Description','health'); ?></h3>
			<textarea rows="5" cols="8" id="project_one_text" name="project_one_text"  class="textbox1"><?php if(isset($current_options['project_one_text'])) { echo esc_attr($current_options['project_one_text']); } ?></textarea>
			<div class=""><?php _e('Enter home Project One description text less then 150 character .','health'); ?><br></div>
			
			<h3><?php _e('Home project one page image Link','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="home_image_one_link" id="home_image_one_link" placeholder="Enter http://example.com"  value="<?php if(isset($current_options['home_image_one_link'])) { echo $current_options['home_image_one_link']; } ?>" >
			<span class="explain"><?php _e('Enter the home project one image link.','health'); ?></span>
			<p><input type="checkbox" id="home_image_one_link_target" name="home_image_one_link_target" <?php if($current_options['home_image_one_link_target']=='on') echo "checked='checked'"; ?> > <?php _e('Open link in a new window/tab','health'); ?></p>
			
		</div>	
		<div class="section">
			<h3><?php _e('Home Project Two','health'); ?></h3>
			<hr>
			<h3><?php _e('Project Two Title','health'); ?></h3>
			<input class="webriti_inpute" type="text" value="<?php if(isset($current_options['project_two_title'])) { echo $current_options['project_two_title']; } ?>" id="project_two_title" name="project_two_title" size="36" />
			<span class="icons help"><span class="tooltip"><?php  _e('Enter Project Title','health');?></span></span>
		
			<h3><?php _e('Project Two Thumbnail','health'); ?><span class="icons help"><span class="tooltip"><?php  _e('Enter Project Thumbnail','health');?></span></span></h3>
			<input class="webriti_inpute"  type="text" name="project_two_thumb" id="project_two_thumb" value="<?php if( isset($current_options['project_two_thumb'])) echo $current_options['project_two_thumb']; ?>" >
			<input type="button" id="upload_button" value="Add Thumb Two" class="upload_image_button" />			
			<?php if(isset($current_options['project_two_thumb'])) { ?>
			<p><img class="webriti_home_slide" src="<?php echo $current_options['project_two_thumb'];  ?>" /></p>
			<?php } ?>
			<h3><?php _e('Project Two Description','health'); ?></h3>
			<textarea rows="5" cols="8" id="project_two_text" name="project_two_text"  class="textbox1"><?php if(isset($current_options['project_two_text'])) { echo esc_attr($current_options['project_two_text']); } ?></textarea>
			<div class=""><?php _e('Enter home Project Two description text less then 150 character .','health'); ?><br></div>
			
			<h3><?php _e('Home project two page image Link','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="home_image_two_link" id="home_image_two_link" placeholder="Enter http://example.com"  value="<?php if(isset($current_options['home_image_two_link'])) { echo $current_options['home_image_two_link']; } ?>" >
			<span class="explain"><?php _e('Enter the home project image two link.','health'); ?></span>
			<p><input type="checkbox" id="home_image_two_link_target" name="home_image_two_link_target" <?php if($current_options['home_image_two_link_target']=='on') echo "checked='checked'"; ?> > <?php _e('Open link in a new window/tab','health'); ?></p>
			
		</div>
		<div class="section">
			<h3><?php _e('Home Project Three','health'); ?></h3>
			<hr>
			<h3><?php _e('Project Three Title','health'); ?></h3>
			<input class="webriti_inpute" type="text" value="<?php if(isset($current_options['project_three_title'])) { echo $current_options['project_three_title']; } ?>" id="project_three_title" name="project_three_title" size="36" />
			<span class="icons help"><span class="tooltip"><?php  _e('Enter Project Title','health');?></span></span>
		
			<h3><?php _e('Project Three Thumbnail','health'); ?><span class="icons help"><span class="tooltip"><?php  _e('Enter Project Thumbnail','health');?></span></span></h3>
			<input class="webriti_inpute"  type="text" name="project_three_thumb" id="project_three_thumb" value="<?php if( isset($current_options['project_three_thumb'])) echo $current_options['project_three_thumb']; ?>" >
			<input type="button" id="upload_button" value="Add Thumb Three" class="upload_image_button" />			
			<?php if(isset($current_options['project_three_thumb'])) { ?>
			<p><img class="webriti_home_slide" src="<?php echo $current_options['project_three_thumb'];  ?>" /></p>
			<?php } ?>
			<h3><?php _e('Project Three Description','health'); ?></h3>
			<textarea rows="5" cols="8" id="project_three_text" name="project_three_text"  class="textbox1"><?php if(isset($current_options['project_three_text'])) { echo esc_attr($current_options['project_three_text']); } ?></textarea>
			<div class=""><?php _e('Enter home Project Three description text less then 150 character .','health'); ?><br></div>
			
			<h3><?php _e('Home project three page image Link','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="home_image_three_link" id="home_image_three_link" placeholder="Enter http://example.com"  value="<?php if(isset($current_options['home_image_three_link'])) { echo $current_options['home_image_three_link']; } ?>" >
			<span class="explain"><?php _e('Enter the home project image three link.','health'); ?></span>
			<p><input type="checkbox" id="home_image_three_link_target" name="home_image_three_link_target" <?php if($current_options['home_image_three_link_target']=='on') echo "checked='checked'"; ?> > <?php _e('Open link in a new window/tab','health'); ?></p>
			
		</div>
		<div class="section">
			<h3><?php _e('Home Project Four','health'); ?></h3>
			<hr>
			<h3><?php _e('Project Four Title','health'); ?></h3>
			<input class="webriti_inpute" type="text" value="<?php if(isset($current_options['project_four_title'])) { echo $current_options['project_four_title']; } ?>" id="project_four_title" name="project_four_title" size="36" />
			<span class="icons help"><span class="tooltip"><?php  _e('Enter Project Title','health');?></span></span>
		
			<h3><?php _e('Project Four Thumbnail','health'); ?><span class="icons help"><span class="tooltip"><?php  _e('Enter Project Thumbnail','health');?></span></span></h3>
			<input class="webriti_inpute"  type="text" name="project_four_thumb" id="project_four_thumb" value="<?php if( isset($current_options['project_four_thumb'])) echo $current_options['project_four_thumb']; ?>" >
			<input type="button" id="upload_button" value="Add Thumb Four" class="upload_image_button" />			
			<?php if(isset($current_options['project_four_thumb'])) { ?>
			<p><img class="webriti_home_slide" src="<?php echo $current_options['project_four_thumb'];  ?>" /></p>
			<?php } ?>
			<h3><?php _e('Project Four Description','health'); ?></h3>
			<textarea rows="5" cols="8" id="project_four_text" name="project_four_text"  class="textbox1"><?php if(isset($current_options['project_four_text'])) { echo esc_attr($current_options['project_four_text']); } ?></textarea>
			<div class=""><?php _e('Enter home Project Four description text less then 150 character .','health'); ?><br></div>
			
			<h3><?php _e('Home project four page image Link','health'); ?></h3>			
			<input class="webriti_inpute"  type="text" name="home_image_four_link" id="home_image_four_link" placeholder="Enter http://example.com"  value="<?php if(isset($current_options['home_image_four_link'])) { echo $current_options['home_image_four_link']; } ?>" >
			<span class="explain"><?php _e('Enter the home project image four link.','health'); ?></span>
			<p><input type="checkbox" id="home_image_four_link_target" name="home_image_four_link_target" <?php if($current_options['home_image_four_link_target']=='on') echo "checked='checked'"; ?> > <?php _e('Open link in a new window/tab','health'); ?></p>
			
		</div>
		
		
		<div id="button_section">
			<input type="hidden" value="1" id="webriti_settings_save_4" name="webriti_settings_save_4" />
			<input class="reset-button btn" type="button" name="reset" value="Restore Defaults" onclick="webriti_option_data_reset('4');">
			<input class="btn btn-primary" type="button" value="Save Options" onclick="webriti_option_data_save('4')" >
		</div>
	</form>
</div>