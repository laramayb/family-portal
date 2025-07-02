import { useState } from 'react';
import { useEffect } from "react";
import Login from './components/Login';
import Feed from './components/Feed';
import Post from "./components/Post";
import Header from "./components/Header";
import Events from "./components/Events";
import frame from './assets/frame.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("familyPosts");
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [postFilter, setPostFilter] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("familyPosts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const deletePost = (indexToRemove) => {
    setPosts(posts.filter((_, i) => i !== indexToRemove));
  };

  // Filter posts
  let filteredPosts = [...posts];

  if (postFilter === "newest") {
    filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (postFilter === "oldest") {
    filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (postFilter === "images") {
    filteredPosts = filteredPosts.filter((post) => 
      Array.isArray(post.images) && post.images.length > 0);
  } else if (postFilter === "text") {
    filteredPosts = filteredPosts.filter((post) => 
      !Array.isArray(post.images) || post.images.length === 0);
  }

  // Search through posts
  if (searchTerm.trim() !== "") {
    filteredPosts = filteredPosts.filter((post) =>
      post.caption.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  return (
    <div 
      className="
        min-h-screen bg-[#f6cdd9] px-4 py-6 
        font-pixel text-black space-y-6"
    >
      {isLoggedIn ? (
        <div
          className="relative w-full max-w-[700px] mx-auto"
          style={{
            backgroundImage: `url(${frame})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            imageRendering: 'pixelated',
            padding: '3rem 2rem',
            height: '700px',
          }}
        >
          {/* Title bar */}
          <div className="absolute mt-[75px] mb-[55px] mr-[150px]">
            <Header />
          </div>

          {/* TOOL BAR (NewPost/Feed / Filter / Search) */}
          <div className="
            flex whitespace-nowrap items-center gap-[12px]
            mt-[165px] ml-[30px]"
          >
            {/* FEED/NEW POST Toggle Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="
                self-end bg-[#f9e190] hover:bg-[#ffc6f2] 
                text-[#234487] border-2 border-[#234487] 
                rounded-[6px] px-3 py-[2px] mb-2 font-pixel scale-y-[1.3]"
            >
              {showForm ? "📖 Feed" : "📝 New Post"}
            </button>

          {/* FILTER button */}
            <select
              value={postFilter}
              onChange={(e) => setPostFilter(e.target.value)}
              className="
                bg-[#d0f0ff] text-[#234487] border-2 border-[#234487] 
                rounded-[6px] px-2 py-[2px] font-pixel scale-y-[1.3]"
            >
              <option value="newest">🆕 Newest</option>
              <option value="oldest">⏮️ Oldest</option>
              <option value="images">🖼️ Images Only</option>
              <option value="text">💬 Text Only</option>
            </select>

            {/* SEARCH bar */}
            <input
              type="text"
              placeholder="Search text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                bg-[#fff0f7] text-[#547ccc] border-2 border-[#234487] 
                rounded-[6px] px-[10px] pr-[67px] font-pixel text-sm 
                scale-y-[1.3] h-[20px] placeholder-[#e48e9a]"
            />
          </div>

          {/* 2 section layout inside frame */}
          <div 
            className="absolute top-[250px] left-[2rem] right-[2rem] flex gap-5px]"
            style={{
              height: '400px',
            }}
          >

            {/* LEFT: post form + feed */}
            <div
              className="
                w-[60%] h-full ml-[30px] flex flex-col 
                border-[4px] border-[#234487] rounded-[6px] 
                bg-[#d0f0ff] shadow-[4px_4px_0_#1e3a8a] overflow-hidden"
            >

              {/* Toggle Conditional: Post Form OR Feed */}
              {showForm ? (
                // POST FORM 
                <div className="p-4 flex-1 overflow-auto">
                  <Post onPost={addPost} />
                </div>
              ) : (
                // FEED
                <div className="flex-1 overflow-auto px-4 pb-4">
                  <Feed 
                    posts={filteredPosts} 
                    onDelete={deletePost} 
                    originalPosts={posts}
                  />
                </div>
              )}
            </div>

            {/* RIGHT: Upcoming Events */}
            <div 
              className="
                w-[40%] mx-[30px] border-4 border-[#234487] 
                bg-[#fcf3d9] rounded-[6px] shadow-[6px_6px_0_#1e3a8a] 
                font-pixel text-center"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              
              <div
                className="scale-y-[1.3] mb-[2px] pt-[12px] pb-[12px] text-[#234487]">
                <Events />
              </div>
        
            </div>
          </div>
        </div>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;