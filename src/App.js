import './App.css'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'

function App() {
  const [rowData, setRowData] = useState([
    { make: 'Ford', model: 'Focus', price: 40000 },
    { make: 'Toyota', model: 'Camry', price: 140000 },
    { make: 'BMW', model: '4 series', price: 240000 },
  ])

  const gridRef = useRef()

  const [columnDefs, setColumnsDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ])

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  )

  const cellClickedListener = useCallback(e => {
    console.log('cellClicked', e)
  }, [])

  // useEffect(() => {
  //   fetch('https://www.ag-grid.com/example-assets/row-data.js')
  //     .then(result => result.json())
  //     .then(rowData => setRowData(rowData))
  // }, [])

  const pushMeClicked = useCallback(e => {
    gridRef.current.ref.api.deselectAll()
  }, [])

  return (
    <div className='ag-theme-alpine-dark' style={{ height: 500 }}>
      <button onClick={pushMeClicked}>Push Me</button>
      <AgGridReact
        ref={gridRef}
        onCellClicked={cellClickedListener}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection='multiple'
        animateRows={true}
        defaultColDef={defaultColDef}
      />
    </div>
  )
}

export default App
