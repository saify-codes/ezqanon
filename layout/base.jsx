import { FaArrowUp } from "react-icons/fa6";
import Header from "@/components/layout/header";
import Preloader from "@/components/preloader";

export default function ({ children }) {
    return <>
        <Header />

        <main className="main">
            {children}
        </main>

        <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
            <FaArrowUp style={{ color: '#FFF' }} />
        </a>

        <Preloader />

    </>
}