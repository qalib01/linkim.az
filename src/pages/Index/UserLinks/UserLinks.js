import { Link, useParams } from "react-router-dom";
import classes from './UserLinks.module.scss'
import ThreeDotsIconSvg from "../../../components/Icons/ThreeDotsIconSvg";
import CloseIconSvg from "../../../components/Icons/CloseIconSvg";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LinkIconSvg from "../../../components/Icons/LinkIconSvg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import DoneIconSvg from "../../../components/Icons/DoneIconSvg";
import WhatsAppIconSvg from "../../../components/Icons/WhatsappIconSvg";
import XIconSvg from "../../../components/Icons/XIconSvg";
import LinkedInSvgIcon from "../../../components/Icons/LinkedInIconSvg";
import FacebookIconSvg from "../../../components/Icons/FacebookIconSvg";
import TelegramIconSvg from "../../../components/Icons/TelegramIconSvg";
import MetaIndex from "../../../helmet/IndexPageHelmet";
import { apiRequest } from "../../../utils/apiRequest";
import Loader from "../../../components/Loader/Loader";
import Error from "../../../error/UserErrorPage";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHome } from "@fortawesome/free-solid-svg-icons";


function UserLinks() {
    const [userData, setUserData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const { username } = useParams();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);

        async function userLinks() {
            setIsFetching(true);
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}/user-data`,
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username })
            });

            let data = response.data;
            setUserData(response.status === 200 && data);
            setIsFetching(false);
        }
        userLinks();
    }, [username]);

    function openShareDialog(type) {
        setModalType(type);
        setIsOpenModal(true);
    }

    function closeShareDialog() {
        setIsOpenModal(false);
    }

    if (isFetching) return <Loader />

    if (!isFetching && Object.keys(userData).length === 0) {
        return <Error />
    }

    const userImgUrl = `${process.env.REACT_APP_API_LINK}/${process.env.REACT_APP_USER_PHOTO_SERVER_URL}/${userData.photo}`;
    const data = {
        title: `${userData.name} ${userData.surname}`,
        url: `${process.env.REACT_APP_PROJECT_LINK}/${userData.username}`
    }

    return (
        <>
            <MetaIndex />
            {userData &&
                <section className={classes.background}>
                    <div className={classes.container}>
                        <div className={classes.topbar}>
                            <Link to={ isAuthenticated ? '/u/' : '/' }>
                                <FontAwesomeIcon icon={faHome} color="#fff" />
                            </Link>
                            <button onClick={() => openShareDialog('link')}>
                                <ThreeDotsIconSvg color='#FFF' />
                            </button>
                        </div>
                        <div className={classes.content}>
                            <div className={classes.userContainer}>
                                <div className={classes.userImg}>
                                    <img
                                        src={userImgUrl}
                                        alt={`${userData.name || ''} ${userData.surname || ''}`}
                                    />
                                </div>
                                <div className={classes.userData}>
                                    <h1> {userData.name} {userData.surname} </h1>
                                    <span> @{userData.username} </span>
                                </div>
                                <div className={classes.userLinks}>
                                    {userData.bio && <UserLink data={{ title: "Haqqımda", body: userData }} />}
                                    {userData.userLinks && userData.userLinks.length > 0 ? (
                                        userData.userLinks.map((userLink) => (
                                            <UserLink key={userLink.id} data={userLink} />
                                        ))
                                    ) : (
                                        <p> Hər hansı aktif link tapılmadı </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>}
            {isOpenModal && <ShareDialogBox onClose={closeShareDialog} data={data} type={modalType} />}
        </>
    )
}

function UserLink({ data }) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');

    function openShareDialog(type) {
        setModalType(type);
        setIsOpenModal(true);
    }

    function closeShareDialog() {
        setIsOpenModal(false);
    }

    return (
        <>
            <div className={classes.userLink}>
                {data.url ? (
                    <>
                        <Link target="_blank" to={data.url}>
                            {data.title}
                        </Link>
                        <div className={classes.shareIcon} onClick={() => openShareDialog('link')}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                    </>
                ) : (
                    <>
                        <button onClick={() => openShareDialog('button')}>
                            {data.title}
                        </button>
                    </>
                )}
            </div>
            {isOpenModal && <ShareDialogBox onClose={closeShareDialog} data={data} type={modalType} />}
        </>
    )
}

function ShareDialogBox({ onClose, data, type }) {
    return createPortal(
        <div className={classes.overlay}>
            <div className={classes.dialog}>
                <div className={classes.header}>
                    <button onClick={onClose}> <CloseIconSvg /> </button>
                </div>
                <div className={classes.body}>
                    <div className={classes.content}>
                        {type === 'link' && <LinkDialogContent data={data} />}
                        {type === 'button' && <ButtonDialogContent data={data} />}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    )
}

function LinkDialogContent({ data }) {
    const [copyStatus, setCopyStatus] = useState(false);
    const { isAuthenticated } = useAuth();

    function onCopyText() {
        setCopyStatus(true);
        setTimeout(() => {
            setCopyStatus(false)
        }, 2000);
    }

    return (
        <>
            <div className={classes.linkInformations}>
                <p> {data.title} </p>
                <span> {data.url} </span>
            </div>
            <div className={`${classes.buttons} flex-row-scroll`}>
                <div className={classes.button}>
                    <CopyToClipboard text={data.url} onCopy={onCopyText}>
                        <button>
                            {copyStatus ? <DoneIconSvg /> : <LinkIconSvg />}
                        </button>
                    </CopyToClipboard>
                    <span> {copyStatus ? 'Kopyalandı' : 'Kopyala'} </span>
                </div>
                <div className={classes.button}>
                    <Link to={`https://api.whatsapp.com/send?text=${data.url} linkini səninlə paylaşıram. İndi sən də ${process.env.REACT_APP_PROJECT_LINK} portalından qeydiyyatdan keçərək şəxsi linkini rahatlıqla yaradıb paylaşa bilərsən :)`} target="_blank">
                        <WhatsAppIconSvg />
                    </Link>
                    <span> WhatsApp </span>
                </div>
                <div className={classes.button}>
                    <Link to={`https://x.com/intent/tweet?=${data.url} linkini səninlə paylaşıram. İndi sən də ${process.env.REACT_APP_PROJECT_LINK} portalından qeydiyyatdan keçərək şəxsi linkini rahatlıqla yaradıb paylaşa bilərsən :)`} target="_blank">
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
            {!isAuthenticated && <div className={classes.authOptions}>
                <span> İndi sən də rahatlıqla öz şəxsi linkini yarada və paylaşa bilərsən! </span>
                <div className="d-flex align-items-center justify-content-center gap-3">
                    <Link to='/p/register'> Qeydiyyat </Link>
                    <Link to='/p/login'> Giriş </Link>
                </div>
            </div>}
        </>
    )
}

function ButtonDialogContent({ data }) {
    return (
        <div className={classes.userData}>
            <div className={classes.userDetails}>
                <h1 className={classes.userName}> {data.body.name} {data.body.surname} </h1>
                <p className={classes.email}> {data.body.email} </p>
                <p className={classes.bio}> {data.body.bio} </p>
            </div>
        </div>
    )
}

export default UserLinks;