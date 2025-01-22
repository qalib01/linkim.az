import { createPortal } from 'react-dom';
import classes from './Alert.module.scss';
import { useCallback, useEffect, useState } from 'react';


function Alert({ type, message, handleCloseAlertBox }) {
    const [isClosing, setIsClosing] = useState(false);
    const [progress, setProgress] = useState(0);
    const duration = 4000;

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            handleCloseAlertBox();
        }, 500);
    }, [handleCloseAlertBox]);

    useEffect(() => {
        if (isClosing) return;
        const progressInterval = setInterval(() => { setProgress((prev) => Math.min(prev + 100 / (duration / 100), 100)) }, 100);
        const timeout = setTimeout(() => { handleClose() }, duration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timeout);
        };
    }, [isClosing, duration, handleClose]);

    return createPortal(
        <div onClick={handleClose} className={`${classes.alert} ${classes[type]} ${isClosing ? classes.fadeOut : classes.fadeIn}`}>
            <span> {message} </span>
            <div className={classes.progressBar} style={{ width: `${progress}%` }} aria-hidden="true" />
        </div>, document.getElementById('alert')
    )
}

export default Alert;