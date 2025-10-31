"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./PokemonDetailModal.css";

export default function PokemonDetailModal() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (res.ok) {
        const data = await res.json();
        setPokemon(data);
      }
    };
    fetchPokemon();
  }, [name]);

  if (!pokemon) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={() => history.back()}>
          ×
        </button>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <ul>
          <li>Altura: {pokemon.height}</li>
          <li>Peso: {pokemon.weight}</li>
          <li>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</li>
          <li>
            Habilidades:{" "}
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
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
    </div>
  );
}
