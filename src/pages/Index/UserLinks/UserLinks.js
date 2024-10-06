import { Link } from "react-router-dom";
import classes from './UserLinks.module.scss'
import ThreeDotsIconSvg from "../../../components/Icons/ThreeDotsIconSvg";
import userImg from './user.jpg'
import CloseIconSvg from "../../../components/Icons/CloseIconSvg";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LinkIconSvg from "../../../components/Icons/LinkIconSvg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import DoneIconSvg from "../../../components/Icons/DoneIconSvg";
import WhatsAppIconSvg from "../../../components/Icons/WhatsappIconSvg";
import XIconSvg from "../../../components/Icons/XIconSvg";
import LinkedInSvgIcon from "../../../components/Icons/LinkedInIconSvg";
import FacebookIconSvg from "../../../components/Icons/FacebookIconSvg";
import TelegramIconSvg from "../../../components/Icons/TelegramIconSvg";




const USER_DATA = {
    name: 'Galib',
    surname: 'Mammadli',
    username: 'galibm',
    userLinks: [
        {
            id: '1',
            title: 'Instagram hesabım',
            url: 'https://instagram.com/qalib.mmmdli',
            linkType: 'social',
        },
        {
            id: '2',
            title: 'Facebook hesabım',
            url: 'https://facebook.com/qalib.mlee',
            linkType: 'social',
        },
        
        {
            id: '3',
            title: 'LinkedIn hesabım',
            url: 'https://linkedin.com/in/galib-mammadli-7884b11b2/',
            linkType: 'social',
        },
        {
            id: '4',
            title: 'TəqdimatımAz',
            url: 'https://teqdimatim.az/',
            linkType: 'custom',
        },
        {
            id: '5',
            title: 'Portfoliom',
            url: 'https://mammadli.info/',
            linkType: 'custom',
        },
    ],
}


function UserLinks() {
    useEffect(() => {
        window.scrollTo(0,0)
    })

    const [isOpenModal, setIsOpenModal] = useState(false);

    function openShareDialog() {
        setIsOpenModal(true);
    }

    function closeShareDialog() {
        setIsOpenModal(false);
    }

    const data = {
        title: `${USER_DATA.name} ${USER_DATA.surname}`,
        url: `https://linkim.az/${USER_DATA.username}`
    }

    return (
        <>
            <section className={classes.background}>
                <div className={classes.container}>
                    <div className={classes.topbar}>
                        <button onClick={openShareDialog}>
                            <ThreeDotsIconSvg color='#FFFFFF' />
                        </button>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.userContainer}>
                            <div className={classes.userImg}>
                                <img src={userImg} alt={`${USER_DATA.name} ${USER_DATA.surname}`} />
                            </div>
                            <div className={classes.userData}>
                                <h1> {USER_DATA.name} {USER_DATA.surname} </h1>
                                <span> @{USER_DATA.username} </span>
                            </div>
                            <div className={classes.userLinks}>
                                {
                                    USER_DATA.userLinks.map((userLink) => (
                                        <UserLink key={userLink.id} data={userLink} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {isOpenModal && <ShareDialogBox onClose={closeShareDialog} data={data} />}
        </>
    )
}

function UserLink({ data }) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    function openShareDialog() {
        setIsOpenModal(true);
    }

    function closeShareDialog() {
        setIsOpenModal(false);
    }

    return (
        <>
            <div className={classes.userLink}>
                <Link target="_blank" to={data.url}> {data.title} </Link>
                <div className={classes.shareIcon} onClick={openShareDialog}>
                    <ThreeDotsIconSvg />
                </div>
            </div>
            {isOpenModal && <ShareDialogBox onClose={closeShareDialog} data={data} />}
        </>
    )
}

function ShareDialogBox({ onClose, data }) {
    const [copyStatus, setCopyStatus] = useState(false);

    function onCopyText() {
        setCopyStatus(true);
        setTimeout(() => {
            setCopyStatus(false)
        }, 2000);
    }

    return createPortal(
        <div className={classes.overlay}>
            <div className={classes.dialog}>
                <div className={classes.header}>
                    <button onClick={onClose}> <CloseIconSvg /> </button>
                </div>
                <div className={classes.body}>
                    <div className={classes.content}>
                        <div className={classes.linkInformations}>
                            <p> {data.title} </p>
                            <span> {data.url} </span>
                        </div>
                        <div className={`${classes.buttons} flex-row-scroll`}>
                            <div className={classes.button}>
                                <CopyToClipboard text={data.url} onCopy={onCopyText}>
                                    <button>
                                        { copyStatus ? <DoneIconSvg /> : <LinkIconSvg /> }
                                    </button>
                                </CopyToClipboard>
                                <span> {copyStatus ? 'Kopyalandı' : 'Kopyala'} </span>
                            </div>
                            <div className={classes.button}>
                                <Link to={`https://api.whatsapp.com/send?text=${data.url} linkini sizinlə paylaşıram. İndi sən də https://linkim.az portalından qeydiyyatdan keçərək şəxsi linkini rahatlıqla yradıb paylaşa bilərsən :)`} target="_blank">
                                    <WhatsAppIconSvg />
                                </Link>
                                <span> WhatsApp </span>
                            </div>
                            <div className={classes.button}>
                                <Link to={`https://x.com/intent/tweet?=${data.url} linkini sizinlə paylaşıram. İndi sən də https://linkim.az portalından qeydiyyatdan keçərək şəxsi linkini rahatlıqla yradıb paylaşa bilərsən :)`} target="_blank">
                                    <XIconSvg />
                                </Link>
                                <span> X </span>
                            </div>
                            <div className={classes.button}>
                                <Link to={`https://www.linkedin.com/sharing/share-offsite/?url=${data.url}`} target="_blank">
                                    <LinkedInSvgIcon />
                                </Link>
                                <span> LinkedIn </span>
                            </div>
                            <div className={classes.button}>
                                <Link to={`https://www.facebook.com/sharer.php?u=${data.url}`} target="_blank">
                                    <FacebookIconSvg />
                                </Link>
                                <span> Facebook </span>
                            </div>
                            <div className={classes.button}>
                                <Link to={`https://telegram.me/share/url?url=${data.url}`} target="_blank">
                                    <TelegramIconSvg />
                                </Link>
                                <span> Telegram </span>
                            </div>
                        </div>
                        <div className={classes.authOptions}>
                            <span> İndi {USER_DATA.name} kimi sən də rahatlıqla öz şəxsi linkini yarada bilərsən! </span>
                            <div className="d-flex align-items-center justify-content-center gap-3">
                                <Link to='/p/register'> Qeydiyyat </Link>
                                <Link to='/p/login'> Giriş </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    )
}

export default UserLinks;