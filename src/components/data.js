import React, { useEffect, useState } from 'react'

import { listAccounts as ListAccounts } from '../graphql/queries'

import { API, graphqlOperation } from 'aws-amplify'

export default () => {
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        try {
            const accountData = await API.graphql(graphqlOperation(ListAccounts))
            console.log('accountData: ', accountData)
            setAccounts(accountData.data.listAccounts.items)
        } catch (err) {
            console.log('error fetching accounts ... ', err)
        }
    }

    return (
        <div>
            <pre>{JSON.stringify(accounts, null, 2)}</pre>
        </div>
    )

}