import { useEffect, useState, type FormEvent } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

interface CoinProps {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  tokens: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
}

interface DataProps {
  data: CoinProps[];
}

export function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const navigate = useNavigate();

  async function getData() {
    fetch(
      "https://rest.coincap.io/v3/assets?limit=10&offset=0&apiKey=6818c36d863027b35484b16c4063c19a8d8892f0a7c20bc01ddd9104ffec4541"
    )
      .then((response) => response.json())
      .then((data: DataProps) => {
        const dataCoins = data.data;

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        const formatedResult = dataCoins.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
            formatedMarked: price.format(Number(item.marketCapUsd)),
          };
          return formated;
        });
        console.log(formatedResult);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  function handleCoinSearch(e: FormEvent) {
    e.preventDefault();

    if (input === "") return;

    navigate(`/detail/${input}`);
  }

  function showMoreCoin() {}

  return (
    <main className="flex justify-center w-full flex-col">
      <form
        onSubmit={handleCoinSearch}
        className="flex flex-col justify-center w-full items-center"
      >
        <div
          className=" w-[85%] md:w-[60%] flex justify-center items-center 
         p-1 bg-gray-100 rounded-4xl overflow-hidden "
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

      <table className="mt-10 w-[90%] md:w-[80%] m-auto border-separate border-spacing-y-3 table-fixed ">
        <thead className="bg-gray-100">
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
          <tr className="bg-gray-600/35 cursor-pointer text-gray-300 text-center p-4 font-bold rounded-3xl border border-gray-50">
            <td data-label="Moeda" className="p-4 ">
              <Link to={"/detail/bitcoin"}>
                <span>Bitcoin</span> | BTC
              </Link>
            </td>

            <td data-label="Valor Mercado">1 T</td>
            <td data-label="Preço">1 8.000</td>
            <td data-label="Volume">2B</td>
            <td data-label="Mudança 24h">
              <span className="text-green-500">1.20%</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={showMoreCoin}
        className="
         bg-blue-600 ml-[10%]  flex-1 flex justify-center items-center rounded-4xl p-2 text-white font-bold w-[40%] md:w-[20%] "
      >
        Carregar mais
      </button>
    </main>
  );
}
