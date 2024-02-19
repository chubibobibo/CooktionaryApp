import { Link } from "react-router-dom";
//obtaining errors and using it to display error data in the JSX
import { useRouteError } from "react-router-dom";
function ErrorPage() {
  const errors = useRouteError();

  console.log(errors.error.message); //full path of error message
  console.log(errors); //full path of error message

  return (
    <div>
      {errors.status === 404 ? (
        <div>
          <img src='src/assets/404logo.svg' alt='' />
        </div>
      ) : (
        <p>Something went wrong - {errors.error.message}</p>
      )}
      <div>
        <Link to={"/"}>Back to home</Link>
      </div>
    </div>
  );
}
export default ErrorPage;
