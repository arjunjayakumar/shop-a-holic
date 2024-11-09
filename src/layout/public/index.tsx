import Header from "../../common/components/Header/Header";
import { Outlet } from "react-router-dom";

export default function Public() {
  return (
    <section className="h-screen">
      <Header />
      <Outlet />
    </section>
  );
}
