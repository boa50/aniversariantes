import React from 'react';
import { useMediaQuery } from 'react-responsive';

const Pagination = (props) => {
    const isBigScreen = useMediaQuery({
        query: '(min-device-width: 550px)'
    });
    
    let _currentPage = props.page;
    const lastPage = props.lastPage;
    const firstPage = 1;
    const paginationSize = 5;
    const paginationHalf = (paginationSize + 1)/2;

    const isFirstPage = (page=_currentPage) => page === firstPage;
    const isFirstPageMoved = (move, page=_currentPage) => page === firstPage + move;
    const isLastPage = (page=_currentPage) => page === lastPage;
    const isLastPageMoved = (move, page=_currentPage) => page === lastPage + move;
    const isCurrentPage = page => page === _currentPage;

    const changePage = page => {
        props.listener(page);
    }

    const decreasePage = () => {
        if (!isFirstPage()) {
            changePage(_currentPage - 1);
        }
    }

    const increasePage = () => {
        if (!isLastPage()) {
            changePage(_currentPage + 1);
        }
    }

    const arrowButton = (desabilita, executa, icone) => {
        return (
            <li className={desabilita() ? "disabled" : "waves-effect"}
                onClick={executa}>
                <a href="#!">
                    <i class="material-icons">{icone}</i>
                </a>
            </li>
        );
    }

    const previousPageButton = () => {
        return arrowButton(
            isFirstPage, decreasePage, "chevron_left");
    }

    const nextPageButton = () => {
        return arrowButton(
            isLastPage, increasePage, "chevron_right");
    }

    const getPageClass = page => {
        const lastPagePrevious = lastPage - paginationHalf;
        const firstPageNext = firstPage + paginationHalf;

        const dotsConditions = [
            page === lastPagePrevious && _currentPage > lastPagePrevious,
            page === firstPageNext && _currentPage < firstPageNext,
            page === _currentPage + 1,
            page === _currentPage - 1
        ];

        const reducer = (accumulador, valorAtual) => accumulador || valorAtual;
        const dotsTest = dotsConditions.reduce(reducer, false);

        if (isCurrentPage(page)) {
            return "active red lighten-1";
        } else if (isPageVisible(page) || isBigScreen) {
            return "waves-effect";
        } else if (dotsTest) {
            return ""
        }

        return "mes-nao-apresentado";
    }

    const getPagePresentation = page => {
        if (isPageVisible(page) || isBigScreen) {
            return (
                <li className={getPageClass(page)}
                    onClick={() => changePage(page)}>
                    <a href="#!">{page}</a>
                </li>
            );
        }

        return (
            <li className={getPageClass(page)}>
                <a href="#!">...</a>
            </li>
        );
    }

    const isPageVisible = page => {
        const lastPagePrevious = lastPage - (paginationHalf - 1);
        const firstPageNext = firstPage + (paginationHalf - 1);
        
        const visibilityConditions = [
            isCurrentPage(page),
            isFirstPage(page),
            isLastPage(page),
            isLastPage() && page >= lastPagePrevious,
            isLastPageMoved(-1) && page === lastPagePrevious,
            isLastPageMoved(-2) && page > lastPagePrevious,
            isFirstPage() && page <= firstPageNext,
            isFirstPageMoved(1) && page === firstPageNext,
            isFirstPageMoved(2) && page < firstPageNext
        ];

        const reducer = (accumulador, valorAtual) => accumulador || valorAtual;
        return visibilityConditions.reduce(reducer, false);
    }

    const pagesButtons = () => {
        const pages = [...Array(lastPage).keys()].map(x => x+1);
        
        return pages.map(page => getPagePresentation(page));
    }

    return (
        <ul className="pagination">
            {previousPageButton()}
            {pagesButtons()}
            {nextPageButton()}
        </ul>
    );
}

export default Pagination;