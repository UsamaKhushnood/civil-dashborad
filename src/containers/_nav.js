export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        // badge: {
        //   color: 'primary',
        //   text: 'NEW'
        // }
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Users',
        to: '/users',
        icon: 'cil-people',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Students',
        to: '/students',
        icon: 'cil-contact',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Trainers',
        to: '/trainers',
        icon: 'cil-user',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Categories',
        to: '/categories',
        icon: 'cil-list',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Courses',
        to: '/courses',
        icon: 'cil-tag',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Jobs Management',
        to: '/jobs',
        icon: 'cil-check-circle',
      },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Category Requests',
      //   to: '/category-requests',
      //   icon: 'cil-bell',
      // },
      {
        _name: 'CSidebarNavItem',
        name: 'Transaction History',
        to: '/transaction-history',
        icon: 'cil-dollar',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'User Tests',
        to: '/user-tests',
        icon: 'cil-task',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Notifications',
        to: '/notifications',
        icon: 'cil-bell',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Promotions',
        to: '/promotions',
        icon: 'cil-drop',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Special Offers',
        to: '/special-offers',
        icon: 'cil-basket',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Documents',
        to: '/documents',
        icon: 'cil-list',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Site Settings',
        to: '/site-settings',
        icon: 'cil-settings',
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Website Pages',
        icon: 'cil-globe-alt',
        items: [
          {
            name: 'Header',
            to: '/header',
            icon: 'cil-chevron-top',
          },
          {
            name: 'Home',
            to: '/home',
            icon: 'cil-home',
          },
          {
            name: 'About',
            to: '/about',
            icon: 'cil-people',
          },
          {
            name: 'Contact',
            to: '/contact',
            icon: 'cil-contact',
          },
          {
            name: 'Gallery',
            to: '/gallery',
            icon: 'cil-comment-square',
          },
          // {
          //   name: 'Blogs',
          //   to: '/blogs',
          //   icon: 'cil-comment-square',
          // },
          {
            name: 'Footer',
            to: '/footer',
            icon: 'cil-chevron-bottom',
          },
        ]
      },
      
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Blog Categories',
      //   to: '/blog-categories',
      //   icon: 'cil-tag',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Blogs',
      //   to: '/blogs',
      //   icon: 'cil-newspaper',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Media',
      //   to: '/media',
      //   icon: 'cil-movie',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Currency',
      //   to: '/currencies',
      //   icon: 'cil-dollar',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Events',
      //   to: '/events',
      //   icon: 'cil-calendar',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Team',
      //   to: '/teams',
      //   icon: 'cil-users',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Branches',
      //   to: '/branches',
      //   icon: 'cil-building',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Contacts',
      //   to: '/contacts',
      //   icon: 'cil-address-book',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'About',
      //   to: '/about',
      //   icon: 'cil-contact',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Services',
      //   to: '/services',
      //   icon: 'cil-settings',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Testimonials',
      //   to: '/testimonials',
      //   icon: 'cil-star',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Sliders',
      //   to: '/sliders',
      //   icon: 'cil-star',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Charts',
      //   to: '/charts',
      //   icon: 'cil-chart-pie'
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Icons',
      //   route: '/icons',
      //   icon: 'cil-star',
      //   items: [
      //     {
      //       name: 'CoreUI Icons',
      //       to: '/icons/coreui-icons',
      //       badge: {
      //         color: 'info',
      //         text: 'NEW'
      //       }
      //     },
      //     {
      //       name: 'Brands',
      //       to: '/icons/brands'
      //     },
      //     {
      //       name: 'Flags',
      //       to: '/icons/flags'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Notifications',
      //   route: '/notifications',
      //   icon: 'cil-bell',
      //   items: [
      //     {
      //       name: 'Alerts',
      //       to: '/notifications/alerts'
      //     },
      //     {
      //       name: 'Badges',
      //       to: '/notifications/badges'
      //     },
      //     {
      //       name: 'Modals',
      //       to: '/notifications/modals'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Widgets',
      //   to: '/widgets',
      //   icon: 'cil-calculator',
      //   badge: {
      //     color: 'primary',
      //     text: 'NEW',
      //     shape: 'pill'
      //   }
      // },
      // {
      //   _name: 'CSidebarNavDivider',
      //   _class: 'm-2'
      // },
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Extras']
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Pages',
      //   route: '/pages',
      //   icon: 'cil-star',
      //   items: [
      //     {
      //       name: 'Login',
      //       to: '/pages/login'
      //     },
      //     {
      //       name: 'Register',
      //       to: '/pages/register'
      //     },
      //     {
      //       name: 'Error 404',
      //       to: '/pages/404'
      //     },
      //     {
      //       name: 'Error 500',
      //       to: '/pages/500'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Download CoreUI',
      //   href: 'http://coreui.io/vue/',
      //   icon: { name: 'cil-cloud-download', class: 'text-white' },
      //   _class: 'bg-success text-white',
      //   target: '_blank'
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Try CoreUI PRO',
      //   href: 'http://coreui.io/pro/vue/',
      //   icon: { name: 'cil-layers', class: 'text-white' },
      //   _class: 'bg-danger text-white',
      //   target: '_blank'
      // }
    ]
  }
]