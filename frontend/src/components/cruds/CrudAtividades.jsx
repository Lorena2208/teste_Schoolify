import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Cruds.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Turmas from "./CrudTurma";

export default function CrudsAtividades() {
    const [atividades, setAtividades] = useState([]);
    const [turma, setTurma] = useState("");
    const [turmas, setTurmas] = useState([]);
    const [disciplina, setDisciplina] = useState("");
    const [disciplinas, setDisciplinas] = useState([]);
    const [dataInicio, setDataInicio] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [assunto, setAssunto] = useState("");
    const [descricao, setDescricao] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        fetchAtividades();
        fetchTurmas();
        fetchDisciplinas();
    }, []);

    const fetchAtividades = async () => {
        try {
            const response = await axios.get("http://localhost:8080/atividades");
            setAtividades(response.data.content);
        } catch (error) {
            console.error("Erro ao buscar atividades:", error);
        }
    };

    const fetchTurmas = async () => {
        try {
            const response = await axios.get("http://localhost:8080/turmas");
            setTurmas(response.data.content);
        } catch (error) {
            console.error("Erro ao buscar turmas:", error);
        }
    };

    const fetchDisciplinas = async () => {
        try {
            const response = await axios.get("http://localhost:8080/disciplinas");
            setDisciplinas(response.data.content);
        } catch (error) {
            console.error("Erro ao buscar disciplinas:", error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (disciplina.trim() === "" || dataInicio.trim() === "" || dataEntrega.trim() === "" || assunto.trim() === "" || descricao.trim() === "") {
            alert("Preencha todos os campos corretamente");
            return;
        }

        const novaAtividade = {
            disciplina: { id: disciplina },
            dataInicio,
            dataEntrega,
            titulo: assunto,
            descricao,
            turma: { id: turma }
        };

        try {
            if (editandoId !== null) {
                await axios.put(`http://localhost:8080/atividades/${editandoId}`, novaAtividade);
            } else {
                await axios.post("http://localhost:8080/atividades", novaAtividade);
            }

            setDisciplina("");
            setTurma("");
            setDataInicio("");
            setDataEntrega("");
            setAssunto("");
            setDescricao("");
            setEditandoId(null);
            fetchAtividades();
        } catch (error) {
            console.error("Erro ao salvar atividade:", error);
        }
    };

    const handleEdit = (atividade) => {

        setEditandoId(atividade.id);
        setTurma(atividade.turma ? atividade.turma.id : "");
        setDisciplina(atividade.disciplina ? atividade.disciplina.id : "");
        setDataInicio(atividade.dataInicio);
        setDataEntrega(atividade.dataEntrega);
        setAssunto(atividade.titulo);
        setDescricao(atividade.descricao);
    };

    const toggleDescription = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <div className={styles.atividadeContainer}>
            <div className={styles.atividadeForm}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h1>{editandoId ? "Editar Atividade" : "Registrar Atividade"}</h1>
                    </div>
                    <div className={styles.formGroupContainer}>
                        <div className={styles.formGroup}>
                            <label htmlFor="turma">Turma</label>
                            <select
                                id="turma"
                                value={turma}
                                onChange={(e) => setTurma(e.target.value)}
                                required
                            >
                                <option value="">Selecione uma turma</option>
                                {turmas.map((turma) => (
                                    <option key={turma.id} value={turma.id}>
                                        {turma.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="disciplina">Disciplina</label>
                            <select
                                id="disciplina"
                                value={disciplina}
                                onChange={(e) => setDisciplina(e.target.value)}
                                required
                            >
                                <option value="">Selecione uma disciplina</option>
                                {disciplinas.map((disciplina) => (
                                    <option key={disciplina.id} value={disciplina.id}>
                                        {disciplina.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="dataInicio">Data de início</label>
                            <input
                                type="date"
                                id="dataInicio"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="dataEntrega">Data de entrega</label>
                            <input
                                type="date"
                                id="dataEntrega"
                                value={dataEntrega}
                                onChange={(e) => setDataEntrega(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="assunto">Assunto</label>
                        <input
                            type="text"
                            id="assunto"
                            value={assunto}
                            onChange={(e) => setAssunto(e.target.value)}
                            placeholder="Digite o assunto aqui..."
                            required
                        />
                    </div>
                    <div className={styles.formDesc}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Digite a descrição aqui..."
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className={styles.confirmButton}>
                        {editandoId ? "Salvar Alterações" : "Confirmar"}
                    </button>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={() => {
                            setEditandoId(null);
                            setDisciplina("");
                            setDataInicio("");
                            setDataEntrega("");
                            setAssunto("");
                            setDescricao("");
                            //setTurma("");
                        }}
                    >
                        Cancelar
                    </button>
                </form>
            </div>
            <div className={styles.atividadeList}>
                <h1>Lista de Atividades</h1>
                {atividades.map((atividade) => (
                    <div key={atividade.id} className={styles.atividadeItem}>
                        <div className={styles.atividadeInfo}>
                            <p><strong>Turma:</strong> {atividade.turma}</p>
                            <p><strong>Disciplina:</strong> {atividade.disciplina}</p>
                            <p><strong>Data de Início:</strong> {atividade.dataInicio}</p>
                            <p><strong>Data de Entrega:</strong> {atividade.dataEntrega}</p>
                            <p><strong>Assunto:</strong> {atividade.titulo}</p>
                            <button className={styles.editarButton} onClick={() => handleEdit(atividade)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className={styles.toggleButton} onClick={() => toggleDescription(atividade.id)}>
                                <FontAwesomeIcon icon={expanded === atividade.id ? faChevronUp : faChevronDown} />
                            </button>
                        </div>
                        {expanded === atividade.id && (
                            <div className={styles.atividadeDescricao}>
                                <p><strong>Descrição:</strong> {atividade.descricao}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
