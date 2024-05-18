const DEFAULT_SKIP_DELAY = 5000;
let skipTimeout;
let skipDelay;

browser.storage.sync.get('skipDelay').then(({skipDelay: delay}) => {
  let newValue = parseInt(delay, 10);

  if (isNaN(newValue)) {
    newValue = DEFAULT_SKIP_DELAY;
  }

  skipDelay = newValue;
});

browser.storage.onChanged.addListener((changes) => {
  if (changes.skipDelay) {
    let newValue = parseInt(changes.skipDelay.newValue, 10);

    if (isNaN(newValue)) {
      newValue = DEFAULT_SKIP_DELAY;
    }

    skipDelay = newValue;
  }
});

function skipLikedVideos(url) {
  const liked = document.querySelector('[title="Unlike"]');

  if (liked) {
    const button = document.createElement('button');
    button.style.position = 'absolute';
    button.style.top = '0';
    button.style.left = '0';
    button.style.zIndex = '9999';
    button.style.padding = '5px';
    button.style.backgroundColor = 'red';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.onclick = function() {
      clearTimeout(skipTimeout);
      button.remove();
    };

    let countdown = Math.floor(skipDelay / 1000);
    button.textContent = `Don't skip (${countdown})`;
    const interval = setInterval(function() {
      countdown--;
      button.textContent = `Don't skip (${countdown})`;

      if (countdown === 0) {
        clearInterval(interval);
      }
    }, 1000);

    document.body.appendChild(button);

    skipTimeout = setTimeout(function() {
      if (window.location.href !== url) {
        return;
      }

      clearInterval(interval);

      if (button) {
        button.remove();
      }

      // click the video up next in autoplay
      document.getElementsByClassName('style-scope ytd-compact-video-renderer')[0].getElementsByTagName('a')[0].click();
    }, skipDelay);
  }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'skipLiked') {
    clearTimeout(skipTimeout);
    skipLikedVideos(message.url);
  }
});
