const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const deleteFeatureImage = async (req, res) => {
  const { id } = req.params; // Get the ID from request parameters
  try {
    const deletedImage = await Feature.findByIdAndDelete(id); // Delete the feature image from the database
    if (!deletedImage) {
      // If no image is found, return a 404 error
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
    // If deletion is successful, return a success response
    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImages, deleteFeatureImage  };