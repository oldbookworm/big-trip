const OFFER_BY_TYPE = [
    {
      type: 'taxi',
      offers: [
        {
          id: 1,
          title: 'comfort class',
          price: 100
        },
        {
          id: 2,
          title: 'pet frendly',
          price: 80
        },
        {
          id: 3,
          title: 'kids chair',
          price: 50
        },
      ]
    },
    {
      type: 'bus',
      offers: [
        {
          id: 4,
          title: 'comfort class',
          price: 80
        },
        {
          id: 5,
          title: 'pet frendly',
          price: 50
        },
        {
          id: 6,
          title: 'sleeping seat',
          price: 50
        },
      ]
    },
    {
      type: 'train',
      offers: [
        {
          id: 7,
          title: 'comfort class',
          price: 150
        },
        {
          id: 8,
          title: 'pet frendly',
          price: 150
        },
        {
          id: 9,
          title: 'separate coupe',
          price: 300
        },
         {
          id: 10,
          title: 'bed sheets',
          price: 10
        },
      ]
    },
    {
      type: 'ship',
      offers: [
        {
          id: 11,
          title: 'comfort class',
          price: 150
        },
        {
          id: 12,
          title: 'pet frendly',
          price: 150
        },
        {
          id: 13,
          title: 'separate coupe',
          price: 300
        },
         {
          id: 14,
          title: 'bed sheets',
          price: 10
        },
      ]
    },
    {
      type: 'drive',
      offers: [
        {
          id: 15,
          title: 'comfort class',
          price: 100
        },
        {
          id: 16,
          title: 'pet frendly',
          price: 90
        },
        {
          id: 17,
          title: 'kids chair',
          price: 20
        },
       
      ]
    },
    {
      type: 'flight',
      offers: [
        {
          id: 18,
          title: 'extra luggage',
          price: 30
        },
        {
          id: 19,
          title: 'comfort class',
          price: 90
        },
        {
          id: 20,
          title: 'place by a window',
          price: 15
        },
         
      ]
    },
     {
      type: 'check-in',
      offers: [
        {
          id: 21,
          title: 'early check-in',
          price: 25
        },     
  ]
     },
     {
      type: 'sightseeing',
      offers: [
        {
          id: 22,
          title: 'personal guide',
          price: 125
        },
         {
          id: 23,
          title: 'small group',
          price: 55
        },
  ]
     },
    {
      type: 'restaurant',
      offers: [
        {
          id: 24,
          title: 'delivery',
          price: 10
        },
         {
          id: 25,
          title: 'book table',
          price: 2
        },
  ]
     },
    ];
  
  
  const CITIES = ['Amsterdam', 'Geneva', 'Chamonix'];
  const PICS_DESCRIPTION = [
    'Parliament building',
    'Main street',
    'Beautiful view',
    'A popular tourist attraction',
    'Urban area',
    'Architectural heritage'
  ];
  
  const POINTS_COUNT = 5;
  const POINT_TYPE = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"];
  
  const getPointDescription = () => {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante."
  };


  export {OFFER_BY_TYPE, CITIES, PICS_DESCRIPTION, POINTS_COUNT, POINT_TYPE, getPointDescription};