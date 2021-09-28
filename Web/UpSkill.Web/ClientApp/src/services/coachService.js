const numberCoachesToShow = 6;

const initialCoaches = [
    {
      id: 1,
      fullName: 'Brent Foster',
      coachField: 'Leadership ',
      company: 'Google',
      price: 50,
      imageUrl: 'https://www.g20.org/wp-content/uploads/2021/01/people.jpg',
    },
    {
      id: 2,
      fullName: 'Philipa Key',
      coachField: 'Nutrition',
      company: 'Amazon',
      price: 60,
      imageUrl: 'https://www.g20.org/wp-content/uploads/2021/01/people.jpg',
    },
    {
      id: 3,
      fullName: 'Jim James',
      coachField: 'Management',
      company: 'Google',
      price: 80,
      imageUrl: 'https://www.g20.org/wp-content/uploads/2021/01/people.jpg',
    },
    {
      id: 4,
      fullName: 'Brent Foster',
      coachField: 'Leadership',
      company: 'Google',
      price: 50,
      imageUrl: 'https://www.g20.org/wp-content/uploads/2021/01/people.jpg',
    },    
    {
      id: 5,
      fullName: 'Jimmy Hanks',
      coachField: 'Art',
      company: 'Google',
      price: 100,
      imageUrl: 'https://www.g20.org/wp-content/uploads/2021/01/people.jpg',
    },  
    {
      id: 6,
      fullName: 'Ben Levis',
      coachField: 'Management',
      company: 'Google',
      price: 60,
      imageUrl: 'https://www.g20.org/wp-content/uploads/2021/01/people.jpg',
    },    
    {
      id: 7,
      fullName: 'Emma Milton',
      coachField: 'Nutrition',
      company: 'Google',
      price: 40,
      imageUrl: 'https://www.g20.org/wp-content/uploads/2021/01/people.jpg',
    },
  ];

export const getCoaches = async (currentPage) => {
    //      let res = await request(``, 'Get');
            let arr = [];
            arr.push(...initialCoaches
                .slice(0, currentPage * numberCoachesToShow + numberCoachesToShow));    
            
           return arr;
    }
    
