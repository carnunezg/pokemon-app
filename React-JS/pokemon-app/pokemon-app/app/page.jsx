"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

const tipoTraducido = {
  agua: "water",
  fuego: "fire",
  planta: "grass",
  eléctrico: "electric",
  roca: "rock",
  tierra: "ground",
  normal: "normal",
  lucha: "fighting",
  siniestro: "dark",
  acero: "steel",
  psíquico: "psychic",
  fantasma: "ghost",
  insecto: "bug",
  veneno: "poison",
  volador: "flying",
  hada: "fairy",
  hielo: "ice",
  dragón: "dragon",
};

export default function HomePage() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({ query: "", type: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      setLoading(true);

      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
      const data = await res.json();

      const detailed = await Promise.all(
        data.results.map((p) => fetch(p.url).then((res) => res.json()))
      );

      setAllPokemons(detailed);
      setLoading(false);
    };

    fetchAllPokemons();
  }, []);

  useEffect(() => {
    const query = filter.query.toLowerCase();
    const tipoEnIngles = tipoTraducido[query]; // si existe, lo usamos

    const filtered = allPokemons.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(query);
      const matchesTypeInQuery = pokemon.types.some((t) =>
        t.type.name.toLowerCase().includes(query)
      );
      const matchesTypeTraducido = tipoEnIngles
        ? pokemon.types.some((t) => t.type.name === tipoEnIngles)
        : false;

      const matchesTypeSelect = filter.type
        ? pokemon.types.some((t) => t.type.name === filter.type)
        : true;

      return (
        (matchesName || matchesTypeInQuery || matchesTypeTraducido) &&
        matchesTypeSelect
      );
    });

    setFilteredPokemons(filtered);
    setPage(0);
  }, [filter, allPokemons]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, [page, filteredPokemons]);

  const reset = () => {
    setFilter({ query: "", type: "" });
    setPage(0);
  };

  const paginated = filteredPokemons.slice(page * 20, (page + 1) * 20);

  return (
    <main className="nav">
      <section className="main">
        <img
          className="logo"
          src="/logo.png"
          alt="Logo de la Pokédex"
          onClick={reset}
        />

        <FilterBar filter={filter} setFilter={setFilter} />
      </section>

      {loading ? (
        <div className="loading">
          <Spinner />
          <p>Cargando lista de Pokémon...</p>
        </div>
      ) : (
        <div className="grid">
          {paginated.map((p) => (
            <PokemonCard key={p.name} name={p.name} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(filteredPokemons.length / 20)}
      />
    </main>
  );
}
