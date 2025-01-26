import { faChevronLeft, faChevronRight, faEdit, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../../../components/Button/Button";
import { apiRequest } from "../../../utils/apiRequest";
import { ConfigGenerator } from "../../../utils/formConfigs";
import Form from "../../../components/Form/Form";
import Modal from "../../../components/Modal/Modal";
import Alert from "../../../components/Alert/Alert";
import errorMessages from "../../../statusMessages/error";


function Faqs() {
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState([]);
    const [submitStatus, setSubmitStatus] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [modalConfig, setModalConfig] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const getData = async () => {
            setIsFetching(true);

            try {
                const res = await apiRequest({
                    url: `${process.env.REACT_APP_API_LINK}${process.env.REACT_APP_USER_API_ENDPOINT}/get-allFaqs`,
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
                setSubmitStatus(errorMessages.GENERAL_ERROR);
            } finally {
                setIsFetching(false);
            }
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
                            <div className="card-header d-flex align-items-center justify-content-between">
                                <h5 className="mb-0">Tez-tez verilən suallar</h5>
                                <Button asButton={true} classList='border-0 bg-transparent w-auto btn bg-gradient-primary p-2 m-0 h6' onClick={() => handleOpenModal('Yeni TVS yarat', 'md', <Form config={new ConfigGenerator().chooseTvsOption('choose')} initialData='' onClose={handleCloseModal} onClick={handleOpenModal} />)}> Yenisini yarat </Button>
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
                                        {isFetching && (
                                            <table className="table table-flush dataTable-table">
                                                <tbody>
                                                    <tr className="text-center">
                                                        <td colSpan="6">Məlumat yüklənir...</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )}
                                        <table className="table table-flush dataTable-table">
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
                                                {sortedData ? sortedData.map((data) => (
                                                    <React.Fragment key={data.id}>
                                                        <tr>
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
                                                                <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => handleOpenModal('TVS qrup düzəliş et', 'md', <Form config={new ConfigGenerator().editTvsData('group', data.id)} initialData={data} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
                                                                    <FontAwesomeIcon icon={faEdit} />
                                                                </Button>
                                                                <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => handleOpenModal('TVS qrup sil', 'md', <Form config={new ConfigGenerator().deleteTvsData('group', data.id)} initialData={data} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
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
                                                                    <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => handleOpenModal('TVS düzəliş et', 'md', <Form config={new ConfigGenerator().editTvsData('faq', data2.id)} initialData={data2} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
                                                                        <FontAwesomeIcon icon={faEdit} />
                                                                    </Button>
                                                                    <Button classList='border-0 bg-transparent w-auto' asButton={true} onClick={() => handleOpenModal('TVS sil', 'md', <Form config={new ConfigGenerator().deleteTvsData('faq', data2.id)} initialData={data2} onClose={handleCloseModal} />)} style={{ fontSize: '16px' }}>
                                                                        <FontAwesomeIcon icon={faTrash} />
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )) : 'Məlumat yoxdur'}
                                                    </React.Fragment>
                                                )) : 'Məlumat tapılmadı'}
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
            {submitStatus.type && <Alert type={submitStatus.type} message={submitStatus.message} handleCloseAlertBox={() => setSubmitStatus([])} />}
            {modalConfig?.isOpen && (<Modal title={modalConfig.title} size={modalConfig.size} onClose={handleCloseModal}> {modalConfig.content} </Modal>)}
        </>
    )
}

export default Faqs;