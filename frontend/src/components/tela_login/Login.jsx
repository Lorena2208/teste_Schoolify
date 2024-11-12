import Botao from "@/components/botoes/Botao";
import styles from "@/styles/Login.module.css";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login({ onRecoverPassword }) { 
  
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // async function login() {
        //    users = await api.get('/usuarios');
        // }

        // Lógica de login (validação, autenticação, etc.)
        router.push("/");
    };

    return (
        <div>
            <h2>Bem vindo</h2>

            <form onSubmit={handleLogin}>
                <div className={styles.form_group}>
                    <label htmlFor="email">E-mail de Usuário</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Digite seu email"
                        required
                    />
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="password">Senha</label>
                    <div className={styles.password_wrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="********"
                            required
                        />
                        <span className={styles.icon} onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <div className={styles.link_Recuperar}>
                        <a href="#" onClick={onRecoverPassword}>Esqueceu a senha?</a>
                    </div>
                </div>

                <Botao className={styles.botao_login} type="submit">
                    Entrar
                </Botao>
            </form>
        </div>
    );
}
