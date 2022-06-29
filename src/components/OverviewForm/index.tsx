import { useLazyQuery, useQuery } from "@apollo/client";
import { Button, Grid } from "@mui/material";
import {
  AjvError,
  ISubmitEvent,
  ObjectFieldTemplateProps,
  UiSchema,
  withTheme,
} from "@rjsf/core";
import { Theme } from "@rjsf/material-ui/v5";
import { JSONSchema7 } from "node_modules/@types/json-schema";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { capitalizeFirstLetter } from "src/util";
import AutocompleteTags from "../AutocompleteTags";
import HelloWidget from "../HelloWidget";
import ImageUploader from "../ImageUploader";
import { GET_ONE_OVERVIEW, TOOL_LOGOS_BY_OVERVIEW } from "./query-and-mutation";
import "./style.scss";

const Form = withTheme(Theme);

const widgets = {
  helloWidget: HelloWidget,
  autocompleteWidget: AutocompleteTags,
  uploadWidget: ImageUploader,
};

interface IOverviewFormProps {
  schema: JSONSchema7;
  uiSchema: UiSchema;
  submitButtonText?: string;
  showSuccessMessage?: boolean;
  hide?: boolean;
  columns?: number;
  spacing?: 0 | 6 | 4 | 3 | 1 | 2 | 5 | 7 | 8 | 9 | 10 | undefined;
  disabled?: boolean;
  params: Record<string, number | string>;
  onSubmit: (
    e: ISubmitEvent<any>,
    nativeEvent: React.FormEvent<HTMLFormElement>
  ) => void;
}

const OverviewForm = (
  props: React.PropsWithChildren<IOverviewFormProps>
): JSX.Element => {
  const {
    spacing = 0,
    submitButtonText = "Submit",
    hide,
    children,
    schema: schemaProp,
    uiSchema: uiSchemaProp,
    params,
  } = props;
  const { id: idParam } = params;
  const [schema, setSchema] = useState(schemaProp);
  const pathname = window.location.href;

  const { data: overviewData, loading: queryLoading } = useQuery(
    GET_ONE_OVERVIEW,
    {
      variables: {
        id: Number(idParam) ?? 0,
      },
    }
  );

  const [fetchTools, { data: toolLogos, loading: toolLogoLoading }] =
    useLazyQuery(TOOL_LOGOS_BY_OVERVIEW);

  useEffect(() => {
    if (!overviewData || !idParam) return;
    const { overview_by_pk: selectedOverview } = overviewData;
    if (!selectedOverview) return;

    const {
      id,
      heading,
      nav_heading: navHeading,
      description,
      view_more_description: viewMoreDescription,
      // tool_logos: toolLogos,
      // banner_images: bannerImages,
    } = selectedOverview;

    setSchema((prevSchema) => {
      let properties = prevSchema.properties as any;
      properties.id.default = id;
      properties.heading.default = heading;
      properties.navHeading.default = navHeading;
      properties.description.default = description;
      properties.moreDescription.default = viewMoreDescription;
      return { ...prevSchema, properties };
    });
  }, [idParam, overviewData]);

  useEffect(() => {
    if (pathname.includes("/overview")) {
      const ov_id = pathname.split("/overview/")[1];
      fetchTools({ variables: { ov_id } });
    }
  }, [pathname]);

  // useEffect(() => {
  //   const newSchema = JSON.parse(JSON.stringify(schema));
  //   const curLogos = toolLogos?.tool_logo.map((logo: any) => ({
  //     title: logo.label,
  //   }));
  //   newSchema.properties.toolLogos.options = curLogos;
  //   console.log("~ newSchema", newSchema);
  //   setSchema(newSchema);
  // }, [toolLogos]);

  const transformErrors = (errors: AjvError[]): AjvError[] => {
    return errors.map((error) => {
      const { property = "", name, message = "" } = error;
      let normalizedCamelCaseName: string = property
        .replaceAll(".", "")
        .split(/(?=[A-Z])/)
        .join(" ");
      normalizedCamelCaseName = capitalizeFirstLetter(normalizedCamelCaseName);

      if (name === "pattern") {
        error.message = "Only digits are allowed";
      }

      if (name) {
        error.message = `${normalizedCamelCaseName} ${message}`;
      }

      return error;
    });
  };

  const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
    const { title, description, properties, uiSchema, schema, disabled } =
      props;

    return (
      <div style={{ color: disabled ? "rgba(0,0,0,0.38)" : "unset" }}>
        <p>{title}</p>
        <p>{description}</p>
        <Grid container spacing={spacing}>
          {properties.map(({ content, name }) => {
            const fieldUiSchema = uiSchema[name] ?? {};
            const fieldSchema: any = (schema.properties ?? {})[name] ?? {};
            const { hide = false } = fieldSchema;
            const cols = fieldUiSchema["ui:column"] ?? 12;

            if (hide) return null;

            return (
              <Grid key={name} item xs={cols}>
                <div className="property-wrapper">{content}</div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  // function handleDataChange(dataChange: any) {
  //   console.log(dataChange);
  // }

  if (queryLoading || toolLogoLoading) {
    return (
      <div className="loading">
        <ReactLoading type="spin" color="blue" />
      </div>
    );
  }

  return (
    <div className="overview-form">
      {!hide && (
        <Form
          {...props}
          schema={schema}
          uiSchema={uiSchemaProp}
          showErrorList
          onError={(errs) => console.log(errs)}
          // FieldTemplate={CustomFieldTemplate}
          ObjectFieldTemplate={ObjectFieldTemplate}
          transformErrors={transformErrors}
          widgets={widgets}
          // onChange={handleDataChange}
        >
          {children && <div>{children}</div>}

          {!children && (
            <div style={{ marginTop: "2rem" }}>
              <Button
                type="submit"
                disabled={props.disabled}
                variant="contained"
                color="primary"
              >
                {submitButtonText}
              </Button>
              &nbsp;
              <Button
                type="submit"
                disabled={props.disabled}
                variant="contained"
                color="error"
              >
                Error
              </Button>
            </div>
          )}
        </Form>
      )}
    </div>
  );
};

export default OverviewForm;
