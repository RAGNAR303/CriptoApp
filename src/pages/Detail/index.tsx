import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CoinProps } from "../../interfaces/interfaces";
import { BiLogoBitcoin } from "react-icons/bi";
import { getIcon } from "../../utils/getImages";
import {
  formatedPrice,
  formatedPriceCompact,
} from "../../utils/formatedNumber";
import { Button } from "../../components/Button";
import { GoHomeFill } from "react-icons/go";
import { api } from "../../services/api";

interface RenponseData {
  data: CoinProps;
}

export function Details() {
  const [coin, setCoin] = useState<CoinProps>();
  const [loading, setLoading] = useState(true);
  const { cripto } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDetails() {
      try {
        const {
          data: { data },
        } = await api.get<RenponseData>(`assets/${cripto}`);

        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    loadDetails();
  }, [cripto, navigate]);

  if (loading || !coin) {
    return (
      <div className="flex items-center justify-center flex-col h-full">
        <BiLogoBitcoin className="animate-bounce text-blue-500 text-5xl " />
        <h1 className="text-3xl text-white">Carregando moeda....</h1>
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col justify-between items-center gap-10 p-2.5 h-full">
      <h1 className="text-5xl font-extrabold">
        {coin?.name} | <span>{coin?.symbol}</span>{" "}
      </h1>
      <section
        data-aos="flip-up"
        className="flex justify-between items-center gap-3 max-w-3xl w-full md:max-w-xl bg-gray-600/35  cursor-pointer text-gray-300  p-5 font-bold rounded-3xl border border-gray-500"
      >
        <div className="flex flex-col items-center bg-blue-gradient p-2.5 rounded-md">
          <p className="text-3xl md:text-5xl">Rank </p>
          <h2 className="text-5xl md:text-7xl">{coin?.rank}º </h2>
        </div>
        <div className="w-full flex flex-col justify-center items-center md:flex-row">
          <img
            className="w-30 md:w-40 object-cover "
            src={getIcon(coin?.symbol)}
            alt={coin?.name}
          />
          <ul className="text-start md:text-2xl">
            <li>Preço: {formatedPrice(coin?.priceUsd)}</li>
            <li>Mercado: {formatedPriceCompact(coin?.marketCapUsd)}</li>
            <li>Volume: {formatedPriceCompact(coin?.volumeUsd24Hr)}</li>
            <li>
              Mudança 24h:
              <span
                className={`ml-1
               ${
                 Number(coin?.changePercent24Hr) > 0
                   ? "text-green-500"
                   : "text-red-500"
               }
              `}
              >
                {Number(coin?.changePercent24Hr).toFixed(2)}
              </span>
            </li>
          </ul>
        </div>
      </section>
      <Button label="Inicio" to={"/"} icon={<GoHomeFill />} />
    </div>
  );
}
