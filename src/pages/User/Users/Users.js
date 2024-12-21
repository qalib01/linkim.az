import { faChevronLeft, faChevronRight, faEdit, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Button from "../../../components/Button/Button";


function Users() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="container-fluid py-4">
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">İstifadəçilər</h5>
                        </div>
                        <div className="table-responsive">
                            <div className="dataTable-wrapper dataTable-loading no-footer sortable fixed-height fixed-columns">
                                <div className="dataTable-top">
                                    <div className="dataTable-dropdown">
                                        <label>
                                            <select defaultValue='5' className="dataTable-selector">
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                            </select> məlumat hər səhifədə
                                        </label>
                                    </div>
                                </div>
                                <div className="dataTable-container mb-4 w-100">
                                    <table className="table table-flush dataTable-table" id="datatable-basic">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2" data-sortable="">
                                                    <a href="#" className="dataTable-sorter">Tam adı</a>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2" data-sortable="">
                                                    <a href="#" className="dataTable-sorter">Emaili</a>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2" data-sortable="">
                                                    <a href="#" className="dataTable-sorter">İstifadəçi adı</a>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2" data-sortable="">
                                                    <a href="#" className="dataTable-sorter">Linkləri</a>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2" data-sortable="">
                                                    <a href="#" className="dataTable-sorter">Qoşulma tarixi</a>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2" data-sortable="">
                                                    <a href="#" className="dataTable-sorter">Statusu</a>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2" data-sortable="">
                                                    <a href="#" className="dataTable-sorter">Hərəkətər</a>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-sm font-weight-normal">Tiger Nixon</td>
                                                <td className="text-sm font-weight-normal">System Architect</td>
                                                <td className="text-sm font-weight-normal">Edinburgh</td>
                                                <td className="text-sm font-weight-normal">
                                                    <span title="Aktif"> 5 </span>
                                                    <span> / </span>
                                                    <span title="Ümumi"> 10 </span>
                                                </td>
                                                <td className="text-sm font-weight-normal">2011/04/25</td>
                                                <td className="text-sm font-weight-normal">
                                                    <span class="badge badge-sm bg-gradient-danger">Passiv</span>
                                                </td>
                                                <td className="text-sm font-weight-normal d-flex align-items-center justify-content-evenly">
                                                    <Button to={`/u/users/dawdwdwd`} style={{fontSize: '16px'}}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </Button>
                                                    <Button>
                                                        <FontAwesomeIcon icon={faTrash} style={{fontSize: '16px'}} />
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-sm font-weight-normal">Garrett Winters</td>
                                                <td className="text-sm font-weight-normal">Accountant</td>
                                                <td className="text-sm font-weight-normal">Tokyo</td>
                                                <td className="text-sm font-weight-normal">
                                                    <span title="Aktif"> 5 </span>
                                                    <span> / </span>
                                                    <span title="Ümumi"> 10 </span>
                                                </td>
                                                <td className="text-sm font-weight-normal">2011/07/25</td>
                                                <td className="text-sm font-weight-normal">
                                                    <span class="badge badge-sm bg-gradient-success">Aktiv</span>
                                                </td>
                                                <td className="text-sm font-weight-normal d-flex align-items-center justify-content-evenly">
                                                    <Button to={`/u/users/dawdwdwd`}>
                                                        <FontAwesomeIcon icon={faEdit} style={{fontSize: '16px'}} />
                                                    </Button>
                                                    <Button>
                                                        <FontAwesomeIcon icon={faTrash} style={{fontSize: '16px'}} />
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-sm font-weight-normal">Ashton Cox</td>
                                                <td className="text-sm font-weight-normal">Junior Technical Author</td>
                                                <td className="text-sm font-weight-normal">San Francisco</td>
                                                <td className="text-sm font-weight-normal">
                                                    <span title="Aktif"> 5 </span>
                                                    <span> / </span>
                                                    <span title="Ümumi"> 10 </span>
                                                </td>
                                                <td className="text-sm font-weight-normal">2009/01/12</td>
                                                <td className="text-sm font-weight-normal">
                                                    <span class="badge badge-sm bg-gradient-danger">Passiv</span>
                                                </td>
                                                <td className="text-sm font-weight-normal d-flex align-items-center justify-content-evenly">
                                                    <Button to={`/u/users/dawdwdwd`}>
                                                        <FontAwesomeIcon icon={faEdit} style={{fontSize: '16px'}} />
                                                    </Button>
                                                    <Button>
                                                        <FontAwesomeIcon icon={faTrash} style={{fontSize: '16px'}} />
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-sm font-weight-normal">Cedric Kelly</td>
                                                <td className="text-sm font-weight-normal">Senior Javascript Developer</td>
                                                <td className="text-sm font-weight-normal">Edinburgh</td>
                                                <td className="text-sm font-weight-normal">
                                                    <span title="Aktif"> 5 </span>
                                                    <span> / </span>
                                                    <span title="Ümumi"> 10 </span>
                                                </td>
                                                <td className="text-sm font-weight-normal">2012/03/29</td>
                                                <td className="text-sm font-weight-normal">
                                                    <span class="badge badge-sm bg-gradient-danger">Passiv</span>
                                                </td>
                                                <td className="text-sm font-weight-normal d-flex align-items-center justify-content-evenly">
                                                    <Button to={`/u/users/dawdwdwd`}>
                                                        <FontAwesomeIcon icon={faEdit} style={{fontSize: '16px'}} />
                                                    </Button>
                                                    <Button>
                                                        <FontAwesomeIcon icon={faTrash} style={{fontSize: '16px'}} />
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-sm font-weight-normal">Airi Satou</td>
                                                <td className="text-sm font-weight-normal">Accountant</td>
                                                <td className="text-sm font-weight-normal">Tokyo</td>
                                                <td className="text-sm font-weight-normal">
                                                    <span title="Aktif"> 5 </span>
                                                    <span> / </span>
                                                    <span title="Ümumi"> 10 </span>
                                                </td>
                                                <td className="text-sm font-weight-normal">2008/11/28</td>
                                                <td className="text-sm font-weight-normal">
                                                    <span class="badge badge-sm bg-gradient-success">Aktiv</span>
                                                </td>
                                                <td className="text-sm font-weight-normal d-flex align-items-center justify-content-evenly">
                                                    <Button to={`/u/users/dawdwdwd`}>
                                                        <FontAwesomeIcon icon={faEdit} style={{fontSize: '16px'}} />
                                                    </Button>
                                                    <Button>
                                                        <FontAwesomeIcon icon={faTrash} style={{fontSize: '16px'}} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="dataTable-bottom">
                                    <div className="dataTable-info">Ümumi: 57</div>
                                    <nav className="dataTable-pagination">
                                        <ul className="dataTable-pagination-list">
                                            <li className="pager">
                                                <a href="#" data-page="1">
                                                    <FontAwesomeIcon icon={faChevronLeft} />
                                                </a>
                                            </li>
                                            <li className="active">
                                                <a href="#" data-page="1">1</a>
                                            </li>
                                            <li className="">
                                                <a href="#" data-page="2">2</a>
                                            </li>
                                            <li className="">
                                                <a href="#" data-page="3">3</a>
                                            </li>
                                            <li className="">
                                                <a href="#" data-page="4">4</a>
                                            </li>
                                            <li className="">
                                                <a href="#" data-page="5">5</a>
                                            </li>
                                            <li className="">
                                                <a href="#" data-page="6">6</a>
                                            </li>
                                            <li className="">
                                                <a href="#" data-page="7">7</a>
                                            </li>
                                            <li className="ellipsis">
                                                <a href="#">
                                                    <FontAwesomeIcon icon={faEllipsis} />
                                                </a>
                                            </li>
                                            <li className="">
                                                <a href="#" data-page="12">12</a>
                                            </li>
                                            <li className="pager">
                                                <a href="#" data-page="2">
                                                    <FontAwesomeIcon icon={faChevronRight} />
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users;