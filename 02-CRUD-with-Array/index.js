import express from "express";

const app = express();

let products = [
  {
    id: 1,
    name: "Corsair HS45 Headphone",
    price: 4500,
    imageUrl: "https://techmatched.pk/wp-content/uploads/2024/05/4-13.png",
    desc: "A comfortable and high-quality gaming headset.",
  },
  {
    id: 2,
    name: "RTX 3060",
    price: 93000,
    imageUrl:
      "https://static.webx.pk/files/2603/Images/14-czone.com.pk-1540-12831-250122082031-2603-2261410-231124021614482.jpg",
    desc: "A powerful graphics card from nvidia.",
  },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  const index = products.findIndex((product) => product.id === parseInt(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((product) => product.id !== parseInt(id));
  res.status(204).send();
});

app.listen(5050, () => {
  console.log("Server is running on PORT 5050");
});
