import './App.css';
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Searchbar } from './components/Searchbar.jsx'
import {ImageGallery} from './components/ImageGallery.jsx'
function App() {
 
  const [value, setValue] = useState('')
  
  const handleFormSearch = (value) => {
    setValue(value)
  }

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSearch} />
        <ImageGallery searchValue={ value }/>
        <ToastContainer autoClose={2000}/>
    </div>
  );
}

export default App;
