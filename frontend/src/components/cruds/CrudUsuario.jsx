import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Cruds.module.css";
import { faUserGraduate, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CrudUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [nomeResponsavel, setNomeResponsavel] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [turma, setTurma] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        fetchUsuario();
    }, []);

    const fetchUsuario = async () => {
        try {
            const response = await axios.get("http://localhost:8080/usuarios");
            setUsuarios(response.data.content);
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nomeResponsavel.trim() === "" || email.trim() === "" || telefone.trim() === "" || senha !== confirmarSenha || turma.trim() === "") {
            alert("Preencha todos os campos corretamente e confirme a senha.");
            return;
        }

        const novoUsuario = {
            nome: nomeResponsavel,
            email,
            telefone,
            turma,
            senha
        };

        try {
            if (editandoId !== null) {
                await axios.put(`http://localhost:8080/usuarios/${editandoId}`, novoUsuario);
            } else {
                await axios.post("http://localhost:8080/usuarios", novoUsuario);
            }

            setNomeResponsavel("");
            setEmail("");
            setTelefone("");
            setSenha("");
            setConfirmarSenha("");
            setTurma("");
            setEditandoId(null);
            fetchUsuario();
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/usuarios/${id}`);
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
        }
    };

    const handleEdit = (id) => {
        const usuario = usuarios.find(usuario => usuario.id === id);
        setEditandoId(id);
        setNomeResponsavel(usuario.nome);
        setEmail(usuario.email);
        setTelefone(usuario.telefone);
        setTurma(usuario.turma);
        setSenha("");
        setConfirmarSenha("");
    };

    return (
        <div className={styles.containerCruds}>
            <div className={styles.containerForm}>
                <FontAwesomeIcon icon={faUserGraduate} className={styles.iconForms} />
                <form onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h1>{editandoId !== null ? "Editar Usuário" : "Registrar Usuário"}</h1>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeResponsavel">Nome Responsável</label>
                        <input
                            type="text"
                            id="nomeResponsavel"
                            value={nomeResponsavel}
                            onChange={(e) => setNomeResponsavel(e.target.value)}
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
                <h1>Lista de Usuários</h1>
                <ul className={styles.listaList}>
                    {usuarios.map((usuario) => (
                        <li key={usuario.id} className={styles.listaItem}>
                            <div>
                                <strong>Nome:</strong> {usuario.nome} <br />
                                <strong>Email:</strong> {usuario.email} <br />
                                <strong>Telefone:</strong> {usuario.telefone} <br />
                                <strong>Turma:</strong> {usuario.turma}
                            </div>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(usuario.id)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(usuario.id)} className={styles.deleteButton}>
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
