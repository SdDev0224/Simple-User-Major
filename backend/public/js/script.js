jQuery(document).ready(function(){
    jQuery('.btn_update').on('click', function(){
        var user_id = jQuery(this).attr('id').substr(4);
        jQuery('#updateuserform' + user_id).show();
    });
});