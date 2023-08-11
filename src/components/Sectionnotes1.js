import { TextField } from '@mui/material';
import React, { Fragment, useState } from 'react'
const renderChildRows = (row, depthLevel = 1) => {
    if (row.child) {
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
                    <a
                     style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                    >
                      {row.child.code !== null &&
                        row.child.code !== "null" &&
                        ` ${row.child.code}`}
                    </a>
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

const Sectionnotes1 = () => {
    const [index1, setIndex1] = useState(null);
    const [search, setSearch] = useState("");
React.useEffect(() => {
    console.log("enter index table");
    const fetchBooks = async () => {
      try {
          const response = await fetch(`codes/filterby/index?filterBy=${global.clickedTab}`);
          if (response.ok) {
            const data = await response.json();
            setIndex1(data);
          } else {
            console.error("Failed to fetch data");
          }
      } catch (error) {
        console.error("Error:", error);
      }
      
    };
    // Clear the previous index data before fetching new data
   
    fetchBooks();
  }, []);
  console.log("our index1 is", index1);
  return (
    <>
    <div>   
     <tbody style={{ textAlign: "left" }}>
            
            {!global.values?.code &&
              index1
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(search);
              })
              .map((row) => (
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
                           style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                          >
                            SeeAlso {row.seealso}
                          </a>
                        </td>
                      )}
                      {row.see !== null && row.see !== "null" && (
                        <td>
                          <a
                           style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                          >
                            See {row.see}
                          </a>
                        </td>
                      )}
                       {row.code !== null && row.code !== "null" && (
                      <td>
                        <a style={{ color: "blue" ,borderBottom:"1px solid blue"}}
                          >
                          {row.code}
                        </a>
                      </td>
                       )}
                    </tr>
                    {renderChildRows(row)}
                  </Fragment>
                ))}
            </tbody>
    </div>
    </>
  )
}
export default Sectionnotes1;
