import React from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import CreateProduct from "../../Products/CreateProduct";
import RemoveProduct from "../../Products/RemoveProduct";

const ProductSettings = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CreateProduct />
            </Grid>
            <Grid item xs={12}>
                <RemoveProduct />
            </Grid>
        </Grid>
    );
}


export default ProductSettings;
