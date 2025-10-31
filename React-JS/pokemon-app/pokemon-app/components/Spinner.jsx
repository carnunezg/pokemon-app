import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="lds-roller">
      <img src="/logo1.png" alt="Pokébola" className="spinner" />
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
