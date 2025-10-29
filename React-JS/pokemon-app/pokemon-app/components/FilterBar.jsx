import "./FilterBar.css";

export default function FilterBar({ filter, setFilter }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        name="name"
        placeholder="Buscar por nombre"
        value={filter.name}
        onChange={handleChange}
      />

      <select value={filter.type} name="type" onChange={handleChange}>
        <option value="">Todos los tipos</option>
        <option value="fire">Fuego</option>
        <option value="water">Agua</option>
        <option value="grass">Planta</option>
        <option value="electric">Eléctrico</option>
        <option value="ground">Tierra</option>
        <option value="psychic">Psíquico</option>
        <option value="bug">Insectos</option>
        <option value="flying">Volar</option>
        <option value="normal">Normal</option>
        <option value="poison">Veneno</option>
        <option value="fairy">Hada</option>
        <option value="fighting">Lucha</option>
        <option value="rock">Roca</option>
        <option value="ice">Hielo</option>
        <option value="ghost">Fantasma</option>
        <option value="dragon">Dragón</option>
      </select>
    </div>
  );
}
