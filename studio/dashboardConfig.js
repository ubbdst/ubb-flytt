export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {name: 'structure-menu'},
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
                  buildHookId: '5d233ea0dd15905f59bc18a4',
                  title: 'Sanity Studio',
                  name: 'saelen-samlingen-studio',
                  apiId: '8650882c-97db-4284-bf66-242850629add'
                },
                {
                  buildHookId: '5d233ea0c09ad50a72aed231',
                  title: 'Sælen Web',
                  name: 'saelen-samlingen',
                  apiId: 'ffc4bb67-3ecc-4379-993e-25b7187a116b'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/tarjelavik/saelen-samlingen',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://saelen-samlingen.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
