import type { NextPage } from 'next'
import BaseLayout from "../components/BaseLayout";
import Welcome from "../components/Welcome";
import Experience from "../components/Experience";
import Works from "../components/Works";
import FadeIn from "react-fade-in";

const Home: NextPage = () => {
  return (
      <BaseLayout>
          <FadeIn>
              <Welcome />
              <Experience />
              <Works />
          </FadeIn>
      </BaseLayout>
  )
}

export default Home
