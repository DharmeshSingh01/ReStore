import React, { useState } from "react";
// import { Basket } from "../../app/models";
// import agent from "../../api/agent";
//import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../context/StoreContext";
import agent from "../../api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/confugureStore";
import { removeItem, setBasket } from "./basketSlice";

export default function BasketPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState({
    loading:false,
    name:""

  });
  /*
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    setLoading(true);
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
*/

  //const { basket, setBasket, removeItem } = useStoreContext();

  const dispatch= useAppDispatch();
  const {basket}= useAppSelector(state=> state.basket)

  function handleAddItem(productId: number,quantity=1, name:string) {
    setStatus({loading:true,name})
    agent.Basket.addItem(productId, 1)
      .then((basket) => dispatch( setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() =>  setStatus({loading:false,name:""}));
  }

  function handleRemoveItem(productId: number, quantity = 1, name:string) {
    setStatus({loading:true,name});
    agent.Basket.removeItem(productId, quantity)
      .then(() => dispatch( removeItem({productId, quantity})))
      .catch((error) => console.log(error))
      .finally(() =>  setStatus({loading:false,name:""}));
  }

  //if (loading) return <LoadingComponent message="Loading basket.." />;
  if (!basket)
    return <Typography variant="h3">Your basket is empty🛒</Typography>;

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={row.pictureUrl}
                    alt={row.name}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span>{row.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">
                {currencyFormat(row.price)}
                {/* ${(row.price / 100).toFixed(2)} */}
              </TableCell>
              <TableCell align="center">
                <LoadingButton
                  loading={status.loading && status.name==="rem" + row.productId}
                  onClick={() => handleRemoveItem(row.productId,1,"rem"+ row.productId)}
                  color="error"
                >
                  <Remove />
                </LoadingButton>
                {row.quantity}
                <LoadingButton
                  loading={status.loading && status.name==="add" + row.productId}
                  onClick={() => handleAddItem(row.productId,1,"add"+ row.productId)}
                  color="secondary"
                >
                  <Add />
                </LoadingButton>
              </TableCell>
              <TableCell align="right">
                ${((row.price / 100) * row.quantity).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <LoadingButton
                  loading={status.loading && status.name==="remall"+row.productId}
                  onClick={() => handleRemoveItem(row.productId, row.quantity,"remall"+row.productId)}
                  color="error"
                >
                  <Delete />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
      <Grid item xs={6} />
      <Grid item xs={6}>
        <BasketSummary />
        <Button variant="contained" component={Link} to="/checkout" fullWidth size="large" >
          Checkout
        </Button>
      </Grid>
    </Grid>
    </>
  );
}
