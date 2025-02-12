import ProductImageUpload from "@/components/admin-view/image-upload";
import { useState } from "react";

function AdminAdvertisement() {

    const [imageFile, setImageFile] = useState(null);
    const [ setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);

    return(
        <div>
            <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isCustomStyling = {true}
                folder="advertisement"
                // isEditMode={currentEditedId !== null}
            />
        </div>

    );
}

export default AdminAdvertisement