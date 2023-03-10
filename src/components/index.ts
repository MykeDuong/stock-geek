import dynamic from 'next/dynamic';

export { default as SideBar } from './SideBar/SideBar';

export { default as AppWrap  } from './Wrapper/Wrapper'; 

export { default as SearchBar } from './SearchBar/SearchBar';

export { default as TickerInfo } from './TickerInfo/TickerInfo';

export { default as MultiRangeSlider } from './MultiRangeSlider/MultiRangeSlider';

export { default as Filter } from './Filter/Filter';

export { default as MiniChart } from './MiniChart/MiniChart';

export { default as TrendingTickers} from './TrendingTickers/TrendingTickers';

export { default as HeaderImage } from './HeaderImage/HeaderImage';

export { default as MarketInfo } from './MarketInfo/MarketInfo'

export { default as TickerChart } from './TickerChart/TickerChart';

export { default as TickerTechnicalAnalysis } from './TickerTechnicalAnalysis/TickerTechnicalAnalysis';

export { default as Error } from './Error/Error';

export { default as PreviewOrder } from './PreviewOrder/PreviewOrder';

export { default as SaveScreener } from './SaveScreener/SaveScreener';

export { default as SavedScreeners } from './SavedScreeners/SavedScreeners';

export { default as PortfolioOverview } from './PortfolioOverview/PortfolioOverview';

export { default as HoldingsInformation } from './HoldingsInformation/HoldingsInformation';

export const PortfolioPerformanceChart = dynamic(() => import ('./PortfolioPerformanceChart/PortfolioPerformanceChart'), { ssr: false })

export { default as TickerBanner } from './TickerBanner/TickerBanner';

export { default as MarketPerformance } from './MarketPerformance/MarketPerformance';

export { default as News } from './News/News';

export { default as MarketOverview } from './MarketOverview/MarketOverview';

export { default as Watchlist } from './Watchlist/Watchlist';

export { default as TradeOptions } from './TradeOptions/TradeOptions'

export { default as CompanyProfile } from './CompanyProfile/CompanyProfile'