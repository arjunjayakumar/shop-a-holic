import "./style.css";

export default function Spinner() {
  return (
    <section className="w-full h-[50svh] flex justify-center items-center">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}
