//When page is loaded
$( document ).ready(function() {
  //some local variables
  var body = $("body");
  var sideMenu = $(".side-menu");
  var windowWidth = $( window ).width();
  var windowHeight = $( window ).height();
  var current = $("li.current");
  //check if mobile
  var mobile = windowWidth < 960 || windowHeight < 600;

  //color the 'current-item-shadow'
  (function colorShadow(){
    var color = current.css('backgroundColor');
    $(".current-item-shadow").css('backgroundColor', color);
  })();

  //Function that manages closing menu and sub-menus
  function menuManager(that, e) {

    //helper-functions

    function removeActive(){
      $('.side-menu-items li').removeClass('active');
    }

    function removeCurrent(){
      current.removeClass("current");
    }

    function addCurrent(){
      if(current.is('.active')){
        current.addClass("current");
      } else {
        setTimeout(function(){current.addClass("current");}, 400);
      }
    }

    function toggleActive(thatItem, thatEvent, itembyID){
      if(thatItem.is(".item") && thatEvent != null){
        if(!thatItem.hasClass('active') && itembyID[0]){
          if(current.is(".current")){
            removeCurrent();
          }
          removeActive();
          thatItem.addClass('active');
          thatEvent.preventDefault();
        } else {
            return true;
        }
      } else removeActive();
    }

    //check each sub-menu and close if it's open
    function closeSubMenus(){
     $('.menu-sub').each(function(){
       var that = $(this);
       if (that.is('.current')) {
         that.toggleClass("show");
         setTimeout(function(){that.toggleClass("current");}, 300);
       }
     });
    }

    //open/close Side Menu(DUH)
    function toggleSideMenu(itembyID){
      //if current item is open, do nothing, if yes check if some other item is open and close it
      if(itembyID.is(".current") == false){
        closeSubMenus();
        //open current item
        itembyID.toggleClass("show current");
        setTimeout(function(){
          if(($(".current").width() + $(".side-menu-items").width()) > $( window ).width()){
            sideMenu.toggleClass("hidden-main")
          }
        }, 300);
      }
    }

    //open/close Main Menu(DUH)
    function toggleMainMenu(){
      //check if sub-menu is open and if not, just close the main menu
      if($(".show")[0]){
        //if the main menu is hidden, show it again
        if($(".hidden-main")[0]){
          sideMenu.toggleClass("hidden-main")
        }
        //close the sub-menu
        $(".show").toggleClass("show current");
        //close the main menu after 300ms
        setTimeout(function(){
          body.toggleClass("side-menu-open");
        }, 300);
      } else body.toggleClass("side-menu-open");
    }

    //if clicked outside Menu on page-category page - close menu if it's open
    //if clicked is the close button is in the main menu - close all
    //sub-menus and show main menu if hidden
    if(that.is("#main-content") || that.parent().is('.side-menu-wrap')){
      addCurrent();
      removeActive();
      toggleMainMenu();
    }

    //if clicked is item
    if(that.is(".item")){
      var itembyID = $("." + that.attr("id"));
      toggleActive(that, e, itembyID);
      if(!$(".side-menu-open")[0]){
        body.toggleClass("side-menu-open");
        setTimeout(function(){toggleSideMenu(itembyID);}, 300);
      } else toggleSideMenu(itembyID);

    }

    //if clicked is the close button is in the sub-menu - show the
    //main menu if it's hidden and close the sub-menu
    if (that.is(".closebtn") && that.parent().is('.current')) {
      if(current[0]){
        addCurrent();
      }
      removeActive();
      if($(".page-category")[0] && !mobile){
          toggleMainMenu();
      } else {
        //if the main menu is hidden, show it again
        if($(".hidden-main")[0]){
          sideMenu.toggleClass("hidden-main")
        }
        //close the sub-menu
        that.parent().toggleClass("current show");
      }
    }

  }

  //close main menu if mobile
  if($( window ).width() > 980 && $(".side-menu-open").length === 0 && $(".page-category").length === 0) {
    $("body").toggleClass("side-menu-open");
  }

  //clicked outside Menu on items browsing page
  $("#main-content").click(function() {
    if($(".side-menu-open")[0] && $(".page-category")[0]){
      var that = $(this);
      menuManager(that);
    }
  });

  $(".current-item-shadow").click(function(){
    var that = current;
    menuManager(that);
  });

  //close button is clicked
  $(".closebtn").click(function() {
    var that = $(this);
    menuManager(that);
  });

  //item link is clicked
  $(".side-menu-items li a").click(function(e){
    var that = $(this).parent();
    menuManager(that, e);
  });

});
