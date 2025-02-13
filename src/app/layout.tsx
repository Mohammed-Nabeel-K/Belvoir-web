// app/layout.tsx
import "../../styles/globals.css";
// import "./globals.css";
import 'animate.css';

import Providers from "../app/Provider/Providers"
import {OrderProvider} from "../app/Provider/OrderProvider"
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <Providers>
      <body>
      <OrderProvider>
        <div className="">{children}</div>
      </OrderProvider>
      </body>
      </Providers>
    </html>
  );
}
