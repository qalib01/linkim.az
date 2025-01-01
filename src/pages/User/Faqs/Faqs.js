import { faChevronLeft, faChevronRight, faEdit, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import Button from "../../../components/Button/Button";
import { apiRequest } from "../../../utils/apiRequest";
import { ConfigGenerator } from "../../../utils/formConfigs";
import Form from "../../../components/Form/Form";
import Modal from "../../../components/Modal/Modal";


function Faqs() {
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [modalConfig, setModalConfig] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        async function getData() {
            setIsFetching(true);
            const response = await apiRequest({
                url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_USER_API_ENDPOINT}/get-allFaqs`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json"
                },
            });

            let data = response.data;
            setData(response.status === 200 && data);
            setIsFetching(false);
        }
        getData();
    }, []);

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return data;

        return data && [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asceding' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asceding' ? -1 : 1;
            return 0;
        });
    }, [data, sortConfig]);

    function handleSort(key) {
        setSortConfig((prevConfig) => {
            const direction = prevConfig.key === key && prevConfig.direction === 'asceding' ? 'desceding' : 'asceding';
            return { key, direction };
        })
    }

    function handleOpenModal(title, size, content) {
        setModalConfig({ isOpen: true, title, size, content });
    }

    function handleCloseModal() {
        setModalConfig({ ...modalConfig, isOpen: false });
    }

    return (
        <>
            <div className="container-fluid py-4">
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Tez-tez verilən suallar</h5>
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
                                        {isFetching && <tr className='text-center'> Məlumat yüklənir... </tr>}
                                        <table className="table table-flush dataTable-table" id="datatable-basic">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2 text-center">
                                                        <Button className="dataTable-sorter" onClick={() => handleSort('group')}>Qrup</Button>
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-3 text-center">
                                                        <Button className="dataTable-sorter" onClick={() => handleSort('question')}>Sual</Button>
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-3 text-center">
                                                        <Button className="dataTable-sorter" onClick={() => handleSort('answer')}>Cavab</Button>
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-2 text-center">
                                                        <Button className="dataTable-sorter" onClick={() => handleSort('active')}>Statusu</Button>
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-1 text-center">
                                                        <Button className="dataTable-sorter" onClick={() => handleSort('order')}>Sırası</Button>
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-1 text-center">
                                                        Hərəkətər
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    sortedData ? sortedData.map((data) => (
                                                        <>
                                                            <tr key={data.id}>
                                                                <td className="text-sm font-weight-normal text-center"> {data.group} </td>
                                                                <td className="text-sm font-weight-normal text-center"> - </td>
                                                                <td className="text-sm font-weight-normal text-center"> - </td>
                                                                <td className="text-sm font-weight-normal text-center">
                                                                    <span className={`badge badge-sm bg-gradient-${data.active ? 'success' : 'danger'}`}> {data.active ? 'Aktiv' : 'Passiv'} </span>
                                                                </td>
                                                                <td className="text-sm font-weight-normal text-center">
                                                                    <span className={`badge badge-sm bg-gradient-info`}> {data.order} </span>
                                                                </td>
                                                                <td className="text-sm font-weight-normal d-flex align-items-center justify-content-evenly text-center">
                                                                    <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => handleOpenModal('TVS qrup düzəliş et', 'md', <Form config={new ConfigGenerator().changeTvsGroupData('update', data.id)} initialData={data} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
                                                                        <FontAwesomeIcon icon={faEdit} />
                                                                    </Button>
                                                                    <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => handleOpenModal('TVS qrup sil', 'md', <Form config={new ConfigGenerator().deleteTvsGroupData('delete', data.id)} initialData={data} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
                                                                        <FontAwesomeIcon icon={faTrash} />
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                            {data.faqs ? data.faqs.map((data2) => (
                                                                <tr key={data2.id}>
                                                                    <td className="text-sm font-weight-normal text-center"> - </td>
                                                                    <td className="text-sm font-weight-normal text-center"> {data2.question} </td>
                                                                    <td className="text-sm font-weight-normal text-center" > {data2.answer} </td>
                                                                    <td className="text-sm font-weight-normal text-center">
                                                                        <span className={`badge badge-sm bg-gradient-${data2.active ? 'success' : 'danger'}`}> {data2.active ? 'Aktiv' : 'Passiv'} </span>
                                                                    </td>
                                                                    <td className="text-sm font-weight-normal text-center">
                                                                        <span className={`badge badge-sm bg-gradient-info`}> {data2.order} </span>
                                                                    </td>
                                                                    <td className="text-sm font-weight-normal d-flex align-items-center justify-content-evenly text-center">
                                                                        <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => handleOpenModal('TVS düzəliş et', 'md', <Form config={new ConfigGenerator().changeTvsData('update', data2.id)} initialData={data2} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
                                                                            <FontAwesomeIcon icon={faEdit} />
                                                                        </Button>
                                                                        <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => handleOpenModal('TVS sil', 'md', <Form config={new ConfigGenerator().deleteTvsData('delete', data2.id)} initialData={data2} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            )) : 'Məlumat yoxdur'}
                                                        </>
                                                    )) : 'Məlumat tapılmadı'
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="dataTable-bottom">
                                        <div className="dataTable-info">Ümumi: {sortedData.length || 0}</div>
                                        <nav className="dataTable-pagination">
                                            <ul className="dataTable-pagination-list">
                                                <li className="pager">
                                                    <Button data-page="1">
                                                        <FontAwesomeIcon icon={faChevronLeft} />
                                                    </Button>
                                                </li>
                                                <li className="active">
                                                    <Button data-page="1">1</Button>
                                                </li>
                                                <li className="">
                                                    <Button data-page="2">2</Button>
                                                </li>
                                                <li className="">
                                                    <Button data-page="3">3</Button>
                                                </li>
                                                <li className="">
                                                    <Button data-page="4">4</Button>
                                                </li>
                                                <li className="">
                                                    <Button data-page="5">5</Button>
                                                </li>
                                                <li className="">
                                                    <Button data-page="6">6</Button>
                                                </li>
                                                <li className="">
                                                    <Button data-page="7">7</Button>
                                                </li>
                                                <li className="ellipsis">
                                                    <Button>
                                                        <FontAwesomeIcon icon={faEllipsis} />
                                                    </Button>
                                                </li>
                                                <li className="">
                                                    <Button data-page="12">12</Button>
                                                </li>
                                                <li className="pager">
                                                    <Button data-page="2">
                                                        <FontAwesomeIcon icon={faChevronRight} />
                                                    </Button>
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
            { modalConfig?.isOpen && (<Modal title={modalConfig.title} size={modalConfig.size} onClose={handleCloseModal}> {modalConfig.content} </Modal>) }
        </>
    )
}

export default Faqs;