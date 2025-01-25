import MainLayout from "@/layout-provider/MainLayout";
import "@/styles/globals.css";
import ContextManager from "@/context/ContextManager";


export default function App({ Component, pageProps }) {

  return (
    <ContextManager>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ContextManager>
  );
}
