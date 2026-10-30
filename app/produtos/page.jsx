"use client";

import React, { useState, useEffect } from "react";
import { DB } from "@/lib/db";
import { useApp } from "@/context/AppContext";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const {
    carrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    alterarQuantidade,
    limparCarrinho,
    finalizarPedido,
  } = useApp();

  const categorias = [
    "todos",
    "Suplementos",
    "Nutrição",
    "Vitaminas",
    "Saúde Cardiovascular",
    "Reabilitação & Fisioterapia",
    "Equipamentos Médicos",
  ];

  useEffect(() => {
    try {
      const lista = DB.tabela("produtos").listar();
      setProdutos(lista);
    } catch (e) {
      console.error("Erro ao listar produtos:", e);
    }
  }, []);

  const produtosFiltrados = produtos.filter((prod) => {
    if (categoriaAtiva === "todos") return true;
    return prod.categoria.toLowerCase() === categoriaAtiva.toLowerCase();
  });

  const totalCarrinho = carrinho.reduce(
    (sum, item) => sum + item.preco * item.quantidade,
    0
  );

  return (
    <section className="container section-padding">
      <div className="section-header">
        <span className="section-label">Loja de Saúde &amp; Bem-Estar</span>
        <h1 className="section-title">
          Comprar{" "}
          <span className="gradient-text">Produtos Life &amp; Health</span>
        </h1>
        <p className="section-subtitle">
          Suplementos de alta pureza, equipamentos médicos e produtos de
          fisioterapia integrados diretamente ao banco de dados.
        </p>
      </div>

      {/* Categorias */}
      <div className="filter-bar" style={{ marginBottom: "30px" }}>
        {categorias.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-pill ${categoriaAtiva === cat ? "active" : ""}`}
            onClick={() => setCategoriaAtiva(cat)}
          >
            {cat === "todos" ? "Todos os Produtos" : cat}
          </button>
        ))}
      </div>

      <div className="store-layout">
        {/* Grade de Produtos */}
        <div
          className="products-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            flex: 1,
          }}
        >
          {produtosFiltrados.map((prod) => (
            <div
              key={prod.id}
              className="card-box shadow-sm"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "20px",
                position: "relative",
                border: "1px solid var(--clr-border-light)",
              }}
            >
              <div>
                {/* Badge de desconto */}
                {prod.desconto && (
                  <span
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      background: "var(--clr-danger)",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    {prod.desconto}
                  </span>
                )}

                {/* Ícone / Imagem */}
                <div
                  style={{
                    height: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "4.5rem",
                    background: "var(--clr-surface-2)",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: "16px",
                  }}
                >
                  {prod.icone || "🛍️"}
                </div>

                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--clr-primary)",
                    letterSpacing: "0.5px",
                    marginBottom: "4px",
                  }}
                >
                  {prod.categoria}
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--clr-dark-2)",
                    lineHeight: 1.3,
                    marginBottom: "8px",
                  }}
                >
                  {prod.nome}
                </h3>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--clr-text-muted)",
                    lineHeight: 1.4,
                    marginBottom: "12px",
                  }}
                >
                  {prod.descricao}
                </p>

                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "#d97706",
                    fontWeight: 600,
                    marginBottom: "16px",
                  }}
                >
                  ⭐ {prod.avaliacao} ({prod.totalAvaliacoes} avaliações)
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      color: "var(--clr-primary-dark)",
                    }}
                  >
                    R$ {prod.preco.toFixed(2).replace(".", ",")}
                  </span>
                  {prod.precoOriginal && (
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--clr-text-muted)",
                        textDecoration: "line-through",
                      }}
                    >
                      R$ {prod.precoOriginal.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn--primary btn--full btn--sm"
                  onClick={() => adicionarAoCarrinho(prod)}
                >
                  🛒 Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Carrinho Lateral */}
        <div
          className="cart-sidebar card-box shadow-blue"
          style={{
            alignSelf: "start",
            position: "sticky",
            top: "96px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.2rem" }}>🛒 Meu Carrinho</h3>
            {carrinho.length > 0 && (
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--clr-primary)",
                  fontWeight: 600,
                }}
              >
                {carrinho.reduce((s, i) => s + i.quantidade, 0)} itens
              </span>
            )}
          </div>

          <div
            id="carrinhoItens"
            className="cart-items-list"
            style={{
              margin: "10px 0",
              maxHeight: "340px",
              overflowY: "auto",
            }}
          >
            {carrinho.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px 10px",
                  color: "var(--clr-text-muted)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🛒</div>
                <p>Seu carrinho está vazio.</p>
              </div>
            ) : (
              carrinho.map((item, index) => {
                const subtotal = item.preco * item.quantidade;
                return (
                  <div
                    key={index}
                    className="cart-item-row"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--clr-border-light)",
                    }}
                  >
                    <div style={{ flex: 1, paddingRight: "10px" }}>
                      <strong
                        style={{
                          fontSize: "0.88rem",
                          color: "var(--clr-dark-2)",
                          display: "block",
                        }}
                      >
                        {item.nome}
                      </strong>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--clr-text-muted)",
                          marginTop: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>R$ {item.preco.toFixed(2).replace(".", ",")}</span>
                        <span>&times;</span>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            background: "var(--clr-surface-2)",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => alterarQuantidade(index, -1)}
                            style={{
                              padding: "2px 8px",
                              fontWeight: "bold",
                              color: "var(--clr-text)",
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontWeight: 700, padding: "0 6px" }}>
                            {item.quantidade}
                          </span>
                          <button
                            type="button"
                            onClick={() => alterarQuantidade(index, 1)}
                            style={{
                              padding: "2px 8px",
                              fontWeight: "bold",
                              color: "var(--clr-text)",
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          color: "var(--clr-dark-2)",
                          fontSize: "0.95rem",
                        }}
                      >
                        R$ {subtotal.toFixed(2).replace(".", ",")}
                      </span>
                      <button
                        type="button"
                        onClick={() => removerDoCarrinho(index)}
                        title="Remover"
                        style={{
                          color: "var(--clr-danger)",
                          fontSize: "1.2rem",
                          lineHeight: 1,
                          padding: "2px",
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div
            className="cart-total-box"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
              borderTop: "2px solid var(--clr-primary-light)",
              fontSize: "1.05rem",
            }}
          >
            <span>Total do Pedido:</span>
            <strong
              id="carrinhoTotal"
              style={{
                color: "var(--clr-primary-dark)",
                fontSize: "1.35rem",
              }}
            >
              R$ {totalCarrinho.toFixed(2).replace(".", ",")}
            </strong>
          </div>

          <button
            type="button"
            id="btnFinalizarCompra"
            className="btn btn--primary btn--full"
            disabled={carrinho.length === 0}
            onClick={finalizarPedido}
          >
            Finalizar e Gravar Pedido no Banco
          </button>

          {carrinho.length > 0 && (
            <button
              type="button"
              className="btn btn--outline btn--full btn--sm"
              style={{ marginTop: "10px" }}
              onClick={limparCarrinho}
            >
              Limpar Carrinho
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
