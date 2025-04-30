import { DashboardProvider } from "./context/produtosContext";

export default function Layout({ children }) {
    return <DashboardProvider>{children}</DashboardProvider>;
}
