import type {NextPage} from 'next'
import BaseLayout from "../components/layout/BaseLayout";
import Welcome from "../components/index/Welcome";
import Experience from "../components/index/Experience";
import Works from "../components/index/Works";
import FadeIn from "react-fade-in";
import Socials from "../components/index/Socials";

const Home: NextPage = () => {
  return (
      <>
          <BaseLayout padding={false}>
              <FadeIn>
                  <Welcome />
                  <Experience />
                  <Works />
                  <Socials />
              </FadeIn>
          </BaseLayout>
          <BaseLayout.Footer />
      </>
  )
}

export default Home
