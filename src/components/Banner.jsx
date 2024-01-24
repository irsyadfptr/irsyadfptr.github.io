/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";
import { styles } from "../styles";
import { char } from "../assets";


const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(800 - Math.random() * 300); // Adjusted the delta value
  // eslint-disable-next-line no-unused-vars
  const [_, setIndex] = useState(1);
  const toRotate = ["Web Developer", "Front-End Developer", "Software Developer", "Discord Dev & Mod", "Event Officer"];
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

  const [circlePositions, setCirclePositions] = useState([]);

  useEffect(() => {
    const generateRandomPosition = () => ({
      top: `${Math.random() * 90}%`, // Random top position (0-20%)
      right: `${Math.random() * 90 }%`, // Random right position (70-100%)
    });

    

    // Generate two random positions for small circles
    const positions = Array.from({ length: 4 }, generateRandomPosition);
    setCirclePositions(positions);
  }, []);

  return (
    <section className={`relative w-full h-128 sm:h-screen mx-auto`} ref={bannerRef}>
      <style>
        {`
          @media (min-width: 1024px) {
            .circle-background {
              position: absolute;
              bottom: -60px;
              left: 140px;
              width: 175px; /* Adjust the size as needed */
              height: 175px; /* Adjust the size as needed */
              background-color: #10b981; /* Background color of the circle */
              border-radius: 50%;
              z-index: 1; /* Place the circle behind the content */
            }
            .small-circle {
              position: absolute;
              width: 150px; /* Adjust the size of the small circle */
              height: 150px; /* Adjust the size of the small circle */
              background-color: rgba(16, 185, 129, 0.1); /* Background color of the small circle */
              border-radius: 50%;
            }
          }
        `}
      </style>
      <div className="circle-background" />
      {circlePositions.map((position, index) => (
        <div key={index} className="small-circle" style={position} />
      ))}
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-emerald-500' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText}`} style={{	color: 'rgb(15 23 42)'}}>
            Halo, I'm <span className='text-emerald-500'>Putranto</span>
          </h1>
          <h1 className={`${styles.heroSubHeadText} text-black`}  style={{	color: 'rgb(15 23 42)'}}>
            a/an <span className='text-emerald-500' data-period="1000" data-rotate={JSON.stringify(toRotate)}>
                <span className="wrap">{text}</span>
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-2`}  style={{	color: 'rgb(15 23 42)'}}>
            I develop web application, landing <br className='sm:block hidden' />
            pages and discord bots for your community. <br className='sm:block hidden' />
            and... sometimes I manage an event for entertainment.
          </p>
          <div className="w-full mt-6 md:mt-10">
            <div className="flex justify-center sm:justify-start pt-8 pb-0 lg:pt-4" style={{marginLeft: window.innerWidth >= 640 ? 0 : '-12.5%'}}>
              <div className="flex gap-4 space-x-2">
                <a
                    className="p-1 -m-1 text-gray-400 hover:text-emerald-500 focus:outline-none focus-visible:ring-2 ring-primary"
                    href="https://www.twitter.com/insinyuroffun"
                    rel="noopener noreferrer"
                    aria-label="Ariel Cerda on Twitter"
                    target="_blank"
                >
                    <svg className="w-12 h-12 overflow-visible fill-current" alt="" aria-hidden="true" viewBox="0 0 24 24">
                        <path
                            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                        ></path>
                    </svg>
                </a>

                <a className="p-1 -m-1 text-gray-400 hover:text-emerald-500 focus:outline-none focus-visible:ring-2 ring-primary" href="https://www.github.com/irsyadfptr" rel="noopener noreferrer" aria-label="Ariel Cerda on Github" target="_blank">
                    <svg className="w-12 h-12 overflow-visible fill-current" alt="" aria-hidden="true" viewBox="0 0 140 140">
                        <path
                            d="M70 1.633a70 70 0 00-21.7 136.559h1.692a5.833 5.833 0 006.183-6.184v-1.225-6.358a2.917 2.917 0 00-1.167-1.925 2.917 2.917 0 00-2.45-.583C36.925 125.3 33.6 115.5 33.367 114.858a27.067 27.067 0 00-10.034-12.775 6.767 6.767 0 00-.875-.641 3.675 3.675 0 012.217-.409 8.575 8.575 0 016.708 5.134 17.5 17.5 0 0023.334 6.766 2.917 2.917 0 001.691-2.1 11.667 11.667 0 013.267-7.175 2.917 2.917 0 00-1.575-5.075c-13.825-1.575-27.942-6.416-27.942-30.275a23.333 23.333 0 016.125-16.216A2.917 2.917 0 0036.808 49a20.533 20.533 0 01.059-14 32.317 32.317 0 0114.7 6.708 2.858 2.858 0 002.45.409A61.892 61.892 0 0170 39.958a61.075 61.075 0 0116.042 2.159 2.858 2.858 0 002.391-.409 32.608 32.608 0 0114.7-6.708 20.825 20.825 0 010 13.883 2.917 2.917 0 00.525 3.092 23.333 23.333 0 016.125 16.042c0 23.858-14.175 28.641-28.058 30.216a2.917 2.917 0 00-1.575 5.134 12.833 12.833 0 013.558 10.15v18.55a6.183 6.183 0 002.1 4.841 7 7 0 006.184 1.109A70 70 0 0070 1.633z"
                        ></path>
                    </svg>
                </a>

                <a
                    className="p-1 -m-1 text-gray-400 hover:text-emerald-500 focus:outline-none focus-visible:ring-2 ring-primary"
                    href="https://www.linkedin.com/in/irsyad-fakhri-putranto/"
                    rel="noopener noreferrer"
                    aria-label="Ariel Cerda on Linkedin"
                    target="_blank"
                >
                    <svg className="w-12 h-12 overflow-visible fill-current" alt="" aria-hidden="true" viewBox="0 0 140 140">
                        <path
                            d="M23.4 44.59h-4.75a12.76 12.76 0 00-9.73 2.19 9.44 9.44 0 00-2.35 7.12V131a9.08 9.08 0 002.3 7 9.24 9.24 0 006.82 2c2.22 0 4.15-.21 8.24-.06a12 12 0 009.25-2 9.1 9.1 0 002.29-7V53.9a9.44 9.44 0 00-2.34-7.12 12.68 12.68 0 00-9.73-2.19zM21 0A16.19 16.19 0 005.09 15.6 16.52 16.52 0 0021 31.86 16.12 16.12 0 0037 15.6 16.18 16.18 0 0021 0zM99.74 43.63a31.09 31.09 0 00-20.93 6.3A7.25 7.25 0 0077 46.34a6.08 6.08 0 00-4.52-1.78 119.08 119.08 0 00-15 .3c-4.16.84-6.18 3.79-6.18 9V131a9.14 9.14 0 002.28 7 12.06 12.06 0 009.26 2c4.47-.17 5.74.06 8.22.06a9.26 9.26 0 006.83-2 9.12 9.12 0 002.3-7V89.88A12.48 12.48 0 0192.93 76 12.44 12.44 0 01106 89.88V131a9.1 9.1 0 002.29 7 12 12 0 009.24 2c1.83-.07 4-.07 5.8 0a12.09 12.09 0 009.26-2 9.14 9.14 0 002.28-7V78.32a33.07 33.07 0 00-35.13-34.69z"
                        ></path>
                    </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-0 right-10 xl:right-20">
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