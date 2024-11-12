import styles from '@/styles/Atividade.module.css';
import Botao from '@/components/botoes/Botao'
import { useState } from 'react';

export default function AddComentarios({onAddComentario}){
    
    const [novoComentario, setNovoComentario] = useState("");

    const handleAddComentario = (e) => {
        e.preventDefault();
        if (novoComentario.trim()){
            onAddComentario(novoComentario);
            setNovoComentario("");
        }
    };

    return(
        <div className={styles.containerComentario}>
            <h2>Comentários</h2>

            <div className={styles.containerForm}>
                <div className={styles.containerComentario}>
                    <textarea rows= '4' placeholder='Digite seu comentário' 
                     value={novoComentario} onChange={(e) => setNovoComentario(e.target.value)} required></textarea>
                    <Botao className={styles.botaoComentario} type='button' onClick={handleAddComentario}>Enviar</Botao>
                </div>
            </div>
        </div>
    )
}