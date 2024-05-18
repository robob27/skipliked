const DEFAULT_CHECK_DELAY = 3000;
const DEFAULT_SKIP_DELAY = 5000;

function init() {
  const startDelay = document.getElementById('startDelay');
  const skipDelay = document.getElementById('skipDelay');

  startDelay.addEventListener('click', () => {
    startDelay.select();
  });
  skipDelay.addEventListener('click', () => {
    skipDelay.select();
  });

  browser.storage.sync.get(['startDelay', 'skipDelay'], (items) => {
    startDelay.value = items.startDelay || DEFAULT_CHECK_DELAY;
    skipDelay.value = items.skipDelay || DEFAULT_SKIP_DELAY;
  });

  // save the values when the form is submitted
  document.getElementById('optionsForm').addEventListener('submit', (e) => {
    e.preventDefault();

    if (isNaN(parseInt(startDelay.value, 10))) {
      startDelay.value = DEFAULT_CHECK_DELAY;
    }

    if (isNaN(parseInt(skipDelay.value, 10))) {
      skipDelay.value = DEFAULT_SKIP_DELAY;
    }

    browser.storage.sync.set({
      startDelay: startDelay.value,
      skipDelay: skipDelay.value
    }, () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    });
  });

}

let domReady = setInterval(() => {
  if (document.readyState === 'complete') {
    clearInterval(domReady);
    init();
  }
}, 100);
