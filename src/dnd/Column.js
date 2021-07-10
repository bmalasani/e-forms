/* eslint-disable no-undef */
import React from "react";
import { Grid } from "@material-ui/core";

export const Column = () => {
  return (
    <Grid item spacing={2}>
      {children}
    </Grid>
  );
};
