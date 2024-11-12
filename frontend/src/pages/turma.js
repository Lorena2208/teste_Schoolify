import CrudTurma from "@/components/cruds/CrudTurma";
import Menu from "@/components/menu/Menu";

export default function Turmas() {

  return (
    <>
      <Menu />
      <div className="container_tela"	>
        <CrudTurma />
      </div>
    </>
  );
}
