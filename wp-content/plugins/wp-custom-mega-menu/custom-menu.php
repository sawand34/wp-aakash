<?php
function category_level_test($categoty_to_test,$test_of_level){
 //leve test ********************
    $test_for_level = intval($test_of_level);
    $last_level = 0;
    $cat_to_test = $categoty_to_test;
    $category=get_category($cat_to_test);
        for ( $counter = 1; $counter <= $test_for_level; $counter += 1) {
            if ($category->category_parent) {
             $category=get_category($category->category_parent);
            $last_level = $counter;
        }
                }
        $last_level +=1;
    if ($last_level == $test_for_level) {
                     return true;
                    } else {
                             return false;
                    }
//level test  *****************
}
//function category level test ends here
$menu_id = $_POST['menuid'];    
$explode = explode('_', $menu_id);
$current_theme_location = $explode[0];
$current_main_menu = $explode[1];
$locations = get_nav_menu_locations();
$menu_id = $locations[$current_theme_location];
$menu_items = wp_get_nav_menu_items($menu_id);
$prefix = 'knee_' . $menu_id;
$cat_sub = array();
$cat_sub_sub = array();
$c = 0;
$d = 0;
$p = 0;
$pd= 0;
$fd= 0;
$main_menu_ch=array();
foreach ($menu_items as $menu_item) {
    if ($menu_item->menu_item_parent == $current_main_menu) {
        $main_menu_ch[]= $menu_item->object_id;
        $cat_args = array(
            'type' => 'post',
            'child_of' => $menu_item->object_id
        );
        $categories = get_categories($cat_args);
        foreach ($categories as $categorie) {
            if ($categorie->parent == $menu_item->object_id) {
                $cat_sub[$c]['main_id'] = $menu_item->object_id;
                $cat_sub[$c]['name'] = $categorie->name;
                $cat_sub[$c]['slug'] = $categorie->slug;
                $cat_sub[$c]['id'] = $categorie->term_id;
                $c = $c + 1;
                
            }
            else {
                if(category_level_test($categorie->term_id,3)){
                $cat_sub_sub[$d]['main_id'] = $menu_item->object_id;
                $cat_sub_sub[$d]['name'] = $categorie->name;
                $cat_sub_sub[$d]['slug'] = $categorie->slug;
                $cat_sub_sub[$d]['id'] = $categorie->term_id;
                $d = $d + 1;
            }
              if(category_level_test($categorie->term_id,4)){
                 // check for the forth menu
                $cat_forth_sub_sub[$fd]['main_id'] = $menu_item->object_id;
                $cat_forth_sub_sub[$fd]['name'] = $categorie->name;
                $cat_forth_sub_sub[$fd]['slug'] = $categorie->slug;
                $cat_forth_sub_sub[$fd]['id'] = $categorie->term_id;
                $fd = $fd + 1;
              }
              if(category_level_test($categorie->term_id,5)){
                //check for last menu 
                $cat_sub_sub_sub[$pd]['main_id'] = $menu_item->object_id;
                $cat_sub_sub_sub[$pd]['name'] = $categorie->name;
                $cat_sub_sub_sub[$pd]['slug'] = $categorie->slug;
                 $cat_sub_sub_sub[$pd]['id'] = $categorie->term_id;
                $pd = $pd + 1;
                $get_post_array = array(
                    'posts_per_page' => -1,
                    'category' => $menu_item->object_id
                );              
                $posts_array = get_posts($get_post_array);
                {
                    foreach ($posts_array as $post_item) {
                        $post_det[$p]['name'] = $post_item->post_title;
                        // $post_det[$p]['slug']=$post_item->slug;
                        $post_det[$p]['post_name']=$post_item->post_name;
                        $post_det[$p]['main_id']=$menu_item->object_id;
                        $post_det[$p]['post_id']=$post_item->ID;
                        $p = $p + 1;
                    }
                    
                }
              }
              //check for last menu ends here
            }
        } //foreach of category ends here
        //getting only the parent menu
        ?>
    <?php
    }//condition for only child ends here

}//main foreach ends here

//var_dump($cat_sub_sub);
//exit;


?>
<script>taxonomy.<?php echo $prefix; ?> = {
        <?php
           for($i=0;$i<=count($cat_sub)-1;$i++){
    echo '"'.$cat_sub[$i]['slug'].'":[';
    $cat_args = array(
        'type'                     => 'post',
        'child_of'                 => $cat_sub[$i]['id']
    );
    $sub_sub_cats = get_categories( $cat_args );
    foreach($sub_sub_cats as $sub_sub_cat){
        echo '"'.$sub_sub_cat->slug.'",';
    }
    //for the post
    $get_post_arr_sub = array(
                    'posts_per_page' => -1,
                    'category' => $cat_sub[$i]['id']
                );
                $posts_arr = get_posts($get_post_arr_sub);
                {
                    foreach ($posts_arr as $post_item_arr) {
                        echo '"'.$post_item_arr->post_name.'",';
                    }
                }
    echo '"'.$cat_sub[$i]['slug'].'"'.'],';
}
for($i=0;$i<=count($cat_sub_sub)-1;$i++){
    echo '"'.$cat_sub_sub[$i]['slug'].'":[';
//getting sub-sub-sub item in sub-sub start 
    $cat_args_sub_sub = array(
        'type'                     => 'post',
        'child_of'                 => $cat_sub_sub[$i]['id']
    );
    $sub_sub_sub_cats = get_categories( $cat_args_sub_sub );
    foreach($sub_sub_sub_cats as $sub_sub_sub_cat){
        echo '"'.$sub_sub_sub_cat->slug.'",';
    }
//getting sub-sub-sub item in sub-sub ends      
    //for the post
    $get_post_arr_sub = array(
                    'posts_per_page' => -1,
                    'category' => $cat_sub_sub[$i]['id']
                );
                $posts_arr = get_posts($get_post_arr_sub);
                {
                    foreach ($posts_arr as $post_item_arr) {
                        echo '"'.$post_item_arr->post_name.'",';
                    }
                }
    echo '"'.$cat_sub_sub[$i]['slug'].'"'.'],';
}
//post for the forth column start here
for($i=0;$i<=count($cat_forth_sub_sub)-1;$i++){
    echo '"'.$cat_forth_sub_sub[$i]['slug'].'":[';
//getting sub-sub-sub item in sub-sub start 
    $cat_args_sub_sub = array(
        'type'                     => 'post',
        'child_of'                 => $cat_forth_sub_sub[$i]['id']
    );
    $sub_sub_sub_cats = get_categories( $cat_args_sub_sub );
    foreach($sub_sub_sub_cats as $sub_sub_sub_cat){
        echo '"'.$sub_sub_sub_cat->slug.'",';
    }
//getting sub-sub-sub item in sub-sub ends      
    //for the post
    $get_post_arr_sub = array(
                    'posts_per_page' => -1,
                    'category' => $cat_forth_sub_sub[$i]['id']
                );
                $posts_arr = get_posts($get_post_arr_sub);
                {
                    foreach ($posts_arr as $post_item_arr) {
                        echo '"'.$post_item_arr->post_name.'",';
                    }
                }
    echo '"'.$cat_forth_sub_sub[$i]['slug'].'"'.'],';
}
//post for the forth column ends here
//for the sub-sub-sub menu start
for($i=0;$i<=count($cat_sub_sub_sub)-1;$i++){
    echo '"'.$cat_sub_sub_sub[$i]['slug'].'":[';
    //for the post
    $get_post_arr_sub = array(
                    'posts_per_page' => -1,
                    'category' => $cat_sub_sub_sub[$i]['id']
                );
                $posts_arr = get_posts($get_post_arr_sub);
                {
                    foreach ($posts_arr as $post_item_arr) {
                        echo '"'.$post_item_arr->post_name.'",';
                    }
                }
    echo '"'.$cat_sub_sub[$i]['slug'].'"'.'],';
}
//for the sub-sub-sub menu ends
        ?>
    }
</script>
<div data-group="<?php echo $prefix; ?>" id="<?php echo $prefix; ?>-menu" class="group">
<section class="controls">
    <div class="taxonomy-type">
        <p>Find content by:</p>
<a data-view="procedure" href="" class="selected round-medium"
           onClick="ga('send', 'event', 'Megamenu', 'knee','Procedure');">Company</a>
    </div>
    <div class="text-filter">
        <p>Filter menu items by title:</p>
        <input class="filter-search filter-input" type="text" value="" placeholder="Title..."/>
    </div>
    <div class="clearfix well well-small remember-checked">
        <label class="checkbox">
            <input type="checkbox" class="mega-menu-show" name="mega-menu-show"> Keep menu open
        </label>
        <button type="button" class="menu-clear btn btn-mini btn-action">Reset Menu</button>
    </div>
</section>
<section class="filter-container">
    <div class="procedure show filters clearfix">
        <div class="filter-group" style="width: 223px;">
            <span class="directional-arrow"></span>
            <h4>Segment</h4>

            <div class="filter-items nano diagnosis">
                <div class="content">
                    <ul>
                        <?php for ($i = 0; $i < count($cat_sub); $i++) {
                            if($cat_sub[$i]['main_id']==$main_menu_ch[0]):
                                ?>
                                <li class="clearfix " id="<?php echo $cat_sub[$i]['slug']; ?>">
                                    <div class="taxon-wrapper">
                                        <div class="checkbox">
                                            <div id="procedure-1-<?php echo $prefix; ?>-<?php echo $cat_sub[$i]['slug']; ?>">
                                                <span></span>
                                            </div>
                                        </div>
                                        <a href="<?php echo get_category_link($cat_sub[$i]['id']); ?>" onclick="ga('send', 'event', 'Megamenu', 'knee','ACL Tear');">
                                            <?php echo $cat_sub[$i]['name']; ?>
                                        </a>
                                    </div>
                                </li>
                            <?php endif; } ?>
                    </ul>
                    <div class="no-items-msg hide">No items available.</div>
                </div>
            </div>
        </div>
        <div class="filter-group" style="width: 223px;">
            <span class="directional-arrow"></span>
            <h4>Company</h4>

            <div class="filter-items nano procedure">
                <div class="content">
                    <ul>
                        <?php for ($i = 0; $i < count($cat_sub_sub); $i++) {
                            if($cat_sub_sub[$i]['main_id']==$main_menu_ch[0]):
                                ?>
                                <li class="clearfix " id="<?php echo $cat_sub_sub[$i]['slug']; ?>">
                                    <div class="taxon-wrapper">
                                        <div class="checkbox">
                                            <div id="procedure-2-<?php echo $prefix; ?>-<?php echo $cat_sub_sub[$i]['slug']; ?>">
                                                <span></span>
                                            </div>
                                        </div>
                                        <a href="<?php echo get_category_link($cat_sub_sub[$i]['id']); ?>"
                                           onclick="ga('send', 'event', 'Megamenu', 'knee','ACL Reconstruction');">
                                            <?php echo $cat_sub_sub[$i]['name']; ?>
                                        </a>
                                    </div>
                                </li>
                            <?php endif ;} ?>
                    </ul>
                    <div class="no-items-msg hide">No items available.</div>
                </div>
            </div>
        </div>
         <!--forth column start here ---->
        <div class="filter-group" style="width:223px;">
            <span class="directional-arrow"></span>
            <h4>Product Group</h4>

            <div class="filter-items nano procedure">
                <div class="content">
                    <ul>
                        <?php for ($i = 0; $i < count($cat_forth_sub_sub); $i++) {
                            if($cat_forth_sub_sub[$i]['main_id']==$main_menu_ch[0]):
                                ?>
                                <li class="clearfix " id="<?php echo $cat_forth_sub_sub[$i]['slug']; ?>">
                                    <div class="taxon-wrapper">
                                        <div class="checkbox">
                                            <div id="procedure-2-<?php echo $prefix; ?>-<?php echo $cat_forth_sub_sub[$i]['slug']; ?>">
                                                <span></span>
                                            </div>
                                        </div>
                                        <a href="<?php echo get_category_link($cat_forth_sub_sub[$i]['id']); ?>"
                                           onclick="ga('send', 'event', 'Megamenu', 'knee','ACL Reconstruction');">
                                            <?php echo $cat_forth_sub_sub[$i]['name']; ?>
                                        </a>
                                    </div>
                                </li>
                            <?php endif ;} ?>
                    </ul>
                    <div class="no-items-msg hide">No items available.</div>
                </div>
            </div>
        </div>
        <!--- forth column ends here  ---->

        <!--fifth  column start here ---->
        <div class="filter-group" style="width:223px;">
            <span class="directional-arrow"></span>
            <h4>Product Category</h4>

            <div class="filter-items nano procedure">
                <div class="content">
                    <ul>
                        <?php for ($i = 0; $i < count($cat_sub_sub_sub); $i++) {
                            if($cat_sub_sub_sub[$i]['main_id']==$main_menu_ch[0]):
                                ?>
                                <li class="clearfix " id="<?php echo $cat_sub_sub_sub[$i]['slug']; ?>">
                                    <div class="taxon-wrapper">
                                        <div class="checkbox">
                                            <div id="procedure-2-<?php echo $prefix; ?>-<?php echo $cat_sub_sub_sub[$i]['slug']; ?>">
                                                <span></span>
                                            </div>
                                        </div>
                                        <a href="<?php echo get_category_link($cat_sub_sub_sub[$i]['id']); ?>"
                                           onclick="ga('send', 'event', 'Megamenu', 'knee','ACL Reconstruction');">
                                            <?php echo $cat_sub_sub_sub[$i]['name']; ?>
                                        </a>
                                    </div>
                                </li>
                            <?php endif ;} ?>
                    </ul>
                    <div class="no-items-msg hide">No items available.</div>
                </div>
            </div>
        </div>
        <!--- fifth column ends here  ---->
        <div class="filter-group" style="width: 223px;">
            <span class="directional-arrow"></span>
            <h4>Product Family</h4>

            <div class="filter-items nano surgical_technique">
                <div class="content">
                    <ul>
                        <?php
                        if(!empty($post_det)){
                        $post_det = array_map("unserialize", array_unique(array_map("serialize", $post_det)));  
                        }
                        for($pi=0;$pi<count($post_det);$pi++) {
                            if($post_det[$pi]['main_id']==$main_menu_ch[0]):
                              // if($donot_dup !=$post_det[$pi]['post_id']){
                                ?>
                                <li class="clearfix new-one" id="<?php echo $post_det[$pi]['post_name']; ?>">
                                    <div class="taxon-wrapper">
                                        <div class="bullet"><span></span></div>
                                        <a href="<?php echo  get_permalink($post_det[$pi]['post_id']); ?>"
                                           onclick="ga('send', 'event', 'Megamenu', 'knee','ACL BTB Graft Fixation');">
                                            <?php echo $post_det[$pi]['name']; ?></a>
                                    </div>
                                </li>
                            <?php 
                                //}
                                //echo $donot_dup = $post_det[$pi]['post_id'] ;
                            endif;
                        } ?>



                    </ul>
                    <div class="no-items-msg hide">No items available.</div>
                </div>
            </div>
        </div>
        
    </div>
    
</section>
<footer class="megamenu-footer">
    <h4>Knee Quick Links</h4>
    <ul>
        <li><a class="home" href="/knee" onclick="ga('send', 'event', 'Megamenu', 'knee','All Knee');"><i
                    class='a-icon-menu-home'></i><span>All Knee</span></a></li>
        <li><a class="news" href="/whats-new-at-arthrex/knee"
               onclick="ga('send', 'event', 'Megamenu', 'knee','What's New in Knee');"><i
                    class='a-icon-menu-news'></i><span>What's New in Knee</span></a></li>
        <li><a class="events" href="/calendar/knee"
               onclick="ga('send', 'event', 'Megamenu', 'knee','Events Calendar');"><i
                    class='a-icon-menu-events'></i><span>Events Calendar</span></a></li>
        <li><a class="resources" href="/knee"
               onclick="ga('send', 'event', 'Megamenu', 'knee','Educational Resources');"><i
                    class='a-icon-menu-resources'></i><span>Educational Resources</span></a></li>
        <li><a class="products" href="/knee/products" onclick="ga('send', 'event', 'Megamenu', 'knee','Products');"><i
                    class='a-icon-menu-products'></i><span>Products</span></a></li>
        <li><a class="science" href="/knee/related-science"
               onclick="ga('send', 'event', 'Megamenu', 'knee','Related Science');"><i
                    class='a-icon-menu-science'></i><span>Related Science</span></a></li>
    </ul>
    <button type="button" class="close">&times;</button>
</footer>
</div> <!-- group -->