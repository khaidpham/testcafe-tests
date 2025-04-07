const fs = require('fs');
const csv = require('csv-parser');

/**
 * Extracts Agenda data from csv
 * @param  {String} csvFilePath
 * @return  {Object} result
 */
function extractAgendaData (csvFilePath) {
  return new Promise((resolve, reject) => {
    let result = {};

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        if (!row.id.trim().startsWith('#')) {
          const trackName = row.track.trim();
          if (!result[trackName]) {
            result[trackName] = {
              trackName: trackName,
              sessions: []
            };
          }
          const speaker1 = (row.speaker1_first_name != '') ? (row.speaker1_first_name + ' ' + row.speaker1_last_name) : '';
          const speaker2 = (row.speaker2_first_name != '') ? (row.speaker2_first_name + ' ' + row.speaker2_last_name) : '';
          const speakers = [speaker1, speaker2].filter(Boolean);
          const speakersCount = speakers.length;
          result[trackName].sessions.push({
            sessionName: row.name,
            sessionDesc: row.description,
            start_date: row.start_date,
            start_time: row.start_time,
            speakers_count: speakersCount,
            speakers: speakers
          });
        }
      })
      .on('end', () => {
        resolve(result);
      })
      .on('error', (error) => {
        reject(error);
      });  
})
};

module.exports = { extractAgendaData };