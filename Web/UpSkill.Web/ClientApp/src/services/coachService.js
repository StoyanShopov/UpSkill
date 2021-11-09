import axios from "axios";

const numberCoachesToShow = 6;

const OWN_API_URL = "https://localhost:44319/Owner/Coaches";
//const API_URL = Base_URL + "Owner/Coaches/";

const numberCoachesSessionsToShow = 3;

const token = localStorage.getItem("token");

const activeCoachesCompanyOwnerCount = 3;

const initialCoachesMock = [
  {
    id: "1",
    fullName: "Anne Foster",
    coachField: "Leadership ",
    company: "Google",
    price: 50,
    imageUrl:
      "https://i.guim.co.uk/img/uploads/2017/10/09/Sonia_Sodha,_L.png?width=300&quality=85&auto=format&fit=max&s=045793b916f0ff6e7228468ca6aa61c5",
  },
  {
    id: "2",
    fullName: "Philipa Key",
    coachField: "Nutrition",
    company: "Amazon",
    price: 60,
    imageUrl: "https://static.independent.co.uk/s3fs-public/Rachel_Hosie.png",
  },
  {
    id: "3",
    fullName: "Jenna Jameson",
    coachField: "Management",
    company: "Google",
    price: 80,
    imageUrl:
      "https://i.guim.co.uk/img/uploads/2017/10/06/Laura-Bates,-L.png?width=300&quality=85&auto=format&fit=max&s=0349fb29cd3cef227473ea2c4dd11b2f",
  },
  {
    id: "4",
    fullName: "Brent Foster",
    coachField: "Leadership",
    company: "Google",
    price: 50,
    imageUrl:
      "https://secure.gravatar.com/avatar/03fd0c159222fdf134fe37e9a8b74f0e?s=400&d=mm&r=g",
  },
  {
    id: "5",
    fullName: "Jimmy Hanks",
    coachField: "Art",
    company: "Google",
    price: 100,
    imageUrl:
      "http://www.lukasman.cz/wp-content/uploads/2020/09/foto-homepage-1-1024x549.png",
  },
  {
    id: "6",
    fullName: "Ben Levis",
    coachField: "Management",
    company: "Google",
    price: 60,
    imageUrl:
      "https://www.freepnglogos.com/uploads/man-png/man-your-company-formations-formation-registrations-10.png",
  },
  {
    id: "7",
    fullName: "Emma Milton",
    coachField: "Nutrition",
    company: "Google",
    price: 40,
    imageUrl: "https://www.g20.org/wp-content/uploads/2021/01/people.jpg",
  },
];

const coachesCompanyOwnerMock = [
  {
    id: "8",
    name: "August",
    coaches: [
      { name: "Brent Foster", enrolled: 3 },
      { name: "Phillip Pena", enrolled: 15 },
      { name: "Veronica Casey", enrolled: 2 },
      { name: "Sara Dean", enrolled: 5 },
      { name: "John Brown", enrolled: 1 },
    ],
  },
  {
    id: "9",
    name: "September",
    coaches: [
      { name: "Veronica Casey", enrolled: 8 },
      { name: "Phillip Pena", enrolled: 4 },
      { name: "John Brown", enrolled: 3 },
      { name: "Sara Dean", enrolled: 9 },
    ],
  },
  {
    id: "10",
    name: "October",
    coaches: [
      { name: "Sara Dean", enrolled: 9 },
      { name: "Brent Foster", enrolled: 1 },
      { name: "John Brown", enrolled: 3 },
    ],
  },
];

// export const getCoaches = async (currentPage) => {
//   let arr = [];
//   arr.push(...initialCoachesMock);
//   // .slice(0, currentPage * numberCoachesToShow + numberCoachesToShow));
//   return arr;
// };

export const getAllCoaches = async (currentPage) => {
  try {
    let arr = [];
    const resp = await axios.get(OWN_API_URL + "/getAllGlobal", {
      headers: { Authorization: `Bearer ${token}` },
    });
    let transformedResp=resp.data.map( c => {
      return {
        id: c.id,
        coachFirstName: c.firstName,
        coachLastName: c.lastName,
        coachFileFilePath: c.fileFilePath,
        coachPrice: 0
      }
    })
    console.log(transformedResp);
    arr.push(...transformedResp);
    //arr= arr.slice(0, currentPage * numberCoachesToShow + numberCoachesToShow);
    return arr;
  } catch (err) {}
};

export const getCoaches = async (currentPage) => {
  try {
    let arr = [];
    const resp = await axios.get(OWN_API_URL + "/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(resp.data);
    arr.push(...resp.data);
    //arr= arr.slice(0, currentPage * numberCoachesToShow + numberCoachesToShow);
    return arr;
  } catch (err) {}
};

export const removeCoach = async (coachId) => {
  console.log(coachId);
  try {
    const resp = await axios.delete(OWN_API_URL + "?id=" + coachId, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return resp;
  } catch (err) {}
};

export const addCoach = async (userEmail, coachId, companyId) => {
  try {
    const resp = await axios.put(
      OWN_API_URL,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      {
        userEmail,
        coachId,
        companyId,
      }
    );
    return resp;
  } catch (err) {}
};

export const getCoachesNames = async (currentPage) => {
  let arr = [];
  initialCoachesMock.map((c) => {
    let objectReturn = { label: c.fullName, value: c.id };
    arr.push(objectReturn);
  });
  // .slice(0, currentPage * numberCoachesToShow + numberCoachesToShow));
  return arr;
};

export const getActiveCoachesCompanyOwner = async (uId) => {
  return activeCoachesCompanyOwnerCount;
};

export const getCoachesSessionsForCompanyOwner = async (
  uId,
  currentPage,
  currentMount
) => {
  let mount = coachesCompanyOwnerMock.filter((m) => m.id == currentMount)[0];
  let arr = mount.coaches.slice(
    0,
    currentPage * numberCoachesSessionsToShow + numberCoachesSessionsToShow
  );

  return [mount.name, arr];
};
