import React, { useEffect, useState } from 'react'

import { listBlogs as ListBlogs } from '../graphql/queries'

import { API, graphqlOperation } from 'aws-amplify'

export default () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        try {
            const blogData = await API.graphql(graphqlOperation(ListBlogs))
            setBlogs(blogData.data.listBlogs.items)
        } catch (err) {
            console.log('error fetching blogs ... ', err)
        }
    }

    return (
        <div>
            <pre>{JSON.stringify(blogs, null, 2)}</pre>
        </div>
    )

}