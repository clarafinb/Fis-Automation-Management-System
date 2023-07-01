import React from 'react'

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'

import moment from 'moment/moment'

function SmartTable({
  data = [],
  filterValue = [],
  columns = [],
  minHeight = 600
}) {
  const gridStyle = { minHeight: minHeight }
  return (
    <>
      <div>
        <ReactDataGrid
          idProperty="id"
          style={gridStyle}
          defaultFilterValue={filterValue}
          columns={columns}
          dataSource={data}
          pagination
          defaultLimit={15}
        />
      </div>
    </>
  )
}

export default SmartTable