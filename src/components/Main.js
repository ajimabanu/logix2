import { Box, Container, Stack, Typography, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Codedet from "./Codedet";
import PropTypes from "prop-types";
import Codenotes from "./Codenotes";
import Sectionnotes from "./Sectionnotes";
import Chapternotes from "./Chapternotes";
import "../App.css";
import "../styles/Main.css";
import DrugTable from "./DrugTable";
import NeoplasmTable from "./NeoplasmTable";
import IndexTables1 from "./IndexTable1";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Main = () => {
  console.log("enter main");
  const [value, setValue] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [showIndx, setShowIndex] = useState(false);
  const [showDrug, setShowdrug] = useState(false);
  const [results1, setResults1] = useState([]); // Define result1 state here

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [activeBtn, setActiveBtn] = useState(null);

  const handleNavBtnClick = (btnId) => {
    setActiveBtn(btnId);
    setShowIndex(!showIndx);
    setShowTable(false);
    setShowdrug(false);
  };
  const handleNavBtnClick2 = (btnId) => {
    setActiveBtn(btnId);
    setShowTable(!showTable);
    setShowIndex(false);
    setShowdrug(false);
  };

  const handleNavBtnClick3 = (btnId) => {
    setActiveBtn(btnId);
    setShowdrug(!showDrug);
    setShowIndex(false);
    setShowTable(false);
  };

  return (
    <div>
      <Container maxWidth="4px">
        <Stack direction={"row"} gap={"10px"} mt={2.5}>
          <Box
            sx={{
              height: "635px",
              width: "55%",
              display: "flex",
              border: "0.5px solid grey",
            }}
          >
            <button
              style={{
                width: "100px",
                height: "30px",
                cursor: "pointer",
              }}
              className={`nav-btn ${activeBtn === "btn1" ? "active" : ""}`}
              onClick={() => handleNavBtnClick("btn1")}
            >
              Index
            </button>
            <div
              style={{
                position: "absolute",
                marginTop: "17px",
              }}
            >
              {showIndx && <IndexTables1 setResults1={setResults1} />}
            </div>
            <button
              style={{
                marginLeft: "5px",
                width: "100px",
                height: "30px",
                cursor: "pointer",
              }}
              className={`nav-btn ${activeBtn === "btn2" ? "active" : ""}`}
              onClick={() => handleNavBtnClick2("btn2")}
            >
              Neoplasm
            </button>
            <div
              style={{
                position: "absolute",
              }}
            >
              {showTable && <NeoplasmTable />}
            </div>
            <button
              style={{
                marginLeft: "5px",
                width: "100px",
                height: "30px",
                cursor: "pointer",
              }}
              className={`nav-btn ${activeBtn === "btn3" ? "active" : ""}`}
              onClick={() => handleNavBtnClick3("btn3")}
            >
              Drug
            </button>
            <div
              style={{
                position: "absolute",
                marginTop: "100px",
              }}
            >
              {showDrug && <DrugTable />}
            </div>
          </Box>

          <Box
            classname="Tabularsearch"
            sx={{
              height: "635px",
              width: "45%",
              display: "flex",
              backgroundColor: "white",
              border: "0.5px solid black",
            }}
          >
            <Box
              sx={{
                height: "20px",
                width: "50%",
                mt: "10px",
                ml: "6px",
              }}
            >
              <Typography
                sx={{
                  width: "100%",
                }}
                variant="subtitle1"
                fontFamily={"sans-serif"}
                color={" #4185d2"}
                noWrap
              >
                Tabular Search
              </Typography>
            </Box>
            <Stack direction={"column"} ml={10} mt={10}>
              <Typography
                variant="subtitle1"
                fontFamily={"sans-serif"}
                color={" #4185d2"}
                fontWeight={600}
                ml={-24}
                sx={{
                  borderBottom: "0.3px solid grey",
                  width: "141%",
                }}
              >
                Code details
              </Typography>
              <Box sx={{ marginRight: "20px" }}>{<Codedet />}</Box>
              <Box
                sx={{
                  height: "300px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    height: "30px",
                    width: "660px",
                    background:
                      "linear-gradient(to right, #E9F8FF,#90B2D8 , #C1E3FF)",
                    color: "black",
                    fontFamily: "sans-serif",
                    fontSize: "13px",
                    marginLeft: "-200px",
                    mt: "20px",
                    ml: "-195px",
                  }}
                >
                  <Stack direction={"row"} gap={"70px"} ml={5}>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ marginTop: "-10px" }}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                          className="tabs"
                          sx={{ marginLeft: "-25px" }}
                          TabIndicatorProps={{
                            style: {
                              backgroundColor: "#4185d2",
                              width: "50px",
                              marginLeft: "38px",
                              marginBottom: "10px",
                              cursor: "pointer",
                            },
                          }}
                        >
                          <Tab
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            sx={{
                              cursor: "pointer",
                              variant: "subtitle1",
                              fontWeight: "700px",
                              color: "#4185D2",
                              textTransform: "none",
                              width: "150px",
                              cursor: "pointer",
                            }}
                            label="  Code notes"
                            {...a11yProps(0)}
                          />
                          <Tab
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            sx={{
                              cursor: "pointer",
                              variant: "subtitle1",
                              fontWeight: "700px",
                              color: "#4185D2",
                              textTransform: "none",
                              width: "150px",
                              cursor: "pointer",
                            }}
                            variant="subtitle1"
                            fontWeight={"700"}
                            label="Section notes"
                            {...a11yProps(1)}
                          />
                          <Tab
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            sx={{
                              cursor: "pointer",
                              variant: "subtitle1",
                              fontWeight: "700px",
                              color: "#4185D2",
                              textTransform: "none",
                              width: "150px",
                              cursor: "pointer",
                            }}
                            variant="subtitle1"
                            fontWeight={"700"}
                            label="Chapter notes"
                            {...a11yProps(2)}
                          />
                          <Tab
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            sx={{
                              cursor: "pointer",
                              variant: "subtitle1",
                              fontWeight: "700px",
                              color: "#4185D2",
                              textTransform: "none",
                              width: "150px",
                              cursor: "pointer",
                            }}
                            variant="subtitle1"
                            fontWeight={"700"}
                            label="Chapter guidlines"
                            {...a11yProps(3)}
                          />
                        </Tabs>
                      </Box>
                      <div
                        className="tabpanels"
                        style={{
                          height: "250px",
                          width: "590px",
                          overflowY: "scroll",
                          paddingLeft: "30px",
                        }}
                      >
                        <CustomTabPanel value={value} index={0}>
                          <Codenotes />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                          <Sectionnotes />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                          <Chapternotes />
                        </CustomTabPanel>
                        <CustomTabPanel
                          value={value}
                          index={3}
                        ></CustomTabPanel>
                      </div>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};
export default Main;
