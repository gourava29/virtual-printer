var fs = require('fs')
var Printer = require('ipp-printer');
const { execSync } = require('child_process');

var printer = new Printer({
  name: 'My Printer',
  port: 8041
});
printer.on('job', function (job) {
  console.log('[job %d] Printing document: %s', job.id, job.name);

  var filename = 'job-' + job.id + '.ps' // .ps = PostScript
  var file = fs.createWriteStream(filename)

  job.on('end', function () {
    // api call
    // pass job to another printer
    execSync(`ps2pdf ${filename}`);
    console.log('[job %d] Document saved as %s', job.id, filename);
  })
  
  job.pipe(file)
});