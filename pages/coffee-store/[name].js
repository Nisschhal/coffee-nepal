import { useRouter } from "next/router"

const CoffeeStore = () => {
  const router = useRouter()
  console.log(router.query.name)
  return <div>This is coffee store</div>
}

export default CoffeeStore
