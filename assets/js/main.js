var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf(".com") + 1);

function changeLinks() {
  const links = document.getElementsByClassName("index-black");
  const logo_element = document.getElementById("logo-mark");
  if (sPage === "/") {
    for (i = 0; i < links.length; i++) {
      links[i].style.color = "#000";
    }
    logo_element.src = "/images/onestepgps_color_logotype.svg";
  }
}
//Scroll fade in script
var animateHTML = function () {
  var elements;
  var windowHeight;

  function init() {
    elements = document.querySelectorAll(".hidden");
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;

      if (positionFromTop - windowHeight <= 0) {
        element.classList.add("fade-in-element");
        element.classList.remove("hidden");
      }
    }
  }

  window.addEventListener("scroll", checkPosition, {
    capture: true,
    passive: true,
  });
  window.addEventListener("resize", init, { capture: true, passive: true });

  init();
  checkPosition();
};

//handles the changes to the navbar on scroll
window.addEventListener(
  "scroll",
  function () {
    var navbar = document.getElementById("myTopnav");
    var navbarTop = navbar.offsetTop;
    var appearLinks = document.getElementsByClassName(
      "main-page-scroll-appear"
    );
    var disappearLinks = document.getElementsByClassName(
      "main-page-scroll-disappear"
    );
    var topNav = document.getElementById("myTopnav");
    var navIcon = document.getElementById("nav-icon");
    var links = document.getElementsByClassName("index-black");
    var headerdiv = document.getElementById("headerReviewDiv");
    const logo_element = document.getElementById("logo-mark");

    //if we scroll down we make the navbar transparent
    if (window.pageYOffset <= navbarTop) {
      navbar.style.backgroundColor = "transparent";
      navbar.style.boxShadow = "none";

      //logo and favicon are turned white
      if (sPage !== "/") {
        logo_element.src = "/images/onestepgps_white_logotype.svg";
        navIcon.style.color = "#ffffff";
      }

      //handles logic for scrolling on the main page on large screens
      if (sPage === "/" && window.screen.width >= 1366) {
        for (i = 0; i < appearLinks.length; i++) {
          appearLinks[i].style.setProperty("display", "none", "important");
        }
        for (i = 0; i < disappearLinks.length; i++) {
          disappearLinks[i].style.setProperty("display", "block", "important");
        }
        if (window.screen.height >= 720) {
          headerdiv.style.setProperty("display", "block", "important");
        }
      } else if (window.screen.width >= 1366) {
        if (window.screen.height >= 720) {
          headerdiv.style.setProperty("display", "block", "important");
        }
        for (i = 0; i < links.length; i++) {
          links[i].style.color = "#fff";
        }
      }
    } else {
      if (sPage !== "/") {
        logo_element.src = "/images/onestepgps_color_logotype.svg";
      }

      navbar.style.backgroundColor = "white";
      if (!topNav.classList.contains("responsive")) {
        navbar.style.boxShadow = "0px 4px 8px 0px rgba(0,0,0,0.2)";
      }

      if (sPage === "/" && window.screen.width >= 1366) {
        for (i = 0; i < appearLinks.length; i++) {
          appearLinks[i].style.setProperty("display", "block", "important");
        }
        for (i = 0; i < disappearLinks.length; i++) {
          disappearLinks[i].style.setProperty("display", "none", "important");
        }
        if (window.screen.height >= 720) {
          headerdiv.style.setProperty("display", "none", "important");
        }
      } else {
        for (i = 0; i < links.length; i++) {
          links[i].style.color = "#000";
        }
        headerdiv.style.setProperty("display", "none", "important");
      }
    }
  },
  { capture: true, passive: true }
);

//bouncing Chatra bubble implementation
//if they already clicked the chat/close button we stop the bouncing
if (!localStorage.getItem("already_clicked_chatra")) {
  //create a mutation observer to see when the chatra element is added to the page
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const added_nodes = Array.from(mutation.addedNodes);
        const chatra_element = added_nodes.find((node) => node.id === "chatra");
        if (chatra_element) {
          chatra_element.classList.add("bounce");

          //chatra is an iframe, so we can't listen to clicks to set the local storage key and remove the bounce,
          //below is a workaround that checks it they click the chatra iframe using a blur event
          window.focus();
          window.addEventListener(
            "blur",
            () => {
              setTimeout(() => {
                if (document.activeElement.tagName === "IFRAME") {
                  //set localstorage key and remove bounce class, see main.js
                  localStorage.setItem("already_clicked_chatra", "true");
                  document.getElementById("chatra").classList.remove("bounce");
                }
              });
            },
            { once: true }
          );

          observer.disconnect();
        }
      }
    }
  });

  //initialize observer
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  //give observer a max of 10 seconds
  setTimeout(() => {
    observer.disconnect();
  }, 10000);
}



// function hideMockChatraOnLoad() {
//   // Function to hide the "mock-chatra" element if the real "chatra" element is present in the DOM
//   function hideMockChatra() {
//     let real_chatra_element = document.getElementById("chatra")
//     let mock_chatra_element = document.getElementById("mock-chatra");
//     if (real_chatra_element && mock_chatra_element) {
//       mock_chatra_element.style.display = "none";
//     }
//   }
//
//   // Callback function for the MutationObserver
//   function mutationCallback(mutationsList, observer) {
//     for (const mutation of mutationsList) {
//       if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
//         // Check if the "chatra" element is added
//         if (document.getElementById("chatra")) {
//           // If "chatra" element is found, hide the "mock-chatra" element
//           hideMockChatra();
//           // Disconnect the observer since we no longer need it
//           observer.disconnect();
//         }
//       }
//     }
//   }
//
//   // Configuration for the MutationObserver
//   const config = { childList: true, subtree: true };
//
//   // Create the MutationObserver with the callback function
//   const observer = new MutationObserver(mutationCallback);
//
//   // Start observing
//   observer.observe(document.documentElement, config);
//
//   // Initially check for "chatra" element and hide "mock-chatra" if it's already there
//   hideMockChatra();
// }
// hideMockChatraOnLoad();

// openChatra will open the chatra, if the user has not enabled cookies, then it will prompt them to do so
function openChatra(event) {
  event.preventDefault();
  // open chatra if it exists
  if (window.Chatra) {
    Chatra("openChat", true);
    return false;
  }

  // //otherwise prompt them to enable cookies
  // const chatra_cookie_prompt = document.getElementById("chatra-cookie-prompt");
  // chatra_cookie_prompt.style.display = "flex";
  // return false;
}


// Add a listener to all chat buttons to open chatra when clicked
window.addEventListener("load", () => {
  const chat_buttons = document.querySelectorAll(".chat-button");
  chat_buttons.forEach((element) => {
    element.addEventListener("click", (evt) => openChatra(evt));
  });

  // Get the current time in the 'America/Los_Angeles' time zone
  const current_time_string = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour12: false,
  });
  // Extract the hour part as an integer
  const current_hour = parseInt(current_time_string.split(":")[0], 10);
  // if we're not between 5am pst and 5pm pst,
  // we update the mock chatra text to say leave a message
  if (current_hour < 5 || current_hour > 16) {
    const mock_chatra_bullet_icon = document.getElementById(
        "mock-chatra-bullet-icon"
    );
    if (mock_chatra_bullet_icon) {
      mock_chatra_bullet_icon.style.backgroundColor = "#1e73be";
    }
    const mock_chatra_text = document.getElementById("mock-chatra-text");
    if (mock_chatra_text) {
      mock_chatra_text.innerHTML = "Hi, Leave us a message!";
    }
  }
});
