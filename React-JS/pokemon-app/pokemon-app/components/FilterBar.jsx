import "./FilterBar.css";
import { IoSearchOutline } from "react-icons/io5";

export default function FilterBar({ filter, setFilter }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter-bar">
      <div className="search-container">
        <input
          className="search"
          type="text"
          name="query"
          placeholder="Buscar por nombre o tipo"
          value={filter.query}
          onChange={handleChange}
        />
        <IoSearchOutline className="search-icon-right" />

        {/* <select value={filter.type} name="type" onChange={handleChange}>
        <option value="">Todos los tipos</option>
        <option value="water">Agua</option>
        <option value="dragon">Dragón</option>
        <option value="electric">Eléctrico</option>
        <option value="ghost">Fantasma</option>
        <option value="fire">Fuego</option>
        <option value="fairy">Hada</option>
        <option value="ice">Hielo</option>
        <option value="bug">Insectos</option>
        <option value="fighting">Lucha</option>
        <option value="normal">Normal</option>
        <option value="grass">Planta</option>
        <option value="psychic">Psíquico</option>
        <option value="rock">Roca</option>
        <option value="ground">Tierra</option>
        <option value="poison">Veneno</option>
        <option value="flying">Volar</option>
      </select> */}
      </div>
    </div>
  );
}
