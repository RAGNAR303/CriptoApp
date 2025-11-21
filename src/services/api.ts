import axios from "axios";
import type { CoinProps } from "../interfaces/interfaces";







export const api = axios.get<CoinProps>("https://rest.coincap.io/v3/assets/bitcoin?", {
    params: {
        apiKey:"6818c36d863027b35484b16c4063c19a8d8892f0a7c20bc01ddd9104ffec4541"
    }
})


console.log(api)

