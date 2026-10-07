import "./globals.css";
import { VrikshaDataProvider } from "../components/data/VrikshaDataProvider";

export const metadata = {
  title: "Career Rooms · Vriksha",
  description:
    "Explore career paths through practical, interactive rooms on the Vriksha talent graph."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <VrikshaDataProvider>{children}</VrikshaDataProvider>
      </body>
    </html>
  );
}
