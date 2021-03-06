import { CheckFaforiteStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveCity, setSorted } from '../../store/reducers/another-process/another-process';
import { getCheckFavoriteStatus, getCity, getCurrentSorted, getHoveredOffer, getOffers, getOffersForSelectCity, getSortOffersByType } from '../../store/selectors';
import ErrorMessage from '../error-message/error-message';
import Header from '../header/header';
import LocationList from '../location-list/location-list';
import MainEmpty from '../main-empty/main-empty';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import Sorted from '../sorted/sorted';

function Main(): JSX.Element {
  const activeCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();
  const handleClickCity = (name: string) => dispatch(setActiveCity(name));
  const offers = useAppSelector(getOffers);
  const filteredOffers = useAppSelector(getOffersForSelectCity);
  const currentSorting = useAppSelector(getCurrentSorted);
  const setSorting = (typeSort: string) => {
    dispatch(setSorted(typeSort));
  };
  const sortedOffers = getSortOffersByType(filteredOffers,currentSorting);
  const selectedOffer = useAppSelector(getHoveredOffer);
  const favoriteStatus = useAppSelector(getCheckFavoriteStatus);

  if (offers.length === 0) {
    return <MainEmpty />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList activeCity={activeCity}  handleClickCity={handleClickCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {
              favoriteStatus === CheckFaforiteStatus.Error && <ErrorMessage>Ошибка интернет соединения</ErrorMessage>
            }
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{ filteredOffers.length } places to stay in {activeCity}</b>
              <Sorted currentSorting={currentSorting} setSorting={setSorting}/>
              <OffersList sortedOffers={sortedOffers}/>
            </section>
            <div className="cities__right-section">
              <Map className='cities__map map' city={activeCity} points={filteredOffers} selectedOffer={selectedOffer}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
