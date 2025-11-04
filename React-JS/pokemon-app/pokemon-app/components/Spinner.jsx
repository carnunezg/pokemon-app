import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="lds-roller">
      <img src="/icono1.jpg" alt="Pokébola" className="spinner" />
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
