
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-buttonPrimary">404</h1>
        <p className="text-xl text-softGrey mb-6">Oops! Page not found</p>
        <Link to="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
