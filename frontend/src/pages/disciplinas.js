import CrudDisciplina from "@/components/cruds/CrudDisciplina";
import Menu from "@/components/menu/Menu";

export default function Disciplinas() {

  return (
    <>
      <Menu />
      <div className="container_tela"	>
        <CrudDisciplina />
      </div>
    </>
  );
}
