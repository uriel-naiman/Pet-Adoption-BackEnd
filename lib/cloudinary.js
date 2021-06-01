const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'urielnaiman',
  api_key: '551842654536674',
  api_secret: '0XLj-WYowHcv62mBB3AA1VUekWk'
});

function uploadToCloudinary(filePath) { // e.g. "/public/18979813-12312.jpeg"
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  })
 }
 exports.uploadToCloudinary = uploadToCloudinary;
 