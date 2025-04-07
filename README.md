# testcafe-automation

Test Automation for sample web application using TestCafe framework

## Info

Supported browsers:
- Available browsers on your local machine. E.g. `chrome`, `chromium`, `firefox`, `safari`, `edge`.\
To get a list of available browsers, run `testcafe -b`

- Available browsers on BrowserStack.\
To get a list of available browsers on BrowserStack, run `testcafe -b browserstack`

## Getting Started

- TestCafe requires a recent version of the `Node.js` platform and `npm` command-line utility

- Install TestCafe system-wide: `npm install -g testcafe`

- Install dependencies: `npm install`

## Running tests

### Run test using testcafe command:

`testcafe <browsers> <path to folder/file> <flags>`

- use the configured browsers and src from [.testcaferc.json](https://bithub.brightcove.com/gallery/gallery-automation/blob/master/.testcaferc.json) to run tests from end2end folder on chrome\
`testcafe`

- run tests from end2end folder on 4 browsers\
`testcafe chrome,firefox,edge,safari suites/app1/end2end --env=qa`

- run template1 tests on chrome\
`testcafe chrome suites/app1/end2end/template1_test.js --env=qa`

### Run tests on BrowserStack

[Guide - Running TestCafe tests on BrowserStack](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/testcafe)

### Contributing to this repository

[Guide - Create a new test](https://testcafe.io/documentation/402635/guides/overview/getting-started#create-a-new-test)

[Guide - Use best TestCafe strategies](https://testcafe.io/documentation/402836/guides/best-practices/best-practices)

## Maintainers

- Khai Pham - khaipham@gmail.com
