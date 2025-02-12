const express = require("express");

const {
  addBannerImage,
  getBannerImages,
  deleteBannerImage
} = require("../../controllers/common/banner-controller");

const router = express.Router();

router.post("/add", addBannerImage);
router.get("/get", getBannerImages);
router.delete("/delete/:id", deleteBannerImage);

module.exports = router;
