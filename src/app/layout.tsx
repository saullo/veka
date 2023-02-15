import "./globals.css";
import { AccountProvider } from "../lib/account-context";
import { AnalyticsWrapper } from "./components/analytics";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AccountProvider>{children}</AccountProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
