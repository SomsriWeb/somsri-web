import type { Meta, StoryObj } from '@storybook/vue3';
import ProductGrid from './ProductGrid.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/ProductGrid',
    component: ProductGrid,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductGridStory: Story = {
    args: {
       lang: 'th',
    },
};
