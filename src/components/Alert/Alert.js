import { createPortal } from 'react-dom';
import classes from './Alert.module.scss';
import { useEffect, useState } from 'react';


function Alert({type, message, handleCloseAlertBox}) {
    const [isClosing, setIsClosing] = useState(false);
    const [progress, setProgress] = useState(0);
    const duration = 4000;
    
    useEffect(() => {
        if(progress < 100 && !isClosing) {
            const interval = setInterval(() => {
                setProgress((prevValue) => prevValue + 100 / (duration / 100));
            }, 100);

            return () => clearInterval(interval);
        } else if (progress >= 100 && !isClosing) {
            handleClose();
        }
    }, [progress, isClosing, duration]);

    function handleClose() {
        setIsClosing(true);
        setTimeout(() => {
            handleCloseAlertBox();
        }, 500);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);
        return () => clearTimeout(timer);
    })

    return createPortal(
        <div onClick={handleClose} className={`${classes.alert} ${classes[type]} ${isClosing ? classes.fadeOut : classes.fadeIn}`}>
            <span> {message} </span>
        </div>, document.getElementById('modal')
    )
}

export default Alert;