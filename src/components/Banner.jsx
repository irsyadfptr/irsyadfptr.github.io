import { useState, useEffect, useRef } from "react";
import { styles } from "../styles";
import { char } from "../assets";


const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(800 - Math.random() * 300); // Adjusted the delta value
  const [index, setIndex] = useState(1);
  const toRotate = ["Web Developer", "Front-End Developer", "Software Developer"];
  const period = 1000; // Adjusted the period value
  const bannerRef = useRef(null);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    // <section className="banner" id="home" ref={bannerRef}>
    //   <div className="container mx-auto">
    //     <div className="grid grid-cols-1 md:grid-cols-2 items-center">
    //       <div className="p-6 md:p-10">
    //         <div className="animate__animated animate__fadeIn">
    //           <span className="text-green-500 text-sm">Welcome to my Portfolio</span>
    //           <h1 className="text-3xl md:text-4xl font-bold mb-2">{`Hi! I'm Judy`}{" "}
    //             <span className="txt-rotate" data-period="1000" data-rotate={JSON.stringify(toRotate)}>
    //               <span className="wrap">{text}</span>
    //             </span>
    //           </h1>
    //           <p className="text-gray-600 mb-4">
    //             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    //             industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
    //             scrambled it to make a type specimen book.
    //           </p>
    //           <button
    //             className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
    //             onClick={() => console.log('connect')}
    //           >
    //             Let’s Connect
    //           </button>
    //         </div>
    //       </div>
    //       <div className="p-6 md:p-10">
    //         <div className="animate__animated animate__zoomIn">
    //           {/* <img src={headerImg} alt="Header Img" className="w-full" /> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className={`relative w-full h-screen mx-auto`} ref={bannerRef}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >

        <div>
          <h1 className={`${styles.heroHeadText} text-gray-900`}>
            Halo, I'm <span className='text-emerald-500'>Putranto</span>
          </h1>
          <h1 className={`${styles.heroSubHeadText} text-gray-900`}>
            a <span className='text-emerald-500' data-period="1000" data-rotate={JSON.stringify(toRotate)}>
                <span className="wrap">{text}</span>
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-gray-800`}>
            I develop 3D visuals, user <br className='sm:block hidden' />
            interfaces and web applications
          </p>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-0 right-0">
        <img
            src={char}
            alt='menu'
            className=''
          />
      </div>
    </section>
  );
};

export default Banner;