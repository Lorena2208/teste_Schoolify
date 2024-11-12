import Botao from "@/components/botoes/Botao";
import styles from "@/styles/Login.module.css";

export default function TermosServicos() {
  return (
    <div className={styles.containerTermos}>
      <div className={styles.termosHeader}>
        <Botao className={styles.botao_voltarTermos} onClick={() => window.history.back()}
        > Voltar </Botao>
        <h2>Termos de Uso e Política de Privacidade</h2>
      </div>

      <div className={styles.termosConteudo}>
        <p>
          <strong>1. Aceitação dos Termos</strong><br />
          Ao acessar e utilizar o Schoolify, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar a plataforma.
        </p>

        <p>
          <strong>2. Uso da Plataforma</strong><br />
          O Schoolify é destinado ao gerenciamento de informações escolares e comunicação entre pais e escolas. O usuário se compromete a utilizar a plataforma de forma legal e ética, não realizando atividades que possam prejudicar a integridade do sistema.
        </p>

        <p>
          <strong>3. Registro de Usuário</strong><br />
          Para utilizar certas funcionalidades, é necessário criar uma conta. O usuário é responsável por manter a confidencialidade de suas credenciais de login e por todas as atividades realizadas em sua conta.
        </p>

        <p>
          <strong>4. Coleta de Dados</strong><br />
          Coletamos informações pessoais necessárias para o funcionamento da plataforma, como nome, e-mail, telefone e informações acadêmicas. Esses dados são utilizados apenas para fins de operação e melhoria do serviço.
        </p>

        <p>
          <strong>5. Uso de Cookies</strong><br />
          O Schoolify utiliza cookies para aprimorar a experiência do usuário. Os cookies são pequenos arquivos armazenados no seu dispositivo que ajudam a analisar o tráfego e a personalizar o conteúdo.
        </p>

        <p>
          <strong>6. Compartilhamento de Informações</strong><br />
          Não vendemos, trocamos ou transferimos suas informações pessoais a terceiros, exceto quando exigido por lei ou com o seu consentimento.
        </p>

        <p>
          <strong>7. Segurança</strong><br />
          Empregamos medidas de segurança para proteger suas informações pessoais. No entanto, nenhum sistema é completamente seguro, e não podemos garantir a segurança absoluta dos dados.
        </p>

        <p>
          <strong>8. Alterações nos Termos</strong><br />
          Reservamo-nos o direito de modificar estes Termos de Uso e Política de Privacidade a qualquer momento. As alterações serão publicadas nesta página e entrarão em vigor imediatamente após a publicação.
        </p>

        <p>
          <strong>9. Contato</strong><br />
          Para dúvidas ou solicitações relacionadas a estes termos, entre em contato conosco pelo e-mail: suporte@schoolify.com.
        </p>
      </div>
    </div>
  );
}
