const { Selector, RequestLogger, RequestMock } = require('testcafe');

const gainSightRequestLogger = {
  prod: RequestLogger({ url: /\.example\.com\/gainsight\/token/, method: 'get' },
    { logRequestHeaders: true, logRequestBody: true, logResponsetHeaders: true, logResponseBody: true }),

  production: RequestLogger({ url: /\.example\.com\/gainsight\/token/, method: 'get' },
    { logRequestHeaders: true, logRequestBody: true, logResponsetHeaders: true, logResponseBody: true }),

  qa: RequestLogger({ url: /\.qa\.example\.com\/gainsight\/token/, method: 'get' },
    { logRequestHeaders: true, logRequestBody: true, logResponsetHeaders: true, logResponseBody: true }),

  staging: RequestLogger({ url: /\.staging\.example\.com\/gainsight\/token/, method: 'get' },
    { logRequestHeaders: true, logRequestBody: true, logResponsetHeaders: true, logResponseBody: true }),
};

const gainSightRequestMock = {
  prod: RequestMock()
    .onRequestTo('https://.example.com/gainsight/token')
    .respond(null, 400, { 'access-control-allow-origin': '*' }),

  production: RequestMock()
    .onRequestTo('https://.example.com/gainsight/token')
    .respond(null, 400, { 'access-control-allow-origin': '*' }),

  qa: RequestMock()
    .onRequestTo('https://.qa.example.com/gainsight/token')
    .respond(null, 400, { 'access-control-allow-origin': '*' }),

  staging: RequestMock()
    .onRequestTo('https://.staging.example.com/gainsight/token')
    .respond(null, 400, { 'access-control-allow-origin': '*' }),
};

const vcHelp = {
  helpButton: Selector('button[data-test-name="nav-open-in-context-help"]'),
  askCommunityBtn: Selector('[data-test-name="community-link"]'),
  closeBtn: Selector('[data-test-name="close-support-button"]'),
  pageAlert: Selector('div[role="alert"]'),
};

const community = {
  profileBtn: Selector('a.qa-profilepicture'),
  userMenu: Selector('a.qa-menu-username'),
  termsCB: Selector('input#terms'),
  saveBtn: Selector('input.btn.btn--cta'),
};

module.exports = {
  vcHelp,
  community,
  gainSightRequestLogger,
  gainSightRequestMock,
};