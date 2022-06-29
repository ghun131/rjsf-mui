import { useState, useEffect } from "react";
import { withTheme } from "@rjsf/core";
import { useQuery, useApolloClient } from "@apollo/client";
import { Button } from "@mui/material";
import { JSONSchema7 } from "node_modules/@types/json-schema";
import { Theme } from "@rjsf/material-ui/v5";
import { diff } from "json-diff";
import {
  GET_ALL_OVERVIEW,
  TOOL_LOGOS_BY_OVERVIEW,
  fieldsQueryMap,
} from "src/components/OverviewForm/query-and-mutation";

const Form = withTheme(Theme);

function addOptionsToSelection(options: any, schema: any, fieldName: string) {
  const newSchema = JSON.parse(JSON.stringify(schema));

  newSchema.definitions[fieldName].anyOf = options;

  return newSchema;
}

function Oview({
  schema: gSchema,
  indieSelectField,
}: {
  schema: JSONSchema7;
  depField: any;
  indieSelectField: string[];
}) {
  const [formData, setFormData] = useState<{ Oview?: string }>({});
  const [focus, setFocus] = useState("");
  const client = useApolloClient();
  const [schema, setSchema] = useState(gSchema);

  useEffect(() => {
    async function fetchOptionsSelection(field: string) {
      const result = await client.query({
        query: fieldsQueryMap[field],
      });
      const newSchema = addOptionsToSelection(
        result.data.overview.map((ov: any) => ({
          type: "string",
          enum: [ov.id],
          title: ov.heading,
        })),
        schema,
        field
      );

      setSchema(newSchema);
    }

    for (const item of indieSelectField) {
      fetchOptionsSelection(item);
    }
  }, [focus]);

  useEffect(() => {
    async function fetchTools(ovId: string) {
      const result = await client.query({
        query: TOOL_LOGOS_BY_OVERVIEW,
        variables: { ov_id: formData.Oview?.toString() },
      });
      const newSchema = JSON.parse(JSON.stringify(schema));
      if (result.data.tool_logo.length === 0) {
        addOptionsToSelection(
          [{ type: "string", enum: [""], title: "" }],
          schema,
          "Logo"
        );
      } else {
        addOptionsToSelection(
          result.data.tool_logo.map((logo: any) => ({
            type: "string",
            enum: [logo.id],
            title: logo.label,
          })),
          schema,
          "Logo"
        );
      }
      console.log("newSchema", newSchema);

      setSchema(newSchema);
    }

    formData.Oview && fetchTools(formData.Oview?.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, client]);

  return (
    <Form
      schema={schema}
      uiSchema={{}}
      showErrorList
      onError={(errs) => console.log(errs)}
      formData={formData}
      onFocus={(field) => {
        field && setFocus(field.split("_")[1]);
        console.log("focus", field);
      }}
      onChange={(data: { formData: Record<string, any> }) => {
        console.log("form", data);
        data.formData && setFormData((prev) => ({ ...prev, ...data.formData }));
      }}
      onBlur={(field, more) => {
        console.log("leave", field);
      }}
    >
      <div style={{ marginTop: "2rem" }}>
        <Button type="submit" variant="contained" color="primary">
          Close
        </Button>
        &nbsp;
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default Oview;
