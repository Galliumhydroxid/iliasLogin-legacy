/// script to go through the ilias and campus pages

//Original by phillip > https://addons.mozilla.org/de/firefox/addon/iliaslogin/
//Just a quick fix for Ilias 7, very dirty, don't know anything about javascript :)

if (window.location.href.indexOf("ilias.studium.kit.edu/login") > -1) {
  console.log("TestSimple URL detected");
  //clickButtonById('f807');
  clickButtonById('button_shib_login');
} else if (window.location.href.indexOf("campus.studium.kit.edu") > -1) {
  console.log("Campus URL detected");
  setTimeout(function () { clickButtonByClass('shib-login shib-button'); }, 100); //
} else if (window.location.href.indexOf("idp.scc.kit.edu") > -1) {
  // Careful, here chrome doesn't load the passwords in properly (Not exactly clear why)
  // Before clicking on submit, we will use a trick and click on some text beforehand.

  // only text, not an actual button. Index = 1 because with Index = 0 
  // is a class with a button in it which we do not want to click on
  clickButtonByClass('text full', 1);
  
  clickButtonById('sbmt'); // the actual button
} else if (detectMoreComplexUrl()) {
  console.log("Complex URL detected");
 /// clickButtonByClass('btn btn-bulky',2);
  clickListElement("il-maincontrols-metabar", 2)
} else if (window.location.href.toLowerCase().indexOf("https://ilias.studium.kit.edu/login.php?client_id=produktiv&cmd=force_login&lang=") > -1) {
    console.log("New login page")
	clickButtonById('button_shib_login');
  } else if (window.location.href.indexOf("https://ilias.studium.kit.edu/login.php?target=root_1&client_id=produktiv&cmd=force_login&lang=de") > -1) {
  console.log("Button Page URL detected");
  clickButtonById("button_shib_login");
  console.log("Clicked Button");
 // clickButtonByClass('btn btn-bulky',2);
  //clickListElement("il-maincontrols-metabar", 2)
  } else if (window.location.href.indexOf("https://ilias.studium.kit.edu/ilias.php?ref_id=1&cmdClass=ilrepositorygui&cmdNode=wx&baseClass=ilRepositoryGUI") > -1) {
  window.location.replace("https://ilias.studium.kit.edu/ilias.php?baseClass=ilDashboardGUI&cmd=jumpToMemberships");
  } else if (window.location.href.indexOf("https://www.google.com/intl/de_de/chrome/") > -1) {
  console.log("Strange Website detected. Use Firefox!");
  } else if (window.location.href.indexOf("https://www.mozilla.org/de/firefox/new/?redirect_source=firefox-com") > -1) {
  console.log("Firefox site detected");
  clickButtonByClass('mzp-c-sticky-promo-close', 0);
  
  }   

function detectMoreComplexUrl() {
  // return false for an URL to a forum Link
  if (window.location.href.toLowerCase().indexOf("https://ilias.studium.kit.edu/ilias.php?baseclass=ilrepositorygui&cmd=viewthread") > -1) {
    console.log("Forum Link detected, IliasLogin not executing because you should already be logged in.")
    return false
  }

  // return true for any other URL which links to Magazin but is not a forum URL. If you are already logged in, the login Button is not there so it won't fire
  if (window.location.href.toLowerCase().indexOf("https://ilias.studium.kit.edu/ilias.php?baseclass=ilrepositorygui") > -1) {
    console.log("Magazin URL detected, Extensions firering")
    return true
  }
}	

function clickButtonById(id) {
  document.getElementById(id).click();
  console.log("button clicked");
}

function clickButtonByClass(className, index = 0) {
  var shibButton = document.getElementsByClassName(className)[index];
  console.log("button about to be clicked: " + shibButton);
  shibButton.click();
  console.log("button clicked");
}
function clickListElement(listClass, elementNumber) {
  console.log("Checking URL")
  let loginButton = document.querySelector(".il-maincontrols-metabar > li:nth-child(3) > a");
  if (!loginButton) { return; }
  if (!loginButton.href.includes("force_login")) { return; }
  console.log("Replacing URL")   
//}, 100);
  
  //tagNameListElement = "li"
  //urlElement = "a"
  ///var listElement = document.getElementByClassName(listClass).getElementsByTagName(tagNameListElement)[elementNumber].getElementsByTagName(urlElement)[0]
  //console.log("listElement URL: " + listElement + " about to be clicked")
  //listElement.click()
  console.log("listElement URL clicked on")
}
