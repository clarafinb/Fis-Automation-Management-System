import React  from 'react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'

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
    handleToogle,
    hide = [],
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
                            if (hide.length && hide.includes(innerData)) return;
                            return (
                                <>
                                    {isToogle !== "" && isToogle === innerData
                                    ? <CTableDataCell key={idx2}>
                                        <ToggleSwitch 
                                            checked={() => item[innerData]} 
                                            size="lg" 
                                            handleChecked = {handleToogle} 
                                            id={idx} //asumsi index adalah key nya
                                            className= "d-flex justify-content-center"  
                                        />
                                    </CTableDataCell>
                                    : <CTableDataCell key={idx2}>{item[innerData]}</CTableDataCell>  }
                                </>
                                
                                
                            )
                        })}
                    </CTableRow>
				))}
            </CTableBody>
        </CTable>
    )
}

export default StandardTable;
