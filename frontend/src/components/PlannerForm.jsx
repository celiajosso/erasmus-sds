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




export function PlannerForm({
  className,
}) {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: new Date(),
  })
    const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cityName, setCityName] = useState('');
  const [budget, setBudget] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const location = useLocation();

  // Fetch all places and categories on initial load
  useEffect(() => {
    setLoading(true);

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
        setPlaces(result.data.places);
        const allCategories = [...new Set(result.data.places.map(p => p.category))];
        setCategories(allCategories);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch places:", err);
        setLoading(false);
      }
    };
    
    fetchPlaces();

    
  }, [apiUrl, location.search]);

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
    setLoading(true);

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
        setPlaces(result.data.places);
        const allCategories = [...new Set(result.data.places.map(p => p.category))];
        setCategories(allCategories);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch places:", err);
        setLoading(false);
      }
    };
    
    fetchPlaces();

   
  }, [apiUrl, location.search]);

  return (
    <div className={cn("p-6 space-y-6 text-white", className)}>
      <div className="flex items-center justify-between mb-12">

      <h1 className="text-4xl font-bold text-center text-white flex-1">🗓️ Plan Your Trip</h1>

      <div className="relative">
                <button
                  className="btn btn-circle btn-secondary"
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                >
                  ☰
                </button>
                {isMenuOpen && ( 
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                    <ul className="py-2">
                      <li>
                        <Link
                          to={`/favorites`}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Favorites
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/playlists`}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Playlists
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/planner`}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Planner
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/`}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Home
                        </Link>
                      </li>
                     
                    </ul> 
      
                  </div>
                )} </div>
                </div>

      <div className="space-y-4 max-w-[400px] mx-auto">
        <Label className="text-lg">City</Label>
        <Input
          id="city"
          placeholder="Enter a city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className="text-white"
        />
        <br/>

        <Label className="text-lg">Select categories</Label>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
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
          id="budget"
          placeholder="Enter a budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="text-white"
        />

        <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select a currency" />
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
              id="date"
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
              numberOfMonths={1}
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
