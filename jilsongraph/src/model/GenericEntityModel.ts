type GenericEntityModel<T extends string> = { [category in T]: unknown };

export default GenericEntityModel;
