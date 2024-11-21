import { ResourceLanguage } from "i18next";

export const pt: ResourceLanguage = {
  translation: {
    // #region Common
    extractData: "Extrair dados",
    goHome: "Voltar ao início",
    loading: "Carregando",
    true: "Sim",
    false: "Não",
    properties: "Propriedades",
    field: "Campo",
    type: "Tipo",
    required: "Obrigatório",
    description: "Descrição",
    edit: "Editar",
    delete: "Deletar",
    results: "Resultados",
    error: "Erro",
    pleaseWait: "Por favor aguarde",
    name: "Nome",
    en: "Inglês",
    pt: "Português",
    // #endregion

    // #region DataExtraction
    errorUnselectedModel: "Não é possível extrair informações sem um modelo selecionado.",
    errorExecutingExtraction: "Erro ao executar extração! Por favor, entre em contato com o time de suporte.",
    successDataExtracted: "Extração realizada com sucesso!",
    // #endregion

    // #region NotFound
    sorryPageNotFound: "Desculpa, nós não conseguimos encontrar a página que você estava procurando.",
    // #endregion

    // #region Schema/SchemaEdit
    successSchemaSaved: "Modelo salvo com sucesso!",
    errorSavingSchema: "Erro ao salvar modelo! Por favor, entre em contato com o time de suporte.",
    modelDescription: "Modelo {{name}} a ser extraído",
    unableToFindTheSelectedSchema: "Não é possível encontrar o modelo solicitado para edição!",
    // #endregion

    // #region SchemaList
    errorDeletingSchema: "Não foi possível deletar o modelo, por favor, entre em contato com o time de suporte.",
    yourSchemas: "Seus modelos",
    hereAreAllYourSchemas: "Aqui estão todos os seus modelos criados, você pode edita-los e remove-los quando desejar.",
    schemaName: "Nome do modelo",
    // #endregion

    // #region SchemaSelect
    chooseASchema: "Escolha um modelo",
    errorLoadingSchemas: "Erro ao carregar modelos",
    // #endregion

    // #region Sidebar
    manageSchemas: "Gerenciador de modelos",
    createNewSchema: "Criar novo modelo",
    mySchemas: "Meus modelos",
    // #endregion    

    // #region FieldEditor
    schemaNameRequired: "O nome do modelo é obrigatório!",
    theSchemaMustHaveAtLeastOneField: "Modelo inválido, o modelo deve ter ao menos 1 campo adicionado.",
    invalidSchemaFields: "Modelo inválido, por favor, verifique os campos obrigatórios antes de tentar salvar novamente.",
    modelName: "Nome do modelo",
    fieldsToBeExtracted: "Campos a serem extraídos",
    addFieldsToBeFilledOnDataExtraction: "Adicione campos que serão preenchidos ao utilizar este modelo para extrair os dados de seus arquivos.",
    addField: "Adicionar Campo",
    saveSchema: "Salvar Modelo",
    // #endregion

    // #region FieldProperties
    addProperty: "Adicionar Propriedade",
    typeOfItemsInTheList: "Tipo de itens na lista:",
    // #endregion

    // #region FieldType
    array: "Lista",
    string: "Texto",
    number: "Número",
    datetime: "Data e Hora",
    object: "Submodelo",
    // #endregion
  },
}