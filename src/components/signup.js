import React, { useEffect, useReducer } from 'react'
import { Formik } from 'formik'

import { API, graphqlOperation } from 'aws-amplify'

import { createAccount as CreateAccount } from '../graphql/mutations'
import { listAccounts as ListAccounts } from '../graphql/queries'

const initialState = {
    first: "",
    last: ""
}

function reducer(state, action) {
    switch(action.type) {
        case 'SET_ACCOUNTS': return { ...state, accounts: action.accounts }
        case 'SET_INPUT': return { ...state, [action.key]: action.value }
        case 'CLEAR_INPUT': return { ...initialState, accounts: state.accounts}
        case 'ADD_ACCOUNT': return { ...state, accounts: [...state.accounts, action.account] }
        default: return state
    }
}

export default () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        try {
            const accountData = await API.graphql(graphqlOperation(ListAccounts))
            console.log('data from API: ', accountData)
            dispatch({ type: 'SET_ACCOUNTS', accounts: accountData.data.listAccounts.items })
        } catch (error) {
            console.log('error fetching data ... ', error)
        }
    }

    async function createAccount({first, last}) {

        console.log('creating account for: ', state)

        if (first === '' || last === '') return

        console.log('here')

        const account = { first, last }
        const accounts = [...state.accounts, account]
        dispatch({ type: 'SET_ACCOUNTS', accounts })
        dispatch({ type: 'CLEAR_INPUT' })

        try {
            await API.graphql(graphqlOperation(CreateAccount, { input: account }))
            console.log('account created')
        } catch (error) {
            console.log('error creating account', error)
        }
    }

    return (
        <div>
            form goes here
            <Formik
                initialValues={initialState}
                validate={values => {
                    let errors = {}
                    console.log("validating: ", values)
                    if (values.first === "") {
                        errors.first = 'Required'
                    } else if (values.last === "") {
                        errors.last = 'Required'
                    }
                    return errors
                }}
                onSubmit={values => createAccount(values)}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="first"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first}
                        />
                        {errors.first && touched.first && errors.first}
                        <input
                            type="text"
                            name="last"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last}
                        />
                        {errors.last && touched.last && errors.last}
                        <button type="submit" disabled={errors.first || errors.last || isSubmitting}>submit</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}