<?php
function theme_data_setup()
{	$defailt_image = WEBRITI_TEMPLATE_DIR_URI .'/images/slide1.png';
	$project_img = WEBRITI_TEMPLATE_DIR_URI .'/images/project_thumb.png';
	return $health_center_theme_options=array(
			//Static Front-Page
			'front_page' => 'on',
			//Logo and Fevicon header			
			'upload_image_logo'=>'',
			'height'=>'50',
			'width'=>'150',
			'hc_texttitle'=>'on',
			'upload_image_favicon'=>'',
			'home_page_image'=>$defailt_image,
			//'home_service_enabled' => 'on',
			'service_title'=>'Awesome Services',
			'service_description' =>'Lorem ipsum dolor sit amet, consectetuer adipiscing elit lorem ipsum dolor sit amet.',
			
			'service_one_icon'=>'fa-wheelchair',
			'service_one_title'=>'Medical Guidance',
			'service_one_description' =>'Lorem ipsum dolor sit amet, consectetur adipricies sem Unlimited ColorsCras pulvin, maurisoicituding adipiscing, Lorem ipsum dolor sit amet, consect adipiscing elit, sed diam nonummy nibh euis udin',
			'home_service_one_link' => '#',
			'home_service_one_link_target' => "on",
			
			'service_two_icon'=>'fa-medkit',
			'service_two_title'=>'Emergency Help',
			'service_two_description' =>'Lorem ipsum dolor sit amet, consectetur adipricies sem Unlimited ColorsCras pulvin, maurisoicituding adipiscing, Lorem ipsum dolor sit amet, consect adipiscing elit, sed diam nonummy nibh euis udin',
			'home_service_two_link' => '#',
			'home_service_two_link_target' => "on",
			
			'service_third_icon'=>'fa-ambulance',
			'service_third_title'=>'Cardio Monitoring',
			'service_third_description' =>'Lorem ipsum dolor sit amet, consectetur adipricies sem Unlimited ColorsCras pulvin, maurisoicituding adipiscing, Lorem ipsum dolor sit amet, consect adipiscing elit, sed diam nonummy nibh euis udin',
			'home_service_third_link' => '#',
			'home_service_third_link_target' => "on",
			
			'service_four_icon'=>'fa-user-md',
			'service_four_title'=>'Medical Treatments',
			'service_four_description' =>'Lorem ipsum dolor sit amet, consectetur adipricies sem Unlimited ColorsCras pulvin, maurisoicituding adipiscing, Lorem ipsum dolor sit amet, consect adipiscing elit, sed diam nonummy nibh euis udin',
			'home_service_fourth_link' => '#',
			'home_service_fourth_link_target' => "on",
			//Projects Sections
			'home_projects_enabled' => 'on',
			'project_heading_one' => 'Featured Portfolio Projects',
			'project_tagline' => 'Maecenas sit amet tincidunt elit. Pellentesque habitant morbi tristique senectus et netus et Nulla facilisi.',
			'project_one_thumb' => $project_img,
			'project_one_title' => 'Lorem Ipsum',
			'project_one_text' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ',
			'home_image_one_link'=>"#",
			'home_image_one_link_target'=>"on",
		
		    'project_two_thumb' => $project_img,
			'project_two_title' => 'Postao je popularan',
			'project_two_text' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ',
			'home_image_two_link'=>"#",
			'home_image_two_link_target'=>"on",
			
			'project_three_thumb' => $project_img,
			'project_three_title' => 'kojekakve promjene s',
			'project_three_text' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ',
			'home_image_three_link'=>"#",
			'home_image_three_link_target'=>"on",
			
			'project_four_thumb' => $project_img,
			'project_four_title' => 'kojekakve promjene s',
			'project_four_text' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ',
			'home_image_four_link'=>"#",
			'home_image_four_link_target'=>"on",
			
			'webrit_custom_css'=>'',			
			'footer_customizations' => ' @ 2014 Health Center. All Rights Reserved. Powered by',
			'created_by_text' => 'Created by',
			'created_by_webriti_text' => 'Webriti',
			'created_by_link' => 'http://www.webriti.com'
	);
}
?>