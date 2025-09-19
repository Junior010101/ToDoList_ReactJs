import { useState, useEffect } from "react";
import "../styles/App.css";

function App() {
  const [tarefa, setTarefa] = useState("");
  const [categoria, setCategoria] = useState("");
  const [filtro, setFiltro] = useState("Tudo");
  const [tarefas, setTarefas] = useState([]);

  // carregar do localStorage
  useEffect(() => {
    const salvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    setTarefas(salvas);
  }, []);

  // salvar no localStorage
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (!tarefa.trim() || !categoria) return;
    const nova = {
      id: Date.now(),
      texto: tarefa,
      categoria,
      concluida: false,
    };
    setTarefas([...tarefas, nova]);
    setTarefa("");
    setCategoria("");
  };

  const toggleConcluir = (id) => {
    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  };

  const deletarTarefa = (id) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  const deletarConcluidas = () => {
    setTarefas(tarefas.filter((t) => !t.concluida));
  };

  const deletarTodas = () => {
    setTarefas([]);
  };

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === "Concluídas") return t.concluida;
    if (filtro === "Pendentes") return !t.concluida;
    return true;
  });

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">To do List</h2>

      {/* Formulário */}
      <form
        onSubmit={adicionarTarefa}
        className="d-flex flex-column gap-2 mb-3"
      >
        <div className="input-group mb-3">
          <div className="bg-primary ps-3 pe-2 align-center">
            <i className="bi bi-bookmarks"/>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Nova tarefa"
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
            required
          />
        </div>

        <select
          className="form-select"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
        <option value="" disabled>Selecione uma categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Estudos">Estudos</option>
        </select>

      <button type="submit" className="btn btn-success">Adicionar nova tarefa</button>
      </form>

      {/* Filtro */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span>
          Total: {tarefas.length} | Concluídas:{" "}
          {tarefas.filter((t) => t.concluida).length}
        </span>
        <select
          className="form-select w-auto"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="Tudo">Tudo</option>
          <option value="Concluídas">Concluídas</option>
          <option value="Pendentes">Pendentes</option>
        </select>
      </div>

      {/* Lista de tarefas */}
      <ul className="list-group mb-3">
        {tarefasFiltradas.map((t) => (
          <li
            key={t.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={t.concluida}
                onChange={() => toggleConcluir(t.id)}
              />
              <span
                className={`${
                  t.concluida ? "text-decoration-line-through text-muted" : ""
                }`}
              >
                {t.texto} <span className="badge bg-secondary">{t.categoria}</span>
              </span>
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deletarTarefa(t.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>

      {/* Botões de exclusão */}
      <div className="d-flex gap-2">
        <button className="btn btn-warning flex-fill" onClick={deletarConcluidas}>
          <i className="bi bi-check2-circle"></i> Deletar concluídas
        </button>
        <button className="btn btn-danger flex-fill" onClick={deletarTodas}>
          <i className="bi bi-x-circle"></i> Deletar todas
        </button>
      </div>
    </div>
  );
}

export default App;
