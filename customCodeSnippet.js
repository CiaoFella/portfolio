function loadMainScript() {
  const netlifyBaseUrl = 'https://julianfella.netlify.app/'
  const localhostBaseUrl = 'http://localhost:3000/' // Adjust if main.js is at the root

  // URLs for the scripts and styles
  const mainScriptUrl = `${localhostBaseUrl}main.js`
  const fallbackMainScriptUrl = `${netlifyBaseUrl}main.js`
  const stylesheetUrl = `${localhostBaseUrl}style.css`
  const fallbackStylesheetUrl = `${netlifyBaseUrl}style.css`

  // Function to check if a URL is reachable
  function isUrlReachable(url) {
    return new Promise((resolve) => {
      fetch(url, { method: 'HEAD' })
        .then(() => resolve(true))
        .catch(() => resolve(false)) // Resolve to false on error
    })
  }

  // Function to create and append the script element
  function appendScript(url) {
    const script = document.createElement('script')
    script.src = url
    script.type = 'module'
    script.async = true // Add the async attribute
    document.body.appendChild(script)
  }

  // Function to create and append the link element for the stylesheet
  function appendStylesheet(url) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
  }

  // Check if local main script is reachable
  isUrlReachable(mainScriptUrl)
    .then((reachable) => {
      if (reachable) {
        appendScript(mainScriptUrl)
        appendStylesheet(stylesheetUrl)
      } else {
        appendScript(fallbackMainScriptUrl)
        appendStylesheet(fallbackStylesheetUrl)
      }
    })
    .catch(() => {
      // In case of any error checking localhost, fallback to Netlify
      appendScript(fallbackMainScriptUrl)
      appendStylesheet(fallbackStylesheetUrl)
    })
}

// Call the function to load the scripts and styles
loadMainScript()
