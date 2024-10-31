function CustomizePlugin() {
    return (
        <div className="fixed-plugin">
            <a className="fixed-plugin-button text-dark position-fixed px-3 py-2" href='/'>
                <i className="fa fa-cog py-2"> </i>
            </a>
            <div className="card shadow-lg ">
                <div className="card-header pb-0 pt-3 ">
                    <div className="float-start">
                        <h5 className="mt-3 mb-0">Soft UI Configurator</h5>
                        <p>See our dashboard options.</p>
                    </div>
                    <div className="float-end mt-4">
                        <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
                            <i className="fa fa-close"></i>
                        </button>
                    </div>
                </div>
                <hr className="horizontal dark my-1" />
                <div className="card-body pt-sm-3 pt-0">
                    <div>
                        <h6 className="mb-0">Sidebar Colors</h6>
                    </div>
                    <a href="/" className="switch-trigger background-color">
                        <div className="badge-colors my-2 text-start">
                            <span className="badge filter bg-gradient-primary active" data-color="primary"></span>
                            <span className="badge filter bg-gradient-dark" data-color="dark"></span>
                            <span className="badge filter bg-gradient-info" data-color="info"></span>
                            <span className="badge filter bg-gradient-success" data-color="success"></span>
                            <span className="badge filter bg-gradient-warning" data-color="warning"></span>
                            <span className="badge filter bg-gradient-danger" data-color="danger"></span>
                        </div>
                    </a>
                    <div className="mt-3">
                        <h6 className="mb-0">Sidenav Type</h6>
                        <p className="text-sm">Choose between 2 different sidenav types.</p>
                    </div>
                    <div className="d-flex">
                        <button className="btn bg-gradient-primary w-100 px-3 mb-2 active" data-class="bg-transparent">Transparent</button>
                        <button className="btn bg-gradient-primary w-100 px-3 mb-2 ms-2" data-class="bg-white">White</button>
                    </div>
                    <p className="text-sm d-xl-none d-block mt-2">You can change the sidenav type just on desktop view.</p>
                    <div className="mt-3">
                        <h6 className="mb-0">Navbar Fixed</h6>
                    </div>
                    <div className="form-check form-switch ps-0">
                        <input className="form-check-input mt-1 ms-auto" type="checkbox"/>
                    </div>
                    <hr className="horizontal dark my-sm-4" />
                    <a className="btn bg-gradient-dark w-100" href="https://www.creative-tim.com/product/soft-ui-dashboard">Free Download</a>
                    <a className="btn btn-outline-dark w-100" href="https://www.creative-tim.com/learning-lab/bootstrap/license/soft-ui-dashboard">View documentation</a>
                    <div className="w-100 text-center">
                        <a className="github-button" href="https://github.com/creativetimofficial/soft-ui-dashboard" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star creativetimofficial/soft-ui-dashboard on GitHub">Star</a>
                        <h6 className="mt-3">Thank you for sharing!</h6>
                        {/* <a href="https://twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard" className="btn btn-dark mb-0 me-2" target="_blank">
                            <i className="fab fa-twitter me-1" aria-hidden="true"></i> Tweet
                        </a> */}
                        {/* <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/soft-ui-dashboard" className="btn btn-dark mb-0 me-2" target="_blank">
                            <i className="fab fa-facebook-square me-1" aria-hidden="true"></i> Share
                        </a> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomizePlugin;