const numberEmployeesToShow = 3;

const employeesEmailMock =
        [
        {id:'u23xzcxzx', name:'Vincent Williamson', email:'Vincent.Williamson@mail.com', hours:'2'},
        {id:'u23dxzdc', name:'Joseph Smith', email:'JosephSmith@motion-software.com', hours:'1'},
        {id:'u233443', name:'Justin Black', email:'JustinBlack@mail.com', hours:'1'},
        {id:'u23vcxcv', name:'Sean Guzman', email:'Sean.Guzman@mail.com', hours:'2'},
        {id:'u23rtrt', name:'Keith Carter', email:'GraphicDesigner@mail.com', hours:'2'},
        {id:'u23xcfvx', name:'William James', email:'LifeManagement@mail.com', hours:'2'},
        {id:'u23fgfgd', name:'Cent Yiamson', email:'TimeManagement@mail.com', hours:'2'},
        {id:'u234354', name:'Agent Smith', email:'GroupLife@mail.com', hours:'1'},
        {id:'u23dfdsf', name:'Justin Carter', email:'Leadership@mail.com', hours:'1'},
    ];

export const getEmployeeWithEmail = async (currentPage) => {
//      let res = await request(``, 'Get');
        let arr = [];
        arr.push(...employeesEmailMock
            .slice(0, currentPage * numberEmployeesToShow + numberEmployeesToShow));    
        
       return arr;
}
