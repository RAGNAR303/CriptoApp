import { useEffect, useState, type FormEvent } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import type { CoinProps, DataProps } from "../../interfaces/interfaces";
import {
  formatedPrice,
  formatedPriceCompact,
} from "../../utils/formatedNumber";
import { Button } from "../../components/Button";
import { getIcon } from "../../utils/getImages";

export function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  async function getData() {
    console.log(offset);
    fetch(
      `https://rest.coincap.io/v3/assets?limit=10&offset=${offset}=0&apiKey=6818c36d863027b35484b16c4063c19a8d8892f0a7c20bc01ddd9104ffec4541`
    )
      .then((response) => response.json())
      .then((data: DataProps) => {
        const dataCoins = data.data;

        // console.log(formatedResult);
        const listCoins = [...coins, ...dataCoins];
        setCoins(listCoins);
      });
  }

  useEffect(() => {
    getData();
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
            className="
         bg-blue-600  flex-1 flex justify-center items-center rounded-4xl p-2 "
          >
            <BsSearch className="text-2xl text-gray-100" />
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
              className="bg-gray-600/35  cursor-pointer text-gray-300 text-center p-4 font-bold"
            >
              <td className="p-2  ">
                <div className="flex justify-center md:justify-start items-center gap-1 p-4 ">
                  <img
                    src={getIcon(coin.symbol)}
                    alt={coin.name}
                    className="w-12 hover:scale-110 duration-300"
                  />
                  <Link to={`/detail/${coin.id}`}>
                    <span>{coin.name}</span> | {coin.symbol}
                  </Link>
                </div>
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
      <Button label="Carregar mais moedas" onClick={showMoreCoin} />
    </main>
  );
}
