import React from 'react';

const Pagination = (props) => {
    const isBigScreen = props.mediaQueries.isBigScreen;
    
    let _currentPage = props.page;
    const _lastPage = props.lastPage;
    const _firstPage = 1;
    const _paginationSize = 5;
    const _paginationBorders = _paginationSize - 2;

    const _paginationClass = "pagination";
    const _disabledClass = "disabled";
    const _enabledClass = "waves-effect";
    const _activeClass = "active red lighten-1";
    const _hideClass = "mes-nao-apresentado";

    const isFirstPage = (page=_currentPage) => page === _firstPage;
    const isLastPage = (page=_currentPage) => page === _lastPage;
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

    const arrowButton = (disable, run, icon) => {
        return (
            <li className={disable() ? _disabledClass : _enabledClass}
                onClick={run}>
                <a href="#!">
                    <i className="material-icons">{icon}</i>
                </a>
            </li>
        );
    }

    const previousPageButton = () => arrowButton(isFirstPage, decreasePage, "chevron_left");
    const nextPageButton = () => arrowButton(isLastPage, increasePage, "chevron_right");

    const getPageClass = page => {
        const lastPagePrevious = _lastPage - _paginationBorders;
        const firstPageNext = _firstPage + _paginationBorders;

        const dotsConditions = [
            page === lastPagePrevious && _currentPage > lastPagePrevious,
            page === firstPageNext && _currentPage < firstPageNext,
            page === _currentPage + 1,
            page === _currentPage - 1
        ];

        const reducer = (accumulador, valorAtual) => accumulador || valorAtual;
        const dotsTest = dotsConditions.reduce(reducer, false);

        if (isCurrentPage(page)) {
            return _activeClass;
        } else if (isPageVisible(page) || isBigScreen) {
            return _enabledClass;
        } else if (dotsTest) {
            return ""
        }

        return _hideClass;
    }

    const getPagePresentation = page => {
        if (isPageVisible(page) || isBigScreen) {
            return (
                <li key={page}
                    className={getPageClass(page)}
                    onClick={() => changePage(page)}>
                    <a href="#!">{page}</a>
                </li>
            );
        }

        return (
            <li key={page}
                className={getPageClass(page)}>
                <a href="#!">...</a>
            </li>
        );
    }

    const isPageVisible = page => {
        const lastPagePrevious = _lastPage - (_paginationBorders - 1);
        const firstPageNext = _firstPage + (_paginationBorders - 1);
        
        const visibilityConditions = [
            isCurrentPage(page),
            isFirstPage(page),
            isLastPage(page),
            _currentPage >= lastPagePrevious && page >= lastPagePrevious,
            _currentPage <= firstPageNext && page <= firstPageNext
        ];

        const reducer = (accumulador, valorAtual) => accumulador || valorAtual;
        return visibilityConditions.reduce(reducer, false);
    }

    const pagesButtons = () => {
        const pages = [...Array(_lastPage).keys()].map(x => x+1);
        
        return pages.map(page => getPagePresentation(page));
    }

    return (
        <ul className={_paginationClass}>
            {previousPageButton()}
            {pagesButtons()}
            {nextPageButton()}
        </ul>
    );
}

export default Pagination;