import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";

const TechStacks = () => {
  return (
    <div className='bg-emerald-500 py-10 px-40'>
      <div>
        <h2 className={`${styles.sectionHeadText} text-center mb-10 text-slate-50`}>
          Tech Stack That I Familiar.
        </h2>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10 mb-10">
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(TechStacks, "tech");
