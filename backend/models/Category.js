import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required.'],
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, 'Category description is required.'],
      trim: true,
      maxlength: 180,
    },
    image: {
      type: String,
      required: [true, 'Category image is required.'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model('Category', categorySchema);

export default Category;

