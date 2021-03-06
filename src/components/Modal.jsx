import { useEffect } from "react" 
import { createPortal } from "react-dom"

function Modal({switcher, modalImage}) {

    useEffect(() => {
        window.addEventListener("keydown", onEscClick)
        return () => { 
            window.removeEventListener("keydown", onEscClick)
        }
    })

    const onEscClick = (e) => {
        if (e.key === "Escape") {
            switcher()
        }
    }
        
    const handleClose = (e) => {
        if (e.currentTarget === e.target) { 
            switcher()
        }
    }

        return createPortal(
            <div className="Overlay" onClick={handleClose}>
                <div className="Modal">
                    <img className="modalImage" src={modalImage} alt='' />
                </div>
            </div>,
            document.getElementById('modalRoot')
        )
}

export  {Modal}