import { Button } from '@/components/ui/button'
import bannerOne from '../../assets/banner1.jpg'
import bannerTwo from '../../assets/banner2.jpg'
import bannerThree from '../../assets/banner3.jpg'
import { AppleIcon, CarrotIcon, CatIcon, ChevronLeftIcon, ChevronRightIcon, CroissantIcon, CupSodaIcon, MilkIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts } from '@/store/shop/products-slice'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { useNavigate } from 'react-router-dom'
import { fetchProductDetails } from '@/store/shop/products-slice'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { toast, useToast } from '@/hooks/use-toast'
import ProductDetailsDialog from '@/components/shopping-view/product-details'

const categoriesWithIcon = [
    { id: "fruits", label: "Fruits" , icon : AppleIcon },
    { id: "vegetables", label: "Vegetables" , icon : CarrotIcon },
    { id: "dairy", label: "Dairy Products" , icon : MilkIcon},
    { id: "bakery", label: "Bakery Items" , icon : CroissantIcon},
    { id: "beverages", label: "Beverages" , icon : CupSodaIcon},
]

const brandWithIcon = [
    { id: "amul", label: "Amul" , icon : CatIcon},
    { id: "nestle", label: "Nestle" , icon : CatIcon},
    { id: "britannia", label: "Britannia" , icon : CatIcon},
    { id: "haldiram", label: "Haldiram" , icon : CatIcon},
    { id: "pepsi", label: "Pepsi" , icon : CatIcon},
    { id: "coca_cola", label: "Coca_cola" , icon : CatIcon},
]

function ShoppingHome() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const {productList, productDetails} = useSelector(state=> state.shopProducts)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { user } = useSelector(state=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {toast} = useToast()


    const slides = [bannerOne, bannerTwo, bannerThree]

    function handleNavigateToListingPage(getCurrentItem, section){
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section] : [getCurrentItem.id]
        }

        sessionStorage.setItem("filters", JSON.stringify(currentFilter))
        navigate(`/shop/listing`)
    }

    function handleGetProductDetails(getCurrentProductId){
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId))
    }

        function handleAddtoCart(getCurrentProductId){
            dispatch(
                addToCart({
                    userId : user?.id, 
                    productId : getCurrentProductId, 
                    quantity: 1, 
                })
            ).then((data)=> {
                if(data?.payload?.success){
                    dispatch(fetchCartItems(user?.id))
                    toast({
                        title : "Product is added to cart"
                    })
                }
            });
    
        }

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);

    }, [productDetails]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
          }, 5000);
    
        return () => clearInterval(timer);
    }, [slides.length]);

    useEffect(()=>{
        dispatch(fetchAllFilteredProducts({filterParams : {}, sortParams: "price-lowtohigh" }))
    },[dispatch])

    console.log(productList, 'productList')

    return <div className="flex flex-col min-h-screen">
        <div className="relative w-full h-[600px] overflow-hidden">
            {slides.map((slide, index) => (
                <img
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className={`${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                />
            ))}
            <Button
                variant="outline"
                size="icon"
                onClick={()=>setCurrentSlide(prevSlide=>(prevSlide - 1 + slides.length) % slides.length)}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
            >
                <ChevronLeftIcon className="w-4 h-4" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                onClick={()=>setCurrentSlide(prevSlide=>(prevSlide + 1) % slides.length)}
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
                    {
                        categoriesWithIcon.map((categoryItem) => (
                            <Card onClick={()=>handleNavigateToListingPage(categoryItem, 'category')}  className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary'/>
                                    <span className="font-bold">{categoryItem.label}</span>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </section>

        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Shop by Brand
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {
                        brandWithIcon.map((brandItem) => (
                            <Card onClick={()=>handleNavigateToListingPage(brandItem, 'brand')}  className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <brandItem.icon className='w-12 h-12 mb-4 text-primary'/>
                                    <span className="font-bold">{brandItem.label}</span>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </section>

        <section className='py-12'>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Feature Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        productList && productList.length > 0
                            ? productList.map((productItem, index) => (
                                <ShoppingProductTile
                                    key={productItem.id || `${productItem.name}-${index}`} 
                                    handleGetProductDetails={handleGetProductDetails}
                                    product={productItem}
                                    handleAddtoCart={handleAddtoCart}
                                />
                            ))
                            : null
                    }

                </div>
            </div>
        </section>
        <ProductDetailsDialog
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}
        />
    </div>
};

export default ShoppingHome;