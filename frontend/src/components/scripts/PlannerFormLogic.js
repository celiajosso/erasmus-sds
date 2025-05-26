import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"

export function usePlannerFormLogic() {
  const [date, setDate] = useState({ from: new Date(), to: new Date() })
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [cityName, setCityName] = useState("Poznań")
  const [budget, setBudget] = useState("")
  const [currency, setCurrency] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const apiUrl = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const location = useLocation()

  const handleToggleCategory = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    )
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (cityName) params.append("name", cityName)
    selectedCategories.forEach((cat) => params.append("category", cat))
    navigate({ search: params.toString() })
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const nameParam = params.get("name")
    const categoriesParam = params.getAll("category")

    if (nameParam) setCityName(nameParam)
    if (categoriesParam.length) setSelectedCategories(categoriesParam)

    const fetchPlaces = async () => {
      try {
        const result = await axios.get(`${apiUrl}/api/places`, { params })
        const allCategories = [
          ...new Set(result.data.places.map((p) => p.category)),
        ]
        setCategories(allCategories)
      } catch (err) {
        console.error("Failed to fetch places:", err)
      }
    }

    fetchPlaces()
  }, [apiUrl, location.search])

  return {
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
  }
}
