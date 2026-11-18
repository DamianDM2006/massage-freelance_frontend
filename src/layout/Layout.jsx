/** this page will detemine display based on the type of device the user is using.
 * mobile phone/ipad/notebook/computer terminal
 * size of screen being used.
 * sets context for display type (??)
 */
import { Outlet } from "react-router";
import { ErrorBoundary } from "../assets/boundaries/ErrorBoundary.jsx";

import NavBar from "./NavBar.jsx";
import LanguageSelect from "./LanguageSelect.jsx";
import HeadInsert from"./HeadInsert.jsx";

const Layout = () => {
  return (
    <div className="page">
      <header >
        <h1 className="title">Full Moon Massage</h1>
        <NavBar />
        <LanguageSelect />
        <HeadInsert />
      </header>
      <main>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  )
};

export default Layout;