import PropTypes from 'prop-types'
import React from 'react'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import { PatchEvent, setIfMissing, set } from 'part:@sanity/form-builder/patch-event'
import { FormBuilderInput } from 'part:@sanity/form-builder'
import { render } from 'react-dom'
import axios from 'axios'
import Downshift from 'downshift'

export default class KnSearchInput extends React.PureComponent {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.shape({
      _type: PropTypes.string
    }),
    focusPath: PropTypes.array.isRequired,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }
  
  state = {
    tracks: []
  }

  firstFieldInput = React.createRef()
  

  handleSearch = async ({ target }) => {
    const { value } = target
    if (value.length > 5) {
      axios.get(`https://api.github.com/search/repositories?q=${value}`)
      .then((response) => {
        const data = response.data.items
        // console.log(data)

        this.setState({
            tracks : data
        })
    })
    };
  }
  
  handleSelect = (value) => {
      // console.log({value})
      const { id, full_name, html_url } = value || {}
      const { onChange, type } = this.props
      const crawledAt = new Date().toISOString()
      onChange(
        PatchEvent.from(
            setIfMissing({_type: 'object'}),
            set(full_name, ['name'] ),
            set(html_url, ['uri'] ),
            set(crawledAt, ['crawledAt']),
            set(JSON.stringify(value, null, 4), ['raw'])
        )
      )
  }
  handleFieldChange = (field, fieldPatchEvent) => {
    const { onChange, type } = this.props
    // Whenever the field input emits a patch event, we need to make sure to each of the included patches
    // are prefixed with its field name, e.g. going from:
    // {path: [], set: <nextvalue>} to {path: [<fieldName>], set: <nextValue>}
    // and ensure this input's value exists
    onChange(
      fieldPatchEvent
        .prefixAll(field.name)
        .prepend(setIfMissing({ _type: type.name }))
    )
  }

  focus() {
    this.firstFieldInput.current.focus()
  }

  render() {
    const { type, value, level, focusPath, onFocus, onBlur } = this.props
    const { tracks = [] } = this.state || {}
    return (
      <div>
        <Downshift
          onChange={this.handleSelect}
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => (
            <div>
              <label {...getLabelProps()}>Search Artist</label>
              <input
                {...getInputProps({
                  onChange: this.handleSearch
                })}
              />
              <ul {...getMenuProps()}>
                {tracks && isOpen
                  ? tracks
                      /* .filter(
                        ({name}) => !inputValue || name.includes(inputValue)
                      ) */
                      .map((item, index) => console.log(item) || (
                        <li
                          {...getItemProps({
                            key: item.id,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index
                                  ? 'lightgray'
                                  : 'white',
                              fontWeight:
                                selectedItem === item ? 'bold' : 'normal'
                            }
                          })}
                        >
                          <div>{item.full_name}</div>
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          )}
        </Downshift>

        <Fieldset
          level={level}
          legend={type.title}
          description={type.description}
        >
          <div>
            {type.fields.map((field, i) => (
              // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
              // for the given field type
              <FormBuilderInput
                level={level + 1}
                ref={i === 0 ? this.firstFieldInput : null}
                key={field.name}
                type={field.type}
                value={value && value[field.name]}
                onChange={patchEvent =>
                  this.handleFieldChange(field, patchEvent)
                }
                path={[field.name]}
                focusPath={focusPath}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            ))}
          </div>
        </Fieldset>
      </div>
    )
  }
}