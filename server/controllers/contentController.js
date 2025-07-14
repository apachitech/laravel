const Content = require('../models/Content');

exports.getAllContent = (req, res) => {
  Content.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

exports.getContentById = (req, res) => {
  const { id } = req.params;
  Content.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ msg: 'Content not found' });
    }
    res.json(results[0]);
  });
};

exports.createContent = (req, res) => {
  const { title, description, genre, actors, video_url } = req.body;
  const newContent = { title, description, genre, actors, video_url };

  Content.create(newContent, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ msg: 'Content created' });
  });
};
