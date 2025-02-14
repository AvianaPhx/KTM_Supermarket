const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const multer = require('multer');
const path = require('path');

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require('./routes/shop/products-routes')
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
const commonBannerRouter = require("./routes/common/banner-routes");
const commonAdsRouter = require("./routes/common/ads-routes");
const advertisementRoutes = require("./routes/common/ads-routes");

mongoose
    .connect('mongodb+srv://AvianaPhoenix:asilentvoice@cluster0.lrnta.mongodb.net/')
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
         ],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Define the ad schema
const adSchema = new mongoose.Schema({
    title: String,
    content: String,
    displayTime: Number,
    displayCondition: { type: String, enum: ['onPageLoad', 'onScroll', 'onClick'] },
    image: String
});

const Ad = mongoose.model('Ad', adSchema);

app.use('/api/auth', authRouter)
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use('/api/shop/products', shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter)
app.use('/api/shop/review', shopReviewRouter)

app.use('/api/common/feature', commonFeatureRouter)
app.use('/api/common/banner', commonBannerRouter)
app.use('/api/common/ads', commonAdsRouter)
app.use("/api/common/advertisement", advertisementRoutes);

// Ad routes
app.post('/api/ads', upload.single('image'), async (req, res) => {
    const { title, content, displayTime, displayCondition } = req.body;
    const image = req.file ? req.file.path : '';

    const ad = new Ad({ title, content, displayTime, displayCondition, image });
    await ad.save();
    res.status(201).send(ad);
});

app.get('/api/ads', async (req, res) => {
    const ads = await Ad.find();
    res.send(ads);
});


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));