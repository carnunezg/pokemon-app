import Link from "next/link";
import { useEffect, useState } from "react";
import "./PokemonCard.css";

export default function PokemonCard({ name }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [name]);

  if (!pokemon) return null;

  return (
    <Link href="#" className="card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>Tipo: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
    </Link>
  );
}
