"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { usuario, login, mostrarToast } = useApp();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(true);
  const [carregando, setCarregando] = useState(false);

  // Se já estiver logado, redirecionar
  useEffect(() => {
    if (usuario) {
      router.push("/meus-agendamentos");
    }
  }, [usuario, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) {
      mostrarToast("Preencha seu e-mail e senha.", "warning");
      return;
    }

    setCarregando(true);
    const resultado = login(email, senha);
    setCarregando(false);

    if (resultado.sucesso) {
      setTimeout(() => {
        router.push("/meus-agendamentos");
      }, 800);
    }
  };

  const preencherDemo = (demoEmail, demoSenha) => {
    setEmail(demoEmail);
    setSenha(demoSenha);
    mostrarToast("Credenciais preenchidas! Clique em 'Entrar na Conta'.", "info");
  };

  return (
    <section className="container section-padding auth-container">
      <div className="auth-card card-box shadow-blue">
        <div className="auth-header">
          <div className="auth-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
            </svg>
          </div>
          <h1>Acesse sua Conta</h1>
          <p>Entre com seu e-mail e senha cadastrados no Banco de Dados.</p>
        </div>

        <form id="formLogin" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail">E-mail</label>
            <input
              type="email"
              id="loginEmail"
              className="input-control"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="loginSenha">Senha</label>
            <input
              type="password"
              id="loginSenha"
              className="input-control"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div
            className="auth-remember"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
              />{" "}
              Lembrar meu acesso
            </label>
            <button
              type="button"
              onClick={() =>
                mostrarToast(
                  "Instruções de recuperação foram enviadas ao seu e-mail cadastrado!",
                  "info"
                )
              }
              style={{
                fontSize: "0.85rem",
                color: "var(--clr-primary)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Esqueceu a senha?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--full btn--lg"
            disabled={carregando}
          >
            {carregando ? "Autenticando no Banco..." : "Entrar na Conta"}
          </button>
        </form>

        {/* Acessos Rápidos de Demonstração */}
        <div
          style={{
            marginTop: "24px",
            padding: "14px",
            background: "#f8fafc",
            borderRadius: "var(--radius-sm)",
            border: "1px dashed var(--clr-border)",
          }}
        >
          <div
            style={{
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "#64748b",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}
          >
            🔑 Acessos Rápidos de Teste (Cadastrados no Banco):
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={() => preencherDemo("paciente@lifehealth.com", "123456")}
            >
              Paciente (123456)
            </button>
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={() => preencherDemo("admin@lifehealth.com", "admin123")}
            >
              Admin (admin123)
            </button>
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={() => preencherDemo("carlos.souza@gmail.com", "123456")}
            >
              Carlos (123456)
            </button>
          </div>
        </div>

        <div className="auth-footer" style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
            Ainda não possui cadastro?{" "}
            <Link
              href="/cadastro"
              style={{ fontWeight: 700, color: "var(--clr-primary)" }}
            >
              Criar Conta Gratuita
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
