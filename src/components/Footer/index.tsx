function Footer() {
  const date = new Date();

  return (
    <footer>
      <div
        className="
      text-xl font-extralight text-white text-center w-full p-4"
      >
        Copyright© {date.getFullYear()}{" "}
        <strong className="font-extrabold">{"<THDEV>"}</strong>. Todos os
        direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;
