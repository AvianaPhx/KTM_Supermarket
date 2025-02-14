import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch()
    const {featureImageList} = useSelector(state=>state.commonFeature)

    function handleUploadFeatureImage(){
        dispatch(addFeatureImage(uploadedImageUrl)).then((data) =>{
            if(data?.payload?.success){
                dispatch(getFeatureImages())
                setImageFile(null)
                setUploadedImageUrl("")
            }
        })
    }
    
    function handleDeleteFeatureImage(id) {
        dispatch(deleteFeatureImage(id)).then((data) => {
          if (data?.payload?.success) {
            console.log("Image deleted successfully!");
            dispatch(getFeatureImages());
          }
        });
      }

    useEffect(()=>{
        dispatch(getFeatureImages())
    },[dispatch])


    return  (
        <div>
            <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isCustomStyling = {true}
                folder="default_folder"
                // isEditMode={currentEditedId !== null}
            />
            <Button onClick={handleUploadFeatureImage} className="mt-5 w-full" disabled={!imageFile && !uploadedImageUrl}>
                Upload
            </Button>
            <div className="flex flex-col gap-4 mt-5">
                {featureImageList && featureImageList.length > 0 ? (
                    featureImageList.map((featureImgItem) => (
                    <div key={featureImgItem._id} className="flex flex-col items-center gap-2" >
                        <img
                        src={featureImgItem.image}
                        alt="Feature"
                        className="w-full h-[300px] object-cover rounded-lg"
                        />
                        <Button
                        className="w-[50%]"
                        variant="destructive"
                        onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                        >
                        Delete
                        </Button>
                    </div>
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>

        </div>
    )
}

export default AdminDashboard;