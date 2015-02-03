'use strict';

module.exports = function (app) {
  // config view template
  var engine = require('engine-assemble');
  var Template = require('template');
  var path = require('path');

  var template = new Template();

  template.engine('hbs', engine);

  template.data(path.join(__dirname, '..', 'data/*.{json,yaml}'));
  template.option('renameKey', function (fp) {
    return path.basename(fp, path.extname(fp));
  });

  var View = require('express-template')(template);

  View.config({
    layouts: [path.join(__dirname, '..', '/views/layouts/**/*.hbs')],
    partials: [path.join(__dirname, '..', '/views/partials/**/*.hbs')]
  });

  // view engine setup
  app.set('view', View);
  app.set('views', path.join(__dirname, '..', 'views/pages'));
  app.set('view engine', 'hbs');
};
