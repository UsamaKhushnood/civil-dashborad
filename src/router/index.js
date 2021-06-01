import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

// Containers
const TheContainer = () =>
    import ('@/containers/TheContainer')

// // Views
const Dashboard = () =>
    import ('@/pages/Dashboard')

// const Colors = () => import('@/views/theme/Colors')
// const Typography = () => import('@/views/theme/Typography')

// const Charts = () => import('@/views/charts/Charts')
// const Widgets = () => import('@/views/widgets/Widgets')


// // Views - Pages
const Page404 = () =>
    import ('@/views/pages/Page404')
const Page500 = () =>
    import ('@/views/pages/Page500')
    // const Login = () => import('@/views/pages/Login')
const Register = () =>
    import ('@/views/pages/Register')

import Login from "@/pages/Login.vue";
import Users from "@/pages/Users.vue";
import CreateUser from "@/pages/CreateUser.vue";
import Students from "@/pages/Students.vue";
import CreateStudent from "@/pages/CreateStudent.vue";
import Trainers from "@/pages/Trainers.vue";
import CreateTrainer from "@/pages/CreateTrainer.vue";
import EditUser from "@/pages/EditUser.vue";
import EditStudent from "@/pages/EditStudent.vue";
import EditTrainer from "@/pages/EditTrainer.vue";
import Categories from "@/pages/Categories.vue";
import CategoryRequests from "@/pages/CategoryRequests.vue";
import Courses from "@/pages/Courses.vue";
import Course from "@/pages/Course.vue";
import CourseReviews from "@/pages/CourseReviews.vue";
import CourseTests from "@/pages/CourseTests.vue";
import CourseQuestions from "@/pages/CourseQuestions.vue";
import CreateCourse from "@/pages/CreateCourse.vue";
import EditCourse from "@/pages/EditCourse.vue";
import TransactionHistory from "@/pages/TransactionHistory.vue";
import Jobs from "@/pages/Jobs.vue";
import Contact from "@/pages/Contact.vue";
import About from "@/pages/About.vue";
import Blogs from "@/pages/Blogs.vue";
import Gallery from "@/pages/Gallery.vue";
import Header from "@/pages/Header.vue";
import EditDocument from "@/pages/EditDocument.vue";

import HomePage from "@/pages/HomePage.vue";
import UserTests from "@/pages/UserTests.vue"
import Footer from "@/pages/Footer.vue";
import SiteSettings from "@/pages/SiteSettings.vue";
import Documents from "@/pages/Documents.vue";
import Notifications from "@/pages/Notifications.vue";
import Promotions from "@/pages/Promotions.vue";
import SpecialOffers from "@/pages/SpecialOffers.vue";
import CreateOffer from "@/pages/CreateOffer.vue";
import EditOffer from "@/pages/EditOffer.vue";
import ChatHistory from '@/pages/ChatHistory.vue'
import Chat from '@/pages/Chat.vue'
import RatingHistory from '@/pages/RatingHistory.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})

function configRoutes() {
    return [
        { path: "/login", component: Login },
        {
            path: '/',
            redirect: '/dashboard',
            name: 'Home',
            component: TheContainer,
            children: [{
                        path: "dashboard",
                        name: "dashboard",
                        component: Dashboard,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "notifications",
                        name: "notifications",
                        component: Notifications,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "promotions",
                        name: "promotions",
                        component: Promotions,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "special-offers",
                        name: "special offers",
                        component: SpecialOffers,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "create-offer",
                        name: "create offer",
                        component: CreateOffer,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "edit-offer/:id",
                        name: "edit offer",
                        component: EditOffer,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "site-settings",
                        name: "site settings",
                        component: SiteSettings,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "documents",
                        name: "documents",
                        component: Documents,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "home",
                        name: "home",
                        component: HomePage,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "user-tests",
                        name: "user tests",
                        component: UserTests,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "users",
                        name: "users",
                        component: Users,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "create-user",
                        name: "create user",
                        component: CreateUser,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "students",
                        name: "students",
                        component: Students,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    // {
                    //   path: "create-student",
                    //   name: "create student",
                    //   component: CreateStudent,
                    //   meta: {
                    //     requireAuth: true,
                    //   },
                    // },
                    {
                        path: "trainers",
                        name: "trainers",
                        component: Trainers,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    // {
                    //   path: "create-trainer",
                    //   name: "create trainer",
                    //   component: CreateTrainer,
                    //   meta: {
                    //     requireAuth: true,
                    //   },
                    // },
                    {
                        path: "edit-user/:id",
                        name: "edit user",
                        component: EditUser,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "edit-document/:id",
                        name: "edit doument",
                        component: EditDocument,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "edit-student/:id",
                        name: "edit student",
                        component: EditStudent,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "edit-trainer/:id",
                        name: "edit trainer",
                        component: EditTrainer,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "transaction-history",
                        name: "transaction history",
                        component: TransactionHistory,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "categories",
                        name: "categories",
                        component: Categories,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    // {
                    //   path: "category-requests",
                    //   name: "category requests",
                    //   component: CategoryRequests,
                    //   meta: {
                    //     requireAuth: true,
                    //   },
                    // },
                    {
                        path: "courses",
                        name: "courses",
                        component: Courses,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "course/:id",
                        name: "course",
                        component: Course,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "course/:id/reviews",
                        name: "course reviews",
                        component: CourseReviews,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "course/:id/tests",
                        name: "course tests",
                        component: CourseTests,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "course/:id/questions",
                        name: "course questions",
                        component: CourseQuestions,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "create-course",
                        name: "create course",
                        component: CreateCourse,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "edit-course/:id",
                        name: "edit course",
                        component: EditCourse,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "jobs",
                        name: "jobs",
                        component: Jobs,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "chat-history",
                        name: "Chat History",
                        component: ChatHistory,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "chat/:id",
                        name: "Chat History",
                        component: Chat,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "rating-history",
                        name: "Rating History",
                        component: RatingHistory,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "contact",
                        name: "contact",
                        component: Contact,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "about",
                        name: "about",
                        component: About,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "Gallery",
                        name: "gallery",
                        component: Gallery,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "blogs",
                        name: "blogs",
                        component: Blogs,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "header",
                        name: "header",
                        component: Header,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    {
                        path: "footer",
                        name: "footer",
                        component: Footer,
                        meta: {
                            requireAuth: true,
                        },
                    },
                    // {
                    //   path: "contacts",
                    //   name: "contacts",
                    //   component: Contacts
                    // },
                    // {
                    //   path: "about",
                    //   name: "About Us",
                    //   component: About
                    // },
                    // {
                    //   path: "create-about",
                    //   name: "Create About Us",
                    //   component: CreateAbout
                    // },
                    // {
                    //   path: "edit-about/:id",
                    //   name: "Edit About Us",
                    //   component: EditAbout
                    // },
                    // {
                    //   path: "blogs",
                    //   name: "Blogs",
                    //   component: Blogs
                    // },
                    // {
                    //   path: "create-blog",
                    //   name: "Create Blog",
                    //   component: CreateBlog
                    // },
                    // {
                    //   path: "edit-blog/:id",
                    //   name: "Edit Blog",
                    //   component: EditBlog
                    // },
                    // {
                    //   path: "media",
                    //   name: "media",
                    //   component: Media
                    // },
                    // {
                    //   path: "create-media",
                    //   name: "Create media",
                    //   component: CreateMedia
                    // },
                    // {
                    //   path: "edit-media/:id",
                    //   name: "Edit media",
                    //   component: EditMedia
                    // },
                    // {
                    //   path: "currencies",
                    //   name: "currencies",
                    //   component: Currencies
                    // },
                    // {
                    //   path: "sliders",
                    //   name: "sliders",
                    //   component: Sliders
                    // },
                    // {
                    //   path: "create-slider",
                    //   name: "Create slider",
                    //   component: CreateSlider
                    // },
                    // {
                    //   path: "edit-slider/:id",
                    //   name: "Edit slider",
                    //   component: EditSlider
                    // },
                    // {
                    //   path: "create-currency",
                    //   name: "Create currency",
                    //   component: CreateCurrency
                    // },
                    // {
                    //   path: "edit-currency/:id",
                    //   name: "Edit currency",
                    //   component: EditCurrency
                    // },
                    // {
                    //   path: "testimonials",
                    //   name: "testimonials",
                    //   component: Testimonials
                    // },
                    // {
                    //   path: "create-testimonial",
                    //   name: "create testimonial",
                    //   component: CreateTestimonial
                    // },
                    // {
                    //   path: "edit-testimonial/:id",
                    //   name: "edit testimonial",
                    //   component: EditTestimonial
                    // },
                    // {
                    //   path: "services",
                    //   name: "services",
                    //   component: Services
                    // },
                    // {
                    //   path: "create-service",
                    //   name: "create service",
                    //   component: CreateService
                    // },
                    // {
                    //   path: "edit-service/:id",
                    //   name: "edit service",
                    //   component: EditService
                    // },
                    // {
                    //   path: "branches",
                    //   name: "Branches",
                    //   component: Branches
                    // },
                    // {
                    //   path: "create-branch",
                    //   name: "Create Branch",
                    //   component: CreateBranch
                    // },
                    // {
                    //   path: "edit-branch/:id",
                    //   name: "Edit Branch",
                    //   component: EditBranch
                    // },
                    // {
                    //   path: "create-manufacturer",
                    //   name: "create manufacturer",
                    //   component: CreateManufacturer
                    // },
                    // {
                    //   path: "edit-manufacturer/:id",
                    //   name: "edit manufacturer",
                    //   component: EditManufacturer
                    // },
                    // {
                    //   path: "create-partner",
                    //   name: "create partner",
                    //   component: CreatePartner
                    // },
                    // {
                    //   path: "create-product-category",
                    //   name: "create product category",
                    //   component: CreateProductCategory
                    // },
                    // {
                    //   path: "create-product-sub-category",
                    //   name: "create product sub category",
                    //   component: CreateProductSubCategory
                    // },
                    // {
                    //   path: "edit-product-category/1",
                    //   name: "edit product category",
                    //   component: EditProductCategory
                    // },
                    // {
                    //   path: "edit-product-sub-category/1",
                    //   name: "edit product sub category",
                    //   component: EditProductSubCategory
                    // },
                    // {
                    //   path: "edit-partner/:id",
                    //   name: "edit partner",
                    //   component: EditPartner
                    // },
                    // {
                    //   path: "teams",
                    //   name: "Team",
                    //   component: Teams
                    // },
                    // {
                    //   path: "create-member",
                    //   name: "Create Team Member",
                    //   component: CreateMember
                    // },
                    // {
                    //   path: "edit-member/:id",
                    //   name: "Edit Team Member",
                    //   component: EditMember
                    // },
                    // {
                    //   path: "events",
                    //   name: "Events",
                    //   component: Events
                    // },
                    // {
                    //   path: "create-event",
                    //   name: "Create Event",
                    //   component: CreateEvent
                    // },
                    // {
                    //   path: "edit-event/:id",
                    //   name: "Edit Event",
                    //   component: EditEvent
                    // },
                    // {
                    //   path: "event-details/:id",
                    //   name: "Event Details",
                    //   component: EventDetails
                    // },
                    // {
                    //   path: "blog-categories",
                    //   name: "blog categories",
                    //   component: BlogCategories
                    // },
                    // {
                    //   path: "create-blog-category",
                    //   name: "create blog category",
                    //   component: CreateBlogCategory
                    // },
                    // {
                    //   path: "edit-blog-category/:id",
                    //   name: "edit blog category",
                    //   component: EditBlogCategory
                    // },
                    // {
                    //   path: "product-categories",
                    //   name: "product categories",
                    //   component: ProductCategories
                    // },
                    // {
                    //   path: "product-sub-categories",
                    //   name: "product sub categories",
                    //   component: ProductSubCategories
                    // },
                    // {
                    //   path: "products",
                    //   name: "products",
                    //   component: Products
                    // },
                    // {
                    //   path: "product/:id/accessories",
                    //   name: "product accessories",
                    //   component: ProductAccessories
                    // },
                    // {
                    //   path: "product/:id/documents",
                    //   name: "product documents",
                    //   component: ProductDocuments
                    // },
                    // {
                    //   path: "create-product",
                    //   name: "create product",
                    //   component: CreateProduct
                    // },
                    // {
                    //   path: "edit-product/:id",
                    //   name: "edit product",
                    //   component: EditProduct
                    // },
                    // {
                    //   path: "manufacturers",
                    //   name: "manufacturers",
                    //   component: Manufacturers
                    // },
                    // {
                    //   path: "partners",
                    //   name: "partners",
                    //   component: Partners
                    // },
                ]
                // children: [
                //   {
                //     path: 'dashboard',
                //     name: 'Dashboard',
                //     component: Dashboard
                //   },
                //   {
                //     path: 'theme',
                //     redirect: '/theme/colors',
                //     name: 'Theme',
                //     component: {
                //       render (c) { return c('router-view') }
                //     },
                //     children: [
                //       {
                //         path: 'colors',
                //         name: 'Colors',
                //         component: Colors
                //       },
                //       {
                //         path: 'typography',
                //         name: 'Typography',
                //         component: Typography
                //       }
                //     ]
                //   },
                //   {
                //     path: 'charts',
                //     name: 'Charts',
                //     component: Charts
                //   },
                //   {
                //     path: 'widgets',
                //     name: 'Widgets',
                //     component: Widgets
                //   },
                //   {
                //     path: 'users',
                //     meta: {
                //       label: 'Users'
                //     },
                //     component: {
                //       render(c) {
                //         return c('router-view')
                //       }
                //     },
                //     children: [
                //       {
                //         path: '',
                //         name: 'Users',
                //         component: Users
                //       },
                //       {
                //         path: ':id',
                //         meta: {
                //           label: 'User Details'
                //         },
                //         name: 'User',
                //         component: User
                //       }
                //     ]
                //   },
                //   {
                //     path: 'base',
                //     redirect: '/base/cards',
                //     name: 'Base',
                //     component: {
                //       render (c) { return c('router-view') }
                //     },
                //     children: [
                //       {
                //         path: 'cards',
                //         name: 'Cards',
                //         component: Cards
                //       },
                //       {
                //         path: 'forms',
                //         name: 'Forms',
                //         component: Forms
                //       },
                //       {
                //         path: 'switches',
                //         name: 'Switches',
                //         component: Switches
                //       },
                //       {
                //         path: 'tables',
                //         name: 'Tables',
                //         component: Tables
                //       },
                //       {
                //         path: 'tabs',
                //         name: 'Tabs',
                //         component: Tabs
                //       },
                //       {
                //         path: 'breadcrumbs',
                //         name: 'Breadcrumbs',
                //         component: Breadcrumbs
                //       },
                //       {
                //         path: 'carousels',
                //         name: 'Carousels',
                //         component: Carousels
                //       },
                //       {
                //         path: 'collapses',
                //         name: 'Collapses',
                //         component: Collapses
                //       },
                //       {
                //         path: 'jumbotrons',
                //         name: 'Jumbotrons',
                //         component: Jumbotrons
                //       },
                //       {
                //         path: 'list-groups',
                //         name: 'List Groups',
                //         component: ListGroups
                //       },
                //       {
                //         path: 'navs',
                //         name: 'Navs',
                //         component: Navs
                //       },
                //       {
                //         path: 'navbars',
                //         name: 'Navbars',
                //         component: Navbars
                //       },
                //       {
                //         path: 'paginations',
                //         name: 'Paginations',
                //         component: Paginations
                //       },
                //       {
                //         path: 'popovers',
                //         name: 'Popovers',
                //         component: Popovers
                //       },
                //       {
                //         path: 'progress-bars',
                //         name: 'Progress Bars',
                //         component: ProgressBars
                //       },
                //       {
                //         path: 'tooltips',
                //         name: 'Tooltips',
                //         component: Tooltips
                //       }
                //     ]
                //   },
                //   {
                //     path: 'buttons',
                //     redirect: '/buttons/standard-buttons',
                //     name: 'Buttons',
                //     component: {
                //       render (c) { return c('router-view') }
                //     },
                //     children: [
                //       {
                //         path: 'standard-buttons',
                //         name: 'Standard Buttons',
                //         component: StandardButtons
                //       },
                //       {
                //         path: 'button-groups',
                //         name: 'Button Groups',
                //         component: ButtonGroups
                //       },
                //       {
                //         path: 'dropdowns',
                //         name: 'Dropdowns',
                //         component: Dropdowns
                //       },
                //       {
                //         path: 'brand-buttons',
                //         name: 'Brand Buttons',
                //         component: BrandButtons
                //       }
                //     ]
                //   },
                //   {
                //     path: 'icons',
                //     redirect: '/icons/coreui-icons',
                //     name: 'CoreUI Icons',
                //     component: {
                //       render (c) { return c('router-view') }
                //     },
                //     children: [
                //       {
                //         path: 'coreui-icons',
                //         name: 'Icons library',
                //         component: CoreUIIcons
                //       },
                //       {
                //         path: 'brands',
                //         name: 'Brands',
                //         component: Brands
                //       },
                //       {
                //         path: 'flags',
                //         name: 'Flags',
                //         component: Flags
                //       }
                //     ]
                //   },
                //   {
                //     path: 'notifications',
                //     redirect: '/notifications/alerts',
                //     name: 'Notifications',
                //     component: {
                //       render (c) { return c('router-view') }
                //     },
                //     children: [
                //       {
                //         path: 'alerts',
                //         name: 'Alerts',
                //         component: Alerts
                //       },
                //       {
                //         path: 'badges',
                //         name: 'Badges',
                //         component: Badges
                //       },
                //       {
                //         path: 'modals',
                //         name: 'Modals',
                //         component: Modals
                //       }
                //     ]
                //   }
                // ]
        },
        {
            path: '/pages',
            redirect: '/pages/404',
            name: 'Pages',
            component: {
                render(c) { return c('router-view') }
            },
            children: [{
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register
                }
            ]
        }
    ]
}
router.beforeEach((to, from, next) => {
    let token = JSON.parse(JSON.stringify(sessionStorage.getItem('setToken')));
    if (to.meta.requireAuth) {
        if (token != null) {
            store.commit("setToken", token);
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
})
export default router;