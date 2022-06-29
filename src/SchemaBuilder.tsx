import Oview from "./pages/Oview";
import { useQuery } from "@apollo/client";
import { GET_SCHEMAS } from "./components/OverviewForm/query-and-mutation";

function getOvSchema(schemas: any) {
  let result = null;
  const currSchema = schemas.form_schema[0] || null;
  if (currSchema) {
    try {
      result = JSON.parse(decodeURIComponent(currSchema.schema));
    } catch (error) {
      console.error(error);
    }
  }

  return result;
}

function fieldsWithRelationship(schema: any) {
  const result = new Map();
  const fields = { ...schema.definitions };
  for (const key in fields) {
    if (fields[key].dep) result.set(fields[key].dep, key);
  }

  return result;
}

function getIndieSelectField(schema: any) {
  const fields = new Set();
  for (const key in schema.definitions) {
    if (!schema.definitions[key].dep) fields.add(key);
  }

  return fields;
}

function SchemaBuilder() {
  const { data: schemas, loading: schLoading } = useQuery(GET_SCHEMAS);

  if (schLoading) return <h2>Loading...</h2>;
  const schema = getOvSchema(schemas);

  const depField = fieldsWithRelationship(schema);
  const indieSelectField = getIndieSelectField(schema);
  console.log("~ indieSelectField", indieSelectField);

  if (schemas) return <Oview schema={schema} depField={depField} />;

  return null;
}

export default SchemaBuilder;
