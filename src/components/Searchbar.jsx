import { useState } from "react"
// import  axios from "axios" 
import { toast } from "react-toastify"

function Searchbar({ onSubmit})  {

    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.currentTarget.value.toLowerCase())
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (value.trim() === '') {
            return toast.error('search is empty')
        }
        onSubmit(value)
        setValue('')
    }

    return (
        <div className="Searchbar">
        <form className="SearchForm" onSubmit={handleSearch}>
            <button className="SearchForm-button" type="submit">
                <span className="SearchForm-button-label">Search</span>
            </button>
            <input
                className="SearchForm-input"
                name="search"
                type="text"
                placeholder="Search images and photos"
                onChange={handleChange}
                value={value}>
            </input>
        </form>
        </div>
    )
}
export { Searchbar }