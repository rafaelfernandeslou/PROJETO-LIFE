"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DB } from "@/lib/db";
import { useApp } from "@/context/AppContext";

export default function MeusAgendamentosPage() {
  const { usuario, mostrarToast } = useApp();
  const [agendamentos, setAgendamentos] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const carregarAgendamentos = () => {
    try {
      const lista = DB.tabela("agendamentos").listar();
      setAgendamentos(lista);
    } catch (e) {
      console.error("Erro ao listar agendamentos:", e);
    }
  };

  useEffect(() => {
    carregarAgendamentos();

    const handleDBChange = (e) => {
      if (!e.detail || e.detail.tabela === "agendamentos" || e.detail.tabela === "all") {
        carregarAgendamentos();
      }
    };

    window.addEventListener("lifehealth_db_change", handleDBChange);
    return () => {
      window.removeEventListener("lifehealth_db_change", handleDBChange);
    };
  }, []);

  const handleCancelar = (id, medicoNome) => {
    if (confirm(`Deseja realmente cancelar a consulta com ${medicoNome}?`)) {
      try {
        DB.tabela("agendamentos").atualizar(id, { status: "Cancelado" });
        mostrarToast("Consulta cancelada com sucesso no Banco de Dados.", "info");
        carregarAgendamentos();
      } catch (e) {
        console.error("Erro ao cancelar:", e);
        mostrarToast("Erro ao cancelar consulta.", "error");
      }
    }
  };

  const handleExcluir = (id) => {
    if (confirm("Deseja remover este registro permanentemente do Banco de Dados?")) {
      try {
        DB.tabela("agendamentos").deletar(id);
        mostrarToast("Registro removido com sucesso do Banco de Dados.", "info");
        carregarAgendamentos();
      } catch (e) {
        console.error("Erro ao deletar:", e);
        mostrarToast("Erro ao excluir registro.", "error");
      }
    }
  };

  // Filtragem dos agendamentos
  const agendamentosFiltrados = agendamentos.filter((item) => {
    const termo = busca.toLowerCase().trim();
    const matchesBusca =
      !termo ||
      (item.medicoNome && item.medicoNome.toLowerCase().includes(termo)) ||
      (item.especialidade && item.especialidade.toLowerCase().includes(termo)) ||
      (item.pacienteNome && item.pacienteNome.toLowerCase().includes(termo)) ||
      (item.data && item.data.includes(termo));

    const matchesStatus =
      filtroStatus === "todos" ||
      (item.status && item.status.toLowerCase() === filtroStatus.toLowerCase());

    return matchesBusca && matchesStatus;
  });

  return (
    <section className="container section-padding">
      <div className="section-header">
        <span className="section-label">Painel do Paciente</span>
        <h1 className="section-title">
          Consultar <span className="gradient-text">Meus Agendamentos</span>
        </h1>
        <p className="section-subtitle">
          Acompanhe suas consultas marcadas, histórico de atendimentos e
          status obtidos em tempo real do banco de dados.
        </p>
      </div>

      <div className="appointments-controls">
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
            id="filtroAgendamentoInput"
            placeholder="Pesquisar por médico, especialidade, paciente ou data..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <Link href="/agendamento" className="btn btn--primary btn--sm">
          + Agendar Nova Consulta
        </Link>
      </div>

      {/* Abas de filtro rápido por status */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {["todos", "Confirmado", "Pendente", "Cancelado"].map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setFiltroStatus(st)}
            className={`filter-pill ${filtroStatus === st ? "active" : ""}`}
            style={{ textTransform: "capitalize" }}
          >
            {st === "todos" ? "Todos os Status" : st}
          </button>
        ))}
      </div>

      {/* Grid de agendamentos */}
      {agendamentosFiltrados.length === 0 ? (
        <div
          className="card-box"
          style={{
            textAlign: "center",
            padding: "50px 20px",
            background: "#ffffff",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📅</div>
          <h3 style={{ marginBottom: "8px", color: "var(--clr-dark-2)" }}>
            Nenhum agendamento encontrado
          </h3>
          <p style={{ color: "var(--clr-text-muted)", marginBottom: "20px" }}>
            Não encontramos consultas para o filtro selecionado ou seu histórico está vazio.
          </p>
          <Link href="/agendamento" className="btn btn--primary">
            Agendar Nova Consulta Agora
          </Link>
        </div>
      ) : (
        <div className="agendamentos-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
          {agendamentosFiltrados.map((item) => {
            const isCancelado = item.status === "Cancelado";
            const isConfirmado = item.status === "Confirmado";

            return (
              <div
                key={item.id}
                className="card-box shadow-sm"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderLeft: `5px solid ${
                    isCancelado ? "var(--clr-danger)" : isConfirmado ? "var(--clr-success)" : "var(--clr-warning)"
                  }`,
                  position: "relative",
                  transition: "var(--transition)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "12px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          color: "var(--clr-primary)",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {item.especialidade}
                      </span>
                      <h3
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          color: "var(--clr-dark-2)",
                          marginTop: "2px",
                        }}
                      >
                        {item.medicoNome}
                      </h3>
                    </div>

                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        backgroundColor: isCancelado
                          ? "#fee2e2"
                          : isConfirmado
                          ? "#dcfce7"
                          : "#fef3c7",
                        color: isCancelado
                          ? "#b91c1c"
                          : isConfirmado
                          ? "#15803d"
                          : "#b45309",
                      }}
                    >
                      {item.status || "Confirmado"}
                    </span>
                  </div>

                  <div
                    style={{
                      background: "var(--clr-surface-2)",
                      padding: "12px",
                      borderRadius: "var(--radius-sm)",
                      marginBottom: "14px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                      fontSize: "0.88rem",
                    }}
                  >
                    <div>
                      <span style={{ color: "var(--clr-text-muted)", fontSize: "0.75rem", display: "block" }}>
                        Data
                      </span>
                      <strong>
                        {item.data
                          ? item.data.split("-").reverse().join("/")
                          : "Não definida"}
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: "var(--clr-text-muted)", fontSize: "0.75rem", display: "block" }}>
                        Horário
                      </span>
                      <strong>{item.horario}</strong>
                    </div>
                    <div>
                      <span style={{ color: "var(--clr-text-muted)", fontSize: "0.75rem", display: "block" }}>
                        Modalidade
                      </span>
                      <strong>{item.modalidade || "Presencial"}</strong>
                    </div>
                    <div>
                      <span style={{ color: "var(--clr-text-muted)", fontSize: "0.75rem", display: "block" }}>
                        Paciente
                      </span>
                      <strong title={item.pacienteEmail}>{item.pacienteNome}</strong>
                    </div>
                  </div>

                  {item.observacoes && (
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--clr-text-muted)",
                        fontStyle: "italic",
                        marginBottom: "16px",
                      }}
                    >
                      &ldquo;{item.observacoes}&rdquo;
                    </p>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    borderTop: "1px solid var(--clr-border-light)",
                    paddingTop: "14px",
                    marginTop: "8px",
                  }}
                >
                  <Link
                    href={`/agendamento?medicoId=${item.medicoId || ""}&especialidade=${encodeURIComponent(
                      item.especialidade || ""
                    )}`}
                    className="btn btn--outline btn--sm"
                    style={{ flex: 1, textAlign: "center" }}
                  >
                    Remarcar
                  </Link>

                  {!isCancelado && (
                    <button
                      type="button"
                      className="btn btn--sm"
                      style={{
                        background: "#fee2e2",
                        color: "#dc2626",
                        fontWeight: 600,
                      }}
                      onClick={() => handleCancelar(item.id, item.medicoNome)}
                    >
                      Cancelar
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn--sm"
                    style={{
                      background: "transparent",
                      color: "#94a3b8",
                      padding: "6px",
                    }}
                    title="Excluir do Banco de Dados"
                    onClick={() => handleExcluir(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
