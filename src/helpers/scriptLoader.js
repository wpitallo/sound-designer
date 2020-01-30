const scriptLoader = (scriptId, scriptSrc, callback) => {
  const existingScript = document.getElementById(scriptId);

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = scriptSrc;
    document.head.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }

  if (existingScript && callback) callback();
};

export default scriptLoader;
