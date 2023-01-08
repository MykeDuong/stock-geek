import { NextPage } from "next"
import { HeaderImage } from "../../components"
import { pageTitleClass } from "../../utils/clientUtils"

const History: NextPage = () => {
  return (
    <div>
      <HeaderImage src={"/images/history-image.png"} alt="history image" />
      <h1
        className={`${pageTitleClass} my-6`}
      >
        Trade History
      </h1>
    </div>
  )
}

export default History