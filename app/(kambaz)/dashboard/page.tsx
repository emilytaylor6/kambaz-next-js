import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">

        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">  
            <Link href="/courses/4550" className="wd-dashboard-course-link">
            <Image src="/images/webdev.jpg" width={200} height={150} alt="webdev" />
            <div>
                <h5> CS4550 </h5>
                <p className="wd-dashboard-course-title">
                Web Development
                </p>
                <button> Go </button>
            </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link href="/courses/4530" className="wd-dashboard-course-link">
            <Image src="/images/softeng.jpg" width={200} height={150} alt="softeng" />
            <div>
                <h5> CS4530 </h5>
                <p className="wd-dashboard-course-title">
                Fundamentals of Software Engineering
                </p>
                <button> Go </button>
            </div>
            </Link>
        </div>

        <div>
            <Link href="/courses/4111" className="wd-dashboard-course-link">
            <Image src="/images/multimessenger.jpg" width={200} height={150} alt="multimessenger" />
            <div>
                <h5> PHYS4111 </h5>
                <p className="wd-dashboard-course-title">
                Multimessenger Astrophysics
                </p>
                <button> Go </button>
            </div>
            </Link>
        </div>

        <div>
            <Link href="/courses/3111" className="wd-dashboard-course-link">
            <Image src="/images/astroprocesses.jpg" width={200} height={150} alt="astroprocesses" />
            <div>
                <h5> PHYS3111 </h5>
                <p className="wd-dashboard-course-title">
                Astrophysical Processes
                </p>
                <button> Go </button>
            </div>
            </Link>
        </div>

        <div>
            <Link href="/courses/4503" className="wd-dashboard-course-link">
            <Image src="/images/thermoandstats.jpg" width={200} height={150} alt="thermoandstats" />
            <div>
                <h5> PHYS4305 </h5>
                <p className="wd-dashboard-course-title">
                Thermodynamics and Statistical Mechanics
                </p>
                <button> Go </button>
            </div>
            </Link>
        </div>

        <div>
            <Link href="/courses/3800" className="wd-dashboard-course-link">
            <Image src="/images/theoryofcomp.jpg" width={200} height={150} alt="theoryofcomp" />
            <div>
                <h5> CS3800 </h5>
                <p className="wd-dashboard-course-title">
                Theory of Computation
                </p>
                <button> Go </button>
            </div>
            </Link>
        </div>

        <div>
            <Link href="/courses/3302" className="wd-dashboard-course-link">
            <Image src="/images/advwriting.jpg" width={200} height={150} alt="advwriting" />
            <div>
                <h5> ENGW3302 </h5>
                <p className="wd-dashboard-course-title">
                Advanced Writing in the Technical Professions
                </p>
                <button> Go </button>
            </div>
            </Link>
        </div>

      </div>
    </div>
);}
