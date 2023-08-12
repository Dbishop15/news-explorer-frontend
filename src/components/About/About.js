import "./About.css";
import avatar from "../../images/avatar.svg";

function About() {
  return (
    <section className="about">
      <img className="about__image" src={avatar} alt="avatar" />
      <div className="about__text">
        <h2 className="about__text-title">About the author</h2>
        <p className="about__text-paragraph">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development teachnologies you know.
        </p>
        <p className="about__text-paragraph">
          You can also talk about your experience with Practicum, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
