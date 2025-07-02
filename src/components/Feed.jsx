import React, { useState } from "react";

export default function Feed({ posts, onDelete, originalPosts }) {
  const [expandedPosts, setExpandedPosts] = useState({});

  // Expand posts
  const toggleExpand = (index) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="h-full overflow-y-auto break-words w-[105%] pl-[8px]">
      {posts.map((post, index) => (
        <div 
          key={index} 
          className="
            border-b border-[#234487] mt-[5px] mb-[5px] flex 
            flex-col gap-2 w-[90%] px-[4px] pb-[10px] overflow-hidden"
        >
          {/* Delete button */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                const confirmed = window.confirm("Are you sure you want to delete this post?");
                if (confirmed) {
                  const originalIndex = originalPosts.findIndex(
                    (p) =>
                      p.caption === post.caption &&
                      p.createdAt === post.createdAt
                  );
                  onDelete(originalIndex);
                }
              }}
              className="delete-button mt-[2px] mb-[5px] scale-y-[1.2]"
            >
              ✖
            </button>
          </div>
          
          {/* Post images if any */}
          {post.images?.length > 0 && Array.isArray(post.images) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.images.map((img, imgIndex) => (
                <img
                  key={imgIndex}
                  src={img}
                  alt={`Uploaded ${imgIndex}`}
                  className="w-[100px] h-[100px] object-cover rounded border border-[#234487]"
                />
              ))}
            </div>
          )}

          {/* Post caption */}
          {typeof post.caption === "string" && post.caption.trim() !== "" && (
            <div className="
              relative w-[95%] text-[#234487] text-[10px] whitespace-pre-wrap mt-[6px] mb-[8px]">
              <div
                className={
                  `transition-all duration-300 ease-in-out overflow-hidden px-2 
                  py-2 bg-[#d0f0ff] rounded-[4px] 
                ${expandedPosts[index] ? "max-h-[1000px]" : "max-h-[90px]"}`}
                style={{ lineHeight: "1.25", minHeight: "50px" }}
              >
                {post.caption}
              </div>
              {/* if caption too long, condense it down */}
              {post.caption.length > 300 && (
                <button
                  onClick={() => toggleExpand(index)}
                  className="
                    absolute bottom-[4px] right-[6px] scale-y-[1.3] text-[#a24d61] 
                    bg-transparent border-none underline text-[5px] pt-[5px] cursor-pointer"
                >
                  {expandedPosts[index] ? "See less" : "See more"}
                </button>
              )}
            </div>
          )}

          {/* Date */}
          {post.createdAt && (
            <p className="
                text-xs text-[#a24d61] text-left text-[7px] mt-[20px] 
                ml-[5px] scale-y-[1.4]">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}