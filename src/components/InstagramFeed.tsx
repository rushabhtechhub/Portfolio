import React, { useState } from 'react';
import { instagramFeed } from '../data';
import { InstagramPost } from '../types';
import { Heart, MessageCircle, ExternalLink, Bookmark, Send, MoreHorizontal, Grid, Film, User, Check } from 'lucide-react';

export default function InstagramFeed() {
  const [feed, setFeed] = useState<InstagramPost[]>(instagramFeed);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [newComment, setNewComment] = useState('');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  // Toggle liking a post from the grid or inside modal
  const handleLike = (postId: string) => {
    const isLiked = likedPosts.includes(postId);
    setLikedPosts((prev) =>
      isLiked ? prev.filter((id) => id !== postId) : [...prev, postId]
    );

    setFeed((prevFeed) =>
      prevFeed.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );

    // Sync selected post if open
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          likes: isLiked ? prev.likes - 1 : prev.likes + 1,
        };
      });
    }
  };

  // Add comment inside modal in real-time
  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const freshComment = {
      username: 'anonymous_brand_owner',
      text: newComment.trim(),
      time: 'Just now',
    };

    setFeed((prevFeed) =>
      prevFeed.map((post) => {
        if (post.id === postId) {
          const currentComments = post.commentsList || [];
          return {
            ...post,
            comments: post.comments + 1,
            commentsList: [freshComment, ...currentComments],
          };
        }
        return post;
      })
    );

    // Sync selected post if open
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => {
        if (!prev) return null;
        const currentComments = prev.commentsList || [];
        return {
          ...prev,
          comments: prev.comments + 1,
          commentsList: [freshComment, ...currentComments],
        };
      });
    }

    setNewComment('');
  };

  const profilePic = 'https://raw.githubusercontent.com/vajirnathrushabh-hub/Portfolio/main/src/rushabh.png';
  const realInstaUrl = 'https://www.instagram.com/vajirnath007/';

  return (
    <section id="instagram" className="py-24 bg-brand-dark/95 border-t border-b border-white/5 relative overflow-hidden">
      {/* Abstract light effects */}
      <div className="absolute top-10 right-10 w-[400px] h-[400px] rounded-full bg-brand-pink/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-brand-pink flex items-center justify-center gap-1.5">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
            </svg>
            INSTAGRAM FEED
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mt-1 mb-3 uppercase italic tracking-tighter leading-[0.95]">
            Creative Portfolio on Instagram
          </h2>
          <p className="font-sans text-sm text-gray-400">
            A real-time snapshot of my visual storytelling style, audience growth hacks, and content layouts. Interact with the posts below!
          </p>
        </div>

        {/* Instagram Profile Card Header */}
        <div className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 mb-12 text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1.5 bg-brand-pink rounded-full opacity-70 blur-xs group-hover:opacity-100 transition-opacity" />
              <img
                src={profilePic}
                alt="Rushabh Profile Avatar"
                className="h-24 w-24 rounded-full object-cover border-4 border-brand-dark relative z-10 filter contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <h3 className="font-display font-bold text-xl text-white">vajirnath007</h3>
                  {/* Verified blue badge */}
                  <span className="h-5 w-5 rounded-full bg-[#0095f6] flex items-center justify-center shrink-0 shadow-sm" title="Verified Social Media Manager">
                    <Check className="h-3.5 w-3.5 text-white stroke-[4px]" />
                  </span>
                </div>

                {/* Profile Actions */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={realInstaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-lg bg-[#0095f6] hover:bg-[#1877f2] font-sans text-xs font-bold text-white transition-colors"
                  >
                    Follow
                  </a>
                  <a
                    href={`${realInstaUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 font-sans text-xs font-semibold text-white border border-white/10 transition-colors"
                  >
                    Message
                  </a>
                  <a
                    href="mailto:aarushgrup17@gmail.com"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white border border-white/10 transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>

              {/* Counts */}
              <div className="flex justify-center sm:justify-start gap-8 mb-6 text-sm">
                <div>
                  <strong className="text-white font-display">284</strong> <span className="text-gray-400 font-sans text-xs">posts</span>
                </div>
                <div>
                  <strong className="text-white font-display">42.4K</strong> <span className="text-gray-400 font-sans text-xs">followers</span>
                </div>
                <div>
                  <strong className="text-white font-display">812</strong> <span className="text-gray-400 font-sans text-xs">following</span>
                </div>
              </div>

              {/* Bio Details */}
              <div className="text-sm text-gray-300 space-y-1.5 leading-relaxed border-t border-white/5 pt-4">
                <p className="font-bold text-white">Rushabh Vajirnath | Digital Creator & Marketer</p>
                <p className="text-gray-400 text-xs">🚀 Social Media Manager • Creative Strategist • Web Architect</p>
                <p className="text-gray-400 text-xs">📈 Driving explosive brand engagement & multi-channel campaigns</p>
                <p className="text-gray-400 text-xs">📬 Collabs: <span className="text-brand-pink font-semibold">aarushgrup17@gmail.com</span></p>
                <a
                  href={realInstaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-pink mt-2 hover:underline"
                >
                  <span>instagram.com/vajirnath007</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Header for Feeds */}
        <div className="flex items-center justify-center gap-12 border-t border-white/5 mb-8">
          <button className="flex items-center gap-1.5 py-4 border-t-2 border-brand-pink text-white font-mono text-xs font-semibold uppercase tracking-widest focus:outline-none">
            <Grid className="h-4 w-4" />
            <span>POSTS</span>
          </button>
          <a
            href={realInstaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-4 text-gray-500 hover:text-white font-mono text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            <Film className="h-4 w-4" />
            <span>REELS</span>
          </a>
          <a
            href={realInstaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-4 text-gray-500 hover:text-white font-mono text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            <User className="h-4 w-4" />
            <span>TAGGED</span>
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {feed.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="relative aspect-square cursor-pointer rounded-xl overflow-hidden bg-brand-card group border border-white/5"
              >
                <img
                  src={post.image}
                  alt="Instagram post"
                  className="w-full h-full object-cover filter brightness-[0.93] transition-all duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Video/carousel indicator badges */}
                <div className="absolute top-3 right-3 text-white">
                  {post.type === 'video' && (
                    <div className="p-1.5 rounded-md bg-brand-dark/80 backdrop-blur" title="Video Reel">
                      <Film className="h-3.5 w-3.5" />
                    </div>
                  )}
                  {post.type === 'carousel' && (
                    <div className="p-1.5 rounded-md bg-brand-dark/80 backdrop-blur" title="Carousel Cards">
                      <Grid className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>

                {/* Hover stats overlay */}
                <div className="absolute inset-0 bg-brand-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2 text-white">
                    <Heart className={`h-5.5 w-5.5 ${isLiked ? 'fill-brand-pink text-brand-pink' : 'text-white'}`} />
                    <span className="font-display font-semibold text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <MessageCircle className="h-5.5 w-5.5" />
                    <span className="font-display font-semibold text-sm">{post.comments}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Immersive Instagram Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md">
            <div
              className="relative w-full max-w-4xl bg-brand-card rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row h-fit md:h-[550px] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Column: Visual Area */}
              <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative aspect-square md:aspect-auto">
                <img
                  src={selectedPost.image}
                  alt="Instagram active detail"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Click area to Like double-tap */}
                <div
                  className="absolute inset-0 cursor-pointer"
                  onDoubleClick={() => handleLike(selectedPost.id)}
                />

                {selectedPost.type === 'video' && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-brand-dark/85 rounded-full text-[10px] uppercase font-bold text-white tracking-widest backdrop-blur border border-white/10">
                    <span className="h-2 w-2 rounded-full bg-brand-pink animate-pulse" />
                    Video Reel Preview
                  </div>
                )}
              </div>

              {/* Right Column: Interaction Hub */}
              <div className="w-full md:w-2/5 flex flex-col h-full bg-brand-card text-left text-sm justify-between">
                <div>
                  {/* Insta Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={profilePic}
                        alt="Avatar inside post"
                        className="h-8 w-8 rounded-full object-cover border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <strong className="text-white text-xs font-semibold leading-none">vajirnath007</strong>
                          <span className="h-3.5 w-3.5 rounded-full bg-[#0095f6] flex items-center justify-center text-[8px] text-white">
                            <Check className="h-2 w-2 text-white stroke-[5px]" />
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500 font-sans">SMM & Creator</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Comments and Caption scroll box */}
                  <div className="p-4 overflow-y-auto h-[250px] md:h-[300px] space-y-4 border-b border-white/5">
                    {/* Caption Post */}
                    <div className="flex gap-2.5 items-start">
                      <img
                        src={profilePic}
                        alt="Caption avatar"
                        className="h-6 w-6 rounded-full object-cover border border-white/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          <strong className="text-white text-xs font-semibold mr-1.5">vajirnath007</strong>
                          {selectedPost.caption}
                        </p>
                        <span className="text-[9px] text-gray-500 mt-1 block uppercase tracking-wider">{selectedPost.timestamp}</span>
                      </div>
                    </div>

                    {/* Discussions */}
                    {selectedPost.commentsList && selectedPost.commentsList.length > 0 ? (
                      selectedPost.commentsList.map((comm, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start animate-fade-in">
                          <div className="h-6 w-6 rounded-full bg-brand-purple/20 text-brand-purple font-display font-bold text-[9px] flex items-center justify-center uppercase shrink-0">
                            {comm.username.substring(0, 2)}
                          </div>
                          <div>
                            <p className="text-xs text-gray-300 leading-relaxed">
                              <strong className="text-white text-xs font-semibold mr-1.5">{comm.username}</strong>
                              {comm.text}
                            </p>
                            <span className="text-[9px] text-gray-500 mt-1 block uppercase tracking-wider">{comm.time}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 italic py-4 text-center">No comments yet. Write one below!</p>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-white/2 shrink-0">
                  <div className="flex items-center justify-between mb-3 text-white">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(selectedPost.id)}
                        className="hover:scale-110 transition-transform focus:outline-none"
                      >
                        <Heart
                          className={`h-6 w-6 ${
                            likedPosts.includes(selectedPost.id) ? 'fill-brand-pink text-brand-pink' : 'text-gray-300'
                          }`}
                        />
                      </button>
                      <button className="hover:scale-110 transition-transform focus:outline-none">
                        <MessageCircle className="h-6 w-6 text-gray-300" />
                      </button>
                      <a href={realInstaUrl} target="_blank" rel="noopener noreferrer">
                        <Send className="h-5.5 w-5.5 text-gray-300 rotate-12 hover:text-brand-pink" />
                      </a>
                    </div>
                    <button className="text-gray-300 hover:text-white">
                      <Bookmark className="h-6 w-6" />
                    </button>
                  </div>

                  <strong className="text-white text-xs block mb-3 font-display">
                    {selectedPost.likes.toLocaleString()} likes
                  </strong>

                  {/* Interactive comment form */}
                  <form onSubmit={(e) => handleAddComment(e, selectedPost.id)} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/5 focus:border-brand-pink/30 rounded-lg px-3 py-1.5 font-sans text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="text-xs font-bold text-brand-pink hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      Post
                    </button>
                  </form>

                  {/* Direct Link to insta */}
                  <div className="flex justify-end mt-4 pt-3 border-t border-white/5">
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="text-xs text-gray-500 hover:text-white mr-4"
                    >
                      Close Feed
                    </button>
                    <a
                      href={realInstaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-pink font-semibold flex items-center gap-1.5 hover:underline"
                    >
                      <span>Open on Instagram</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
