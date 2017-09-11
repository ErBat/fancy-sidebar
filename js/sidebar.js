//Function that manages closing menu and sub-menus
function menuManager(that) {
  //some local variables
  var body = $("body");
  var sideMenu = $(".side-menu");
  //check if screen is smaller than menu and sub-menu combined
  var smallScreen = ($(".current").width() + $(".side-menu-items").width()) > $( window ).width();

  //helper-functions
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

  //if clicked is browse-items
  if(that.is(".items-browse") && $(".side-menu-open")[0]){
    toggleMainMenu();
  }

  //if clicked is item
  if(that.is(".item")){
    var itembyID = $("." + that.attr("id"));
    //if current item is open, do nothing, if yes check if some other item is open and close it
    if(itembyID.is(".current") == false){
      //check each sub-menu and close if it's open
      $('.menu-sub').each(function(){
        var that = $(this);
        if (that.is('.current')) {
          that.toggleClass("show");
          setTimeout(function(){that.toggleClass("current");}, 300);
        }
      });
      //open current item
      itembyID.toggleClass("show current");
      setTimeout(function(){
        if(($(".current").width() + $(".side-menu-items").width()) > $( window ).width()){
          sideMenu.toggleClass("hidden-main")
        }
      }, 300);
    }
  }

  //if clicked is the close button is in the sub-menu - show the
  //main menu if it's hidden and close the sub-menu
  if (that.parent().is('.current')) {
    //if the main menu is hidden, show it again
    if($(".hidden-main")[0]){
      sideMenu.toggleClass("hidden-main")
    }
    //close the sub-menu
    that.parent().toggleClass("current show");
  }

  //if clicked is the close button is in the main menu - close all
  //sub-menus and show main menu if hidden
  if (that.parent().is('.side-menu-wrap')){
    toggleMainMenu();
  }
}

$( document ).ready(function() {

  //clicked outside Menu
  $(".items-browse").click(function() {
    var that = $(this);
    menuManager(that);
  });

  //close button is clicked
  $(".closebtn").click(function() {
    var that = $(this);
    menuManager(that);
  });

  //item is clicked
  $(".item").click(function() {
    var that = $(this);
    menuManager(that);
  });
});
