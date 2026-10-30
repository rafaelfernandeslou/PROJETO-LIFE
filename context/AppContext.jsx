"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DB, initDB } from "@/lib/db";

const AppContext = createContext(null);
const CART_STORAGE_KEY = "lifehealth_carrinho";

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carrinho, setCarrinho] = useState([]);
  const [toast, setToast] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Inicialização no lado do cliente
  useEffect(() => {
    setIsMounted(true);
    initDB();

    // Carregar usuário logado
    const user = DB.obterUsuarioLogado();
    if (user) {
      setUsuario(user);
    }

    // Carregar carrinho
    try {
      const rawCart = localStorage.getItem(CART_STORAGE_KEY);
      if (rawCart) {
        setCarrinho(JSON.parse(rawCart));
      }
    } catch (e) {
      console.error("Erro ao carregar carrinho:", e);
    }

    // Ouvir alterações de autenticação
    const handleAuthChange = (e) => {
      setUsuario(e.detail || null);
    };

    window.addEventListener("lifehealth_auth_change", handleAuthChange);
    return () => {
      window.removeEventListener("lifehealth_auth_change", handleAuthChange);
    };
  }, []);

  // Mostrar toast
  const mostrarToast = (mensagem, tipo = "info", duracao = 3500) => {
    setToast({ mensagem, tipo });
    setTimeout(() => {
      setToast((atual) => (atual?.mensagem === mensagem ? null : atual));
    }, duracao);
  };

  // Funções de Autenticação
  const login = (email, senha) => {
    const res = DB.autenticar(email, senha);
    if (res.sucesso) {
      setUsuario(res.usuario);
      mostrarToast(`👋 Bem-vindo(a) de volta, ${res.usuario.nome.split(" ")[0]}!`, "success");
    } else {
      mostrarToast(res.mensagem, "error");
    }
    return res;
  };

  const logout = () => {
    DB.fazerLogout();
    setUsuario(null);
    mostrarToast("👋 Sessão encerrada com sucesso!", "info");
  };

  const cadastrar = (dados) => {
    const res = DB.cadastrarUsuario(dados);
    if (res.sucesso) {
      setUsuario(res.usuario);
      mostrarToast(`🎉 Cadastro realizado com sucesso! Olá, ${res.usuario.nome.split(" ")[0]}!`, "success");
    } else {
      mostrarToast(res.mensagem, "error");
    }
    return res;
  };

  // Funções do Carrinho
  const salvarCarrinhoStorage = (novosItens) => {
    setCarrinho(novosItens);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(novosItens));
    } catch (e) {
      console.error("Erro ao salvar carrinho:", e);
    }
  };

  const adicionarAoCarrinho = (produto) => {
    const atual = [...carrinho];
    const index = atual.findIndex((item) => item.nome === produto.nome);

    if (index !== -1) {
      atual[index].quantidade += 1;
    } else {
      atual.push({
        id: produto.id,
        nome: produto.nome,
        preco: Number(produto.preco),
        icone: produto.icone || "🛍️",
        quantidade: 1,
      });
    }

    salvarCarrinhoStorage(atual);
    mostrarToast(`🛒 "${produto.nome}" adicionado ao carrinho!`, "success");
  };

  const removerDoCarrinho = (index) => {
    const atual = [...carrinho];
    const removido = atual.splice(index, 1);
    salvarCarrinhoStorage(atual);
    if (removido[0]) {
      mostrarToast(`Item "${removido[0].nome}" removido do carrinho.`, "info");
    }
  };

  const alterarQuantidade = (index, delta) => {
    const atual = [...carrinho];
    if (atual[index]) {
      atual[index].quantidade += delta;
      if (atual[index].quantidade <= 0) {
        atual.splice(index, 1);
      }
    }
    salvarCarrinhoStorage(atual);
  };

  const limparCarrinho = () => {
    salvarCarrinhoStorage([]);
    mostrarToast("🗑️ Carrinho esvaziado.", "info");
  };

  const finalizarPedido = () => {
    if (carrinho.length === 0) {
      mostrarToast("Seu carrinho está vazio!", "warning");
      return null;
    }

    let total = 0;
    carrinho.forEach((item) => {
      total += item.preco * item.quantidade;
    });

    const novoPedido = {
      id: Date.now(),
      usuarioId: usuario ? usuario.id : null,
      clienteNome: usuario ? usuario.nome : "Cliente Visitante",
      clienteEmail: usuario ? usuario.email : "cliente@visitante.com",
      itens: carrinho,
      total: Number(total.toFixed(2)),
      status: "Aprovado",
      data: new Date().toISOString().split("T")[0],
      criadoEm: new Date().toISOString(),
    };

    DB.tabela("pedidos").inserir(novoPedido);
    limparCarrinho();
    mostrarToast(
      `🎉 Pedido #${novoPedido.id.toString().slice(-4)} gerado e salvo no Banco de Dados com sucesso!`,
      "success",
      5000
    );
    return novoPedido;
  };

  return (
    <AppContext.Provider
      value={{
        usuario,
        login,
        logout,
        cadastrar,
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        limparCarrinho,
        finalizarPedido,
        toast,
        mostrarToast,
        isMounted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro de um AppProvider");
  }
  return context;
}
