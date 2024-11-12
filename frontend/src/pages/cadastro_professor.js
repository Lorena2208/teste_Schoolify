import Menu from "@/components/menu/Menu";
import CrudsProfessor from "@/components/cruds/CrudProfessor";

export default function CrudProfessor() {

    return (
        <>
            <Menu />
            <div className="container_tela">
                <CrudsProfessor />
            </div>
        </>
    );
}