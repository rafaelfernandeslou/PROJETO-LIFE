"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function CadastroPage() {
  const router = useRouter();
  const { usuario, cadastrar, mostrarToast } = useApp();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConf, setSenhaConf] = useState("");
  const [concorda, setConcorda] = useState(true);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (usuario) {
      router.push("/meus-agendamentos");
    }
  }, [usuario, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !senha) {
      mostrarToast("Preencha todos os campos obrigatórios (*)", "warning");
      return;
    }

    if (senha.length < 6) {
      mostrarToast("A senha deve ter pelo menos 6 caracteres.", "warning");
      return;
    }

    if (senha !== senhaConf) {
      mostrarToast("As senhas digitadas não coincidem!", "error");
      return;
    }

    if (!concorda) {
      mostrarToast("Você precisa concordar com os Termos de Uso.", "warning");
      return;
    }

    setCarregando(true);
    const resultado = cadastrar({
      nome,
      telefone,
      email,
      senha,
    });
    setCarregando(false);

    if (resultado.sucesso) {
      setTimeout(() => {
        router.push("/meus-agendamentos");
      }, 900);
    }
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
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <h1>Crie sua Conta</h1>
          <p>
            Cadastre-se para agendar consultas e salvar suas preferências no
            banco de dados.
          </p>
        </div>

        <form id="formCadastro" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cadNome">Nome Completo *</label>
            <input
              type="text"
              id="cadNome"
              className="input-control"
              placeholder="Ex: Maria Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cadTelefone">Telefone / WhatsApp *</label>
            <input
              type="tel"
              id="cadTelefone"
              className="input-control"
              placeholder="(11) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cadEmail">E-mail *</label>
            <input
              type="email"
              id="cadEmail"
              className="input-control"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cadSenha">Senha *</label>
            <input
              type="password"
              id="cadSenha"
              className="input-control"
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cadSenhaConf">Confirmar Senha *</label>
            <input
              type="password"
              id="cadSenhaConf"
              className="input-control"
              placeholder="Repita sua senha"
              minLength={6}
              value={senhaConf}
              onChange={(e) => setSenhaConf(e.target.value)}
              required
            />
          </div>

          <div className="auth-remember" style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={concorda}
                onChange={(e) => setConcorda(e.target.checked)}
                required
              />{" "}
              Concordo com os Termos de Uso e Privacidade
            </label>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--full btn--lg"
            disabled={carregando}
          >
            {carregando ? "Cadastrando no Banco..." : "Criar Minha Conta no Banco"}
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
            Já possui uma conta?{" "}
            <Link
              href="/login"
              style={{ fontWeight: 700, color: "var(--clr-primary)" }}
            >
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
