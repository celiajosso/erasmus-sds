import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const BudgetInput = ({ budget, setBudget, currency, setCurrency }) => {
  return (
    <div className="pb-4">
      <Label className="text-lg">Budget</Label>
      <div className="flex items-center gap-2 mt-4">
        <Input
          type="number"
          min="0"
          name="budget"
          id="budget"
          placeholder="Enter a budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="text-gray-800 dark:text-white border border-gray-800 shadow-md"
        />
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currencies</SelectLabel>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="pln">PLN</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BudgetInput;
