import React, { useState } from 'react';
import axios from 'axios';

import { Card, CardHeader, Divider, Grid, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'; // Import necessary components

import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

const SamplePage = () => {
  const [aksharId, setAksharId] = useState('');
  const [userData, setUserData] = useState(null);

   const data = userData?.address?.flat ?? "----"

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://ac-be-app-prod-spyo2pxfka-el.a.run.app/user-auth/find-by-aksharconnectId?aksharId=${aksharId}`,
        {
          headers: {
            Accept: '*/*',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4NCwiZW1haWwiOiJiaGF2aWttYWt3YW5hMTk5M0BnbWFpbC5jb20iLCJha3NoYXJJZCI6IkFDMTIwODQiLCJpYXQiOjE2OTIyNTQzOTQsImV4cCI6MTY5MjI1NjU1NH0.cWE47xf3o0aNOePOq0I4XaxwcBiMa1584Kc7ovNBvYo'
          }
        }
      );
        console.log(response.data)
      setUserData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Breadcrumb title="Sample Page">
        {/* ... */}
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header">
                  Find user by akshar id
                </Typography>
              }
            />
            <Divider />

            {/* Search bar */}
            <TextField
              label="Search User"
              variant="outlined"
              fullWidth
              value={aksharId}
              onChange={(e) => setAksharId(e.target.value)}
              margin="normal"
            />

            {/* Submit button */}
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>

            {/* Display data in a table */}
            {userData && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Address</TableCell>
                      {/* Add more table cell headers if needed */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{userData.name}</TableCell>
                      <TableCell>{userData.email}</TableCell>
                
                      <TableCell>
                        {userData && userData.address ?  "flat number " + data + "  building  " + userData.address.building + " , street = " + userData.address.street + userData.address.area +' ' +  userData.address.suburb:"adtress is not define"}
                        </TableCell>

                      {/* Add more table cell data if needed */}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}

          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default SamplePage;
