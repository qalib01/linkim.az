import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../../components/Button/Button";
import { apiRequest } from "../../../utils/apiRequest";
import { Link } from "react-router-dom";
import moment from "moment";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../../components/Modal/Modal";
import Form from "../../../components/Form/Form";
import { ConfigGenerator } from "../../../utils/formConfigs";
import Alert from "../../../components/Alert/Alert";
import errorMessages from "../../../statusMessages/error";
import Pagination from "../../../components/Pagination/Pagination";
import { ROUTES } from "../../../utils/routes";


function Users() {
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState([]);
    const { localUser } = useAuth();
    const [dataSelectOption, setDataSelectOption] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [submitStatus, setSubmitStatus] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [modalConfig, setModalConfig] = useState(null);
    const configGenerator = new ConfigGenerator();
    const [currentConfig, setCurrentConfig] = useState({});

    const getData = useCallback(async () => {
        setIsFetching(true);

        try {
            const res = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${ROUTES.API.USER_ENDPOINT}${ROUTES.API.GET_USERS}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json"
                },
            });

            if (res.status === 200) {
                setData(res.data);
            } else {
                setSubmitStatus(res.data);
            }
        } catch (error) {
            setSubmitStatus(errorMessages.GENERAL_ERROR)
        } finally {
            setIsFetching(false);
        }
    }, []);

    const currentDataTable = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * dataSelectOption;
        const lastPageIndex = firstPageIndex + dataSelectOption;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, data, dataSelectOption]);

    useEffect(() => {
        window.scrollTo(0, 0);

        getData();
    }, [getData]);

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return currentDataTable;

        return currentDataTable && [...currentDataTable].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asceding' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asceding' ? -1 : 1;
            return 0;
        });
    }, [currentDataTable, sortConfig]);

    const handleSort = useCallback((key) => {
        setSortConfig((prevConfig) => {
            const direction = prevConfig.key === key && prevConfig.direction === 'asceding' ? 'desceding' : 'asceding';
            return { key, direction };
        })
    }, [setSortConfig]);

    const handleOpenModal = useCallback((title, size, content) => {
        setCurrentConfig({ config: content.config, initialData: content.initialData });
        setModalConfig({ isOpen: true, title, size, currentConfig })
    }, [setModalConfig, currentConfig]);

    const handleCloseModal = useCallback(() => {
        setModalConfig({ ...modalConfig, isOpen: false });
    }, [setModalConfig, modalConfig]);

    const handleChangeTableSelector = (e) => {
        setCurrentPage(1);
        setDataSelectOption(Number(e.target.value));
    }

    return (
        <>
            <div className="container-fluid py-4">
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header d-flex align-items-center justify-content-between">
                                <h5 className="mb-0">İstifadəçilər</h5>
                                <Button asButton={true} classList='border-0 bg-transparent w-auto btn bg-gradient-primary p-2 m-0 h6' onClick={() => handleOpenModal('Yeni istifadəçi yarat', 'lg', { config: configGenerator.generateUserData('add'), initialData: '' })}> Yenisini yarat </Button>
                            </div>
                            <div className="table-responsive">
                                <div className="dataTable-wrapper dataTable-loading no-footer sortable fixed-height fixed-columns">
                                    <div className="dataTable-top">
                                        <div className="dataTable-dropdown">
                                            <label>
                                                <select defaultValue={dataSelectOption} className="dataTable-selector" onChange={handleChangeTableSelector}>
                                                    <option value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select> məlumat hər səhifədə
                                            </label>
                                        </div>
                                    </div>
                                    <div className="dataTable-container mb-4 w-100">
                                        {isFetching && (
                                            <table className="table table-flush dataTable-table">
                                                <tbody>
                                                    <tr className="text-center">
                                                        <td colSpan="6">Məlumat yüklənir...</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )}
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
                                                    sortedData ? sortedData.map((data) => (
                                                        localUser.id !== data.id && (
                                                            <tr key={data.id}>
                                                                <td className="text-sm font-weight-normal text-center"> {data.name} </td>
                                                                <td className="text-sm font-weight-normal text-center"> {data.email} </td>
                                                                <td className="text-sm font-weight-normal text-center"> {data.username ? <Link to={`${process.env.REACT_APP_PROJECT_LINK}/${data.username}`}> {data.username} </Link> : 'Məlumat yoxdur'} </td>
                                                                <td className="text-sm font-weight-normal text-center">
                                                                    <span title="Aktif"> {data.userLinks?.filter(link => link.active).length || 0} </span>
                                                                    <span> / </span>
                                                                    <span title="Ümumi"> {data.userLinks?.length || 0} </span>
                                                                </td>
                                                                <td className="text-sm font-weight-normal text-center"> {moment(data.createdAt).format('DD-MM-YYYY')} </td>
                                                                <td className="text-sm font-weight-normal text-center">
                                                                    <span className={`badge badge-sm bg-gradient-${data.active ? 'success' : 'danger'}`}> {data.active ? 'Aktiv' : 'Passiv'} </span>
                                                                </td>
                                                                <td className="text-sm font-weight-normal d-flex align-items-center justify-content-evenly text-center">
                                                                    {
                                                                        !data.active && <Button onClick={() => handleOpenModal('İstifadəçini aktifləşdir', 'md', { config: configGenerator.editUserStatus('update', data.id), initialData: data })} style={{ fontSize: '16px' }}>
                                                                            <FontAwesomeIcon icon={faCheck} />
                                                                        </Button>
                                                                    }
                                                                    <Button to={`/u/users/profile/${data.id}`} style={{ fontSize: '16px' }}>
                                                                        <FontAwesomeIcon icon={faEdit} />
                                                                    </Button>
                                                                    <Button onClick={() => handleOpenModal('İstifadəçini sil', 'md', { config: configGenerator.deleteUserData('delete', data.id), initialData: data })}>
                                                                        <FontAwesomeIcon icon={faTrash} style={{ fontSize: '16px' }} />
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )) : 'Məlumat tapılmadı'
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="dataTable-bottom">
                                        <div className="dataTable-info">Ümumi: {data.length || 0}</div>
                                        <nav className="dataTable-pagination">
                                            <Pagination
                                                currentPage={currentPage}
                                                totalCount={data.length}
                                                pageSize={dataSelectOption}
                                                onPageChange={(page) => setCurrentPage(page)}
                                            />
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {submitStatus.type && <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus([])} />}
            {modalConfig?.isOpen && (<Modal title={modalConfig.title} size={modalConfig.size} onClose={handleCloseModal}>
                <Form config={currentConfig.config} initialData={currentConfig.initialData || ''} onClose={handleCloseModal} />
            </Modal>)}
        </>
    )
}

export default Users;