export default {
  title: 'Actor in role as',
  name: 'actorInRole',
  type: 'object',
  fields: [
    {
      title: 'Actor',
      name: 'actor',
      type: 'reference',
      to: [{type: 'actor', title: 'Actor'}]
    },
    {
      title: 'Role',
      name: 'role',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'typeClass'}],
          options: {
            filter: 'references(*[_type == "systemCategory" && label.nor in [$sysCat]]._id)',
            filterParams: {sysCat: 'Rolle'}
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      actor: 'actor.label',
      role: 'role'
    },
    prepare (selection) {
      const {actor, role} = selection
      return {
        title: actor + ', ' + role
      }
    }
  }
}
