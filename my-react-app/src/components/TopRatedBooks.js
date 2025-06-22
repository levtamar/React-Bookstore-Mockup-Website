import React from 'react';
import './TopRatedBooks.css';


function TopRatedBooks({ books }) {
  // חישוב ממוצע דירוג לכל ספר
  const booksWithAverage = books
    .filter(book => book.ratingCount > 0) // רק ספרים עם דירוגים
    .map(book => ({
      ...book,
      averageRating: book.ratingSum / book.ratingCount
    }));

  // מיון הספרים לפי ממוצע דירוג
  const topBooks = booksWithAverage
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3); // שלושת הגבוהים ביותר

  return (
    <div className="top-rated">
      <h2>📚 הספרים המדורגים ביותר</h2>
      {topBooks.length === 0 ? (
        <p>אין עדיין דירוגים</p>
      ) : (
        <ul>
          {topBooks.map((book, index) => (
            <li key={index}>
              <strong>{book.title}</strong> — ממוצע דירוג: {book.averageRating.toFixed(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopRatedBooks;
