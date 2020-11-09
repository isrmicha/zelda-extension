import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Skeleton } from "@material-ui/lab";
import { Search } from "@material-ui/icons";
import _debounce from "lodash/debounce";

const ZELDA_API_URL = __DEV__
  ? "http://localhost:3000/"
  : "https://isrmicha-zelda.herokuapp.com/";

const routes = [
  "games",
  "staff",
  "characters",
  "monsters",
  "bosses",
  "dungeons",
  "places",
  "items",
];

const Home = () => {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("");
  const [route, setRoute] = useState(null);
  const filteredData = data?.filter?.(
    ({ name }) => !filter || name.toLowerCase().includes(filter.toLowerCase())
  );
  const filterName = null;

  useEffect(() => {
    if (route) fetchData();
  }, [route]);

  const fetchData = async () => {
    try {
      setData("loading");
      const {
        data: { data },
      } = await axios.get(
        `${ZELDA_API_URL}${route}${filterName ? `?name=${filterName}` : ""}`
      );
      setData(data);
    } catch (error) {
      console.log(error);
      setData(false);
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* <Typography align="center" variant="h4" component="h4">
                Zelda Wiki
              </Typography> */}
            </Grid>
            {routes.map((route) => (
              <Grid item xs={3} key={route}>
                <Button
                  fullWidth
                  onClick={() => setRoute(route)}
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  {route}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {data === "loading" ? (
          <LoadingContainer>
            <Skeleton active />
          </LoadingContainer>
        ) : data === null ? (
          <p>Choose the data</p>
        ) : data === false ? (
          <p>Public API Error, try again...</p>
        ) : (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                style={{ marginTop: 15, marginBottom: 15 }}
                value={filter}
                onChange={({ target: { value } }) => setFilter(value)}
                label="Search field"
                type="search"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {filteredData.map(({ name, description }) => (
                <Accordion
                  style={{
                    backgroundColor: "rgba(0, 0, 0, .03)",
                    borderBottom: "unset",
                    boxShadow: "unset"
                  }}
                  key={name}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Divider />
                    <Typography>{description || "No Data"}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  width: 600px;
  padding: 15px;
`;
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  width: 100%;
  span {
    width: 100%;
  }
`;

export default Home;
