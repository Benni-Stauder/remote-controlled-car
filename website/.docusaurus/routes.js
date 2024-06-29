import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/about',
    component: ComponentCreator('/about', 'ca4'),
    exact: true
  },
  {
    path: '/features',
    component: ComponentCreator('/features', '374'),
    exact: true
  },
  {
    path: '/imprint',
    component: ComponentCreator('/imprint', '318'),
    exact: true
  },
  {
    path: '/privacy-policy',
    component: ComponentCreator('/privacy-policy', 'a6b'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'b1e'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '0a6'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '31e'),
            routes: [
              {
                path: '/docs/frontend',
                component: ComponentCreator('/docs/frontend', '509'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/getting-started',
                component: ComponentCreator('/docs/getting-started', '3fb'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/hardware',
                component: ComponentCreator('/docs/hardware', 'ec7'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/rc-car',
                component: ComponentCreator('/docs/rc-car', '87c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/software/',
                component: ComponentCreator('/docs/software/', '1c3'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/software/backend',
                component: ComponentCreator('/docs/software/backend', '537'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/software/demo',
                component: ComponentCreator('/docs/software/demo', '4c8'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/software/input',
                component: ComponentCreator('/docs/software/input', 'f51'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
