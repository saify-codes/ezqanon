import { ToastContainer } from "react-toastify";

export default function({children}){
    return <>
    {children}
    <ToastContainer/>
    </>
}