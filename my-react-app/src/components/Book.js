import './Book.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
function Book(props) {
const { title, author, year, des, price, sale, stock, ratingSum, ratingCount, onRate , onRemove } = props;

const [isMaybe, setIsMaybe] = useState(false); // התלבטות
const [amount , setAmount] = useState(stock);
const [rating, setRating] = useState(0);
const { title: routeTitle } = useParams();
const [bookData, setBookData] = useState(null);

const averageRating =
  ratingCount > 0 ? (ratingSum / ratingCount).toFixed(1) : "ללא דירוג";

  // קביעת class לפי מצב המלאי
  //const cardClass = stock === 0 ? "book-card out-of-stock" : "book-card";
const cardClass =
  "book-card" +
  (stock === 0 ? " out-of-stock" : "") +
  (sale > 40 ? " sale-highlight" : "") +
  (isMaybe ? " maybe-selected" : "");

    const handleDelete = async () => {
    try {
      console.log(title);
      const res = await fetch(`http://localhost:3000/api/books/${encodeURIComponent(title)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        onRemove(title); // מעדכן את הסטייט באפליקציה
      } else {
        console.error('Failed to delete book from server');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
//יוזאפקט להצגה ספר ספר בלינקים:
 useEffect(() => {

 let url = `http://localhost:3000/api/Books/${routeTitle}`;
 fetch(url).then(res => res.json()).then(data => {
 setBookData(data);
 })
 }, [routeTitle])
  return (
    <div className={cardClass}>
      <h1>שם הספר: {title}</h1>
      <h2>מחבר: {author}</h2>
      <h3>שנת הוצאה: {year}</h3>
      <h4>תיאור: {des}</h4>
      <h4>מחיר: ₪{price}</h4>
      {sale>0 && <span ><h4>הנחה: %{sale}</h4>
      <h4>מחיר לאחר ההנחה : ₪{price*(0.01*sale)}</h4>  </span>   }
      <h5>{stock === 0 ? "אזל מהמלאי" : `כמות במלאי: ${amount}`}</h5>
      {stock > 0 && ( <button disabled={amount === 0} onClick={() => { console.log("הוספת את " + title + " לסל"); setAmount(amount - 1); }}>
        הוסף לסל
      </button>
      )}
      <h4>דירוג ממוצע: {averageRating}</h4>

        <button onClick={() => setAmount(amount+1)}>הוסף עותק למלאי</button>
        <button onClick={()=> setIsMaybe(!isMaybe) }> ❤️ </button>
   {/* <button onClick={() =>onRemove(props.title)}>מחק</button> */}
   <button onClick={(handleDelete)}>מחק</button> 
     <div className="rating-range">
    <label>דירוג: {rating}</label><br />
 
    <input
  type="range"
  min="1"
  max="5"
  value={rating}
  onChange={(e) => {
    const value = Number(e.target.value);
    setRating(value);
    props.onRate(title, value);
  }}
/>

  </div>
    </div>
  );
}

export default Book;
