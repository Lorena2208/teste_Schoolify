import styles from "@/styles/Cruds.module.css";
import { faGraduationCap, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Turmas() {
    const [turmas, setTurmas] = useState([]);
    const [descricao, setDescricao] = useState("");
    const [serie, setSerie] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        fetchTurma();
    }, []);

    const fetchTurma = async () => {
        try{
            const response = await axios.get("http://localhost:8080/turmas");
            setTurmas(response.data.content);
        } catch (error){
            console.error("Erro ao buscar turmas:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (descricao.trim() === "" || serie.trim() === ""){
            alert("Preencha todos os campos corretamente.");
            return;
        } 

        const novaTurma = {
            descricao,
            serie
        };

        try{
            if (editandoId !== null){
                await axios.put(`http://localhost:8080/turmas/${editandoId}`, novaTurma);
            } else{
                await axios.post("http://localhost:8080/turmas", novaTurma);
            }

            setDescricao("");
            setSerie("");
            setEditandoId(null);
            fetchTurma();
        } catch (error){
            console.error("Erro ao salvar turma:", error);
        }
    };

    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:8080/turmas/${id}`);
            setTurmas(turmas.filter(turma => turma.id !== id));
        } catch (error){
            console.error("Erro ao deletar usuário:", error);
        }
    };

    const handleEdit = (id) => {
        const turma = turmas.find(turma => turma.id === id);
        setEditandoId(id);
        setDescricao(turma.descricao);
        setSerie(turma.serie);
    };

    return (
        <div className={styles.containerCruds}>
            <div className={styles.containerForm}>
                <FontAwesomeIcon icon={faGraduationCap} className={styles.iconForms} />
                <form onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h1>{editandoId !== null ? "Editar Turma" : "Registrar Turma"}</h1>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="serie">Série</label>
                        <input
                            type="text"
                            id="serie"
                            placeholder="Digite a série..."
                            value={serie}
                            onChange={(e) => setSerie(e.target.value)}
                        />
                    </div>
                    <div className={styles.formDesc}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            placeholder="Digite a descrição aqui..."
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {editandoId !== null ? "Salvar Alterações" : "Registrar"}
                    </button>
                </form>
            </div>

            <div className={styles.containerList}>
                <h1>Turmas</h1>
                <ul className={styles.listaList}>
                    {turmas.map((turma) => (
                        <li key={turma.id} className={styles.listaItem}>
                            <div>
                                <strong>Série:</strong> {turma.serie} <br />
                                <strong>Turma:</strong> {turma.descricao}
                            </div>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(turma.id)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(turma.id)} className={styles.deleteButton}>
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