import { useEffect, useState } from "react";
import styles from "@/styles/Cruds.module.css";
import { faCalendarPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export default function CrudEventos() {
    const [eventos, setEventos] = useState([]);
    const [nome, setNome] = useState("");
    const [data, setData] = useState("");  // Recebe data no formato 'yyyy-MM-dd'
    const [hora, setHora] = useState("");  // Recebe hora no formato 'HH:mm'
    const [imagemUrl, setImagemUrl] = useState("");
    const [descricao, setDescricao] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    // Fetch eventos from backend
    useEffect(() => {
        fetchEventos();
    }, []);

    const fetchEventos = async () => {
        try {
            const response = await axios.get("http://localhost:8080/eventos");
            setEventos(response.data.content);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        }
    };

    // Enviar os dados para o backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nome.trim() === "" || data.trim() === "" || hora.trim() === "" || descricao.trim() === "") {
            alert("Preencha todos os campos.");
            return;
        }

        const novoEvento = {
            nome,
            dataInicio: data,  // Envia a data no formato 'yyyy-MM-dd'
            horaInicio: hora,  // Envia a hora no formato 'HH:mm'
            imgUrl: imagemUrl,
            descricao
        };

        try {
            if (editandoId !== null) {
                await axios.put(`http://localhost:8080/eventos/${editandoId}`, novoEvento);
            } else {
                await axios.post("http://localhost:8080/eventos", novoEvento);
            }

            setEventos([...eventos]);
            setEditandoId(null);
            setNome("");
            setData("");
            setHora("");
            setImagemUrl("");
            setDescricao("");
            fetchEventos();
        } catch (error) {
            console.error("Erro ao salvar evento:", error);
        }
    };

    // Deletar evento
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/eventos/${id}`);
            setEventos(eventos.filter((evento) => evento.id !== id));
        } catch (error) {
            console.error("Erro ao deletar evento:", error);
        }
    };

    const handleEdit = (id) => {
        const evento = eventos.find((e) => e.id === id);
        setEditandoId(id);
        setNome(evento.nome);
        setData(evento.dataInicio);  // Recebe a data no formato 'yyyy-MM-dd'
        setHora(evento.horaInicio);  // Recebe a hora no formato 'HH:mm'
        setImagemUrl(evento.imgUrl);
        setDescricao(evento.descricao);
    };

    return (
        <div className={styles.containerCruds}>
            <div className={styles.containerForm}>
                <FontAwesomeIcon icon={faCalendarPlus} className={styles.iconForms} />
                <form onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <h1>{editandoId !== null ? "Editar Evento" : "Registrar Evento"}</h1>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeEvent">Nome</label>
                        <input
                            type="text"
                            id="nomeEvent"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="dataEvent">Data</label>
                        <input
                            type="date"
                            id="dataEvent"
                            value={data}  // Exibe a data no formato 'yyyy-MM-dd'
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="horaEvent">Hora</label>
                        <input
                            type="time"
                            id="horaEvent"
                            value={hora}  // Exibe a hora no formato 'HH:mm'
                            onChange={(e) => setHora(e.target.value)}
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
                    <button type="submit" className={styles.submitButton}>
                        {editandoId !== null ? "Salvar Alterações" : "Registrar"}
                    </button>
                </form>
            </div>
            <div className={styles.containerList}>
                <h1>Lista de Eventos</h1>
                <ul className={styles.listaList}>
                    {eventos.map((evento) => (
                        <li key={evento.id} className={styles.listaItem}>
                            <div>
                                <strong>Nome:</strong> {evento.nome} <br />
                                <strong>Data:</strong> {evento.dataInicio} <br /> {/* A data no formato 'yyyy-MM-dd' */}
                                <strong>Hora:</strong> {evento.horaInicio} <br /> {/* A hora no formato 'HH:mm' */}
                                <strong>Descrição:</strong> {evento.descricao}
                                <img src={evento.imgUrl} alt={evento.nome} className={styles.imageList} />
                            </div>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(evento.id)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(evento.id)} className={styles.deleteButton}>
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
