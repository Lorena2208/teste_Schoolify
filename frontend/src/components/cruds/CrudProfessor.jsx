import { useEffect, useState } from "react";
import styles from "@/styles/Cruds.module.css";
import { faUserTie, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export default function CrudProfessor() {
    const [professores, setProfessores] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [turma, setTurma] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        fetchProfessores();
    }, []);

    const fetchProfessores = async () => {
        try {
            const response = await axios.get("http://localhost:8080/professores");
            setProfessores(response.data.content);
        } catch (error) {
            console.error("Erro ao buscar professores:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nome.trim() === "" || email.trim() === "" || telefone.trim() === "" || senha !== confirmarSenha || disciplina.trim() === "" || turma.trim() === "") {
            alert("Preencha todos os campos corretamente e confirme a senha.");
            return;
        }

        const novoProfessor = {
            nome,
            email,
            telefone,
            disciplina,
            turma
        };

        try {
            if (editandoId !== null) {
                await axios.put(`http://localhost:8080/professores/${editandoId}`, novoProfessor);
            } else {
                await axios.post("http://localhost:8080/professores", novoProfessor);
            }


        setNome("");
        setEmail("");
        setTelefone("");
        setSenha("");
        setConfirmarSenha("");
        setDisciplina("");
        setTurma("");
        setEditandoId(null);
        fetchProfessores();
        } catch (error) {
            console.error("Erro ao registrar professor:", error);
        }
    };

    const handleDelete = async(id) => {
        try {
            await axios.delete(`http://localhost:8080/professores/${id}`);
            setProfessores(professores.filter(professor => professor.id !== id));
        } catch (error) {
            console.error("Erro ao deletar professor:", error);
        }
    };

    const handleEdit = (id) => {
        const professor = professores.find((professor) => professor.id === id);
        setEditandoId(id);
        setNome(professor.nome);
        setEmail(professor.email);
        setTelefone(professor.telefone);
        setDisciplina(professor.disciplina);
        setTurma(professor.turma);
        setSenha("");
        setConfirmarSenha("");
    };

    return (
        <div className={styles.containerCruds}>
            <div className={styles.containerForm}>
                <FontAwesomeIcon icon={faUserTie} className={styles.iconForms} />
                <form onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h1>{editandoId !== null ? "Editar Professor" : "Registrar Professor"}</h1>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeProf">Nome</label>
                        <input
                            type="text"
                            id="nomeProf"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="tel"
                            id="telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmarSenha">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="disciplina">Disciplina</label>
                        <select
                            id="disciplina"
                            value={disciplina}
                            onChange={(e) => setDisciplina(e.target.value)}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="História">História</option>
                            <option value="Geografia">Geografia</option>
                            <option value="Matemática">Matemática</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="turma">Turma</label>
                        <select
                            id="turma"
                            value={turma}
                            onChange={(e) => setTurma(e.target.value)}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="1º ano">1º ano</option>
                            <option value="2º ano">2º ano</option>
                            <option value="3º ano">3º ano</option>
                        </select>
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {editandoId !== null ? "Salvar Alterações" : "Registrar"}
                    </button>
                </form>
            </div>
            <div className={styles.containerList}>
                <h1>Lista de Professores</h1>
                <ul className={styles.listaList}>
                    {professores.map((professor) => (
                        <li key={professor.id} className={styles.listaItem}>
                            <div>
                                <strong>Nome:</strong> {professor.nome} <br />
                                <strong>Email:</strong> {professor.email} <br />
                                <strong>Telefone:</strong> {professor.telefone} <br />
                                <strong>Disciplina:</strong> {professor.disciplina} <br />
                                <strong>Turma:</strong> {professor.turma}
                            </div>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(professor.id)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(professor.id)} className={styles.deleteButton}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


