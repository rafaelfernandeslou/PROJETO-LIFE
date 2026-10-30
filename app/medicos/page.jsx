"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DB } from "@/lib/db";

export default function MedicosPage() {
  const [medicos, setMedicos] = useState([]);
  const [filtroEspecialidade, setFiltroEspecialidade] = useState("todos");
  const [busca, setBusca] = useState("");

  const especialidades = [
    "todos",
    "Clínica Geral",
    "Cardiologia",
    "Fisioterapia",
    "Nutrição",
    "Psicologia",
    "Ortopedia",
  ];

  useEffect(() => {
    try {
      const lista = DB.tabela("medicos").listar();
      setMedicos(lista);
    } catch (e) {
      console.error("Erro ao listar médicos:", e);
    }
  }, []);

  const medicosFiltrados = medicos.filter((med) => {
    const matchEsp =
      filtroEspecialidade === "todos" ||
      med.especialidade.toLowerCase() === filtroEspecialidade.toLowerCase();

    const termo = busca.toLowerCase().trim();
    const matchBusca =
      !termo ||
      med.nome.toLowerCase().includes(termo) ||
      med.crm.toLowerCase().includes(termo) ||
      med.especialidade.toLowerCase().includes(termo);

    return matchEsp && matchBusca;
  });

  return (
    <section className="container section-padding">
      <div className="section-header">
        <span className="section-label">Corpo Clínico</span>
        <h1 className="section-title">
          Consultar{" "}
          <span className="gradient-text">Médicos &amp; Especialistas</span>
        </h1>
        <p className="section-subtitle">
          Conheça os profissionais qualificados da Life &amp; Health
          cadastrados em nosso banco de dados.
        </p>
      </div>

      {/* Barra de Pesquisa */}
      <div style={{ maxWidth: "560px", margin: "0 auto 24px auto" }}>
        <div className="search-input-wrap">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Pesquisar por nome do médico, CRM ou especialidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {/* Filtro de Especialidades */}
      <div className="filter-bar">
        {especialidades.map((esp) => (
          <button
            key={esp}
            type="button"
            className={`filter-pill ${filtroEspecialidade === esp ? "active" : ""}`}
            onClick={() => setFiltroEspecialidade(esp)}
          >
            {esp === "todos" ? "Todos os Especialistas" : esp}
          </button>
        ))}
      </div>

      {/* Grid de Médicos */}
      {medicosFiltrados.length === 0 ? (
        <div
          className="card-box"
          style={{
            textAlign: "center",
            padding: "50px 20px",
            background: "#ffffff",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🩺</div>
          <h3 style={{ marginBottom: "8px", color: "var(--clr-dark-2)" }}>
            Nenhum médico encontrado
          </h3>
          <p style={{ color: "var(--clr-text-muted)" }}>
            Tente buscar com outros termos ou selecione outra especialidade.
          </p>
        </div>
      ) : (
        <div
          className="doctors-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
            marginTop: "20px",
          }}
        >
          {medicosFiltrados.map((m) => (
            <div
              key={m.id}
              className="card-box shadow-sm"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "24px",
                transition: "var(--transition)",
                border: "1px solid var(--clr-border-light)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "var(--clr-primary-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      boxShadow: "0 4px 10px rgba(25, 118, 210, 0.15)",
                    }}
                  >
                    {m.foto || "👨‍⚕️"}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "var(--clr-dark-2)",
                      }}
                    >
                      {m.nome}
                    </h3>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--clr-primary)",
                        fontWeight: 600,
                      }}
                    >
                      {m.especialidade}
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--clr-text-muted)",
                      }}
                    >
                      {m.crm}
                    </div>
                  </div>
                </div>

                {/* Avaliação e Experiência */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "var(--clr-surface-2)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.85rem",
                    marginBottom: "14px",
                  }}
                >
                  <span style={{ color: "#d97706", fontWeight: 700 }}>
                    ⭐ {m.avaliacao.toFixed(1)} ({m.totalAvaliacoes} avaliações)
                  </span>
                  <span style={{ color: "var(--clr-text-muted)" }}>
                    {m.experiencia}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--clr-text)",
                    lineHeight: 1.5,
                    marginBottom: "14px",
                  }}
                >
                  {m.bio}
                </p>

                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--clr-text-muted)",
                    marginBottom: "16px",
                  }}
                >
                  <div>🎓 <strong>Formação:</strong> {m.formacao}</div>
                  <div>🗓️ <strong>Atendimento:</strong> {m.dias} ({m.atendimento})</div>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--clr-border-light)",
                  paddingTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--clr-text-muted)",
                      display: "block",
                    }}
                  >
                    Consulta a partir de
                  </span>
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "var(--clr-primary-dark)",
                    }}
                  >
                    R$ {m.valorConsulta},00
                  </span>
                </div>

                <Link
                  href={`/agendamento?medicoId=${m.id}&especialidade=${encodeURIComponent(
                    m.especialidade
                  )}`}
                  className="btn btn--primary btn--sm"
                >
                  Agendar Consulta
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
