import { Link } from 'react-router-dom';
import classes from './Footer.module.scss';
import GetInTouch from './GetInTouch';
import ToTop from './ToTop';
import useAuth from '../../../hooks/useAuth';


export default function Footer() {
    const { isAuthenticated } = useAuth();
    return (
        <>
            <GetInTouch />
            <footer className={`${classes.footer} bg-dark text-muted pt-0 pt-lg-5`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                            <div className="footer-col mt-5 pe-4">
                                <h3 className={`${classes.footerTitle} text-white mb-4`}> Şirkət </h3>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-2">
                                        <Link to="/p/about"> Haqqımızda </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/p/contact"> Əlaqə </Link>
                                    </li>
                                    {
                                        !isAuthenticated && <li className="mb-2">
                                            <Link to="/p/register"> Qeydiyyat </Link>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                            <div className="footer-col mt-5">
                                <h3 className={`${classes.footerTitle} text-white mb-4`}> Dəstək </h3>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-2">
                                        <Link to="/p/goal"> Məqsəd </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/p/faqs"> TVS </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                            <div className="footer-col mt-5">

                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="footer-col mt-5">

                            </div>
                        </div>
                    </div>
                    <div className={`row ${classes.footerCredits} text-center mt-5 py-3`}>
                        <div className="col-12 col-md-6">
                            <div className="footer-copy float-md-none float-lg-start">
                                <p className="mb-0 small">&#169; <span></span> <Link to="/" className="text-decoration-none">linkim.az</Link>. Sayt <a href="https://mammadli.info" rel="noreferrer" target='_blank' className="text-decoration-none">GalibM</a> tərəfindən inkişaf etdirildi.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className={`${classes.footerSocial} clearfix`}>
                                <ul className="list-unstyled mb-0 float-md-none float-lg-end">

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <ToTop />
        </>
    )
}