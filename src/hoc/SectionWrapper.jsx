const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section
        className={`${
        idName === 'tech' ? 'bg-emerald-500' : 'bg-primary'
        } relative z-0`}      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </section>
    );
  };

export default StarWrapper;
