const numberEmployeesToShow = 3;

const employeesCoachMock =
        [
        {id:'u23xzcxzx', name:'Vincent Williamson', coach:'Time Management', hours:'2'},
        {id:'u23dxzdc', name:'Joseph Smith', coach:'Group Life', hours:'1'},
        {id:'u233443', name:'Justin Black', coach:'Leadership', hours:'1'},
        {id:'u23vcxcv', name:'Sean Guzman', coach:'Web Designer', hours:'2'},
        {id:'u23rtrt', name:'Keith Carter', coach:'Graphic Designer', hours:'2'},
        {id:'u23xcfvx', name:'William James', coach:'Life Management', hours:'2'},
        {id:'u23fgfgd', name:'Cent Yiamson', coach:'Time Management', hours:'2'},
        {id:'u234354', name:'Agent Smith', coach:'Group Life', hours:'1'},
        {id:'u23dfdsf', name:'Justin Carter', coach:'Leadership', hours:'1'},
    ];

const employeesCoursesMock =
        [
        {id:'u23xzcxzx', name:'Vincent Williamson', coach:'Time Management', hours:'2'},
        {id:'u23dxzdc', name:'Joseph Smith', coach:'Group Life', hours:'1'},
        {id:'u233443', name:'Justin Black', coach:'Leadership', hours:'1'},
        {id:'u23vcxcv', name:'Sean Guzman', coach:'Web Designer', hours:'2'},
        {id:'u23rtrt', name:'Keith Carter', coach:'Graphic Designer', hours:'2'},
        {id:'u23xcfvx', name:'William James', coach:'Life Management', hours:'2'},
        {id:'u23fgfgd', name:'Cent Yiamson', coach:'Time Management', hours:'2'},
        {id:'u234354', name:'Agent Smith', coach:'Group Life', hours:'1'},
        {id:'u23dfdsf', name:'Justin Carter', coach:'Leadership', hours:'1'},
    ];

export const getEmployeesCourseGrade = async (currentPage) => {
//      let res = await request(``, 'Get');
        let arr = [];
        arr.push(...employeesCoachMock
            .slice(0, currentPage * numberEmployeesToShow + numberEmployeesToShow));    
        
       return arr;
}

export const getEmployeesCoachHours = async (currentPage) => {
    //      let res = await request(``, 'Get');        
        let arr = [];
        arr.push(...employeesCoursesMock
            .slice(0, currentPage * numberEmployeesToShow + numberEmployeesToShow));    
        
       return arr;
}
