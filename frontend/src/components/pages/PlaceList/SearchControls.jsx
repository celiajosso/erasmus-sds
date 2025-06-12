const SearchControls = ({
  searchName,
  setSearchName,
  categories,
  selectedCategories,
  addCategory,
  handleSearch,
  clearFilters,
}) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 justify-center items-center">
      <input
        type="text"
        placeholder="Search by name..."
        className="w-full sm:w-64 shadow-md border border-gray-500 rounded px-3 py-2"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <select
        className="w-full sm:w-64 shadow-md border border-gray-500 rounded px-3 py-2"
        onChange={(e) => {
          const selected = e.target.value;
          if (selected) addCategory(selected);
          e.target.value = "";
        }}
      >
        <option value="">Add Category Filter</option>
        {categories
          .filter((cat) => !selectedCategories.includes(cat))
          .map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
      </select>

      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>

      <button className="btn btn-outline" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default SearchControls;
