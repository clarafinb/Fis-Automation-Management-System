import React from 'react'

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

// import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
// import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
// import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
// import moment from 'moment/moment'

function SmartTable({
  data = [],
  filterValue = [],
  columns = [],
  minHeight = 600,
}) {
  const gridStyle = { minHeight: minHeight }
  return (
    <>
      <ReactDataGrid
        idProperty="id"
        style={gridStyle}
        defaultFilterValue={filterValue}
        columns={columns}
        dataSource={data}
        enableColumnAutosize={true}
        pagination
        defaultLimit={15}
      />
    </>
  )
}

export default SmartTable