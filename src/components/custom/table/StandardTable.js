import React  from 'react'

import {
    CTable,
    CTableHead,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell
} from '@coreui/react'

function StandardTable({
    head = [],
	data = [],
    isToogle = "",
    handleToogle
}) {

	return (
        <CTable className='text-center'> 
            <CTableHead className='bg-warning'>
               <CTableRow>
                    {head?.map((head, index) => (
                        <CTableHeaderCell key = {index} scope="col">{head}</CTableHeaderCell>
				    ))}
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {data?.map((item = {}, idx) => (
                    <CTableRow key={idx}>
                        {Object.keys(item).map((innerData, idx2) => {
                            return (
                                
                                <CTableDataCell key={idx2}>{item[innerData]}</CTableDataCell>
                            )
                        })}
                    </CTableRow>
				))}
            </CTableBody>
        </CTable>
    )
}

export default StandardTable;
