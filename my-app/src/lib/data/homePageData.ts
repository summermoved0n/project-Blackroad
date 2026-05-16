type Review = {
  id: number;
  stars: number;

  description: string;
  author: string;
};

export const reviewsData: Review[] = [
  {
    id: 1,
    stars: 5,
    description:
      "Incredible and exciting journey, beautiful views and full of impressions vacation. Loved this trip!",
    author: "Svetlana Pashinskaya",
  },
  {
    id: 2,
    stars: 3,
    description:
      "Great tour. Many impressions of the scenery. Special thanks to the guide Bogdan. In general, the whole route is very thoughtful and Read more..",
    author: "Yana",
  },
  {
    id: 3,
    stars: 4,
    description:
      "The tour program is rich and interesting. They were tired but satisfied. We also liked the hotel. Very cozy and comfortable",
    author: "Irina",
  },
];

export const faqData = [
  {
    id: 1,
    question: "What is included in the tour price?",
    description:
      "The tour price typically includes accommodation, transportation during the trip, guided excursions, and some meals as specified in the itinerary. Additional services may vary depending on the package selected.",
  },
  {
    id: 2,
    question: "What do you need to pay for separately?",
    description:
      "Personal expenses, optional activities, travel insurance, and certain meals are usually not included in the tour price. International flights may also be excluded unless stated otherwise.",
  },
  {
    id: 3,
    question: "Are there bundled offers or discounts for families or groups?",
    description:
      "Yes, we offer special discounts for families and group bookings. The exact savings depend on the size of the group and the selected tour package.",
  },
  {
    id: 4,
    question: "What are the rules regarding cancellation or change of travel?",
    description:
      "Cancellation and modification policies depend on the specific tour. Generally, changes can be made within a certain period before departure, while cancellations may involve fees based on timing.",
  },
  {
    id: 5,
    question:
      "What opportunities are there for insurance against cancellations and accidents?",
    description:
      "We recommend purchasing travel insurance that covers trip cancellations, medical emergencies, and accidents. Various insurance options are available to provide peace of mind during your journey.",
  },
];

export const popularTours = [
  {
    id: 1,
    title: "Autumn in the mountains",
    description:
      "Walking in the crowns of trees and watching bears. Rest in a mountain hotel and meeting dawn in the mountains",
    image: "/images/Popular_tours_mountains.jpg",
    price: 6200,
  },
  {
    id: 2,
    title: "Blue lakes and ancient Lubech",
    description:
      "Excursion to Lubech, once a Viking trading post, or to the 'city of the future' Slavutich. Swimming in the cleanest lakes with water of incredible color.",
    image: "/images/Popular_tours_lake.jpg",
    price: 3300,
  },
  {
    id: 3,
    title: "Rest in the canyon",
    description:
      "Moving to the picturesque rock canyon in the village of Buki. Excursion in the form of an easy walk, during which you will see what a large-scale natural event took place here.",
    image: "/images/Travel_with_us(canyon).jpg",
    price: 3000,
  },
  {
    id: 4,
    title: "Dzhurinsky waterfall",
    description:
      "The most full-flowing plain waterfall of Ukraine, which is considered one of the most picturesque and interesting places of Ternopil region.",
    image: "/images/Travel_with_us(waterfall).jpg",
    price: 5000,
  },
];

export const travelWithUsTours = [
  {
    id: 1,
    title: "Rest in the canyon",
    description:
      "Moving to the picturesque rock canyon in the village of Buki. Excursion in the form of an easy walk, during which you will see what a large-scale natural event took place here.",
    image: "/images/Travel_with_us(canyon).jpg",
    price: 3000,
  },
  {
    id: 2,
    title: "Dzhurinsky waterfall",
    description:
      "The most full-flowing plain waterfall of Ukraine, which is considered one of the most picturesque and interesting places of Ternopil region.",
    image: "/images/Travel_with_us(waterfall).jpg",
    price: 5000,
  },
  {
    id: 3,
    title: "Autumn in the mountains",
    description:
      "Walking in the crowns of trees and watching bears. Rest in a mountain hotel and meeting dawn in the mountains",
    image: "/images/Popular_tours_mountains.jpg",
    price: 6200,
  },
  {
    id: 4,
    title: "Blue lakes and ancient Lubech",
    description:
      "Excursion to Lubech, once a Viking trading post, or to the 'city of the future' Slavutich. Swimming in the cleanest lakes with water of incredible color.",
    image: "/images/Popular_tours_lake.jpg",
    price: 3300,
  },
];

export const dataOfCustomers = [
  { id: 1, numbers: "16", text: "Years of experience" },
  { id: 2, numbers: "5000", text: "Satisfied customers" },
  { id: 3, numbers: "24/7", text: "In touch" },
];
