import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TextField } from "@mui/material";

import { useState } from "react";
import "../App.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    backgroundColor: "#90B2D8",
    padding: "0px 12px 0px 0px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: 1,
    border: "1px solid grey",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    height: 1,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    height: 1,
  },
}));
export default function DrugTable() {
  console.log("neo enter");
  const [drug, setDrug] = useState(null);
  const [drug1, setDrug1] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true); // New state variable for loading
  React.useEffect(() => {
    const fetchDrugData = async () => {
      try {
        if (global.values && global.values.code) {
          const response = await fetch(`/codes/${global.values.code}/drug`);
          if (response.ok) {
            const data = await response.json();
            setDrug(data);
          } else {
            console.error("Failed to fetch data");
          }
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // Set isLoading to true before making the API call
    setDrug(null); // Clear the previous drug data before fetching new data
    fetchDrugData();
  }, [global.values?.code]);
  //all values of drug
  React.useEffect(() => {
    const fetchAllDetailsDrugData = async () => {
      try {
        const response = await fetch(`/codes/alldetails/drug`);
        if (response.ok) {
          const data = await response.json();
          setDrug1(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false); // Set isLoading to false when the API call is completed
      }
    };
    setIsLoading(true); // Set isLoading to true before making the API call
    setDrug1(null); // Clear the previous drug1 data before fetching new data
    fetchAllDetailsDrugData();
  }, []);
  console.log("our drug1 is", drug1);
  console.log("our drug is", drug);
  const handleAlphabetSelection = (alphabet) => {
    console.log("Selected alphabet:", alphabet);
    // You can perform any additional actions here based on the selected alphabet
    // For example, you can filter the data based on the selected alphabet.
  };

  function getTitleFromNestedChild(row) {
    if (row.child?.child?.child?.child?.code) {
      return `${row.child.title}-${row.child.child.title}-${row.child.child.child.title}-${row.child.child.child.child.title}`;
    } else if (row.child?.child?.child?.code) {
      return `${row.child.title} - ${row.child.child.title} - ${row.child.child.child.title}`;
    } else if (row.child?.child?.code) {
      return `${row.child.title} - ${row.child.child.title}`;
    } else if (row.child?.code) {
      return `${row.child.title}`;
    } else {
      return row.title;
    }
  }

  return (
    <>
      <Box
        sx={{
          height: "10px",
          width: "100%",
          textAlign: "left",
          ml: "1px",
          mt: "140px",
        }}
      >
        {/*  <Pagin onSelectAlphabet={handleAlphabetSelection} />*/}
      </Box>
      <Box sx={{ mt: "30px" }}>
        {isLoading ? ( // Show loading indicator
          <div
            style={{
              marginLeft: "60%",
              marginTop: "30%",
            }}
          ></div>
        ) : (
          <TableContainer
            sx={{
              mt: "-230px",
              display: "flex",
              position: "absolute",
              width: "910px",
              ml: "-115px",
              height: "440px",
              overflowY: "scroll",
            }}
          >
            <Table sx={{ height: "5px" }}>
              <TableHead sx={{ height: "5px", minHeight: "10px" }}>
                <TableRow>
                  <div>
                    <div className="table">
                      <Box
                        sx={{
                          width: "100px",
                          height: "20%",
                          marginTop: "5%",
                        }}
                      >
                        <Box sx={{ width: "120px", height: "22%" }}>
                          <TextField
                            sx={{
                              width: "130px",
                              "& input": {
                                height: "10px",
                                bgcolor: "background.paper",
                                marginTop: "-5%",
                                color: (theme) =>
                                  theme.palette.getContrastText(
                                    theme.palette.background.paper
                                  ),
                              },
                            }}
                            placeholder="Use Filter"
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </Box>
                      </Box>
                    </div>
                  </div>
                </TableRow>
              </TableHead>
              <TableHead sx={{ height: "20px", border: "1px solid grey" }}>
                <TableRow
                  sx={{
                    border: "1px solid grey",
                    height: "20px",
                  }}
                >
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    D-Index
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    Accidental, UnIntentional Poisoning
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    Intentional,Selfharm Poisoning
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    Assault Poisoning
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    Undetermined Poisoning
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    Adverse Effect
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid grey",
                      height: "20px",
                    }}
                    align="center"
                  >
                    UnderDosing
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {global.values?.code !== null &&
                  drug
                    ?.filter((item) => {
                      return (
                        search.toLowerCase() === "" ||
                        item.title.toLowerCase().includes(search)
                      );
                    })
                    .map((row) => {
                      // Check if the parent or child code array has a value of null
                      const hasValidParentCode =
                        row.code && row.code[0] !== "null";
                      const hasValidChildCode =
                        row.child &&
                        row.child.code &&
                        row.child.code[0] !== "null";
                      const hasValidChildChildCode =
                        row.child &&
                        row.child.child &&
                        row.child.child.code &&
                        row.child.child.code[0] !== "null";
                      const hasValidChildChildChildCode =
                        row.child &&
                        row.child.child &&
                        row.child.child.child &&
                        row.child.child.child.code &&
                        row.child.child.child.code[0] !== "null";
                      const hasValidChildChildChildChildCode =
                        row.child &&
                        row.child.child &&
                        row.child.child.child &&
                        row.child.child.child.child &&
                        row.child.child.child.child.code &&
                        row.child.child.child.child.code[0] !== "null";
                      // Filter out rows where all code arrays (parent, child, child.child, child.child.child, and child.child.child.child) are null
                      if (
                        !(
                          hasValidParentCode ||
                          hasValidChildCode ||
                          hasValidChildChildCode ||
                          hasValidChildChildChildCode ||
                          hasValidChildChildChildChildCode
                        )
                      ) {
                        return null;
                      }
                      // Concatenate the values of the code array into a single string
                      const codeDetails = (
                        hasValidChildChildChildChildCode
                          ? row.child.child.child.child.code
                          : hasValidChildChildChildCode
                          ? row.child.child.child.code
                          : hasValidChildChildCode
                          ? row.child.child.code
                          : hasValidChildCode
                          ? row.child.code
                          : row.code
                      ).join(", ");
                      // Split the codeDetails into chunks of six elements
                      const chunkedCodeDetails = codeDetails
                        .split(", ")
                        .reduce((acc, code) => {
                          if (!acc.length || acc[acc.length - 1].length === 6) {
                            acc.push([code]);
                          } else {
                            acc[acc.length - 1].push(code);
                          }
                          return acc;
                        }, []);
                      return chunkedCodeDetails.map((chunk, index) => (
                        <StyledTableRow key={`${row.id}_${index}`}>
                          <StyledTableCell component="th" scope="row">
                            {getTitleFromNestedChild(row)}
                          </StyledTableCell>
                          {Array.from({ length: 6 }).map((_, colIndex) => (
                            <StyledTableCell
                              key={`${row.id}_${index}_${colIndex}`}
                              sx={{
                                border: "1px solid grey",
                              }}
                              align="center"
                            >
                              {/* Display the code details for each column */}
                              {chunk[colIndex] !== "--" ? (
                                <a style={{ borderBottom: "0.5px solid blue" }}>
                                  {chunk[colIndex]}
                                </a>
                              ) : (
                                chunk[colIndex] // Render the value as it is (in this case, "-")
                              )}
                            </StyledTableCell>
                          ))}
                        </StyledTableRow>
                      ));
                    })}
                {!global.values?.code &&
                  drug1
                    ?.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.title.toLowerCase().includes(search);
                    })
                    .map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.title}
                        </StyledTableCell>
                        {row.code.map((value, index) => (
                          <StyledTableCell
                            key={index}
                            sx={{
                              border: "1px solid grey",
                            }}
                            align="center"
                          >
                            {value !== "--" ? (
                              <a
                                style={{
                                  borderBottom: "0.5px solid blue",
                                }}
                              >
                                {value}
                              </a>
                            ) : (
                              "--"
                            )}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}
