import React, { useMemo, useRef } from 'react'

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { CCol, CRow } from '@coreui/react';

function DataGrid({
    data = [],
    columns = [],
    minHeight = 600,
    columnConfig = {
        flex: 1,
        minWidth: 300,
        filter: true,
        sortable: true,
        floatingFilter: true,
        wrapText: true,
        autoHeight: true,
    }
}) {
    const gridRef = useRef();

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => {
        return columnConfig;
    }, []);

    return (
        <>
            <CRow>
                <CCol className="ag-theme-alpine"
                    style={{
                        height: minHeight,
                        width: '100%'
                    }}
                >
                    <AgGridReact
                        ref={gridRef}
                        rowData={data}
                        columnDefs={columns}
                        defaultColDef={defaultColDef}
                        animateRows={true}
                        rowSelection={'multiple'}
                        pagination={true}
                        paginationPageSize={50}
                    />
                </CCol>
            </CRow>

        </>
    )
}

export default DataGrid