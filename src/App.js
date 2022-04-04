import './App.css';
import { useState, useEffect } from 'react'
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Searchbar } from './components/Searchbar.jsx'
import { ImageGallery } from './components/ImageGallery.jsx'

let tryPage = 1
function App() {
 
  const [value, setValue] = useState('')
  const [listItems, setListItem] = useState([])
  const [status, setStatus] = useState('idle')
  const [showModal, setShowModal] = useState(false)
  const [modalImage, setModalImage] = useState('')

  useEffect(() => { 
    if (!value) { 
        return
    }
    setStatus("pending")
    tryPage = 1
    setTimeout(() => axios(`https://pixabay.com/api/?q=${value}&page=${tryPage}&key=23569558-943bf7c3d65c4197ad4bffe73&image_type=photo&orientation=horizontal&per_page=12`)
    .then(list => list.data.hits)
    .then(hits =>
        setListItem(hits),
        setStatus('resolved')
    )
    // .then(console.log))
    , 1000)
  }, [ value])

  const nextPage = () => {
    tryPage += 1 
    axios(`https://pixabay.com/api/?q=${value}&page=${tryPage}&key=23569558-943bf7c3d65c4197ad4bffe73&image_type=photo&orientation=horizontal&per_page=12`)
        .then(list => list.data.hits)
        .then(hits => setListItem([...listItems, ...hits]))
    
    window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
    });
  }


  const toggleModal = () => { 
      setShowModal(!showModal)
  }

  const onPicClick = (e) => { 
      setModalImage(e.target.dataset.source)
  }
  

  const handleFormSearch = (value) => {
    setValue(value)
  }

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSearch} />
      <ImageGallery
        listItems={listItems}
        status={status}
        toggleModal={toggleModal}
        onPicClick={onPicClick}
        modalImage={modalImage}
        showModal={showModal}
        nextPage={nextPage}
      />
        <ToastContainer autoClose={2000}/>
    </div>
  );
}

export default App;
