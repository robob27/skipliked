const DEFAULT_START_DELAY = 3000;
let navTimeout;
let startDelay;

browser.storage.sync.get('startDelay').then(({startDelay: delay}) => {
  let newValue = parseInt(delay, 10);

  if (isNaN(newValue)) {
    newValue = DEFAULT_START_DELAY;
  }

  startDelay = newValue;
});

browser.storage.onChanged.addListener((changes) => {
  if (changes.startDelay) {
    let newValue = parseInt(changes.startDelay.newValue, 10);

    if (isNaN(newValue)) {
      newValue = DEFAULT_START_DELAY;
    }

    startDelay = newValue;
  }
});

browser.webNavigation.onHistoryStateUpdated.addListener(({tabId, url}) => {
  clearTimeout(navTimeout);
  if (!url.includes('/watch?v=')) {
    return;
  }

  navTimeout = setTimeout(() => {
    try {
      browser.tabs.sendMessage(tabId, {action: 'skipLiked', url});
    } catch (e) {}
  }, startDelay);
});
