import "../../styles/globals.css";
import 'animate.css';

import Providers from "../app/Provider/Providers"
import { ToastContainer } from "react-toastify";
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
        <div className="">
        <ToastContainer />
          {children}
        </div>
      </body>
      </Providers>
    </html>
  );
}
