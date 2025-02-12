const express = require("express");

const {
  addAdsImage,
  getAdsImages,
  deleteAdsImage
} = require("../../controllers/common/ads-controller");

const router = express.Router();

router.post("/add", addAdsImage);
router.get("/get", getAdsImages);
router.delete("/delete/:id", deleteAdsImage);

module.exports = router;
