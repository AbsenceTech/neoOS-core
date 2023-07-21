function loadScript(src, options = {}) {
  const { timeout = 10000, onLoad, onError } = options;

  const script = document.createElement('script');
  script.src = src;
  script.async = true;

  let isLoaded = false;
  let isErrored = false;

  const cleanUp = () => {
    clearTimeout(timeoutId);
    script.removeEventListener('load', loadHandler);
    script.removeEventListener('error', errorHandler);
  };

  const loadHandler = () => {
    isLoaded = true;
    cleanUp();
    if (onLoad) {
      onLoad();
    }
  };

  const errorHandler = () => {
    isErrored = true;
    cleanUp();
    if (onError) {
      onError();
    }
  };

  script.addEventListener('load', loadHandler);
  script.addEventListener('error', errorHandler);

  const timeoutId = setTimeout(() => {
    if (!isLoaded && !isErrored) {
      cleanUp();
      console.error('Script loading timed out:', src);
    }
  }, timeout);

  document.body.appendChild(script);
}

function loadScriptAsync(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, {
      onLoad: resolve,
      onError: reject,
    });
  });
}
