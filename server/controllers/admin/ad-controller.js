const Ad = require("../../models/Ad");

// Handle Image Upload for Ads
const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url); // Assuming you have an imageUploadUtil like in your product controller
  
        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occurred",
        });
    }
};

// Add a new Pop-up Ad
const addAd = async (req, res) => {
    try {
        const { title, content, displayTime, displayCondition, image } = req.body;

        const newlyCreatedAd = new Ad({
            title,
            content,
            displayTime,
            displayCondition,
            image,
        });

        await newlyCreatedAd.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedAd,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

// Fetch All Ads
const fetchAllAds = async (req, res) => {
    try {
        const listOfAds = await Ad.find({});
        res.status(200).json({
            success: true,
            data: listOfAds,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

// Edit an existing Pop-up Ad
const editAd = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, displayTime, displayCondition, image } = req.body;

        let findAd = await Ad.findById(id);
        if (!findAd)
            return res.status(404).json({
                success: false,
                message: "Ad not found",
            });

        findAd.title = title || findAd.title;
        findAd.content = content || findAd.content;
        findAd.displayTime = displayTime || findAd.displayTime;
        findAd.displayCondition = displayCondition || findAd.displayCondition;
        findAd.image = image || findAd.image;

        await findAd.save();
        res.status(200).json({
            success: true,
            data: findAd,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

// Delete a Pop-up Ad
const deleteAd = async (req, res) => {
    try {
        const { id } = req.params;
        const ad = await Ad.findByIdAndDelete(id);

        if (!ad)
            return res.status(404).json({
                success: false,
                message: "Ad not found",
            });

        res.status(200).json({
            success: true,
            message: "Ad deleted successfully",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

module.exports = { handleImageUpload, addAd, fetchAllAds, editAd, deleteAd };
