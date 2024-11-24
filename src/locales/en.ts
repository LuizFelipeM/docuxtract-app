import { ResourceLanguage } from "i18next";

export const en: ResourceLanguage = {
  translation: {
    // #region Common
    extractData: "Extract data",
    home: "Home",
    goHome: "Go Home",
    loading: "Loading",
    true: "True",
    false: "False",
    properties: "Properties",
    field: "Field",
    type: "Type",
    required: "Required",
    description: "Description",
    edit: "Edit",
    delete: "Delete",
    results: "Results",
    error: "Error",
    pleaseWait: "Please wait",
    name: "Name",
    en: "English",
    pt: "Portuguese",
    welcome: "Welcome",
    // #endregion

    // #region Home
    beforeStartSubtitle: "Before we start, let's go through the steps below.",

    step1Title: "What do you want to extract?",
    step1Description: "Start by creating a new model by defining the information you want to extract.",
    step1Button: "Create a new schema",

    step2Title: "Time to extract data!",
    step2Description: "Use the created model to extract data from your documents.",
    step2Button: "Extract data",
    // #endregion

    // #region DataExtraction
    errorUnselectedModel: "It is not possible to extract information without a model selected.",
    errorExecutingExtraction: "Error executing extraction! Please contact support team.",
    successDataExtracted: "Extraction completed successfully!",
    // #endregion

    // #region NotFound
    sorryPageNotFound: "Sorry, we couldn't find the page you were looking for.",
    // #endregion

    // #region Schema/SchemaEdit
    successSchemaSaved: "Schema saved successfully!",
    errorSavingSchema: "Error saving schema! Please contact support team.",
    modelDescription: "Schema {{name}} to be extracted",
    unableToFindTheSelectedSchema: "Unable to find the requested schema!",
    // #endregion

    // #region SchemaList
    errorDeletingSchema: "Unable to delete schema, please contact support team.",
    yourSchemas: "Your schemas",
    hereAreAllYourSchemas: "Here are all your created schemas, you can edit and remove them whenever you want.",
    schemaName: "Schema name",
    // #endregion

    // #region SchemaSelect
    chooseASchema: "Choose a schema",
    errorLoadingSchemas: "Error loading schemas",
    // #endregion

    // #region Sidebar
    manageSchemas: "Schema Manager",
    createNewSchema: "Create new schema",
    mySchemas: "My schemas",
    // #endregion    

    // #region JSONTable
    noInfoAvailable: "No information available",
    // #endregion

    // #region FieldEditor
    schemaNameRequired: "The schema name is required!",
    theSchemaMustHaveAtLeastOneField: "Invalid schema, the schema must have at least one field added.",
    invalidSchemaFields: "Invalid schema, please check the required fields before trying to save again.",
    modelName: "Schema Name",
    fieldsToBeExtracted: "Fields to be extracted",
    addFieldsToBeFilledOnDataExtraction: "Add fields that will be filled when using this schema to extract data from your files.",
    addField: "Add Field",
    saveSchema: "Save Schema",
    // #endregion

    // #region FieldProperties
    addProperty: "Add Property",
    typeOfItemsInTheList: "Type of items in the list:",
    // #endregion

    // #region FieldType
    array: "List",
    string: "Text",
    number: "Number",
    datetime: "Date and Time",
    object: "Subschema",
    // #endregion
  },
}