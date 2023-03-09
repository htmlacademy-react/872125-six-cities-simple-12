import { Offer } from '../types/offers';

export const offers: Offer[] = [
  {
    id: 1,
    type: 'Apartment',
    price: 120,
    title: 'Beautiful & luxurious apartment at great location',
    rating: 4,
    image: 'https://polis-group.ru/sites/default/files/buildings/studio_0020000-min.png',
    isPremium: true
  },
  {
    id: 2,
    type: 'Private room',
    price: 80,
    title: 'Wood and stone place',
    rating: 4,
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/232459749.jpg?k=9a0780ad283f37da09de1a2c7e3b6cdef456dd23e0500c2f7cda576473e3eb07&o=&hp=1',
    isPremium: false
  },
  {
    id: 3,
    type: 'Apartment',
    price: 132,
    title: 'Canal View Prinsengracht',
    rating: 4,
    image: 'https://www.wilderkaiser.info/feratel/room/appartement-vorderlaiming-ferienwohnung.jpg',
    isPremium: false
  },
  {
    id: 4,
    type: 'Apartment',
    price: 180,
    title: 'Nice, cozy, warm big bed apartment',
    rating: 5,
    image: 'https://q-xx.bstatic.com/xdata/images/hotel/840x460/276450501.jpg?k=0d43a5f8b8d83d064eb16ead80ea806a56628375f3f3134758c4cc18f0344ebf&o=',
    isPremium: true
  },
];
