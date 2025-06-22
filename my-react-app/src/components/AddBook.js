import React, { useState } from 'react';
import './AddBook.css';
import { useEffect } from 'react';
function AddBook(props) {
  const [title1, setTitle1] = useState('');
  const [author1, setAuthor1] = useState('');
  const [year1, setYear1] = useState('');
  const [des1, setDes1] = useState('');
  const [price1, setPrice1] = useState(0);
  const [sale1, setSale1] = useState(0);
  const [stock1, setStock1] = useState(0);


//עד עכשו ההספת ספר עבדה מקומית בצוורה הזו.
  // const send = () => {
  //   const newBook = { title: title1,  author: author1,
  //     year: year1, des: des1, price: price1,
  //     sale: sale1,  stock: stock1
  //   };
  // props.onAddBook(newBook); // שולחת את הספר החדש להורה
  // setTitle1('');
  // setAuthor1('');
  // setYear1('');
  // setDes1('');
  // setPrice1(0);
  // setSale1(0);
  // setStock1(0);
  // };
 const [newBook, setNewBook] = useState(null);

 async function postData() {
  console.log("fdgfh");
 const res = await fetch('http://localhost:3000/api/books', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(newBook)
 });
 const data = await res.json();
 props.setBooks(prevBooks => [...prevBooks, data]);
 if (data.code > 0) props.setBooks(prevBooks => prevBooks.concat(data));
 }
useEffect(() =>{
 //the if is required for the first render, useEffectis always called then
 if (newBook== null) return;
 postData(); 
}, [newBook])
  return (
    <> 
     <div className="add-book-container">
       <span>שם</span>
      <input value={title1} onChange={(e) => setTitle1(e.target.value)} /><br />

      <span>מחבר</span>
      <input value={author1} onChange={(e) => setAuthor1(e.target.value)} /><br />

      <span>תיאור</span>
      <input value={des1} onChange={(e) => setDes1(e.target.value)} /><br />

      <span>שנה</span>
      <input value={year1} onChange={(e) => setYear1(e.target.value)} /><br />

      <span>מחיר</span>
      <input
        type="number"
        value={price1}
        onChange={(e) => setPrice1(Number(e.target.value))}
      /><br />

      <span>הנחה (%)</span>
      <input
        type="number"
        value={sale1}
        onChange={(e) => setSale1(Number(e.target.value))}
      /><br />

      <span>כמות</span>
      <input
        type="number"
        value={stock1}
        onChange={(e) => setStock1(Number(e.target.value))}
      /><br />
      {/* <button type="button" onClick={send}>הוסף</button> */}
     <button
  type="button"
  onClick={() => {
    const bookToSend = {
      title: title1,
      author: author1,
      year: year1,
      des: des1,
      price: price1,
      sale: sale1,
      stock: stock1,
      ratingSum: 0,
      ratingCount: 0
    };
   
    setNewBook(bookToSend); // מעדכן את הסטייט
  }}
>
  הוסף
</button>


      </div>
    </>
  );
}

export default AddBook;
