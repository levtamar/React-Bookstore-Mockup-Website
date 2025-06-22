import Book from "./Book";
import { Link } from "react-router-dom";
function BooksCom(props) {
  return (
    // <ul>
    //   {props.books.map((s, ind) => (
    //    <Book key={`${s.title}-${s.author}`} {...s}  onRate={props.onRate} // העברת הפונקציה הלאה
    //       onRemove={props.onRemove} />
    //   ))}
    // </ul>
 
 <ul>{props.books.map(s=> <li key={s.title}>
 <Link to={`/books/${s.title}`}>{s.title}</Link><br />
 </li>)}
 </ul> 
  );
}
export default BooksCom;
