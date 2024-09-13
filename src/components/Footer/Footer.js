import classes from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={`${ classes.footer } bg-dark text-muted pt-0 pt-lg-5`}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                        <div className="footer-col mt-5 pe-4">
                            <img src="assets/images/logo-white.png" className={`${ classes.footerLogo } mb-4`} />
                            <p className="mb-0">Pellentesque sed elementum erat. Proin ut purus viverra, porttitor sem id, finibus ante. Vestibulum ullamcorper convallis magna. Integer bibendum ante felis, non laoreet enim molestie ac. </p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <div className="footer-col mt-5">
                            <h3 className={`${classes.footerTitle} text-white mb-4`}>Services</h3>
                            <ul className="list-unstyled mb-0">
                                <li className="mb-2"><a href="#">Design</a></li>
                                <li className="mb-2"><a href="#">Development</a></li>
                                <li className="mb-2"><a href="#">Marketing</a></li>
                                <li className="mb-0"><a href="#">Growth Hacking</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <div className="footer-col mt-5">
                            <h3 className={`${classes.footerTitle} text-white mb-4`}>Company</h3>
                            <ul className="list-unstyled mb-0">
                                <li className="mb-2"><a href="#">About</a></li>
                                <li className="mb-2"><a href="#">Team</a></li>
                                <li className="mb-2"><a href="#">Career</a></li>
                                <li className="mb-0"><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <div className="footer-col footer-contact mt-5">
                            <h3 className={`${classes.footerTitle} text-white mb-4`}>Contact us</h3>
                            <div className="mb-3"><img className="me-2" src="assets/images/map-pin.svg" /><span>2132  Berry Street, Pueblo,  Colorado</span></div>
                            <div className="mb-3"><img className="me-2" src="assets/images/mail.svg" /><span>719-240-7593</span></div>
                            <div><img className="me-2" src="assets/images/phone.svg" /><span> contact@example.com</span></div>
                        </div>
                    </div>
                </div>
                <div className={`row ${classes.footerCredits} text-center mt-5 py-3`}>
                    <div className="col-12 col-md-6">
                        <div className="footer-copy float-md-none float-lg-start">
                            <p className="mb-0 small">&copy 2021 <a href="#" className="text-decoration-none">Pika</a>. Designed by <a href="https://romanpixel.com" rel="nofollow" className="text-decoration-none">RomanPixel</a></p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className={`${classes.footerSocial} clearfix`}>
                            <ul className="list-unstyled mb-0 float-md-none float-lg-end">
                                <li className="d-inline-block me-2"><a href="#"><img src="assets/images/youtube.svg" /></a></li>
                                <li className="d-inline-block me-2"><a href="#"><img src="assets/images/twitter.svg" /></a></li>
                                <li className="d-inline-block me-2"><a href="#"><img src="assets/images/instagram.svg" /></a></li>
                                <li className="d-inline-block me-2"><a href="#"><img src="assets/images/github.svg" /></a></li>
                                <li className="d-inline-block me-2"><a href="#"><img src="assets/images/dribbble.svg" /></a></li>
                                <li className="d-inline-block"><a href="#"><img src="assets/images/facebook.svg" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}