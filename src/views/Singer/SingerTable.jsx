// import React from 'react';
// import paginationFactory from 'react-bootstrap-table2-paginator'
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
// import { Link } from 'react-router-dom'
// import { Badge, Button } from 'reactstrap'
// import decrypt from 'utils/Functions/decrypt'
// import constants from 'utils/constants'
// import BootstrapTable from 'react-bootstrap-table-next'

// const SingerTable = () => {
//     const options = {
//         sizePerPageRenderer,
//         showTotal: true,
//         sizePerPageList: [
//           {
//             text: '5',
//             value: 5
//           },
//           {
//             text: '10',
//             value: 10
//           },
//           {
//             text: '25',
//             value: 25
//           },
//           {
//             text: '50',
//             value: 50
//           },
//           {
//             text: 'All',
//             value: props.data.length
//           }
//         ]
//       }
//       const columns = [
//         {
//           dataField: 'id',
//           text: '#',
//           headerStyle: {
//             backgroundColor: '#2c2c2c',
//             color: '#ffffff'
//           }
//         },
//         {
//           dataField: 'name',
//           text: 'Name',
//           headerStyle: {
//             backgroundColor: '#2c2c2c',
//             color: '#ffffff'
//           }
//         },
//         {
//           dataField: 'image',
//           text: 'Image',
//           classes : 'text-center',
//           formatter: image_formater,
//           headerStyle: {
//             backgroundColor: '#2c2c2c',
//             color: '#ffffff'
//           }
//         },
//         // {
//         //   dataField: 'status',
//         //   text: 'Status',
//         //   classes : 'text-center',
//         //   formatter: status_formatter,
//         //   headerStyle: {
//         //     backgroundColor: '#2c2c2c',
//         //     color: '#ffffff'
//         //   }
//         // },
//         {
//           dataField: 'inserted_by',
//           text: 'assembly',
//           headerStyle: {
//             backgroundColor: '#2c2c2c',
//             color: '#ffffff'
//           }
//         },
//         {
//           dataField: 'inserted_date',
//           text: 'inserted date',
//           formatter: date_formater,
//           csvFormatter: (cell, row, rowIndex) =>
//             `${moment(cell).format('DD-MM-YYYY HH:mm:ss')}`,
//           // sort:'true',
//           headerStyle: {
//             backgroundColor: '#2c2c2c',
//             color: '#ffffff'
//           }
//         },
//         {
//           dataField: 'updated_by',
//           text: 'updated by',
//           headerStyle: {
//             backgroundColor: '#2c2c2c',
//             color: '#ffffff'
//           }
//         },
//         {
//           dataField: 'updated_date',
//           text: 'updated date',
//           formatter: date_formater,
//           csvFormatter: (cell, row, rowIndex) =>
//             `${moment(cell).format('DD-MM-YYYY HH:mm:ss')}`,
//           // sort:'true',
//           headerStyle: {
//             backgroundColor: '#2c2c2c',
//             color: '#ffffff'
//           }
//         },
//         {
//           dataField: '',
//           text: 'UPDATE',
//           csvExport : false,
//           formatter: update_lang,
//           headerStyle: {
//             backgroundColor: '#2c2c2c',
//             color: '#ffffff'
//           }
//         }
//       ]
//       function date_formater (cell, row) {
//         return <span>{moment(cell).format('DD-MM-YYYY HH:mm:ss')}</span>
//       }
    
//       function image_formater (cell, row) {
//         return <img src={constants.url + cell}  style={{maxWidth : "100px" , minWidth : "99px"}}/>
//       }

//       function update_lang (cell, row) {
//         return (
//           <Button
//             className='btn-round'
//             size='sm'
//             color='success'
//             onClick={() => props.modal_update_show(row)}
//           >
//             UPDATE
//           </Button>
//         )
//       }
//     return (
//         <ToolkitProvider
//           keyField='id'
//           data={props.data}
//           columns={columns}
//           exportCSV={{
//             fileName: 'Language.csv',
//             noAutoBOM: true,
//             blobType: 'text/csv;charset=utf-8'
//           }}
//           search
//         >
//           {props => (
//             <div>
//               <div className='d-flex justify-content-between align-items-center'>
//               <MyExportCSV {...props.csvProps} />
//               <SearchBar {...props.searchProps} />
//               </div>
//               <BootstrapTable
//                 striped
//                 {...props.baseProps}
//                 pagination={paginationFactory(options)}
//                 noDataIndication={'No Record Found'}
//                 // wrapperClasses="table-responsive"
//               />
//               <hr />
//               {/* <MyExportCSV {...props.csvProps} /> */}
//             </div>
//           )}
//         </ToolkitProvider>
//       )

      
// }

// const { SearchBar } = Search
// const sizePerPageRenderer = ({
//   options,
//   currSizePerPage,
//   onSizePerPageChange
// }) => (
//   <div className='btn-group' role='group'>
//     {options.map(option => {
//       const isSelect = currSizePerPage === `${option.page}`
//       return (
//         <button
//           key={option.text}
//           type='button'
//           onClick={() => onSizePerPageChange(option.page)}
//           className={`btn ${isSelect ? 'btn-primary' : 'btn-secondary'}`}
//         >
//           {option.text}
//         </button>
//       )
//     })}
//   </div>
// )

// const MyExportCSV = props => {
//   const handleClick = () => {
//     props.onExport()
//   }
//   return (
//     <div align='d-flex'>
//       <Button className='btn' color='success' onClick={handleClick}>
//         Export to CSV
//       </Button>{' '}
//       <Link className='btn btn-primary ml-3' to={'/admin/add-language'}>
//         Create Language
//       </Link>
//     </div>
//   )
// }

// export default SingerTable;
