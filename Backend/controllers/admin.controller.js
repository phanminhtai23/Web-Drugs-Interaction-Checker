const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

exports.uploadFile = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Call Python script to process the file
    exec(`python process_file.py ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: 'File processing failed' });
      }
      res.status(200).json({ message: 'File processed successfully', output: stdout });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};