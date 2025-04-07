const { Selector } = require('testcafe');

const app3Layout = {
  createPage: Selector('a').withText('Create page'),
  mainMenu: Selector('a[href="/products/app3/layout/app/default/create?mode=layout"]'),
  secondaryMenu: Selector('a[href="/products/app3/layout/app/default/create?mode=layout&secondary=true"]'),
  pageName: Selector('input[placeholder="Page Name"]'),
  playlistGrid: Selector('div > h4').withText('Playlist Grid'),
  createBtn: Selector('button > span').withText('Create'), 

  addPlaylist: Selector('a > span').withText('Add playlist'),
  searchPlaylist: Selector('input[placeholder="Search playlists"]'),
  playlistMenuList: Selector('div[class^="menu__resultsWindow"] > div > ul > li').nth(0),  
  addPlaylistItem: Selector('a').withExactText('Add'),
  closePlaylistMenu: Selector('a[data-action="panel-close"]'),

  //Page setting
  configure_bt: Selector('div[role="button"]'), 
  availability: Selector('span').withText('Availability'),
  title: Selector('span').withText('Title & Translations'),
  card: Selector('span').withText('Card image'),
  closePageSetting: Selector('span[aria-label="close modal"]'),

  //Titles
  titles_tb: Selector('input[class^="Input-input"]'),
  languages: Selector('h5[class^="content__group_"]'),

  //Availability
  schedule_ts: Selector('label[role="switch"]').nth(0),
  endTime_cb: Selector('input#endDate'),
  endDate_tb: Selector('input[class^="rw-widget-input"]').nth(2),
  devices_ts: Selector('label[role="switch"]').nth(1),
  location_ts: Selector('label[role="switch"]').nth(2),
  roles_ts: Selector('label[role="switch"]').nth(3),

  //CardImage
  imageUploadLandscape: Selector('[class^="DropZone-container-"]').find('input').nth(0),
  imageUploadUltraWide: Selector('[class^="DropZone-container-"]').find('input').nth(1),
  imageUploadPortrait: Selector('[class^="DropZone-container-"]').find('input').nth(2),
  landscapeImageUploaded: Selector('[class^="DropZone-container-"] > div[class^="ImageUpload"]').nth(0),
  ultrawideImageUploaded: Selector('[class^="DropZone-container-"] > div[class^="ImageUpload"]').nth(1),
  portraitImageUpload: Selector('[class^="DropZone-container-"] > div[class^="ImageUpload"]').nth(2),

  //CardGrid
  videoCards: Selector('[class^="grid__cell"]'),

  //Publish
  publishPage: Selector('button').withText('PUBLISH'),
  publish: Selector('button > span').withExactText('Publish'),

  //Archive
  archivePage: Selector('a').withText('Archive page'),

  //Alert
  pageAlert: Selector('div[role="alert"]'),
};

module.exports = { app3Layout };