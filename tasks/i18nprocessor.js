/*
 * grunt-i18nprocessor
 * https://github.com/ux4utils/grunt-i18nprocessor
 *
 * Copyright (c) 2015 ux4utils
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('i18nprocessor', 'Grunt i18n processor', function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
          separator: ', ',
          languages: ['en'],
          pretty: false,
          copyright: "",
          filenameMask: "ux4.%1.js",
          outputEnglishIfNoTranslation: true   //Output the english string if it doesn't have a i18n translation 
      });

      var langJSON = {};

      this.files.forEach(function (f) {

          var src = f.src.filter(function (filepath) {

              // Warn on and remove invalid source files (if nonull was set).
              if (!grunt.file.exists(filepath)) {
                  grunt.log.warn('Source file ' + filepath + ' not found.');
                  return false;
              } else {
                  return true;
              }
          });

          if (src.length === 0) {
              grunt.log.warn('Language files not written because valid src files were not specified.');
              return;
          }

          console.log("Loading i18n Source : " + src);

          var filename = String(f.src);

          for (var i = 0; i < options.languages.length; i++) {
              var lang = options.languages[i];

              if (!langJSON[lang]) {
                  langJSON[lang] = {};
              }

              var json = grunt.file.readJSON(src[0]);

              json.copyrightNotice

              for (var key in json) {
                  if (json[key][lang]) {
                      langJSON[lang][key] = json[key][lang];
                  }
                  else if (options.outputEnglishIfNoTranslation) {
                      langJSON[lang][key] = json[key]["en"];
                  }
              }
          }

          //Split the filename
          var sep = (filename.indexOf("/")) ? "/" : "\\";
          //  var fileparts = filename.split(sep);
          //  var filebody=fileparts[fileparts.length - 1];
          //  filebody = filebody.substr(0, filebody.lastIndexOf("."));
          var lastChar = f.dest.charAt(f.dest.length - 1);
          var dest = (lastChar == "\\" || lastChar == "/") ? f.dest : f.dest + sep;

          for (var lang in langJSON) {
              var output = { "copyrightNotice": options.copyright, "strings": {} };
              output.strings = langJSON[lang];

              var s = JSON.stringify(output, null, (options.pretty) ? "\t" : "");
              console.log(s);
              var filename = options.filenameMask.replace("%1", lang);

              console.log(dest + filename);
              grunt.file.write(dest + filename, s);
          }
      });
  });

};
