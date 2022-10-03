import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import './styles/OldOrdersTable.css'

const CSS_HANDLES = ['tableContainer']

const withInjectedProps = WrappedComponent => props => {
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div className={handles.tableContainer}>
      <WrappedComponent {...props} />
    </div>
  )
}

export default withInjectedProps
