import "../../styles/globals.css";
import Providers from "../app/Provider/Providers";
import 'animate.css';
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
      <body>
        <Providers>
            <ToastContainer />
            <div className="">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
