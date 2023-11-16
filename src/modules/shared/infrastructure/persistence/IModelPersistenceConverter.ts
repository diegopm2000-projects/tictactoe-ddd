export interface IModelPersistenceConverter<Model, ModelPersistence, ModelPersistenceToModelResponse> {
  modelToModelPersistence(model: Model): ModelPersistence
  modelPersistenceToModel(modelPersistence: ModelPersistence): ModelPersistenceToModelResponse
}
