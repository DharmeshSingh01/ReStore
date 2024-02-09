import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import React from "react";
import agent from "../../api/agent";

export default function AboutUsPage() {
  return (
    <Container>
      <Typography gutterBottom variant="h2">Error For Testing</Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={()=> agent.testError.get400Error().catch(error=> console.log(error))}>Test 400 Error</Button>
        <Button variant="contained" onClick={()=> agent.testError.get404Error().catch(error=> console.log(error))}>Test 404 Error</Button>
        <Button variant="contained" onClick={()=> agent.testError.get401Error().catch(error=> console.log(error))}>Test 401 Error</Button>
        <Button variant="contained" onClick={()=> agent.testError.get500Error().catch(error=> console.log(error))}>Test 500 Error</Button>
        <Button variant="contained" onClick={()=> agent.testError.getValidationError().catch(error=> console.log(error))}>Test Validation Error</Button>
      </ButtonGroup>
    </Container>
  );
}
