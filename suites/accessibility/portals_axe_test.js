/* eslint no-undef: 0 */
import minimist from 'minimist';
const _common = require('@example/-testcafe-common');

const args = minimist(process.argv.slice(2), {
  default: {
    siteUrl: 'https://template1.examplewebapp.com',
    violationThreshold: 10
  }});
const siteUrl = args.siteUrl;
const violationThreshold = args.violationThreshold

fixture `Validate accessibility on ${siteUrl} pubsite`;

test.page(siteUrl) (`Check accessibility against ${siteUrl}`, async t => {
  console.info('\n** Accessibility Check in Desktop mode **');
  await t.resizeWindow(1280, 1024);
  await _common.a11yCheck(t, violationThreshold);

  console.info('\n** Accessibility Check in Tablet mode **');
  await t.resizeWindow(768, 1024 );
  await _common.a11yCheck(t, violationThreshold);

  console.info('\n** Accessibility Check in Mobile mode **');
  await t.resizeWindow(375, 812);
  await _common.a11yCheck(t, violationThreshold);

  console.info('Validated Accessibility');
});
