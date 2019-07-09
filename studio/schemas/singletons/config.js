// See https://gist.github.com/lancejpollard/1978404 for more tags, and https://htmlhead.dev/

export default {
    title: 'Config',
    name: 'config',
    type: 'document',
    fieldsets: [
        {
            name: 'meta', 
            title: 'Meta tags',
            options: {collapsible: true, collapsed: true}
        },
    ],
    fields: [
        {
            title: 'Title',
            name: 'dc_title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: 'Description',
            name: 'description',
            description: 'Describe the site with 150 words or less',
            type: 'text',
            fieldset: 'meta',
            validation: Rule => Rule.required().max('150')
        },
        {
            title: 'Keywords',
            name: 'keywords',
            description: 'Comma separated list of keywords',
            type: 'string',
            fieldset: 'meta',
        },
    ]
}