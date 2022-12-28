import { NextPage } from "next"
import MiniChart from "../../components/MiniChart/MiniChart"

const Screener: NextPage = () => {
  return (
    <div>
      <MiniChart ticker={""} />
    </div>
  )
}

export default Screener