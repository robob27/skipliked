browser.webNavigation.onHistoryStateUpdated.addListener(({tabId, url}) => {
  setTimeout(() => {
    try {
      browser.tabs.sendMessage(tabId, {action: 'skipLiked', url});
    } catch (e) {}
  }, 5000);
});
