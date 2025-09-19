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
      tarefas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
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
    <div className="container position-absolute top-50 start-50 translate-middle">
      <h2 className="text-center mb-4 text-primary-emphasis">To do List</h2>

      {/* Formulário */}
      <form
        onSubmit={adicionarTarefa}
        className="d-flex flex-column gap-2 mb-3"
      >
        <div className="input-group mb-3 text-center">
          <label className="bg-info p-2 fs-3 rounded-start-2" htmlFor="tarefa">
            <i className="bi bi-bookmark-fill text-white px-2 py-2" />
          </label>
          <input
            type="text"
            id="tarefa"
            className="form-control bg-body-secondary"
            placeholder="Nova tarefa"
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
            required
          />
        </div>

        <div className="input-group mb-3 text-center">
          <select
            id="categoria"
            className="form-select bg-body-secondary "
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            <option value="Trabalho">Trabalho</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Estudos">Estudos</option>
          </select>
          <label htmlFor="categoria" className="bg-info p-2 fs-3 rounded-end">
            <i class="bi bi-columns-gap text-white p-2"></i>
          </label>
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-success py-3 px-5">
            Adicionar nova tarefa
          </button>
          <select
            className="form-select w-auto ms-auto bg-body-secondary"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="Tudo">Tudo</option>
            <option value="Concluídas">Concluídas</option>
            <option value="Pendentes">Pendentes</option>
          </select>
        </div>
      </form>

      {/* Filtro */}
      <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
        <span>
          Total: {tarefas.length} | Concluídas:{" "}
          {tarefas.filter((t) => t.concluida).length}
        </span>
      </div>
      {/* Lista de tarefas */}
      <ul className="list-group mb-3">
        {tarefasFiltradas.map((t) => (
          <label
            key={t.id}
            htmlFor={t.id}
            className="list-group-item d-flex justify-content-between align-items-center shadow border mb-4"
          >
            <div>
              <input
                type="checkbox"
                id={t.id}
                className="form-check-input me-2"
                checked={t.concluida}
                onChange={() => toggleConcluir(t.id)}
              />
              <span
                className={`${
                  t.concluida ? "text-decoration-line-through text-danger" : ""
                }`}
              >
                {t.texto}{" "}
                <span className="badge bg-secondary user-select-none">
                  {t.categoria}
                </span>
              </span>
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deletarTarefa(t.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </label>
        ))}
      </ul>

      {/* Botões de exclusão */}
      <div className="d-flex gap-2">
        <button
          className="btn btn-warning flex-fill"
          onClick={deletarConcluidas}
        >
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
