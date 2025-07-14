const db = require('../config/db');

const Content = {
  getAll: (callback) => {
    const query = 'SELECT * FROM content';
    db.query(query, callback);
  },
  getById: (id, callback) => {
    const query = 'SELECT * FROM content WHERE id = ?';
    db.query(query, [id], callback);
  },
  create: (content, callback) => {
    const query = 'INSERT INTO content (title, description, genre, actors, video_url) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [content.title, content.description, content.genre, content.actors, content.video_url], callback);
  }
};

module.exports = Content;
