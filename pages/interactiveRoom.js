const { Selector } = require('testcafe');

const getElementsByXPath = Selector(xpath => {
  const iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  const items = [];

  let item = iterator.iterateNext();

  while (item) {
    items.push(item);
    item = iterator.iterateNext();
  }

  return items;
});

const interactiveRoom = {
  waitingRoomJoinButton: Selector('button[data-test-name="waiting-room-join-button"]'),
  joinMeetingButton: Selector('button[data-test-name="join-meeting-button"]'),
  endSessionButton: Selector('button[data-test-name="end-meeting-button"]'),
  speakerMicsButton: Selector('button[data-test-name="speaker-mics-button"]'),
  disableAllMicsButton: Selector('button[data-test-name="speaker-mics-button"]'),
  disableAllCamsButton: Selector('button[data-test-name="speaker-cameras-button"]'),
  speakersMicText: Selector(getElementsByXPath('//*[@id="topMenuBar-iconButton-speaker-mics"]/text()')).nth(1),
  speakersCameraText: Selector(getElementsByXPath('//*[@id="topMenuBar-iconButton-speaker-cameras"]/text()')).nth(1),
  hideShowPeopleText: Selector(getElementsByXPath('//*[@id="topMenuBar-iconButton-users"]/text()')).nth(1),
  micControl: Selector('button[data-test-name="mic-control-button"]'),
  videoControl: Selector('button[data-test-name="video-control-button"]'),
  hideShowPeople: Selector('button[data-test-name="hide-show-people-button"]'),
  attendeeHideShowButton: Selector('button[data-test-name="hide-show-people-button"]'),
  attendeeRaiseHandButton: Selector('button[data-test-name="raise-hand-control-button"]'),
};

module.exports = {
  getElementsByXPath,
  interactiveRoom,
};