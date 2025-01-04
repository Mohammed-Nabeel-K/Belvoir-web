// app/layout.tsx
import "../../styles/globals.css";
// import "./globals.css";

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
        <div className="">{children}</div>
      </body>
    </html>
  );
}
