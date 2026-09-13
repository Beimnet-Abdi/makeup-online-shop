"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  category: string | null;
  price: string;
  description: string | null;
  image: string;
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productFile, setProductFile] = useState<File | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  // Parse errors safely
  const parseErrorMessage = (err: unknown): string => {
    if (!err) return "An unknown error occurred.";
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message;
    if (typeof err === "object" && err !== null) {
      const sbErr = err as {
        message?: string;
        details?: string;
        hint?: string;
      };
      return sbErr.message || JSON.stringify(err);
    }
    return String(err);
  };

  // Safe unique filename generator
  const generateFileName = (file: File) => {
    const rawExt = file.name.split(".").pop() || "jpg";
    const cleanExt = rawExt.toLowerCase().replace(/[^a-z0-9]/g, "");
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    return `products/${timestamp}-${randomSuffix}.${cleanExt}`;
  };

  // Shared fetching function for post-submission refreshes
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setProducts(data);
    } catch (err: unknown) {
      alert(`Error fetching products: ${parseErrorMessage(err)}`);
    }
  };

  // Fixed useEffect to prevent synchronous setState lint/compiler warnings
  useEffect(() => {
    let isSubscribed = true;

    const loadData = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && isSubscribed) {
          setProducts(data);
        }
      } catch (err: unknown) {
        if (isSubscribed) {
          alert(`Error fetching products: ${parseErrorMessage(err)}`);
        }
      }
    };

    loadData();

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = editingProduct ? editingProduct.image : "";

      if (productFile) {
        const fileName = generateFileName(productFile);
        const { error: uploadError } = await supabase.storage
          .from("hiwot-assets")
          .upload(fileName, productFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("hiwot-assets")
          .getPublicUrl(fileName);

        if (!urlData?.publicUrl)
          throw new Error("Failed to resolve public image URL.");
        imageUrl = urlData.publicUrl;
      }

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update({
            name: productName,
            category: category || null,
            price: price,
            description: description || null,
            image: imageUrl,
          })
          .eq("id", editingProduct.id);

        if (error) throw error;
        alert("Product updated successfully!");
      } else {
        if (!productFile) {
          alert("Please upload an image.");
          setIsUploading(false);
          return;
        }

        const { error } = await supabase.from("products").insert([
          {
            name: productName,
            category: category || null,
            price: price,
            description: description || null,
            image: imageUrl,
          },
        ]);

        if (error) throw error;
        alert("Product created successfully!");
      }

      resetForm();
      await fetchProducts();
    } catch (err: unknown) {
      alert(`Product submit failed: ${parseErrorMessage(err)}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      alert("Product deleted!");
      await fetchProducts();
    } catch (err: unknown) {
      alert(`Delete failed: ${parseErrorMessage(err)}`);
    }
  };

  const startEditing = (prod: Product) => {
    setEditingProduct(prod);
    setProductName(prod.name);
    setCategory(prod.category || "");
    setPrice(prod.price);
    setDescription(prod.description || "");
  };

  const resetForm = () => {
    setEditingProduct(null);
    setProductName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setProductFile(null);
  };

  return (
    <section className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#E6C594]">
          {editingProduct ? "Edit Product" : "Add New Shop Product"}
        </h2>
        {editingProduct && (
          <button
            type="button"
            onClick={resetForm}
            className="text-xs text-neutral-400 hover:text-white underline"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleProductSubmit} className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g. Brush Set"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Tools"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
              Price *
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 1,200 ETB"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
            Product Image {editingProduct ? "(Optional)" : "*"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#D4AF37] file:text-black file:font-semibold"
            required={!editingProduct}
          />
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#E6C594] text-black font-bold rounded-lg disabled:opacity-50"
        >
          {isUploading
            ? "Saving..."
            : editingProduct
              ? "Update Product"
              : "Publish Product"}
        </button>
      </form>

      <div className="mt-10 border-t border-neutral-800 pt-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
          Existing Products ({products.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-800/50 p-3 rounded-lg border border-neutral-700/50 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-[#D4AF37]">{item.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(item)}
                  className="text-xs bg-neutral-700 px-2 py-1 rounded hover:bg-neutral-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs bg-red-600/80 px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
