import React, { useEffect, useState } from "react";

const Chapternotes = () => {
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

    if (global.values && global.values.code) {
      fetchBooks();
    } else {
      setResults(null);
    }
  }, [global.values]);

  useEffect(() => {
    setResults(global.selectedCodeDetails); // Use the stored details
  }, [global.selectedCodeDetails]);

  console.log("our result is", results);
  const shouldDisplayClassification = (classification, index) => {
    if (index === 0) {
      return true;
    }
    const previousClassifications = results.chapter.notes
      .slice(0, index)
      .map((note) => note.classification);
    return !previousClassifications.includes(classification);
  };
  return (
    <div>
      <div
        style={{
          marginTop: "50px",
        }}
      >
        {results && results.chapter && results.chapter.description ? (
          <div key={results.code}>
            <div style={{ marginLeft: "17px" }}>
              {results.chapter.description}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {results && results.chapter && results.chapter.notes ? (
          results.chapter.notes
            .sort((a, b) => a.classification.localeCompare(b.classification))
            .map((note, index) => (
              <div key={index}>
                {index === 0 ||
                note.classification !==
                  results.chapter.notes[index - 1].classification ? (
                  <div style={{ padding: "10px 20px 20px 20px" }}>
                    <strong>{note.classification.toUpperCase()}</strong>
                    :&nbsp;&nbsp;
                    {note.notes}
                  </div>
                ) : (
                  <div style={{ marginLeft: "110px" }}>{note.notes}</div>
                )}
              </div>
            ))
        ) : (
          <div>No chapter notes</div>
        )}
      </div>
    </div>
  );
};

export default Chapternotes;
