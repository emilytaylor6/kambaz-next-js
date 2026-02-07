import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">

        <Row xs={1} md={5} className="g-4">
            <Col className="wd-dashboard-course" style={{ width : "300px" }}>
                <Card>
                    <Link href="/courses/1234/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                CS1234
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Full Stack software developer
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width : "300px" }}>
                <Card>
                    <Link href="/courses/4550/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/webdev.jpg" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                CS4550
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Web Development
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width : "300px" }}>
                <Card>
                    <Link href="/courses/4530/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/softeng.jpg" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                CS4530
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Fundamentals of Software Engineering
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width : "300px" }}>
                <Card>
                    <Link href="/courses/4111/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/multimessenger.jpg" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                PHYS4111
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Multimessenger Astrophysics
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width : "300px" }}>
                <Card>
                    <Link href="/courses/3111/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/astroprocesses.jpg" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                PHYS3111
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Astrophysical Processes
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width : "300px" }}>
                <Card>
                    <Link href="/courses/4503/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/thermoandstats.jpg" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                PHYS4305
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Thermodynamics and Statistical Mechanics
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width : "300px" }}>
                <Card>
                    <Link href="/courses/3800/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/theoryofcomp.jpg" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                CS3800
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Theory of Computation
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width : "300px" }}>
                <Card>
                    <Link href="/courses/3302/home" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/advwriting.jpg" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                ENGW3302
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Advanced Writing in the Technical Professions
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>
        </Row>

      </div>
    </div>
);}
