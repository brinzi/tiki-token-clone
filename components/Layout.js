import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';

export default function Layout({ children, dispatch, address }) {
  const [modep, setmodep] = useState(true);
  const [sidebarp, setsidebarp] = useState(false);

  return (
    <div className={modep ? "dark" : ""}>
      <div className="elementor-background-overlay"></div>
      <div className="flex ">

        <div className="flex flex-col flex-1 w-full h-screen ">
          <div  >
            <Navbar dispatch={dispatch} address={address} setmodep={setmodep} setsidebarp={setsidebarp} />
            {children}
          </div>

        </div>

      </div>
    </div>
  );
}