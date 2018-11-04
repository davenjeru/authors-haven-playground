import Chimammanda from '../../../assets/images/face1.jpg';
import Hos from '../../../assets/images/hos.jpg';
import Ruth from '../../../assets/images/ruth.jpg';

export const benefitsArray = [
  {
    value: 'Authentic', emoji: '👌',
  },
  {
    value: 'Knowledgeable Authors', emoji: '📚',
  },
  {
    value: 'Membership', emoji: '💳',
  },
  {
    value: 'Affordable', emoji: '💸',
  },
  {
    value: 'Amazing', emoji: '😌',
  },
  {
    value: 'Fun', emoji: '🙌',
  },
];

export const featuredCategories = [
  {
    name: 'Technology',
    count: 312,
  },
  {
    name: 'Lifestyle',
    count: 299,
  },
  {
    name: 'Science',
    count: 259,
  },
  {
    name: 'Finance',
    count: 219,
  },
  {
    name: 'Politics',
    count: 155,
  },
];

export const testimonialsArray = [
  {
    name: 'Chimammanda',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    image: Chimammanda,
    role: 'Senior writer',
  },
  {
    name: 'Hoslack',
    text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec.',
    image: Hos,
    role: 'Reader',
  },
  {
    name: 'Ruth',
    text: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Cum sociis natoque penatibus et magnis dis parturient montes.',
    image: Ruth,
    role: 'Reader',
  },
];

const mockData = {
  benefitsArray,
  featuredCategories,
  testimonialsArray,
};

export default mockData;
