const fs = require('fs');
const path = require('path');
const text = fs.readFileSync(__dirname + '/customTemplate.js');
const textInput = text.toString();
fs.mkdirSync('./suites/app1/custom_end2end', { recursive: true });

const directory = path.join(__dirname, '../suites/app1/custom_end2end/');

const names = [
  'Custom1',
  'Custom2',
  'Custom3',
  'Custom4',
  'Custom5',
  'Custom6',
  'Custom7',
  'Custom8',
  'Custom9',
  'Custom10',
];

for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
  const replaceStr = textInput.replace('Custom',names[i]);

  fs.writeFile(directory + names[i] + '.js', replaceStr, (err) => {
    if (err) {throw err;}
  });
}
