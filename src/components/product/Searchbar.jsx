/* eslint-disable react/prop-types */

export default function Searchbar({ searchproduk, setsearchproduk }) {
  return (
    <div className="flex items-center w-full justify-center mb-8">
      <div className="relative w-1/2">
        <input
          className="appearance-none border-2 w-full pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md py-2 px-3 text-gray-800 dark:text-white leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
          type="text"
          placeholder="Cari barang..."
          value={searchproduk}
          onChange={(e) => setsearchproduk(e.target.value)}
        />
        <div className="absolute left-0 inset-y-0 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
