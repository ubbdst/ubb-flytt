export default {
    title: 'Point',
    name: 'point',
    type: 'object',
    fields: [
        {
            title: 'Location of viewer or camera',
            description: 'Pick the position of the camera or the creator',
            name: 'coordinates',
            type: 'geopoint',
        },
    ],
}