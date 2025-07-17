import Lottie from "lottie-react"
import LoadingAnimation from "@/assets/lottie/Loader.json"

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "250px",
        width: "100%",
      }}
    >
      <Lottie animationData={LoadingAnimation} loop autoPlay />
    </div>
  )
}
export default Loading
