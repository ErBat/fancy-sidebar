$(".closebtn").click(function() {
    if ($(this).parent().is('.current')) {
      $(this).parent().toggleClass("current show");
    }
    else{
      if($(".show").is(".current")){
        $(".show").toggleClass("show current");
        setTimeout(function(){
          $("body").toggleClass("side-menu-open");
        }, 300);
      } else $("body").toggleClass("side-menu-open");
    }
});

$(".navbar-toggle").click(function(){
  $("body").toggleClass("side-menu-open");
});

$(".item").click(function() {
    if($("." + $(this).attr("id")).is(".current") == false){
      $('.menu-sub').each(function(){
        var that = $(this);
        if (that.is('.current')) {
          that.toggleClass("show");
          setTimeout(function(){that.toggleClass("current");}, 300);
        }
      });
      $("." + $(this).attr("id")).toggleClass("show current");
    }
});

$(document).ready(function(){
	$('#nav-icon').click(function(){
		$(this).toggleClass('open');
	});
});
