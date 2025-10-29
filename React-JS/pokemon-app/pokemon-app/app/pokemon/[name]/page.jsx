export default async function PokemonDetail({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemon = await res.json();

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <ul>
        <li>Altura: {pokemon.height}</li>
        <li>Peso: {pokemon.weight}</li>
        <li>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</li>
        <li>
          Habilidades: {pokemon.abilities.map((a) => a.ability.name).join(", ")}
        </li>
        <li>
          Movimientos:{" "}
          {pokemon.moves
            .slice(0, 5)
            .map((m) => m.move.name)
            .join(", ")}
        </li>
      </ul>
    </div>
  );
}
