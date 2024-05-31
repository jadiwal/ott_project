import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Button } from 'reactstrap'
import Badge from 'reactstrap/lib/Badge'
import routes from 'routes'
import moment from 'moment'

const UsersTable = props => {
  const options = {
    sizePerPageRenderer,
    showTotal: true,
    sizePerPageList: [
      {
        text: '5',
        value: 5
      },
      {
        text: '10',
        value: 10
      },
      {
        text: '25',
        value: 25
      },
      {
        text: '50',
        value: 50
      },
      {
        text: 'All',
        value: props.data.length
      }
    ]
  }
  const columns = [
    {
      dataField: 'user_id',
      text: 'Login Id',
      // formatter:attendance_date,
      // formatter: priceFormatter_sub_string,

      // sort:'true',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'user_type',
      text: 'User Type',
      formatter: user_type_validation,

      // sort:'true',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'mobile_no',
      text: 'Mobile No',
      // formatter: priceFormatter_sub_string,

      // sort:'true',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'email_id',
      text: 'Email Id',
      // formatter: priceFormatter_sub_string,

      // sort:'true',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'status',
      text: 'User Status',
      formatter: badge_formatter,

      // sort:'true',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'last_login',
      text: 'Last Login',
      // formatter: badge_formatter,
      formatter: date_formater,
      csvFormatter: (cell, row, rowIndex) =>
        `${moment(cell).format('DD-MM-YYYY HH:mm:ss')}`,
      // sort:'true',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'updated_by',
      text: 'Updated By',
      // formatter: badge_formatter,
      // formatter: date_formater,
      // sort:'true',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'updated_date',
      text: 'Updated Date',
      // formatter: badge_formatter,
      formatter: date_formater,
      csvFormatter: (cell, row, rowIndex) =>
        `${moment(cell).format('DD-MM-YYYY HH:mm:ss')}`,
      // sort:'true',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: '',
      text: 'Edit',
      align: 'center',
      // formatter: badge_formatter,
      formatter: update_data,
      // sort:'true',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      },
      headerAlign: 'center'
    }
  ]

  function update_data (cell, row) {
    return (
      <span>
        <i
          className='fa fa-pencil-square-o'
          onClick={() => props.update_modal_show(row)}
          style={{ color: '#007bff' }}
          aria-hidden='true'
        ></i>
      </span>
    )
  }

  function badge_formatter (cell, row) {
    var col
    if (row.status.toUpperCase() == 'ACTIVE') {
      col = 'success'
    } else {
      col = 'danger'
    }

    return <Badge color={col}>{row.status}</Badge>
  }

  function user_type_validation (cell, row) {
    var type = ''
    if (row.user_type == 'admin') {
      return <Badge color='primary'>Admin</Badge>
    } else if (row.user_type == 'subuser') {
      return <Badge color='info'>Sub User</Badge>
    } else {
      return <Badge color='warning'></Badge>
    }
  }
  function date_formater (cell, row) {
    return <span>{moment(cell).format('DD-MM-YYYY HH:mm:ss')}</span>
  }
 

  function forward_task (cell, row) {
    //   alert(row);
    // con
    var id = row.task_id
    return (
      <Button
        className='btn-round'
        color='primary'
        // type="submit"
        onClick={() => props.modal_forward_show(id)}
        // style={{ backgroundColor: "#007bff" }}
      >
        FORWARD
      </Button>
    )
  }
  return (
    <ToolkitProvider
      keyField='user_id'
      data={props.data}
      columns={columns}
      exportCSV={{
        fileName: 'user_details.csv',
        noAutoBOM: false,
        blobType: 'text/csv;charset=utf-8'
      }}
      search
    >
      {props_ => (
        <div>
          {/* <h3>Input something at below input field:</h3> */}
          {/* <center> */}
          <SearchBar {...props_.searchProps} />

          {/* </center> */}
          <BootstrapTable
            striped
            // hover
            {...props_.baseProps}
            pagination={paginationFactory(options)}
            noDataIndication={'No Record Found'}
          />
          <hr />
          <div align='right'>
            <MyExportCSV {...props_.csvProps} />
            <Button
              className='btn'
              style={{ marginLeft: '5px' }}
              color='secondary'
              onClick={props.navigate_}
            >
              Create New
            </Button>
          </div>
        </div>
      )}
    </ToolkitProvider>
  )
}
const { SearchBar } = Search

// const defaultSorted = [{
//   dataField: 'id',
//   order: 'asc'
// }];
const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange
}) => (
  <div className='btn-group' role='group'>
    {options.map(option => {
      const isSelect = currSizePerPage === `${option.page}`
      return (
        <button
          key={option.text}
          type='button'
          onClick={() => onSizePerPageChange(option.page)}
          className={`btn ${isSelect ? 'btn-primary' : 'btn-secondary'}`}
        >
          {option.text}
        </button>
      )
    })}
  </div>
)

const MyExportCSV = props => {
  const handleClick = () => {
    props.onExport()
  }

  return (
    <Button className='btn' color='success' onClick={handleClick}>
      Export to CSV
    </Button>
  )
}

export default UsersTable
