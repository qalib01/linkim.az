function HeroSection() {
    return (
        <section class="hero bg-white">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-12 col-lg-6 order-2 order-lg-1  mt-4 mt-lg-0 pt-4 pt-lg-0 ">
                        <div class="hero-content pe-md-0 pe-lg-5">
                            <h1 class="hero-title text-dark mt-3"> Bütün linklər <br class="d-none d-lg-block" />indi sadəcə <span class="text-warning">1</span> yerdə </h1>
                            <p class="hero-text mt-3 mb-0"> İndi siz də bizim inkişaf etməkdə olan platformamıza qoşularaq bütün Facebook, Instagram, Tiktok, X və digər linklərinizi sadəcə bir hesab üzərindən paylaşa bilərsiz. </p>
                            <a href="#" class="btn btn-warning shadow-sm mt-4 fw-bold">İndi başla</a>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6 order-1 order-lg-2">
                        <div class="hero-image wings position-relative mx-3 mx-md-4 ms-lg-5">
                            <img class="rounded img-fluid w-100 position-relative" src="assets/images/hero.jpg" alt="Hero" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;