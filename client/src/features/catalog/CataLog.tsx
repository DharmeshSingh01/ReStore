import agent from "../../api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

// interface Props {
//   products: Product[];
//   addProduct: () => void;
// }

export default function CataLog() {
  const [product, setProduct] = useState<Product[]>([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/Product")
  //     .then((response) => response.json())
  //     .then((data) => setProduct(data));
  // }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    agent.catalog
      .list()
      .then((data) => {
        setProduct(data);
        //setIsLoading(false);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);
  if (isLoading) return <LoadingComponent />;
  return (
    <>
      <ProductList products={product} />
      {/* <Button onClick={() => props.addProduct()}>Add New Product</Button> */}
    </>
  );
}
