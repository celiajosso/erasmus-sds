import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import Header from "./general/Header";
import GoBack from "./general/GoBack";

import { usePlannerFormLogic } from "./scripts/PlannerFormLogic";

export function PlannerForm() {
  const {
    date,
    setDate,
    categories,
    selectedCategories,
    handleToggleCategory,
    cityName,
    setCityName,
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
        <br />

        <Label className="text-lg">Select categories</Label>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                name={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleToggleCategory(category)}
              />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
        </div>
        <br />

        <Label className="text-lg">Budget</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="0"
            name="budget"
            id="budget"
            placeholder="Enter a budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="text-white"
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
        <br />

        <Label className="text-lg">Select date range</Label>
        <br />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal bg-transparent text-white",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <br />
        <br />

        <Button className="block mx-auto" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}
