import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'

import DeleteIcon from '@material-ui/icons/Delete'
import ConfigureIcon from '@material-ui/icons/Build'

import useFetchAll from 'client/hooks/useFetchAll'
import useOpennebula from 'client/hooks/useOpennebula'
import ListCards from 'client/components/List/ListCards'
import { HostCard } from 'client/components/Cards'

const Hosts = memo(({ hidden, data }) => {
  const {
    hosts
  } = data?.TEMPLATE?.PROVISION_BODY?.provision?.infrastructure

  const { getHost } = useOpennebula()
  const { data: list, fetchRequestAll, loading } = useFetchAll()

  useEffect(() => {
    if (!list && !hidden) {
      const reqs = hosts?.map(({ id }) => getHost({ id }))
      fetchRequestAll(reqs)
    }
  }, [hidden])

  return (
    <ListCards
      list={list}
      isLoading={loading}
      CardComponent={HostCard}
      cardsProps={({ value: { ID } }) => ({
        actions: [
          {
            handleClick: () => undefined,
            icon: ConfigureIcon,
            cy: `provision-host-configure-${ID}`
          },
          {
            handleClick: () => undefined,
            icon: DeleteIcon,
            cy: `provision-host-delete-${ID}`
          }
        ]
      })}
      displayEmpty
      breakpoints={{ xs: 12, md: 6 }}
    />
  )
}, (prev, next) => prev.hidden === next.hidden)

Hosts.propTypes = {
  data: PropTypes.object.isRequired,
  hidden: PropTypes.bool
}

Hosts.defaultProps = {
  data: {},
  hidde: false
}

Hosts.displayName = 'Hosts'

export default Hosts