import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [
    {
        dataField: 'id',
        text: 'Product ID'
    },
    {
        dataField: 'name',
        text: 'Product Name'
    },
    {
        dataField: 'price',
        text: 'Product Price'
    }
];

const products = [
    {
        id: 1,
        name: 'test',
        price: 2500
    },
    {
        id: 2,
        name: 'test',
        price: 2500
    },
    {
        id: 3,
        name: 'test',
        price: 2500
    }
]

const Test = () => {
    const expandRow = {
        renderer: row => (
            <div>
                <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
                <p>You can render anything here, also you can add additional data on every row object</p>
                <p>expandRow.renderer callback will pass the origin row object to you</p>
            </div>
        ),
        showExpandColumn: true
    };

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={products}
                columns={columns}
                expandRow={expandRow}
            />
        </div>
    );
};

export default Test;
