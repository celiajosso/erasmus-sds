import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";

const CategorySelector = ({ categories, selectedCategories, onToggle }) => {
  return (
    <div>
      <Label className="text-lg">Select categories</Label>
      <div className="flex flex-wrap gap-4 mt-4">
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <Checkbox
              id={category}
              name={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onToggle(category)}
            />
            <Label htmlFor={category}>{category}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
