import { CCol, CRow } from '@coreui/react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useCallback } from 'react'
import DataGrid from 'src/components/custom/table/DataGrid';

const Test = () => {

    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(result => result.json())
            .then((rowData) => {
                const result = rowData.slice(0, 10)


                const res = result.map(row => {
                    return {
                        ...row,
                        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
                    }
                })

                setRowData(rowData)
            })
    }, []);

    const handleComponent = (action, data) => {
        console.log(data)
    }

    const handleEdit = (params) => {
        return (
            <FontAwesomeIcon
                icon={faPencil}
                className='textBlue px-2'
                size='lg'
                title='Edit'
                onClick={() => handleComponent('edit', params)}
            />
        )
    };

    const [columnDefs, setColumnDefs] = useState([
        { field: 'athlete', headerName: 'Nama Atlit' },
        {
            headerName: 'Deskripsi',
            field: 'age',
            wrapText: true,
            autoHeight: true,
        },
        { field: 'country' },
        {
            field: 'year',
            filter: 'agTextColumnFilter',
            suppressMenu: true,
        },
        {
            field: 'date',
            minWidth: 215,
            filter: 'agDateColumnFilter',
            suppressMenu: true,
        },
        { field: 'sport', suppressMenu: true, filter: 'agTextColumnFilter' },
        {
            field: 'gold',
            filter: 'agNumberColumnFilter',
            filterParams: {
                buttons: ['apply'],
            },
            suppressMenu: true,
        },
        {
            field: 'silver',
            filter: 'agNumberColumnFilter',
            floatingFilterComponentParams: {
                suppressFilterButton: true,
            },
        },
        {
            field: 'bronze',
            filter: 'agNumberColumnFilter',
            floatingFilterComponentParams: {
                suppressFilterButton: true,
            },
        },
        {
            headerName: 'Rendered Value',
            field: 'total',
            pinned: 'left',
            minWidth: 50,
            suppressMenu: true,
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params) => {
                return handleEdit(params)
            }
        },
    ]);

    return (
        <>
            <DataGrid
                data={rowData}
                columns={columnDefs}
            />
        </>
    )
}

export default Test
