Schema Design 2.0 :
{
    name: '',
    attributes: {}
    children: [
        {
            name: 'Banner',
            attributes: {
                title:
                description:
                showSmallPic:
                smallPicUrl:
                backgroundUrl:
                backgroundHeight:
            }
            children: []
        },{
            name: 'List',
            attributes: {}
            children: []
        },{
            name: 'Footer',
            attributes: {}
            children: []
        }
    ]
}


Schema Design 1.0 :
{
    name: 'page',
    attributes: {
        title: 'title',
        description: 'description'
    }
    children: [
        {
            name: 'CourseList',
            attributes: {}
            children: [
                {
                    name: 'Course',
                    attributes: {
                        title: ....,
                        description: ....
                        link: ....
                    }
                }
            ]
        }
    ]
}



