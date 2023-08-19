import { BrowserRouter } from "react-router-dom";
import {  Banner, Navbar } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-slate-50 min-h-screen'>
        <div className='bg-slate-50'>
          <Navbar />
          <Banner />
        </div>
        {/* <About />
        <Experience />
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
