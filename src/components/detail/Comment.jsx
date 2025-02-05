const Comment = () => {
  return (
    <div className=" p-8 ">
      <h2 className="text-lg font-bold mb-4">Comments</h2>
      <div className="flex flex-col space-y-4">
        <div className=" dark:bg-slate-500 bg-gray-200 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">John Doe</h3>
          <p className="text-gray-700  dark:text-slate-100 text-sm mb-2">
            April 17, 2024
          </p>
          <p className="text-gray-700  dark:text-slate-100">
            Indomie Beef makanan favoritku aku sangat suka
          </p>
        </div>

        <form className=" dark:bg-slate-500 bg-gray-200 p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-slate-100 font-bold mb-2"
              htmlFor="comment">
              Ulasan
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  dark:text-slate-100 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              rows="3"
              placeholder="Masukan Ulasan mu"></textarea>
          </div>
          <button
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
