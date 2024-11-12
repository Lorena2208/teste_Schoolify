import CrudLivros from "@/components/cruds/CrudLivros";
import Menu from "@/components/menu/Menu";

export default function Livros() {
  return (
    <>
      <Menu />
      <div className="container_tela"	>
        <CrudLivros />
      </div>
    </>
  );
}
