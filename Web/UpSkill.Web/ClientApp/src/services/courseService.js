const numberCoursesToShow = 5;

const initialCourses = [
  {
    id: 1,
    courseName: 'Marketing',
    coachName: 'Jim Wilber',
    imageUrl: '../assets/img/courses/Marketing.png',
  },
  {
    id: 2,
    courseName: 'Design',
    coachName: 'Tom Smith',
    imageUrl: '../assets/img/courses/Design.png',
  },
  {
    id: 3,
    courseName: 'Management',
    coachName: 'Sarah Coleman',
    imageUrl: '../assets/img/courses/Management.png',
  },
  {
    id: 4,
    courseName: 'HTML&CSS',
    coachName: 'David Can',
    imageUrl: '../assets/img/courses/HTML&CSS.png',
  },
  {
    id: 5,
    courseName: 'Java',
    coachName: 'Emily Hill',
    imageUrl: '../assets/img/courses/Java.png',
  },
];

export const getCourses = async (currentPage) => {
  //      let res = await request(``, 'Get');
  let arr = [];
  arr.push(
    ...initialCourses.slice(
      0,
      currentPage * numberCoursesToShow + numberCoursesToShow
    )
  );

  return arr;
};
