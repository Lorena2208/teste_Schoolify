export default function Botao({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      className={`${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
