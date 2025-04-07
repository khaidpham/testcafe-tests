const app1_helpers = require('./app1_helper_functions');
const config = require('../config.json');
const minimist = require('minimist');
const { selectAccount } = require('@example/-testcafe-common');

const args = minimist(process.argv.slice(2), {
  default: {
    env: 'qa',
    ga: 'GA4',
    violationThreshold: 10
  }});
const env = args.env;
const ga = args.ga;
const violationThreshold = args.violationThreshold;
console.info(`Command line parameters - env: ${env}, ga: ${ga}, violationThreshold: ${violationThreshold}`);

/**
 * app3 Fixture Helper
 * @param  {string} templateName
 * @param  {TestController} t - TestController
 */
const app3FixtureHelper = (templateName, t) => {
  const createUrl = config.app3_createUrl[env];
  fixture`app3 - End2end testing of ${templateName} on ${env}`
    .page`${createUrl}`
    .beforeEach(async (t) => {
      await app1_helpers.login_user(env, 'webapp+app3@example.com', 'webappTest1', t);
      await selectAccount('webapp app3', t);
      await t.navigateTo(createUrl);
    });

  return [env, ga, violationThreshold];
};

/**
 * corptv Fixture Helper
 * @param  {string} templateName
 * @param  {TestController} t - TestController
 */
const corptvFixtureHelper = (templateName, t) => {
  const createUrl = config.corptv_createUrl[env];
  fixture`CorpTV - End2end testing of ${templateName} on ${env}`
    .page`${createUrl}`
    .beforeEach(async (t) => {
      await app1_helpers.login_user(env, 'webapp+corptv@example.com', 'webappTest2', t);
    });

  return [env, ga, violationThreshold];
};

/**
 * cloudy Fixture Helper
 * @param  {string} templateName
 * @param  {TestController} t - TestController
 */
const cloudyFixtureHelper = (templateName, t) => {
  const createUrl = config.createUrl[env];
  fixture`Video Cloud - End2end testing of ${templateName} on ${env}`
    .page`${createUrl}`
    .beforeEach(async (t) => {
      await app1_helpers.login(env, t);
    });

  return [env, ga, violationThreshold];
};

/**
 * app3 Fixture Helper
 * @param  {string} templateName
 * @param  {TestController} t - TestController
 */
const app3LayoutHelper = (templateName, t) => {
  const createUrl = config.app3Layout_Url[env];
  fixture`app3 - Layout testing of ${templateName} on ${env}`
    .page`${createUrl}`
    .beforeEach(async (t) => {
      await app1_helpers.login_user(env, 'webapp+app3@example.com', 'webappTest1', t);
      await selectAccount('app app3 Testing', t);
    });

  return [env, ga];
};

/**
 * cloudy login Fixture Helper
 * @param  {TestController} t - TestController
 */
const loginHelper = (t) => {
  const createUrl = config.createUrl[env];
  fixture`Video Cloud - login of on ${env}`
    .page`${createUrl}`
    .beforeEach(async (t) => {
      await app1_helpers.login(env, t);
    });

  return [env, ga, violationThreshold];
};

module.exports = {
  cloudyFixtureHelper,
  corptvFixtureHelper,
  app3FixtureHelper,
  app3LayoutHelper,
  loginHelper,
};