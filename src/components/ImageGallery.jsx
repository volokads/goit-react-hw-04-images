import { useState, useEffect } from "react";
import {BallTriangle} from 'react-loader-spinner'
import ImageGalleryItem from "./ImageGalleryItem";
import Button from './Button'
import { Modal } from "./Modal"


function ImageGallery({
    status,
    listItems,
    onPicClick,
    toggleModal,
    nextPage,
    showModal,
    modalImage }) { 

    
    if (status === 'idle') { 
        return (
            <div></div>
        )
    }
    if (status === "pending") { 
            return <BallTriangle
                        color="#00BFFF"
                        height={80}
                        width={80}
                        timeout={1000} //1 secs
                    />
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
                    <Modal switcher={toggleModal} modalImage={modalImage}/>
                    
                )}
            </>
        )
    }
    
}
export {ImageGallery}




