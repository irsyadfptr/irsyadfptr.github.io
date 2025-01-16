import { BrowserRouter } from "react-router-dom";
import {  Banner, Experience, Navbar, TechStacks, Feedback, Contact } from "./components";
import { StarsCanvas } from "./components/canvas";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 min-h-screen'>
        <div className='bg-slate-50'>
          <Navbar />
          <Banner />
        </div>
        <TechStacks />
        <Experience />
        <div className='relative z-0'>
          <Contact />
          {/* <StarsCanvas /> */}
        </div> 
        {/* <Feedback /> */}
        {/* <About />
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
