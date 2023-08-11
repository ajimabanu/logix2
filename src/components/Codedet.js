import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import "../App.css";
import React, { useEffect, useState } from "react";

const Codedet = () => {
  console.log("enter codedet page");
  console.log(global.index, "codedet index value");
  const [result, setResult] = useState(null);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (global.selectedCodeDetails) {
      setResult(global.selectedCodeDetails); // Use the stored details
    } else {
      // Handle the case when no code is selected
      setResult(null);
    }
  }, [global.selectedCodeDetails]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (
          global.values &&
          global.values.code &&
          global.years &&
          global.intable == null
        ) {
          const response = await fetch(
            `/codes/${global.values.code}/details/?version=${global.years}`
          );
          if (response.ok) {
            const data = await response.json();
            setResult(data);
          } else {
            console.error("Failed to fetch data");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBooks();
  }, [global.values]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (global.intableresult && global.intableresult.code && global.years) {
          const response = await fetch(
            `/codes/${global.values.code}/details/?version=${global.years}`
          );
          if (response.ok) {
            const data = await response.json();
            setResult(data);
          } else {
            console.error("Failed to fetch data");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBooks();
  }, [global.intableresult]);

  const handleClose = () => {
    setIsClosed(true);
    window.location.reload();
  };

  console.log("our result is", result);
  return (
    <div className="division">
      {result && (
        <div>
          <div>
            <Button
              disableFocusRipple
              disableRipple
              sx={{
                border: "0.5px solid green",
                textAlign: "center",
                height: "20px",
                width: "80px",
                backgroundColor: "#ADD8E6",
                marginLeft: "125px",
              }}
            >
              {result.code}
              <Close
                sx={{
                  width: "20px",
                  ml: "5px",
                  color: "#4169E1",
                }}
                onClick={handleClose}
              />
            </Button>
          </div>
          <table
            style={{
              marginLeft: "250px",
              marginTop: "-10px",
            }}
          >
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              {result && (
                <tr key={result.code}>
                  <td>{result.code}</td>
                  <td>{result.longDescription}</td>
                  <td>
                    {result.billable === true ? (
                      <Button
                        variant="contained"
                        sx={{
                          width: "150px",
                          height: "15px",
                          color: "white",
                          fontFamily: "sans-serif",
                          ml: "20px",
                          backgroundColor: "green",
                          textTransform: "lowercase",
                          fontWeight: "700px",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "green",
                          },
                        }}
                      >
                        Billable Codes
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        disableElevation
                        disableFocusRipple
                        sx={{
                          width: "150px",
                          height: "15px",
                          color: "white",
                          fontFamily: "sans-serif",
                          ml: "170px",
                          backgroundColor: "orange",
                          textTransform: "lowercase",
                          fontWeight: "700px",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "orange",
                          },
                        }}
                      >
                        NonBillable Codes
                      </Button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Codedet;
