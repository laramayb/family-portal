import { useState } from "react";
import star from "../assets/star.png";

// compress an image using canvas before uploading
const compressImage = (file, maxWidth = 800, quality = 0.7) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scaleFactor = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleFactor;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export default function Post({ onPost }) {
  const [caption, setCaption] = useState("");
  const [imageDataList, setImageDataList] = useState([]);

  // limits images to max 5, compresses before storing
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
      if (files.length + imageDataList.length > 5) {
        alert("You can only upload up to 5 images per post.");
        return;
      }
      
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large! Try a smaller image.`);
          continue;
        }
    
        const compressed = await compressImage(file);
        setImageDataList((prev) => [...prev, compressed]);
      }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption && imageDataList.length === 0) return;

    const timestamp = new Date().toISOString();
    console.log("Created at:", timestamp);

    onPost({ 
      caption: caption.trim(), 
      images: [...imageDataList],
      createdAt: timestamp,
    });

    // clear inputs
    setCaption("");
    setImageDataList([]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageDataList((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
  // POST FORM
    <form 
      onSubmit={handleSubmit} 
      className="flex-col w-[99%] text-center gap-2"
    >
      <h2 
        className="
          text-[18px] mt-[10px] font-semibold text-[#234487] 
          text-center scale-y-[1.3]"
      >
        Post something
        <img
          src={star}
          alt="Star icon"
          className="w-[64px] h-[64px] pixelated"
          style={{ width: "30px", height: "25px" }}
        />
      </h2>
      
      {/* UPLOAD button */}
      <label 
        htmlFor="fileUpload" 
        className="
          text-[10px] inline-block bg-blue-300 mt-[10px]
          text-[#234487] p-[2px] rounded-full border-2 font-pixel 
          scale-y-[1.3] text-xs cursor-pointer mb-[10px] mr-[210px]"
      >
        Upload Image
      </label>

      {/* invisible file input */}
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Image preview section */}
      <div className="flex flex-wrap gap-2 mt-2">
        {imageDataList.map((img, index) => (
          <div key={index} className="relative">
            <img 
              src={img} 
              alt={`preview-${index}`} 
              className="
                w-[80px] h-[80px] object-cover rounded 
                border border-[#234487] ml-[7px] mb-[10px]" 
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="
                absolute top-[-6px] right-[-6px] bg-[#fce1e6] border 
                border-[#a24d61] text-[#a24d61] text-[10px] px-[4px] 
                rounded-full shadow-sm hover:text-red-500"
              title="Remove"
            >
              ✖
            </button>
        </div>
        ))}
      </div>

      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="
        w-[92%] h-[9rem] px-[4px] pt-[4px] mt-[20px] border-3 border-[#234487]
        rounded-[4px] bg-[#fff0f7] text-[#e48e9a] text-sm font-pixel 
        scale-x-[1] scale-y-[1.3] shadow-inner placeholder-[#e48e9a]"
      />

      <button 
        type="submit" 
        className="y2k-button mt-[25px]"
      >
        Share
      </button>
    </form>
  );
}