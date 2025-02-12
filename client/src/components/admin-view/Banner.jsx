import ProductImageUpload from "@/components/admin-view/image-upload";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useDispatch} from "react-redux";
import { addBannerImage, getBannerImages, deleteBannerImage } from "@/store/common-slice";
import { useSelector } from "react-redux";

function AdminBanner() {

    const dispatch = useDispatch()

      // State for banner images
    const [bannerImageFile, setBannerImageFile] = useState(null);
    const [bannerImageUrl, setBannerImageUrl] = useState("");
    const [bannerImageLoading, setBannerImageLoading] = useState(false);
    const {bannerImageList} = useSelector(state=>state.commonFeature)

    // Handle banner image upload
    const handleUploadBannerImage = () => {
        dispatch(addBannerImage(bannerImageUrl)).then((data) => {
        if (data?.payload?.success) {
            dispatch(getBannerImages()); // Fetch updated banner images
            setBannerImageFile(null);
            setBannerImageUrl("");
        }
        });
    };
        
    // Handle banner image deletion
    const handleDeleteBannerImage = (id) => {
        dispatch(deleteBannerImage(id)).then((data) => {
        if (data?.payload?.success) {
            console.log("Banner image deleted successfully!");
            dispatch(getBannerImages()); // Fetch updated banner images
        }
        });
    };

    // Fetch feature and banner images on component mount
    useEffect(() => {
        dispatch(getBannerImages()); // Fetch banner images
    }, [dispatch]);

    return(
        <div>
            {/* Banner Section */}
            <h2 className="text-xl font-bold mb-4 mt-8">Banner</h2>
                <ProductImageUpload
                    imageFile={bannerImageFile}
                    setImageFile={setBannerImageFile}
                    uploadedImageUrl={bannerImageUrl}
                    setUploadedImageUrl={setBannerImageUrl}
                    setImageLoadingState={setBannerImageLoading}
                    imageLoadingState={bannerImageLoading}
                    isCustomStyling={true}
                    folder="banner" // Upload images to the "banner" folder
                />
                <Button onClick={handleUploadBannerImage} className="mt-5 w-full" disabled={!bannerImageFile && !bannerImageUrl}>
                    Upload Banner Image
                </Button>
                <div className="flex flex-col gap-4 mt-5">
                    {bannerImageList && bannerImageList.length > 0 ? (
                    bannerImageList.map((bannerImgItem) => (
                        <div key={bannerImgItem._id} className="flex flex-col items-center gap-2">
                        <img
                            src={bannerImgItem.image}
                            alt="Banner"
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                        <Button
                            className="w-[50%]"
                            variant="destructive"
                            onClick={() => handleDeleteBannerImage(bannerImgItem._id)}
                        >
                            Delete
                        </Button>
                        </div>
                    ))
                    ) : (
                    <p>No banner images available</p>
                    )}
                </div>
        </div>
    );
}

export default AdminBanner