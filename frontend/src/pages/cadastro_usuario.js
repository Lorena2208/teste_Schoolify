import Menu from "@/components/menu/Menu";
import CrudsUsuario from "@/components/cruds/CrudUsuario";

export default function CrudUsuario() {
    return (
        <>
            <Menu />
            <div className="container_tela">
                <CrudsUsuario />
            </div>
        </>
    );
}