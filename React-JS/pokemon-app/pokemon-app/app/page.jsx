"use client";
import Image from "next/image";

import { Suspense, useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";

export default function HomePage() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({ name: "", type: "" });
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
    const filtered = allPokemons.filter((pokemon) => {
      const matchesName = pokemon.name
        .toLowerCase()
        .includes(filter.name.toLowerCase());

      const matchesType = filter.type
        ? pokemon.types.some((t) => t.type.name === filter.type)
        : true;

      return matchesName && matchesType;
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
    setFilter({ name: "", type: "" });
    setPage(0);
  };

  const paginated = filteredPokemons.slice(page * 20, (page + 1) * 20);

  return (
    <main>
      <section className="main">
        <Image
          className="logo"
          src="/logo.png"
          alt="Logo de la Pokédex"
          width={200}
          height={100}
          onClick={reset}
        />

        <FilterBar filter={filter} setFilter={setFilter} />
      </section>

      {loading ? (
        <div className="loading">
          <p>Cargando lista de Pokémon...</p>
        </div>
      ) : (
        <div className="grid">
          {paginated.map((p) => (
            <PokemonCard key={p.name} name={p.name} />
          ))}
        </div>
      )}

      <Pagination page={page} setPage={setPage} />
    </main>
  );
}
