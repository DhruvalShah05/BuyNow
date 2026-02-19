import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },

    image: { type: String, required: true },
    images: [String],

    category: { type: String, required: true },
    tags: [String],

    price: { type: Number, required: true },
    oldPrice: Number,
    discount: Number,

    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });

  if (this.oldPrice && this.oldPrice > this.price) {
    this.discount = Math.round(
      ((this.oldPrice - this.price) / this.oldPrice) * 100
    );
  }

  next();
});

export default mongoose.model("Product", productSchema);