import { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = "https://projects-api-server.onrender.com/portfolio-experience";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setJobs(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (isLoading) {
    return (
      <section className="section loading">
        <h2>Loading...</h2>
      </section>
    );
  }
  const { title, dates, duties, company } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Work Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, index) => {
            const { id, company } = job;
            return (
              <button
                key={id}
                className={`job-btn ${index === value && "active-btn"}`}
                onClick={() => {
                  setValue(index);
                }}
              >
                {company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
