import styles from "@/styles/Cruds.module.css";
import { faBook, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Livros() {
    const [livros, setLivros] = useState([]);
    const [nomeLivro, setNomeLivro] = useState("");
    const [capa, setCapa] = useState("");
    const [linkLivro, setLinkLivro] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        fetchLivros();
    }, []);

    const fetchLivros = async () => {
        try {
            const response = await axios.get("http://localhost:8080/sugestoesLivros");
            setLivros(response.data.content);
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nomeLivro.trim() === "" || capa.trim() === "" || linkLivro.trim() === "") {
            alert("Preencha todos os campos corretamente");
            return;
        }

        const novoLivro = {
            nome: nomeLivro,
            capa,
            linkLivros: linkLivro
        };

        try {
            if (editandoId !== null) {
                await axios.put(`http://localhost:8080/sugestoesLivros/${editandoId}`, novoLivro);
                setEditandoId(null);
            } else {
                await axios.post("http://localhost:8080/sugestoesLivros", novoLivro);
            }

            setNomeLivro("");
            setCapa("");
            setLinkLivro("");
            setEditandoId(null);
            fetchLivros();
        } catch (error) {
            console.error("Erro ao salvar livro:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/sugestoesLivros/${id}`);
            setLivros(livros.filter((livro) => livro.id !== id));
        } catch (error) {
            console.error("Erro ao deletar livro:", error);
        }
    };

    const handleEdit = (id) => {
        const livro = livros.find(livro => livro.id === id);
        setEditandoId(id);
        setNomeLivro(livro.nome);
        setCapa(livro.capa);
        setLinkLivro(livro.link);
    };

    return (
        <div className={styles.containerCruds}>
            <div className={styles.containerForm}>
                <FontAwesomeIcon icon={faBook} className={styles.iconForms} />
                <form onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h1>{editandoId !== null ? "Editar Livro" : "Registrar Livro"}</h1>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeLivro">Nome do Livro</label>
                        <input
                            type="text"
                            id="nomeLivro"
                            name="nomeLivro"
                            placeholder="Digite o nome do livro..."
                            value={nomeLivro}
                            onChange={(e) => setNomeLivro(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="capa">Capa</label>
                        <input
                            type="url"
                            id="capa"
                            name="capa"
                            placeholder="Digite a URL da capa..."
                            value={capa}
                            onChange={(e) => setCapa(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="linkLivro">Link</label>
                        <input
                            type="url"
                            id="linkLivro"
                            name="linkLivro"
                            placeholder="Digite o link..."
                            value={linkLivro}
                            onChange={(e) => setLinkLivro(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {editandoId !== null ? "Salvar Alterações" : "Registrar"}
                    </button>
                </form>
            </div>
            <div className={styles.containerList}>
                <h1>Sugestões de Livros</h1>
                <ul className={styles.listaList}>
                    {livros.map((livro) => (
                        <li key={livro.id} className={styles.listaItem}>
                            <div>
                                <strong>Nome:</strong> {livro.nome} <br />
                                <strong>Capa:</strong> <br />
                                <img src={livro.capa} alt={`Capa de ${livro.nome}`} className={styles.imageList} /> <br />
                                <strong>Link:</strong> <a href={livro.linkLivros} target="_blank" rel="noopener noreferrer">{livro.linkLivros}</a> <br />
                            </div>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(livro.id)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(livro.id)} className={styles.deleteButton}>
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


