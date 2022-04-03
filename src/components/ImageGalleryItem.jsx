function ImageGalleryItem({ openModal, id, img, alt, largeImage, onClick }) {
    function onLiClick(e) { 
        openModal()
        onClick(e)
    }
    return (
        <li id={id} key={id} onClick={onLiClick} className='ImageGalleryItem'>
            <img
                className="ImageGalleryItem-image"
                src={img}
                alt={alt}
                data-source={largeImage} />
        </li>
    )
}
export default ImageGalleryItem