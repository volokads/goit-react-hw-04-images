import { useState, useEffect } from "react";
// import Loader from 'react-loader-spinner'
import axios from "axios";
import ImageGalleryItem from "./ImageGalleryItem";
import Button from './Button'
import { Modal } from "./Modal"

let tryPage = 1

function ImageGallery({ searchValue}) { 

    const [listItems, setListItem] = useState([])
    const [status, setStatus] = useState('idle')
    const [showModal, setShowModal] = useState(false)
    // const [tryPage, setTryPage] = useState(1)
    const [modalImage, setModalImage] = useState('')

    useEffect(() => { 
        if (!searchValue) { 
            return
        }
        setStatus("pending")
        tryPage = 1
        setTimeout(() => axios(`https://pixabay.com/api/?q=${searchValue}&page=${tryPage}&key=23569558-943bf7c3d65c4197ad4bffe73&image_type=photo&orientation=horizontal&per_page=12`)
        .then(list => list.data.hits)
        .then(hits =>
            setListItem(hits),
            setStatus('resolved')
        )
        // .then(console.log))
        , 1000)
    }, [ searchValue])

    const nextPage = () => {
        tryPage += 1 
        axios(`https://pixabay.com/api/?q=${searchValue}&page=${tryPage}&key=23569558-943bf7c3d65c4197ad4bffe73&image_type=photo&orientation=horizontal&per_page=12`)
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
        console.log(e.target.dataset.source);
        console.log(modalImage);
        setModalImage(e.target.dataset.source)
    }
    
    if (status === 'idle') { 
        return (
            <div></div>
        )
    }
    if (status === 'pending') {
        return(<div>Wait a little</div>)
    }
    if (status === 'resolved') {
        return (
            <>
                <ul className="ImageGallery">
                    {listItems.map(item => {
                        return (
                            <ImageGalleryItem
                                key={item.id}
                                img={item.webformatURL}
                                largeImage={item.largeImageURL}
                                alt={item.tags}
                                id={item.id}
                                onClick={onPicClick}
                                openModal={toggleModal}
                            />
                        )
                    })}
                </ul>
                <Button loadMore={nextPage} />
                {showModal && (
                    <Modal switcher={toggleModal}>
                        <img className="modalImage" src={modalImage} alt='' />
                    </Modal>
                )}
            </>
        )
    }
    
}
export {ImageGallery}




