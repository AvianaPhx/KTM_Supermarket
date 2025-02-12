import ProductImageUpload from "@/components/admin-view/image-upload";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdvertisementImage,
  getAdvertisementImages,
  deleteAdvertisementImage,
} from "@/store/common-slice"; // Ensure these imports are correct

function AdminAdvertisement() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();

  // Fetch advertisement images from Redux state
  const { advertisementImageList } = useSelector((state) => state.common);

  // Handle advertisement image upload
  const handleUploadAdvertisement = () => {
    dispatch(addAdvertisementImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAdvertisementImages()); // Fetch updated advertisement images
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  };

  // Handle advertisement image deletion
  const handleDeleteAdvertisement = (id) => {
    dispatch(deleteAdvertisementImage(id)).then((data) => {
      if (data?.payload?.success) {
        console.log("Advertisement image deleted successfully!");
        dispatch(getAdvertisementImages()); // Fetch updated advertisement images
      }
    });
  };

  // Fetch advertisement images on component mount
  useEffect(() => {
    dispatch(getAdvertisementImages());
  }, [dispatch]);

  return (
    <div>
      {/* Advertisement Upload Section */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        folder="advertisements" // Upload to the "advertisements" folder
      />
      <Button
        onClick={handleUploadAdvertisement}
        className="mt-5 w-full"
        disabled={!imageFile && !uploadedImageUrl} // Disable if no image is selected
      >
        Upload Advertisement
      </Button>

      {/* Advertisement Images Section */}
      <div className="flex flex-col gap-4 mt-5">
        {advertisementImageList && advertisementImageList.length > 0 ? (
          advertisementImageList.map((advertisement) => (
            <div key={advertisement._id} className="flex flex-col items-center gap-2">
              <img
                src={advertisement.image}
                alt="Advertisement"
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <Button
                className="w-[50%]"
                variant="destructive"
                onClick={() => handleDeleteAdvertisement(advertisement._id)}
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p>No advertisement images available</p>
        )}
      </div>
    </div>
  );
}

export default AdminAdvertisement;