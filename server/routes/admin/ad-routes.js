const express = require("express");

const {
  handleImageUpload,
  addAd,
  editAd,
  fetchAllAds,
  deleteAd,
} = require("../../controllers/admin/ad-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addAd);
router.put("/edit/:id", editAd);
router.delete("/delete/:id", deleteAd);
router.get("/get", fetchAllAds);

module.exports = router;
