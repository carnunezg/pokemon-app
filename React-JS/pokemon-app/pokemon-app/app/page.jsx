"use client";

import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPage = parseInt(searchParams.get("page") || "0");

  const [page, setPage] = useState(initialPage);
  const [allPokemons, setAllPokemons] = useState([]);
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

  const filteredPokemons = allPokemons.filter((pokemon) => {
    const query = filter.query.toLowerCase();
    const tipoEnIngles = tipoTraducido[query];

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

  const paginatedPokemons = filteredPokemons.slice(page * 20, (page + 1) * 20);
  const totalPages = Math.ceil(filteredPokemons.length / 20);

  const reset = () => {
    setFilter({ query: "", type: "" });
    setPage(0);
    router.push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`/?page=${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(0);
    router.push("/?page=0");
  };

  return (
    <main className="nav">
      <section className="main">
        <img
          className="logo"
          src="/logo.png"
          alt="Logo Pokémon"
          onClick={reset}
        />

        <FilterBar filter={filter} setFilter={handleFilterChange} />
      </section>
      {loading ? (
        <div className="loading">
          <Spinner />
          <p className="p-loading">Cargando...</p>
        </div>
      ) : filteredPokemons.length === 0 ? (
        <div className="no-results">
          <p>No se encontró ningún Pokémon.</p>
          <button className="reload-btn" onClick={reset}>
            Recargar
          </button>
        </div>
      ) : (
        <div className="grid">
          {paginatedPokemons.map((p) => (
            <PokemonCard key={p.name} name={p.name} page={page} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        setPage={handlePageChange}
        totalPages={totalPages}
      />
    </main>
  );
}
