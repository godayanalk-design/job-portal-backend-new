const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String
  },
  subtitles: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
