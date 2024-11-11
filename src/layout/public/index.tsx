import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import Header from "../../common/components/Header/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getProducts } from "../../pages/api";

export default function Public() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="h-screen overflow-hidden">
      <Header />
      <Outlet />
    </section>
  );
}
