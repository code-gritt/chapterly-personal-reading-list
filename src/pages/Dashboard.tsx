import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { useBookStore } from "../stores/bookStore";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

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
    editBook,
    deleteBook,
    loading: bookLoading,
    error: bookError,
  } = useBookStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleEditBook = (book: {
    id: string;
    title: string;
    author: string;
  }) => {
    setEditBookId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setIsEditModalOpen(true);
  };

  const handleConfirmEdit = async () => {
    if (editBookId && editTitle && editAuthor && token) {
      await editBook(editBookId, editTitle, editAuthor, token);
      await fetchMe(token); // Update credits
      setIsEditModalOpen(false);
      setEditBookId(null);
      setEditTitle("");
      setEditAuthor("");
    }
  };

  const handleDeleteBook = (id: string) => {
    setDeleteBookId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteBookId && token) {
      await deleteBook(deleteBookId, token);
      await fetchMe(token); // Update credits
      setIsDeleteModalOpen(false);
      setDeleteBookId(null);
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
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleConfirmEdit}
        title="Edit Book"
        message="Update the book details below."
        confirmText="Save"
      >
        <input
          type="text"
          placeholder="Title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="mb-4 w-full rounded-lg border border-white/20 bg-black/50 p-3 text-white focus:border-[#9560EB] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Author"
          value={editAuthor}
          onChange={(e) => setEditAuthor(e.target.value)}
          className="mb-4 w-full rounded-lg border border-white/20 bg-black/50 p-3 text-white focus:border-[#9560EB] focus:outline-none"
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        confirmText="Delete"
      />
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
                  <div className="mt-2 flex gap-2">
                    {!book.completed && (
                      <button
                        onClick={() => handleMarkComplete(book.id)}
                        disabled={bookLoading}
                        className="rounded-lg bg-[#9560EB] px-4 py-2 font-medium text-white hover:bg-[#6B46C1] disabled:opacity-50"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleEditBook(book)}
                      disabled={bookLoading}
                      className="rounded-lg bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600 disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      disabled={bookLoading}
                      className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
