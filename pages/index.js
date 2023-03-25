import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import styles from "../styles/Home.module.css"
import Banner from "@/components/banner"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  function clickHandler() {
    console.log("handled!!")
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Coffee Connoisseur</title>
      </Head>
      <main className={styles.main}>
        <Banner buttonText="View store nearby" handleOnClick={clickHandler} />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
      </main>
    </>
  )
}
