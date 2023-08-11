import React, { useEffect, useState } from "react";
const Codenotes = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (global.values && global.values.code && global.years) {
          const response = await fetch(
            `/codes/${global.values.code}/details/?version=${global.years}`
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
  }, [global.values]);

  useEffect(() => {
    setResults(global.selectedCodeDetails); // Use the stored details
  }, [global.selectedCodeDetails]);

  return (
    <div className="codenotes">
      <div>
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {results && results.code && (
              <tr key={results.code}>
                <td>{results.longDescription}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Codenotes;
