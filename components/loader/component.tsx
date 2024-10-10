import { SpinnerIcon } from "../icons";
import "./styles.css";

const Loader = () => {
  return (
    <div className="loader">
      Loading..
      <span className="spinner">
        <SpinnerIcon />
      </span>
    </div>
  );
};

export default Loader;
