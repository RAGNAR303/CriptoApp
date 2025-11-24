import { GoHomeFill } from "react-icons/go";
import { Button } from "../../components/Button";

export function Notfound() {
  return (
    <div className="text-white flex items-center justify-center flex-col">
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="text-3xl font-bold">Página não encontrada!</p>
      <Button label="Inicio" to={"/"} icon={<GoHomeFill />} />
    </div>
  );
}
