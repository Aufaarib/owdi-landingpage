import MainLayout from "@/layout-provider/MainLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  // if (screenWidth > 700) {
  //   console.log("moree");
  //   return (
  //     <DesktopLayout>
  //       <Component {...pageProps} />
  //     </DesktopLayout>
  //   );
  // }

  return (
    // <AppStateProvider>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
    // </AppStateProvider>
  );
}
