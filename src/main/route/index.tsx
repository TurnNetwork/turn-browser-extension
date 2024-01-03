import React,{lazy} from 'react'

const LayoutPage = lazy(() => import('../components/Layout'))
const WelcomePage = lazy(() => import("../pages/welcome"))
const ErrorPage = lazy(() => import("../../common/Error"))
const HomePage = lazy(() => import("./../pages/home/Home"))
const ImportPage = lazy(() => import("./../pages/import"))
const CreatePage = lazy(() => import("./../pages/create"))
const DappPage = lazy(() => import("./../pages/dapp"))
const ActivityPage = lazy(() => import("./../pages/activity"))
const ToBeConfirmed = lazy(() => import("./../pages/toBeConfirmed"))
const Unlock = lazy(() => import("./../pages/Unlock"))

export const routes:any = [
    { path: "/",
      element: <LayoutPage />,
      children: [
         { 
          path: "home", 
          element: <HomePage />
         },
         { 
          path: "dapp", 
          element: <DappPage />
         },
         { 
          path: "activity", 
          element: <ActivityPage />
         }
      ]
    },
    {
      path: "/welcome",
      element: <WelcomePage />
    },
    {
      path: "/unlock",
      element: <Unlock />
    },
    {
      path: "/import",
      element: <ImportPage />
    },
    {
      path: "/create",
      element: <CreatePage />
    },
    {
      path: "/toBeConfirmed",
      element: <ToBeConfirmed />
    },
    {
      path: "*",
      element: <ErrorPage />
    },

]