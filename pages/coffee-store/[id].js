import React from "react"
import { useRouter } from "next/router"
import coffeStoresData from "../../data/coffee-stores.json"
import Link from "next/link"
import Head from "next/head"
import styles from "../../styles/coffee-store.module.css"
import Image from "next/image"
import cls from "classnames"
import { fetchCoffeeStores } from "@/lib/coffee-store"
export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores()

  // get the external data during build to pre-render the page
  return {
    props: {
      coffeeStore: coffeeStores.find((store) => store.id == params.id),
    },
  }
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores()
  // returns the dynamic paths to pre-render while build to to check if dynamic route exist during no fallback

  const paths = coffeeStores.map((store) => {
    return {
      params: {
        id: store.id.toString(),
      },
    }
  })

  return {
    // paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    paths,
    fallback: true,
  }
}

const CoffeeStoreDetail = (props) => {
  // check if the fallback is set and catches any route that does not exist in paths
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  // after fallback done then do the rest task
  const { name, address, neighborhood, imgUrl } = props.coffeeStore

  function handleUpvoteButton() {
    console.log("upvoted!")
  }
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <Link className={styles.backToHomeLink} href="/">
            <Image src={"/static/icons/back.svg"} width="24" height="24" />
            Go to Home
          </Link>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{`${name}`}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={imgUrl}
              width={600}
              height={360}
              alt={name}
              className={styles.storeImg}
            />
          </div>
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image src={"/static/icons/address.svg"} width="24" height="24" />
              <p className={styles.text}>{` ${address}`}</p>
            </div>
          )}
          {neighborhood > 0 && (
            <div className={styles.iconWrapper}>
              <Image src={"/static/icons/nearme.svg"} width="24" height="24" />
              <p>{` ${neighborhood}`}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src={"/static/icons/star.svg"} width="24" height="24" />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoffeeStoreDetail
