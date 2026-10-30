"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const { usuario, logout, carrinho, isMounted } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItensCarrinho = carrinho.reduce((sum, item) => sum + item.quantidade, 0);

  const links = [
    { href: "/", label: "Início" },
    { href: "/agendamento", label: "Agendamento" },
    { href: "/meus-agendamentos", label: "Meus Agendamentos" },
    { href: "/medicos", label: "Consultar Médicos" },
    {
      href: "/produtos",
      label: "Comprar Produtos",
      badge: totalItensCarrinho > 0 ? totalItensCarrinho : null,
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link href="/" onClick={closeMobileMenu}>
          <Logo />
        </Link>

        {/* Links de navegação */}
        <ul className={`nav__links ${mobileMenuOpen ? "open" : ""}`} id="navLinks">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav__link ${isActive ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                  {link.badge && <span className="nav__badge">{link.badge}</span>}
                </Link>
              </li>
            );
          })}

          {/* Autenticação se não logado */}
          {isMounted && !usuario && (
            <li id="navAuthItem">
              <Link
                href="/login"
                className={`nav__link ${pathname === "/login" ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Ações da direita: Usuário Logado + Botão Agendar + Burger */}
        <div className="nav__actions">
          {isMounted && usuario && (
            <div id="navUserArea">
              <div className="nav__user-status" title={usuario.email}>
                <span>👤</span>
                <span className="nav__user-name">{usuario.nome.split(" ")[0]}</span>
                <button
                  type="button"
                  className="nav__btn-logout"
                  onClick={logout}
                  title="Sair da Conta"
                >
                  Sair
                </button>
              </div>
            </div>
          )}

          <Link href="/agendamento" className="btn btn--primary btn--sm" onClick={closeMobileMenu}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ width: "16px", height: "16px" }}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Agendar Consulta
          </Link>

          {/* Botão Mobile Burger */}
          <button
            className={`nav__burger ${mobileMenuOpen ? "open" : ""}`}
            id="navBurger"
            aria-label="Menu Mobile"
            onClick={toggleMobileMenu}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
