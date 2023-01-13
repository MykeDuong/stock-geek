import type { NextPage } from "next"

import { HeaderImage, Watchlist as WatchlistComponent } from "../../components"
import { pageTitleClass} from "../../utils/clientUtils"

const Watchlist: NextPage = () => {
  return (
    <div>
      <HeaderImage src={"/images/watchlist-image.png"} alt={"watchlist-image"} />
      <h1
        className={`${pageTitleClass} my-6`}
      >
        Watchlist
      </h1>
      <WatchlistComponent />
    </div>
  )
}
export default Watchlist