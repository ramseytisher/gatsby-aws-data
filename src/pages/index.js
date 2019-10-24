import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Data from "../components/data"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Data />

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
