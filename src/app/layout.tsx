import "./globals.css";
import { AccountProvider } from "../lib/account-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="h-full">
        <AccountProvider>{children}</AccountProvider>
      </body>
    </html>
  );
}
