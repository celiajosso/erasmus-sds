const SelectedFilters = ({ selectedCategories, removeCategory }) => {
  if (selectedCategories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {selectedCategories.map((cat) => (
        <div
          key={cat}
          className="badge badge-outline badge-lg flex items-center gap-2 px-3 py-1"
        >
          {cat}
          <button
            className="ml-1 text-red-500 hover:text-red-700"
            onClick={() => removeCategory(cat)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedFilters;
