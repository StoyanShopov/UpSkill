import axios from 'axios';

const OWN_API_URL = 'https://localhost:44319/Owner/Courses/';

const token = localStorage.getItem('token');

const numberCoursesToShow = 3;

const coursesCompanyOwnerMock = [
  {
    id: '8',
    name: 'August',
    courses: [
      { name: 'Python', enrolled: 6 },
      { name: 'Ruby', enrolled: 5 },
      { name: 'C++', enrolled: 18 },
      { name: 'C#', enrolled: 5 },
      { name: 'Java', enrolled: 3 },
    ],
  },
  {
    id: '9',
    name: 'September',
    courses: [
      { name: 'HTML', enrolled: 4 },
      { name: 'CSS', enrolled: 7 },
      { name: 'JS', enrolled: 13 },
      { name: 'C#', enrolled: 8 },
    ],
  },
  {
    id: '10',
    name: 'October',
    courses: [
      { name: 'TypeScript', enrolled: 9 },
      { name: 'Java', enrolled: 1 },
      { name: 'JS', enrolled: 3 },
    ],
  },
];

export const getActiveCoursesCompanyOwner = async (uId) => {
  return axios
    .get(OWN_API_URL + 'count', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data.count;
    });
};

export const getCoursesForCompanyOwner = async (
  uId,
  currentPage,
  currentMonth
) => {
  let month = coursesCompanyOwnerMock.filter((m) => m.id == currentMonth)[0];
  let arr = month.courses.slice(
    0,
    currentPage * numberCoursesToShow + numberCoursesToShow
  );

  return [month.name, arr];
};
