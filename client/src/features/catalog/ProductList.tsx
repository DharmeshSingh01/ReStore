import { Product } from "../../app/models";
import { Grid } from "@mui/material";
import ProductCart from "./ProductCart";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <>
      {products && (
        <Grid container spacing={4}>
          {products.map((item) => (
            <Grid key={item.id} item xs={3}>
             
              <ProductCart product={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
