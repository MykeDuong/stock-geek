import { NextPage } from "next"

import { HeaderImage } from "../../components"
import { pageTitleClass } from "../../utils/clientConstants"


const Watchlist: NextPage = () => {
  return (
    <div>
      <HeaderImage src={"/images/watchlist-image.png"} alt={"watchlist-image"} />
      <h1
        className={`${pageTitleClass} my-6`}
      >
        Watchlist
      </h1>
    </div>
  )
}

export default Watchlist