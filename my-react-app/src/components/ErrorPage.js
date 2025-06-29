import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <>
      <h1>404 - הדף לא נמצא</h1>
      <p>מצטערים, הכתובת שחיפשת לא קיימת.</p>
      <Link to="/">חזרה לדף הבית</Link>
    </>
  );
}

export default ErrorPage;
