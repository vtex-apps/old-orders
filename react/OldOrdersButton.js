import { Route } from 'vtex.my-account-commons/Router'
import { Button } from 'vtex.styleguide'
import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

const OldOrdersButton = props => {
  return (
    <Button href="#/old-orders">
      <FormattedMessage id="store/oldorders.orderButton" />
    </Button>
  )
}

const OldOrdersButtonWithRoute = () => (
  <Fragment>
    <Route path="/orders" component={OldOrdersButton} />
  </Fragment>
)

export default OldOrdersButtonWithRoute
