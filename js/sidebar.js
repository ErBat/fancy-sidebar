if ($(window).width() > 980) {
 $("body").addClass("side-menu-open");
}

$( document ).ready(function() {
  $(".closebtn").click(function() {
      if ($(this).parent().is('.current')) {
        if(($(".current").width() + $(".side-menu-items").width()) > $( window ).width()){
          $(".side-menu").toggleClass("hidden-main")
        }
        $(this).parent().toggleClass("current show");
      }
      else{
        if($(".show").is(".current")){
          if(($(".current").width() + $(".side-menu-items").width()) > $( window ).width()){
            $(".side-menu").toggleClass("hidden-main")
          }
          $(".show").toggleClass("show current");    
          setTimeout(function(){
            $("body").toggleClass("side-menu-open");
          }, 300);
        } else $("body").toggleClass("side-menu-open");
      }
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
        setTimeout(function(){
          if(($(".current").width() + $(".side-menu-items").width()) > $( window ).width()){
            $(".side-menu").toggleClass("hidden-main")
          }
        }, 300);
      }
  });
});
