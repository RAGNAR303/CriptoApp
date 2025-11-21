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

interface RenponseData {
  data: CoinProps;
}

interface ErrorData {
  error: string;
}

type DataProps = RenponseData | ErrorData;

export function Details() {
  const [coin, setCoin] = useState<CoinProps>();
  const [loading, setLoading] = useState(true);
  const { cripto } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function coinDetails() {
      try {
        fetch(
          `https://rest.coincap.io/v3/assets/${cripto}?apiKey=6818c36d863027b35484b16c4063c19a8d8892f0a7c20bc01ddd9104ffec4541`
        )
          .then((response) => response.json())
          .then((data: DataProps) => {
            console.log(data);

            if ("error" in data) {
              navigate("/");
              return;
            }
            setCoin(data.data);
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    }

    coinDetails();
  }, [cripto, navigate]);

  console.log(coin);

  if (loading || !coin) {
    return (
      <div className="flex items-center justify-center flex-col">
        <BiLogoBitcoin className="animate-bounce text-blue-500 text-5xl " />
        <h1 className="text-3xl text-white">Carregando moeda....</h1>
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col justify-between items-center gap-10 p-2.5">
      <h1 className="text-5xl font-extrabold">
        {coin?.name} | <span>{coin?.symbol}</span>{" "}
      </h1>
      <section className="flex justify-between gap-3 max-w-3xl w-full md:max-w-xl bg-gray-600/35  cursor-pointer text-gray-300  p-5 font-bold rounded-3xl border border-gray-500">
        <img
          className="w-30 md:w-40 object-cover "
          src={getIcon(coin?.symbol)}
          alt={coin?.name}
        />
        <ul className="text-start md:text-2xl">
          <li>Rank: {coin?.rank}º </li>
          <li>Preço: {formatedPrice(coin?.priceUsd)}</li>
          <li>Mercado: {formatedPriceCompact(coin?.marketCapUsd)}</li>
          <li>Volume: {formatedPriceCompact(coin?.volumeUsd24Hr)}</li>
          <li>
            Mudança 24h:
            <span
              className={
                Number(coin?.changePercent24Hr) > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {Number(coin?.changePercent24Hr).toFixed(2)}
            </span>{" "}
          </li>
        </ul>
      </section>
      <Button label="Inicio" to={"/"} icon={<GoHomeFill />}/>
    </div>
  );
}
