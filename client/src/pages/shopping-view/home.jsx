import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner1.jpg";
import {
  CarrotIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CupSodaIcon,
  CitrusIcon,
  DonutIcon,
  BeefIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast, useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getBannerImages ,getFeatureImages } from "@/store/common-slice";
import aboutus from "../../assets/about_us_home.jpg"

const categoriesWithIcon = [
  { id: "food", label: "Food" , icon: CitrusIcon },
  { id: "vegetables", label: "Vegetables", icon: CarrotIcon },
  { id: "snacks", label: "Snacks", icon: DonutIcon },
  { id: "drinks", label: "Drinks", icon: CupSodaIcon },
  { id: "fish_and_meat", label: "Fish and Meat", icon: BeefIcon },
];

const brandWithIcon = [
  { id: "amul", label: "Amul", image: "https://exchange4media.gumlet.io/news-photo/136540-big24.jpg" },
  { id: "nestle", label: "Nestle", image: "https://www.groupcaliber.com/wp-content/uploads/2022/08/nestle_case_study_logo_feaure_image.png" },
  { id: "britannia", label: "Britannia", image: '' },
  { id: "haldiram", label: "Haldiram", image: '' },
  { id: "pepsi", label: "Pepsi", image: '' },
  { id: "coca_cola", label: "Coca_cola", image: '' },
];

function ShoppingHome() {
  const { bannerImageList, featureImageList } = useSelector((state) => state.commonFeature);

  // State to store the current banner image URL
  const [currentBannerUrl, setCurrentBannerUrl] = useState("");

    // Select a random banner image on component mount
    useEffect(() => {
      if (bannerImageList.length > 0) {
        const randomIndex = Math.floor(Math.random() * bannerImageList.length);
        setCurrentBannerUrl(bannerImageList[randomIndex].image);
      }
    }, [bannerImageList]);


  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImageList.length]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  useEffect(() => {
    dispatch(getFeatureImages());
    dispatch(getBannerImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Small Banner Section */}
      <div className="w-full bg-gray-50 p-2">
        {currentBannerUrl ? (
          <img
            src={currentBannerUrl}
            alt="Small Promotional Banner"
            className="w-full h-[100px] object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-[100px] flex items-center justify-center bg-gray-200 rounded-lg">
            <p className="text-gray-500">No banner available</p>
          </div>
        )}
      </div>
      
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                alt={`Slide ${index + 1}`}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/*
      <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {brandWithIcon.map((brandItem, index) => (
                        <Card
                            key={index}
                            onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                            className="cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <CardContent className="flex flex-col items-center justify-center p-6">
                                <img
                                    src={brandItem.image} // Use the image property from the object
                                    alt={brandItem.label}
                                    className="w-full h-auto mb-4 object-contain"
                                />
                                <span className="font-bold">{brandItem.label}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
      */}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                  <ShoppingProductTile
                    key={productItem.id || `${productItem.name}-${index}`}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Fruits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 ? (
              productList
                .filter((productItem) => productItem.category === "fruits")
                .map((productItem, index) => (
                  <ShoppingProductTile
                    key={productItem.id || `${productItem.name}-${index}`}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
            ) : (
              <p className="text-center text-lg text-muted-foreground">
                No products available in this category.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Vegetables</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 ? (
              productList
                .filter((productItem) => productItem.category === "vegetables")
                .map((productItem, index) => (
                  <ShoppingProductTile
                    key={productItem.id || `${productItem.name}-${index}`}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
            ) : (
              <p className="text-center text-lg text-muted-foreground">
                No products available in this category.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Bakery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 ? (
              productList
                .filter((productItem) => productItem.category === "bakery")
                .map((productItem, index) => (
                  <ShoppingProductTile
                    key={productItem.id || `${productItem.name}-${index}`}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
            ) : (
              <p className="text-center text-lg text-muted-foreground">
                No products available in this category.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Beverages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 ? (
              productList
                .filter((productItem) => productItem.category === "beverages")
                .map((productItem, index) => (
                  <ShoppingProductTile
                    key={productItem.id || `${productItem.name}-${index}`}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
            ) : (
              <p className="text-center text-lg text-muted-foreground">
                No products available in this category.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Dairy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 ? (
              productList
                .filter((productItem) => productItem.category === "dairy")
                .map((productItem, index) => (
                  <ShoppingProductTile
                    key={productItem.id || `${productItem.name}-${index}`}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
            ) : (
              <p className="text-center text-lg text-muted-foreground">
                No products available in this category.
              </p>
            )}
          </div>
        </div>
      </section>

      <Card className="w-full">
          <div className="flex items-start space-x-6">
              <div className="flex-1 pl-[100px] mb-7 pt-4">
                  <img src={aboutus} alt="KTM-SuperMarket" className="rounded-full w-[600px] h-[370px] object-cover" />
              </div>
              <div className=" flex-1 mt-7 space-x-2 space-y-4 flex-grow mb-7">
                  <div className=" items-center space-x-2">
                      <h3 className="text-lg font-semibold">What makes us different?</h3>
                  </div>

                  <div className="mt-7 items-center">
                      <p className=' pr-10'>
                          Our Commitment to Quality & Service! As a Nepalese family, we're proud to offer the first online store that reveals the Best Before date for every product. Our commitment to top-notch quality goes above and beyond, ensuring you get the best.
                      </p>
                      <p className='mt-7 pr-10'>
                          We provide same-day delivery to 200+ suburbs around Perth, and we don't stop there — we also offer Australia-wide shipping. Welcome to a grocery store where transparency and quality come standard. Your satisfaction is our guarantee.
                      </p>
                  </div>
                  <div>
                      <button className="border-2 border-double border-black mt-7 px-4 py-2 bg-transparent text-black rounded-full hover:bg-black hover:text-white" onClick={() => {navigate("/shop/about-us"); window.scrollTo(0, 0);}}> 
                          About Us
                      </button>
                  </div>
              </div>
          </div>
        </Card>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
