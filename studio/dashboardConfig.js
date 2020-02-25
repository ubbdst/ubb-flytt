export default {
  widgets: [
    /* {name: 'document-chart'}, */
    {
      name: 'notes',
      options: {
        title: 'Notater'
      }
    },
    /* {name: 'structure-menu'}, */
    {
      name: 'document-list',
      options: {title: 'Recent objects', order: '_createdAt desc', types: ['madeObject']},
      layout: {width: 'small'}
    },
    {
      name: 'document-list',
      options: {title: 'Recent types', order: '_createdAt desc', types: ['typeClass']},
      layout: {width: 'small'}
    },
    {
      name: 'document-list',
      options: {title: 'All recent documents', order: '_createdAt desc'},
      layout: {width: 'small'}
    },
    {
      name: 'document-list',
      options: {title: 'Recent updated', order: '_updatedAt desc'},
      layout: {width: 'small'}
    },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e553c93debe802bd4a54006',
                  title: 'UBB-flytt Studio',
                  name: 'ubb-flytt-studio',
                  apiId: '6782bd64-bdf1-49e1-9cd6-dd1889ca0c4f'
                },
                {
                  buildHookId: '5e553b3213f835b928833769',
                  title: 'UBB-flytt Web',
                  name: 'ubb-flytt',
                  apiId: '1939e118-ff31-43f1-a750-e1432f4246b8'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ubbdst/ubb-flytt',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://ubb-flytt.netlfy.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}}
  ]
}
