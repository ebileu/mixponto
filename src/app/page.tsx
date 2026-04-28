import App from "next/app";
import Image from "next/image";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
  <div>
    <Header />
    <Sidebar />
      <main>
        <h1>Sistema de Ponto</h1>
      </main>
    </div>
  );
} 