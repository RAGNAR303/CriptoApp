import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CoinProps, DataProps } from "../../interfaces/interfaces";
import {
  formatedPrice,
  formatedPriceCompact,
} from "../../utils/formatedNumber";
import { Button } from "../../components/Button";
import { getIcon } from "../../utils/getImages";
import { FaPlusCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BiLogoBitcoin } from "react-icons/bi";
import { api } from "../../services/api";

export function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getCoins() {
    const {
      data: { data },
    } = await api.get<DataProps>(`/assets?limit=10&offset=${offset}&`);

    const listCoins = [...coins, ...data];
    setCoins(listCoins);
    setLoading(false);
  }

  // async function getData() {
  //   fetch(
  //     `https://rest.coincap.io/v3/assets?limit=10&offset=${offset}=0&apiKey=6818c36d863027b35484b16c4063c19a8d8892f0a7c20bc01ddd9104ffec4541`
  //   )
  //     .then((response) => response.json())
  //     .then((data: DataProps) => {
  //       const dataCoins = data.data;

  //       const listCoins = [...coins, ...dataCoins];
  //       setCoins(listCoins);
  //       setLoading(false);
  //     });
  // }

  useEffect(() => {
    // getData();
    getCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  function handleCoinSearch(e: FormEvent) {
    e.preventDefault();

    if (input === "") return;

    navigate(`/detail/${input}`);
  }

  function showMoreCoin() {
    if (offset === 0) {
      setOffset(10);
      return;
    }

    setOffset(offset + 10);
  }

  if (loading || !coins) {
    return (
      <div className="flex items-center justify-center flex-col h-full">
        <BiLogoBitcoin className="animate-bounce text-blue-500 text-5xl " />
        <h1 className="text-3xl text-white">Carregando moeda....</h1>
      </div>
    );
  }

  return (
    <main className="flex justify-center items-center w-full flex-col">
      <form
        onSubmit={handleCoinSearch}
        className="flex flex-col justify-center w-full items-center"
      >
        <div
          className=" w-[85%] md:w-[60%] flex justify-center items-center 
         p-1 bg-gray-300 rounded-4xl overflow-hidden shadow-2xl "
        >
          <input
            className="w-full focus:outline-none  py-1 px-4 flex-10 font-bold "
            type="text"
            placeholder="Buscar nome da moeda..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            className="bg-linear-to-r from-blue-500 to-blue-800 flex-1 flex justify-center items-center rounded-4xl p-2 hover:scale-110 hover:opacity-90
      active:hover:scale-105 duration-300"
          >
            <FaMagnifyingGlass className="text-2xl text-gray-100" />
          </button>
        </div>
      </form>

      <table className="mt-10 w-[90%]  m-auto border-separate border-spacing-y-3 table-fixed ">
        <thead className="bg-gray-300">
          <tr className="hidden md:table-row">
            <th className="p-4" scope="col">
              Moeda
            </th>
            <th scope="col">Valor Mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              className="bg-gray-600/35  cursor-pointer text-gray-300 text-center p-4 font-bold "
            >
              <td className="overflow-hidden">
                <Link
                  to={`/detail/${coin.id}`}
                  className="flex justify-center items-center  md:justify-start w-full h-full p-4
                   hover:bg-gray-500/50 duration-300 rounded-md"
                >
                  <div className="flex items-center justify-center gap-1  p-4 ">
                    <img
                      src={getIcon(coin.symbol)}
                      alt={coin.name}
                      className="w-12 hover:scale-110 duration-300"
                    />
                    <div className="flex flex-col">
                      <span>{coin.name}</span> | {coin.symbol}
                    </div>
                  </div>
                </Link>
              </td>

              <td data-label="Valor Mercado">
                {formatedPriceCompact(coin?.marketCapUsd)}
              </td>
              <td data-label="Preço">{formatedPrice(coin?.priceUsd)}</td>
              <td data-label="Volume">
                {formatedPriceCompact(coin?.volumeUsd24Hr)}
              </td>
              <td data-label="Mudança 24h">
                <span
                  className={
                    Number(coin.changePercent24Hr) > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {Number(coin.changePercent24Hr).toFixed(2)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        label="Moedas"
        icon={<FaPlusCircle className="" />}
        onClick={showMoreCoin}
      />
    </main>
  );
}
