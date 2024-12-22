import { faChevronLeft, faChevronRight, faEdit, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import Button from "../../../components/Button/Button";
import { apiRequest } from "../../../utils/apiRequest";
import { Link } from "react-router-dom";
import moment from "moment";


// let users = [
//     {
//         id: 1,
//         name: 'Tiger Nixon',
//         email: 'tigerr_@gmail.com',
//         username: 'tigerr_',
//         links: {
//             total: 10,
//             active: 5,
//         },
//         createdAt: '2011/04/25',
//         active: true,
//     },
//     {
//         id: 2,
//         name: 'Garrett Winters',
//         email: 'garret_winters@gmail.com',
//         username: 'garret',
//         links: {
//             total: 8,
//             active: 2,
//         },
//         createdAt: '2024/05/25',
//         active: false,
//     },
//     {
//         id: 3,
//         name: 'Ashton Cox',
//         email: 'ashton.cox@gmail.com',
//         username: 'ashton.cox',
//         links: {
//             total: 8,
//             active: 6,
//         },
//         createdAt: '2022/11/25',
//         active: true,
//     },
//     {
//         id: 4,
//         name: 'Cedric Kelly',
//         email: 'kelly@gmail.com',
//         username: 'kelly',
//         links: {
//             total: 3,
//             active: 0,
//         },
//         createdAt: '2018/06/20',
//         active: true,
//     },
//     {
//         id: 5,
//         name: 'Airi Satou',
//         email: 'airi.satou@gmail.com',
//         username: 'airi01',
//         links: {
//             total: 10,
//             active: 10,
//         },
//         createdAt: '2024/12/20',
//         active: false,
//     },
// ]




function Users() {
    const [isFetching, setIsFetching] = useState(false);
    const [users, setUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });


    useEffect(() => {
        window.scrollTo(0, 0);

        async function getData() {
            setIsFetching(true);
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_USER_API_ENDPOINT}/get-allUsers`,
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json"
                },
            });

            let data = response.data;
            setUsers(response.status === 200 && data);
            setIsFetching(false);
        }
        getData();
    }, []);


    const sortedData = useMemo(() => {
        if (!sortConfig.key) return users;

        return users && [...users].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asceding' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asceding' ? -1 : 1;
            }

            return 0;
        });
    }, [users, sortConfig]);

    function handleSort(key) {
        setSortConfig((prevConfig) => {
            const direction = prevConfig.key === key && prevConfig.direction === 'asceding' ? 'desceding' : 'asceding'
            return { key, direction };
        })
    }


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
                                    { isFetching && <tr className='text-center'> Məlumat yüklənir... </tr> }
                                    <table className="table table-flush dataTable-table" id="datatable-basic">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2 text-center">
                                                    <Button className="dataTable-sorter" onClick={() => handleSort('name')}>Tam adı</Button>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2 text-center">
                                                    <Button className="dataTable-sorter" onClick={() => handleSort('email')}>Emaili</Button>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2 text-center">
                                                    <Button className="dataTable-sorter" onClick={() => handleSort('username')}>İstifadəçi adı</Button>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2 text-center">
                                                    <Button className="dataTable-sorter" onClick={() => handleSort('links')}>Linkləri</Button>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2 text-center">
                                                    <Button className="dataTable-sorter" onClick={() => handleSort('createdAt')}>Qoşulma tarixi</Button>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-1 text-center">
                                                    <Button className="dataTable-sorter" onClick={() => handleSort('active')}>Statusu</Button>
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-1 text-center">
                                                    Hərəkətər
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                sortedData ? sortedData.map((user) => (
                                                    <tr key={user.id}>
                                                        <td className="text-sm font-weight-normal text-center"> {user.name} </td>
                                                        <td className="text-sm font-weight-normal text-center"> {user.email} </td>
                                                        <td className="text-sm font-weight-normal text-center"> {user.username ? <Link to={`${process.env.REACT_APP_PROJECT_LINK}/${user.username}`}> {user.username} </Link> : 'Məlumat yoxdur'} </td>
                                                        <td className="text-sm font-weight-normal text-center">
                                                            <span title="Aktif"> {user.userLinks?.filter(link => link.active).length || 0} </span>
                                                            <span> / </span>
                                                            <span title="Ümumi"> {user.userLinks?.length || 0} </span>
                                                        </td>
                                                        <td className="text-sm font-weight-normal text-center"> {moment(user.createdAt).format('DD-MM-YYYY')} </td>
                                                        <td className="text-sm font-weight-normal text-center">
                                                            <span className={`badge badge-sm bg-gradient-${user.active ? 'success' : 'danger'}`}> {user.active ? 'Aktiv' : 'Passiv'} </span>
                                                        </td>
                                                        <td className="text-sm font-weight-normal d-flex align-items-center justify-content-evenly text-center">
                                                            <Button to={`/u/users/profile/${user.id}`} style={{ fontSize: '16px' }}>
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </Button>
                                                            <Button>
                                                                <FontAwesomeIcon icon={faTrash} style={{ fontSize: '16px' }} />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )) : 'Məlumat tapılmadı'
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="dataTable-bottom">
                                    <div className="dataTable-info">Ümumi: {sortedData.length || 0}</div>
                                    <nav className="dataTable-pagination">
                                        {/* <ul className="dataTable-pagination-list">
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
                                        </ul> */}
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