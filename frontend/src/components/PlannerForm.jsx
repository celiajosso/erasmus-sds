import { usePlannerFormLogic } from "./scripts/PlannerFormLogic";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import Header from "./general/Header";
import GoBack from "./general/GoBack";

import CategorySelector from "./pages/TravelPlannerForm/CategorySelector";
import BudgetInput from "./pages/TravelPlannerForm/BudgetInput";
import DateRangePicker from "./pages/TravelPlannerForm/DateRangePicker";

export function PlannerForm() {
  const {
    date,
    setDate,
    categories,
    selectedCategories,
    handleToggleCategory,
    cityName,
    budget,
    setBudget,
    currency,
    setCurrency,
    isMenuOpen,
    setIsMenuOpen,
    handleSearch,
  } = usePlannerFormLogic();

  return (
    <div className="p-6">
      <Header
        title="🗓️ Plan My Trip"
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <GoBack />

      <div className="space-y-4 max-w-[400px] mx-auto">
        <Label className="text-lg">City</Label>
        <Input
          id="city"
          name="city"
          value={cityName}
          className="text-white cursor-not-allowed"
          disabled
        />

        <CategorySelector
          categories={categories}
          selectedCategories={selectedCategories}
          onToggle={handleToggleCategory}
        />

        <BudgetInput
          budget={budget}
          setBudget={setBudget}
          currency={currency}
          setCurrency={setCurrency}
        />

        <DateRangePicker date={date} setDate={setDate} />

        <Button className="block mx-auto" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}

export default PlannerForm;
