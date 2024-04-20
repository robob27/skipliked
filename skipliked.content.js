let skipTimeout;

function skipLikedVideos(url) {
  const liked = document.querySelector('[title="Unlike"]');

  if (liked) {
    skipTimeout = setTimeout(function() {
      if (window.location.href !== url) {
        return;
      }

      document.getElementsByClassName('style-scope ytd-compact-video-renderer')[0].getElementsByTagName('a')[0].click();
    }, 5000);
  }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'skipLiked') {
    clearTimeout(skipTimeout);
    skipLikedVideos(message.url);
  }
});

skipTimeout = setTimeout(() => {
  skipLikedVideos(window.location.href);
}, 5000);
