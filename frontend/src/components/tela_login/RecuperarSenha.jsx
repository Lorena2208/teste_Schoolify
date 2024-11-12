import styles from "@/styles/Login.module.css";
import Botao from "../botoes/Botao";

export default function RecuperarSenha({ onBackToLogin }) { 
  return (
    <div>
      <div className={styles.recuperar_senha}>
        <img src="/assets/icones/Icone_Cadeado.svg" alt="" />
        <h2>Problemas de Login?</h2>
        <p>Insira o seu email de cadastro e enviaremos um link para você voltar a acessar a sua conta.</p>
        <div className={styles.linha}></div>
      </div>

      <form>
        <div className={styles.form_group}>
          <label htmlFor="email">E-mail de Usuário</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Digite seu email ou nome de matricula"
            required
          />
        </div>
        
        <Botao className={styles.botao_recuperar} type="submit">Enviar Link</Botao>
        
        <Botao className={styles.botao_voltar} onClick={onBackToLogin}>Voltar ao Login</Botao>
      </form>  
    </div>
  );
}
