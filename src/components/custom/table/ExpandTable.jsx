import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


const ExpandTable = ({
    columns = [],
    data = [],
    expandRow = {}
}) => {

    return (
        <div>
            <BootstrapTable
                keyField='no'
                data={data}
                columns={columns}
                expandRow={expandRow}
                headerWrapperClasses="foo"
                hover
                condensed
            />
        </div>
    );
};

export default ExpandTable;
