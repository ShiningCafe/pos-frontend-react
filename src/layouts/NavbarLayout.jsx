import { useEffect } from 'react';
// import logoSvg from '../images/logo.svg'
import logoPng from '../images/logo.png'
// import userPng from '../images/user.png'
// import LayoutDropdown from './LayoutDropdown';
import { Badge, Button } from 'flowbite-react'
import { Offline, Online } from "react-detect-offline";
import { useState } from 'react';

function NavbarLayout () {
  
  useEffect(() => {
    const isSidebarExpanded = toggleSidebarEl => {
      return toggleSidebarEl.getAttribute('aria-expanded') === 'true' ? true : false;
    }
    
    const toggleSidebar = (sidebarEl, expand, setExpanded = false) => {
      // const bottomMenuEl = document.querySelector('[sidebar-bottom-menu]');
      const mainContentEl = document.getElementById('main-content');
      if (expand) {
          sidebarEl.classList.add('lg:w-64');
          sidebarEl.classList.remove('lg:w-16');
          mainContentEl.classList.add('lg:ml-64');
          mainContentEl.classList.remove('lg:ml-16');
    
          document.querySelectorAll('#' + sidebarEl.getAttribute('id') + ' [sidebar-toggle-item]').forEach(sidebarToggleEl => {
              sidebarToggleEl.classList.remove('lg:hidden');
              sidebarToggleEl.classList.remove('lg:absolute');
          });
    
          // toggle multi level menu item initial and full text
          document.querySelectorAll('#' + sidebar.getAttribute('id') + ' ul > li > ul > li > a').forEach(e => {
              e.classList.add('pl-11');
              e.classList.remove('px-4');
              e.childNodes[0].classList.remove('hidden');
              e.childNodes[1].classList.add('hidden');
          });
    
          // bottomMenuEl.classList.remove('flex-col', 'space-y-4', 'p-2');
          // bottomMenuEl.classList.add('space-x-4', 'p-4');
          setExpanded ? toggleSidebarEl.setAttribute('aria-expanded', 'true') : null;
      } else {
          sidebarEl.classList.remove('lg:w-64');
          sidebarEl.classList.add('lg:w-16');
          mainContentEl.classList.remove('lg:ml-64');
          mainContentEl.classList.add('lg:ml-16');
          document.querySelectorAll('#' + sidebarEl.getAttribute('id') + ' [sidebar-toggle-item]').forEach(sidebarToggleEl => {
              sidebarToggleEl.classList.add('lg:hidden');
              sidebarToggleEl.classList.add('lg:absolute');
          });
    
          // toggle multi level menu item initial and full text
          document.querySelectorAll('#' + sidebar.getAttribute('id') + ' ul > li > ul > li > a').forEach(e => {
              e.classList.remove('pl-11');
              e.classList.add('px-4');
              e.childNodes[0].classList.add('hidden');
              e.childNodes[1].classList.remove('hidden');
          });
    
          // bottomMenuEl.classList.add('flex-col', 'space-y-4', 'p-2');
          // bottomMenuEl.classList.remove('space-x-4', 'p-4');
          setExpanded ? toggleSidebarEl.setAttribute('aria-expanded', 'false') : null;
      }
    }
    
    const toggleSidebarEl = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');

    
    document.querySelectorAll('#' + sidebar.getAttribute('id') + ' ul > li > ul > li > a').forEach(e => {
      var fullText = e.textContent;
      var firstLetter = fullText.substring(0, 1);
    
      var fullTextEl = document.createElement('span');
      var firstLetterEl = document.createElement('span');
      firstLetterEl.classList.add('hidden');
      fullTextEl.textContent = fullText;
      firstLetterEl.textContent = firstLetter;
    
      e.textContent = '';
      e.appendChild(fullTextEl);
      e.appendChild(firstLetterEl);
    });
    
    // initialize sidebar
    if (localStorage.getItem('sidebarExpanded') !== null) {
      if (localStorage.getItem('sidebarExpanded') === 'true') {
          toggleSidebar(sidebar, true, false);
      } else {
          toggleSidebar(sidebar, false, true);
      }
    }
    
    toggleSidebarEl.addEventListener('click', () => {
      
      localStorage.setItem('sidebarExpanded', !isSidebarExpanded(toggleSidebarEl));
      toggleSidebar(sidebar, !isSidebarExpanded(toggleSidebarEl), true);
    });
    
    sidebar.addEventListener('mouseenter', () => {
      if (!isSidebarExpanded(toggleSidebarEl)) {
          toggleSidebar(sidebar, true);
      }
    });
    
    sidebar.addEventListener('mouseleave', () => {
      if (!isSidebarExpanded(toggleSidebarEl)) {
          toggleSidebar(sidebar, false);
      }
    });
    
    const toggleSidebarMobile = (sidebar, sidebarBackdrop, toggleSidebarMobileHamburger, toggleSidebarMobileClose) => {
      sidebar.classList.toggle('hidden');
      sidebarBackdrop.classList.toggle('hidden');
      toggleSidebarMobileHamburger.classList.toggle('hidden');
      toggleSidebarMobileClose.classList.toggle('hidden');
    }
    
    const toggleSidebarMobileEl = document.getElementById('toggleSidebarMobile');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    const toggleSidebarMobileHamburger = document.getElementById('toggleSidebarMobileHamburger');
    const toggleSidebarMobileClose = document.getElementById('toggleSidebarMobileClose');
    // const toggleSidebarMobileSearch = document.getElementById('toggleSidebarMobileSearch');
    
    // toggleSidebarMobileSearch.addEventListener('click', () => {
    //   toggleSidebarMobile(sidebar, sidebarBackdrop, toggleSidebarMobileHamburger, toggleSidebarMobileClose);
    // });
    
    toggleSidebarMobileEl.addEventListener('click', () => {
      toggleSidebarMobile(sidebar, sidebarBackdrop, toggleSidebarMobileHamburger, toggleSidebarMobileClose);
    });
    
    sidebarBackdrop.addEventListener('click', () => {
      toggleSidebarMobile(sidebar, sidebarBackdrop, toggleSidebarMobileHamburger, toggleSidebarMobileClose);
    });

    // dark mode

    // var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    // var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Change the icons inside the button based on previous settings
    // if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    //     themeToggleLightIcon.classList.remove('hidden');
    // } else {
    //     themeToggleDarkIcon.classList.remove('hidden');
    // }

  }, [])

  // function changeThemeEvent () {

  //   const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  //   const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  //   themeToggleDarkIcon.classList.toggle('hidden');
  //   themeToggleLightIcon.classList.toggle('hidden');

  //   // if set via local storage previously
  //   if (localStorage.getItem('color-theme')) {
  //     if (localStorage.getItem('color-theme') === 'light') {
  //       document.documentElement.classList.add('dark');
  //       localStorage.setItem('color-theme', 'dark');
  //     } else {
  //       document.documentElement.classList.remove('dark');
  //       localStorage.setItem('color-theme', 'light');
  //     }

  //   // if NOT set via local storage previously
  //   } else {
  //     if (document.documentElement.classList.contains('dark')) {
  //       document.documentElement.classList.remove('dark');
  //       localStorage.setItem('color-theme', 'light');
  //     } else {
  //       document.documentElement.classList.add('dark');
  //       localStorage.setItem('color-theme', 'dark');
  //     }
  //   }

  // }

  //
  // servicew-worker 更新頁面按鈕
  //
  const [canUpdate, setCanUpdate] = useState(false)
  const updateButtonDiv = (<Button size="xs" gradientDuoTone="cyanToBlue" id="updateButton">新版本可更新</Button>)

  if (process.env.NODE_ENV === 'production' && "serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" })
      .then((registration) => {
        // registration worked
        if (registration.waiting) {
          setCanUpdate(true)
          const button = document.getElementById('updateButton')
          if (button) {
            button.onclick =() => {
              registration.waiting.postMessage({type: 'SKIP_WAITING'})
              window.location.reload()
            }
          }
        }
        
      })
      .catch((error) => {
        // registration failed
        console.error(`Registration failed with ${error}`);
      });
  }

  return (
    <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="py-3 px-3 lg:px-5 lg:pl-3">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <button id="toggleSidebar" aria-expanded="true" aria-controls="sidebar" className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
            <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              <svg id="toggleSidebarMobileClose" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            <a className="flex mr-14">
              <img src={logoPng} className="mr-3 h-8" alt="FlowBite Logo" />
              {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
            </a>
            {/* <form action="#" method="GET" className="hidden lg:block lg:pl-2">
              <label htmlFor="topbar-search" className="sr-only">Search</label>
              <div className="relative mt-1 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
              </div>
            </form> */}
          </div>
          <div className="flex items-center">
            {/*  */}
            <Online>
              <div className="flex items-center gap-2">
                {canUpdate ? updateButtonDiv : null}
                {/* <Badge color="green">網路:正常</Badge> */}
              </div>  
            </Online>
            <Offline><Badge color="red">無網路</Badge></Offline>
            
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarLayout;