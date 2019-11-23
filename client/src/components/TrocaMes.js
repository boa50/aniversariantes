import React from 'react';
import Pagination from './Pagination';

const TrocaMes = (props) => {

    return (
        <div className="center">
            <Pagination 
                mediaQueries={props.mediaQueries}
                listener={props.listener}
                page={props.mes}
                lastPage={12}/>
        </div>
    );
}

export default TrocaMes;