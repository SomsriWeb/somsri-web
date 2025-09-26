import type { Meta, StoryObj } from '@storybook/vue3';
import PantPrice from './PantPrice.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/PantPrice',
    component: PantPrice,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof PantPrice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PantPriceStory: Story = {
    args: {},
};
