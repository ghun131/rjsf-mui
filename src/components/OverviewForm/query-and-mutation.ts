import { gql } from '@apollo/client'

export const GET_ALL_OVERVIEW = gql`
  query MyQuery {
    overview {
      id
      nav_heading
      view_more_description
      heading
      description
    }
  }
`

export const CREATE_ONE_OVERVIEW = gql`
  mutation (
    $heading: String!
    $nav_heading: String!
    $description: String!
    $view_more_description: String!
  ) {
    insert_overview(
      objects: {
        heading: $heading
        nav_heading: $nav_heading
        description: $description
        view_more_description: $view_more_description
      }
    ) {
      affected_rows
      returning {
        heading
      }
    }
  }
`
