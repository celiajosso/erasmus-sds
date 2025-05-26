"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Header from './general/Header';

export function PlannerForm({
  className,
}) {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: new Date(),
  })
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cityName, setCityName] = useState('Poznań');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const location = useLocation();

  // Handle the search button click and update URL with search filters
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (cityName) params.append('name', cityName);
    selectedCategories.forEach(cat => params.append('category', cat));

    navigate({ search: params.toString() });  // Use navigate to update the URL with new search filters
  };

  const handleToggleCategory = (category) => {
  setSelectedCategories((prevSelected) =>
    prevSelected.includes(category)
      ? prevSelected.filter((c) => c !== category)
      : [...prevSelected, category]
    );
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // Fetch all places and categories on initial load
  useEffect(() => {

    // Read the search parameters from the URL
    const params = new URLSearchParams(location.search);
    const nameParam = params.get('name');
    const categoriesParam = params.getAll('category');

    if (nameParam) setCityName(nameParam);
    if (categoriesParam.length) setSelectedCategories(categoriesParam);

    // Fetch places (with or without filters)
    const fetchPlaces = async () => {
      try {
        const result = await axios.get(`${apiUrl}/api/places`, { params });
        const allCategories = [...new Set(result.data.places.map(p => p.category))];
        setCategories(allCategories);
      } catch (err) {
        console.error("Failed to fetch places:", err);
      }
    };
    fetchPlaces();
  }, [apiUrl, location.search]);

  return (
    <div className={cn("p-6 space-y-6 text-white", className)}>
      <Header
        title="🗓️ Plan Your Trip"
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

    

      <div className="space-y-4 max-w-[400px] mx-auto">
        <Label className="text-lg">City</Label>
        <Input
          id="city"
          name="city"
          // placeholder="Enter a city"
          value={cityName}
          // onChange={(e) => setCityName(e.target.value)}
          className="text-white cursor-not-allowed"
          disabled
        />
        <br/>

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
        <br/>

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
          <br/>     

        <Label className="text-lg">Select date range</Label><br />
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
        </Popover><br/><br/>
          
        <Button className="block mx-auto" onClick={handleSearch} >
          Search
        </Button>
      </div>
    </div>
  )
}
