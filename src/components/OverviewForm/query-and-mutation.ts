import { gql } from "@apollo/client";

export const GET_SCHEMAS = gql`
  query FormSchema {
    form_schema {
      id
      schema
      description
    }
  }
`;

export const GET_ALL_OVERVIEW = gql`
  query GetAllOverview {
    overview(order_by: { updated_at: desc }) {
      id
      heading
      nav_heading
      description
      view_more_description
      created_at
      updated_at
    }
  }
`;

export const GET_ONE_OVERVIEW = gql`
  query GetOneOverview($id: Int!) {
    overview_by_pk(id: $id) {
      id
      heading
      nav_heading
      description
      view_more_description
      created_at
      updated_at
    }
  }
`;

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
`;

export const TOOL_LOGOS_BY_OVERVIEW = gql`
  query ToolLogosById($ov_id: String!) {
    tool_logo(where: { overview_id: { _eq: $ov_id } }) {
      id
      label
      value
    }
  }
`;

// Upsert 1 Overview
export const UPSERT_ONE_OVERVIEW = gql`
  mutation (
    $id: Int
    $heading: String!
    $nav_heading: String!
    $description: String!
    $view_more_description: String!
  ) {
    insert_overview_one(
      object: {
        id: $id
        heading: $heading
        nav_heading: $nav_heading
        description: $description
        view_more_description: $view_more_description
      }
      on_conflict: {
        constraint: overview_id_key
        update_columns: [
          heading
          nav_heading
          description
          view_more_description
        ]
      }
    ) {
      id
      heading
      nav_heading
    }
  }
`;

// Upsert many Overview
// mutation {
//   insert_overview(objects: [
//     {
//       id: 13,
//       heading: "updated13"
//       nav_heading: "string",
//       description: "string",
//       view_more_description: "string"
//     }
//   ],
//   	on_conflict: {
//       constraint: overview_id_key,
//       update_columns: [heading, nav_heading]
//     }
//   ) {
//     returning {
//       id
//       heading
//       nav_heading
//     }
//   }
// }

export const fieldsQueryMap: Record<string, any> = {
  Oview: GET_ALL_OVERVIEW,
  Logo: TOOL_LOGOS_BY_OVERVIEW,
};
