import React, { Component, Fragment } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Route } from 'vtex.my-account-commons/Router'
import { FormattedMessage } from 'react-intl'
import { Table, Spinner } from 'vtex.styleguide'
import { ContentWrapper } from 'vtex.my-account-commons'
import withInjectedProps from './withInjectedProps'

const headerConfig = {
  titleId: 'oldorders.title',
  backButton: {
    path: '/orders',
    title: <FormattedMessage id="orders.title" />,
  },
}

const formatOrderValue = (properties, orderValue) => {
  if (!orderValue) {
    return <span></span>
  }

  let content = orderValue
  switch (properties.type) {
    case 'string': {
      switch (properties.format) {
        case 'date-time': {
          const date = moment(orderValue)
          content = date.isValid() ? date.format('DD/MM/YYYY hh:mm:ss') : ''
          break
        }
        default: {
          content = orderValue
          break
        }
      }
      break
    }
    case 'number': {
      content = Number(orderValue / 100).toFixed(2)
      break
    }
    case 'boolean': {
      content = orderValue ? (
        <FormattedMessage id="store/oldorders.yesLabel" />
      ) : (
        <FormattedMessage id="store/oldorders.noLabel" />
      )
      break
    }
    case 'url': {
      content = orderValue
      break
    }
    default: {
      content = orderValue
    }
  }

  return <span className="dib oo-table-content tb-1">{content}</span>
}

const getJsonSchema = schema => {
  const schemaProperties = Object.keys(schema)
  return {
    properties: schemaProperties.reduce((oldSchema, schemaKey) => {
      return {
        ...oldSchema,
        [schemaKey]: {
          title: <FormattedMessage id={schema[schemaKey].title} />,
          cellRenderer: ({ cellData, rowData }) => {
            return formatOrderValue(schema[schemaKey], cellData)
          },
        },
      }
    }, {}),
  }
}

const tableLength = 5
const initialState = {
  orders: [],
  schema: {},
  tableLength: tableLength,
  currentPage: 1,
  slicedData: [],
  isLoading: true,
  currentItemFrom: 0,
  currentItemTo: tableLength,
}

class OldOrders extends Component {
  constructor(props) {
    super(props)

    this.state = initialState

    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.handleRowsChange = this.handleRowsChange.bind(this)
  }

  componentDidMount() {
    axios({
      url: '/_v/getOldOrders',
      method: 'get',
    })
      .then(response => {
        const orders = (response.data && response.data.orders) || []
        this.setState({
          orders,
          slicedData: orders.slice(0, this.state.tableLength),
          schema: (response.data && response.data?.schema) || {},
          isLoading: false,
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  handleNextClick() {
    const newPage = this.state.currentPage + 1
    const itemFrom = this.state.currentItemTo + 1
    const itemTo = this.state.tableLength * newPage
    const data = this.state.orders.slice(itemFrom - 1, itemTo)
    this.goToPage(newPage, itemFrom, itemTo, data)
  }

  handlePrevClick() {
    if (this.state.currentPage === 0) return
    const newPage = this.state.currentPage - 1
    const itemFrom = this.state.currentItemFrom - this.state.tableLength
    const itemTo = this.state.currentItemFrom - 1
    const data = this.state.orders.slice(itemFrom - 1, itemTo)
    this.goToPage(newPage, itemFrom, itemTo, data)
  }

  goToPage(currentPage, currentItemFrom, currentItemTo, slicedData) {
    this.setState({
      currentPage,
      currentItemFrom,
      currentItemTo,
      slicedData,
    })
  }

  handleRowsChange(e, value) {
    const currentItemTo = parseInt(value)
    const slicedData = this.state.orders.slice(
      this.state.currentItemFrom,
      currentItemTo + this.state.currentItemFrom
    )
    this.setState({
      tableLength: parseInt(value),
      currentItemTo,
      slicedData,
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )
    }

    return (
      <ContentWrapper {...headerConfig}>
        {() => (
          <div className="center w-100 helvetica">
            <Table
              schema={getJsonSchema(this.state.schema)}
              items={this.state.slicedData}
              emptyStateLabel={
                <FormattedMessage id="store/oldorders.emptyStateLabel" />
              }
              loading={this.state.isLoading}
              pagination={{
                onNextClick: this.handleNextClick,
                onPrevClick: this.handlePrevClick,
                currentItemFrom: this.state.currentItemFrom,
                currentItemTo: this.state.currentItemTo,
                onRowsChange: this.handleRowsChange,
                textShowRows: (
                  <FormattedMessage id="store/oldorders.showRows" />
                ),
                textOf: <FormattedMessage id="store/oldorders.of" />,
                totalItems: this.state.orders.length,
                rowsOptions: [5, 10, 15, 25],
              }}
            />
          </div>
        )}
      </ContentWrapper>
    )
  }
}

const OldOrdersWithRoute = () => (
  <Fragment>
    <Route path="/old-orders" component={withInjectedProps(OldOrders)} />
  </Fragment>
)

export default OldOrdersWithRoute
