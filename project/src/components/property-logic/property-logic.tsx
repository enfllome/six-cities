import { useParams } from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Property from '../property/property';
import { useAppSelector } from '../../hooks';
import { getCity, getComments, getCurrentOffer, getOffers } from '../../store/selectors';

function PropertyLogic (): JSX.Element {
  const comments = useAppSelector(getComments);
  const offers = useAppSelector(getOffers);
  const { id } = useParams();
  const currentOffer = useAppSelector(getCurrentOffer(Number(id)));
  const activeCity = useAppSelector(getCity);

  if(!currentOffer) {
    return <NotFoundScreen />;
  }

  return (
    <Property offers={offers} offer={currentOffer} comments={comments} city={activeCity}/>
  );
}

export default PropertyLogic;
