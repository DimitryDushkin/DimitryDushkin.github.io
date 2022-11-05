const exposed = {};

function tweet_(url) {
  open(
    "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url),
    "_blank"
  );
}
function tweet(anchor) {
  tweet_(anchor.getAttribute("href"));
}
expose("tweet", tweet);

function share(anchor) {
  var url = anchor.getAttribute("href");
  event.preventDefault();
  if (navigator.share) {
    navigator.share({
      url: url,
    });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url);
    message("Article URL copied to clipboard.");
  } else {
    tweet_(url);
  }
}
expose("share", share);

function message(msg) {
  var dialog = document.getElementById("message");
  dialog.textContent = msg;
  dialog.setAttribute("open", "");
  setTimeout(function () {
    dialog.removeAttribute("open");
  }, 3000);
}

function prefetch(e) {
  if (e.target.tagName != "A") {
    return;
  }
  if (e.target.origin != location.origin) {
    return;
  }
  /**
   * Return the given url with no fragment
   * @param {string} url potentially containing a fragment
   * @return {string} url without fragment
   */
  const removeUrlFragment = (url) => url.split("#")[0];
  if (
    removeUrlFragment(window.location.href) === removeUrlFragment(e.target.href)
  ) {
    return;
  }
  var l = document.createElement("link");
  l.rel = "prefetch";
  l.href = e.target.href;
  document.head.appendChild(l);
}
document.documentElement.addEventListener("mouseover", prefetch, {
  capture: true,
  passive: true,
});
document.documentElement.addEventListener("touchstart", prefetch, {
  capture: true,
  passive: true,
});

/**
 * Injects a script into document.head
 * @param {string} src path of script to be injected in <head>
 * @return {Promise} Promise object that resolves on script load event
 */
const dynamicScriptInject = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    document.head.appendChild(script);
    script.addEventListener("load", () => {
      resolve(script);
    });
  });
};

// Script web-vitals.js will be injected dynamically if user opts-in to sending CWV data.
const sendWebVitals = document.currentScript.getAttribute("data-cwv-src");

if (/web-vitals.js/.test(sendWebVitals)) {
  dynamicScriptInject(`${window.location.origin}/js/web-vitals.js`)
    .then(() => {
      webVitals.getCLS(sendToGoogleAnalytics);
      webVitals.getFID(sendToGoogleAnalytics);
      webVitals.getLCP(sendToGoogleAnalytics);
    })
    .catch((error) => {
      console.error(error);
    });
}

addEventListener(
  "click",
  function (e) {
    var button = e.target.closest("button");
    if (!button) {
      return;
    }
    ga("send", {
      hitType: "event",
      eventCategory: "button",
      eventAction: button.getAttribute("aria-label") || button.textContent,
    });
  },
  true
);
var selectionTimeout;
addEventListener(
  "selectionchange",
  function () {
    clearTimeout(selectionTimeout);
    var text = String(document.getSelection()).trim();
    if (text.split(/[\s\n\r]+/).length < 3) {
      return;
    }
    selectionTimeout = setTimeout(function () {
      ga("send", {
        hitType: "event",
        eventCategory: "selection",
        eventAction: text,
      });
    }, 2000);
  },
  true
);

function expose(name, fn) {
  exposed[name] = fn;
}

addEventListener("click", (e) => {
  const handler = e.target.closest("[on-click]");
  if (!handler) {
    return;
  }
  e.preventDefault();
  const name = handler.getAttribute("on-click");
  const fn = exposed[name];
  if (!fn) {
    throw new Error("Unknown handler" + name);
  }
  fn(handler);
});

function removeBlurredImage(img) {
  // Ensure the browser doesn't try to draw the placeholder when the real image is present.
  img.style.backgroundImage = "none";
}
document.body.addEventListener(
  "load",
  (e) => {
    if (e.target.tagName != "IMG") {
      return;
    }
    removeBlurredImage(e.target);
  },
  /* capture */ "true"
);
for (let img of document.querySelectorAll("img")) {
  if (img.complete) {
    removeBlurredImage(img);
  }
}
