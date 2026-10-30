"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DB } from "@/lib/db";
import Logo from "@/components/Logo";

export default function HomePage() {
  const [stats, setStats] = useState({
    medicos: 6,
    agendamentos: 3,
    produtos: 6,
    usuarios: 3,
  });

  useEffect(() => {
    try {
      const totalMedicos = DB.tabela("medicos").contar();
      const totalAgendamentos = DB.tabela("agendamentos").contar();
      const totalProdutos = DB.tabela("produtos").contar();
      const totalUsuarios = DB.tabela("usuarios").contar();

      setStats({
        medicos: totalMedicos,
        agendamentos: totalAgendamentos,
        produtos: totalProdutos,
        usuarios: totalUsuarios,
      });
    } catch (e) {
      console.error("Erro ao carregar estatísticas:", e);
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero__bg">
          <div className="hero__blob hero__blob--1"></div>
          <div className="hero__blob hero__blob--2"></div>
        </div>
        <div className="container hero__content">
          <div className="hero__text">
            <div className="hero__badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Portal Oficial de Saúde e Gestão Médica
            </div>
            <h1 className="hero__title">
              Sua saúde com cuidado <br />
              <span className="gradient-text">ágil, moderno e completo</span>
            </h1>
            <p className="hero__subtitle">
              Agende consultas, consulte especialistas, gerencie seus
              atendimentos e adquira produtos de saúde em um ambiente
              integrado com banco de dados em tempo real.
            </p>
            <div className="hero__ctas">
              <Link href="/agendamento" className="btn btn--primary btn--lg">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ width: "20px", height: "20px" }}
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Agendar Consulta
              </Link>
              <Link href="/medicos" className="btn btn--outline btn--lg">
                Consultar Médicos
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ width: "18px", height: "18px" }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/produtos" className="btn btn--ghost btn--lg">
                Comprar Produtos 🛍️
              </Link>
            </div>
          </div>

          <div className="hero__image">
            <div className="hero__card-box">
              <div className="hero__icon-circle" style={{ background: "transparent" }}>
                <Logo size="normal" />
              </div>
              <h3>Atendimento Multidisciplinar</h3>
              <p>
                Consultas presenciais e por telemedicina com prontuário digital
                seguro e acompanhamento em tempo real sincronizado ao banco de dados.
              </p>

              <div className="quick-nav-pills">
                <Link href="/meus-agendamentos" className="pill-btn">
                  📋 Ver Meus Agendamentos
                </Link>
                <Link href="/login" className="pill-btn">
                  🔐 Acessar Minha Conta
                </Link>
              </div>

              {/* Métricas do Banco de Dados em Tempo Real */}
              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--clr-border-light)",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                  textAlign: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--clr-primary)" }}>
                    {stats.medicos}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--clr-text-muted)" }}>Médicos</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--clr-primary)" }}>
                    {stats.agendamentos}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--clr-text-muted)" }}>Agendamentos</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--clr-primary)" }}>
                    {stats.produtos}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--clr-text-muted)" }}>Produtos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recursos / Destaques da Plataforma */}
      <section className="features-section container">
        <div className="section-header">
          <span className="section-label">Recursos do Portal</span>
          <h2 className="section-title">
            O que você pode fazer{" "}
            <span className="gradient-text">na Life &amp; Health</span>
          </h2>
          <p className="section-subtitle">
            Navegue pelos módulos interativos da nossa plataforma com banco de dados funcional.
          </p>
        </div>

        <div className="features-grid">
          <Link href="/agendamento" className="feature-box" style={{ textDecoration: "none" }}>
            <div className="feature-box__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3>Página de Agendamento</h3>
            <p>
              Escolha a especialidade, médico, data e horário ideal com
              confirmação e gravação imediata no banco.
            </p>
            <span className="box-link">Acessar Agendamento &rarr;</span>
          </Link>

          <Link href="/meus-agendamentos" className="feature-box" style={{ textDecoration: "none" }}>
            <div className="feature-box__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </div>
            <h3>Consultar Meus Agendamentos</h3>
            <p>
              Acompanhe status, horários agendados, histórico de atendimentos e
              opções de cancelamento ou remarcação.
            </p>
            <span className="box-link">Acessar Meus Agendamentos &rarr;</span>
          </Link>

          <Link href="/medicos" className="feature-box" style={{ textDecoration: "none" }}>
            <div className="feature-box__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <h3>Consultar Médicos</h3>
            <p>
              Conheça corpo clínico qualificado, CRM, avaliações de pacientes e
              especialidades atendidas.
            </p>
            <span className="box-link">Ver Equipe Médica &rarr;</span>
          </Link>

          <Link href="/produtos" className="feature-box" style={{ textDecoration: "none" }}>
            <div className="feature-box__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
            </div>
            <h3>Comprar Produtos</h3>
            <p>
              Loja online de suplementos, produtos de reabilitação e itens para
              bem-estar com carrinho funcional.
            </p>
            <span className="box-link">Ir para Loja &rarr;</span>
          </Link>

          <Link href="/login" className="feature-box" style={{ textDecoration: "none" }}>
            <div className="feature-box__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
            </div>
            <h3>Área do Paciente &amp; Login</h3>
            <p>
              Acesse seu perfil seguro para gerenciar seus dados pessoais e
              histórico médico no banco de dados.
            </p>
            <span className="box-link">Entrar ou Cadastrar &rarr;</span>
          </Link>
        </div>
      </section>
    </>
  );
}
