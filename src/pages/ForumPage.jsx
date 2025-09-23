import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const ForumPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My chicks have suddenly gotten so noisy — normal or something wrong?",
      author: "Admin",
      replies: [
        { id: 1, text: "Totally normal! Mine did the same at 2 weeks. Check their temperature and make sure they’re not hungry or bored.", author: "FeatherMom", votes: 5 },
        { id: 2, text: "Mine freaked out when I changed their light setup. Maybe it’s that?", author: "ChickDad88", votes: 3 }
      ]
    },
    {
      id: 2,
      title: "When can I move my chicks to the coop?",
      author: "CoopBuilder22",
      replies: [
        { id: 1, text: "Usually once they’re fully feathered, around 5–6 weeks. Just make sure the night temps aren’t too low.", author: "HenTalk", votes: 4 },
        { id: 2, text: "I started taking mine out during the day at 4 weeks, then full time at 6 weeks.", author: "FeatherMom", votes: 2 }
      ]
    },
    {
      id: 3,
      title: "Is it okay to handle my chicks daily?",
      author: "PoultryNewbie94",
      replies: [
        { id: 1, text: "Yes! Just be gentle and don’t overdo it. It actually helps them get used to you.", author: "Admin", votes: 6 },
        { id: 2, text: "Mine love it now and come running when they see me.", author: "CoopBuilder22", votes: 2 }
      ]
    },
    {
      id: 4,
      title: "Why is one chick pecking the others?",
      author: "FarmGirl_Jess",
      replies: [
        { id: 1, text: "Could be overcrowding or boredom. Try giving them more space or things to peck (like a cabbage or mirror).", author: "HenTalk", votes: 7 },
        { id: 2, text: "Watch closely — if one’s getting bullied, you may need to separate for a bit.", author: "FeatherMom", votes: 3 }
      ]
    },
    {
      id: 5,
      title: "What do you feed 3-week-old chicks?",
      author: "SunnySideUp",
      replies: [
        { id: 1, text: "Starter feed is still perfect at that age. Add a bit of chick grit if you’re giving treats.", author: "Admin", votes: 4 },
        { id: 2, text: "Mine love scrambled eggs as a treat (weird, but true).", author: "Bob", votes: 2 }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [newReply, setNewReply] = useState({});
  const [expandedPostId, setExpandedPostId] = useState(null);

  // Add new post
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const newEntry = {
      id: Date.now(),
      title: newPost,
      author: "Guest",
      replies: [],
    };
    setPosts([newEntry, ...posts]);
    setNewPost("");
  };

  // Add reply to post
  const handleAddReply = (postId, e) => {
    e.preventDefault();
    if (!newReply[postId]?.trim()) return;
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            replies: [
              ...post.replies,
              {
                id: Date.now(),
                text: newReply[postId],
                author: "Guest",
                votes: 0,
              },
            ],
          }
        : post
    );
    setPosts(updatedPosts);
    setNewReply({ ...newReply, [postId]: "" });
  };

  // Handle upvote/downvote
  const handleVote = (postId, replyId, type) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            replies: post.replies.map((reply) =>
              reply.id === replyId
                ? {
                    ...reply,
                    votes: type === "up" ? reply.votes + 1 : Math.max(0, reply.votes - 1),
                  }
                : reply
            ),
          }
        : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Community Forum
        </h1>

        {/* New Post Form */}
        <form
          onSubmit={handleAddPost}
          className="bg-white shadow-md rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Start a Discussion</h2>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Post
          </button>
        </form>

        {/* Posts List */}
        <div className="bg-white shadow-md rounded-lg divide-y">
          {posts.map((post) => (
            <div key={post.id}>
              {/* Thread Header */}
              <div
                className="flex justify-between items-center p-4 hover:bg-gray-50 transition cursor-pointer"
                onClick={() =>
                  setExpandedPostId(expandedPostId === post.id ? null : post.id)
                }
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    By {post.author} • {post.replies.length} replies
                  </p>
                </div>
                <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                  {post.replies.length}
                </span>
              </div>

              {/* Expanded Thread Content */}
              {expandedPostId === post.id && (
                <div className="p-4 bg-gray-50 border-t">
                  {/* Replies */}
                  <div className="space-y-4">
                    {post.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-gray-800">{reply.text}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            — {reply.author}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                            onClick={() =>
                              handleVote(post.id, reply.id, "up")
                            }
                          >
                            ▲
                          </button>
                          <span>{reply.votes}</span>
                          <button
                            className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            onClick={() =>
                              handleVote(post.id, reply.id, "down")
                            }
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Form */}
                  <form
                    onSubmit={(e) => handleAddReply(post.id, e)}
                    className="mt-4"
                  >
                    <textarea
                      value={newReply[post.id] || ""}
                      onChange={(e) =>
                        setNewReply({ ...newReply, [post.id]: e.target.value })
                      }
                      placeholder="Write a reply..."
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="2"
                    />
                    <button
                      type="submit"
                      className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Reply
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForumPage;
