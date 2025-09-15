import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { useBookStore } from "../stores/bookStore";
import Loader from "../components/Loader";

export default function Dashboard() {
  const { user, token } = useAuthStore();
  const {
    user: userData,
    fetchMe,
    loading: userLoading,
    error: userError,
  } = useUserStore();
  const {
    books,
    addBook,
    fetchBooks,
    markBookComplete,
    loading: bookLoading,
    error: bookError,
  } = useBookStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    } else {
      fetchMe(token);
      fetchBooks(token);
    }
  }, [user, token, navigate, fetchMe, fetchBooks]);

  const handleAddBook = async () => {
    if (title && author && token) {
      await addBook(title, author, token);
      await fetchMe(token); // Update credits
      setTitle("");
      setAuthor("");
    }
  };

  const handleMarkComplete = async (id: string) => {
    if (token) {
      await markBookComplete(id, token);
      await fetchMe(token); // Update credits
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <Loader isLoading={userLoading || bookLoading} />
      <div className="container mx-auto">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Welcome to Your Dashboard
        </h2>
        {(userError || bookError) && (
          <p className="mb-4 text-center text-red-400">
            {userError || bookError}
          </p>
        )}
        {userData && (
          <div className="mx-auto mb-8 max-w-md rounded-lg bg-white/10 p-6 backdrop-blur-md">
            <p className="text-lg text-white">Username: {userData.username}</p>
            <p className="text-lg text-white">Credits: {userData.credits}</p>
          </div>
        )}
        <div className="mx-auto max-w-md rounded-lg bg-white/10 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-xl font-bold text-white">Add a Book</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full rounded-lg border border-white/20 bg-black/50 p-3 text-white focus:border-[#9560EB] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mb-4 w-full rounded-lg border border-white/20 bg-black/50 p-3 text-white focus:border-[#9560EB] focus:outline-none"
          />
          <button
            onClick={handleAddBook}
            disabled={bookLoading || !title || !author}
            className="w-full rounded-lg bg-[#9560EB] p-3 font-medium text-white hover:bg-[#6B46C1] disabled:opacity-50"
          >
            Add Book
          </button>
        </div>
        <div className="mt-8">
          <h3 className="mb-4 text-center text-xl font-bold text-white">
            Your Books
          </h3>
          {books.length === 0 ? (
            <p className="text-center text-white/70">No books added yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="rounded-lg bg-white/10 p-4 backdrop-blur-md"
                >
                  <p className="text-lg text-white">{book.title}</p>
                  <p className="text-white/70">{book.author}</p>
                  <p className="text-white/70">
                    Status: {book.completed ? "Completed" : "Not Completed"}
                  </p>
                  {!book.completed && (
                    <button
                      onClick={() => handleMarkComplete(book.id)}
                      disabled={bookLoading}
                      className="mt-2 rounded-lg bg-[#9560EB] px-4 py-2 font-medium text-white hover:bg-[#6B46C1] disabled:opacity-50"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
