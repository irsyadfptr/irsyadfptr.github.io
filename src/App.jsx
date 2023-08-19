import { BrowserRouter } from "react-router-dom";
import {  Banner, Experience, Navbar } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 min-h-screen'>
        <div className='bg-slate-50'>
          <Navbar />
          <Banner />
        </div>
        <Experience />
        {/* <About />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
