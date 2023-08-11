import React, { useEffect, useState } from "react";
import "../styles/Pagination.css";

export const Filter = () => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `/codes/${global.words}/index?filterBy=${global.alphabets}`
        );
        if (response.ok) {
          const data = await response.json();
          setResult(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBooks();
  }, [global.alphabets]);
  console.log("our result is", result);

  return (
    <div>
      <div className="center">
        {result &&
          result.map((addmovie) => {
            return (
              <tr key={addmovie.title}>
                <td>{addmovie.title}</td>
                <td>{addmovie.code}</td>
              </tr>
            );
          })}
      </div>
    </div>
  );
};
