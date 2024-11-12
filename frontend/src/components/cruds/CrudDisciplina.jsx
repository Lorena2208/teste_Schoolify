import styles from "@/styles/Cruds.module.css";
import { faScroll, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CrudDisciplina() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [nomeDisciplina, setNomeDisciplina] = useState("");
    const [imagemUrl, setImagemUrl] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        fetchDisciplina();
    }, []);

    const fetchDisciplina = async () => {
        try {
            const response = await axios.get("http://localhost:8080/disciplinas");
            setDisciplinas(response.data.content);
        } catch (error) {
            console.error("Erro ao buscar disciplinas:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nomeDisciplina.trim() === "" || imagemUrl.trim() === ""){
            alert("Preencha todos os campos corretamente.");
            return;
        }

        const novaDisciplina = {
            nome: nomeDisciplina, 
            imgUrl: imagemUrl
        };

        try {
            if (editandoId !== null) {  
                await axios.put(`http://localhost:8080/disciplinas/${editandoId}`, novaDisciplina);
            } else {    
                await axios.post("http://localhost:8080/disciplinas", novaDisciplina);
            }

        setNomeDisciplina("");
        setImagemUrl("");
        fetchDisciplina();
        } catch (error) {
            console.error("Erro ao salvar disciplina:", error);
        }
    };

    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:8080/disciplinas/${id}`);
            setDisciplinas(disciplinas.filter(disciplina => disciplina.id !== id));
        } catch (error) {
            console.error("Erro ao deletar disciplina:", error);
        }
    };

    const handleEdit = async (id) => {
        const disciplina = disciplinas.find(disciplina => disciplina.id === id);
        setEditandoId(id);
        setNomeDisciplina(disciplina.nome);
        setImagemUrl(disciplina.imgUrl);
    };

    return (
        <div className={styles.containerCruds}>
            <div className={styles.containerForm}>
                <FontAwesomeIcon icon={faScroll} className={styles.iconForms} />
                <form onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h1>{editandoId !== null ? "Editar Disciplina" : "Registrar Disciplina"}</h1>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeDisc">Disciplina</label>
                        <input
                            type="text"
                            id="nomeDisc"
                            name="nomeDisc"
                            placeholder="Digite o nome da disciplina..."
                            value={nomeDisciplina}
                            onChange={(e) => setNomeDisciplina(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="imagemUrl">URL da Imagem</label>
                        <input
                            type="text"
                            id="imagemUrl"
                            name="imagemUrl"
                            placeholder="Digite a URL da imagem..."
                            value={imagemUrl}
                            onChange={(e) => setImagemUrl(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {editandoId !== null ? "Salvar Alterações" : "Registrar"}
                    </button>
                </form>
            </div>
            <div className={styles.containerList}>
                <h1>Disciplinas</h1>
                <ul className={styles.listaList}>
                    {disciplinas.map((disciplina) => (
                        <li key={disciplina.id} className={styles.listaItem}>
                            <div>
                                <strong>Disciplina:</strong> {disciplina.nome} <br />
                                <img src={disciplina.imgUrl} alt={disciplina.nome} className={styles.imageList} />
                            </div>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(disciplina.id)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(disciplina.id)} className={styles.deleteButton}>
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

