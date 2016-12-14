'use strict'

const test = require('tape')
const { parallel } = require('fluture')

const {
  zoneId, authKey,
  emailAddress, dnsRecordIds
} = require(`${ROOT}/private/cloudflareConfig.json`)

const cfDns = require(`${ROOT}/utils/cloudflare.js`)(emailAddress, authKey)

test('cloudflare', t => (
  t.plan(1),
  parallel(
    10,
    dnsRecordIds.map(
      id =>
        cfDns.querySettings(zoneId, id)
    )
  )
  .fork( t.fail, res => t.equals(res.length, dnsRecordIds.length, 'settings returned') )
) )
