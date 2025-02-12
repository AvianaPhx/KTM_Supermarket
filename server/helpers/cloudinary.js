const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dlukrnwxh",
  api_key: "394564311819752",
  api_secret: "isCST5j9R2IG7PJUE5M36s4zUs8",
});

const storage = new multer.memoryStorage();

// Function to upload an image to Cloudinary
async function imageUploadUtil(file, folder = "default_folder") {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: folder, // Specify the folder
      folder: "advertisements",
    });
    return result;
  } catch (error) {
    console.error(`Error uploading image to folder ${folder}:`, error);
    throw error;
  }
}

// Function to fetch images from a specific folder in Cloudinary
async function getImagesFromFolder(folder) {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`) // Fetch images from the specified folder
      .execute();

    return result.resources; // Return the list of images
  } catch (error) {
    console.error(`Error fetching images from folder ${folder}:`, error);
    throw error;
  }
}

// Fetch advertisement images from Cloudinary
async function getAdvertisementImages() {
  try {
    const result = await cloudinary.search
      .expression("folder:advertisements") // Fetch images from the "advertisements" folder
      .execute();
    return result.resources; // Return the list of advertisement images
  } catch (error) {
    console.error("Error fetching advertisement images:", error);
    throw error;
  }
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil, getImagesFromFolder, getAdvertisementImages, };
