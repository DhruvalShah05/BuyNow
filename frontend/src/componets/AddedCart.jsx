import React from "react";
import { FaTrash } from "react-icons/fa";

function AddedCart({ item, onQtyChange, onRemove }) {
  const { product, quantity } = item;

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      {/* Product */}
      <td className="py-4 flex items-center gap-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-16 h-16 object-contain bg-gray-100 p-2 rounded"
        />
        <div>
          <p className="font-medium">{product.title}</p>
          <p className="text-sm text-gray-500">
            Stock: {product.stock}
          </p>
        </div>
      </td>

      {/* Price */}
      <td className="py-4 text-center font-medium">
        ₹{product.price.toFixed(2)}
      </td>

      {/* Quantity */}
      <td className="py-4 text-center">
        <input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) =>
            onQtyChange(product._id, Number(e.target.value))
          }
          className="w-16 border rounded px-2 py-1 text-center"
        />
      </td>

      {/* Subtotal */}
      <td className="py-4 text-right font-semibold">
        ₹{(product.price * quantity).toFixed(2)}
      </td>

      {/* Remove */}
      <td className="py-4 text-center">
        <button
          onClick={() => onRemove(product._id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default AddedCart;