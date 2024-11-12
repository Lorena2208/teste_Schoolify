import CrudEventos from "@/components/cruds/CrudEventos";
import Menu from "@/components/menu/Menu";

export default function Eventos() {
  return (
    <>
      <Menu />
      <div className="container_tela"	>
        <CrudEventos />
      </div>
    </>
  );
}