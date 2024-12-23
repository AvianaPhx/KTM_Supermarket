import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef } from "react";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { FileIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";
import axios from "axios";

function ProductImageUpload({
    imageFile, 
    setImageFile, 
    setUploadedImageUrl,
    setImageLoadingState,
}) {

    const inputRef = useRef(null)

    function handleImageFileChange(event) {
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0]
        if (selectedFile) setImageFile(selectedFile);
    }

    function handleDragOver(event){
        event.preventDefault()
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage() {
        setImageFile(null);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
    }

    console.log(imageFile);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function uploadImageToCloudinary(){
        setImageLoadingState(true)
        const data = new FormData();
        data.append('my_file', imageFile)
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data)
        console.log(response, 'response');

        if(response.data?.success) {
            setUploadedImageUrl(response.data.url);
            setImageLoadingState(false);
        }
    } 

    useEffect(()=>{
        if(imageFile !== null) uploadImageToCloudinary()
    },[imageFile, uploadImageToCloudinary])

    return(
        <div className="w-full max-w-md mx-auto mt-4">
            <Label className="text-lg font-semibold mb-2 block">
                Upload Image
            </Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
                <Input 
                    id='image-upload' 
                    type='file' 
                    className='hidden' 
                    ref={inputRef} 
                    onChange={handleImageFileChange}
                />
                {
                    !imageFile ? (
                        <label 
                            htmlFor="image-upload" 
                            className="flex flex-col items-center justify-center h-32 cursor-pointer"
                            >
                            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                            <span>Drag & drop or click to upload image</span>
                        </label>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FileIcon className="w-8 text-primary mr-2 h-8" />
                            </div>
                            <p className="text-sm font-medium">{imageFile.name}</p>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-foreground"
                                onClick={handleRemoveImage}
                            >
                                <XIcon className="w-4 h-4" />
                                <span className="sr-only">Remove File</span>
                            </Button>
                        </div>
                    ) 
                }
            </div>
        </div>
    )
}

export default ProductImageUpload;