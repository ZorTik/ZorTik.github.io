import type { NextPage } from 'next'
import BaseLayout from "../components/BaseLayout";
import Welcome from "../components/Welcome";
import Experience from "../components/Experience";
import Works from "../components/Works";
import Reviews from "../components/Reviews";

const Home: NextPage = () => {
  return (
      <BaseLayout>
          <Welcome />
          <Experience />
          <Works />
      </BaseLayout>
  )
}

export default Home
