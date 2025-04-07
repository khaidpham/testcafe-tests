const Testcafe = require('testcafe');
const Selector = Testcafe.Selector;

const AppCues = {
  iframe: Selector('iframe.appcues-tooltip-container'),
  exit: Selector('.exit-tooltip'),
};

const Privacy = {
  banner: Selector('#privacy-policy-banner-mount-point'),
  okay: Selector('#privacy-policy-banner-mount-point button'),
};

/**
 * Dismiss Appcues
 * @param  {TestController} t
 */
const dismiss_Appcues = async (t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  if (await AppCues.iframe.with({ boundTestRun: t}).exists) {
    await t.switchToIframe(AppCues.iframe.with({ boundTestRun: t}));
    await t.click(AppCues.with({ boundTestRun: t}).exit);
    await t.switchToMainWindow();
  }
};

/**
 * Dismiss_app_privacy
 * @param  {TestController} t
 */
const dismiss_app_privacy = async (t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  if (await Privacy.banner.with({ boundTestRun: t}).exists) {
    console.info('Dismissing example Privacy Policy banner');
    await t.click(Privacy.okay.with({ boundTestRun: t}));
  }
};

/**
 * Template Name Env
 * @param  {string} templateName
 * @param  {string} env
 * @param  {TestController} t
 */
const templateNameEnv = (templateName, env, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  return env === 'qa' && !templateName.includes(' QA') ? templateName + ' QA' : templateName;
};

const setElementVisible = Testcafe.ClientFunction(selector => {
  var element = document.querySelector(selector);
  element.style.display = 'flex';
});

const waitOption = {
  previewLoader: 'previewLoader',
  explicitWait: 'wait',
};

async function objToString(obj) {
  return Object.entries(obj).reduce((str, [p, val]) => {
    return `${str}${p}::${val}\n`;
  }, '');
};

/**
 * GetBrowserConsoleLogs
 * @param  {TestController} t
 */
const getBrowserConsoleLogs = async (t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  return objToString(await t.getBrowserConsoleMessages());
};

/**
 * Get Url Status With Curl
 * @param  {string} url
 */
const getUrlStatusWithCurl = async (url) => {
  return new Promise((resolve, reject) => {
    curl.get(url, { timeout: 120 * 1000 }, (error, response) => {
      if (error) {
        reject(new Error(`Error executing curl: ${error.message}`));
      } else {
        resolve(response.statusCode);
      }
    });
  });
};

module.exports = {
  dismiss_Appcues,
  dismiss_app_privacy,
  templateNameEnv,
  setElementVisible,
  waitOption,
  getBrowserConsoleLogs,
  getUrlStatusWithCurl,
};