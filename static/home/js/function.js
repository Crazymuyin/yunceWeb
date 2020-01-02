jQuery(document).ready(function(e){
    $('#public_number').hover(function() {
        $('.public-code').css('display', 'block')
    }, function() {
        $('.public-code').hide()
    })
});
