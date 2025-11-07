"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import "./PokemonDetailModal.css";
import Spinner from "../../../components/Spinner";

export default function PokemonDetailPage() {
  const { name } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState(null);

  const page = searchParams.get("page") || "0";

  useEffect(() => {
    if (pokemon) {
      document.title = `Detalles de ${pokemon.name}`;
    }
  }, [pokemon]);

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

  if (!pokemon)
    return (
      <div className="loading">
        <Spinner />
        <p className="p-loading">Cargando...</p>
      </div>
    );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={() => router.push(`/?page=${page}`)}
        >
          ×
        </button>

        <h2 className="title">{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <ul>
          <li>
            <strong className="description">Altura:</strong>{" "}
            <span>{pokemon.height}</span>
          </li>
          <li>
            <strong className="description">Peso:</strong>{" "}
            <span>{pokemon.weight}</span>
          </li>
          <li>
            <strong className="description">Tipos:</strong>{" "}
            <span>{pokemon.types.map((t) => t.type.name).join(", ")}</span>
          </li>
          <li>
            <strong className="description">Habilidades:</strong>{" "}
            <span>
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </span>
          </li>
          <li>
            <strong className="description">Movimientos:</strong>{" "}
            <span>
              {pokemon.moves
                .slice(0, 5)
                .map((m) => m.move.name)
                .join(", ")}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
