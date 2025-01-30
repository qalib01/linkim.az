import { faChevronLeft, faChevronRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { usePagination } from "../../hooks/usePagination";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = (props) => {
    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;
    const DOTS = '...';

    const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize });

    if (currentPage === 0 || paginationRange.length < 2) return null;

    const onNext = () => onPageChange(currentPage + 1);
    const onPrevious = () => onPageChange(currentPage - 1);
    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className="dataTable-pagination-list">
            {
                currentPage !== 1 && <li className="pager" disabled={currentPage === 1}>
                    <Button onClick={onPrevious} disabled={currentPage === 1}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                </li>
            }

            {
                paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li className="ellipsis" key={index}>
                                <Button>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </Button>
                            </li>
                        )
                    }

                    return (
                        <li key={index} disabled={pageNumber === currentPage} className={pageNumber === currentPage && 'active'}>
                            <Button onClick={() => onPageChange(pageNumber)}> {pageNumber} </Button>
                        </li>
                    )
                })
            }

            {
                currentPage !== lastPage && <li className="pager" disabled={currentPage === lastPage}>
                    <Button onClick={onNext}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </li>
            }
        </ul>
    )
}

export default Pagination;