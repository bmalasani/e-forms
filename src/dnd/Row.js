/* eslint-disable no-undef */
import React from "react";
import { Grid } from "@material-ui/core";

export const Row = () => {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
};
