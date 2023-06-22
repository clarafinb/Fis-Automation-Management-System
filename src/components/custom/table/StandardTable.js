import React  from 'react'
import ToggleSwitch from 'src/components/custom/toggle/ToggleSwitch'

import {
    CTable,
    CTableHead,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
    CButton
} from '@coreui/react'

function StandardTable({
    head = [],
	data = [],
    isToogle = "",
    handleToogle,
    hide = [],
    isComponent = false,
    component = {},
    handleComponent
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
                            if(isToogle !== "" && isToogle === innerData) {
                                return (
                                    <>
                                        <CTableDataCell key={idx2}>
                                            <ToggleSwitch 
                                                checked={() => item[innerData]} 
                                                size="lg" 
                                                handleChecked = {handleToogle} 
                                                id={idx} //asumsi index adalah key nya
                                                className= "d-flex justify-content-center"  
                                            />
                                        </CTableDataCell>
                                    </>
                                )
                            }else if(isComponent && component.find(e => e.name === innerData)){
                                let comp = component.find(e => e.name === innerData)
                                if(comp?.type === "button"){
                                    return (
                                        <span key={idx2}>
                                            <CButton 
                                                onClick={() => {handleComponent(comp?.name, item[innerData], idx)}} 
                                                color= {comp?.color ? comp.color : "info"}
                                            >
                                                {comp?.label ? comp.label : innerData}
                                            </CButton>
                                        </span>
                                    )
                                }else if(comp?.type === "icon"){
                                    return (
                                        <div
                                            key={idx2} 
                                            onClick={() => {handleComponent(comp?.name, item[innerData],idx)}} 
                                        >
                                            {comp?.label}
                                        </div>
                                    )
                                }else{
                                    return (
                                        <CTableDataCell key={idx2}>{item[innerData]}</CTableDataCell>
                                    )
                                }
                            }else{
                                return (
                                    <CTableDataCell key={idx2}>{item[innerData]}</CTableDataCell>
                                )
                            }
                        })}
                    </CTableRow>
				))}
            </CTableBody>
        </CTable>
    )
}

export default StandardTable;
