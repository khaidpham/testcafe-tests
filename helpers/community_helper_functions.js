import * as app1_helpers from './app1_helper_functions';
import { Selector } from 'testcafe';
import * as community_page from '../pages/community_page'

const title = Selector('title');

/**
 * Open AskCommunity
 * @param  {TestController} t
 */
const openAskCommunity = async (t) => {
  await t.click(community_page.vcHelp.helpButton.with({ boundTestRun: t }));
  await t.expect(community_page.vcHelp.askCommunityBtn.with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).exists).ok();
  await t.click(community_page.vcHelp.askCommunityBtn.with({ boundTestRun: t }));
};

/**
 * Validate AskCommunity with Gain Sight SSO Access
 * @param  {string} env
 * @param  {TestController} t
 */
const validateAskCommunityAccess = async (env, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${app1_helpers.getTime()}] Validate Ask Community Access`);
  const parentWindow = await t.getCurrentWindow();
  const requestLogger = community_page.gainSightRequestLogger[env];
  await t.addRequestHooks(requestLogger);
  await openAskCommunity(t);
  await t
    .expect(requestLogger.contains(r => r.response.statusCode === 200))
    .ok('Network call was successful');
  let response = JSON.parse(requestLogger.requests[0].response.body);
  await t.expect(response.token !== undefined).ok('Response contains a token');
  await t.wait(3000);
  let newWindowTitle = await title.with({ boundTestRun: t, timeout: 5000 }).innerText;

  let attempts = 0;
  while (newWindowTitle === 'webapp - Video Cloud' && attempts < 3) {
    await t.click(community_page.vcHelp.askCommunityBtn.with({ boundTestRun: t }));
    await t.wait(5000);
    attempts++;
    newWindowTitle = await title.with({ boundTestRun: t, timeout: 5000 }).innerText;
  }
  await t.maximizeWindow();
  await t.expect(await app1_helpers.getURL(t)).contains('community.example.com');
  await t.expect(newWindowTitle).eql('The Bright Spot | example Customer Community');
  const currentWindow = await t.getCurrentWindow();
  //Validate User is SSO logged into Prod | in QA/Staging it just opens without sso. So skipping.
  if (env === 'prod') {
    await t.click(community_page.community.profileBtn.with({ boundTestRun: t }));
    await t.expect(community_page.community.userMenu.with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).exists).ok();
  }
  await t.closeWindow(currentWindow);
  await t.switchToWindow(parentWindow);
  console.log(`WIndow Title is: ${await title.with({ boundTestRun: t, timeout: 5000 }).innerText}`);
  await t.expect(await app1_helpers.getURL(t)).contains('example.com/products/cloudy');
  await t.click(community_page.vcHelp.closeBtn.with({ boundTestRun: t }));
  console.info(`[${app1_helpers.getTime()}] Validation Completed for Ask-Community Access`);
};

/**
 * Validate AskCommunity With GainSight BadRequest(Mock Response)
 * @param  {string} env
 * @param  {TestController} t
 */
const validateAskCommunityWithGainSightBadRequest = async (env, t) => {
  if (typeof t === 'undefined') { t = Testcafe.t; }
  console.info(`[${app1_helpers.getTime()}] Validate Ask Community Access with Bad Gainsight Request`);
  const parentWindow = await t.getCurrentWindow();
  const mock = community_page.gainSightRequestMock[env];
  const requestLogger = community_page.gainSightRequestLogger[env];
  await t.addRequestHooks(mock);
  await t.click(community_page.vcHelp.helpButton.with({ boundTestRun: t }));
  await t.expect(community_page.vcHelp.askCommunityBtn.with({ boundTestRun: t, visibilityCheck: true, timeout: 5000 }).exists).ok();
  await t.click(community_page.vcHelp.askCommunityBtn.with({ boundTestRun: t }));
  await t
    .expect(requestLogger.contains(r => r.response.statusCode === 400))
    .ok('Network call was returning Error as expected');
  if (await community_page.vcHelp.pageAlert.with({ boundTestRun: t, timeout: 5000 }).exists) {
    const alertMsg = await community_page.vcHelp.pageAlert.with({ boundTestRun: t }).innerText;
    await t.expect(alertMsg).eql('Failed to authenticate with Gainsight Community');
  }
  await t.wait(3000);
  if ((await app1_helpers.getURL(t)).includes('community.example.com')) {
    const currentWindow = await t.getCurrentWindow();
    await t.closeWindow(currentWindow);
    await t.switchToWindow(parentWindow);
  }
  await t.expect(await app1_helpers.getURL(t)).contains('example.com/products/cloudy');
  await t.click(community_page.vcHelp.closeBtn.with({ boundTestRun: t }));
  console.info(`[${app1_helpers.getTime()}] Validation Completed for Ask-Community Access with Bad Gainsight Request`);
};

module.exports = {
  openAskCommunity,
  validateAskCommunityAccess,
  validateAskCommunityWithGainSightBadRequest
};