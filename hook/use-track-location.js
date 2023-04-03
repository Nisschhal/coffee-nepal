import { useState } from "react"

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("")
  const [latlong, setLatlong] = useState("")
  const [isLocating, setIsLocating] = useState(false)

  // success function for navigator
  const success = (position) => {
    setLatlong(`${position.coords.latitude},${position.coords.longitude}`)
    setLocationErrorMsg("")
    setIsLocating(false)
  }

  // error handling function for navigator
  function showError(error) {
    setIsLocating(false)
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setLocationErrorMsg("User denied the request for Geolocation.")
        setLatlong("")
        break
      case error.POSITION_UNAVAILABLE:
        setLocationErrorMsg("Location information is unavailable.")
        setLatlong("")
        break
      case error.TIMEOUT:
        setLocationErrorMsg("The request to get user location timed out.")
        setLatlong("")
        break
      case error.UNKNOWN_ERROR:
        setLocationErrorMsg("An unknown error occurred.")
        setLatlong("")
        break
    }
  }

  const handleTranckLocation = () => {
    setIsLocating(true)
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported in your Browser!")
      setIsLocating(false)
    } else {
      navigator.geolocation.getCurrentPosition(success, showError)
    }
  }
  return {
    locationErrorMsg,
    latlong,
    handleTranckLocation,
    isLocating,
  }
}

export default useTrackLocation
