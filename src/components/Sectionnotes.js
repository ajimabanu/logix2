import React, { useEffect, useState } from "react";
import "../styles/Sectionnotes.css";
const Sectionnotes = () => {
  const [results, setResults] = useState(null);
  const [globalValuesCode, setGlobalValuesCode] = useState(null);
  const [results1, setResults1] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (globalValuesCode && global.years) {
          const response = await fetch(
            `/codes/${globalValuesCode}/details/?version=${global.years}`
          );
          if (response.ok) {
            const data = await response.json();
            setResults(data);
          } else {
            console.error("Failed to fetch data");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBooks();
  }, [globalValuesCode]);
  useEffect(() => {
    if (global.values) {
      setGlobalValuesCode(global.values.code);
    }
  }, [global.values]);
  console.log("our result is", results);

  useEffect(() => {
    setResults(global.selectedCodeDetails); // Use the stored details
  }, [global.selectedCodeDetails]);

  return (
    <div className="section">
      <div>
        <table>
          <tbody className="chapter">
            {results && results.section && results.section.notes ? (
              results.section.notes.map((note, index) => (
                <tr key={index}>
                  <td>{note.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Section notes</td>
              </tr>
            )}
          </tbody>
        </table>
        {globalValuesCode === "H548" && results?.section?.visualImpairment ? (
          <table className="table1" cellSpacing={0}>
            <thead>
              <tr>
                <th className="tablees" rowSpan="2">
                  {results.section.visualImpairment.categoryHeading}
                </th>
                <th className="tablees" colSpan="2">
                  {results.section.visualImpairment.rangeHeading}
                </th>
              </tr>
              <tr>
                <th className="tablees">
                  {results.section.visualImpairment.maxHeading}
                </th>
                <th className="tablees">
                  {results.section.visualImpairment.minHeading}
                </th>
              </tr>
            </thead>
            <tbody>
              {results.section.visualImpairment.categoriesList.map(
                (category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    {category.value &&
                      category.visRangeList &&
                      category.visRangeList.some(
                        (range) => range.max || range.min
                      ) && (
                        <>
                          {category.visRangeList.map(
                            (range, rangeIndex) =>
                              (range.max || range.min) && (
                                <tr key={`${categoryIndex}-${rangeIndex}`}>
                                  {rangeIndex === 0 && (
                                    <td
                                      className="tablees category-number"
                                      rowSpan={category.visRangeList.length}
                                    >
                                      {category.value}
                                    </td>
                                  )}
                                  <td className="tablees">{range.max}</td>
                                  <td className="tablees">{range.min}</td>
                                </tr>
                              )
                          )}
                        </>
                      )}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};
export default Sectionnotes;
