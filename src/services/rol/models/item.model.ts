import mongoose, { Schema, Model, Document } from 'mongoose'

type ItemDocument = Document & {
  name: string
  buyPrice: number | 0
  img: string | null
}

const itemSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true
    },
    buyPrice: {
      type: Schema.Types.Number,
      default: 0
    },
    img: {
      type: Schema.Types.String,
      default: null
    }
  },
  {
    collection: 'items',
    timestamps: true
  }
)

const itemsModel: Model<ItemDocument> = mongoose.model<ItemDocument>(
  'item',
  itemSchema
)

export { itemsModel, ItemDocument }
