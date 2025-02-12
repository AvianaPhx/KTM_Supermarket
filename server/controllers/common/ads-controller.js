const Ads = require('../../models/Ads')

const addAdsImage = async(req,res)=>{
    try{

        const {image} = req.body;

        const adsImages = new Ads({
            image
        })

        await adsImages.save();

        res.status(201).json({
            success: true,
            data: adsImages
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })
    }
}

const getAdsImages = async(req,res)=>{
    try{

        const images = await Ads.find({

        })

        res.status(200).json({
            success: true,
            data: images
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })
    }
}

const deleteAdsImage = async (req, res) => {
  const { id } = req.params; // Get the ID from request parameters
  try {
    const deletedImage = await Ads.findByIdAndDelete(id); 
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

module.exports = {addAdsImage, getAdsImages, deleteAdsImage}