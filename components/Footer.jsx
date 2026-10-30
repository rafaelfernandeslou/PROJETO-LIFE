import React from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div style={{ marginBottom: "16px" }}>
            <Logo size="small" />
          </div>
          <p>
            Cuidado em saúde, consultas médicas e produtos de qualidade em uma
            única plataforma integrada com Banco de Dados persistente.
          </p>
        </div>

        <div className="footer__links">
          <h4>Navegação Rápida</h4>
          <ul>
            <li>
              <Link href="/">Início</Link>
            </li>
            <li>
              <Link href="/agendamento">Página de Agendamento</Link>
            </li>
            <li>
              <Link href="/meus-agendamentos">Consultar Meus Agendamentos</Link>
            </li>
            <li>
              <Link href="/medicos">Consultar Médicos</Link>
            </li>
            <li>
              <Link href="/produtos">Comprar Produtos</Link>
            </li>
            <li>
              <Link href="/login">Login de Acesso</Link>
            </li>
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Atendimento</h4>
          <p>📍 Av. Paulista, 1000 - São Paulo, SP</p>
          <p>📞 (11) 3333-3333</p>
          <p>📱 WhatsApp: (11) 99999-9999</p>
          <p>✉️ contato@lifehealth.com.br</p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>
            &copy; 2026 Life &amp; Health Web. Todos os direitos reservados.
            Design em Azul e Branco com Banco de Dados Integrado.
          </p>
        </div>
      </div>
    </footer>
  );
}
