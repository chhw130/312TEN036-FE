"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ColorModeScript, ThemeConfig, extendTheme } from "@chakra-ui/react";

import dynamic from "next/dynamic";
const ChakraProvider = dynamic(() =>
  import("@chakra-ui/provider").then((mod) => mod.ChakraProvider)
);

// const BMJUA = localFont({
//   src: [
//     {
//       path: "../../app/font/BMJUA_ttf.ttf",
//       weight: "normal",
//       style: "normal",
//     },
//   ],
// });

export function ChakraLayout({ children }: { children: React.ReactNode }) {
  const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
  };

  //   const [mount, setMount] = useState(false);

  //   useLayoutEffect(() => {
  //     setMount(true);
  //   }, []);

  //   if (!mount) {
  //     return <></>;
  //   }

  const theme = extendTheme({
    config,

    // fonts: {
    //   body: BMJUA.style.fontFamily,
    // },
  });

  return (
    <ChakraProvider theme={theme}>
      <CacheProvider>{children}</CacheProvider>
    </ChakraProvider>
  );
}
