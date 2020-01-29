import { action } from '@storybook/addon-actions';

import Card from '../src/components/Card.svelte';

export default {
  title: 'Card',
  component: Card,
};

export const card = () => ({
  Component: Card,
  props: {
    item: {
      _id: "dlfkajsdfakdjfl",
      label: "Reidun, Bård og Ellisiv på trappen",
      hasType: {
        nor: "Fotografi"
      }
    }
  }
});

