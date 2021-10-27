import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';

export default function Layout({ children, dispatch, address }) {
  const [modep, setmodep] = useState(true);
  const [sidebarp, setsidebarp] = useState(false);
  const vidRef = useRef(null);
  useEffect(() => {
    vidRef.current.load();
    vidRef.current.play();
  }, [vidRef]);
  return (
    <div className={modep ? "dark" : ""}>

      <div className="flex ">
        <div className="video-container">
          <video ref={vidRef} id="background-video" autoPlay playsInline loop muted>
            <source src="video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* <div className={`z-30 flex-shrink-0  w-64  bg-white dark:bg-gray-800 fixed lg:block h-screen  lg:relative -mt-11 top-10 transition-all duration-1000  ${sidebarp?" lg:left-0 left-0 ":"lg:left-0 -left-96"}`}>
          <Aside setsidebarp={setsidebarp} />
        </div> */}
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