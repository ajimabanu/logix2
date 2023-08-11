import React, { Fragment, useState } from "react";
import "../styles/Pagination.css";
import { Box, TextField } from "@mui/material";
import { Alphabet } from "./Alphabet";

const renderChildRows = (row, depthLevel = 1) => {
  if (row.child && row.child.code !== null) {
    const paddingLeftValue = 20 + depthLevel * 20; // Increase padding for deeper levels
    return (
      <>
        <tr key={row.child.id}>
          <td style={{ paddingLeft: `${paddingLeftValue}px` }}>
            <ul
              style={{
                listStyleType: "circle",
                paddingLeft: "20px",
                margin: 0,
              }}
            >
              {row.child.title && (
                <li>
                  {row.child.title}
                  {row.child.code !== null && row.child.code !== "null" && (
                    <a
                      style={{ color: "blue", borderBottom: "1px solid blue" }}
                    >
                      {row.child.code}
                    </a>
                  )}
                </li>
              )}
            </ul>
          </td>
        </tr>
        {renderChildRows(row.child, depthLevel + 1)}
      </>
    );
  }
  return null;
};

const removeDuplicates = (arr) => {
  const seen = new Set();
  return arr.filter((item) => {
    const key = `${item.code}_${item.title}`;
    const duplicate = seen.has(key);
    seen.add(key);
    return !duplicate;
  });
};

const IndexTables1 = ({ setResults1 }) => {
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState([]);
  const [index1, setIndex1] = useState([]);
  const [clickedCode, setClickedCode] = useState(null);
  const [result1, setResult1] = useState([]);
  const [results2, setResults2] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);
  const [activeBtnIndex, setActiveBtnIndex] = useState(0);

  // Combine index and index1 arrays into a single array
  const combinedIndexRows = [...index, ...index1];

  // Filter out duplicate rows based on the "code" and "title"
  const filteredIndexRows = removeDuplicates(combinedIndexRows);

  React.useEffect(() => {
    console.log("enter index table");
    const fetchBooks = async () => {
      try {
        if (global.values && global.values.code !== null) {
          const response = await fetch(`/codes/${global.values.code}/index`);
          if (response.ok) {
            const data = await response.json();
            setIndex(data);
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

    // Clear the previous index data before fetching new data
    setIndex([]);
    if (global.values && global.values.code !== null) {
      fetchBooks();
    }
  }, [global.values?.code]);

  console.log("our index is", index);

  const handleCodeClick = async (code) => {
    setClickedCode(code);
    fetchCodeDetails(code); // Call the function to fetch code details

    await fetchCodeDetails(code);
    setResults1(fetchedData); // Update result1 state with the fetched code details
    global.selectedCodeDetails = fetchedData;

    global.selectedCode = code;
    // global.values = null;
  };

  // Function to fetch code details when a row.code is clicked
  const fetchCodeDetails = async (code) => {
    try {
      if (code) {
        const response = await fetch(
          `/codes/${code}/details/?version=${global.years}`
        );
        if (response.ok) {
          const data = await response.json();
          setFetchedData(data); // Store the fetched data in the state
          setResult1(data);
        } else {
          console.error("Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(result1);
  //global.intableresult=result1;
  //console.log(global.intableresult)
  // console.log(clickedCode);

  //global.intable=clickedCode;

  return (
    <>
      <Box
        sx={{
          height: "20px",
          width: "100%",
          textAlign: "left",
          ml: "14%",
        }}
      >
        {!global.values || !global.values.code ? (
          <Alphabet selectedCodeDetails={results2} />
        ) : null}
      </Box>

      <div style={{ marginTop: "-70px" }}>
        <TextField
          sx={{
            width: "120px",

            "& input": {
              height: "4px",

              color: (theme) =>
                theme.palette.getContrastText(theme.palette.background.paper),
            },
          }}
          placeholder=" Use Filter"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div
        style={{
          width: "796px",

          height: "450px",
          backgroundColor: "#C7E1ED",
          marginTop: "30px",
        }}
      >
        <table style={{ marginLeft: "10px" }}>
          <tbody style={{ textAlign: "left" }}>
            {global.values?.code !== null &&
              filteredIndexRows?.map((row) => (
                <Fragment key={row.id}>
                  <tr>
                    <td>
                      <ul
                        style={{
                          listStyleType: "square",
                          paddingLeft: "20px",
                          margin: 0,
                        }}
                      >
                        {row.nemod ? ( // Check if nemod has a value
                          <li>
                            {row.title} {row.nemod}
                          </li>
                        ) : (
                          <li>{row.title}</li>
                        )}
                      </ul>
                    </td>

                    {row.seealso !== null && row.seealso !== "null" && (
                      <td>
                        <a
                          style={{
                            color: "blue",
                            borderBottom: "1px solid blue",
                          }}
                        >
                          SeeAlso {row.seealso}
                        </a>
                      </td>
                    )}
                    {row.see !== null && row.see !== "null" && (
                      <td>
                        <a
                          style={{
                            color: "blue",
                            borderBottom: "1px solid blue",
                          }}
                        >
                          See {row.see}
                        </a>
                      </td>
                    )}
                    <td>
                      <a
                        style={{
                          color: "blue",
                          borderBottom: "1px solid blue",
                        }}
                        onClick={() => handleCodeClick(row.code)}
                      >
                        {row.code !== null && row.code}
                      </a>
                    </td>
                  </tr>
                  {renderChildRows(row)}
                </Fragment>
              ))}
          </tbody>

          <tbody style={{ textAlign: "left" }}>
            {!global.values?.code &&
              filteredIndexRows?.map((row) => (
                <Fragment key={row.id}>
                  <tr>
                    <td>
                      <ul
                        style={{
                          listStyleType: "square",
                          paddingLeft: "20px",
                          margin: 0,
                        }}
                      >
                        {row.nemod !== null && row.nemod !== "null" ? ( // Check if nemod has a value
                          <li>
                            {row.title} {row.nemod}
                          </li>
                        ) : (
                          <li>{row.title}</li>
                        )}
                      </ul>
                    </td>

                    {row.seealso !== null && row.seealso !== "null" && (
                      <td>
                        <a
                          style={{
                            color: "blue",
                            borderBottom: "1px solid blue",
                          }}
                        >
                          SeeAlso {row.seealso}
                        </a>
                      </td>
                    )}
                    {row.see !== null && row.see !== "null" && (
                      <td>
                        <a
                          style={{
                            color: "blue",
                            borderBottom: "1px solid blue",
                          }}
                        >
                          See {row.see}
                        </a>
                      </td>
                    )}
                    {row.code !== null && row.code !== "null" && (
                      <td>
                        <a
                          style={{
                            color: "blue",
                            borderBottom: "1px solid blue",
                          }}
                          onClick={() => handleCodeClick(row.code)}
                        >
                          {row.code !== null && row.code}
                        </a>
                      </td>
                    )}
                  </tr>
                  {renderChildRows(row)}
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default IndexTables1;
