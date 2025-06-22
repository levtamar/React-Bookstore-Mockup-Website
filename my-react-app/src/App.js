import './App.css';
import MyDetails from './components/MyDetails';
import Book from './components/Book';
import { Routes, Route } from 'react-router-dom';
//import booksData from './server/Books';
import React, { useState } from 'react';
import AddBook from './components/AddBook';
import TopRatedBooks from './components/TopRatedBooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BooksCom from './components/BooksCom';
import { Link } from 'react-router-dom';
import Home from './components/Home';



function App() {
 
//לפני השרת שלחתי פה את המערך נתונים שייבאתי מקבץ עכשו זה לפי השרת השרת מייבא אליו ושאני שולחת בקשת API זה קורה אוטומטית
const [books, setBooks] = useState([]);

  // const handleAddBook = (newBook) => {
  //   setBooks([...books, newBook]); // מוסיף ספר חדש לסוף
  // };

 useEffect(() => {
 (async function() {

 const res = await fetch('http://localhost:3000/api/books');
 const data = await res.json();
 setBooks(data);
 })()}, [] )


  //מחיקת ספר ע"פ השם שלו
const removeBookByTitle =   (titleToRemove) => {
  setBooks(books.filter(book => book.title !== titleToRemove));
};

const  handleRate =async (title, newRating) => {

  setBooks(prevBooks =>
    prevBooks.map(book =>
      book.title === title
        ? {
            ...book,
            ratingSum: (book.ratingSum || 0) + newRating,
            ratingCount: (book.ratingCount || 0) + 1
          }
        : book
    )
  );



   // מצא את הספר שצריך לעדכן
  const bookToUpdate = books.find(book => book.title === title);
  if (!bookToUpdate) return;

  // צור גרסה חדשה שלו עם הדירוג החדש
  const updatedBook = {
    ...bookToUpdate,
    ratingSum: (bookToUpdate.ratingSum || 0) + newRating,
    ratingCount: (bookToUpdate.ratingCount || 0) + 1
  };

  try {
    await fetch(`http://localhost:3000/api/books/${encodeURIComponent(title)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBook),
    });
  } catch (error) {
    console.error('שגיאה בשליחת PUT לשרת:', error);
  }
};

  return (<>
  <Routes>
    <Route path = "/" element = {<Home />} />
    {/* <Route path = "Books" element = {<BooksCom books={books}  onRate={handleRate} onRemove={removeBookByTitle}/>} /> */}
    <Route path = "Books" element = {<BooksCom books={books}  onRate={handleRate} onRemove={removeBookByTitle} />} />
    <Route path = "newBook" element = {<AddBook setBooks={setBooks}/>} />
    <Route path = "TheBests" element = {<TopRatedBooks books={books} />} />
    <Route path="/books/:title" element={
  <BookWrapper books={books} onRate={handleRate} onRemove={removeBookByTitle} />
} />

  </Routes>

 <nav>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/Books">Book</Link></li>
    <li><Link to="/newBook">Create Book</Link></li> 
    <li><Link to="/TheBests">The Bests</Link></li> 
  </ul>
 </nav>
  {/* זה תצוגה בלי ניתובים של פרטים הוספת ספר ורשימת הספרים. */}
  {/* <TopRatedBooks books={books} />

       {/* קומפוננטת הוספת ספר */}
  {/* <AddBook setBooks={setBooks} /> */}

  {/* <MyDetails></MyDetails> */}
  {/* <Book title ="Daddy Gamadi" author = "Menucha" year ={2000} des = "A book to child" price = {20} sale={50} stock = {1}>  </Book> */}
    {/* <div> */}
      {/* {books.map((book, index) => (
        <Book
          key={index}
          title={book.title}
          author={book.author}
          year={book.year}
          des={book.des}
          price={book.price}
          sale={book.sale}
          stock={book.stock}
              ratingSum={book.ratingSum}
    ratingCount={book.ratingCount}

    onRate={handleRate}
           onRemove={removeBookByTitle} // שולח את הפונקציה למחיקה לפרופס
        />
      ))} */}
    {/* </div> */} 
      </>
  );
}
function BookWrapper({ books, onRate, onRemove }) {
  const { title } = useParams();
  const book = books.find(b => b.title === decodeURIComponent(title));

  if (!book) return <div>לא נמצא ספר בשם: {title}</div>;

  return <Book {...book} onRate={onRate} onRemove={onRemove} />;
}

export default App;
