
var path = require('path');
var mkdirp = require('mkdirp');

var dbPath = path.join((process.env.CLOUD_DIR || __dirname), 'data');
mkdirp.sync(dbPath);

var level = require('level');
var db = level(path.join(dbPath, 'items.db'));

module.exports = {
  get: function (cb) {
    var items = [];
    db.createReadStream()
      .on('data', function (item) {
        console.log('item', item);
        items.push(JSON.parse(item.value));
      })
      .on('error', cb)
      .on('end', function () {
        cb(null, items);
      });
  },

  click: function (id, cb) {
    console.log('clicking id', id);
    db.get(id, function (err, item) {
      if (err) return cb(err);
      item = JSON.parse(item);
      item.clicks++;
      db.put(id, JSON.stringify(item), function (err) {
        if (err) return cb(err);
        cb(null, item);
      });
    });
  },

  create: function (cb) {
    var id = require('crypto').randomBytes(12).toString('hex');
    console.log('id', id);
    db.put(id, JSON.stringify({ id: id, text: id, clicks: 0}), cb);
  }
}
