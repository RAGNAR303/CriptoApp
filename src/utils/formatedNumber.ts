export function formatedPrice(number:string ){
       return Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(number));
}

export function formatedPriceCompact(number:string){
  return Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        }).format(Number(number));
}