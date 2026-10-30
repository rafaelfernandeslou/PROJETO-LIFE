"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DB } from "@/lib/db";
import { useApp } from "@/context/AppContext";

function AgendamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { usuario, mostrarToast } = useApp();

  const [medicos, setMedicos] = useState([]);
  const [medicosFiltrados, setMedicosFiltrados] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    especialidade: "",
    medicoId: "",
    medicoNome: "",
    modalidade: "Presencial",
    data: "",
    horario: "",
    observacoes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar dados do banco
  useEffect(() => {
    try {
      const listaMedicos = DB.tabela("medicos").listar();
      setMedicos(listaMedicos);
      setMedicosFiltrados(listaMedicos);

      const listaEsp = Array.from(new Set(listaMedicos.map((m) => m.especialidade)));
      setEspecialidades(listaEsp);

      // Verificar se veio query param de médico ou especialidade
      const medicoIdParam = searchParams.get("medicoId");
      const espParam = searchParams.get("especialidade");

      if (medicoIdParam) {
        const med = listaMedicos.find((m) => String(m.id) === String(medicoIdParam));
        if (med) {
          setFormData((prev) => ({
            ...prev,
            especialidade: med.especialidade,
            medicoId: med.id,
            medicoNome: med.nome,
          }));
          setMedicosFiltrados(listaMedicos.filter((m) => m.especialidade === med.especialidade));
        }
      } else if (espParam) {
        setFormData((prev) => ({ ...prev, especialidade: espParam }));
        setMedicosFiltrados(listaMedicos.filter((m) => m.especialidade === espParam));
      }
    } catch (e) {
      console.error("Erro ao inicializar dados de agendamento:", e);
    }
  }, [searchParams]);

  // Se o usuário estiver logado, auto-preencher os dados
  useEffect(() => {
    if (usuario) {
      setFormData((prev) => ({
        ...prev,
        nome: prev.nome || usuario.nome || "",
        email: prev.email || usuario.email || "",
        telefone: prev.telefone || usuario.telefone || "",
      }));
    }
  }, [usuario]);

  // Manipular mudança de especialidade
  const handleEspecialidadeChange = (esp) => {
    const filtrados = esp
      ? medicos.filter((m) => m.especialidade.toLowerCase() === esp.toLowerCase())
      : medicos;

    setMedicosFiltrados(filtrados);
    setFormData((prev) => ({
      ...prev,
      especialidade: esp,
      medicoId: "",
      medicoNome: "",
    }));
  };

  // Manipular mudança de médico
  const handleMedicoChange = (medId) => {
    const med = medicos.find((m) => String(m.id) === String(medId));
    setFormData((prev) => ({
      ...prev,
      medicoId: medId,
      medicoNome: med ? med.nome : "",
      especialidade: med ? med.especialidade : prev.especialidade,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim() || !formData.telefone.trim()) {
      mostrarToast("Por favor, preencha todos os campos obrigatórios (*)", "warning");
      return;
    }

    if (!formData.medicoId) {
      mostrarToast("Por favor, selecione um médico / especialista.", "warning");
      return;
    }

    if (!formData.data || !formData.horario) {
      mostrarToast("Por favor, selecione a data e o horário desejado.", "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      const novoAgendamento = {
        id: Date.now(),
        pacienteNome: formData.nome.trim(),
        pacienteEmail: formData.email.trim(),
        pacienteTelefone: formData.telefone.trim(),
        medicoId: Number(formData.medicoId),
        medicoNome: formData.medicoNome,
        especialidade: formData.especialidade,
        modalidade: formData.modalidade,
        data: formData.data,
        horario: formData.horario,
        observacoes: formData.observacoes.trim(),
        status: "Confirmado",
        criadoEm: new Date().toISOString(),
      };

      DB.tabela("agendamentos").inserir(novoAgendamento);

      mostrarToast(
        `✅ Consulta com ${formData.medicoNome} agendada com sucesso no Banco de Dados!`,
        "success",
        4000
      );

      setTimeout(() => {
        router.push("/meus-agendamentos");
      }, 1200);
    } catch (err) {
      console.error("Erro ao salvar agendamento:", err);
      mostrarToast("Erro ao processar agendamento. Tente novamente.", "error");
      setIsSubmitting(false);
    }
  };

  const hoje = new Date().toISOString().split("T")[0];

  return (
    <section className="container section-padding">
      <div className="section-header">
        <span className="section-label">Agendamento Online</span>
        <h1 className="section-title">
          Agendar Nova <span className="gradient-text">Consulta</span>
        </h1>
        <p className="section-subtitle">
          Preencha os dados abaixo para reservar sua consulta. Os dados são
          salvos diretamente em nosso banco de dados em tempo real.
        </p>
      </div>

      <div className="booking-grid-layout">
        {/* Formulário */}
        <div className="card-box shadow-blue">
          <h3 className="card-box__title">Dados do Agendamento</h3>
          <form id="formAgendamento" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="agendaNome">Nome Completo *</label>
                <input
                  type="text"
                  id="agendaNome"
                  className="input-control"
                  placeholder="Digite seu nome completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="agendaTelefone">Telefone / WhatsApp *</label>
                <input
                  type="tel"
                  id="agendaTelefone"
                  className="input-control"
                  placeholder="(11) 99999-9999"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="agendaEmail">E-mail *</label>
                <input
                  type="email"
                  id="agendaEmail"
                  className="input-control"
                  placeholder="seuemail@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="agendaEspecialidade">Especialidade Desejada *</label>
                <select
                  id="agendaEspecialidade"
                  className="input-control"
                  value={formData.especialidade}
                  onChange={(e) => handleEspecialidadeChange(e.target.value)}
                  required
                >
                  <option value="">Selecione uma especialidade...</option>
                  {especialidades.map((esp) => (
                    <option key={esp} value={esp}>
                      {esp}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="agendaMedico">Médico / Especialista *</label>
                <select
                  id="agendaMedico"
                  className="input-control"
                  value={formData.medicoId}
                  onChange={(e) => handleMedicoChange(e.target.value)}
                  required
                >
                  <option value="">Selecione o profissional...</option>
                  {medicosFiltrados.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nome} — {m.especialidade} (R$ {m.valorConsulta},00)
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="agendaModalidade">Modalidade de Atendimento</label>
                <select
                  id="agendaModalidade"
                  className="input-control"
                  value={formData.modalidade}
                  onChange={(e) => setFormData({ ...formData, modalidade: e.target.value })}
                >
                  <option value="Presencial">Presencial (Clínica Life &amp; Health)</option>
                  <option value="Online">Telemedicina (Online)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="agendaData">Data da Consulta *</label>
                <input
                  type="date"
                  id="agendaData"
                  className="input-control"
                  min={hoje}
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="agendaHorario">Horário *</label>
                <select
                  id="agendaHorario"
                  className="input-control"
                  value={formData.horario}
                  onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                  required
                >
                  <option value="">Escolha um horário...</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="agendaObs">Observações ou Queixa Principal</label>
              <textarea
                id="agendaObs"
                className="input-control"
                rows={3}
                placeholder="Descreva brevemente o motivo da consulta ou sintomas..."
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn--primary btn--lg btn--full"
                disabled={isSubmitting}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {isSubmitting ? "Gravando no Banco de Dados..." : "Confirmar e Salvar no Banco de Dados"}
              </button>
            </div>
          </form>
        </div>

        {/* Informações de Apoio */}
        <div className="sidebar-info">
          <div className="card-box bg-blue-subtle">
            <h3>💡 Vantagens do Agendamento Online</h3>
            <ul className="blue-bullet-list">
              <li>Lembrete automático via WhatsApp e E-mail</li>
              <li>Sem espera telefônica ou burocracia</li>
              <li>Visualização imediata na aba "Meus Agendamentos"</li>
              <li>Cancelamento ou reagendamento fácil com 1 clique</li>
              <li>Gravado com segurança no Banco de Dados</li>
            </ul>
          </div>

          <div className="card-box" style={{ marginTop: "20px" }}>
            <h3>📞 Precisa de Ajuda?</h3>
            <p>
              Nossa central de suporte está pronta para te atender de Segunda
              a Sábado das 07h às 20h.
            </p>
            <div style={{ marginTop: "15px" }}>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
                className="btn btn--outline btn--full"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AgendamentoPage() {
  return (
    <Suspense fallback={<div className="container section-padding">Carregando agendamento...</div>}>
      <AgendamentoContent />
    </Suspense>
  );
}
