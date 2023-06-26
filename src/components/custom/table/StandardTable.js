import React, {useEffect, useState, useMemo}  from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot} from '@fortawesome/free-solid-svg-icons'
import { handleKeypressEnter } from 'src/utils/handleKeyPressEnter'
import debounce from "lodash.debounce"

function StandardTable({
    head = [],
	data = [],
    isToogle = "",
    handleToogle,
    hide = [],
    isComponent = false,
    component = {},
    handleComponent,
    withAccordion = null,
    onChecked,
	onCheckedAll,
	sorting = true,
    classNameCol = [],
    id,
    classNameContainer = "overflow-x-auto overflow-y-visible rounded-lg border",
    searchFilter,
    onFilter,
	autoSearch = true,
}) {
	const [search, setSearch] = useState({});
    const [dataTable, setDataTable] = useState([]);

    const handleChange = debounce(
		(e, i) => {
			const { value, name } = e.target;
			const input = document.getElementById(`field-${i}`);
			input.style.width = value ? `${value.length * 5 + name.length * 7}px` : `${name.length * 14}px`;
			setSearch((prev) => {
				return {
					...prev,
					[name]: value.toLowerCase()
				};
			});
		},
		autoSearch ? 500 : 0
	);

    useEffect(() => {
		if (Object.values(search).length && autoSearch) {
            let temp = []

            Object.keys(search).map((key) => (
                temp = temp.length > 0 ? temp.filter(row => row[key].toLowerCase().includes(search[key])) : data.filter(row => row[key].toLowerCase().includes(search[key]))
            ))

            setDataTable(temp)
		}
	}, [search]);

    useEffect(() => {
		setDataTable(data)
	}, [data]);

	return (
        <>
            <div className={classNameContainer}>
                <CTable className='text-center' small responsive>
                    <CTableHead>
                        <CTableRow className='bg-warning'>
                            {head?.map((head, index) => (
                                <CTableHeaderCell key = {index} scope="col">{head}</CTableHeaderCell>
                            ))}
                        </CTableRow>
                        <CTableRow>
                            {searchFilter && onChecked && (
                                <CTableHeaderCell></CTableHeaderCell>
                            )}

                            {searchFilter &&
                                head.map((name, index) => {
                                    const key = Object.entries(searchFilter);
                                    const isKey = key.find(([key]) => key === name);
                                    return (
                                        <CTableHeaderCell key={index} className={`${!!Object.values(search ?? {}).filter((e) => e).length && "bg-primary/10"} ${classNameCol[head]}`}>
                                            <input
                                                type="text"
                                                name={isKey?.[1]}
                                                onChange={(e) => handleChange(e, index)}
                                                className="input form-control input-bordered bg-white input-ghost h-10 focus:text-black text-black text-md font-normal transition-all duration-300 text-center px-1"
                                                style={{ width: `${name.length * 14}px` }}
                                                placeholder={name}
                                                id={`field-${index}`}
                                                hidden={!key.some(([key]) => key === name)}
                                                onKeyUp={(e) => handleKeypressEnter(e, () => onFilter?.(search))}
                                            />
                                        </CTableHeaderCell>
                                    );
                                })
                            }
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {dataTable?.map((item = {}, idx) => (
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
            </div>
        </>
    )
}

export default StandardTable;
