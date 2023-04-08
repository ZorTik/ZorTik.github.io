import type { NextPage } from 'next'
import BaseLayout from "../components/BaseLayout";
import Welcome from "../components/Welcome";
import Experience from "../components/Experience";
import Works from "../components/Works";
import FadeIn from "react-fade-in";
import Socials from "../components/Socials";

const Home: NextPage = () => {
  return (
      <BaseLayout padding={false}>
          <FadeIn>
              <Welcome />
              <Experience />
              <Works />
              <Socials />
          </FadeIn>
      </BaseLayout>
  )
}

export default Home
